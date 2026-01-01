import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

import HomeScreen from '../screens/HomeScreen';
import TrackerScreen from '../screens/TrackerScreen';
import DeliveryScreen from '../screens/DeliveryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RationCardAuthScreen from '../screens/RationCardAuthScreen';
import StockScreen from '../screens/StockScreen';
import HelpScreen from '../screens/HelpScreen';
import QuotaScreen from '../screens/QuotaScreen';
import { colors } from '../theme/theme';
import { useApp } from '../context/AppContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primaryDark,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 25,
          height: 65,
          borderRadius: 35,
          backgroundColor: colors.white,
          borderTopWidth: 0,
          elevation: 20, // Increased elevation for floating effect
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.15,
          shadowRadius: 20,
          paddingBottom: 0, // Fix alignment on some devices
        },
        tabBarItemStyle: {
          height: 65, // Match bar height
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIconStyle: {
          // Ensure icons are centered
        }
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TrackerTab"
        component={TrackerScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "calendar-month" : "calendar-month-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DeliveryTab"
        component={DeliveryScreen}
        options={{
          tabBarStyle: { display: 'none' }, // Hide navbar for this screen
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "truck-delivery" : "truck-delivery-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account-settings" : "account-settings-outline"}
              color={color}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const { isLoggedIn, hasSeenOnboarding, isAuthLoading } = useApp();

  if (isAuthLoading) {
    // You might want to show a splash screen here, although App.js handles the initial splash
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!hasSeenOnboarding ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : !isLoggedIn ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="RationCardAuth" component={RationCardAuthScreen} />
        </>
      ) : (
        <Stack.Screen
          name="Main"
          component={MainTabs}
        />
      )}
      <Stack.Screen name="Stock" component={StockScreen} />
      <Stack.Screen name="Help" component={HelpScreen} />
      <Stack.Screen name="Quota" component={QuotaScreen} />
    </Stack.Navigator>
  );
};

