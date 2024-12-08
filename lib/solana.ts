import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com');

export async function getAccountBalance(publicKey: PublicKey) {
  try {
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error('Error fetching balance:', error);
    return 0;
  }
}

export async function getTokenBalance(publicKey: PublicKey) {
  try {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
      programId: TOKEN_PROGRAM_ID,
    });

    // For demo purposes, we'll return the first token account balance
    if (tokenAccounts.value.length > 0) {
      return parseFloat(tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount);
    }
    return 0;
  } catch (error) {
    console.error('Error fetching token balance:', error);
    return 0;
  }
}

export async function getRecentTransactions(publicKey: PublicKey) {
  try {
    const transactions = await connection.getSignaturesForAddress(publicKey, {
      limit: 5,
    });

    return transactions.map(tx => ({
      signature: tx.signature,
      slot: tx.slot,
      timestamp: tx.blockTime ? new Date(tx.blockTime * 1000).toISOString() : undefined,
      status: tx.confirmationStatus,
    }));
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}