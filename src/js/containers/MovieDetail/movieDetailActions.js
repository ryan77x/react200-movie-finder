import axios from 'axios';

export function getMovieDetail(movieID) {
    let url = '/api/movie/?i=' + movieID;
    let notFound = null;

    return {
        type: 'GET_MOVIE_DETAIL',
        payload: axios.get(url).then(res=>{
            let data = res.data;

            if (data.Response === 'False'){
              notFound = true;
              return {data: {}, movieID, notFound};
            }
            else{
              notFound = false;
              return {data: data, movieID, notFound};
            }
        }).catch(error => {
            console.log(error);  
            notFound = true;
            return {data: {}, movieID, notFound};
        })
    };
}
  
  