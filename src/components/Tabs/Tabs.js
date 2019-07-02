import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import List from '../../containers/List/List';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import '../../containers/List/List.scss';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          <LinkTab label="Uppgifter att göra" href="/drafts" />
          <LinkTab label="Färdiga uppgifter" href="/trash" />
        </Tabs>
      </AppBar>
      <Container classes={{root: 'main-container'}}>
      {value === 0 && <TabContainer classes={{root: 'list-container'}}>
      <Typography variant="h4" gutterBottom>
        Uppgifter att göra
      </Typography>
        <List tasks={props.tasks} deleted={props.deleted} />
      <FormControl classes={{root: 'form-extend'}}>
        <InputLabel htmlFor="component-simple">Lägg till uppgift</InputLabel>
        <Input classes={{root: 'add-input'}} id="component-simple" onChange={props.changed} value={props.currentValue} />
      <Fab aria-label="Add" onClick={props.addTask} className={classes.fab} color="primary">
          <AddIcon />
      </Fab>
      </FormControl>
      </TabContainer>}
      {value === 1 && <TabContainer>Page Two</TabContainer>}
      </Container>
    </div>
  );
}