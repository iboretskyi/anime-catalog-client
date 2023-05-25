import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

import sectionStyles from './section.module.css';
import BaseSection from '../../../components/Home/Section';

const URL = process.env.REACT_APP_URL;

const AllAnime = (props) => {
  const [animeArr, setAnimeArr] = useState([]);
  const { heading } = useParams();

  useEffect(() => {
    // Fetch anime list from the server based on the heading parameter
    const fetchAnimeList = async () => {
      try {
        const res = await fetch(`${URL}/get-home/no-limit/${heading}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.status !== 200) {
          // Display an alert if the fetch request fails
          alert('Failed to fetch from server. Please try again later...');
          return;
        }

        // Parse the response data and update the animeArr state
        const resData = await res.json();
        setAnimeArr(
          resData.animeList.map((each) => ({
            url: URL + each.imageUrl,
            id: each.id,
          }))
        );
      } catch (err) {
        alert('Failed to load. Please try again later');
      }
    };

    // Call the fetchAnimeList function
    fetchAnimeList();
  }, [heading]);

  return (
    <>
      <section>
        <div className={sectionStyles['section-container']}>
          {animeArr.map((each) => (
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
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    animelist: state.user.animelist,
  };
};

export default connect(mapStateToProps)(AllAnime);
