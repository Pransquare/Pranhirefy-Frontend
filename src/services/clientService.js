import axios from "axios";

const API_BASE_URL = "http://localhost:8080/clients";

export function getClients() {
  // This hits GET /clients/all to get all non-deleted clients
  return axios.get(`${API_BASE_URL}/all`);
}

export function deleteClient(clientId) {
  // This hits DELETE /clients/delete/{id} for soft delete
  return axios.delete(`${API_BASE_URL}/delete/${clientId}`);
}

// Optionally add create and update if you need them later
export function createClient(clientData) {
  return axios.post(`${API_BASE_URL}/create`, clientData);
}

export function updateClient(clientId, clientData) {
  return axios.put(`${API_BASE_URL}/update/${clientId}`, clientData);
}

export function getClientById(clientId) {
  return axios.get(`${API_BASE_URL}/${clientId}`);
}
