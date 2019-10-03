import React from 'react';

import {
  getMovieDetail
} from './movieDetailActions';

class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const { match, dispatch } = this.props;
    let movieID = match.params.id;

    if (movieID.trim() !== ''){
      dispatch(getMovieDetail(movieID));
    }  
  }

  render() {
    const { movieData, notFound } = this.props;
    let display = null;

    if (notFound === null){
      display = <div></div>
    }
    else if (notFound){
      display = <div id="movie-detail-not-found">No movie detail found.</div>
    }
    else {
          let movie = movieData;
          let temp = null;

          if (movie.Poster === 'N/A'){ temp = <div>Movie poster is not available</div>; } 
          else if (!movie.Poster.includes('https')){ temp = <img src={movie.Poster.replace('http', 'https')} alt={movie.Title}/>; }
          else{ temp = <img src={movie.Poster} alt={movie.Title}/>; }

          display = <div className="row">
                      <div className="col-md-4" >
                        { temp }
                      </div>
                      <div className="col-md-8" >
                        <div className='card card-border-color mb-3'>
                          <div id="movie-detail-header" className='card-header card-header-color card-text'>Movie Details</div>
                          <div id="movie-detail-body" className="card-body">
                            <p id="movie-title"><strong>{movie.Title}</strong></p>
                            <div className='row'>
                              <div className='col-md-4 mb-4 text-center movie-detail-text-color'>
                                <p id="movie-release-year" className="round-corners">Released { movie.Year } </p>
                              </div>
                              <div className='col-md-2 mb-4 text-center movie-detail-text-color'>
                               <p id="movie-runtime" className="round-corners">{ movie.Runtime } </p>
                              </div>
                              <div className='col-md-6 mb-4 text-center movie-detail-text-color'>
                               <p id="movie-genre" className="round-corners">{ movie.Genre } </p>
                              </div>
                            </div>
                            <p id="movie-plot">{movie.Plot}</p>
                            <p id="movie-award">{movie.Awards}</p>
                            <p><strong id="movie-metascore">Metascore: </strong>{movie.Metascore}<br/><strong id="movie-imdb-rating">IMDB Rating: </strong>{movie.imdbRating}</p>
                          </div>
                        </div>
                      </div>
                    </div>
    }            

    return (
      <div className='container'>
        <div>
          <br/>
          <h1 className='text-center'>Movie Finder</h1>
          <br/>
        </div>
   
        <div className="input-group-append">
          <p><a href="/#" className="btn btn-link float-right" role="button" id="go-back">Go Back</a></p> 
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

export default MovieDetail;