import { useEffect, useState, useContext } from "react";
import {
  Box,
  Paper,
  Typography,
  Container,
  Grow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../../environment";
import { AuthContext } from "../../../context/AuthContext";

const NoticeStudent = () => {
  const [notices, setNotices] = useState([]);
  const { themeDark } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get(`${baseUrl}/notices/fetch/student`);
        setNotices(response.data);
      } catch (error) {
        console.error("Error fetching notices", error);
      }
    };
    fetchNotices();
  }, []);

  const backgroundStyle = {
    minHeight: "100vh",
    background: themeDark
      ? "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
      : "linear-gradient(135deg, #d9afd9, #97d9e1)",
    padding: isMobile ? "1rem" : "2rem",
    transition: "all 0.3s ease",
    color: themeDark ? "#fff" : "#111",
  };

  const paperStyle = {
    p: isMobile ? 2 : 3,
    m: isMobile ? "1rem 0" : "1.5rem auto",
    width: "100%",
    maxWidth: "700px",
    borderRadius: "16px",
    backgroundColor: themeDark
      ? "rgba(30, 41, 59, 0.8)"
      : "rgba(255, 255, 255, 0.75)",
    color: themeDark ? "#e0f2fe" : "#111",
    backdropFilter: "blur(8px)",
    boxShadow: themeDark
      ? "0 4px 20px rgba(255, 255, 255, 0.1)"
      : "0 4px 20px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  return (
    <Box style={backgroundStyle}>
      <Container maxWidth="md">
        <Typography
          variant={isMobile ? "h5" : "h4"}
          align="center"
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Notice Board
        </Typography>

        {notices.map((notice, index) => (
          <Grow in timeout={500 + index * 150} key={notice._id}>
            <Paper sx={paperStyle}>
              <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
                {notice.title}
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: isMobile ? "0.9rem" : "1rem" }}
              >
                {notice.message}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: isMobile ? "0.8rem" : "0.9rem" }}
              >
                Audience: {notice.audience} | Date:{" "}
                {new Date(notice.date).toLocaleDateString()}
              </Typography>
            </Paper>
          </Grow>
        ))}
      </Container>
    </Box>
  );
};

export default NoticeStudent;
