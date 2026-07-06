import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const faqData = [
  {
    id: '1',
    question: 'Bagaimana Cara Melakukan Pencatatan?',
    answer: 'Anda dapat melakukan pencatatan pada halaman Beranda. Selain itu, Anda juga dapat menambah, mengubah, dan menghapus catatan secara langsung.',
  },
  {
    id: '2',
    question: 'Bagaimana Cara Mengubah Password?',
    answer: 'Silakan akses halaman Profil, kemudian pilih menu Keamanan untuk mengatur Kata Sandi dan PIN Anda.',
  },
  {
    id: '3',
    question: 'Alasan Kami Membangun Program Mobile Pencatatan',
    answer: 'Program ini dirancang untuk memenuhi kebutuhan bersama dalam mengelola keuangan, di tengah padatnya aktivitas yang sering kali membuat kita mengabaikan pentingnya pencatatan finansial.',
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