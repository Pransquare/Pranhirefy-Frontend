import axios from "axios";

const API_BASE = "http://localhost:8081/api/clients";

export const getClients = () => axios.get(`${API_BASE}/getAllClients`);
export const getClientById = (id) => axios.get(`${API_BASE}/${id}`);
export const createClient = (client) => axios.post(API_BASE, client);
export const updateClient = (id, client) =>
  axios.put(`${API_BASE}/${id}`, client);
export const deleteClient = (id) => axios.delete(`${API_BASE}/${id}`);
