import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { RegisterForm } from "./RegisterForm";
import { VerifyOTPForm } from "./VerifyOtpForm";

export const CompanyRegisterForm = ({
  registerFormOpen,
  setRegisterFormOpen,
}) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [companyId, setCompanyId] = useState(null);

  const handleRegisterFormClose = () => {
    setRegisterFormOpen(false);
    setOtpVerified(false);
    setOtpSent(false);
  };

  return (
    <>
      <div
        className={`w-[30%] h-100 bg-white absolute top-0 bottom-0 end-0 z-[99] p-[3rem] ${
          registerFormOpen ? "translate-x-0" : "translate-x-[100%]"
        } transition-all duration-[.2s] ease-in-out`}
      >
        <button
          className="absolute end-[2rem] top-[1rem] text-2xl"
          onClick={handleRegisterFormClose}
        >
          <IoCloseSharp />
        </button>

        {/* Form Start */}
        {!otpSent ? (
          <RegisterForm
            setOtpSent={setOtpSent}
            setCompanyId={setCompanyId}
            setOtpVerified={setOtpVerified}
          />
        ) : !otpVerified ? (
          <VerifyOTPForm
            companyId={companyId}
            handleRegisterFormClose={handleRegisterFormClose}
            setOtpVerified={setOtpVerified}
          />
        ) : (
          ""
        )}

        {/* Form End */}
      </div>
    </>
  );
};
