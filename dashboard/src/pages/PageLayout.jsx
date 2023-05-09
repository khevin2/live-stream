import { createContext, useEffect, useState } from "react";
import { Box } from "@mui/system";

import "./../assets/bootstrap-5.1.3-dist/css/bootstrap.min.css";
import "../App.css";
import Header from "../components/Header";
import Nav from "../components/Nav";
import CreateArticle from "../components/CreateArticle";
import useWindowSize from "../hooks/useWindowResize.hook";
import Logs from "../components/Logs";

export const MenuContext = createContext(null);

function PageLayout({children}) {
  const [left, setLeft] = useState(0);
  const [menuOpen, setMenuOpen] = useState(Boolean(left));
  const size = useWindowSize();
  const [width, setWidth] = useState(size.width);

  useEffect(() => {
    if (width > 600) setLeft(60);
    else setLeft(0);
  }, [width]);

  useEffect(() => {
    setMenuOpen(Boolean(left));
  }, [left]);

  useEffect(() => {
    setWidth(size.width);
  }, [size.width]);

  function handleOpenNav() {
    setMenuOpen(!menuOpen);
  }

  return (
    <MenuContext.Provider value={{ menuOpen, left, width }}>
      <>
        {menuOpen && <Nav />}
        <Header handleOpenNav={handleOpenNav} />
        <Box sx={{ position:"absolute",
        width:`calc(100% - ${left}px)`,
        height:"100%",
        left:`${left}px`,
        right:"auto",
        top:65,
        bottom:"auto"
         }}
        >
          {children}
        </Box>
        {/* <CreateArticle /> */}
        {/*<Logs />*/}
        
      </>
    </MenuContext.Provider>
  );
}

export default PageLayout;
