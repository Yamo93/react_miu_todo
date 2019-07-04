import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import Grid from '@material-ui/core/Grid';

import TaskIcon from '@material-ui/icons/Done';


import './AvatarList.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));


export default function InteractiveList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Grid item xs={12} md={6}>
          <div className={classes.demo}>
            <List>
                {props.doneTasks.map(doneTask => {
                    return (
                  <ListItem key={doneTask.id}>
                  <ListItemAvatar>
                    <Avatar classes={{root: 'taskicon'}}>
                      <TaskIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={doneTask.text}
                  />
                </ListItem>
                    );
                })}
            </List>
          </div>
        </Grid>
    </div>
  );
}