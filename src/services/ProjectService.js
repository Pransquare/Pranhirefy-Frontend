const BASE_URL = "http://localhost:8080/api/projectmaster";

const ProjectService = {
  getAllProjects: async () => {
    const response = await fetch(BASE_URL, {
      method: "GET",
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Failed to fetch projects");
    return response.json();
  },

  getProjectById: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch project with id ${id}`);
    return response.json();
  },

  createProject: async (project) => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error("Failed to create project");
    return response.json();
  },

  updateProject: async (id, project) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error("Failed to update project");
    return response.json();
  },

  deleteProject: async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Delete failed");

    // If backend returns plain text (e.g., "Deleted Successfully"), use .text()
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    } else {
      return response.text();
    }
  },
};

export default ProjectService;

























// const BASE_URL = "http://localhost:8080/api/projectmaster";

// const ProjectService = {
//   getAllProjects: async () => {
//   const response = await fetch(BASE_URL, {
//     method: "GET",
//     cache: "no-store",
//   });
//   if (!response.ok) throw new Error("Failed to fetch projects");
//   return response.json();
// }
//   ,

//   getProjectById: async (id) => {
//     const response = await fetch(`${BASE_URL}/${id}`);
//     if (!response.ok) throw new Error(`Failed to fetch project with id ${id}`);
//     return response.json();
//   },

//   createProject: async (project) => {
//     const response = await fetch(BASE_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(project),
//     });
//     if (!response.ok) throw new Error("Failed to create project");
//     return response.json();
//   },

//   updateProject: async (id, project) => {
//     const response = await fetch(`${BASE_URL}/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(project),
//     });
//     if (!response.ok) throw new Error("Failed to update project");
//     return response.json();
//   },

//   deleteProject: async (id) => {
//     const response = await fetch(`${BASE_URL}/${id}`, {
//       method: "DELETE",
//     });
//     if (!response.ok) throw new Error("Delete failed");
//     // Handle 204 No Content (empty response)
//     if (response.status === 204) return null;
//     return response.json();
//   },
// };

// export default ProjectService;
