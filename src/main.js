import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { Currency } from './js/currency.js';

function getElements(response) {
  if (response.result === "success") {
    console.log("Success!");
    $("#result1").html(`Your currency in EUR is: ${response.conversion_rates.EUR}`);
  } else {
    console.log(response);
    $("#result2").html(`There was an error: ${response['error-type']}`);
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