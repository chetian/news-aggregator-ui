import React, {Component} from 'react'
import {NewsComponent} from './components';
// import {mockData} from '../mockData/mockData'

export default class NewsApp extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }

    componentDidMount() {
        this.fetchAPI();
    }

    async fetchAPI() {
        let response = await fetch('http://localhost:3000/api/v1/news');
        let data = await response.json();
        console.log("/GET: ", data);
        this.setState({data: data});
        this.fetchAPI();
    }

    render() {
        return (
            <NewsComponent data={this.state.data} />
        )
    }
}