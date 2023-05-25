import React from 'react';

import Pic from '../../../components/Anime/Pic';
import Description from '../../../components/Anime/Description';
import Details from '../../../components/Anime/Details';
import Reaction from '../../../components/Anime/Reaction';
import animelistStyles from '../../Library/AnimelistSection/animelist-section.module.css';
import eachAnimeSummaryStyles from './anime-summary.module.css';

const Summary = (props) => {
  return (
    <div className={animelistStyles['animelist-section']}>
      <Pic
        url={props.url}
        id={props.id}
        title={props.title}
        inLib={props.inLib}
      />
      <div className={eachAnimeSummaryStyles['description-and-reaction-wrapper']}>
        <Description
          title={props.title}
          description={props.description}
        />
        <Reaction
          reactions={props.reactions}
          inLib={props.inLib}
          title={props.title}
          id={props.id}
          viewmore={true}
        />
      </div>

      <Details
        title={props.title}
        score={props.score}
        genres={props.genres}
      />
    </div>
  );
};

export default Summary;
