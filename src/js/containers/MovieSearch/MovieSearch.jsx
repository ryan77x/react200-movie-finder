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
    this.handlePageNumberClick = this.handlePageNumberClick.bind(this);
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

  handlePageNumberClick(pageNumber) {
    const { userInput, dispatch } = this.props;

    if (userInput.trim() !== ''){
      dispatch(search(userInput + '&page=' + String(pageNumber)));
    }
  }

  render() {
    const { userInput, movieData, notFound } = this.props;

    let movieList = <div></div>
    let pageList = <div></div>

    if (notFound === null){
      movieList = <div></div>
    }
    else if (notFound){
      movieList = <div id="movie-not-found">No movies found.</div>
    }
    else {
      movieList =
        movieData.Search.map(movie => {
          let temp = null;
          let src = '/#/movie/' + movie.imdbID;

          if (movie.Poster === 'N/A'){ temp = <div>Movie poster is not available</div>; } 
          else if (!movie.Poster.includes('https')){ temp = <img src={movie.Poster.replace('http', 'https')} alt={movie.Title}/>; }
          else{ temp = <img src={movie.Poster} alt={movie.Title}/>; }

          return  <div>
                    <div className="card" key={ movie.id }>
                      <div className="card-body">
                        <div className='row'>
                          <div className='col-md-4 mb-4'>
                            { temp }
                          </div>
                          <div className='col-md-8 mb-4'>
                            <div className='row'>
                              <div id="movie-search-body" className='col-md-12 mb-4'>
                                <div><strong>{movie.Title}</strong></div>
                                <div>{movie.Year}</div>
                                <hr/>
                                <div>{movie.Plot}</div>
                              </div>
                            </div>
                            <div className='row'>
                              <div className='col-md-12 mb-4'>
                                <a href={src} className="btn more-info-btn-color float-right" role="button" id="more-info-button">More Information</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>  
                    <br/>
                  </div> 
        });

      let totalResults = Number(movieData.totalResults);
      let totalPage = 1;

      if (totalResults > 10){
        totalPage = Math.trunc(totalResults/10);
        if (totalResults % 10 != 0)
          totalPage++; 
      }

      if (totalPage != 1){
        let pageArray = [];

        for (let i=1; i<=totalPage; i++){
          pageArray.push(i);
        }

        pageList = pageArray.map(pageNumber => {
          return <span>
                  <button 
                    type="button" 
                    onClick={ () => this.handlePageNumberClick(pageNumber) }>{ pageNumber }
                  </button>
                </span>
        });
      }
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
          id="search-input"
          placeholder='Movie search examples: "star war" or "superman"'
          value={ userInput }
          onChange={ this.handleSearchInput }
          onKeyPress={ this.handleKeyPress }
          />
        <div className="input-group-append">
          <button 
            className="btn go-btn-border-color search-text"
            id="go-button" 
            type="button" 
            onClick={ this.handleGoButton } >Go!
          </button>  
        </div>
      </div> 

        <div className='row'>
          <div className='col-md-12 mb-4'>
            {movieList}
          </div>
        </div>

        <div className='row'>
          <div className='col-md-12 mb-4'>
            {pageList}
          </div>
        </div>
      </div>
    );
  }
}
