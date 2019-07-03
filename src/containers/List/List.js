import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Delete from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/EditOutlined';

import FormDialog from '../../mui-components/FormDialog/FormDialog';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const handleToggle = task => () => {
    // const currentIndex = checked.indexOf(task);
    const newChecked = [...checked];
    props.toggled(task.id);

    setChecked(newChecked);
  };

  return (
    <List classes={{root: 'centered'}}>
      {props.tasks.map((task, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <ListItem key={task.id} role={undefined} dense button onClick={handleToggle(task)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={task.done}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${task.text}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="Edit" onClick={(id) => props.openEdit(task.id)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={(id) => props.deleted(task.id)} edge="end" aria-label="Delete">
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
      <FormDialog closeEdit={props.closeEdit} dialogShown={props.dialogShown} changed={props.changed} currentValue={props.currentValue} edited={props.edited} editID={props.editID} editedValue={props.editedValue} editedChange={props.editedChange} />
    </List>
  );
}