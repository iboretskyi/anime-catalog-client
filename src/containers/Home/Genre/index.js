import React from 'react';
import GenreList from './GenreList';
import genreStyles from './genre.module.css';

const GenreContainer = (props) => (
  <div className={genreStyles['genre-container']}>
    <GenreList favourite={true}>my favourite categories</GenreList>
    <GenreList
      favourite={false}
      genreList={[
        'Action',
        'Adventure',
        'Comedy',
        'Drama',
        'Slice of Life',
        'Fantasy',
        'Magic',
        'Supernatural',
        'Horror',
        'Mystery',
        'Psychological',
        'Romance',
        'Sci-Fi',
      ]}
    >
      categories
    </GenreList>
  </div>
);

export default GenreContainer;
