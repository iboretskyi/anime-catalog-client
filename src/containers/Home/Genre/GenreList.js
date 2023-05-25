import React from 'react';
import Genre from '../../../components/Home/Genre';
import genreStyles from './genre.module.css';

const GenreList = (props) =>
  props.favourite ? (
    <div className={genreStyles['genre-fav-categories']}>
      <h5 className={genreStyles['categories-head']}>{props.children.toUpperCase()}</h5>
      <ul className={genreStyles['genre-list']}>
        Favoriting categories will improve your recommendations.
      </ul>
    </div>
  ) : (
    <div className={genreStyles['genre-categories']}>
      <h5 className={genreStyles['categories-head']}>{props.children.toUpperCase()}</h5>
      <ul className={genreStyles['genre-list']}>
        {props.genreList.map((each, index) => (
          <Genre key={index}>{each}</Genre>
        ))}
      </ul>
      <div className={genreStyles['section-view-more']}>
        <a href="/">more categories...</a>
      </div>
    </div>
  );

export default GenreList;
