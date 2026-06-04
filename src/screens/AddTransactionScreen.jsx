import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { transactionService } from '../services/transactionService';
import { getTodayDateString } from '../utils/date';
import Toast from 'react-native-toast-message';

// 🚀 PERBAIKAN: Tambahkan properti { route } untuk menangkap data dari navigasi
export default function AddTransactionScreen({ route, navigation }) {
  // 🚀 PERBAIKAN: Ambil userId yang dioper dari Dashboard Screen
  const { userId } = route.params || {};

  // 1. Inisialisasi State Form murni sesuai dengan validasi
  const [type, setType] = useState('income'); // default: pemasukan (income)
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(getTodayDateString()); // Otomatis terisi tanggal hari ini (YYYY-MM-DD)

  // 2. Fungsi Handler untuk Menyimpan Data ke SQLite via Service Layer
  const handleSave = async () => {
    try {
      // Transformasi & bungkus data ke dalam objek payload
      const payload = {
        user_id: userId, // 🚀 PERBAIKAN: Masukkan user_id ke dalam payload transaksi
        type,
        amount: parseFloat(amount), // Konversi teks input menjadi angka desimal/real
        description,
        transaction_date: date,
      };

      // Jalankan business logic & query SQL melalui Service Layer
      await transactionService.addTransaction(payload);
      
      // 1. Picu Toast-nya muncul terlebih dahulu
      Toast.show({
        type: 'success',
        text1: 'Berhasil!',
        text2: 'Transaksi harian berhasil disimpan.',
        position: 'top',
      });

      // 2. Berikan jeda waktu 500 milidetik (0.5 detik) baru halaman kembali ke Dashboard
      setTimeout(() => {
        navigation.goBack();
      }, 500);
    } catch (error) {
      // Jika gagal validasi di sisi service, tangkap pesannya dan tampilkan ke user
      Alert.alert("Gagal Validasi", error.message);
    }
  };

  return (
    <ScrollView className="flex-1 bg-slate-50 p-4">
      <View className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mb-6">
        
        {/* Bagian A: Pilihan Jenis Transaksi (Radio Button Kustom) */}
        <Text className="text-slate-600 font-semibold mb-2 text-sm">Jenis Transaksi</Text>
        <View className="flex-row justify-between mb-4">
          <TouchableOpacity
            onPress={() => setType('income')}
            className={`w-[48%] py-3 rounded-xl items-center border-2 ${
              type === 'income' 
                ? 'bg-emerald-50 border-emerald-500' 
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <Text className={`font-bold ${type === 'income' ? 'text-emerald-700' : 'text-slate-500'}`}>
              Pemasukan
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setType('expense')}
            className={`w-[48%] py-3 rounded-xl items-center border-2 ${
              type === 'expense' 
                ? 'bg-rose-50 border-rose-500' 
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <Text className={`font-bold ${type === 'expense' ? 'text-rose-700' : 'text-slate-500'}`}>
              Pengeluaran
            </Text>
          </TouchableOpacity>
        </View>

        {/* Bagian B: Input Nominal */}
        <Text className="text-slate-600 font-semibold mb-1 text-sm">Nominal (Rp)</Text>
        <TextInput
          className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 mb-4 font-semibold text-base"
          keyboardType="numeric"
          placeholder="Masukkan angka, contoh: 50000"
          value={amount}
          onChangeText={setAmount}
        />

        {/* Bagian C: Input Keterangan */}
        <Text className="text-slate-600 font-semibold mb-1 text-sm">Keterangan</Text>
        <TextInput
          className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 mb-4 text-sm"
          placeholder="Contoh: Uang Jajan, Gaji, Makan Siang"
          value={description}
          onChangeText={setDescription}
        />

        {/* Bagian D: Input Tanggal */}
        <Text className="text-slate-600 font-semibold mb-1 text-sm">Tanggal (YYYY-MM-DD)</Text>
        <TextInput
          className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 mb-6 text-sm"
          placeholder="Format: YYYY-MM-DD"
          value={date}
          onChangeText={setDate}
        />

        {/* Bagian E: Tombol Submit */}
        <TouchableOpacity
          onPress={handleSave}
          className="bg-sky-600 p-4 rounded-xl items-center active:bg-sky-700 shadow-md"
        >
          <Text className="text-white font-bold text-base">Simpan Transaksi</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}