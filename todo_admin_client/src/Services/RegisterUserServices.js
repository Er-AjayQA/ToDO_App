import axiosInstance from "./axiosInstance";

// Check Company Existence Service
export const checkCompanyExistenceService = async (companyId) => {
  const response = await axiosInstance.get(
    `/company/check_company_existence/${companyId}`
  );
  return response.data;
};

// User Registration Service
export const registerUserService = async (companyId, formData) => {
  const response = await axiosInstance.post(
    `/users/register/${companyId}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

// User Login Service
export const userLoginService = async (formData) => {
  const response = await axiosInstance.post(`/users/login`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
