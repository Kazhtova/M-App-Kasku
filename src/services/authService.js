import { getDatabaseConnection } from '../database/database';

export const authService = {
  async loginOrRegister(username, password) {
    if (!username || !password) {
      throw new Error("Username dan Password tidak boleh kosong!");
    }

    const db = await getDatabaseConnection();

    const existingUser = await db.getFirstAsync(
      'SELECT * FROM users WHERE username = ?', 
      [username.toLowerCase()]
    );

    if (existingUser) {
      if (existingUser.password !== password) {
        throw new Error("Password salah! Silakan coba lagi.");
      }
      return existingUser; 
    } else {

      await db.runAsync(
        'INSERT INTO users (username, password) VALUES (?, ?)', 
        [username.toLowerCase(), password]
      );

      const newUser = await db.getFirstAsync(
        'SELECT * FROM users WHERE username = ?', 
        [username.toLowerCase()]
      );
      return newUser; 
    }
  }
};