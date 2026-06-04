import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import ConfirmModal from '../components/ConfirmModal';

export default function ProfileScreen({ route, navigation }) {
  const { user } = route.params || {};
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const executeLogout = () => {
    setLogoutModalVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  return (
    <View className="flex-1 bg-slate-50 p-6 items-center">
      <View className="w-24 h-24 bg-sky-100 rounded-full items-center justify-center mb-4 border-4 border-white shadow-sm mt-8">
        <Ionicons name="person" size={40} color="#0284c7" />
      </View>

      <Text className="text-slate-800 text-2xl font-bold mb-1">
        {user?.username ? user.username.toUpperCase() : 'PENGGUNA'}
      </Text>
      <Text className="text-slate-500 text-sm mb-10 font-medium">Pengguna KasKu</Text>

      <TouchableOpacity
        onPress={() => setLogoutModalVisible(true)}
        className="w-full bg-white p-4 rounded-xl flex-row justify-center items-center border border-rose-200 shadow-sm active:bg-rose-50"
      >
        <Ionicons name="log-out-outline" size={22} color="#e11d48" className="mr-2" />
        <Text className="text-rose-600 font-bold text-base ml-1">Keluar dari Akun</Text>
      </TouchableOpacity>

      <ConfirmModal
        visible={isLogoutModalVisible}
        title="Konfirmasi Keluar"
        message="Apakah kamu yakin ingin keluar dari akun ini?"
        confirmText="Keluar"
        cancelText="Batal"
        isDestructive={true}
        onCancel={() => setLogoutModalVisible(false)}
        onConfirm={executeLogout}
      />
    </View>
  );
}