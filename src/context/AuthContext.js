"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: "LOGIN", payload: JSON.parse(user) });
    }
    dispatch({ type: "SET_LOADING", payload: false });
  }, []);

  const login = (credentials) => {
    if (
      credentials.email === "mostafakadry806@gmail.com" &&
      credentials.password === "123"
    ) {
      const user = {
        id: 1,
        name: "Mostafa",
        email: "mostafakadry806@gmail.com",
        role: "Administrator",
      };
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({ type: "LOGIN", payload: user });
      toast.success("Login successful!");
      return true;
    } else {
      toast.error("Invalid credentials");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
