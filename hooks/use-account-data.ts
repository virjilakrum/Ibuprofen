import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { getAccountBalance, getTokenBalance, getRecentTransactions } from '@/lib/solana';
import useSWR from 'swr';

export function useAccountData() {
  const { publicKey } = useWallet();
  const [isLoading, setIsLoading] = useState(true);

  const { data: solBalance, error: solError } = useSWR(
    publicKey ? ['solBalance', publicKey.toString()] : null,
    () => publicKey ? getAccountBalance(publicKey) : 0,
    { refreshInterval: 10000 }
  );

  const { data: tokenBalance, error: tokenError } = useSWR(
    publicKey ? ['tokenBalance', publicKey.toString()] : null,
    () => publicKey ? getTokenBalance(publicKey) : 0,
    { refreshInterval: 10000 }
  );

  const { data: transactions, error: txError } = useSWR(
    publicKey ? ['transactions', publicKey.toString()] : null,
    () => publicKey ? getRecentTransactions(publicKey) : [],
    { refreshInterval: 10000 }
  );

  useEffect(() => {
    if (solBalance !== undefined && tokenBalance !== undefined && transactions !== undefined) {
      setIsLoading(false);
    }
  }, [solBalance, tokenBalance, transactions]);

  return {
    isLoading,
    solBalance: solBalance || 0,
    tokenBalance: tokenBalance || 0,
    transactions: transactions || [],
    error: solError || tokenError || txError,
  };
}