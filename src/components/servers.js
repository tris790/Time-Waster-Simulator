import React, { Component } from "react";
import firebase from "firebase";

export default class Servers extends Component {
    constructor(props) {
        super(props);
        this.state = { servers: [] };
    }

    componentWillMount() {
        firebase.database().ref("servers").on("value", snapshot => {
            this.setState({ servers: snapshot.val() });
        });
    }

    render() {
        return (
            <ol>
                {this.state.servers.map((s, id) => {
                    console.log(s);
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
            </ol>
        );
    }
}
