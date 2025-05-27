const BASE_URL = "http://localhost:8080/api/leavetypes";

// GET all leave types
export const getLeaveTypes = async () => {
  const res = await fetch(`${BASE_URL}/all`);
  return res.json();
};

// POST: create a leave type
export const createLeaveType = async (leaveType) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(leaveType),
  });
  return res.json();
};

// PUT: update a leave type
export const updateLeaveType = async (id, leaveType) => {
  const res = await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(leaveType),
  });
  return res.json();
};

// DELETE: delete a leave type
export const deleteLeaveType = async (id) => {
  await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
  });
};
