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
            <div>
                <p>Your cookie count: {this.state.localCookieCount}</p>
                <p>Server cookie count: {this.state.serverCookieCount}</p>
                <img
                    className="cookie"
                    alt="cookie"
                    src="https://www.getupandgobaked.com/wp-content/uploads/2015/03/smart-cookie-pic-copy.jpg"
                    onClick={this.addCookie}
                />
                <button onClick={this.sendCookie}>Send cookies</button>
            </div>
        );
    }
}
