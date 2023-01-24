import React from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { constants } from "../utils/constants";

class NavBar extends React.Component {

    whyhowConnectedContainer = () => {
        return (
            <div className="menu-item-div">
                <Link className="menu-link" to="/"><i className="fa fa-home fa-xl"></i></Link>&nbsp;&nbsp;  |  &nbsp;&nbsp;
                <Link className="menu-link" to="/why"><i className="fa fa-question fa-xl"></i></Link>&nbsp;&nbsp;  |  &nbsp;&nbsp;
                <Link className="menu-link" to="/how"><i className="fa fa-book fa-xl"></i></Link>&nbsp;&nbsp;  |  &nbsp;&nbsp;
                <Link className="menu-link" to="/account"><i className="fa fa-hand-holding-heart fa-xl"></i></Link>
            </div>
        );
    }

    whyhowNotConnectedContainer = () => {
        return (
            <div className="menu-item-div">
                <Link className="menu-link" to="/"><i className="fa fa-home fa-xl"></i></Link>&nbsp;&nbsp;  |  &nbsp;&nbsp;
                <Link className="menu-link" to="/why"><i className="fa fa-question fa-xl"></i></Link>&nbsp;&nbsp;  |  &nbsp;&nbsp;
                <Link className="menu-link" to="/how"><i className="fa fa-book fa-xl"></i></Link>
            </div>
        );
    }

    goToMetaMask () {
        window.location.href='https://metamask.io/';
    }

    notConnectedContainer = () => {
        return (
            <div className="menu-content">
                { this.whyhowNotConnectedContainer() }
                { this.props.hasMetaMask ? (
                    <button onClick={this.props.connectWallet} className="cta-button connect-wallet-button">
                        Connect to MetaMask
                    </button>
                ) : (
                    <button type="button" onClick={this.goToMetaMask} className="cta-button connect-wallet-button">
                        Please install MetaMask
                    </button>
                ) }
                
            </div>
        );
    }

    connectedContainer = () => {
        return (
            <div className="menu-content">
                { this.whyhowConnectedContainer() }
                <br/>
                <Link className="menu-link" to="/buy">
                    <button className="cta-button connect-wallet-button">
                        Buy NFT
                    </button>
                </Link>
            </div>
        );
    }

    connectedWrongChainContainer = () => {
        return (
            <div className="menu-content">
                { this.whyhowNotConnectedContainer() }
                <br/>
                <button onClick={this.props.switchChain} className="cta-button connect-wallet-button">
                        Switch to Polygon
                    </button>
            </div>
        );
    }

    render() {
        console.log("this.props.chainId");
        console.log(this.props.chainId);
        return (
            <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <ul className="navbar-nav ms-md-auto">
                    {this.props.currentAccount ? 
                    (this.props.chainId === constants.CHAIN_ID ? this.connectedContainer() : this.connectedWrongChainContainer()) 
                    : this.notConnectedContainer()}
                </ul>
            </div>
        </nav>
        );
    }
}

NavBar.propTypes = {
    currentAccount: PropTypes.string,
    chainId: PropTypes.string,
    connectWallet: PropTypes.func.isRequired,
    switchChain: PropTypes.func.isRequired,
    hasMetaMask: PropTypes.bool,
}

export default NavBar;