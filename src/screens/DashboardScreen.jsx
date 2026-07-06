import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { transactionService } from '../services/transactionService';
import { calculateFinanceSummary } from '../utils/finance';
import SummaryCard from '../components/SummaryCard';
import TransactionItem from '../components/TransactionItem';

export default function DashboardScreen({ route, navigation }) {
  const { user = { id: 1, username: 'Guest' } } = route.params || {};

  const isFocused = useIsFocused();
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all'); 

  const loadData = async () => {
    try {
      const data = await transactionService.getAllTransactions(user.id);
      setTransactions(data);
    } catch (error) {
      console.error("Gagal memuat transaksi:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);


  const summary = calculateFinanceSummary(transactions);

  const filteredTransactions = transactions.filter((tx) => {
    const keyword = search.toLowerCase();

    const matchesDescription = tx.description.toLowerCase().includes(keyword);
    
    const matchesAmount = tx.amount.toString().includes(keyword);

    const matchesSearch = matchesDescription || matchesAmount;
    
    const matchesFilter = filterType === 'all' || tx.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <View className="flex-1 bg-slate-50 p-4">
      <SummaryCard summary={summary} />

      <TouchableOpacity
        onPress={() => navigation.navigate('AddTransaction', { userId: user.id })}
        className="bg-sky-600 p-4 rounded-xl items-center shadow-md active:bg-sky-700 mb-4"
      >
        <Text className="text-white font-bold text-base">+ Tambah Transaksi</Text>
      </TouchableOpacity>

      <View className="mb-3">
        <TextInput
          className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm"
          placeholder="Cari transaksi (e.g. makan, gaji)..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View className="flex-row mb-4 justify-between">
        {['all', 'income', 'expense'].map((type) => (
          <TouchableOpacity
            key={type}
            onPress={() => setFilterType(type)}
            className={`w-[31%] py-2 rounded-lg items-center border ${
              filterType === type 
                ? 'bg-sky-600 border-sky-600' 
                : 'bg-white border-slate-200'
            }`}
          >
            <Text className={`text-xs font-semibold uppercase ${filterType === type ? 'text-white' : 'text-slate-500'}`}>
              {type === 'all' ? 'Semua' : type === 'income' ? 'Pemasukan' : 'Pengeluaran'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className="text-slate-800 text-base font-bold mb-2">Riwayat Transaksi</Text>
      
      <View className="flex-1">
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TransactionItem
              item={item}
              onPress={() => navigation.navigate('EditTransaction', { transaction: item })}
            />
          )}
          ListEmptyComponent={
            <View className="items-center py-8">
              <Text className="text-slate-400 text-sm">Tidak ada transaksi ditemukan.</Text>
            </View>
          }
        />
      </View>
    </View>
  );
}