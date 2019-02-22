import apiClient from '../apiClient';

export const searchRequest = () => ({
  type: 'SEARCH_REQUEST'
});

export const searchSuccess = (result) => ({
  type: 'SEARCH_SUCCESS', result
});

export const searchFailure = (error) => ({
  type: 'SEARCH_FAILURE', error
});

export function search(title) {
  return (dispatch) => {
    dispatch(searchRequest());

    apiClient.query(title)
      .then(response => {
        dispatch(searchSuccess(response.data))
      })
      .catch(error => {
        dispatch(searchFailure(error.response.data))
      });
  }
}