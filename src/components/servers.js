import React, { Component } from "react";
import firebase from "firebase";

import "../css/server.css";

export default class Servers extends Component {
    constructor(props) {
        super(props);
        this.state = { servers: [], collapsed: true };
        this.toggleServerPanel = this.toggleServerPanel.bind(this);
    }

    componentWillMount() {
        firebase.database().ref("servers").on("value", snapshot => {
            this.setState({ servers: snapshot.val() });
        });
    }

    toggleServerPanel() {
        this.setState({ collapsed: !this.state.collapsed });
    }

    render() {
        const { collapsed } = this.state;
        console.log(collapsed);
        const serverClass = collapsed ? "collapsed" : "";
        return (
            <div className={"servers " + serverClass}>
                <button
                    className="btnShowServer"
                    onClick={this.toggleServerPanel}
                >
                    {collapsed ? "+" : "-"}
                </button>
                <ul>
                    {this.state.servers.map((s, id) => {
                        return (
                            <li key={id}>
                                <div>
                                    Server name: {s.name}
                                    <br />
                                    Player count: {s.playerCount}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
