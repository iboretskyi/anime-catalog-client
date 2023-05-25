import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import BaseSection from '../../../components/Home/Section';
import sectionStyles from './section.module.css';

const Section = (props) => {
  return (
    <section>
      <h6>{props.children}</h6>
      <div className={sectionStyles['section-container']}>
        {props.animeData.map((each) => (
          <BaseSection
            key={each.id}
            id={each.id}
            inLibrary={
              props.animelist !== null && props.animelist[each.id]
                ? props.animelist[each.id].status
                : false
            }
            imageUrl={each.url}
          />
        ))}
      </div>
      <div className={sectionStyles['section-view-more']}>
        <Link to={'/explore/all-anime/' + props.children}>view more</Link>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    animelist: state.user.animelist,
  };
};

export default connect(mapStateToProps)(Section);
