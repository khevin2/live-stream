import { Box } from "@mui/system";
import { useContext } from "react";
import { MenuContext } from "../pages/PageLayout";
import CreateArticleForm from "./createArticleForm";

export default function CreateArticle() {
  const { left } = useContext(MenuContext);
  console.log(left);
  return (
    <Box
      sx={{
        left: `${left}px`,
        position: "absolute",
        top: "65px",
        bottom: "auto",
        height: `calc(100% - 65px)`,
        width: `calc(100% - ${left}px)`,
      }}
    >
      <CreateArticleForm />
    </Box>
  );
}
