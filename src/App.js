import React, { useState } from "react";

const TimeTrackingApp = () => {
  // State to hold the projects and tasks
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  // State to hold form inputs
  const [projectName, setProjectName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [description, setDescription] = useState("");

  // Function to handle project creation
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim() === "") return;

    // Create a new project object
    const newProject = {
      id: new Date().getTime(),
      name: projectName,
    };

    // Add the new project to the projects array
    setProjects([...projects, newProject]);

    // Reset the project name input
    setProjectName("");
  };

  // Function to handle task creation
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim() === "" || timeSpent.trim() === "") return;

    // Create a new task object
    const newTask = {
      id: new Date().getTime(),
      projectId: projectName, // Use this if you want to associate tasks with specific projects
      name: taskName,
      timeSpent: parseFloat(timeSpent),
      description,
    };

    // Add the new task to the tasks array
    setTasks([...tasks, newTask]);

    // Reset the task form inputs
    setTaskName("");
    setTimeSpent("");
    setDescription("");
  };

  // Function to calculate total hours spent on a project
  const calculateTotalHours = (projectName) => {
    const totalHours = tasks
      .filter((task) => task.projectId === projectName)
      .reduce((total, task) => total + task.timeSpent, 0);
    return totalHours;
  };

  return (
    <div>
      <h2 className="text-center">Time Tracking Application</h2>
      <div className="container">
        <h2>Create Project</h2><br></br>
        <form onSubmit={handleProjectSubmit} >
        <div class="input-group mb-4">
            <input
              type="text" class="form-control" placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)}
            />
            &nbsp;&nbsp;
            <button type="submit" class="btn btn-outline-primary">Create Project</button>
          </div>
        </form>
      </div>
      <br></br>
      <div className="container ">
        <h2>Create Task</h2>
        <form onSubmit={handleTaskSubmit}>
          <div>
            <select class="btn dropdown-toggle btn-dark" 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            >
              <option value="">Select a Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          &nbsp;&nbsp;
          <input
            type="text"
            class="form-control"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          &nbsp;&nbsp;<br></br>
          <input
            type="number"
            step="0.5"
            class="form-control"
            placeholder="Time Spent (in hours)"
            value={timeSpent}
            onChange={(e) => setTimeSpent(e.target.value)}
          />
          &nbsp;&nbsp;
          <input
            type="text"
            class="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          &nbsp;&nbsp;
          <div>
            <button type="submit" class="btn btn-primary">Create Task</button>
          </div>
        </form>
      </div>
      <br></br>
      <div className="container ">
        <h2>Projects and Tasks Listing</h2>
        {projects.map((project) => (
          <div key={project.id}>
            <h4>{project.name}</h4>
            <ul>
              {tasks
                .filter((task) => task.projectId === project.name)
                .map((task) => (
                  <li key={task.id}>
                    {task.name} - {task.timeSpent} hours
                  </li>
                ))}
            </ul>
            <h5>Total Hours: {calculateTotalHours(project.name)}</h5><hr></hr>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeTrackingApp;

