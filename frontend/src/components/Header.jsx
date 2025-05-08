import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Power } from 'lucide-react';
import {
  checkWalletConnection,
  connectWallet,
  setupWalletListeners,
  formatWalletAddress
} from '../utils/walletUtils';

const Header = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Check if wallet is already connected
    const checkConnection = async () => {
      const address = await checkWalletConnection();
      if (address) {
        setWalletAddress(address);
      }
    };

    checkConnection();

    // Setup wallet event listeners
    const cleanup = setupWalletListeners({
      onAccountsChanged: (accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress(null);
        }
      },
      onDisconnect: () => {
        setWalletAddress(null);
      }
    });

    return cleanup;
    // eslint-disable-next-line
  }, []);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      const { address } = await connectWallet();
      setWalletAddress(address);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-1000 \
      ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10 backdrop-blur-xl" />
        <div className="relative max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl \
                  group-hover:scale-110 group-hover:rotate-180 transition-all duration-700" />
                <div className="absolute inset-1 bg-black rounded-lg" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">E</span>
                </div>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r \
                from-purple-400 to-blue-400 group-hover:from-purple-300 group-hover:to-blue-300 \
                transition-all duration-300">EventVerse</span>
            </div>
            <div className="flex items-center space-x-8">
              {[
                { name: 'Home', path: '/' },
                { name: 'WaitingList', path: '/waiting' },
                { name: 'TicketMinting', path: '/mint' },
              ].map(({ name, path }) => (
                <Link
                  key={name}
                  to={path}
                  className="relative group py-2"
                >
                  <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors duration-300">
                    {name}
                  </span>
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 \
                    group-hover:w-full group-hover:left-0 transition-all duration-300" />
                </Link>
              ))}
              <button
                onClick={walletAddress ? disconnectWallet : handleConnectWallet}
                disabled={isConnecting}
                className="group relative px-8 py-4 rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-xl \
                  group-hover:blur-2xl transition-all duration-300" />
                <div className="relative z-10 flex items-center gap-2">
                  {isConnecting ? (
                    'Connecting...'
                  ) : walletAddress ? (
                    <>
                      <span>{formatWalletAddress(walletAddress)}</span>
                      <Power className="w-4 h-4" />
                    </>
                  ) : (
                    'Connect Wallet'
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
