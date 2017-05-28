import React, { Component } from "react";
import firebase from "firebase";

import "../css/upgrade.css";

export default class Upgrade extends Component {
    constructor() {
        super();
        this.state = { upgrades: [] };
    }

    componentDidMount() {
        firebase.database().ref("upgrades").on("value", snapshot => {
            this.setState({ upgrades: snapshot.val() });
        });
    }

    purchaseUpgrade(id) {
        const { name, bought } = this.state.upgrades[id];
        firebase.database().ref("upgrades/" + id).set({
            name,
            bought: !bought
        });
    }

    render() {
        return (
            <div className="upgrade-wrapper">
                <ul className="upgrade-hotbar">
                    {this.state.upgrades.map((u, id) => {
                        console.log(id);
                        return (
                            <li key={id}>
                                <button
                                    className={
                                        u.bought
                                            ? "btn-upgrade btn-sell"
                                            : "btn-upgrade btn-buy"
                                    }
                                    onClick={() => this.purchaseUpgrade(id)}
                                >
                                    {u.name}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
