import { LoginForm } from "../Components/LoginForm";
import { LoginBanner } from "../Components/LoginLeftBanner";

export const LoginPage = () => {
  return (
    <>
      <div className="grid grid-cols-12 w-full h-full">
        <div className="col-span-8">
          <LoginBanner />
        </div>
        <div className="col-span-4">
          <LoginForm />
        </div>
      </div>
    </>
  );
};
