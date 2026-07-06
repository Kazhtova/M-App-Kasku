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
      {/* Avatar & User Info */}
      <View className="w-24 h-24 bg-sky-100 rounded-full items-center justify-center mb-4 border-4 border-white shadow-sm mt-8">
        <Ionicons name="person" size={40} color="#0284c7" />
      </View>

      <Text className="text-slate-800 text-2xl font-bold mb-1">
        {user?.username ? user.username.toUpperCase() : 'PENGGUNA'}
      </Text>
      <Text className="text-slate-500 text-sm mb-8 font-medium">Pengguna KasKu</Text>

      {/* --- MENU CARDS SECTION --- */}
      <View className="w-full flex-row justify-between mb-8">
        {/* Tombol Keamanan */}
        <TouchableOpacity 
          className="flex-1 bg-white p-4 rounded-xl border border-slate-100 shadow-sm mr-2 active:bg-slate-50"
          onPress={() => navigation.navigate('ChangePassword', { user })}
        >
          <View className="w-10 h-10 bg-indigo-50 rounded-full items-center justify-center mb-3">
            <Ionicons name="shield-checkmark" size={20} color="#0284c7" />
          </View>
          <Text className="text-slate-800 font-bold text-base mb-1">Keamanan</Text>
          <Text className="text-slate-500 text-xs">Atur PIN & Sandi</Text>
        </TouchableOpacity>

        {/* Tombol Bantuan */}
        <TouchableOpacity 
          className="flex-1 bg-white p-4 rounded-xl border border-slate-100 shadow-sm ml-2 active:bg-slate-50"
          onPress={() => navigation.navigate('FAQScreen', { user })}
        >
          <View className="w-10 h-10 bg-indigo-50 rounded-full items-center justify-center mb-3">
            <Ionicons name="help-circle" size={24} color="#0284c7" />
          </View>
          <Text className="text-slate-800 font-bold text-base mb-1">Bantuan</Text>
          <Text className="text-slate-500 text-xs">FAQ & Dukungan</Text>
        </TouchableOpacity>
      </View>
      {/* --------------------------- */}

      {/* Logout Button */}
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