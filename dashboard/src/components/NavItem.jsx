import {Link} from "react-router-dom";
import ListItem from "@mui/material/ListItem/ListItem";
import Paper from "@mui/material/Paper/Paper";

import { styled } from "@mui/system";

const Item = styled("div")({
  display: "flex",
  position: "relative",
  width: "100%",
  height: "100%",
  cursor: "pointer",
  ".hoverPaper": {
    background: "black",
    position: "absolute",
    left: "100%",
    top: 0,
    bottom: "auto",
    width: "auto",
    height: "60px",
    color: "green",
    padding: "6px 10px",
    borderRadius: 0,
    display: "none",
  },
  "&:hover": {
    ".hoverPaper": {
      display: "flex",
    },
  },
});

export function NavItem({ icon, badge, link }) {
  return (
    <Link to={link}>
    <ListItem
      sx={{
        width: "100%",
        color: "#ffffff99",
        background: "black",
        height: "60px",
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="nav-item"
    >
      <Item className="d-flex-center">
        {icon}
        <Paper className="hoverPaper d-flex-center">{badge}</Paper>
      </Item>
    </ListItem>
    </Link>
  );
}
