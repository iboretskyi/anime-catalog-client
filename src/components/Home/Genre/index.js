import React from 'react';
import styles from '../../../containers/Home/Genre/genre.module.css';

const Genre = (props) => (
  <li className={styles['genre-items']}>
    <p>{props.children}</p>
  </li>
);

export default Genre;
