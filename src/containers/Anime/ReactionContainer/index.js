import React from 'react';

import animelistStyles from '../../Library/AnimelistSection/animelist-section.module.css';
import styles from '../Body/anime-body.module.css';
import Pic from '../../../components/Anime/Pic';
import Reaction from '../../../components/Anime/Reaction';

const ReactionContainer = (props) => {
  return (
    <div className={animelistStyles['animelist-section']}>
      <Pic
        url={props.url}
        inLib={props.inLib}
        title={props.title}
        id={props.id}
      />
      <div
        className={styles['anime-details-section']}
        style={{ background: 'transparent', border: 'none' }}
      >
        <div style={{ width: '100%' }}>
          <Reaction
            inLib={props.inLib}
            title={props.title}
            id={props.id}
            reactionpage={true}
            reactions={props.reactions}
          />
        </div>
      </div>
    </div>
  )
};

export default ReactionContainer;
