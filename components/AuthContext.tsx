import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Alert } from "react-native";

// Define the User type
interface User {
  username: string;
  email: string;
  id?: string;
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isInitialized: boolean;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  activateSecretKey: (paperKey: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

// Replace with your computer's IP address
const API_URL = "https://swiftecons.onrender.com/api/auth";
const SECRET_API_URL = "https://swiftecons.onrender.com/api/secret";
// const API_URL = "http://192.168.226.21:5000/api/auth";
// const SECRET_API_URL = "http://192.168.226.21:5000/api/secret";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check for existing token on app launch
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("user");

      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        console.log("User restored from storage:", parsedUser);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
    } finally {
      setIsInitialized(true);
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/register`,
        { username, email, password },
        {
          timeout: 10000,
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token, user } = response.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      Alert.alert("Success", "Registration successful!");
      return true;
    } catch (error: any) {
      let errorMessage = "Registration failed";

      if (error.response) {
        errorMessage = error.response.data.message || error.response.data.error || "Registration failed";
      } else if (error.request) {
        errorMessage = "Cannot connect to server. Check your network connection and server URL.";
      } else {
        errorMessage = error.message;
      }

      console.error("Registration error:", errorMessage);
      Alert.alert("Registration Failed", errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        {
          timeout: 10000,
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token, user } = response.data;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      Alert.alert("Success", "Login successful!");
      return true;
    } catch (error: any) {
      let errorMessage = "Login failed";

      if (error.response) {
        errorMessage = error.response.data.message || error.response.data.error || "Invalid credentials";
      } else if (error.request) {
        errorMessage = "Cannot connect to server. Check your network connection and server URL.";
      } else {
        errorMessage = error.message;
      }

      console.error("Login error:", errorMessage);
      Alert.alert("Login Failed", errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    // ❌ Do NOT remove activation state here
    setUser(null);
    Alert.alert("Logged Out", "You have been logged out successfully.");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

// ✅ Activate Paper Key
const activateSecretKey = async (paperKey: string): Promise<boolean> => {
  if (!user || !user.id) {
    Alert.alert("Error", "User not found. Please log in again.");
    return false;
  }

  try {
    const response = await axios.post(
      `${SECRET_API_URL}/create`,
      { userId: user.id, key: paperKey },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      }
    );

    // ✅ Save activation state per user
    await AsyncStorage.setItem(`accountActivated_${user.id}`, "true");

    console.log("Secret key created:", response.data.key);
    Alert.alert("Account Activated", "Account Activated");

    return true;
  } catch (error: any) {
    let errorMessage = "Activation failed";
    if (error.response) {
      errorMessage = error.response.data.message || "Invalid key format or duplicate key.";
    } else if (error.request) {
      errorMessage = "Cannot reach the server. Check your connection.";
    } else {
      errorMessage = error.message;
    }
    Alert.alert("Activation Failed", errorMessage);
    console.error("Activation error:", errorMessage);
    return false;
  }
};


  const value: AuthContextType = {
    user,
    loading,
    isInitialized,
    register,
    login,
    logout,
    activateSecretKey,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const isAuthenticated = async (): Promise<boolean> => {
  const token = await AsyncStorage.getItem("token");
  return !!token;
};
