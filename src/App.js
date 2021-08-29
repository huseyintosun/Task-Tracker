import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks';
import { useState } from 'react'
import { initialState } from './store/initialState';
import CreateTask from './components/CreateTask';


function App() {
  const [tasks, setTasks] = useState(initialState);
  const [isTaskBarShowed, setIsTaskBarShowed] = useState(false);

  //create a task
  const onCreate = (task) => {
    const id = Date.now();
    const newTask = { id, ...task }
    setTasks(
      (prevState) => [...prevState, newTask]
    )
  }

  // Delete task
  const onDelete = (id) => setTasks(tasks.filter((task) => task.id !== id))

  //toggle done
  const toggleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  }

  //toggle show and hide
  const toggleShow = (id) =>setIsTaskBarShowed(prevState => !prevState)

  return (
    <div className="container">
      <Header title="Task Tracker" isTaskBarShowed={isTaskBarShowed} toggleShow={toggleShow} />
      {isTaskBarShowed && <CreateTask onCreate={onCreate} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={onDelete} toggleDone={toggleDone} />)
        : (<p>No Task To Show</p>)
      }
    </div>
  );
}

export default App;
