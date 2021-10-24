import {fetchCountry} from './fetchCountries.js';
import refs from './refs.js';
import debounce from 'debounce';
import countryTp from '../partials/country.hbs';
import countryListTP from '../partials/countryList.hbs';
import allert from 'sweetalert'

const { input, countryRender} = refs;

//сулушатель input
input.addEventListener('input', debounce((e) => {
    console.log(e.target.value);
    action(e.target.value);
  }, 500)
);
// запрос на сервер 
function action(countryes) {
    fetchCountry(countryes)
        .then(result => {
            if (result.length === 1) {
                clean();
                return renderCountry(result);
            };
            if (result.length < 10) {
                return renderList(result);
            };
            if (result.status === 404) {
                return error()
            };     
            if (result.length > 0) {
                return warning(result.length)
            };     
            return error();
        })
        .catch(error => console.log(error))   
};
//чистит input
function clean() {
    input.value = '';
};
// рисует список стран 
function renderList(countries) {
    const markap = countryListTP(countries);
    countryRender.innerHTML = markap;

    const countryList = document.querySelector('.country__list');
    countryList.addEventListener('click', (value) => {
        action(value.target.textContent);
        clean();
    });
};
//рисует детальную информацию о стане
function renderCountry(country) {
    const markap = countryTp(country[0]);
    countryRender.innerHTML = markap;
};
// обработчики ошибок
 function warning(value) {
  allert({
    title: `${value} was found`,
    text: "Too many matches found. Please enter a more specific query",
    button: false,
    timer: 5000
  })
}
 function error() {
  allert({
    title: "Oops",
    text: "Nothing is found",
    button: false,
    className: "error",
    timer: 2500
  })
}