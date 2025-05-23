import axios from "axios";

const BASE_URL = "http://localhost:8080/api/tasks"; // Update this if your URL differs


const getAllTasks = () => axios.get(`${BASE_URL}`);
const getTaskById = (id) => axios.get(`${BASE_URL}/${id}`);
const addTask = (task) => axios.post(`${BASE_URL}`, task); // ✅ This is critical

const updateTask = (id, task) => axios.put(`${BASE_URL}/${id}`, task);
const deleteTask = (id) => axios.delete(`${BASE_URL}/${id}`);



const taskService = {
  getAllTasks,
  getTaskById,
  addTask,         // ✅ Must be here
  updateTask,
  deleteTask,

  
};

export default taskService;
