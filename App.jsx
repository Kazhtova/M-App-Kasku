import "./global.css";
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { initDatabase } from './src/database/database';
import AppNavigator from './src/navigation/AppNavigator';

// 🚀 1. Import Toast dan komponen BaseToast bawaannya jika diperlukan
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

// 🚀 2. DEKLARASI CONFIG CUSTOM DESAIN (100% Menggunakan Tailwind)
const toastConfig = {
  success: (props) => (
    <View className="w-[92%] bg-white p-4 rounded-2xl flex-row items-center border border-emerald-100 shadow-xl shadow-emerald-900/10 active:scale-95">
      {/* Garis Aksen Hijau Vertikal di Sisi Kiri */}
      <View className="w-1.5 h-10 bg-emerald-500 rounded-full mr-3.5" />
      
      {/* Area Teks */}
      <View className="flex-1 justify-center">
        <Text className="text-slate-800 text-sm font-bold tracking-tight mb-0.5">
          {props.text1}
        </Text>
        {props.text2 ? (
          <Text className="text-slate-500 text-xs font-medium leading-relaxed">
            {props.text2}
          </Text>
        ) : null}
      </View>
    </View>
  ),

  error: (props) => (
    <View className="w-[92%] bg-white p-4 rounded-2xl flex-row items-center border border-rose-100 shadow-xl shadow-rose-900/10 active:scale-95">
      {/* Garis Aksen Merah Vertikal di Sisi Kiri */}
      <View className="w-1.5 h-10 bg-rose-500 rounded-full mr-3.5" />
      
      {/* Area Teks */}
      <View className="flex-1 justify-center">
        <Text className="text-slate-800 text-sm font-bold tracking-tight mb-0.5">
          {props.text1}
        </Text>
        {props.text2 ? (
          <Text className="text-slate-500 text-xs font-medium leading-relaxed">
            {props.text2}
          </Text>
        ) : null}
      </View>
    </View>
  ),
};

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    initDatabase()
      .then(() => setDbInitialized(true))
      .catch((err) => console.log("Database Gagal Load: ", err));
  }, []);

  if (!dbInitialized) {
    return (
      <View className="flex-1 justify-center items-center bg-slate-100">
        <ActivityIndicator size="large" color="#0284c7" />
        <Text className="mt-2 text-slate-600 font-medium">Menyiapkan Database KasKu...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#0284c7" />
        <AppNavigator />
      </NavigationContainer>
      
      {/* 🚀 3. Suntikkan konfigurasi kustom dan atur jarak atas (topOffset) agar lebih turun */}
      <Toast 
        config={toastConfig} 
        topOffset={60} // 👈 Menaikkan jarak aman sejauh 60 piksel dari batas atas layar (Terbebas dari Notch)
        visibilityTime={2500} // Tampil selama 2.5 detik agar pas dibaca
      />
    </View>
  );
}