import './styles/App.css';
import mourningLogo from './assets/black-ribbon.png';
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from "./components/NavBar";
import MainContent from "./components/MainContent";
import WhyContent from "./components/WhyHowContent";
import HowContent from "./components/HowContent";
import AccountContent from "./components/AccountContent";
import BuyContent from "./components/BuyContent";
import { constants } from './utils/constants';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.connectWallet = this.connectWallet.bind(this);
        this.checkIsWalletConnected = this.checkIsWalletConnected.bind(this);
        this.state = { currentAccount: null, chainId: null, hasMetaMask: true };
    }

    componentDidMount() {
        this.checkIsWalletConnected();
    }

    checkIsWalletConnected = async () => {
        const { ethereum } = window;
        if (!ethereum) {
            this.setState({
                currentAccount: null,
                chainId: null,
                hasMetaMask: false
            });
            console.log("Please install MetaMask");
            return;
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length !== 0 && this.props.currentAccount !== accounts[0]) {
            const chainId = await ethereum.request({ method: 'eth_chainId' });
            this.setState({
                currentAccount: accounts[0],
                chainId: chainId
            });
        }
        else {
            this.setState({
                currentAccount: null,
                chainId: null
            });
        }


    };

    connectWallet = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                alert("Please get MetaMask!");
                this.setState({
                    hasMetaMask: false,
                });
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            console.log("Get account here :D");
            console.log(accounts[0]);
            const chainId = await ethereum.request({ method: 'eth_chainId' });
            this.setState({
                currentAccount: accounts[0],
                chainId: chainId,
                hasMetaMask: true,
            });
        } catch (error) {
            console.log(error);
            alert("Error connect wallet");
            this.setState({
                hasMetaMask: false,
            });
        }
    }

    switchChain = async () => {
        const { ethereum } = window;
        if (!ethereum) {
            alert("Please get MetaMask!");
            return;
        }
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: constants.CHAIN_ID }],
            });
            this.setState({
                chainId: constants.CHAIN_ID
            });
        } catch (switchError) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: constants.CHAIN_ID,
                                chainName: constants.CHAIN_NAME,
                                rpcUrls: [constants.CHAIN_RPC],
                                nativeCurrency: constants.NATIVE_TOKEN,
                                blockExplorerUrls: [constants.CHAIN_SCAN]
                            },
                        ],
                    });
                    this.switchChain();
                } catch (addError) {
                    console.log(addError);
                }
            }
        }
    }
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <NavBar hasMetaMask={this.state.hasMetaMask} currentAccount={this.state.currentAccount} chainId={this.state.chainId} switchChain={this.switchChain} connectWallet={this.connectWallet} />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<MainContent />} />
                            <Route path="/why" element={<WhyContent />} />
                            <Route path="/how" element={<HowContent />} />
                            <Route path="/account" element={<AccountContent />} />
                            <Route path="/buy" element={<BuyContent />} />
                        </Routes>
                        <br /><br />
                        <div className="footer-container">
                            <img alt="mourning" className="mourning-logo" src={mourningLogo} />
                            <a
                                className="footer-text"
                                href='# '
                                target="_blank"
                                rel="noreferrer"
                            >built with love</a>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
