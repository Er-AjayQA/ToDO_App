import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { checkCompanyExistenceService } from "../../Services/RegisterUserServices";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const RegisterFormPage = (handleAlreadyAccount) => {
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
    <div className="relative w-screen h-screen">
      <form
        className="absolute top-[50%] start-[50%] translate-x-[-50%] translate-y-[-50%] w-[40%] border-1 border-solid border-black shadow-md p-5 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div>
            <h1 className="font-bold text-2xl text-center mb-5">
              Register User
            </h1>
          </div>

          <div className="flex items-center justify-center gap-2">
            <div className="mb-4 basis-[50%]">
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                FirstName
              </label>
              <input
                type="text"
                id="firstName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("firstName", {
                  required: "FirstName is required",
                })}
              />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName.message}</p>
              )}
            </div>

            <div className="mb-4 basis-[50%]">
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                LastName
              </label>
              <input
                type="text"
                id="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...register("lastName", {
                  required: "LastName is required",
                })}
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2">
          <div className="mb-4 basis-[50%]">
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
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4 basis-[50%]">
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
        </div>

        <Link
          to={"/task-management/:companyId/login"}
          onClick={() => handleAlreadyAccount(true)}
        >
          Already have an account?
        </Link>

        <div className="mb-4">
          <button
            type="submit"
            className="text-white bg-[#3e8ef7] hover:bg-[#589ffc] focus:ring-none focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mx-auto block"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
