/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import { baseUrl } from "../../../environment";
import PersonIcon from "@mui/icons-material/Person";
import { motion } from "framer-motion";

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const { themeDark } = useContext(AuthContext);

  const getStudentDetails = () => {
    axios
      .get(`${baseUrl}/student/fetch-own`)
      .then((resp) => {
        setStudent(resp.data.data);
      })
      .catch((e) => {
        console.log("Error in student", e);
      });
  };

  useEffect(() => {
    getStudentDetails();
  }, []);

  const backgroundStyle = {
    minHeight: "100vh",
    background: themeDark
      ? "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
      : "linear-gradient(135deg, #d9afd9, #97d9e1)",
    padding: "2rem",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={backgroundStyle}>
      <Container maxWidth="sm">
        {student && (
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Card
              sx={{
                p: 3,
                borderRadius: 4,
                boxShadow: 6,
                backdropFilter: "blur(8px)",
                backgroundColor: themeDark
                  ? "rgba(18, 18, 18, 0.7)"
                  : "rgba(255, 255, 255, 0.7)",
                color: themeDark ? "#fff" : "#111",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                {student.student_image ? (
                  <Avatar
                    src={`/images/uploaded/student/${student.student_image}`}
                    alt={student.name}
                    sx={{
                      width: 100,
                      height: 100,
                      border: "3px solid white",
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      backgroundColor: "#2196f3",
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 50 }} />
                  </Avatar>
                )}
              </Box>

              <CardContent>
                <Grid container spacing={2}>
                  {[
                    { label: "Name", value: student.name },
                    { label: "Email", value: student.email },
                    {
                      label: "Class",
                      value: student.student_class?.class_text,
                    },
                    { label: "Age", value: student.age },
                    { label: "Gender", value: student.gender },
                    { label: "Guardian", value: student.guardian },
                  ].map(
                    (field, idx) =>
                      field.value && (
                        <Grid item xs={12} sm={6} key={idx}>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {field.label}
                          </Typography>
                          <Typography variant="body2">
                            {field.value}
                          </Typography>
                        </Grid>
                      )
                  )}
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </Container>
    </div>
  );
};

export default StudentDetails;
