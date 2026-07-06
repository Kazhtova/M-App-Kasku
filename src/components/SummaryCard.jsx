import React from 'react';
import { View, Text } from 'react-native';
import { formatRupiah } from '../utils/currency';

export default function SummaryCard({ summary = {} }) {
  const { 
    totalBalance = 0, 
    totalIncome = 0, 
    totalExpense = 0 
  } = summary;

  return (
    <View className="bg-white p-5 rounded-2xl shadow-sm mb-4 border border-slate-100">
      <View className="items-center border-b border-slate-100 pb-4 mb-4">
        <Text className="text-slate-400 font-medium text-sm uppercase tracking-wider">Total Saldo</Text>
        <Text className={`text-3xl font-bold mt-1 ${totalBalance >= 0 ? 'text-slate-800' : 'text-rose-600'}`}>
          {formatRupiah(totalBalance)}
        </Text>
      </View>

      <View className="flex-row justify-between">
        <View className="w-[48%] bg-emerald-50 p-3 rounded-xl border border-emerald-100">
          <Text className="text-emerald-600 text-xs font-semibold uppercase">Pemasukan</Text>
          <Text className="text-emerald-700 font-bold text-base mt-1">{formatRupiah(totalIncome)}</Text>
        </View>

        <View className="w-[48%] bg-rose-50 p-3 rounded-xl border border-rose-100">
          <Text className="text-rose-600 text-xs font-semibold uppercase">Pengeluaran</Text>
          <Text className="text-rose-700 font-bold text-base mt-1">{formatRupiah(totalExpense)}</Text>
        </View>
      </View>
    </View>
  );
}