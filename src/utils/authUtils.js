export const formatPhoneNumber = (phoneNumber) => {
  // check if the phone number is valid and then replace the first 0 with +972
  // if the phone number is not valid, return an empty string
  // the phone number should be 10 digits long
  // the phone number should start with 0
  // the phone number should contain only digits

  const phoneRegex = /^0[0-9]{9}$/;
  const phoneRegexWithPlus = /^\+972[0-9]{9}$/;
  if (phoneRegex.test(phoneNumber)) {
    return phoneNumber.replace(/^0/, "+972");
  } else if (phoneRegexWithPlus.test(phoneNumber)) {
    return phoneNumber;
  }
  return "";
};

/**
 * Returns userId in the form of: cu_+972XXXXXXXX
 * @param {*} phoneNumber is the phone number of the user
 */
export const buildUserId = (phoneNumber) => {
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
  return `cu_${formattedPhoneNumber}`;
};

export const generateStrongPassword = (length = 12) => {
  if (length < 8) {
    throw new Error("Password length should be at least 8 characters.");
  }

  const chars = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    special: "!@#$%^&*()-=_+[]{}|;:,.<>?/",
  };

  function getRandomCharacter(charSet) {
    return charSet.charAt(Math.floor(Math.random() * charSet.length));
  }

  function shuffleString(str) {
    return str
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }

  let password = [
    getRandomCharacter(chars.lowercase),
    getRandomCharacter(chars.uppercase),
    getRandomCharacter(chars.numbers),
    getRandomCharacter(chars.special),
  ].join("");

  for (let i = 4; i < length; i++) {
    const randomCharSet = Object.keys(chars)[Math.floor(Math.random() * 4)];
    password += getRandomCharacter(chars[randomCharSet]);
  }

  return shuffleString(password);
};
