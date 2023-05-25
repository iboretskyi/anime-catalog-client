import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import adminStyles from './admin.module.css';

const URL = process.env.REACT_APP_URL;
const PATH = 'admin';

// GENRE array serves as a list of anime genres
const GENRE = [
  'Comedy',
  'Romance',
  'Action',
  'Slice of Life',
  'Horror',
  'Fantasy',
  'Shounen',
  'Historical',
];

const Admin = (props) => {
  const history = useHistory();
  const { location, setNav } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState(
    GENRE.map((each) => ({ genre: each, checked: false }))
  );
  const [imgFile, setImgFile] = useState(null);

  useEffect(() => {
    setNav(PATH);
  }, [setNav]);

  useEffect(() => {
    if (!props.loading) {
      if (!props.jwt || props.user.role !== 'admin') {
        history.push('/');
      }
    }
  }, [props.loading, props.jwt, props.user, history]);

  // Function for handling form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('image', imgFile);
    form.append('title', title);
    form.append('description', description);
    let method = 'POST';
    let url = URL + '/admin/post-anime';
    const query =
      location.search.length > 0 ? location.search.slice(1).split('=') : '';
    if (query.length > 0 && query[0] === 'Edit') {
      form.append('animeId', query[1]);
      method = 'PUT';
      url = URL + '/admin/put-anime';
    }

    // Converting genre state to an array of checked genres
    const genreArr = genre.reduce((prev, cur) => {
      if (cur.checked) prev.push(cur.genre);
      return prev;
    }, []);
    form.append('genre', genreArr);

    // Making fetch request to server
    const res = await fetch(url, {
      method: method,
      headers: {
        Authorization: 'Bearer ' + props.jwt,
      },
      body: form,
    });

    // Handling fetch response
    if ((method === 'POST' && res.status !== 201) || (method === 'PUT' && res.status !== 200)) {
      alert('action failed');
      return;
    }
    await res.json();
    history.push('/');
  };

  return props.loading ? <h1>Loading...</h1> : (
    <form
      className={adminStyles['admin-form']}
      onSubmit={submitHandler}
      encType="multipart/form-data"
    >
      <ul>
        <li className={adminStyles.item}>
          <label className={adminStyles['admin-label']}>Title</label>
          <input
            className={adminStyles['admin-input']}
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </li>
        <li className={adminStyles.item}>
          <label className={adminStyles['admin-label']}>Description</label>
          <textarea
            className={adminStyles['admin-textarea']}
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </li>
        <li className={adminStyles.item}>
          <label className={adminStyles['admin-label']}>Genre</label>
          <div className={adminStyles['genre-container']}>
            {GENRE.map((each, index) => (
              <div key={index} className={adminStyles['checkbox-container']}>
                <label className={adminStyles['genre-label']}>{each}</label>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    const genreTmp = [...genre];
                    const i = genre.findIndex(
                      (genreItem) => genreItem.genre === each
                    );
                    if (i !== -1) {
                      genreTmp[i].checked = e.target.checked;
                      setGenre(genreTmp);
                    }
                  }}
                  name={each}
                />
              </div>
            ))}
          </div>
        </li>
        <li className={adminStyles.item}>
          <label className={adminStyles['admin-label']}>Image</label>
          <input
            className={adminStyles['admin-input']}
            type="file"
            name="image"
            onChange={(e) => {
              setImgFile(e.target.files[0]);
            }}
          />
        </li>
      </ul>
      <button type="submit" className={adminStyles['submit-btn']}>
        Add Anime
      </button>
    </form>
  );
};

// mapStateToProps for providing state properties as props
const mapStateToProps = (state) => {
  return {
    loading: state.webGeneral.loading,
    jwt: state.auth.jwt,
    user: state.user.user,
  };
};

// mapDispatchToProps for dispatching actions
const mapDispatchToProps = (dispatch) => {
  return {
    setNav: (path) => dispatch({ type: 'SET_NAV', path: path }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
