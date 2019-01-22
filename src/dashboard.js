/* eslint-disable max-len */
/* eslint-disable no-param-reassign */

import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import image from './star.jpg';
import './dashboard.css';
import './login.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        
        this.onChange = this.onChange.bind(this);
        this.success = this.success.bind(this);
        this.logout = this.logout.bind(this);
        this.getMyList = this.getMyList.bind(this);

        this.state = {
            list: [],
            table: false,
            planet: '',
        };
    }

    onChange({ target }) {
        this.setState({ [target.name]: target.value, table: true });
        axios.get(`https://swapi.co/api/planets/?search=${target.value}`).then(this.success);
    }

    getMyList() {
        let result = null;

        if (this.state.list.length > 0) {
            result = this.state.list.map((item, index) => {
                const size = (20 / (index + 1)) + 15;
                return (
                    <table key={index}>
                        <tbody>
                            <tr>
                                <td style={{ fontSize: size }} >{item.name}</td>
                                <td style={{ fontSize: size }}>{item.population}</td>
                            </tr>
                        </tbody>

                    </table>
                );
            })
        }

        return result;
    }

    logout() {
        this.props.history.push('/');
    }

    success(response) {
        const dataarray = [];

        if (response.data.count === 0) {
            swal({
                type: 'warning',
                text: 'Planet doesnt exist!'
            });
        } else {
            response.data.results.forEach(element => {
                if (element.population === 'unknown') {
                    element.population = '0';
                }

                const item = {
                    name: element.name,
                    population: element.population
                };
                dataarray.push(item);
            });

            dataarray.sort((a, b) => a.population - b.population);
            dataarray.reverse();
            this.setState({ list: dataarray });
        }
    }

    render() {
        const list = this.getMyList();

        return (
            <div>
                <header>
                    <nav>
                        <ul id="nav_bar">
                            <span style={{ fontFamily: 'bold', fontSize: '25px' }}>
                                Welcome {this.props.email}!
                             </span>
                            <span style={{ float: 'right' }}>
                                <input
                                    type="button"
                                    value="Log Out"
                                    id="google_search"
                                    onClick={this.logout}
                                />
                            </span>
                        </ul>
                    </nav>
                </header>
                <div className="google">
                    <h2 id="google_logo">List Of Planets!!</h2>
                    <a href="" id="google_logo">
                        <img src={image} alt="google-logo_zpspkcztsjo.png" />
                    </a>
                </div>
                <div className="form">
                    <div style={{ marginTop: '-95%', marginLeft: '100%', width: '100%' }}>
                        <label htmlFor="form-search" />
                        <input
                            type="text"
                            id="form-search"
                            name="planet"
                            placeholder="Enter Planets"
                            onChange={this.onChange}
                            value={this.state.planet}
                        />
                        <br />
                        <table style={this.state.table ? { width: '100%' } : { display: 'none' }} >
                            <tbody>
                                <tr>
                                    <th style={{ fontSize: '40px' }}>Name</th>
                                    <th style={{ fontSize: '40px' }}>Population</th>
                                </tr>
                            </tbody>
                        </table>
                        {list}
                    </div>
                </div>
            </div>
        );
    }
}
export default Dashboard;
