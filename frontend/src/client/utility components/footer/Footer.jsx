import React from 'react';
import { Typography, Container, Grid, Box, IconButton, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';

function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        py: 6,
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 700, letterSpacing: '.1rem' }}>
              EduSync
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Empowering education through seamless digital management. Bringing students, teachers, and parents together on one unified platform.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>
              Quick Links
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body2" component={Link} to="/" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>Home</Typography>
              <Typography variant="body2" component={Link} to="/contact" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>Contact Us</Typography>
              <Typography variant="body2" component={Link} to="/login" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>Login</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Email: support@edusync.com
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Phone: +1 234 567 890
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Address: 123 Education Lane, Tech City
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>
              Connect With Us
            </Typography>
            <Box>
              <IconButton aria-label="Facebook" color="inherit" sx={{ '&:hover': { color: '#1877F2' } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Twitter" color="inherit" sx={{ '&:hover': { color: '#1DA1F2' } }}>
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="Instagram" color="inherit" sx={{ '&:hover': { color: '#E4405F' } }}>
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="LinkedIn" color="inherit" sx={{ '&:hover': { color: '#0A66C2' } }}>
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Box textAlign="center">
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} EduSync. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
