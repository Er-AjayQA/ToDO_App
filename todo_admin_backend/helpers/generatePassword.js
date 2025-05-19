const generatePassword = () => {
  let symbols = ["@", "#", "$", "%"];
  let smallLetters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let capitalLetters = smallLetters.map((letter) => letter.toUpperCase());
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  let password = "";
  const passwordLength = 7; // You can adjust this length

  // Ensure at least one character from each category
  password += symbols[Math.floor(Math.random() * symbols.length)];
  password += smallLetters[Math.floor(Math.random() * smallLetters.length)];
  password += capitalLetters[Math.floor(Math.random() * capitalLetters.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];

  // Fill the rest of the password
  const allChars = [...symbols, ...smallLetters, ...capitalLetters, ...numbers];
  for (let i = password.length; i < passwordLength; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password to mix the mandatory characters
  password = password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");

  return password;
};

module.exports = generatePassword;
