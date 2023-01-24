import React from "react";
import { ethers, BigNumber, utils } from "ethers";
import restInChainNFT from "../utils/RestInChainNFT.json";
import { constants } from "../utils/constants";
import ReactPaginate from 'react-paginate';

class MainContent extends React.Component {
    default_provider = new ethers.providers.JsonRpcProvider({url: constants.CHAIN_RPC});

    constructor(props) {
        super(props);
        this.state = {
            nfts: [],
            nftsToDisplay: [],
            pageCount: 0,
            isLoadData: false,
            isSearching: false,
            nftOfSearch: null,
            selectedPage: 1,
        };
        this.getYardNFT = this.getYardNFT.bind(this);
    }

    componentDidMount() {
        this.getPageCount();
    }

    getPageCount = async () => {
        try {
            this.setState({
                isLoadData: true,
            });
            const { ethereum } = window;
            const provider = (ethereum && ethereum.chainId === utils.hexValue(constants.CHAIN_ID)) ? (new ethers.providers.Web3Provider(ethereum)) : this.default_provider;
            const connectedContract = new ethers.Contract(constants.CONTRACT_ADDRESS, restInChainNFT.abi, provider);

            console.log("get yard NFT");
            let balanceOfYardAddress = await connectedContract.balanceOf(constants.CONTRACT_ADDRESS);
            console.log(balanceOfYardAddress);
            let pageCount = ~~(parseInt(balanceOfYardAddress) / parseInt(constants.OFFSET)) + (balanceOfYardAddress % constants.OFFSET === 0 ? 0 : 1)
            this.setState({
                pageCount: pageCount,
                isLoadData: false
            });
            this.getNFTPage(1);
        } catch (error) {
            console.log(error);
            this.setState({
                nfts: [],
                nftsToDisplay: [],
                isLoadData: false,
            });
        }
    }

    getYardNFT = async (page) => {
        try {
            this.setState({
                isLoadData: true,
            });
            const { ethereum } = window;
            const provider = (ethereum && ethereum.chainId === utils.hexValue(constants.CHAIN_ID)) ? (new ethers.providers.Web3Provider(ethereum)) : this.default_provider;
            const connectedContract = new ethers.Contract(constants.CONTRACT_ADDRESS, restInChainNFT.abi, provider);

            console.log("get yard NFT");
            let idsInNFTState = this.state.nfts.map(function (el) { return BigNumber.from(el.token_id).toString(); });
            let idsToDisplay = await connectedContract.getYardNFTByPage(page, constants.OFFSET);
            console.log('idsInNFTState');
            console.log(idsInNFTState);
            console.log('idsToDisplay');
            console.log(idsToDisplay);
            let idsNotLoaded = idsToDisplay.filter(function(id) {
                return idsInNFTState.indexOf(BigNumber.from(id).toString()) < 0;
            });
            console.log("idsNotLoaded");
            console.log(idsNotLoaded);

            let idsLoaded = idsToDisplay.filter(function(id) {
                return idsInNFTState.indexOf(BigNumber.from(id).toString()) >= 0;
            });
            console.log("idsLoaded");
            console.log(idsLoaded);
            let idsLoadedStr = idsLoaded.map(function (el) { return BigNumber.from(el).toString(); });
            this.setState({
                nftsToDisplay: this.state.nfts.filter(function(nft) {
                    return idsLoadedStr.indexOf(BigNumber.from(nft.token_id).toString()) >= 0;
                })
            });
            console.log('nftsToDisplay');
            console.log(this.state.nftsToDisplay);
            // var data_results = [];
            for (const element of idsNotLoaded) {
                // console.log(BigNumber.from(element).toString());
                let dataURI = await connectedContract.tokenURI(element);
                // 29 = length of "data:application/json;base64,"
                const json = Buffer.from(dataURI.substring(29), "base64").toString();
                const result = JSON.parse(json);
                // data_results.push({
                //     token_id: element,
                //     image: result['image'],
                //     data: result['data']
                // });
                this.setState({
                    nfts: this.state.nfts.concat({
                        token_id: element,
                        image: result['image'],
                        data: result['data']
                    }),
                    nftsToDisplay: this.state.nftsToDisplay.concat({
                        token_id: element,
                        image: result['image'],
                        data: result['data']
                    }),
                });
            }
            this.setState({
                isLoadData: false,
            });
        } catch (error) {
            console.log(error);
            this.setState({
                nfts: [],
                nftsToDisplay: [],
                isLoadData: false,
            });
        }
    }

