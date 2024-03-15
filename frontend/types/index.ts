export interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

export interface RegistrationFormProps {
  onRegister: (username: string, password: string) => void;
}

export interface MainDashboardProps {
  onLogout: () => void;
}

export interface LogoutFormProps {
  onLogout: () => void;
  user: string;
}

export interface User {
  username: string;
}
