//Initial blocks of Code commented at the bottom

import React, { useState } from "react";
import { ethers } from "ethers"; // Ensure ethers.js is installed

export default function TicketPurchase() {
  const [quantity, setQuantity] = useState(1);
  const [pricePerTicket, setPricePerTicket] = useState(1); // Replace with your actual price
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState("");

  // Connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        setError("");
      } catch (err) {
        setError("Failed to connect wallet");
      }
    } else {
      setError("Please install a compatible wallet like MetaMask.");
    }
  };

  // Handle ticket quantity change
  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  // Handle purchase
  const handlePurchase = async () => {
    if (!isConnected) {
      setError("Please connect your wallet before purchasing.");
      return;
    }

    const totalCost = ethers.utils.parseEther((quantity * pricePerTicket).toString());

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const tx = await signer.sendTransaction({
        to: "0x256ff3b9d3df415a05ba42beb5f186c28e103b2a", // Replace with your smart contract address
        value: totalCost,
      });

      await tx.wait(); // Wait for the transaction to be mined
      alert(`Successfully purchased ${quantity} tickets! Transaction Hash: ${tx.hash}`);
      setError("");
    } catch (err) {
      setError("Transaction failed: " + err.message);
    }
  };

  return (
    <div className="ticket-purchase">
      <h1>Ticket Purchase</h1>

      {!isConnected ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected Wallet: {walletAddress}</p>
      )}

      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
      </label>

      <p>Price per Ticket: {pricePerTicket} AVAX</p>
      <p>Total Cost: {quantity * pricePerTicket} AVAX</p>

      <button onClick={handlePurchase}>Complete Purchase</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}



/***import React, { useState } from "react";

export default function TicketPurchase() {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handlePurchase = () => {
    alert(`Purchasing ${quantity} tickets`);
  };

  return (
    <div className="ticket-purchase">
      <h1>Ticket Purchase</h1>
      <label>
        Quantity:
        <input type="number" value={quantity} onChange={handleQuantityChange} min="1" />
      </label>
      <button onClick={handlePurchase}>Complete Purchase</button>
    </div>
  );
} ***/

