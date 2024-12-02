import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../../interfaces";
import { useNavigate } from "react-router-dom";

interface UserContextType {
  user: UserProfile | null;
  token: string | null;
  signup: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

interface UseAuthProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: UseAuthProps) => {
  const [token, setToken] = useState<String | null>(null);
  const [user, setUser] = useState<UserProfile>();
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(function () {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }

    setIsReady(true);
  }, []);
};

const signup = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const res = await signup(name, email, password, confirmPassword);
};
