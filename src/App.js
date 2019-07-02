import React, { Component } from 'react';
import './App.scss';
import Tabs from './components/Tabs/Tabs';
import uuid from 'uuid';

class App extends Component {

  state = {
    tasks: [],
    task: {
      text: '',
      id: null
    }
  }

  addTaskHandler = () => {
    this.setState(prevState => {
      let newTasks = [...prevState.tasks];
      newTasks.push({
        ...this.state.task,
        id: uuid.v4()
      });

      return {
        tasks: newTasks,
        task: {
          text: '',
          id: null
        }
      };
    });
  }

  editTaskHandler = (id, event) => {
    
  }

  inputChangeHandler = (event) => {
    this.setState({task: {
      text: event.target.value,
      id: null
      }
    });
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

  render() {
    return (
      <div className="App">
        <Tabs changed={this.inputChangeHandler} addTask={this.addTaskHandler} currentValue={this.state.task.text} tasks={this.state.tasks} deleted={this.deleteTaskHandler} />
      </div>
    );
  }
}

export default App;
