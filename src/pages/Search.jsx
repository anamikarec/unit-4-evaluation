import { useSelector } from "react-redux";
import Login from "./Login";
const Search = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return isAuth ? (
    <div>
      <h3>Search Page</h3>
    </div>
  ) : (
    <Login />
  );
};
export default Search;
