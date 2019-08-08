import axios from 'axios';

export function updateSearchInput(input) {
    return {
      type: 'UPDATE_SEARCH_INPUT',
      payload: { input }
    };
}
  
export function search(input) {
  let url = '/api/movie_data/?s=' + input;
  let notFound = null;
  
  return {
    type: 'GET_MOVIE',
    payload: axios.get(url).then(res=>{
        let data = res.data;

        if (data.Response === 'False'){
          notFound = true;
          return {data: {}, input, notFound};
        }
        else{
          notFound = false;
          return {data: data, input, notFound};
        }
      }).catch(error => {
        console.log(error);  
        notFound = true;
        return {data: {}, input, notFound};
      })
  };
}
  
  