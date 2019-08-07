// import axios from 'axios';

// export function updateSearchInput(input) {
//     return {
//       type: 'UPDATE_SEARCH_INPUT',
//       payload: { input }
//     };
//   }
  
//   export function search(input) {
//     let url = '/api/weather_data/?q=' + input;
//     let notFound = null;
    
//     return {
//       type: 'GET_WEATHER',
//       payload: axios.get(url).then(res=>{
//           notFound = false;
//           return {data: res.data, input, notFound};
//         }).catch(error => {
//           console.log(error);  
//           notFound = true;
//           return {data: {}, input, notFound};
//         })
//     };
//   }
  
  