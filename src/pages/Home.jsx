import { useSelector } from "react-redux";
import Login from "./Login";
import { useState, useEffect } from "react";

import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary
}));

const UserCard = ({ id, name, url, avatar }) => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <img width="50" src={avatar} alt={id} />
            <Item>{name}</Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

const Pagination = ({ totalPage, onClickCallback, currentPage }) => {
  const pages = new Array(totalPage).fill(0).map((_, i) =>
    i + 1 === currentPage ? (
      <button key={i} disabled>
        {i + 1}
      </button>
    ) : (
      <button key={i} onClick={() => onClickCallback(i + 1)}>
        {i + 1}
      </button>
    )
  );
  return <div styles={{ display: "flex", gap: "1rem" }}>{pages}</div>;
};

const Home = () => {
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
        <input placeholder="...enter username" onChange={handleChange} />
        <button onClick={handleSubmit}>Search</button>
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
export default Home;
