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
    snackbarMessage: null,
    editDialogShown: false,
    currentlyEditedTaskID: null,
    editedValue: '',
    currentValue: ''
  }

  componentDidMount() {
    let storedTasks = JSON.parse(localStorage.getItem('myTasks')) || [];
    let LSDoneTasks = JSON.parse(localStorage.getItem('doneTasks')) || [];

    // Lägger in alla done tasks i staten igen (genom att söka i arrayen från LS)
    // let doneTasks = storedTasks.filter(task => task.done === true);
    this.setState({tasks: storedTasks, doneTasks: LSDoneTasks});

  }

  saveTasksInLS = (itemName, tasks) => {
    localStorage.setItem(itemName, JSON.stringify(tasks));
  }

  clearDoneTasks = () => {
    // Rensa från LS
    this.saveTasksInLS('doneTasks', []);
    let myTasks = [];

    // Rensa från state (i båda arrays, så endast ogjorda tasks förblir)
    this.setState(prevState => {
      myTasks = prevState.tasks.filter(task => task.done === false);

      this.saveTasksInLS('myTasks', myTasks);
      return {
        doneTasks: [],
        tasks: myTasks
      };
    });
  }

  addTaskHandler = (event) => {
    if (event.type === 'keyup'  && event.keyCode !== 13) {
      return false;
    }

    let newTasks = [];
    this.setState(prevState => {
      newTasks = [...prevState.tasks];
      newTasks.push({
        ...this.state.task,
        id: uuid.v4()
      });

      
      
      if (prevState.task.text === '') {
        return {
          snackbar: true,
          snackbarType: 'error',
          snackbarMessage: 'Du måste fylla i fältet.'
        };
      }

      this.saveTasksInLS('myTasks', newTasks);

      return {
        tasks: newTasks,
        task: {
          text: '',
          id: null,
          done: false
        },
        snackbar: true,
        snackbarType: 'success',
        snackbarMessage: 'Uppgiften har lagts till!',
        currentValue: ''
      };
    });
  }

  editTaskHandler = (id, value) => {
    let editedTasks = [];

    this.setState(prevState => {
      editedTasks = prevState.tasks.filter(task => {
        if (id === task.id) {
          task.text = value;
          task.done = false; // återställer den till ogjord
        }

        return true;
      });

      this.saveTasksInLS('myTasks', editedTasks);

      return {
        tasks: editedTasks,
        task: {
          ...prevState.task,
          text: ''
        },
        editDialogShown: false,
        editedValue: '',
        snackbar: true,
        snackbarType: 'success',
        snackbarMessage: 'Uppgiften har ändrats.',
        // doneTasks: prevState.tasks.filter(task => task.done === true)
        doneTasks: JSON.parse(localStorage.getItem('doneTasks')) || []
      };
    });
    
  }
  
  openEditDialog = (id) => {
    this.setState({editDialogShown: true, 
      currentlyEditedTaskID: id
    });
  }
  
  closeEditDialog = () => {
    this.setState({editDialogShown: false});
  }

  inputChangeHandler = (event) => {
    this.setState({task: {
      text: event.target.value,
      id: null,
      done: false
      },
      currentValue: event.target.value
    });
  }

  editInputChangeHandler = (event) => {
    this.setState({editedValue: event.target.value});
  }

  deleteTaskHandler = (id) => {
    let deletedTasks = [];
    this.setState(prevState => {
      deletedTasks = prevState.tasks.filter(task => {
        return task.id !== id;
      });

      this.saveTasksInLS('myTasks', deletedTasks);

      return {
        tasks: deletedTasks,
        snackbar: true,
        snackbarType: 'error',
        snackbarMessage: 'Uppgiften har raderats.'
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
    let LSDoneTasks = JSON.parse(localStorage.getItem('doneTasks')) || [];

    this.setState(prevState => {
      let newTask = {};
      let toggledTasks = [];
      prevState.tasks.forEach(task => {
          if (task.id === id) {
            newTask = {
              ...task,
              done: !task.done
            };
          }
      });

      toggledTasks = prevState.tasks.map(task => {
        // Inte den som ska uppdateras
        if (id !== task.id) {
          return task;
        }

        return {
          ...task,
          done: !task.done
        }
      });

      LSDoneTasks.push(newTask);

      // Kontrollerar att ingen ogjord task sparas
      LSDoneTasks = LSDoneTasks.filter(task => task.done === true);

      this.saveTasksInLS('myTasks', toggledTasks);
      this.saveTasksInLS('doneTasks', LSDoneTasks);

      return {
        tasks: toggledTasks,
        task: newTask,
        snackbar: true
      }
    });

    this.setState(prevState => {
      return {
        doneTasks: LSDoneTasks,
        snackbarType: prevState.task.done ? 'success' : 'warning',
        snackbarMessage: prevState.task.done ? 'Uppgiften är utförd!' : 'Uppgiften har sparats som ej utförd.'
      };
    });
  }

  render() {
    return (
      <div className="App">
        <Tabs changed={this.inputChangeHandler} 
        addTask={this.addTaskHandler} 
        currentValue={this.state.currentValue} 
        editedValue={this.state.editedValue} 
        tasks={this.state.tasks} 
        deleted={this.deleteTaskHandler} 
        snackbar={this.state.snackbar} 
        snackbarType={this.state.snackbarType} 
        snackbarMessage={this.state.snackbarMessage} 
        closeSnackbar={this.closeSnackbar} 
        openEdit={this.openEditDialog} 
        closeEdit={this.closeEditDialog} 
        dialogShown={this.state.editDialogShown} 
        edited={this.editTaskHandler} 
        editID={this.state.currentlyEditedTaskID} 
        editedChange={this.editInputChangeHandler} 
        toggled={this.toggleAsDone} 
        doneTasks={this.state.doneTasks} 
        clearDoneTasks={this.clearDoneTasks} />
      </div>
    );
  }
}

export default App;
