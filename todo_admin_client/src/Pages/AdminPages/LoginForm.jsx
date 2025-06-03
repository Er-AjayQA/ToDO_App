import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { checkCompanyExistenceService } from "../../Services/RegisterUserServices";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const LoginForm = ({ handleTabChange, companyId }) => {
  const [viewPassword, setViewPassword] = useState(false);

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

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && (
          <p className="text-[12px] text-red-500">{errors.email.message}</p>
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
            <p className="text-[12px] text-red-500">
              {errors.password.message}
            </p>
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

      <div className="mb-4">
        <Link
          to={`/task-management/${companyId}/login`}
          onClick={() => handleTabChange("register")}
        >
          Don't have an account?
        </Link>
      </div>

      <div className="mb-4">
        <button
          type="submit"
          className="text-white bg-[#3e8ef7] hover:bg-[#589ffc] focus:ring-none focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mx-auto block"
        >
          Register
        </button>
      </div>
    </form>
  );
};
