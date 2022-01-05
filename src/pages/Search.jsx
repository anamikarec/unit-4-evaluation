import { useSelector } from "react-redux";
import Login from "./Login";
import { useState, useEffect } from "react";
import UserCard from "./UserCard";

import Pagination from "./Pagination";
const Search = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [query, setQuery] = useState("masai");
  const [text, setText] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [perPage2, setPerPage2] = useState(5);
  const getUsers = ({ query, page = 1 }) => {
    return fetch(
      `https://api.github.com/search/users?q=${query}&page=${page}&per_page=${perPage2}`
    ).then((res) => res.json());
  };

  console.log(perPage2, "perPage2");
  console.log(perPage, "perPage");
  useEffect(() => {
    getUsers({
      page,
      query
    })
      .then((res) => {
        setData(res);
        console.log(res);
        if (res.total_count) {
          const totalPage = Math.ceil(res.total_count / perPage2);
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

  const handleChange2 = (e) => {
    setPerPage(e.target.value);
  };

  const handleSubmit2 = () => {
    setPerPage2(perPage);
  };
  const handleSubmit = () => {
    setQuery(text);
  };

  const isAuth = useSelector((state) => state.auth.isAuth);
  return isAuth ? (
    <div className="App">
      <div style={{ margin: "20px" }}>
        <div>
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
        <div>
          <input
            placeholder="Change perPage value"
            style={{
              height: "30px",
              padding: "5px",
              border: "2px solid blue",
              borderRadius: "10px",
              fontSize: "17px"
            }}
            onChange={handleChange2}
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
            onClick={handleSubmit2}
          >
            Change perPage Value
          </button>
        </div>
      </div>
      {isLoading ? (
        <h3>Loading ...</h3>
      ) : (
        <>
          {data?.items?.map((user) => (
            <UserCard
              id={user.login}
              key={user.id}
              name={user.login}
              url={user.url}
              avatar={user.avatar_url}
              type={user.type}
            />
          ))}
        </>
      )}
      <Pagination
        currentPage={page}
        onClickCallback={handlePageChange}
        totalPage={totalPage}
      />
    </div>
  ) : (
    <Login />
  );
};
export default Search;
