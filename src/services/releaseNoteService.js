import axios from "axios";

const API_BASE_URL = "http://localhost:2025/api/release-notes";

export const getAllReleaseNotes = () => axios.get(API_BASE_URL);

export const getReleaseNoteById = (id) => axios.get(`${API_BASE_URL}/${id}`);

export const createReleaseNote = (note) => axios.post(API_BASE_URL, note);

export const updateReleaseNote = (id, note) => axios.put(`${API_BASE_URL}/${id}`, note);

export const deleteReleaseNote = (id) => axios.delete(`${API_BASE_URL}/${id}`);