const apiKey = require('./../.env').apiKey;

$(document).ready(function(){
  $("#symptom-form").submit(function(event){
    event.preventDefault();
    let query = $("#symptom-input").val();
    $.get(`https://api.betterdoctor.com/2016-03-01/doctors?query=${query}&location=or-portland&user_key=${apiKey}`).then(function(response) {
      if(response.data.length == 0){
        $('#blah').text(`No doctors found for your search of ${query}, please retry search!`);
      }else{
        $('#blah').text(`First doc is ${response.data[0].practices[0].name}`);
        let docInfoString = "";
        for(let i in response.data){
          docInfoString += `<li>
                              <ul>
                                <li>Doctor Name: ${response.data[i].profile.first_name} ${response.data[i].profile.last_name} ${response.data[i].profile.title}</li>
                                <li>Specialty: ${response.data[i].specialties[0].name}</li>
                              </ul>
                            </li>`;
        }
        $('#doc-list').html(docInfoString);
      }
    }).fail(function(error) {
      $('#blah').text(error.responseText);
    });
  });
});
