import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkCompanyExistenceService } from "../../Services/RegisterUserServices";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const LoginForm = () => {
  const [isValidUrl, setIsValidUrl] = useState(false);
  const { companyId } = useParams();

  const checkCompanyExistence = async () => {
    try {
      let response = await checkCompanyExistenceService(companyId);
      console.log(response);

      if (!response?.success) {
        toast.error("Invalid Url");
        setIsValidUrl(false);
      } else {
        setIsValidUrl(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [viewPassword, setViewPassword] = useState(false);
  const [alreadyAccount, setAlreadyAccount] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // Handle Password Visibility
  const handlePasswordVisibility = () => {
    setViewPassword((prev) => !prev);
  };

  // Handle Login Form Submit
  const onSubmit = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    console.log("Run API once");
    checkCompanyExistence();
  }, [companyId]);

  const handleAlreadyAccount = () => {
    setAlreadyAccount(true);
  };

  if (!isValidUrl) {
    return <div className="invalid-url-message">Invalid Link!!.</div>;
  }

  return (
    <div className="relative w-screen h-screen">
      <form
        className=" absolute top-[50%] start-[50%] translate-x-[-50%] translate-y-[-50%] w-[40%] border-1 border-solid border-black shadow-md p-5 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4">
          <div>
            <h1 className="font-bold text-2xl text-center mb-5">
              Register User
            </h1>
          </div>
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={viewPassword ? "text" : "password"}
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            {viewPassword ? (
              <FaEye
                className="absolute end-5 top-[50%] translate-y-[-50%] cursor-pointer"
                onClick={handlePasswordVisibility}
              />
            ) : (
              <FaEyeSlash
                className="absolute end-5 top-[50%] translate-y-[-50%] cursor-pointer"
                onClick={handlePasswordVisibility}
              />
            )}
          </div>
        </div>
        <Link
          to={"/task-management/:companyId/login"}
          onClick={handleAlreadyAccount}
        >
          Already have an account?
        </Link>
        <div className="mb-4">
          <button
            type="submit"
            className="text-white bg-[#3e8ef7] hover:bg-[#589ffc] focus:ring-none focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
