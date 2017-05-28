import React, { Component } from "react";
import firebase from "firebase";

import "../css/play.css";
import spinnerImage from "../images/spinner-green.png";

export default class Play extends Component {
    constructor() {
        super();
        this.state = {
            localSpinnerCount: 0,
            serverSpinnerCount: 0,
            spinnerSpeed: 0,
            speedTimer: -1
        };
        this.clickSpinner = this.updateSpinner.bind(this, 1);
        this.sendSpinner = this.sendSpinner.bind(this);
    }

    componentWillMount() {
        firebase.database().ref("spinners").on("value", snapshot => {
            this.setState({
                serverSpinnerCount: snapshot.val()[0].spinnerCount
            });
        });

        setInterval(() => {
            if (this.state.localSpinnerCount > 0) sendSpinner();
        }, 5000);
    }

    updateSpinner(count) {
        let { spinnerSpeed, localSpinnerCount, speedTimer } = this.state;
        const newSpeed = spinnerSpeed < 2 ? spinnerSpeed + 1 : spinnerSpeed;
        this.setState({
            localSpinnerCount: localSpinnerCount + count,
            spinnerSpeed: newSpeed
        });
        if (speedTimer === -1) {
            console.log("true");
            let newTimer = (speedTimer = setInterval(() => {
                console.log("tick");
                if (this.state.spinnerSpeed > 0)
                    this.setState({
                        spinnerSpeed: this.state.spinnerSpeed - 1
                    });
                else {
                    clearInterval(this.state.speedTimer);
                    this.setState({ speedTimer: -1 });
                }
            }, 4000));
            this.setState({ speedTimer: newTimer });
            console.log(speedTimer);
        }
    }
    sendSpinner() {
        firebase.database().ref("spinners/0").set({
            spinnerCount: this.state.serverSpinnerCount +
                this.state.localSpinnerCount
        });
        this.setState({ localSpinnerCount: 0 });
    }

    render() {
        return (
            <div className="spinner-wrapper">
                <div className="spinner-header">
                    <div>
                        <img
                            className={
                                "spinner-image spinner-speed-" +
                                    this.state.spinnerSpeed
                            }
                            alt="fidget spinner"
                            src={spinnerImage}
                            onClick={this.clickSpinner}
                            draggable="false"
                        />

                        <p>
                            Your spinner count: {this.state.localSpinnerCount}
                        </p>
                        <p>
                            Server spinner count:
                            {" "}
                            {this.state.serverSpinnerCount}
                        </p>
                    </div>
                    // <button onClick={this.sendSpinner}>Send spinners</button>
                </div>
            </div>
        );
    }
}
