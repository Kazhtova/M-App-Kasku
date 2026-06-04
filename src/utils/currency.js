export const formatRupiah = (amount) => {
  if (amount === undefined || amount === null) return 'Rp 0';
  
  // 1. Cek apakah angkanya negatif
  const isNegative = amount < 0;
  
  // 2. Format angkanya (gunakan Math.abs hanya untuk proses selipan titik ribuan)
  const formatted = Math.abs(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
  // 3. Jika negatif, tambahkan tanda minus di depan "Rp" atau setelah "Rp"
  return isNegative ? `-Rp ${formatted}` : `Rp ${formatted}`;
};