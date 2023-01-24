import React from "react";
import step1 from '../assets/step1.png';
import step2 from '../assets/step2.png';
import step3 from '../assets/step3.png';
import step4 from '../assets/step4.png';
import step5 from '../assets/step5.png';
import step6 from '../assets/step6.png';
import step7 from '../assets/step7.png';
import step8 from '../assets/step8.png';
import step9 from '../assets/step9.png';

class HowContent extends React.Component {
    render() {
        return (
            <div>
                <div className="header-container">
                    <p className="header gradient-text">How to use</p>
                </div>
                <br/>
                <center>
                    <div className="memory-card">
                        <div className="card-img">
                            <div className="card-guide text-white bg-dark mb-3">
                                <div className="card-header">Connect with MetaMask and switch to Polygon Mainnet</div>
                                <div className="card-body">
                                <img alt="" src={step1} className="rounded mx-auto d-block img-custom"/>
                                </div>
                            </div>
                        </div>
                        <div className="card-img">
                            <div className="card-guide text-white bg-dark mb-3">
                                <div className="card-header">Menu: HomePage <i className="fa fa-home"></i>, Q&A <i className="fa fa-question"></i>, How-to-use <i className="fa fa-book"></i>, MyAccount <i className="fa fa-hand-holding-heart"></i>, Button BuyNFT</div>
                                <div className="card-body">
                                <img alt="" src={step2} className="rounded mx-auto d-block img-custom-near"/>
                                </div>
                            </div>
                        </div>
                        <div className="card-img">
                            <div className="card-guide text-white bg-dark mb-3">
                                <div className="card-header">Enter the name, the year, the memory and purchase</div>
                                <div className="card-body">
                                <img alt="" src={step3} className="rounded mx-auto d-block img-custom-full"/>
                                </div>
                            </div>
                        </div>
                        <div className="card-img">
                            <div className="card-guide text-white bg-dark mb-3">
                                <div className="card-header">MyAccount Section contains the purchased NFT(s)</div>
                                <div className="card-body">
                                <img alt="" src={step4} className="rounded mx-auto d-block img-custom-full"/>
                                </div>
                            </div>
                        </div>
                        <div className="card-img">
                            <div className="card-guide text-white bg-dark mb-3">
                                <div className="card-header">Update NFT Information</div>
                                <div className="card-body">
                                <img alt="" src={step5} className="rounded mx-auto d-block img-custom-near"/>
                                </div>
                            </div>
                        </div>
                        <div className="card-img">
                            <div className="card-guide text-white bg-dark mb-3">
                                <div className="card-header">Transfer NFT to another Polygon wallet</div>
                                <div className="card-body">
                                <img alt="" src={step6} className="rounded mx-auto d-block img-custom-near"/>
                                </div>
                            </div>
                        </div>
                        <div className="card-img">
                            <div className="card-guide text-white bg-dark mb-3">
                                <div className="card-header">Send to Yard</div>
                                <div className="card-body">
                                <img alt="" src={step7} className="rounded mx-auto d-block img-custom-near"/>
                                </div>
                            </div>
                        </div>
                        <div className="card-img">
                            <div className="card-guide text-white bg-dark mb-3">
                                <div className="card-header">Sent-to-Yard-NFT on HomePage</div>
                                <div className="card-body">
                                <img alt="" src={step8} className="rounded mx-auto d-block img-custom-near"/>
                                </div>
                            </div>
                        </div>
                        <div className="card-img">
                            <div className="card-guide text-white bg-dark mb-3">
                                <div className="card-header">Search & Visit by Number</div>
                                <div className="card-body">
                                <img alt="" src={step9} className="rounded mx-auto d-block img-custom-near"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </center>
            </div>
        );
    }
}


export default HowContent;