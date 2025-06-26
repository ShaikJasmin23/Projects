function generatePassword() {
  const length = document.getElementById("length").value;
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  const allChars = lowercase + uppercase + numbers + symbols;

  let password = "";

  // Ensure at least one character from each type
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Fill the rest with random characters
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password
  password = password.split('').sort(() => 0.5 - Math.random()).join('');

  document.getElementById("result").value = password;
}

function copyPassword() {
  const result = document.getElementById("result");
  result.select();
  result.setSelectionRange(0, 99999); // Mobile support
  document.execCommand("copy");
  alert("Password copied to clipboard!");
}
