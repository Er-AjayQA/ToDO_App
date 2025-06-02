import axiosInstance from "./axiosInstance";

// Register Company Service
export const registerCompanyService = async (formData) => {
  const data = await axiosInstance.post("/company/register", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.data;
};

// Verify Comany Register OTP Service
export const verifyOtpService = async (companyId, formData) => {
  const data = await axiosInstance.post(
    `/company/verifyOTP/${companyId}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data.data;
};
