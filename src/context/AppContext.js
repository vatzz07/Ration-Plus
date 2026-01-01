import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n/i18n';
import { signInWithCredential, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

// Sample data
const initialUserData = {
  rationCardNumber: 'TN-01-234-567890',
  familyHead: 'Rajesh Kumar',
  familySize: 4,
  category: 'APL',
  eligibleForDelivery: false,
  language: 'en',
};

const initialStockData = {
  shopId: 'SHOP_123',
  shopName: 'Anna Nagar Ration Shop',
  lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  items: [
    {
      name: 'Rice',
      quantity: 45,
      unit: 'kg',
      status: 'available',
    },
    {
      name: 'Wheat',
      quantity: 8,
      unit: 'kg',
      status: 'low',
    },
    {
      name: 'Sugar',
      quantity: 0,
      unit: 'kg',
      status: 'out',
    },
  ],
};

const initialQuotaData = {
  month: 'December 2024',
  quota: {
    rice: { allocated: 20, used: 12, remaining: 8 },
    wheat: { allocated: 10, used: 6, remaining: 4 },
    sugar: { allocated: 5, used: 3, remaining: 2 },
  },
  nextRefill: '2025-01-01',
};

const initialTransactions = [
  {
    id: '1',
    date: '2024-12-28',
    item: 'Rice',
    quantity: 5,
    shopName: 'Anna Nagar Ration Shop',
  },
  {
    id: '2',
    date: '2024-12-25',
    item: 'Wheat',
    quantity: 3,
    shopName: 'Anna Nagar Ration Shop',
  },
  {
    id: '3',
    date: '2024-12-20',
    item: 'Sugar',
    quantity: 2,
    shopName: 'Anna Nagar Ration Shop',
  },
  {
    id: '4',
    date: '2024-12-15',
    item: 'Rice',
    quantity: 7,
    shopName: 'Anna Nagar Ration Shop',
  },
];

export const AppProvider = ({ children }) => {
  const [userData, setUserData] = useState(initialUserData);
  const [stockData, setStockData] = useState(initialStockData);
  const [quotaData, setQuotaData] = useState(initialQuotaData);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [deliveryRequest, setDeliveryRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Load initial state
  useEffect(() => {
    const loadState = async () => {
      try {
        // TEMP: Clear storage to force fresh start
        // await AsyncStorage.clear();

        const [storedLogin, storedOnboarding, storedLang] = await AsyncStorage.multiGet([
          '@pds_is_logged_in',
          '@pds_has_seen_onboarding',
          '@pds_language'
        ]);

        if (storedLogin[1] === 'true') setIsLoggedIn(true);
        if (storedOnboarding[1] === 'true') setHasSeenOnboarding(true);
        if (storedLang[1]) {
          await i18n.changeLanguage(storedLang[1]);
          setUserData(prev => ({ ...prev, language: storedLang[1] }));
        }

        // Listen for Firebase auth state changes
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            setIsLoggedIn(true);
            await AsyncStorage.setItem('@pds_is_logged_in', 'true');
            setUserData(prev => ({
              ...prev,
              familyHead: user.displayName || prev.familyHead,
              email: user.email,
              photoURL: user.photoURL
            }));
          }
        });

        return () => unsubscribe();

      } catch (e) {
        console.error('Failed to load auth state', e);
      } finally {
        setIsAuthLoading(false);
      }
    };
    loadState();
  }, []);

  const login = async () => {
    setIsLoggedIn(true);
    await AsyncStorage.setItem('@pds_is_logged_in', 'true');
  };

  const googleLogin = async (idToken) => {
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;

      setIsLoggedIn(true);
      await AsyncStorage.setItem('@pds_is_logged_in', 'true');

      // Update user data with Google profile
      setUserData(prev => ({
        ...prev,
        familyHead: user.displayName || prev.familyHead,
        email: user.email,
        photoURL: user.photoURL
      }));
    } catch (error) {
      console.error("Google Sign-In Error", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      await AsyncStorage.removeItem('@pds_is_logged_in');
    } catch (error) {
      console.error("Logout Error", error);
    }
  };

  const completeOnboarding = async () => {
    setHasSeenOnboarding(true);
    await AsyncStorage.setItem('@pds_has_seen_onboarding', 'true');
  };

  const changeLanguage = async (language) => {
    await i18n.changeLanguage(language);
    setUserData((prev) => ({ ...prev, language }));
    await AsyncStorage.setItem('@pds_language', language);
  };

  const refreshStock = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStockData((prev) => ({
      ...prev,
      lastUpdated: new Date(),
    }));
    setIsLoading(false);
  };

  const submitDeliveryRequest = (request) => {
    setDeliveryRequest({
      ...request,
      id: Date.now().toString(),
      status: 'requested',
      createdAt: new Date().toISOString(),
    });
  };

  const value = {
    userData,
    stockData,
    quotaData,
    transactions,
    deliveryRequest,
    isLoading,
    isLoggedIn,
    hasSeenOnboarding,
    isAuthLoading,
    login,
    googleLogin,
    logout,
    completeOnboarding,
    changeLanguage,
    refreshStock,
    submitDeliveryRequest,
    setUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

