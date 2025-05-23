
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/master-goals',
});

export const getAllGoals = () => {
  return api.get('');
};

export const createGoal = (goal) => {
  return api.post('', goal);
};

export const updateGoal = (id, goal) => {
  return api.put(`/${id}`, goal);
};

export const softDeleteGoal = (id) => {
  return api.delete(`/${id}`);
};
