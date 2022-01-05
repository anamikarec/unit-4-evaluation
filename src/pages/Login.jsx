import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/auth/action";
import { useSelector } from "react-redux";
import Home from "./Home";
function Login() {
  const dispatch = useDispatch();

  const handleAdd = () => {
    const action = loginSuccess(Date.now());
    dispatch(action);
  };
  const isAuth = useSelector((state) => state.auth.isAuth);

  return !isAuth ? (
    <div>
      <h3>Login</h3>
      <button onClick={handleAdd}>Please click on this to login</button>
    </div>
  ) : (
    <Home />
  );
}

export default Login;
