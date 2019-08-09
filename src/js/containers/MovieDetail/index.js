import { connect } from 'react-redux';
import MovieDetail from './MovieDetail';

function mapStoreToProps(store) {
  return {
    movieID: store.movieDetail.movieID,
    movieData: store.movieDetail.movieData,
    notFound: store.movieDetail.notFound
  };
}

export default connect(mapStoreToProps)(MovieDetail);
