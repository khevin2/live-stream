import FormControl from "@mui/material/FormControl/FormControl";
import Box from "@mui/system/Box/Box";

export default function CreateArticleForm() {
  return (
    <Box sx={{ width: "50%", border: "1px solid black" }}>
      <form>
        <Box
          sx={{
            width: "auto",
            height: "250px",
            border: "1px solid black",
          }}
        >
          <img src="#" alt="Main image" className="img" />
        </Box>
        <FormControl></FormControl>
      </form>
    </Box>
  );
}
