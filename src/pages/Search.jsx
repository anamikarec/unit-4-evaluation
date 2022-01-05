// import { useSelector } from "react-redux";
// import Login from "./Login";
// const Search = () => {
//   const isAuth = useSelector((state) => state.auth.isAuth);
//   return isAuth ? (
//     <div>
//       <h3>Search Page</h3>
//     </div>
//   ) : (
//     <Login />
//   );
// };
// export default Search;

import { useSelector } from "react-redux";
import Login from "./Login";
import { useState, useEffect } from "react";
const Search = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [query, setQuery] = useState("masai");
  const [text, setText] = useState("");

  const getUsers = ({ query, page = 1 }) => {
    return fetch(
      `https://api.github.com/search/users?q=${query}&page=${page}`
    ).then((res) => res.json());
  };

  useEffect(() => {
    getUsers({
      page,
      query
    })
      .then((res) => {
        setData(res);
        console.log(res);
        if (res.total_count) {
          const totalPage = Math.ceil(res.total_count / 30);
          setTotalPage(totalPage);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, query]);

  const handlePageChange = (value) => {
    setPage(value);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    setQuery(text);
  };

  const isAuth = useSelector((state) => state.auth.isAuth);
  return isAuth ? (
    <div className="App">
      <div style={{ margin: "20px" }}>
        <input
          placeholder="...enter username"
          style={{
            height: "30px",
            padding: "5px",
            border: "2px solid blue",
            borderRadius: "10px",
            fontSize: "17px"
          }}
          onChange={handleChange}
        />
        <button
          style={{
            height: "45px",
            padding: "5px",
            border: "2px solid blue",
            borderRadius: "10px",
            fontSize: "17px",
            background: "black",
            color: "white"
          }}
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </div>
  ) : (
    <Login />
  );
};
export default Search;
