import List from "@mui/material/List/List";
import AccountBalance from "@mui/icons-material/AccountBalance";
import IconButton from "@mui/material/IconButton/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";
import { NavItem } from "./NavItem";
import { Avatar, ListItem } from "@mui/material";
import companyLogo from "./../assets/react.svg";

export default function Nav() {
  return (
    <List
      sx={{
        width: "60px",
        background: "black",
        height: "100vh",
        zIndex:30
      }}
    >
      <ListItem
        sx={{ margin: "auto", padding: 0, marginBottom: "20px" }}
        className="d-flex-center"
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ margin: 0, padding: 0 }}
        >
          <Avatar alt="Company photo" src={companyLogo} />
        </IconButton>
      </ListItem>
      <NavItem icon={<AccountBalance />} badge="Name" link="/dashboard" />
      <NavItem icon={<AccountBalance />} badge="Name" link="/dashboard/create" />
      <NavItem icon={<AccountBalance />} badge="Live" link="/dashboard" /> 
      <NavItem icon={<AccountBalance />} badge="Add Match" link="/dashboard/addMatch" />     
    </List>
  );
}

const Container = styled.div`
  width: 50%;
  height: 100vh;
  background: "black";
`;
