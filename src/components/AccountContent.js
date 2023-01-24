import React from "react";
import { ethers, BigNumber } from "ethers";
import restInChainNFT from "../utils/RestInChainNFT.json";
import { constants } from "../utils/constants";

class AccountContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nfts: [],
            currentAccount: null,
            showEditModal: false,
            editData: null,
            updatingStatus: 'not_update',
            showTransferModal: false,
            transferData: null,
            transferStatus: 'not_transfer',
            showBurnModal: false,
            burnData: null,
            burnStatus: 'not_transfer'
        };
        this.checkIsWalletConnected = this.checkIsWalletConnected.bind(this);
        this.getNFT = this.getNFT.bind(this);
        this.showEditModal = this.showEditModal.bind(this);
        this.hideEditModal = this.hideEditModal.bind(this);
        this.submitEditData = this.submitEditData.bind(this);
        this.showTransferModal = this.showTransferModal.bind(this);
        this.hideTransferModal = this.hideTransferModal.bind(this);
        this.submitTransferData = this.submitTransferData.bind(this);
        this.showBurnModal = this.showBurnModal.bind(this);
        this.hideBurnModal = this.hideBurnModal.bind(this);
        this.submitBurnData = this.submitBurnData.bind(this);
    }

    checkIsWalletConnected = async () => {
        const { ethereum } = window;
        if (!ethereum) {
            this.setState({
                currentAccount: null
            });
            console.log("Please install MetaMask");
            return;
        }

        const accounts = await ethereum.request({ method: 'eth_accounts' });
        if (accounts.length !== 0 && this.props.currentAccount !== accounts[0]) {
            this.setState({
                currentAccount: accounts[0]
            });
            this.getNFT();
        }
        else {
            this.setState({
                currentAccount: null
            });
        }
    };

    getNFT = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
              const provider = new ethers.providers.Web3Provider(ethereum);
              const signer = provider.getSigner();
              const connectedContract = new ethers.Contract(constants.CONTRACT_ADDRESS, restInChainNFT.abi, signer);
      
              console.log("get NFT");
              let nftTxn = await connectedContract.getAllNFT(this.state.currentAccount);
      
              console.log("getting...");
              console.log(nftTxn);
              var data_results = [];
              for (const element of nftTxn) {
                let dataURI = await connectedContract.tokenURI(element);
                // 29 = length of "data:application/json;base64,"
                const json = Buffer.from(dataURI.substring(29), "base64").toString();
                const result = JSON.parse(json);
                data_results.push({
                    'token_id': element,
                    'image': result['image'],
                    'data': result['data']
                });
                this.setState({
                    nfts: data_results
                });
              }
              console.log(this.state.nfts);
            }
            else {
              console.log("Not found MetaMask");
            }
          } catch (error) {
            console.log(error);
            this.setState({
                purchaseState: 'buy_failed'
            });
            // alert("Error while purchasing");
          }
    }

    updateNFT = async (itemId, name, year, memory) => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                this.setState({
                    updatingStatus: 'updating'
                });
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedContract = new ethers.Contract(constants.CONTRACT_ADDRESS, restInChainNFT.abi, signer);
        
                let nftTxn = await connectedContract.updateNFTData(itemId, name, year, memory);
        
                console.log("Updating...");
                await nftTxn.wait();

                this.updateLocalNFT(itemId);
        
                console.log(`Updated, see transaction: https://rinkeby.etherscan.io//tx/${nftTxn.hash}`);
            }
            else {
              console.log("Not found MetaMask");
            }
          } catch (error) {
            console.log(error);
            this.setState({
                updatingStatus: 'not_update'
            });
          }
    }

    updateLocalNFT = (itemId) => {
        console.log(itemId);
        var filtered = this.state.nfts.filter(function(value) {
            console.log(value);
            const tokenIdBig = BigNumber.from(value['token_id']);
            const itemIdBig = BigNumber.from(itemId);
            return !tokenIdBig.eq(itemIdBig);
        });
        console.log("filtered");
        console.log(filtered);
        this.setState({
            nfts: filtered
        });
        this.addSingleNFT(itemId);
    }

    addSingleNFT = async (token_id) => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedContract = new ethers.Contract(constants.CONTRACT_ADDRESS, restInChainNFT.abi, signer);
        
                console.log("getting single NFT..");
                let dataURI = await connectedContract.tokenURI(token_id);
                // 29 = length of "data:application/json;base64,"
                const json = Buffer.from(dataURI.substring(29), "base64").toString();
                const result = JSON.parse(json);
                var data_results = this.state.nfts.slice();
                data_results.push({
                    'token_id': BigNumber.from(token_id),
                    'image': result['image'],
                    'data': result['data']
                });
                this.setState({
                    nfts: data_results,
                    updatingStatus: 'success'
                });
                console.log("New nfts");
                console.log(this.state.nfts)
                // this.hideEditModal();
            }
            else {
              console.log("Not found MetaMask");
            }
          } catch (error) {
            console.log(error);
            this.setState({
                updatingStatus: 'not_update'
            });
            // alert("Error while purchasing");
          }
    }

    showEditModal = (event) => {
        const item = JSON.parse(event.currentTarget.getAttribute('data-item'));
        this.setState({
            showEditModal: true,
            editData: item
        });
    }

    hideEditModal = () => {
        this.setState({
            showEditModal: false,
            editData: null,
            updatingStatus: 'not_update'
        });
    }

    submitEditData = () => {
        console.log("Now edit");
        const name = document.getElementById('nameTxt').value;
        const year = document.getElementById('yearTxt').value;
        const memory = document.getElementById('memoryTxt').value;
        console.log(name);
        console.log(year);
        console.log(memory);
        if (name.trim() !== '' && year.trim() !== '' && memory.trim() !== '') {
            const memories = memory.trim().split("\n");
            if (memories.length > 0) {
                this.updateNFT(this.state.editData['token_id'], name, year, memories);
            }
        }
    }

    editModel = () => {
        const showHideClassName = this.state.showEditModal ? "modal display-block" : "modal display-none";
        var result = '';
        if (this.state.editData) {
            const lines = this.state.editData['data']['memory'].trim().split("||");
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].trim() !== '') {
                    result += lines[i];
                    result += (i === (lines.length-1)) ? '' : '\n';
                }
            }
        }
        
        return (
            <div className={showHideClassName} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header text-center">
                        {this.state.updatingStatus === 'success' ? 
                            (<h5 className="modal-title w-100"><p className="success-text-inform"><i className="fa fa-check icon-custom"></i>&nbsp;&nbsp;Updated Success</p></h5>) :
                            (<h5 className="modal-title w-100"><p>Update Information</p></h5>)
                        }
                    </div>
                    <div className="modal-body text-center">
                        {this.state.editData && (
                            <div className="edit-content">
                                <p><input type="text" defaultValue={this.state.editData['data']['name']} id="nameTxt" className="form-control-edit" placeholder="Name to memorize" maxLength="18" required/></p>
                                <p><input type="text" defaultValue={this.state.editData['data']['year']} id="yearTxt" className="form-control-edit" placeholder="Date e.g. 1900-2022" maxLength="36" required/></p>
                                <p><textarea id="memoryTxt" defaultValue={result} className="form-control-edit" cols="30" wrap="hard" rows="4" placeholder="Lived, Laughed, Loved." maxLength="121" required></textarea></p>
                                <p>(Max 4 lines, 30 characters each lines.)</p>
                            </div>
                        )}
                        
                    </div>
                    {this.state.updatingStatus === 'updating' ?
                    (<div className="modal-footer">
                        <button className="cta-button connect-wallet-button" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                &nbsp;&nbsp;Saving...
                        </button>
                    </div>) :
                    (<div className="modal-footer">
                        <button type="button" className="cta-second-button" data-dismiss="modal" onClick={this.hideEditModal}>Close</button>
                        <button type="button" className="cta-button connect-wallet-button" onClick={this.submitEditData}>Save changes</button>
                    </div>)
                    }
                    </div>
                </div>
            </div>
        );
    }

    showTransferModal = (event) => {
        const item = JSON.parse(event.currentTarget.getAttribute('data-item'));
        this.setState({
            showTransferModal: true,
            transferData: item
        });
    }

    hideTransferModal = () => {
        this.setState({
            showTransferModal: false,
            transferData: null,
            transferStatus: 'not_transfer'
        });
    }

    transferModel = () => {
        const showHideClassName = this.state.showTransferModal ? "modal display-block" : "modal display-none";
        return (
            <div className={showHideClassName} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header text-center">
                        {this.state.transferStatus === 'success' ? 
                            (<h5 className="modal-title w-100"><p className="success-text-inform"><i className="fa fa-check icon-custom"></i>&nbsp;&nbsp;Transfered Success</p></h5>) :
                            (<h5 className="modal-title w-100"><p>Transfer NFT</p></h5>)
                        }
                    </div>
                    <div className="modal-body text-left">
                        {this.state.transferData && (
                            <div className="edit-content">
                                <p>Transfer NFT '{this.state.transferData['data']['name']}' to</p>
                                <p><input type="text" id="newAddressTxt" className="form-control-transfer" placeholder="Address to transfer" maxLength="69" required/></p>
                            </div>
                        )}
                        
                    </div>
                    {this.state.transferStatus === 'transfering' ?
                    (<div className="modal-footer">
                        <button className="cta-button connect-wallet-button" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                &nbsp;&nbsp;Sending...
                        </button>
                    </div>) :
                    (<div className="modal-footer">
                        <button type="button" className="cta-second-button" data-dismiss="modal" onClick={this.hideTransferModal}>Close</button>
                        {this.state.transferStatus !== 'success' && (
                            <button type="button" className="cta-button connect-wallet-button" onClick={this.submitTransferData}>Send</button>
                        )}
                    </div>)
                    }
                    </div>
                </div>
            </div>
        );
    }

    submitTransferData = () => {
        console.log("Now transfer");
        const address = document.getElementById('newAddressTxt').value;
        console.log(address);
        if (address !== '') {
            this.transferNFT(this.state.transferData['token_id'], address);
        }
    }

    transferNFT = async (itemId, address) => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                this.setState({
                    transferStatus: 'transfering'
                });
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedContract = new ethers.Contract(constants.CONTRACT_ADDRESS, restInChainNFT.abi, signer);
        
                let nftTxn = await connectedContract.transferToNewAddress(address, itemId);
        
                console.log("Transfering...");
                await nftTxn.wait();

                this.removeLocalNFT(itemId);
        
                console.log(`Transfered, see transaction: https://rinkeby.etherscan.io//tx/${nftTxn.hash}`);
            }
            else {
              console.log("Not found MetaMask");
            }
          } catch (error) {
            console.log(error);
            this.setState({
                transferStatus: 'not_transfer'
            });
          }
    }

    removeLocalNFT = (itemId) => {
        console.log(itemId);
        var filtered = this.state.nfts.filter(function(value) {
            console.log(value);
            const tokenIdBig = BigNumber.from(value['token_id']);
            const itemIdBig = BigNumber.from(itemId);
            return !tokenIdBig.eq(itemIdBig);
        });
        console.log("filtered");
        console.log(filtered);
        this.setState({
            nfts: filtered,
            transferStatus: 'success',
            burnStatus: 'success'
        });
    }

    showBurnModal = (event) => {
        const item = JSON.parse(event.currentTarget.getAttribute('data-item'));
        this.setState({
            showBurnModal: true,
            burnData: item
        });
    }

    hideBurnModal = () => {
        this.setState({
            showBurnModal: false,
            burnData: null,
            burnStatus: 'not_burn'
        });
    }

    burnModel = () => {
        const showHideClassName = this.state.showBurnModal ? "modal display-block" : "modal display-none";
        return (
            <div className={showHideClassName} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header text-center">
                        {this.state.burnStatus === 'success' ? 
                            (<h5 className="modal-title w-100"><p className="success-text-inform"><i className="fa fa-check icon-custom"></i>&nbsp;&nbsp;Sent Success</p></h5>) :
                            (<h5 className="modal-title w-100"><p>Send to Yard</p></h5>)
                        }
                    </div>
                    <div className="modal-body text-left">
                        {this.state.burnData && (
                            <div className="edit-content">
                                <p>Send NFT '{this.state.burnData['data']['name']}' to yard.<br/>
                                After sending, this information will appear on homepage or search result.<br/>
                                Nobody, including you, can update or own this NFT again, please consider.<br/>
                                Please remember this number to search again on yard list: <b>{BigNumber.from(this.state.burnData['token_id']).toLocaleString()}</b></p>
                            </div>
                        )}
                        
                    </div>
                    {this.state.burnStatus === 'burning' ?
                    (<div className="modal-footer">
                        <button className="cta-button connect-wallet-button" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                &nbsp;&nbsp;Sending...
                        </button>
                    </div>) :
                    (<div className="modal-footer">
                        <button type="button" className="cta-second-button" data-dismiss="modal" onClick={this.hideBurnModal}>Close</button>
                        {this.state.burnStatus !== 'success' && (
                            <button type="button" className="cta-button connect-wallet-button" onClick={this.submitBurnData}>Goodbye...</button>
                        )}
                    </div>)
                    }
                    </div>
                </div>
            </div>
        );
    }

    submitBurnData = () => {
        console.log("Now burn");
        this.burnNFT(this.state.burnData['token_id']);
    }

    burnNFT = async (itemId) => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                this.setState({
                    burnStatus: 'burning'
                });
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const connectedContract = new ethers.Contract(constants.CONTRACT_ADDRESS, restInChainNFT.abi, signer);
        
                let nftTxn = await connectedContract.sendToYard(itemId);
        
                console.log("Burning...");
                await nftTxn.wait();

                this.removeLocalNFT(itemId);
        
                console.log(`Burned, see transaction: https://rinkeby.etherscan.io//tx/${nftTxn.hash}`);
            }
            else {
              console.log("Not found MetaMask");
            }
          } catch (error) {
            console.log(error);
            this.setState({
                burnStatus: 'not_burn'
            });
          }
    }

    componentDidMount() {
        this.checkIsWalletConnected();
    }

    render() {
        return(
            <div className="header-container">
                {this.editModel()}
                {this.transferModel()}
                {this.burnModel()}
                <p className="header gradient-text">My Memory</p>
                <p className="sub-text">
                    For the love...
                </p>
                <div className="memory-card">
                    <div className="row row-cols-1 row-cols-md-4 g-4">
                        {this.state.nfts.map(item => (
                            <div className="col" key={item['token_id']}>
                                <div className="card .h-100">
                                    <img className="card-img-top" alt="" src={item['image']} />
                                    <div className="card-body">
                                    <a className="edit-link" href="# " onClick={this.showBurnModal} data-item={JSON.stringify(item)}><i className="fas fa-cross fa-2x"></i></a>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <a className="edit-link" href="# " onClick={this.showTransferModal} data-item={JSON.stringify(item)}><i className="fas fa-exchange fa-2x"></i></a>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <a className="edit-link" href="# " onClick={this.showEditModal} data-item={JSON.stringify(item)}><i className="fas fa-edit fa-2x"></i></a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}


export default AccountContent;