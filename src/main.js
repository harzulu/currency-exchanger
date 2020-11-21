import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { Currency } from './js/currency.js';

function exchangeAmmount(ammount, conversionFrom, conversionTo) {
  let usdVal = ammount / conversionFrom;
  return conversionTo * usdVal;
}

function getElements(response, convertTo, amount, convertFrom) {
  if (response.result === "success") {
    let conversionFrom = response.conversion_rates[convertFrom];
    let conversionTo = response.conversion_rates[convertTo];
    if (typeof conversionFrom === 'number' && typeof conversionTo === 'number') {
      $("#result1").html(exchangeAmmount(amount, conversionFrom, conversionTo));
    } else {
      $("#result1").html("Your entered currency is invalid...");
    }
  } else {
    $("#result2").html(`There was an error: ${response['error-type']}`);
  }
}

async function apiCall(convertTo, amount, convertFrom) {
  const response = await Currency.getCurrency();
  getElements(response, convertTo, amount, convertFrom);
}

$("#submit").submit(function(event) {
  event.preventDefault();
  const amount = $("#ammount").val();
  const convertFrom = $("#convertFrom").val();
  const convertTo = $("#convertTo").val();
  apiCall(convertTo, amount, convertFrom);
  $("#currency").html(convertTo);
});