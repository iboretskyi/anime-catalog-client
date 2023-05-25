import React, { useState } from 'react';

import animelistSectionStyles from './animelist-section.module.css';
import AnimelistStatus from '../AnimelistStatus';
import AnimelistItem from '../../../components/Library/AnimelistItem';

const URL = process.env.REACT_APP_URL;

const AnimelistSection = (props) => {
  const [animelist, setAnimelist] = useState(props.animelist);

  // Define a set of functions to filter animelist by status
  const viewByStatus = {
    all: () => {
      // Show all animes
      setAnimelist(props.animelist);
    },
    currentlyWatching: () => {
      // Show animes with status 'Currently Watching'
      const tmpAnimelist = props.animelist.filter(
        (each) => each.status === 'Currently Watching'
      );
      setAnimelist(tmpAnimelist);
    },
    wantToWatch: () => {
      // Show animes with status 'Want to Watch'
      const tmpAnimelist = props.animelist.filter(
        (each) => each.status === 'Want to Watch'
      );
      setAnimelist(tmpAnimelist);
    },
    completed: () => {
      // Show animes with status 'Completed'
      const tmpAnimelist = props.animelist.filter(
        (each) => each.status === 'Completed'
      );
      setAnimelist(tmpAnimelist);
    },
    onHold: () => {
      // Show animes with status 'On Hold'
      const tmpAnimelist = props.animelist.filter(
        (each) => each.status === 'On Hold'
      );
      setAnimelist(tmpAnimelist);
    },
    dropped: () => {
      // Show animes with status 'Dropped'
      const tmpAnimelist = props.animelist.filter(
        (each) => each.status === 'Dropped'
      );
      setAnimelist(tmpAnimelist);
    },
  };

  return (
    <div className={animelistSectionStyles['animelist-section']}>
      <div className={animelistSectionStyles['anime-list-container']}>
        <div className={animelistSectionStyles['animelist']}>
          {animelist.length > 0 ? (
            // Show AnimelistItems for each anime in the list
            animelist.map((each) => (
              <AnimelistItem
                key={each.id}
                id={each.id}
                url={URL + each.imageUrl}
                status={each.status}
              />
            ))
          ) : (
            <div
              style={{
                fontSize: '16px',
                fontFamily: 'sans-serif',
                margin: '0 auto',
              }}
            >
              Your Library is Empty...
            </div>
          )}
        </div>
      </div>
      {/* Show Anime Status Component */}
      <AnimelistStatus
        username={props.username}
        animelist={props.animelist}
        {...viewByStatus}
      />
    </div>
  );
};

export default AnimelistSection;
