const RoomPage = ({ setIsAuth, setRoom }) => {
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('TOKEN')
  };
  const handleSubmit=(e)=>{
e.preventDefault()
const room=e.target[0].value.trim().toUpperCase();
setRoom(room)
  }
  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h1>chat room</h1>
      <p>which room will you log in ? </p>
      <input placeholder="choose your room" type="text" required />
      <button type="submit">log in the room</button>
      <button onClick={logout} type="button">
        log out the room
      </button>
    </form>
  );
};

export default RoomPage;
