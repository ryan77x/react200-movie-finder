import React from 'react';

import {
  updateSearchInput,
  search
} from './movieSearchActions';

export default class MovieSearch extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.handleGoButton = this.handleGoButton.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSearchInput(event) {
    const { dispatch } = this.props;
    const { value } = event.target;
    dispatch(updateSearchInput(value));
  }

  handleGoButton() {
    const { userInput, dispatch } = this.props;

    if (userInput.trim() !== ''){
      dispatch(search(userInput));
    }
  }

  handleKeyPress(event) {
    if(event.key === 'Enter'){
      const { userInput, dispatch } = this.props;

      if (userInput.trim() !== ''){
        dispatch(search(userInput));
      }
    }
  }
  
  render() {
    const { userInput, movieData } = this.props;

    return (
      <div className='container'>
        <div>
          <br/>
          <h1 className='text-center'>Movie Finder</h1>
          <br/>
        </div>

        <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control search-text" 
          placeholder='Movie search examples: "star war" or "superman"'
          value={ userInput }
          onChange={ this.handleSearchInput }
          onKeyPress={ this.handleKeyPress }
          />
        <div className="input-group-append">
          <button 
            className="btn go-btn-border-color search-text" 
            type="button" 
            onClick={ this.handleGoButton } >Go!
          </button>  
        </div>
      </div> 

        <div className='row'>
          <div className='col-12 col-md-12 mb-4'>
 
          </div>
        </div>
      </div>
    );
  }
}
