//searchQuery
import countryTp from '../partials/country.hbs';
import debounce from 'debounce';
import refs from './refs.js';
import countryListTP from '../partials/countryList.hbs';

const {main, input, countryList} = refs;


input.addEventListener('input', debounce((e) => {
    console.log(e.target.value);
    action(e.target.value);
  }, 500)
);



function action(countryes) {
    fetchCountry(countryes)
        .then(result => {
             if (result.length === 1) {
                 console.log(result);
              return  renderCountry(result);
            }
            if (result.length < 10) {
               return renderList(result);
            }
            return console.log(`значение ${result.length}`);
        })
        .catch(error => console.log(error));
    
};


function renderList(countries) {
    // if (countryList) {
    //     countryList.innerHTML('');
    // };
    console.log(countries);
    const markap = countryListTP(countries);
    console.log(markap);
    input.insertAdjacentHTML('afterend', markap);
 };


function fetchCountry(searchQuery) {
    return fetch(`https://restcountries.com/v2/name/${searchQuery}`)
        .then(response => {
            return response.json()
        });
};

function renderCountry(country) {
    const markap = countryTp(country[0]);
    main.insertAdjacentHTML('beforeend', markap);
 };