const apiKey = require('./../.env').apiKey;

$(document).ready(function(event){
  $("#symptom-form")
  $.get(`https://api.betterdoctor.com/2016-03-01/doctors?query=anxiety&location=or-portland&user_key=${apiKey}`).then(function(response) {
    $('#blah').text(`First doc is ${response.data[0].practices[0].name}`);
    let i;
    for(i in response.data){
      $('#doc-list').append(`<li>${response.data[i].profile.first_name}</li>`);
    }
  }).fail(function(error) {
    $('#blah').text(`NOOOOOOO`);
  });

});
