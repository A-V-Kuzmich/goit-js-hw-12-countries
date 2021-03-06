import { error } from './renderCountries.js';

const baseUrl = 'https://restcountries.com';
const endPoint = '/v2/name/';

export function fetchCountry(searchQuery) {
    const url = baseUrl + endPoint + searchQuery;
    return fetch(url)
        .then(response => {
            if (response.status === 404) {
                return error(response.status);
            };  
            return response.json()
        })
};