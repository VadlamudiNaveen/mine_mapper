import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Tabs,
  Tab,
} from "@mui/material";
import MineMap from "./map_front_end/MineMap";
import MineInfoForm from "./form_data_front_end/FormData";

const App = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  // Handlers for opening and closing modals
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);
  const handleSignupOpen = () => setSignupOpen(true);
  const handleSignupClose = () => setSignupOpen(false);

  const handleTabChange = (event, newValue) => setSelectedTab(newValue);

  return (
    <>
      {/* Navigation Bar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#1A1A2E",
          color: "#EAEAEA",
        }}
        elevation={1}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Mine Explorer
          </Typography>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="Home" />
            <Tab label="Map" />
            <Tab label="Form" />
          </Tabs>
          <Box>
            <Button
              sx={{
                color: "#EAEAEA",
                textTransform: "none",
                fontWeight: 500,
              }}
              onClick={handleLoginOpen}
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                ml: 2,
                backgroundColor: "#FF6F61",
                textTransform: "none",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "#E65C50",
                },
              }}
              onClick={handleSignupOpen}
            >
              Signup
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ mt: 8, pt: 5, pb: 8, backgroundColor: "#F0F0F5" }}>
        <Container maxWidth="lg">
          {/* Conditionally Render Content Based on Tab */}
          {selectedTab === 0 && (
            <>
              {/* Welcome Section */}
              <Paper
                elevation={3}
                sx={{
                  p: 5,
                  textAlign: "center",
                  borderRadius: 2,
                  backgroundColor: "#FFFFFF",
                  mb: 5,
                }}
              >
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{ fontWeight: 700, color: "#1A1A2E" }}
                >
                  Welcome to Mine Explorer
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#4A4A57", mb: 3 }}
                >
                  Discover, map, and explore mines across the globe. Join us to
                  share and access mine data.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mt: 3,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#FF6F61",
                      textTransform: "none",
                      fontWeight: 500,
                      "&:hover": {
                        backgroundColor: "#E65C50",
                      },
                    }}
                    size="large"
                    onClick={handleSignupOpen}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#1A1A2E",
                      color: "#1A1A2E",
                      textTransform: "none",
                      fontWeight: 500,
                      "&:hover": {
                        borderColor: "#FF6F61",
                        color: "#FF6F61",
                      },
                    }}
                    size="large"
                    onClick={handleLoginOpen}
                  >
                    Login
                  </Button>
                </Box>
              </Paper>
            </>
          )}

          {selectedTab === 1 && (
            <Grid container spacing={4}>
              {/* Map Section */}
              <Grid item xs={12}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <Typography
                    variant="h5"
                    align="center"
                    gutterBottom
                    sx={{ color: "#1A1A2E" }}
                  >
                    Map View
                  </Typography>
                  <Box sx={{ height: "500px" }}>
                    <MineMap />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}

          {selectedTab === 2 && (
            <Grid container spacing={4}>
              {/* Form Section */}
              <Grid item xs={12}>
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <Typography
                    variant="h5"
                    align="center"
                    gutterBottom
                    sx={{ color: "#1A1A2E" }}
                  >
                    Submit Mine Information
                  </Typography>
                  <MineInfoForm />
                </Paper>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>

      {/* Login Dialog */}
      <Dialog open={loginOpen} onClose={handleLoginClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: "#1A1A2E" }}>Login</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginClose} sx={{ color: "#FF6F61" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF6F61",
              "&:hover": {
                backgroundColor: "#E65C50",
              },
            }}
          >
            Login
          </Button>
        </DialogActions>
      </Dialog>

      {/* Signup Dialog */}
      <Dialog open={signupOpen} onClose={handleSignupClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: "#1A1A2E" }}>Signup</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSignupClose} sx={{ color: "#FF6F61" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#FF6F61",
              "&:hover": {
                backgroundColor: "#E65C50",
              },
            }}
          >
            Signup
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default App;
