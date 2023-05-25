import React from 'react';

import EachLibraryNav from '../../../components/Library/EachLibraryNav';
import libraryHeaderStyles from '../../Library/LibraryHeader/library-header.module.css';

const URL = process.env.REACT_APP_URL;

const Header = (props) => {
  const navList = [
    { name: 'Summary', to: '/each-anime/' + props.id },
    { name: 'Episodes', to: '/each-anime/' + props.id + '/episodes' },
    { name: 'Characters', to: '/each-anime/' + props.id + '/characters' },
    { name: 'Reactions', to: '/each-anime/' + props.id + '/reactions' },
    { name: 'Franchise', to: '/each-anime/' + props.id + '/franchise' },
  ];

  return (
    <>
      <div
        className={libraryHeaderStyles['library-bg']}
        style={{ background: `url(${URL}/images/bg-user.png)` }}
      ></div>

      <div className={libraryHeaderStyles['library-nav']} style={{ paddingLeft: '205px' }}>
        <div className={libraryHeaderStyles['library-nav-container']}>
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
      <div style={{ height: '330px' }}></div>
    </>
  );
};

export default Header;
