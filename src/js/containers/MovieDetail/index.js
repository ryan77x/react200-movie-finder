import { connect } from 'react-redux';
import MovieDetail from './MovieDetail';

function mapStoreToProps(store) {
  return {
    movieData: store.movieSearch.movieData,
    notFound: store.movieSearch.notFound
  };
}

export default connect(mapStoreToProps)(MovieDetail);
