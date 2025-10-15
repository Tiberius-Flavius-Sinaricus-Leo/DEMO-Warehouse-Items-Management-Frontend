export type AuthRequest = {
  userEmail: string;
  password: string;
  rememberMe?: boolean;
}

export type AuthResponse = {
  userEmail: string;
  role: "ADMIN" | "USER" | null;
}

export type LoginResponse = {
  data?: AuthResponse;
  error?: string;
}
