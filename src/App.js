import React, { useEffect, useCallback, useState } from 'react';
import { io } from 'socket.io-client';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import NavContainer from './containers/Navigation';
import Home from './containers/Home';
import Library from './containers/Library';
import Modal from './containers/Modal';
import Backdrop from './components/UI/Backdrop';
import Anime from './containers/Anime';
import Admin from './containers/Admin';
import onEvents from './socket';
import OthersLibrary from './containers/OthersLibrary';

const URL = process.env.REACT_APP_URL;

const App = (props) => {
  const [socketStatus, setSocketStatus] = useState(false);
  const {
    logout,
    setJWT,
    setLoading,
    unsetLoading,
    setUser,
    setAnimelist,
    unsetUser,
    setSocket,
    setUpvotedlist,
  } = props;

  // Callback function for handling logout
  const logoutHandler = useCallback(() => {
    logout();
    unsetUser();
    unsetLoading();
  }, [logout, unsetLoading, unsetUser]);

  // Callback function to get user data
  const getUser = useCallback(
    async (time, socket) => {
      const jwt = localStorage.getItem('jwt');
      const expireTime = localStorage.getItem('jwt-expire-time');

      // Fetch user data using JWT
      const res = await fetch(URL + '/user/get-user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jwt,
        },
      });

      if (res.status !== 200) {
        alert('failed to login');
        return logoutHandler();
      }

      const resData = await res.json();
      const user = resData.user;

      // Set user data in Redux store
      setUser({
        id: user._id,
        username: user.username,
        followers: user.followers,
        following: user.followings,
        role: user.role,
        reactions: user.reactions,
      });

      socket.emit('setUserId', user._id);

      // Prepare animelist data for Redux store
      const animelist = {};
      user.animeList.forEach((each) => {
        if (each.animeId) animelist[each.animeId.toString()] = each;
      });
      setAnimelist(animelist);

      // Prepare upvotedlist data for Redux store
      const upvotedlist = {};
      user.upvotedList.forEach((each) => {
        upvotedlist[each.toString()] = each.toString();
      });
      setUpvotedlist(upvotedlist);

      // Set JWT and expiration time
      setJWT(jwt, expireTime);
      unsetLoading();

      // Schedule automatic logout based on expiration time
      setTimeout(() => {
        logoutHandler();
      }, time - new Date().getTime());
    },
    [setJWT, unsetLoading, logoutHandler, setUser, setAnimelist, setUpvotedlist]
  );

  // Function to check auto-logout status
  const setAutoLogout = useCallback(
    (time, socket) => {
      if (time > new Date().getTime()) {
        getUser(time, socket);
      } else logoutHandler();
    },
    [logoutHandler, getUser]
  );

  useEffect(() => {
    const socket = io(URL);
    setSocket(socket);
    onEvents(socket, setSocketStatus);
    setLoading();

    const time = localStorage.getItem('jwt-expire-time');

    if (time) {
      setAutoLogout(new Date(time).getTime(), socket);
    } else unsetLoading();

    // Cleanup function to disconnect socket
    return () => {
      socket.disconnect();
    };
  }, [setAutoLogout, setLoading, unsetLoading, setSocket, socketStatus]);

  return (
    <div className="App">
      {/* Modal and Backdrop */}
      {props.showModal ? (
        <>
          <Modal />
          <Backdrop class="backdrop-dark" clicked={props.toggleShowModal} />
        </>
      ) : null}

      {/* Navigation */}
      <NavContainer />

      {/* Routes */}
      <Switch>
        <Route path="/explore" component={Home} />
        <Route path="/library" component={Library} />
        <Route path="/others-library/:otherUserId" component={OthersLibrary} />
        <Route path="/each-anime/:animeId" component={Anime} />
        <Route path="/admin" exact component={Admin} />
        <Redirect to="/explore/home" />
      </Switch>
    </div>
  );
}

// Mapping Redux state to component props
const mapStateToProps = (state) => {
  return {
    showModal: state.webGeneral.showModal,
    expireTime: state.auth.jwtExpire,
    user: state.user.user,
    socket: state.socket.socket,
  };
};

// Mapping Redux actions to component props
const mapDispatchToProps = (dispatch) => {
  return {
    toggleShowModal: () => dispatch({ type: 'CLOSE_MODAL' }),
    setJWT: (jwt, expireTime) =>
      dispatch({ type: 'SET_JWT', jwt: jwt, expireTime: expireTime }),
    logout: () => dispatch({ type: 'LOGOUT' }),
    setLoading: () => dispatch({ type: 'SET_LOADING' }),
    unsetLoading: () => dispatch({ type: 'UNSET_LOADING' }),
    setUser: (user) => dispatch({ type: 'SET_USER', user: user }),
    setAnimelist: (animelist) =>
      dispatch({ type: 'SET_ANIMELIST', animelist: animelist }),
    setUpvotedlist: (upvotedlist) =>
      dispatch({ type: 'SET_UPVOTEDLIST', upvotedlist: upvotedlist }),
    unsetUser: () => dispatch({ type: 'UNSET_USER' }),
    setSocket: (socket) => dispatch({ type: 'SET_SOCKET', socket: socket }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
