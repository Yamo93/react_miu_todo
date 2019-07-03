import React, { Component } from 'react';
import './App.scss';
import Tabs from './components/Tabs/Tabs';
import uuid from 'uuid';

class App extends Component {

  state = {
    tasks: [],
    doneTasks: [],
    task: {
      text: '',
      id: null,
      done: false
    },
    snackbar: false,
    snackbarType: null,
    editDialogShown: false,
    currentlyEditedTaskID: null,
    editedValue: ''
  }

  addTaskHandler = () => {
    this.setState(prevState => {
      let newTasks = [...prevState.tasks];
      newTasks.push({
        ...this.state.task,
        id: uuid.v4()
      });
      
      if (prevState.task.text === '') {
        return {
          snackbar: true,
          snackbarType: 'error'
        };
      }

      return {
        tasks: newTasks,
        task: {
          text: '',
          id: null,
          done: false
        },
        snackbar: true,
        snackbarType: 'success'
      };
    });
  }

  editTaskHandler = (id, value) => {
    this.setState(prevState => {
      return {
        tasks: this.state.tasks.filter(task => {
          if (id === task.id) {
            task.text = value;
            task.done = false; // återställer den till ogjord
          }

          return true;
        }),
        task: {
          ...prevState.task,
          text: ''
        },
        editDialogShown: false,
        editedValue: ''
      };
    });
  }
  
  openEditDialog = (id) => {
    this.setState({editDialogShown: true, currentlyEditedTaskID: id});
  }
  
  closeEditDialog = () => {
    this.setState({editDialogShown: false});
  }

  inputChangeHandler = (event) => {
    this.setState({task: {
      text: event.target.value,
      id: null,
      done: false
      }
    });
  }

  editInputChangeHandler = (event) => {
    this.setState({editedValue: event.target.value});
  }

  deleteTaskHandler = (id) => {
    this.setState(prevState => {
      return {
        tasks: prevState.tasks.filter(task => {
          return task.id !== id;
        })
      };
    });
  }

  openSnackbar = (type) => {
    this.setState(prevState => {
      return {
        snackbar: true,
        snackbarType: type
      };
    });
  }

  closeSnackbar = (event) => {
    this.setState({snackbar: false});
  }

  toggleAsDone = (id) => {
    console.log('hey from toggle method');
    this.setState(prevState => {
      return {
        tasks: prevState.tasks.map(task => {
          // Inte den som ska uppdateras
          if (id !== task.id) {
            return task;
          }

          return {
            ...task,
            done: !task.done
          }
        })
      }
    });

    this.setState(prevState => {
      return {
        doneTasks: prevState.tasks.filter(task => task.done === true)
      };
    })
  }

  render() {
    return (
      <div className="App">
        <Tabs changed={this.inputChangeHandler} 
        addTask={this.addTaskHandler} 
        currentValue={this.state.task.text} 
        editedValue={this.state.editedValue} 
        tasks={this.state.tasks} 
        deleted={this.deleteTaskHandler} 
        snackbar={this.state.snackbar} 
        snackbarType={this.state.snackbarType} 
        closeSnackbar={this.closeSnackbar} 
        openEdit={this.openEditDialog} 
        closeEdit={this.closeEditDialog} 
        dialogShown={this.state.editDialogShown} 
        edited={this.editTaskHandler} 
        editID={this.state.currentlyEditedTaskID} 
        editedChange={this.editInputChangeHandler} 
        toggled={this.toggleAsDone} />
      </div>
    );
  }
}

export default App;
