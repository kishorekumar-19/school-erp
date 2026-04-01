import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Button
} from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import Carousel from "./carousel/Carousel";
import Gallery from "./gallery/Gallery";
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AssessmentIcon from '@mui/icons-material/Assessment';

const Home = () => {
  const testimonials = [
    {
      quote:
        "This school has been a fantastic experience for my children. The faculty is supportive, and the programs are enriching!",
      name: "Parent of Grade 3 Student",
      initial: "P",
    },
    {
      quote:
        "Amazing curriculum and teachers! My child loves going to school every day.",
      name: "Parent of Grade 1 Student",
      initial: "A",
    },
    {
      quote:
        "Great focus on overall development beyond academics. Highly recommended.",
      name: "Parent of Grade 5 Student",
      initial: "G",
    },
  ];

  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // ✅ Autoplay effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // change slide every 5 seconds
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <Box sx={{ width: "100%", bgcolor: "background.default" }}>
      {/* Carousel Section */}
      <Carousel />

      {/* Features for Students */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 800, mb: 2 }}>
          Empowering Students
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" mb={6} sx={{ maxWidth: 600, mx: 'auto' }}>
          Interactive tools and resources designed to make learning engaging and effective.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {[
            { title: "Interactive Learning", icon: <LibraryBooksIcon fontSize="large" color="primary" />, desc: "Access study materials, assignments, and quizzes anytime." },
            { title: "Track Progress", icon: <AssessmentIcon fontSize="large" color="secondary" />, desc: "Keep track of your academic performance with detailed analytics." },
            { title: "Achievements", icon: <EmojiEventsIcon fontSize="large" sx={{ color: '#fbbf24' }} />, desc: "Earn recognition for your hard work and participation." }
          ].map((feature, idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <Box sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ mb: 2, display: 'inline-flex', p: 2, borderRadius: '50%', bgcolor: 'background.paper', boxShadow: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1.5 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits for Parents */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 800, mb: 2 }}>
            Peace of Mind for Parents
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" mb={6} sx={{ maxWidth: 600, mx: 'auto' }}>
            Stay connected with your child's educational journey every step of the way.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { title: "Real-time Updates", icon: <NotificationsActiveIcon fontSize="large" color="primary" />, desc: "Get instant notifications on attendance, grades, and events." },
              { title: "Direct Communication", icon: <SupervisorAccountIcon fontSize="large" sx={{ color: '#10b981' }} />, desc: "Easily communicate with teachers and school administrators." },
              { title: "Holistic Overview", icon: <SchoolIcon fontSize="large" color="secondary" />, desc: "View a complete profile of your child's academic life." }
            ].map((benefit, idx) => (
              <Grid item xs={12} sm={4} key={idx}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, borderRadius: 4 }}>
                  <Box sx={{ mb: 2 }}>
                    {benefit.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1.5, textAlign: 'center' }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" textAlign="center">
                    {benefit.desc}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Programs Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Our Programs
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          mb={5}
        >
          Designed to empower and inspire students at every stage.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {["Elementary School", "Middle School", "High School"].map(
            (program) => (
              <Grid item xs={12} sm={6} md={4} key={program}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 3,
                    borderRadius: 4,
                    boxShadow: 4,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      align="center"
                      sx={{ fontWeight: 600 }}
                    >
                      {program}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      </Container>

      {/* Gallery Section */}
      <Box sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            Registered Schools
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            mb={5}
          >
            See some of the schools that have joined our platform.
          </Typography>
          <Gallery />
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          bgcolor: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            What Parents Say
          </Typography>

          <SwipeableViews
            index={testimonialIndex}
            onChangeIndex={setTestimonialIndex}
            enableMouseEvents
          >
            {testimonials.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  mt: 4,
                  p: { xs: 3, md: 4 },
                  bgcolor: "background.paper",
                  borderRadius: 4,
                  boxShadow: 4,
                  textAlign: "center",
                  maxWidth: 700,
                  mx: "auto",
                }}
              >
                {/* Avatar / Initial */}
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    mx: "auto",
                    mb: 2,
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    fontWeight: 600,
                    boxShadow: 2,
                  }}
                >
                  {item.initial}
                </Box>

                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{
                    fontStyle: "italic",
                    mb: 2,
                    fontWeight: 500,
                    px: { xs: 1, md: 3 },
                  }}
                >
                  "{item.quote}"
                </Typography>

                <Typography variant="subtitle2" color="text.secondary">
                  - {item.name}
                </Typography>
              </Box>
            ))}
          </SwipeableViews>

          {/* Dots */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            {testimonials.map((_, idx) => (
              <Box
                key={idx}
                onClick={() => setTestimonialIndex(idx)}
                sx={{
                  width: 10,
                  height: 10,
                  mx: 0.7,
                  bgcolor:
                    testimonialIndex === idx ? "primary.main" : "grey.400",
                  borderRadius: "50%",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
