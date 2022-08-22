import type { NextPage } from 'next';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccountBalance } from 'ankr-react';
import { useAccount } from 'wagmi';

const Home: NextPage = () => {
  const { address } = useAccount();

  const {
    data: balanceData,
    isLoading: balanceLoading,
    error: balanceError,
  } = useAccountBalance({
    walletAddress: address as string,
    blockchain: 'eth',
  });

  return (
    <div className='py-6 justify-center text-center'>
      <div className='flex justify-center'>
        <ConnectButton />
      </div>

      <h1 className='text-4xl font-bold mt-6'>
        🚀 Ankr React Hooks Playground
      </h1>

      <h3 className='mt-6 font-bold text-slate-500'>ERC20 Token Balances</h3>

      {balanceLoading ? (
        <p className='mt-2'>Loading...</p>
      ) : (
        <table className='mx-auto mt-2'>
          <thead>
            <th>Symbol</th>
            <th>Balance</th>
          </thead>

          <tbody>
            {balanceData?.assets?.map((asset) => {
              return (
                <tr>
                  <td>{asset.tokenSymbol}</td>
                  <td>{asset.balance}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
