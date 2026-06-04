import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { transactionService } from '../services/transactionService';
// 🚀 1. Import Toast dan ConfirmModal
import Toast from 'react-native-toast-message';
import ConfirmModal from '../components/ConfirmModal';

export default function EditTransactionScreen({ route, navigation }) {
  const { transaction } = route.params;

  const [type, setType] = useState(transaction.type);
  const [amount, setAmount] = useState(transaction.amount.toString());
  const [description, setDescription] = useState(transaction.description);
  const [date, setDate] = useState(transaction.transaction_date);

  // 🚀 2. State untuk mengontrol visibilitas Modal Hapus
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  // --- FUNGSI UPDATE ---
  const handleUpdate = async () => {
    try {
      const updatedPayload = {
        user_id: transaction.user_id, // Tetap menjaga relasi database
        type,
        amount: parseFloat(amount),
        description,
        transaction_date: date,
      };

      await transactionService.updateTransaction(transaction.id, updatedPayload);
      
      // 🚀 3. Ganti Alert Sukses bawaan menjadi Toast
      Toast.show({
        type: 'success',
        text1: 'Berhasil Diperbarui',
        text2: 'Perubahan transaksi berhasil disimpan.',
        position: 'top',
      });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Gagal Validasi',
        text2: error.message,
        position: 'top',
      });
    }
  };

  // --- FUNGSI HAPUS ---
  // 🚀 4. Fungsi ini sekarang hanya bertugas memunculkan Modal
  const handleDelete = () => {
    setDeleteModalVisible(true);
  };

  // 🚀 5. Ini adalah fungsi eksekusi asli yang dipanggil oleh tombol "Ya, Hapus" di dalam Modal
  const executeDelete = async () => {
    setDeleteModalVisible(false); // Tutup modal animasinya dulu
    
    try {
      await transactionService.deleteTransaction(transaction.id);
      
      Toast.show({
        type: 'success',
        text1: 'Terhapus',
        text2: 'Data transaksi berhasil dihapus dari sistem.',
        position: 'top',
      });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Gagal Menghapus',
        text2: error.message,
        position: 'top',
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-slate-50 p-4">
      <View className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mb-6">
        
        {/* Pilihan Jenis Transaksi */}
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
            <Text className={`font-bold ${type === 'income' ? 'text-emerald-700' : 'text-slate-500'}`}>Pemasukan</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setType('expense')}
            className={`w-[48%] py-3 rounded-xl items-center border-2 ${
              type === 'expense' 
                ? 'bg-rose-50 border-rose-500' 
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <Text className={`font-bold ${type === 'expense' ? 'text-rose-700' : 'text-slate-500'}`}>Pengeluaran</Text>
          </TouchableOpacity>
        </View>

        {/* Input Nominal */}
        <Text className="text-slate-600 font-semibold mb-1 text-sm">Nominal (Rp)</Text>
        <TextInput
          className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 mb-4 font-semibold text-base"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        {/* Input Keterangan */}
        <Text className="text-slate-600 font-semibold mb-1 text-sm">Keterangan</Text>
        <TextInput
          className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 mb-4 text-sm"
          value={description}
          onChangeText={setDescription}
        />

        {/* Input Tanggal */}
        <Text className="text-slate-600 font-semibold mb-1 text-sm">Tanggal (YYYY-MM-DD)</Text>
        <TextInput
          className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 mb-6 text-sm"
          value={date}
          onChangeText={setDate}
        />

        {/* Tombol Update (Warna Biru Utama) */}
        <TouchableOpacity
          onPress={handleUpdate}
          className="bg-sky-600 p-4 rounded-xl items-center active:bg-sky-700 shadow-md mb-3"
        >
          <Text className="text-white font-bold text-base">Simpan Perubahan</Text>
        </TouchableOpacity>

        {/* Tombol Delete (Warna Merah untuk Bahaya) */}
        <TouchableOpacity
          onPress={handleDelete} // 🚀 Sekarang hanya memicu Modal
          className="bg-rose-50 p-4 rounded-xl items-center border-2 border-rose-200 active:bg-rose-100"
        >
          <Text className="text-rose-600 font-bold text-base">Hapus Transaksi</Text>
        </TouchableOpacity>

      </View>

      {/* 🚀 6. Render Modal Konfirmasi Hapus di tumpukan paling bawah */}
      <ConfirmModal
        visible={isDeleteModalVisible}
        title="Konfirmasi Hapus"
        message="Apakah kamu yakin ingin menghapus transaksi ini? Data yang dihapus tidak bisa dikembalikan ke sistem."
        confirmText="Hapus"
        cancelText="Batal"
        isDestructive={true} // Tombol konfirmasi otomatis menjadi merah
        onCancel={() => setDeleteModalVisible(false)} // Tutup modal jika klik Batal / Area luar
        onConfirm={executeDelete} // Jalankan fungsi hapus jika klik Ya
      />
    </ScrollView>
  );
}