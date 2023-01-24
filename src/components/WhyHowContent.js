import React from "react";
import { constants } from "../utils/constants";
import { Link } from 'react-router-dom';

class WhyHowContent extends React.Component {
    render() {
        return (
            <div>
                <div className="header-container">
                    <p className="header gradient-text">Why & How</p>
                </div>
                <br/>
                <center>
                    <div className="w-75">
                        <div className="accordion">
                            <div data-mdb-toggle="collapse" aria-expanded="false"
                                aria-controls="largeAnswer1collapse" className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <div className="row w-100">
                                        <div className="col-1 text-center d-flex align-items-center"><i
                                            className="fab fa-servicestack me-2 fa-3x icon-custom"></i></div>
                                        <div className="col-10-custom">
                                            <h5 className="my-2">Why this service?</h5>
                                            <p className="mb-1">
                                                We just want to create a place where you can put the memory of your love one(s) to blockchain.
                                                <br/>And that memory stays there, forever!
                                            </p>
                                        </div>
                                    </div>
                                </div>


                            </div>
                            <div data-mdb-toggle="collapse" aria-expanded="false"
                                aria-controls="largeAnswer2collapse" className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <div className="row w-100">
                                        <div className="col-1 text-center d-flex align-items-center"><i
                                            className="fas fa-link me-2 fa-3x icon-custom"></i></div>
                                        <div className="col-10-custom">
                                            <h5 className="my-2">How can it be on blockchain?</h5>
                                            <p className="mb-1">
                                                It is an NFT to save the information like name, date, letters...
                                                <br/> That NFT belongs to your wallet address and stays on Polygon chain.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-mdb-toggle="collapse" aria-expanded="false"
                                aria-controls="largeAnswer3collapse" className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <div className="row w-100">
                                        <div className="col-1 text-center d-flex align-items-center"><i
                                            className="fas fa-money-bill me-2 fa-3x icon-custom"></i></div>
                                        <div className="col-10-custom">
                                            <h5 className="my-2">How much does it cost?</h5>
                                            <p className="mb-1">
                                                One NFT is {constants.PRICE} MATIC.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-mdb-toggle="collapse" aria-expanded="false"
                                aria-controls="largeAnswer3collapse" className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <div className="row w-100">
                                        <div className="col-1 text-center d-flex align-items-center"><i
                                            className="fas fa-cloud-download me-2 fa-3x icon-custom"></i></div>
                                        <div className="col-10-custom">
                                            <h5 className="my-2">But what will happen if this website goes down?</h5>
                                            <p className="mb-1">
                                                NFTs do not stay here but are on Blockchain, this website is just a place to display that data.
                                                <br/> You can always get your NFT and data on <a className="footer-text" href={"https://polygonscan.com/address/" + constants.CONTRACT_ADDRESS} target="_blank" rel="noreferrer">polyscan.com</a> whenever you want.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-mdb-toggle="collapse" aria-expanded="false"
                                aria-controls="largeAnswer3collapse" className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <div className="row w-100">
                                        <div className="col-1 text-center d-flex align-items-center"><i
                                            className="fas fa-highlighter me-2 fa-3x icon-custom"></i></div>
                                        <div className="col-10-custom">
                                            <h5 className="my-2">Can I change information after purchasing?</h5>
                                            <p className="mb-1">
                                                Yes, you can change any information at anytime you want, 
                                                <br/> or transfer NFT to whoever you want with a small transaction fee on Polygon network.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-mdb-toggle="collapse" aria-expanded="false"
                                aria-controls="largeAnswer3collapse" className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <div className="row w-100">
                                        <div className="col-1 text-center d-flex align-items-center"><i
                                            className="fas fa-ribbon me-2 fa-3x icon-custom"></i></div>
                                        <div className="col-10-custom">
                                            <h5 className="my-2">What are the NFTs on HomePage</h5>
                                            <p className="mb-1">
                                                Once you bought an NFT, it will available on your wallet and can access on "MyAccount" section,<br/>you can edit it or transfer to another wallet.
                                                <br/> If you send an NFT to Yard, it stays there forever, nobody (also you) can update the information.
                                                <br/> You can only see that NFT by searching by Id.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-mdb-toggle="collapse" aria-expanded="false"
                                aria-controls="largeAnswer3collapse" className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <div className="row w-100">
                                        <div className="col-1 text-center d-flex align-items-center"><i
                                            className="fas fa-info-circle me-2 fa-3x icon-custom"></i></div>
                                        <div className="col-10-custom">
                                            <h5 className="my-2">Any guide how to buy</h5>
                                            <p className="mb-1">
                                                Yes, I made <Link className="menu-link" to="/how">some screenshots here</Link>, you can see.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-mdb-toggle="collapse" aria-expanded="false"
                                aria-controls="largeAnswer3collapse" className="list-group-item list-group-item-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <div className="row w-100">
                                        <div className="col-1 text-center d-flex align-items-center"><i
                                            className="fas fa-envelope me-2 fa-3x icon-custom"></i></div>
                                        <div className="col-10-custom">
                                            <h5 className="my-2">How can I contact to you?</h5>
                                            <p className="mb-1">
                                                You can send email to <a className="footer-text" href="mailto:hi@restinchain.com">hi@restinchain.com</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </center>
            </div>
        );
    }
}


export default WhyHowContent;