    searchNFT = async () => {
        try {
            const tokenId = document.getElementById('nft_id').value;
            if (tokenId === "") { return; }
            const token = BigNumber.from(tokenId);
            const { ethereum } = window;
            const provider = (ethereum && ethereum.chainId === utils.hexValue(constants.CHAIN_ID)) ? (new ethers.providers.Web3Provider(ethereum)) : this.default_provider;
            const connectedContract = new ethers.Contract(constants.CONTRACT_ADDRESS, restInChainNFT.abi, provider);

            console.log("get yard NFT");
            let dataURI = await connectedContract.tokenURI(token);
            const json = Buffer.from(dataURI.substring(29), "base64").toString();
            const result = JSON.parse(json);
            this.setState({
                isSearching: true,
                nftOfSearch: {
                    token_id: token,
                    image: result['image'],
                    data: result['data']
                }
            });
        } catch (error) {
            console.log(error);
            this.setState({
                isSearching: true,
                nftOfSearch: null
            });
        }
    }

    handleChangeSearchField = (e) => {
        if (e.target.value === '') {
            this.setState({
                isSearching: false,
                nftOfSearch: null
            });
        } 
    }

    handlePageClick = (data) => {
        console.log('onPageChange', data.selected);
        this.getNFTPage(data.selected + 1);
    };

    getNFTPage = (page) => {
        console.log('go get Data', page);
        this.setState({
            selectedPage: page,
        });
        this.getYardNFT(page);
    }

    render() {
        return (
            <div>
                <div className="header-container">
                    <p className="header gradient-text">Rest in Chain</p>
                    <p className="sub-text">
                        For Name, Soul, and Mind.<br />Stay in Blockchain, Forever.
                    </p>
                    
                </div>
                <div className="search-container">
                    <div className="search-row">
                        <div className="search-div">
                            <div className="input-group rounded">
                                <input type="search" id="nft_id" onChange={this.handleChangeSearchField} data-clear-btn="true" className="form-control rounded" placeholder="Find the number" aria-label="Search" aria-describedby="search-addon" />
                                <span className="input-group-text border-0" id="search-addon">
                                    <a className="edit-link" href="# " onClick={this.searchNFT}><i className="fas fa-search"></i></a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="body-container">
                    {!this.state.isSearching && (
                    <div className="memory-card">
                        <div className="row row-cols-1 row-cols-md-5 g-4">
                            {this.state.nftsToDisplay.map(item => (
                                <div className="col" key={item.token_id}>
                                    <div className="card .h-100">
                                        <img className="card-img-top" alt="" src={item.image} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    )}
                    {this.state.isSearching && this.state.nftOfSearch && (
                        <div className="memory-card-search">
                            <div className="row row-cols-1 row-cols-md-1 g-4">
                                <div className="col">
                                        <div className="card .h-100">
                                            <img className="card-img-top" alt="" src={this.state.nftOfSearch.image} />
                                        </div>
                                    </div>
                            </div>
                        </div>
                    )}
                    {this.state.isSearching && !this.state.nftOfSearch && (
                        <div className="memory-card-search">
                            <div className="row row-cols-1 row-cols-md-1 g-4">
                                <p className="sub-sub-text">Not Found</p>
                            </div>
                        </div>
                    )}
                    {this.state.pageCount > 0 && !this.state.isSearching && (
                        <div className="pagination-div">
                            <ReactPaginate
                                nextLabel=">"
                                onPageChange={this.handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={3}
                                pageCount={this.state.pageCount}
                                previousLabel="<"
                                pageClassName={this.state.isLoadData ? "page-item disabled" : "page-item"}
                                pageLinkClassName="page-link"
                                previousClassName={this.state.isLoadData ? "page-item disabled" : "page-item"}
                                previousLinkClassName="page-link"
                                nextClassName={this.state.isLoadData ? "page-item disabled" : "page-item"}
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName={this.state.isLoadData ? "page-item disabled" : "page-item"}
                                breakLinkClassName="page-link"
                                containerClassName={this.state.isLoadData ? "c-pagination-none" : "c-pagination"}
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                                forcePage={this.state.selectedPage-1}
                            />
                        </div>
                    )}
                </div>
            
            </div>
        );
    }
}


export default MainContent;