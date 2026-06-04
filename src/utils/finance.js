export const calculateFinanceSummary = (transactions) => {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((tx) => {
    if (tx.type === 'income') {
      totalIncome += tx.amount;
    } else if (tx.type === 'expense') {
      totalExpense += tx.amount;
    }
  });

  const totalBalance = totalIncome - totalExpense;

  return {
    totalBalance,
    totalIncome,
    totalExpense,
    totalTransactions: transactions.length
  };
};