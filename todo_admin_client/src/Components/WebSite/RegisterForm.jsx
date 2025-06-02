import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { registerCompanyService } from "../../Services/RegisterCompanyServices";

export const RegisterForm = ({ setCompanyId, setOtpSent, setOtpVerified }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // Handle Login Form Submit
  const onSubmit = async (formData) => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    const response = await registerCompanyService(formData);

    if (response.success) {
      reset();
      setCompanyId(response.data._id);
      setOtpSent(true);
      setOtpVerified(response.data.otpVerified);
      toast.success(response.message);
    } else if (
      !response.success &&
      response.message === "Company already registered!!"
    ) {
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
          <h1 className="font-bold text-[2rem]">Register Here!</h1>
        </div>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-purple-dark"
          >
            Company Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 focus:border-purple-dark focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5"
            {...register("name", {
              required: "Company Name is required",
            })}
          />
          {errors.name && (
            <p className="text-[12px] text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-purple-dark"
          >
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:border-purple-dark focus:outline-none "
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <p className="text-[12px] text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="mb-4 text-center">
          <button
            type="submit"
            className="bg-purple-accent hover:bg-purple-hover text-white focus:ring-none focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Register
          </button>
        </div>
      </form>
      {/* Form End */}
    </>
  );
};
