//searchQuery
import countryTp from '../partials/country.hbs';
import debounce from 'debounce';


const refs = {
    main: document.querySelector('main'),
    input: document.querySelector('#input'),

}

refs.input.addEventListener('input', debounce((e) => {
   console.log(e.target.value);
  }, 500)
);


function fetchCountries() {
    //return fetch(`https://restcountries.com/v2/name/${searchQuery}`)
    return fetch(`https://restcountries.com/v2/name/peru`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const markap = countryTp(data[0]);
            console.log(markap);
            refs.main.insertAdjacentHTML('beforeend', markap);
        })
        .catch(error => {
            console.log(error);
        });
    }

fetchCountries();

