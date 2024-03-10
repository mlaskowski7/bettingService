export interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

export interface User {
  username: string;
}
