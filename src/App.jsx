import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RoomPage from "./pages/RoomPage";
import ChatPage from "./pages/ChatPage";

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("TOKEN"));
  const [room, setRoom] = useState(null);
  if (!isAuth) return <LoginPage setIsAuth={setIsAuth} />;
  return (
    <div className="container">
      {!room ? (
        <RoomPage setIsAuth={setIsAuth} setRoom={setRoom} />
      ) : (
        <ChatPage room={room} setRoom={setRoom}/>
      )}
    </div>
  );
};

export default App;
