import { getDatabaseConnection } from '../database/database';

export const transactionRepository = {
async getAllByUserId(userId) {
    const db = await getDatabaseConnection();
    return await db.getAllAsync(
      'SELECT * FROM transactions WHERE user_id = ? ORDER BY id DESC', 
      [userId]
    );
  },

  async getAll() {
    const db = await getDatabaseConnection();
    return await db.getAllAsync('SELECT * FROM transactions ORDER BY id DESC');
  },

  async create(data) {
    const db = await getDatabaseConnection();
    const { user_id, type, amount, description, transaction_date } = data;
    
    return await db.runAsync(
      'INSERT INTO transactions (user_id, type, amount, description, transaction_date) VALUES (?, ?, ?, ?, ?)',
      [user_id, type, amount, description, transaction_date]
    );
  },

  async update(id, transaction) {
    const db = await getDatabaseConnection();
    const { type, amount, description, transaction_date } = transaction;
    
    await db.runAsync(
      'UPDATE transactions SET type = ?, amount = ?, description = ?, transaction_date = ? WHERE id = ?',
      [type, amount, description, transaction_date, id]
    );
    return true;
  },

  async delete(id) {
    const db = await getDatabaseConnection();
    await db.runAsync('DELETE FROM transactions WHERE id = ?', [id]);
    return true;
  }
};