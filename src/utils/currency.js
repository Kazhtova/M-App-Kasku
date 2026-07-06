export const formatRupiah = (amount) => {
  if (amount === undefined || amount === null) return 'Rp 0';
  
  const isNegative = amount < 0;
  
  const formatted = Math.abs(amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
  return isNegative ? `-Rp ${formatted}` : `Rp ${formatted}`;
};