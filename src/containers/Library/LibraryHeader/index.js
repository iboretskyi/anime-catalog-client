import React from 'react';

import styles from './library-header.module.css';
import EachLibraryNav from '../../../components/Library/EachLibraryNav';

const URL = process.env.REACT_APP_URL;

const LibraryHeader = (props) => {
  const navList = [
    { name: 'Activity', to: '/' + props.path + '/activity' },
    { name: 'Library', to: '/' + props.path + '/library' },
    { name: 'Reactions', to: '/' + props.path + '/reactions' },
    { name: 'Followers', to: '/' + props.path + '/followers' },
    { name: 'Following', to: '/' + props.path + '/following' },
    { name: 'Groups', to: '/' + props.path + '/groups' },
  ];

  return (
    <>
      <div
        className={styles['library-bg']}
        style={{ background: `url(${URL}/images/bg-user.png)` }}
      ></div>
      <div className={styles.userprof}>
        <div className={styles['prof-pic']}>
          <img
            src={URL + '/images/profile-pic.png'}
            alt={URL + '/images/profile-pic.png'}
          />
        </div>
        <div className={styles['username-and-edit']}>
          <h3>{props.username}</h3>
          <button>Edit</button>
        </div>
      </div>
      <div className={styles['library-nav']}>
        <div className={styles['library-nav-container']}>
          {navList.map((each, index) => (
            <EachLibraryNav
              key={index}
              href={each.to}
              active={props.linkName === each.name}
            >
              {each.name}
            </EachLibraryNav>
          ))}
        </div>
      </div>
      <div className={styles.padding}></div>
    </>
  );
};

export default LibraryHeader;
