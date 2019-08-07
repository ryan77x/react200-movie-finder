import { connect } from 'react-redux';
import MovieSearch from './MovieSearch';

function mapStoreToProps(store) {
  return {
    userInput: store.movieSearch.userInput,
    movieData: store.movieSearch.movieData
  };
}

export default connect(mapStoreToProps)(MovieSearch);
