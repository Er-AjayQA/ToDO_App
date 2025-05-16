export const LoginBanner = () => {
  return (
    <>
      <div className="relative h-full w-full">
        <div className="absolute top-0 start-0 end-0 bottom-0 w-full h-full bg-black opacity-25"></div>
        <img
          src="/Images/loginBanner.png"
          alt="Login Banner"
          className="w-full h-full object-cover"
        />
      </div>
    </>
  );
};
