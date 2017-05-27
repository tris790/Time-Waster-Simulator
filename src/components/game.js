import React, { Component } from "react";
import firebase from "firebase";

import Servers from "./servers";
import Play from "./play";

export default class Game extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        var config = {
            apiKey: "AIzaSyC5LJ6acjmAsQaPKUVEBqFcCpaBWN8VJUg",
            authDomain: "time-waster-7a029.firebaseapp.com",
            databaseURL: "https://time-waster-7a029.firebaseio.com",
            projectId: "time-waster-7a029",
            storageBucket: "time-waster-7a029.appspot.com",
            messagingSenderId: "446879182601"
        };
        firebase.initializeApp(config);
    }
    render() {
        return (
            <div>
                <Servers />
                <Play />
            </div>
        );
    }
}
