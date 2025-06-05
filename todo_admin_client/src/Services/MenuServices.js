import axiosInstance from "./axiosInstance";

// Get All Projects Service
export const getAllProjectsService = async (company_id, formData, token) => {
  const data = await axiosInstance.post(
    `/${company_id}/projects/get_all`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};
