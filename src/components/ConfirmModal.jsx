import React from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable } from 'react-native';

export default function ConfirmModal({ 
  visible, 
  title, 
  message, 
  onCancel, 
  onConfirm, 
  confirmText = "Ya", 
  cancelText = "Batal", 
  isDestructive = false 
}) {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade" 
      onRequestClose={onCancel} // Menangani tombol back fisik di OS Android
    >
      {/* 🚀 PERBAIKAN UX: Backdrop Press (Latar belakang transparan yang bisa diklik untuk membatalkan) */}
      <Pressable 
        className="flex-1 bg-black/60 justify-center items-center px-6"
        onPress={onCancel}
      >
        {/* 🚀 Mencegah sentuhan menembus ke belakang saat kotak putih ditekan */}
        <Pressable 
          className="bg-white w-full p-6 rounded-2xl shadow-lg"
          onPress={() => {}} // Fungsi kosong agar klik terhenti di sini (event consumption)
        >
          {/* Hierarki Visual yang Dipertajam */}
          <Text className="text-slate-800 text-lg font-bold mb-1 text-center tracking-tight">
            {title}
          </Text>
          <Text className="text-slate-500 text-sm text-center mb-6 leading-relaxed">
            {message}
          </Text>

          {/* Menggunakan gap untuk jarak antar-tombol yang lebih presisi dan modern */}
          <View className="flex-row justify-between gap-3">
            <TouchableOpacity 
              onPress={onCancel}
              className="flex-1 bg-slate-100 py-3.5 rounded-xl items-center active:bg-slate-200"
            >
              <Text className="text-slate-600 font-semibold text-sm">{cancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={onConfirm}
              className={`flex-1 py-3.5 rounded-xl items-center shadow-sm ${
                isDestructive ? 'bg-rose-600 active:bg-rose-700' : 'bg-sky-600 active:bg-sky-700'
              }`}
            >
              <Text className="text-white font-semibold text-sm">{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}