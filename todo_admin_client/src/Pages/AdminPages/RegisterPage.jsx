import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkCompanyExistenceService } from "../../Services/RegisterUserServices";
import { toast } from "react-toastify";
import { LoginFormPage } from "./LoginFormPage";
import { RegisterFormPage } from "./RegisterFormPage";

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

  useEffect(() => {
    checkCompanyExistence();
  }, [companyId]);

  const handleAlreadyAccount = (status) => {
    setAlreadyAccount(status);
  };

  if (!isValidUrl) {
    return <div className="invalid-url-message">Invalid Link!!.</div>;
  }

  return (
    <div className="relative w-screen h-screen">
      {alreadyAccount ? (
        <LoginFormPage handleAlreadyAccount={handleAlreadyAccount} />
      ) : (
        <RegisterFormPage handleAlreadyAccount={handleAlreadyAccount} />
      )}
    </div>
  );
};
