const baseUrl = 'https://restcountries.com';
const endPoint = '/v2/name/';

export function fetchCountry(searchQuery) {
    const url = baseUrl + endPoint + searchQuery;
    return fetch(url)
        .then(response => {
            return response.json()
        })
};