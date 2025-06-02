import axiosInstance from "./axiosInstance";

// Check Company Existence Service
export const checkCompanyExistenceService = async (companyId) => {
  const response = await axiosInstance.get(
    `/company/check_company_existence/${companyId}`
  );
  return response.data;
};
