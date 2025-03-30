import React, { createContext, useState, useEffect } from 'react';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                setIsConnected(true);
            } catch (error) {
                console.error("Error connecting to wallet:", error);
            }
        } else {
            console.error("Ethereum wallet not found");
        }
    };

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                setAccount(accounts[0]);
            });
        }
    }, []);

    return (
        <Web3Context.Provider value={{ account, isConnected, connectWallet }}>
            {children}
        </Web3Context.Provider>
    );
};