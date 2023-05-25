import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Switch, Route } from 'react-router-dom';

import LibraryHeader from './LibraryHeader';
import AnimelistSection from './AnimelistSection';
import Follow from './Follow';
import Error404 from '../../components/UI/404';
import UserReactionContainer from './UserReactionContainer';

const PATH = 'library';

const Library = (props) => {
  // Destructure props for cleaner code
  const { match, setNav } = props;

  // Define navList array
  const navList = [
    'activity',
    'library',
    'reactions',
    'followers',
    'following',
    'groups',
  ];

  // Use useEffect hook to set navigation path
  useEffect(() => {
    setNav(PATH);
  }, [setNav]);

  let library = null;
  
  // If data is not loading, display content based on JWT status
  if (!props.loading) {
    library = !props.jwt ? (
      // If no JWT, redirect to home
      <Redirect to="/" />
    ) : (
      // If JWT, render library content
      <>
        <Switch>
          {navList.map((each, index) => {
            return (
              <Route
                key={index}
                path={match.url + '/' + each}
                exact
                render={() => {
                  return (
                    <>
                      <LibraryHeader
                        path={PATH}
                        username={props.user.username}
                        linkName={each.charAt(0).toUpperCase() + each.slice(1)}
                      />
                      {each === 'library' ? (
                        <AnimelistSection
                          username={props.user.username}
                          animelist={Object.values(props.animelist)}
                        />
                      ) : each === 'followers' || each === 'following' ? (
                        <Follow user={props.user} page={each} />
                      ) : each === 'reactions' ? (
                        <UserReactionContainer
                          user={props.user}
                          animelist={props.animelist}
                        />
                      ) : null}
                    </>
                  );
                }}
              />
            );
          })}
          <Route component={Error404} />
        </Switch>
      </>
    );
  }

  // If data is loading, display loading message
  return props.loading ? <h1>Loading...</h1> : library;
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    jwt: state.auth.jwt,
    loading: state.webGeneral.loading,
    animelist: state.user.animelist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNav: (path) => dispatch({ type: 'SET_NAV', path: path }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Library);
