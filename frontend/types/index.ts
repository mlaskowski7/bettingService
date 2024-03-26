export interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

export interface RegistrationFormProps {
  onRegister: (username: string, password: string) => void;
}

export interface LeaderboardProps {
  users: User[] | null;
}
export interface HeroProps {
  user: string;
  games: Game[] | null;
}

export interface MainProps {
  onLogout: () => void;
  user: string;
  users: User[] | null;
  games: Game[] | null;
  bets: Bet[] | null;
}

export interface BetSectionProps {
  games: Game[] | null;
}

export interface LogoutFormProps {
  onLogout: () => void;
  user: string;
  users: User[] | null;
}

export interface User {
  username: string;
  password: string;
  points: number;
  isadmin: boolean;
  id: number;
}

export interface Game {
  id: number;
  home_team: string;
  away_team: string;
  goals_home: number | null;
  goals_away: number | null;
  date: string;
  time: string;
}

export interface Bet {
  id: number;
  user_id: number;
  game_id: number;
  goals_home: number;
  goals_away: number;
}
