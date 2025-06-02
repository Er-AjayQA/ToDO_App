import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkCompanyExistenceService } from "../../Services/RegisterUserServices";
import { toast } from "react-toastify";

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

  useEffect(() => {
    console.log("Run API once");
    checkCompanyExistence();
  }, [companyId]);

  if (!isValidUrl) {
    return <div className="invalid-url-message">Invalid Link!!.</div>;
  }

  return (
    <div className="register-page">
      <h2>Register with Company</h2>
      {/* Your actual registration form would go here */}
      <div>Registration form for company ID: {companyId}</div>
    </div>
  );
};
