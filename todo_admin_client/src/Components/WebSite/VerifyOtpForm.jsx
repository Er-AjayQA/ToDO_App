import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { verifyOtpService } from "../../Services/RegisterServices";
import { toast } from "react-toastify";

export const VerifyOTPForm = ({
  registerFormOpen,
  handleRegisterFormClose,
  setOtpVerified,
  companyId,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // Handle Login Form Submit
  const onSubmit = async (formData) => {
    // Create FormData object
    const data = new FormData();
    data.append("otp", formData.otp);

    const response = await verifyOtpService(companyId, formData);

    if (response.success) {
      reset();
      setOtpVerified(true);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      {/* Form Start */}
      <form
        className="w-[80%] p-2 mx-auto absolute top-[50%] start-[50%] translate-x-[-50%] translate-y-[-50%] text-purple-dark"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="text-center mb-5">
          <h1 className="font-bold text-[2rem]">OTP Verification!</h1>
        </div>
        <div className="mb-4">
          <label
            htmlFor="otp"
            className="block mb-2 text-sm font-medium text-purple-dark"
          >
            Verify OTP
          </label>
          <input
            type="text"
            id="otp"
            className="bg-gray-50 border border-gray-300 focus:border-purple-dark focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5"
            {...register("otp", {
              required: "OTP is required",
            })}
          />
          {errors.otp && <p className="text-red-500">{errors.otp.message}</p>}
        </div>
        <div className="mb-4 text-center">
          <button
            type="submit"
            className="bg-purple-accent hover:bg-purple-hover text-white focus:ring-none focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Verify OTP
          </button>
        </div>
      </form>
      {/* Form End */}
    </>
  );
};
