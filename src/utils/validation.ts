export type FormErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  [key: string]: string | undefined;
}

export const validateFirstName = (name: string): string => {
  if (!name.trim()) {
    return "First name is required";
  }
  if (!/^[a-zA-Z ]+$/.test(name)) {
    return "First name must contain only letters";
  }
  return "";
};

export const validateLastName = (name: string): string => {
  if (!name.trim()) {
    return "Last name is required";
  }
  if (!/^[a-zA-Z ]+$/.test(name)) {
    return "Last name must contain only letters";
  }
  return "";
};

export const validateEmail = (email: string): string => {
  if (!email.trim()) {
    return "Email is required";
  }
  const emailRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return "Enter a valid email";
  }
  return "";
};

export const validatePassword = (password: string): string => {
  if (!password.trim()) {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }
  return "";
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string => {
  if (!confirmPassword.trim()) {
    return "Confirm your password";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match";
  }
  return "";
};
