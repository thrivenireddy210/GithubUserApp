import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
import UsersList from './UsersList';
import UserDetails from './UserDetails';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4), 
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">GitHub User App</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/user/:username" element={<UserDetails />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
