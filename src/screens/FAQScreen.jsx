import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const faqData = [
  {
    id: '1',
    question: 'How do I export my financial reports?',
    answer: 'You can export your financial reports by going to the Profile menu, selecting "Export Data", and choosing your preferred format (PDF or CSV).',
  },
  {
    id: '2',
    question: 'How can I change my PIN?',
    answer: 'To change your PIN, navigate to the Security settings within your Profile, enter your current PIN, and then set a new one.',
  },
  {
    id: '3',
    question: 'Why is my recent transaction pending?',
    answer: 'Transactions usually appear as pending while the merchant confirms the final amount. This process typically takes 1-3 business days. If a transaction has been pending for longer than 5 days, please contact support.',
  },
  {
    id: '4',
    question: 'What happens if I lose my card?',
    answer: 'If you lose your card, immediately freeze it using the app settings and contact our 24/7 customer support to request a replacement.',
  },
];

const FAQItem = ({ question, answer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View className="border-b border-slate-100">
      <TouchableOpacity 
        onPress={() => setIsExpanded(!isExpanded)}
        className="flex-row items-center justify-between py-5 active:bg-slate-50"
      >
        <Text className="text-slate-900 text-base font-bold flex-1 pr-4">
          {question}
        </Text>
        <Ionicons 
          name={isExpanded ? "chevron-up" : "chevron-down"} 
          size={20} 
          color="#94a3b8" 
        />
      </TouchableOpacity>
      
      {isExpanded && (
        <View className="pb-5 pr-4">
          <Text className="text-slate-500 text-sm leading-relaxed">
            {answer}
          </Text>
        </View>
      )}
    </View>
  );
};

export default function FAQScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      
      <View className="flex-row items-center justify-between px-4 py-3 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 -ml-2">
            <Ionicons name="arrow-back" size={24} color="#334155" />
        </TouchableOpacity>
        
        <Text className="flex-1 text-slate-800 text-base font-bold ml-2">
            Help & Support
        </Text>

      </View>

      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40, paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-center text-slate-800 text-xs font-bold tracking-widest uppercase mb-4">
          Informasi
        </Text>

        <Text className="text-center text-slate-900 text-3xl font-extrabold mb-10 leading-tight">
          Jawaban yang paling sering ditanyakan kepada kami
        </Text>

        <View className="border-t border-slate-100">
          {faqData.map((item) => (
            <FAQItem 
              key={item.id} 
              question={item.question} 
              answer={item.answer} 
            />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}