import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Avatar, ListItem, ListItemText, ListItemAvatar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = 'https://api.github.com';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" style={{ marginBottom: '20px' }}>List of GitHub Users</Typography>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item key={user.id} xs={12} sm={6} md={3}>
            <Card elevation={3} component={Link} to={`/user/${user.login}`} style={{ textDecoration: 'none', color: 'inherit', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <ListItem button >
                <ListItemAvatar>
                  <Avatar alt={user.login} src={user.avatar_url} />
                </ListItemAvatar>
                <ListItemText primary={`${user.name || user.login}`} secondary={user.login} />
              </ListItem>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {user.bio ? user.bio : 'GitHub Bio'}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  📍 Location: {user.location || 'Not specified'}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  🚀 Followers: {user.followers || 'N/A'}
                </Typography>
              </CardContent>
              <Button variant="contained" color="primary" component={Link} to={`/user/${user.login}`} style={{ margin: '10px' }}>
                View Details
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UsersList;
