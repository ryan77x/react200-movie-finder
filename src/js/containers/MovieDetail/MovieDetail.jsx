import React from 'react';

class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { movieData, notFound } = this.props;
    const movies = movieData.Search;
    let index = movies.findIndex(movie => movie.imdbID === this.props.match.params.id);
    let display = null;

    if (notFound === null){
      display = <div></div>
    }
    else if (notFound){
      display = <div>No movie detail found.</div>
    }
    else {
          let movie = movies[index];
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
                          <div className='card-header card-header-color card-text'>Movie Details</div>
                          <div className="card-body">
                            <div>{movie.Title}</div>
                            <div>{movie.Year}</div>
                            <div>{movie.Plot}</div>
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
          <a href="/#" className="btn btn-link float-right" role="button" name="moreInfoButton">Go Back</a> 
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