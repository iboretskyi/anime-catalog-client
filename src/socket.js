const onEvents = (socket, setSocketStatus) => {
  socket.on('post-reaction', (data) => {
    setSocketStatus((prevState) => !prevState);
  });
  socket.on('put-reaction', (data) =>
    setSocketStatus((prevState) => !prevState)
  );
  socket.on('delete-reaction', (message) =>
    setSocketStatus((prevState) => !prevState)
  );
  socket.on('follow-user-sender', (message) => {
    setSocketStatus((prevState) => !prevState);
  });
  socket.on('follow-user-receiver', (message) => {
    setSocketStatus((prevState) => !prevState);
  });
  socket.on('unfollow-user-sender', (message) =>
    setSocketStatus((prevState) => !prevState)
  );
  socket.on('unfollow-user-receiver', (message) =>
    setSocketStatus((prevState) => !prevState)
  );
};
export default onEvents;
