const fetch = require('node-fetch');

module.exports.handleApiCall = async endpoint => {
  const request = await fetch(endpoint);
  const response = await request.json();
  return response;
};
