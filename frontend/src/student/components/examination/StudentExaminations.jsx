import React, { useEffect, useState, useContext } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Paper,
  useMediaQuery,
  useTheme,
  Chip,
} from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import axios from 'axios';
import { baseUrl } from '../../../environment';
import { AuthContext } from '../../../context/AuthContext';
import { motion } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

Chart.register(ArcElement);

const AttendanceStudent = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [chartData, setChartData] = useState([0, 0]);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState(null);
  const [classDetails, setClassDetails] = useState(null);
  const { themeDark } = useContext(AuthContext);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const dateConvert = (date) => {
    const d = new Date(date);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  };

  const chartDataFunc = (data) => {
    let present = 0;
    let absent = 0;
    data.forEach((entry) => {
      if (entry.status === 'Present') present++;
      else if (entry.status === 'Absent') absent++;
    });
    setChartData([present, absent]);
  };

  const getStudentDetails = () => {
    axios
      .get(`${baseUrl}/student/fetch-own`)
      .then((resp) => {
        setStudentId(resp.data.data._id);
        setClassDetails({
          id: resp.data.data.student_class._id,
          class: resp.data.data.student_class.class_text,
        });
      })
      .catch((e) => {
        console.log('Error in student', e);
      });
  };

  useEffect(() => {
    getStudentDetails();
  }, []);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/attendance/${studentId}`);
        setAttendanceData(response.data);
        chartDataFunc(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        setLoading(false);
      }
    };

    if (studentId) {
      fetchAttendanceData();
    }
  }, [studentId]);

  const backgroundStyle = {
    minHeight: '100vh',
    background: themeDark
      ? 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)'
      : 'linear-gradient(135deg, #d9afd9, #97d9e1)',
    transition: 'all 0.3s ease',
    padding: isMobile ? '1rem' : '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const presentPercentage =
    attendanceData.length > 0
      ? Math.round((chartData[0] / attendanceData.length) * 100)
      : 0;

  if (loading)
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: backgroundStyle.background,
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box style={backgroundStyle}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            gutterBottom
            sx={{ textAlign: 'center', fontWeight: 600, color: themeDark ? '#fff' : '#111' }}
          >
            Your Attendance{' '}
            {classDetails && (
              <Typography component="span" fontWeight={400}>
                [ Class: {classDetails.class} ]
              </Typography>
            )}
          </Typography>

          <Paper
            elevation={6}
            sx={{
              mt: 4,
              p: isMobile ? 2 : 4,
              borderRadius: 4,
              backdropFilter: 'blur(8px)',
              backgroundColor: themeDark
                ? 'rgba(18, 18, 18, 0.7)'
                : 'rgba(255, 255, 255, 0.85)',
              color: themeDark ? '#fff' : '#111',
            }}
          >
            <Box
              display="flex"
              flexDirection={{ xs: 'column', md: 'row' }}
              gap={4}
              alignItems="stretch"
            >
              {/* Chart Section */}
              <Box flex={1} minWidth="250px" textAlign="center">
                <Typography variant="h6" gutterBottom>
                  Attendance Summary
                </Typography>
                <Pie
                  data={{
                    labels: ['Present', 'Absent'],
                    datasets: [
                      {
                        data: chartData,
                        backgroundColor: ['#4caf50', '#f44336'],
                        hoverOffset: 6,
                      },
                    ],
                  }}
                />
                <Typography mt={2}>
                  Present: <strong>{presentPercentage}%</strong>
                </Typography>
              </Box>

              {/* Table Section */}
              <Box flex={2} sx={{ overflowX: 'auto' }}>
                <Typography variant="h6" mb={2}>
                  Attendance Records
                </Typography>

                {attendanceData.length === 0 ? (
                  <Typography color="text.secondary" mt={2}>
                    No attendance records available.
                  </Typography>
                ) : (
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {attendanceData.map((record) => (
                        <TableRow key={record._id}>
                          <TableCell>{dateConvert(record.date)}</TableCell>
                          <TableCell>
                            <Chip
                              icon={
                                record.status === 'Present' ? (
                                  <CheckCircleIcon color="success" />
                                ) : (
                                  <CancelIcon color="error" />
                                )
                              }
                              label={record.status}
                              sx={{
                                backgroundColor:
                                  record.status === 'Present'
                                    ? '#e8f5e9'
                                    : '#ffebee',
                                color:
                                  record.status === 'Present'
                                    ? '#2e7d32'
                                    : '#c62828',
                                fontWeight: 'bold',
                              }}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AttendanceStudent;
