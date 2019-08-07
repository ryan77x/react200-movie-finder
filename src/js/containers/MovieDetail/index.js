import { connect } from 'react-redux';
import MovieDetail from './MovieDetail';

function mapStoreToProps(store) {
  return {
    // cityNameInput: store.search.cityNameInput,
    // weatherData: store.search.weatherData
  };
}

export default connect(mapStoreToProps)(MovieDetail);
