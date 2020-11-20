import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { Currency } from './js/currency.js';

function getElements(response) {
  if (response.main) {
    $("#result").html(`Your currency in EUR is: ${response.conversion_rates.EUR}`);
  } else {
    console.log(response);
    $("#result").html(`There was an error: ${response}`);
  }
}

async function apiCall() {
  const response = await Currency.getCurrency();
  getElements(response);
}

$("#submit").submit(function(event) {
  event.preventDefault();
  apiCall();
});