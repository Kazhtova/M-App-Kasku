import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Ikon bawaan Expo

import AuthScreen from '../screens/AuthScreen';
import DashboardScreen from '../screens/DashboardScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import EditTransactionScreen from '../screens/EditTransactionScreen';
import ProfileScreen from '../screens/ProfileScreen'; // 🚀 Import layar baru

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 🚀 KOMPONEN BARU: Ini adalah kerangka Menu Bawah
function MainTabs({ route }) {
  // Tangkap user dari proses Login
  const { user } = route.params || {};

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Logika untuk mengubah ikon saat menu ditekan (aktif/tidak aktif)
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0284c7', // Warna biru KasKu saat menu dipilih
        tabBarInactiveTintColor: 'gray',
        headerStyle: { backgroundColor: '#0284c7' }, // Header biru
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      })}
    >
      {/* 🚀 Lempar data user ke dalam initialParams agar bisa dipakai Dashboard & Profile */}
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen} 
        initialParams={{ user }} 
        options={{ title: 'KasKu' }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        initialParams={{ user }} 
        options={{ title: 'Profil Saya' }} 
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Auth">
      
      <Stack.Screen 
        name="Auth" 
        component={AuthScreen} 
        options={{ headerShown: false }} 
      />

      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs} 
        options={{ headerShown: false }} 
      />
      
      <Stack.Screen 
        name="AddTransaction" 
        component={AddTransactionScreen} 
        options={{ title: 'Tambah Transaksi', headerStyle: { backgroundColor: '#0284c7' }, headerTintColor: '#fff' }} 
      />
      
      <Stack.Screen 
        name="EditTransaction" 
        component={EditTransactionScreen} 
        options={{ title: 'Edit Transaksi', headerStyle: { backgroundColor: '#0284c7' }, headerTintColor: '#fff' }} 
      />
      
    </Stack.Navigator>
  );
}