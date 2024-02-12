import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Grid, Paper, Button, Link, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://api.github.com';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: 'auto',
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const UserDetails = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!username) {
          console.error('Invalid route parameters');
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/users/${username}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [username]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={8}>
        {user && (
          <Paper elevation={3} className={classes.paper}>
            <Avatar alt={user.login} src={user.avatar_url} className={classes.avatar} />
            <Typography variant="h4" style={{ margin: '15px 0', fontWeight: 'bold' }}>
              {user.name || user.login}
            </Typography>
            <Typography variant="subtitle1" style={{ margin: '5px 0', color: 'gray' }}>
              {user.login}
            </Typography>
            <Typography variant="body1" style={{ margin: '10px 0' }}>
              {user.bio || 'GitHub Bio'}
            </Typography>
            <Typography variant="body1" style={{ margin: '5px 0' }}>
              📍 Location: {user.location || 'Not specified'}
            </Typography>
            <Typography variant="body1" style={{ margin: '5px 0' }}>
              📧 Email: {user.email || 'N/A'}
            </Typography>
            <Typography variant="body1" style={{ margin: '5px 0' }}>
              🐦 Twitter: {user.twitter_username || 'N/A'}
            </Typography>
            <Typography variant="body1" style={{ margin: '5px 0' }}>
              🌐 Blog: <Link href={user.blog} target="_blank" rel="noopener">{user.blog || 'N/A'}</Link>
            </Typography>
            <Typography variant="body1" style={{ margin: '5px 0' }}>
              📚 Public Repositories: {user.public_repos || 'N/A'}
            </Typography>
            <Typography variant="body1" style={{ margin: '5px 0' }}>
              🌟 Public Gists: {user.public_gists || 'N/A'}
            </Typography>
            <Typography variant="body1" style={{ margin: '5px 0' }}>
              👥 Followers: {user.followers || 'N/A'}
            </Typography>
            <Typography variant="body1" style={{ margin: '5px 0' }}>
              👣 Following: {user.following || 'N/A'}
            </Typography>
            <Typography variant="body1" style={{ margin: '5px 0' }}>
              📅 Joined GitHub: {new Date(user.created_at).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" style={{ margin: '5px 0' }}>
              🔄 Last Updated: {new Date(user.updated_at).toLocaleDateString()}
            </Typography>
            <Button variant="contained" color="primary" className={classes.button} onClick={handleBack}>
              Back to User List
            </Button>
            <Button variant="contained" color="primary" className={classes.button}>
              <Link href={user.html_url} target="_blank" rel="noopener" style={{ color: 'white', textDecoration: 'none' }}>
                View on GitHub
              </Link>
            </Button>
          </Paper>
        )}
      </Grid>
    </Grid>
  );
};

export default UserDetails;
