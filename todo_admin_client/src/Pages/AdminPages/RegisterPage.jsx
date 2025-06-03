import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { checkCompanyExistenceService } from "../../Services/RegisterUserServices";
import { toast } from "react-toastify";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export const RegisterPage = () => {
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

  const [alreadyAccount, setAlreadyAccount] = useState(false);
  const [selectedRegisterTab, setSelectedRegisterTab] = useState(true);

  // Handle Tab Change
  const handleTabChange = async (tabType) => {
    if (tabType === "register") {
      setSelectedRegisterTab(true);
    } else {
      setSelectedRegisterTab(false);
    }
  };

  useEffect(() => {
    checkCompanyExistence();
  }, [companyId]);

  if (!isValidUrl) {
    return <div className="invalid-url-message">Invalid Link!!.</div>;
  }

  return (
    <div className="relative w-screen h-screen">
      <div className="absolute top-[15%] start-[50%] translate-x-[-50%]  w-[25%] border-1 border-solid border-black shadow-md p-5 mx-auto">
        <div className="flex items-center justify-center mb-5">
          <Link to={`/task-management/${companyId}/register`}>
            <button
              className={`px-[30px] py-1 text-xl rounded-l-lg ${
                selectedRegisterTab ? "bg-gray-300" : "bg-gray-100"
              }`}
              onClick={() => handleTabChange("register")}
            >
              Register
            </button>
          </Link>

          <Link to={`/task-management/${companyId}/login`}>
            <button
              className={`px-[30px] py-1 text-xl rounded-r-lg ${
                selectedRegisterTab ? "bg-gray-100" : "bg-gray-300"
              }`}
              onClick={() => handleTabChange("login")}
            >
              Login
            </button>
          </Link>
        </div>
        {!selectedRegisterTab ? (
          <LoginForm handleTabChange={handleTabChange} companyId={companyId} />
        ) : (
          <RegisterForm
            handleTabChange={handleTabChange}
            companyId={companyId}
          />
        )}
      </div>
    </div>
  );
};
