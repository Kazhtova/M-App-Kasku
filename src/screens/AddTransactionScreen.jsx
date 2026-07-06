import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { transactionService } from '../services/transactionService';
import { getTodayDateString } from '../utils/date';
import Toast from 'react-native-toast-message';

export default function AddTransactionScreen({ route, navigation }) {
  const { userId } = route.params || {};

  const [type, setType] = useState('income'); 
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(getTodayDateString()); 

  const handleSave = async () => {
    try {
      const payload = {
        user_id: userId, 
        type,
        amount: parseFloat(amount), 
        description,
        transaction_date: date,
      };

  
      await transactionService.addTransaction(payload);
      

      Toast.show({
        type: 'success',
        text1: 'Berhasil!',
        text2: 'Transaksi harian berhasil disimpan.',
        position: 'top',
      });

      navigation.goBack();
    } catch (error) {
      Alert.alert("Gagal Validasi", error.message);
    }
  };

  return (
    <ScrollView className="flex-1 bg-slate-50 p-4">
      <View className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm mb-6">
        
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


        <Text className="text-slate-600 font-semibold mb-1 text-sm">Nominal (Rp)</Text>
        <TextInput
          className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 mb-4 font-semibold text-base"
          keyboardType="numeric"
          placeholder="Masukkan angka, contoh: 50000"
          value={amount}
          onChangeText={setAmount}
        />


        <Text className="text-slate-600 font-semibold mb-1 text-sm">Keterangan</Text>
        <TextInput
          className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 mb-4 text-sm"
          placeholder="Contoh: Gaji, Makan Siang"
          value={description}
          onChangeText={setDescription}
        />


        <Text className="text-slate-600 font-semibold mb-1 text-sm">Tanggal (YYYY-MM-DD)</Text>
        <TextInput
          className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800 mb-6 text-sm"
          placeholder="Format: YYYY-MM-DD"
          value={date}
          onChangeText={setDate}
        />


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