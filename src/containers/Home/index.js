import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import SectionContainer from './Section/SectionContainer';
import GenreContainer from './Genre';

import homeStyles from './home.module.css';
const PATH = 'explore';

const Home = (props) => {
  const { setNav } = props;
  useEffect(() => {
    setNav(PATH);
  }, [setNav]);
  return (
    <>
      <div className={homeStyles['section-and-genre-wrapper']}>
        <SectionContainer match={props.match} />
        <div className={homeStyles['genre-wrapper']}>
          <GenreContainer />
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setNav: (path) => dispatch({ type: 'SET_NAV', path: path }),
  };
};

export default connect(null, mapDispatchToProps)(Home);
