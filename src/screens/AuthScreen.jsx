import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import { authService } from '../services/authService';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

const handleAuth = async () => {
    try {
      const user = await authService.loginOrRegister(username, password);
      
      navigation.replace('MainTabs', { user });
    } catch (error) {
      Alert.alert("Autentikasi Gagal", error.message);
    }
  };
  
  return (
    <SafeAreaView className="flex-1 bg-sky-600 justify-center px-6">
      <View className="items-center mb-10">
        <Text className="text-white text-4xl font-extrabold tracking-widest mb-2">KasKu</Text>
        <Text className="text-sky-100 text-sm text-center">
          Catat keuangan harianmu dengan mudah.
        </Text>
      </View>

      <View className="bg-white p-6 rounded-3xl shadow-lg">
        <Text className="text-slate-800 text-xl font-bold mb-6 text-center">Masuk / Daftar</Text>
        
        <Text className="text-slate-500 font-semibold mb-1 text-xs uppercase">Username</Text>
        <TextInput
          className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-800 mb-4"
          placeholder="Masukkan username..."
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />

        <Text className="text-slate-500 font-semibold mb-1 text-xs uppercase">Password / PIN</Text>
        <TextInput
          className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-800 mb-8"
          placeholder="Masukkan password rahasia..."
          secureTextEntry 
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          onPress={handleAuth}
          className="bg-sky-600 p-4 rounded-xl items-center active:bg-sky-700"
        >
          <Text className="text-white font-bold text-base">Lanjutkan</Text>
        </TouchableOpacity>
        
        <Text className="text-slate-400 text-xs text-center mt-4">
          Jika akun belum ada, sistem akan otomatis mendaftarkannya untukmu.
        </Text>
      </View>
    </SafeAreaView>
  );
}