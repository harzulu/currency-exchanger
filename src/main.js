import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { Currency } from './js/currency.js';

function exchangeAmmount(before, conversion) {
  return before * conversion;
}

function getElements(response, conversionCurrency, usdAmount) {
  if (response.result === "success") {
    let conversionNumber = response.conversion_rates[conversionCurrency];
    $("#result1").html(exchangeAmmount(usdAmount, conversionNumber));
  } else {
    $("#result2").html(`There was an error: ${response['error-type']}`);
  }
}

async function apiCall(conversionCurrency, usdAmount) {
  const response = await Currency.getCurrency();
  getElements(response, conversionCurrency, usdAmount);
}

$("#submit").submit(function(event) {
  event.preventDefault();
  const usdAmount = $("#currency").val();
  const currency = $("convertTo").val();
  apiCall(currency, usdAmount);
});