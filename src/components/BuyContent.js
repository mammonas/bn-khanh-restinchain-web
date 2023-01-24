import React from "react";
import { ethers } from "ethers";
import restInChainNFT from "../utils/RestInChainNFT.json";
import { Link } from "react-router-dom";
import { constants } from "../utils/constants";

class BuyContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: '',
            memory: [],
            purchaseState: 'not_buy',
            is_name_good: false,
            is_year_good: false,
            is_memory_good: true,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleChangeMemory = this.handleChangeMemory.bind(this);
    }

    buyNFT = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                this.setState({
                    purchaseState: 'buying'
                });
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedContract = new ethers.Contract(constants.CONTRACT_ADDRESS, restInChainNFT.abi, signer);
        
                console.log("Ask wallet...");
                const priceToBuy = await connectedContract.price();
                console.log("Price: ", priceToBuy);
                    // let options = {value: ethers.utils.parseEther("0.1")}
                let options = {value: priceToBuy};
                let nftTxn = await connectedContract.buyNFT(this.state.name, this.state.date, this.state.memory, options);
        
                console.log("Mining...");
                await nftTxn.wait();
        
                console.log(`Mined, see transaction: https://rinkeby.etherscan.io//tx/${nftTxn.hash}`);
                this.setState({
                    purchaseState: 'success',
                    name: '',
                    date: '',
                    memory: [],
                    is_name_good: false,
                    is_year_good: false,
                    is_memory_good: true,
                });
            }
            else {
                console.log("Not found MetaMask");
                this.setState({
                    purchaseState: 'not_buy'
                });
            }
          } catch (error) {
            console.log(error);
            this.setState({
                purchaseState: 'buy_failed'
            });
          }
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.name);
        console.log(this.state.date);
        console.log(this.state.memory);
        if (this.state.name !== '' && this.state.date !== '' && this.state.memory !== []) {
            this.buyNFT()
        }
    }

    handleChangeName = (e) => {
        this.setState({
            name: e.target.value,
            is_name_good: e.target.value.trim() === ''
        });
    }
    handleChangeDate = (e) => {
        this.setState({
            date: e.target.value,
            is_year_good: e.target.value.trim() === ''
        });
    }
    handleChangeMemory = (e) => {
        const lines = e.target.value.trim().split("\n");
        var results = [];
        var is_good = true;
        console.log(lines);
        if (lines.length > 4) {
            is_good = false;
        }
        else {
            for (let i = 0; i < lines.length; i++) {
                console.log(lines[i]);
                if (lines[i].length > 30) {
                    is_good = false;
                    break;
                }
            }
            results = lines;
        }
        console.log(is_good);
        this.setState({
            memory: results,
            is_memory_good: is_good
        });
    }

    render() {
        return(
            <div className="header-container">
                <p className="header gradient-text">Buy NFT Slot</p>
                <p className="sub-text">
                    Please fill all information
                </p>
                
                <center>
                {/* eslint-disable jsx-a11y/no-redundant-roles */}
                <form role="form" onSubmit={this.handleSubmit}>
                    <p><input type="text" value={this.state.name} onChange={this.handleChangeName} id="nameTxt" className="form-control" placeholder="Name to memorize" maxLength="18" required/></p>
                    <p><input type="text" value={this.state.date} onChange={this.handleChangeDate} id="dateTxt" className="form-control" placeholder="Date e.g. 1900-2022" maxLength="36" required/></p>
                    <p><textarea onChange={this.handleChangeMemory} className="form-control" cols="30" wrap="hard" rows="4" placeholder="Some memorized memories...&#10;(Max 4 lines, 30 characters each lines.)" maxLength="121" required></textarea></p>
                    {!this.state.is_memory_good && (
                        <p className="white-text">Please enter max 4 lines and max 30 characters each line.</p>
                    )}
                    {this.state.purchaseState === 'buying' ?
                        (
                            <button className="cta-button connect-wallet-button" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                &nbsp;&nbsp;Processing...
                            </button>
                        ):
                        (<button type="submit" className="cta-button connect-wallet-button">
                            Purchase
                        </button>)
                    }
                    {this.state.purchaseState === 'success' && (
                        <p className="success-text">
                            Purchased Success, you can see your NFT on <Link className="menu-link" to="/account">/account</Link>
                        </p>
                    )}
                </form>
                </center>
                
            </div>
        );
    }
}


export default BuyContent;