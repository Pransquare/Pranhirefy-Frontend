const BASE_URL = 'http://localhost:8080/api/leavetypes';


export const getLeaveTypes = async () => {
  const res = await fetch(BASE_URL, {
   
  });
  return res.json();
};

export const createLeaveType = async (leaveType) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
  
    body: JSON.stringify(leaveType)
  });
  return res.json();
};

export const updateLeaveType = async (id, leaveType) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    
    body: JSON.stringify(leaveType)
  });
  return res.json();
};

export const deleteLeaveType = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',

  });
};























































// const BASE_URL = 'http://localhost:8080/api/leavetypes';
 
// export const getLeaveTypes = async () => {
//   const res = await fetch(BASE_URL);
//   return res.json();
// };
 
// export const createLeaveType = async (leaveType) => {
//   const res = await fetch(BASE_URL, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(leaveType)
//   });
//   return res.json();
// };
 
// export const updateLeaveType = async (id, leaveType) => {
//   const res = await fetch(`${BASE_URL}/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(leaveType)
//   });
//   return res.json();
// };
 
// export const deleteLeaveType = async (id) => {
//   await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
// };
 
 