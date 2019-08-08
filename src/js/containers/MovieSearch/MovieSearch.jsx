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
    const { userInput, movieData, notFound } = this.props;

    let display = null;

    if (notFound === null){
      display = <div></div>
    }
    else if (notFound){
      display = <div>No movies found.</div>
    }
    else {
      display =
        movieData.Search.map(movie => {
          let temp = null;
          let src = '/#/movie/' + movie.imdbID;

          if (movie.Poster === 'N/A'){ temp = <div>Movie poster is not available</div>; } 
          else if (!movie.Poster.includes('https')){ temp = <img src={movie.Poster.replace('http', 'https')} alt={movie.Title}/>; }
          else{ temp = <img src={movie.Poster} alt={movie.Title}/>; }

          return <div className="card" key={ movie.id }>
                    <div className="card-body">
                      <div className='row'>
                        <div className='col-md-4 mb-4'>
                          { temp }
                        </div>
                        <div className='col-md-8 mb-4'>
                          <div className='row'>
                            <div className='col-md-12 mb-4'>
                              <div><strong>{movie.Title}</strong></div>
                              <div>{movie.Year}</div>
                              <hr/>
                              <div>{movie.Plot}</div>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-md-12 mb-4'>
                              <a href={src} className="btn btn-primary float-right" role="button" name="moreInfoButton">More Information</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>    
        });
    }            
    

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
          <div className='col-md-12 mb-4'>
            {display}
          </div>
        </div>
      </div>
    );
  }
}
