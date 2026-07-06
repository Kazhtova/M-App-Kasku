import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import Toast from 'react-native-toast-message';

const PasswordInputField = ({ label, placeholder, helperText, value, onChangeText, editable }) => {
  const [isSecure, setIsSecure] = useState(true);
  
  return (
    <View className="mb-4">
      <Text className="text-slate-500 text-xs font-bold tracking-widest mb-2 uppercase">
        {label}
      </Text>
      
      <View className="flex-row items-center border border-slate-200 bg-white rounded-xl px-4 h-14 focus:border-sky-500 focus:border-2 transition-all">
        <TextInput
          className="flex-1 text-slate-800 text-base"
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          secureTextEntry={isSecure}
          autoCapitalize="none"
          value={value}             
          onChangeText={onChangeText} 
          editable={editable}       
        />
        <TouchableOpacity 
          onPress={() => setIsSecure(!isSecure)}
          className="p-2 -mr-2"
        >
          <Ionicons 
            name={isSecure ? "eye-off-outline" : "eye-outline"} 
            size={22} 
            color="#94a3b8" 
          />
        </TouchableOpacity>
      </View>

      {helperText && (
        <View className="flex-row items-center mt-2">
          <Ionicons name="information-circle-outline" size={14} color="#94a3b8" />
          <Text className="text-slate-400 text-xs ml-1">
            {helperText}
          </Text>
        </View>
      )}
    </View>
  );
};

// ---------------------------------------------------------
// 2. MAIN SCREEN: Change Password Screen
// ---------------------------------------------------------
export default function ChangePasswordScreen({ route, navigation }) {
  // Tangkap data user yang sedang login
  const { user = { id: 1, username: 'Guest' } } = route.params || {};

  // State utama untuk logika backend
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // LOGIKA UTAMA: VALIDASI & UPDATE PASSWORD DI SQLITE
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Input Belum Lengkap !',
        text2: 'Semua kolom password wajib diisi.',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Password Tidak Cocok',
        text2: 'Konfirmasi password baru tidak sama dengan password baru.',
      });
      return;
    }

    setLoading(true);
    try {
      const db = await SQLite.openDatabaseAsync('kasku.db');

      const currentUserData = await db.getFirstAsync(
        'SELECT password FROM users WHERE id = ?', 
        [user.id]
      );

      if (!currentUserData || currentUserData.password !== oldPassword) {
        Toast.show({
          type: 'error',
          text1: 'Password Lama Salah',
          text2: 'Password lama yang Anda masukkan tidak sesuai database.',
        });
        setLoading(false);
        return;
      }

      await db.runAsync(
        'UPDATE users SET password = ? WHERE id = ?',
        [newPassword, user.id]
      );

      Toast.show({
        type: 'success',
        text1: 'Password Diperbarui',
        text2: 'Password akun Anda berhasil diamankan.',
        position: 'top',
      });

      navigation.goBack();

    } catch (error) {
      console.error("Gagal mengubah password:", error);
      Toast.show({
        type: 'error',
        text1: 'Gagal Menyimpan!',
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* HEADER */}
        <View className="flex-row items-center px-6 py-4 border-b border-slate-100 bg-slate-50">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#334155" />
          </TouchableOpacity>
          <Text className="text-slate-900 text-lg font-bold flex-1">
            Ubah Kata Sandi
          </Text>
        </View>

        {/* SCROLLABLE CONTENT */}
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, padding: 24 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text className="text-slate-500 text-sm leading-relaxed mb-8">
            Pastikan password baru Anda kuat dan belum pernah digunakan sebelumnya untuk keamanan akun Anda.
          </Text>

          {/* Form Fields dengan State Terhubung */}
          <PasswordInputField 
            label="Password Saat Ini" 
            placeholder="Masukkan password saat ini" 
            value={oldPassword}
            onChangeText={setOldPassword}
            editable={!loading}
          />
          
          <PasswordInputField 
            label="Password Baru" 
            placeholder="Minimal 8 karakter" 
            helperText="Pastikan mudah diingat namun sulit ditebak"
            value={newPassword}
            onChangeText={setNewPassword}
            editable={!loading}
          />
          
          <PasswordInputField 
            label="Konfirmasi Password Baru" 
            placeholder="Ketik ulang password baru" 
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={!loading}
          />
        </ScrollView>

        {/* FIXED BOTTOM BUTTON */}
        <View className="p-6 bg-slate-50">
          <TouchableOpacity 
            onPress={handleChangePassword}
            disabled={loading}
            className={`w-full h-14 rounded-xl items-center justify-center shadow-sm ${
              loading ? 'bg-sky-400' : 'bg-sky-600 active:bg-sky-700'
            }`}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white font-bold text-base">
                Simpan Perubahan
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}