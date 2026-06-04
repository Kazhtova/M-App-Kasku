import { getDatabaseConnection } from '../database/database';

export const authService = {
  // Sistem Satu Pintu: Cek -> Jika ada = Login, Jika tidak = Register
  async loginOrRegister(username, password) {
    if (!username || !password) {
      throw new Error("Username dan Password tidak boleh kosong!");
    }

    const db = await getDatabaseConnection();

    // 1. Cek apakah username sudah ada di database
    const existingUser = await db.getFirstAsync(
      'SELECT * FROM users WHERE username = ?', 
      [username.toLowerCase()]
    );

    if (existingUser) {
      // 2. Skenario LOGIN: Akun ditemukan, cocokkan password
      if (existingUser.password !== password) {
        throw new Error("Password salah! Silakan coba lagi.");
      }
      return existingUser; // Sukses Login
    } else {
      // 3. Skenario REGISTER: Akun tidak ada, otomatis buat baru
      await db.runAsync(
        'INSERT INTO users (username, password) VALUES (?, ?)', 
        [username.toLowerCase(), password]
      );
      // Ambil kembali data user yang baru saja dibuat
      const newUser = await db.getFirstAsync(
        'SELECT * FROM users WHERE username = ?', 
        [username.toLowerCase()]
      );
      return newUser; // Sukses Register & Login
    }
  }
};