const getRandomNumber = () => {
  return Math.floor(Math.random() * 10);
};

const generateOTP = () => {
  let otpLength = 6;
  let otp = "";

  for (let i = 1; i <= otpLength; i++) {
    otp += getRandomNumber().toString();
  }

  return otp;
};

module.exports = generateOTP;
