import axiosInstance from "./axiosInstance";

// Get All Projects Service
export const getAllProjectsService = async (company_id, formData) => {
  const data = await axiosInstance.post(
    `/${company_id}/projects/get_all`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data.data;
};
