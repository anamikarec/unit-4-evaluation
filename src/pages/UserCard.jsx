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

const UserCard = ({ id, name, url, avatar, type }) => {
  return (
    <div>
      <Box sx={{ flexGrow: 3, margin: "10px", padding: "10px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={4}>
            <Item>
              {" "}
              <img width="50" src={avatar} alt={id} />{" "}
            </Item>
            <Item>Name : {name}</Item>
            <Item>Type : {type}</Item>
            <Item> {url} </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default UserCard;
