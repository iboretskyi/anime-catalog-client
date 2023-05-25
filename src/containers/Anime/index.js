import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Summary from './Summary';
import Header from './Header';
import Error404 from '../../components/UI/404';
import Body from './Body';
import ReactionContainer from './ReactionContainer';

const URL = process.env.REACT_APP_URL;
const PATH = 'each-anime';

const Anime = (props) => {
  // State to store anime data
  const [anime, setAnime] = useState(null);

  const { match, setNav } = props;

  const navList = [
    'summary',
    'episodes',
    'characters',
    'reactions',
    'franchise',
  ];

  useEffect(() => {
    setNav(PATH);  // Set navigation path
    // Fetch anime data
    (async () => {
      const res = await fetch(URL + '/get-each-anime/' + match.params.animeId, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status !== 200) {
        alert('invalid url');
        window.location.replace('/');
        return;
      }
      const resData = await res.json();
      setAnime(resData.anime);  // Update state with fetched data
    })();
  }, [match.params.animeId, props.socket, setNav]);
  
  // Determine loading state
  let loading = anime ? false : true;

  // Determine if the anime is in the library
  let inLib = null;
  if (!loading) {
    if (props.animelist && props.animelist[match.params.animeId])
      inLib = props.animelist[match.params.animeId];
  }

  // Render the component based on loading state
  return !loading ? (
    <>
      <Switch>
        {navList.map((each, index) => {
          return (
            <Route
              key={index}
              path={
                each === 'summary' ? match.url + '/' : match.url + '/' + each
              }
              exact
              render={() => {
                return (
                  <>
                    <Header
                      linkName={each.charAt(0).toUpperCase() + each.slice(1)}
                      id={anime.id}
                    />
                    {each === 'summary' ? (
                      <Summary
                        title={anime.title}
                        url={URL + anime.imageUrl}
                        score={anime.score}
                        description={anime.description}
                        genres={anime.genres}
                        id={anime.id}
                        inLib={inLib}
                        reactions={anime.reactions}
                      />
                    ) : each === 'reactions' ? (
                      <ReactionContainer
                        url={URL + anime.imageUrl}
                        inLib={inLib}
                        title={anime.title}
                        id={anime.id}
                        reactions={anime.reactions}
                      />
                    ) : (
                      <Body url={URL + anime.imageUrl} inLib={inLib} />
                    )}
                  </>
                );
              }}
            />
          );
        })}
        <Route component={Error404} />  // 404 route for unmatched paths
      </Switch>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};

// Map redux state to props
const mapStateToProps = (state) => {
  return {
    animelist: state.user.animelist,
    socket: state.socket.socket,
  };
};

// Map dispatch functions to props
const mapDispatchToProps = (dispatch) => {
  return {
    openReactionModal: (payload) =>
      dispatch({
        type: 'OPEN_MODAL',
        which: 'reaction-modal',
        payload: payload,
      }),
    setNav: (path) => dispatch({ type: 'SET_NAV', path: path }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Anime);
