import apiClient from '../apiClient';

export const searchRequest = () => ({
  type: 'SEARCH_REQUEST'
});

export const searchSuccess = (result) => ({
  type: 'SEARCH_SUCCESS', result
});

export const searchFailure = (errorResponse) => ({
  type: 'SEARCH_FAILURE', error: errorResponse
})

export function search(title) {
  return (dispatch) => {
    dispatch(searchRequest());

    apiClient.query(
      title, 
      (result) => dispatch(searchSuccess(result)),
      (error) => dispatch(searchFailure(error.response))
    )
  }
}