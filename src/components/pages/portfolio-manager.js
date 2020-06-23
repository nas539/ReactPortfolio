import React, { Component } from 'react';
import axios from 'axios';

import PortfolioSidebarList from '../Portfolio/portfolio-sidebar-list';
import PortfolioForm from '../Portfolio/portfolio-form';


export default class PortfolioManger extends Component {
  constructor() {
    super();

    this.state = {
      portfolioiItems: []
    }

    this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
  } 

  handleSuccessfulFormSubmission(portfolioItem) {

  }
  
  handleFormSubmissionError(error) {
    console.log("Error", error)
  }
  getPortfolioItems() {
    axios.get("https://nicholasasharp.devcamp.space/portfolio/portfolio_items", { 
      withCredentials: true
    }).then(response => {
      this.setState({
        portfolioiItems: [...response.data.portfolio_items]
      })
    }).catch(error => {
      console.log("error in getting portfolio item", error)
    })
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
        return (
            <div className="portfolio-manager-wrapper">
            <div className="left-column">
              <PortfolioForm 
                handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
                handleFormSubmissionError={this.handleFormSubmissionError}
              />
            </div>
          
            <div className="right-column">
              <PortfolioSidebarList 
                data={this.state.portfolioiItems} />
            </div>
          </div>
        )
    }
}