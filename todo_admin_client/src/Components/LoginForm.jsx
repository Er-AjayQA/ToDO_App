import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const LoginForm = () => {
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
    <>
      <div className="h-full p-5 flex items-center justify-center">
        <form className="w-[80%] p-2 mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
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
    </>
  );
};
