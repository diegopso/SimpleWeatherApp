export const $http = {
  updateHeaders: (headers) => {
    return Object.assign({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }, headers);
  },
  get: (url, headers={}) => {
    return fetch(url, {
      method: 'GET',
      headers: $http.updateHeaders(headers)
    }).then(res => res.json());
  },
  post: (url, data, headers) => {
    return fetch(url, {
      method: 'POST',
      headers: $http.updateHeaders(headers),
      body: JSON.stringify(data),
    }).then(res => res.json());
  }
}