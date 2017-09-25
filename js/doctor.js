
const apiKey = require('./../.env').apiKey;

export let Doctor = {

  doctorList: (query, displayDocList, displayError) => { $.get(`https://api.betterdoctor.com/2016-03-01/doctors?query=${query}&location=or-portland&user_key=${apiKey}`).then(function(response) {
      displayDocList(response);
    }).fail(function(error) {
      displayError(error);
    });
  },

  doctorsByName: (name, displayDocsByName, displayError) => {
    $.get(`https://api.betterdoctor.com/2016-03-01/doctors?last_name=${query}&location=or-portland&user_key=${apiKey}`).then(function(response) {
      displayDocsByName(response);
    }).fail(function(error) {
      displayError(error);
    });
  },

  doctorDetails: (uid, displayDocDetails, displayError) => {
    $.get(`https://api.betterdoctor.com/2016-03-01/doctors/${uid}?user_key=${apiKey}`).then(function(response) {
      displayDocDetails(response);
    }).fail(function(error) {
      displayError(error);
    });
  }

};
