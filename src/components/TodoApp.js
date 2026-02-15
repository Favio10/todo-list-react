import React, { useState, useEffect } from "react";
import "./TodoApp.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (e) => {
    e.preventDefault();
    const text = newTask.trim();
    if (!text) return;

    const task = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTasks([task, ...tasks]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <div className="todo-container">
      <div className="todo-card">
        <h1 className="todo-title">Lista de Tareas</h1>

        <form className="todo-form" onSubmit={handleAddTask}>
          <input
            className="todo-input"
            type="text"
            placeholder="Escribe una nueva tarea..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="todo-add-btn" type="submit">
            Agregar
          </button>
        </form>

        <div className="todo-filters">
          <button
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            Todas
          </button>
          <button
            className={`filter-btn ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Pendientes
          </button>
          <button
            className={`filter-btn ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completadas
          </button>
        </div>

        <ul className="todo-list">
          {filteredTasks.length === 0 && (
            <li className="todo-empty">No hay tareas</li>
          )}

          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className={`todo-item ${task.completed ? "completed" : ""}`}
            >
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span>{task.text}</span>
              </label>
              <button
                className="todo-delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        <div className="todo-footer">
          <span>{remaining} tareas pendientes</span>
          <button className="clear-completed-btn" onClick={clearCompleted}>
            Borrar completadas
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
