import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Section from '.';
import AllAnime from './AllAnime';
import Error404 from '../../../components/UI/404';
import sectionStyles from './section.module.css';

const URL = process.env.REACT_APP_URL; // API Endpoint URL
const STATUS = [ // Array for all possible statuses for an anime
  'trending this week',
  'top airing anime',
  'top upcoming anime',
  'highest rated anime',
  'most popular anime',
];

const SectionContainer = (props) => {
  const [animeArr, setAnimeArr] = useState(null); // Initialize state for anime array
  const { match } = props; // Destructure match from props

  useEffect(() => { // Use Effect to perform side effect once the component mounts
    let urls = [];
    let tmpAnimeArr = {};
    STATUS.forEach((each) => urls.push(URL + '/get-home/5/' + each)); // Create an array of urls to fetch data from
    // Fetch data from all urls and set it to the state
    Promise.all(urls.map((u) => fetch(u)))
      .then((data) => {
        return Promise.all(data.map((d) => d.json()));
      })
      .then((data) => {
        data.map((each) => {
          return (tmpAnimeArr[each.status] = each.animeList.map(
            (eachAnime) => ({
              url: URL + eachAnime.imageUrl,
              id: eachAnime.id,
            })
          ));
        });
        setAnimeArr(tmpAnimeArr); // Update the state with the fetched data
      });
  }, []);

  const titleCase = (str) => { // Function to convert string to title case
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  };
  
  return ( // Render the component
    <div className={sectionStyles['section-container-wrapper']}>
      <Switch>
        <Route
          path={match.url + '/home'}
          exact
          render={() => {
            return (
              <>
                {animeArr ? (
                  Object.keys(animeArr).map((each, index) => (
                    <Section key={index} animeData={animeArr[each]}>
                      {titleCase(each)}
                    </Section>
                  ))
                ) : (
                  <h1>Loading...</h1> // Show loading if anime array is not yet loaded
                )}
              </>
            );
          }}
        />
        <Route
          path={match.url + '/all-anime/:heading'}
          render={(matchProps) => {
            return (
              <AllAnime url={URL} animeData={animeArr}>
                {matchProps.match.params.heading}
              </AllAnime>
            );
          }}
        />
        <Route component={Error404} /> {/* Route for unmatched paths */}
      </Switch>
    </div>
  );
};

export default SectionContainer;
