export const DEMO_CREDENTIALS = {
  email: "admin@academiaos.com",
  password: "Admin@123",
} as const;

export type UserRole = "teacher" | "student" | "dept-head";

type LoginCredentials = {
  email: string;
  password: string;
  role: UserRole;
};

export async function login({ email, password, role }: LoginCredentials) {
  const isValid =
    email.trim().toLowerCase() === DEMO_CREDENTIALS.email &&
    password === DEMO_CREDENTIALS.password;

  if (!isValid) {
    throw new Error("Email or password is incorrect.");
  }

  return { email: DEMO_CREDENTIALS.email, role };
}
