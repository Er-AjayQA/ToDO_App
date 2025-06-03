import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { checkCompanyExistenceService } from "../../Services/RegisterUserServices";
import { toast, ToastContainer } from "react-toastify";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export const RegisterPage = () => {
  const [isValidUrl, setIsValidUrl] = useState(false);
  const { companyId } = useParams();

  const checkCompanyExistence = async () => {
    try {
      let response = await checkCompanyExistenceService(companyId);

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

  const isRegisterPage = location.pathname.includes("/register");

  useEffect(() => {
    checkCompanyExistence();
  }, [companyId]);

  if (!isValidUrl) {
    return <div className="invalid-url-message">Invalid Link!!.</div>;
  }

  return (
    <div className="relative w-screen h-screen">
      <ToastContainer autoClose={1000} />
      <div className="absolute top-[15%] start-[50%] translate-x-[-50%]  w-[25%] border-1 border-solid border-black shadow-md p-5 mx-auto">
        <div className="flex items-center justify-center mb-5">
          <Link to={`/task-management/${companyId}/register`}>
            <button
              className={`px-[30px] py-1 text-xl rounded-l-lg ${
                isRegisterPage ? "bg-gray-300" : "bg-gray-100"
              }`}
            >
              Register
            </button>
          </Link>

          <Link to={`/task-management/${companyId}/login`}>
            <button
              className={`px-[30px] py-1 text-xl rounded-r-lg ${
                !isRegisterPage ? "bg-gray-300" : "bg-gray-100"
              }`}
            >
              Login
            </button>
          </Link>
        </div>
        {!isRegisterPage ? (
          <LoginForm companyId={companyId} />
        ) : (
          <RegisterForm companyId={companyId} />
        )}
      </div>
    </div>
  );
};
