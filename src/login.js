/* eslint-disable max-len */
import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import image from './starwar.jpg';
import './login.css';


class Login extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.success = this.success.bind(this);
        this.submit = this.submit.bind(this);

        this.state = {
            email: '',
            password: '',
        };
    }

    onChange({ target }) {
        this.setState({ [target.name]: target.value });
    }

    success(response) {
        if (response.data.count === 0) {
            swal({
                type: 'warning',
                text: 'User doesnt exist!'
            });
        } else {
            const { email, password } = this.state;

            response.data.results.forEach(element => {
                if (element.name === email && element.birth_year === password) {
                    this.props.history.push('/dashboard');
                } else if (element.name === email && element.birth_year !== password) {
                    swal({
                        type: 'warning',
                        text: 'Password doesnt match!'
                    });
                } else if (element.name !== email) {
                    swal({
                        type: 'warning',
                        text: 'User doesnt exist!'
                    });
                }
            });
        }
    }

    submit() {
        this.props.setParentState(this.state.email);
        axios.get(`https://swapi.co/api/people/?search=${this.state.email}`).then(this.success);
    }

    render() {
        return (
            <div className="wrapper">
                <div className="inner">
                    <div className="login-form" >
                        <p className="login-text">
                            <span className="fa-stack fa-lg">
                                <img src={image} role="presentation" style={{ borderRadius: '50%', marginTop: '-500%', marginLeft: '-200%', height: '280%' }} />
                            </span>
                        </p>

                        <input
                            type="email"
                            name="email"
                            className="login-username"
                            autoFocus
                            required
                            placeholder="Email"
                            onChange={this.onChange}
                            value={this.state.email}
                        />
                        <input
                            type="password"
                            name="password"
                            className="login-password"
                            required
                            placeholder="Password"
                            onChange={this.onChange}
                            value={this.state.password}
                        />
                        <input
                            type="button"
                            name="Login"
                            value="Login"
                            className="login-submit"
                            onClick={this.submit}
                            role="button"
                        />
                    </div>
                    <div className="underlay-photo" />
                    <div className="underlay-black" />
                </div>
            </div>

        );
    }
}

export default Login;
