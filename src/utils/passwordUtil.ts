export type PasswordStrength = {
  label: string;
  value: number;
  color: 'error' | 'warning' | 'success';
};

export const getPasswordStrength = (password: string) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: "Weak", value: 33, color: "error" };
  if (score === 2 || score === 3) return { label: "Medium", value: 66, color: "warning" };
  return { label: "Strong", value: 100, color: "success" };
};
