import { transactionRepository } from '../repositories/transactionRepository';

export const transactionService = {
  // 1. FITUR LOGGER: Pengganti phpMyAdmin di Terminal
  async debugDatabase(actionName) {
    try {
      const allData = await transactionRepository.getAll();
      
      // 🚀 UPDATE: Garis tabel diperlebar untuk menampung kolom UID
      console.log(`\n\n┌──────────────────────────────────────────────────────────────┐`);
      console.log(`│ 🗄️  KASKU DATABASE LOGGER (Aksi: ${actionName.padEnd(20)}) │`);
      console.log(`├──────────────────────────────────────────────────────────────┤`);
      
      if (allData.length === 0) {
        console.log("│ Status: Tabel 'transactions' masih kosong (0 baris).         │");
      } else {
        // 🚀 UPDATE: Tambah Header UID (User ID)
        console.log("│ ID  │ UID │ TIPE     │ NOMINAL      │ KETERANGAN             │");
        console.log("├─────┼─────┼──────────┼──────────────┼────────────────────────┤");
        
        allData.forEach((tx) => {
          const idStr = String(tx.id).padEnd(3);
          // 🚀 UPDATE: Tarik user_id. Jika kosong/undefined, tampilkan '---'
          const uidStr = String(tx.user_id || '---').padEnd(3); 
          const typeStr = String(tx.type).padEnd(8);
          const amountStr = String(tx.amount).padEnd(12);
          const descStr = String(tx.description).substring(0, 22).padEnd(22);
          
          console.log(`│ ${idStr} │ ${uidStr} │ ${typeStr} │ ${amountStr} │ ${descStr} │`);
        });
      }
      
      console.log(`└──────────────────────────────────────────────────────────────┘\n`);
    } catch (error) {
      console.log("Gagal membaca logger:", error);
    }
  },

  // 2. READ
// 🚀 SEKARANG WAJIB MENERIMA USERID
  async getAllTransactions(userId) {
    if (!userId) throw new Error("Gagal memuat: Sesi pengguna tidak valid.");
    
    // Ambil data spesifik milik user tersebut
    const data = await transactionRepository.getAllByUserId(userId);
    await this.debugDatabase("READ / MUAT DATA"); 
    return data;
  },

  // 3. CREATE
  async addTransaction(data) {
    this.validate(data); // Validasi akan mengecek user_id sekarang
    const result = await transactionRepository.create(data);
    await this.debugDatabase("CREATE / TAMBAH TRANSAKSI"); 
    return result;
  },

  // 4. UPDATE
  async updateTransaction(id, data) {
    this.validate(data);
    const result = await transactionRepository.update(id, data);
    await this.debugDatabase(`UPDATE / UBAH DATA ID: ${id}`); 
    return result;
  },

  // 5. DELETE
  async deleteTransaction(id) {
    if (!id) throw new Error("ID transaksi wajib disertakan untuk menghapus.");
    const result = await transactionRepository.delete(id);
    await this.debugDatabase(`DELETE / HAPUS DATA ID: ${id}`); 
    return result;
  },

  // 6. VALIDASI
  validate(data) {
    // 🚀 UPDATE: Tambahkan user_id ke dalam destrukturisasi
    const { user_id, type, amount, description, transaction_date } = data;

    // 🚀 UPDATE: Validasi mutlak untuk keamanan relasi tabel
    if (!user_id) {
      throw new Error("Sistem menolak: user_id tidak ditemukan. Pastikan Anda sudah login.");
    }

    if (!type || !['income', 'expense'].includes(type)) {
      throw new Error("Jenis transaksi harus 'income' (pemasukan) atau 'expense' (pengeluaran).");
    }
    if (!amount || isNaN(amount) || amount < 1) {
      throw new Error("Nominal wajib diisi, berupa angka, dan minimal Rp 1.");
    }
    if (!description || description.trim() === '') {
      throw new Error("Keterangan wajib diisi.");
    }
    if (description.length > 255) {
      throw new Error("Keterangan maksimal 255 karakter.");
    }
    if (!transaction_date) {
      throw new Error("Tanggal transaksi wajib diisi.");
    }
  }
};