import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";

const LoginPage = ({ setIsAuth }) => {
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setIsAuth(true);
      localStorage.setItem('TOKEN', data.user.refreshToken)
    });
  };
  return (
    <div className="container">
      <div className="login">
        <h1>chat room</h1>
        <p>login for continue</p>
        <button onClick={handleClick}>
          <img src="g-logo.png" alt="" />
          <span>login with google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
