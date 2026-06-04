import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { formatRupiah } from '../utils/currency';
import { formatDate } from '../utils/date';

export default function TransactionItem({ item, onPress }) {
  const isIncome = item.type === 'income';

  return (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row justify-between items-center bg-white p-4 rounded-xl mb-2 border border-slate-100 shadow-sm active:bg-slate-50"
    >
      <View className="flex-1 pr-3">
        <Text className="text-slate-800 font-semibold text-base" numberOfLines={1}>
          {item.description}
        </Text>
        <Text className="text-slate-400 text-xs mt-0.5">
          {formatDate(item.transaction_date)}
        </Text>
      </View>
      
      <View>
        <Text className={`font-bold text-base ${isIncome ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isIncome ? '+' : '-'} {formatRupiah(item.amount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}