import React, { Component } from "react";
import firebase from "firebase";

import "../css/play.css";

export default class Play extends Component {
    constructor() {
        super();
        this.state = { localCookieCount: 0, serverCookieCount: 0 };
        this.addCookie = this.updateCookie.bind(this, 1);
        this.sendCookie = this.sendCookie.bind(this);
    }

    componentWillMount() {
        firebase.database().ref("cookies").on("value", snapshot => {
            this.setState({ serverCookieCount: snapshot.val()[1].cookieCount });
        });
    }

    updateCookie(count) {
        this.setState({
            localCookieCount: this.state.localCookieCount + count
        });
    }
    sendCookie() {
        firebase.database().ref("cookies/1").set({
            cookieCount: this.state.serverCookieCount +
                this.state.localCookieCount
        });
        this.state.localCookieCount = 0;
    }

    render() {
        return (
            <div className="cookie-wrapper">
                <div className="cookie-header">
                    <img
                        className="cookie-image"
                        alt="cookie"
                        src="http://www.greatamericancookies.com/app/themes/greatamericancookies/library/images/home/carousel1.png"
                        onClick={this.addCookie}
                    />
                    <p>Your cookie count: {this.state.localCookieCount}</p>
                    <p>Server cookie count: {this.state.serverCookieCount}</p>
                    <button onClick={this.sendCookie}>Send cookies</button>
                </div>
            </div>
        );
    }
}
