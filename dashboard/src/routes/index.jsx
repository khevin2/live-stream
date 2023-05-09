import { Routes, Route } from "react-router-dom";

import PageLayout from "../pages/PageLayout.jsx";
import Logs from "../components/Logs.jsx";
import CreateArticle from "../components/CreateArticle.jsx"
import AddMatch from "../components/AddMatch"

const index = () => {
  return (
    <Routes>
      <Route exact path="/dashboard/create" element={<PageLayout><CreateArticle/></PageLayout>} />
      <Route exact path="/dashboard/addMatch" element={<PageLayout><AddMatch/></PageLayout>} />
      <Route exact path="/dashboard/" element={<PageLayout><Logs/></PageLayout>} />
    </Routes>
  );
};
export default index;