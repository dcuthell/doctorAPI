const apiKey = require('./../.env').apiKey;

$(document).ready(function(){

  $("#symptom-form").submit(function(event){
    event.preventDefault();
    let query = $("#symptom-input").val();
    $.get(`https://api.betterdoctor.com/2016-03-01/doctors?query=${query}&location=or-portland&user_key=${apiKey}`).then(function(response) {
      if(response.data.length == 0){
        $('#result-header').text(`No doctors found for your search of ${query}, please retry search!`);
      }else{
        $('#result-header').text(`Your search for ${query} has the following results`);
        let docInfoString = "";
        for(let i in response.data){
          docInfoString += `<li>
                              <ul>
                                <li>Doctor Name: ${response.data[i].profile.first_name} ${response.data[i].profile.last_name} ${response.data[i].profile.title}</li>
                                <li>Specialty: ${response.data[i].specialties[0].name}</li>
                                <button type="button" id="${response.data[i].uid}" class="btn btn-info doc-button">Details</button>
                              </ul>
                            </li>`;
        }
        $('#doc-list').html(docInfoString);
      }
    }).fail(function(error) {
      $('#result-header').text(error.responseText);
    });
  });

  $("#name-form").submit(function(event){
    event.preventDefault();
    let hiDoc = function(){
      alert("hello doctor");
    };
    let query = $("#name-input").val();
    $.get(`https://api.betterdoctor.com/2016-03-01/doctors?last_name=${query}&location=or-portland&user_key=${apiKey}`).then(function(response) {
      if(response.data.length == 0){
        $('#result-header').text(`No doctors found for your search of ${query}, please retry search!`);
      }else{
        $('#result-header').text(`Your search for ${query} has the following results`);
        let docInfoString = "";
        for(let i in response.data){
          docInfoString += `<li>
                              <ul>
                                <li>Doctor Name: ${response.data[i].profile.first_name} ${response.data[i].profile.last_name} ${response.data[i].profile.title}</li>
                                <li>Specialty: ${response.data[i].specialties[0].name}</li>
                                <button type="button" id="${response.data[i].uid}" class="btn btn-info doc-button">Details</button>
                              </ul>
                            </li>`;
        }
        $('#doc-list').html(docInfoString);
      }
    }).fail(function(error) {
      $('#result-header').text(error.responseText);
    });
  });

  $('#doc-list').on('click', '.doc-button', function() {
    let uid = $(this).attr('id');
    $("#doc-list").hide();
    $("#details-list").show();
    $.get(`https://api.betterdoctor.com/2016-03-01/doctors/${uid}?user_key=${apiKey}`).then(function(response) {
      $('#result-header').text(`Here is some more detailed information on ${response.data.profile.first_name} ${response.data.profile.last_name}`);
      let docInfoString = `<li>Doctor Name: ${response.data.profile.first_name} ${response.data.profile.last_name} ${response.data.profile.title}</li>
                            <li>Specialty: ${response.data.specialties[0].name}</li>`;
      for(let i in response.data.practices){
        if(i > 0){
          if(response.data.practices[i].name == response.data.practices[i-1].name){
            continue;
          }
        }
        let phone = "";
        for(let j in response.data.practices[i].phones){
          if(response.data.practices[i].phones[j].type == "landline"){
            phone = response.data.practices[i].phones[j].number;
          }
        }
        let suite = '';
        if(response.data.practices[i].visit_address.street2 != null){
          suite = response.data.practices[i].visit_address.street2;
        }
        docInfoString += `<li>
                            <ul>
                              <li>Practice Name: ${response.data.practices[i].name}</li>
                              <li>Address: ${suite} ${response.data.practices[i].visit_address.street}, ${response.data.practices[i].visit_address.zip} </li>
                              <li>Phone: ${phone}</li>
                              <li>Accepts New Patients: ${response.data.practices[i].accepts_new_patients}</li>
                            </ul>
                          </li>`;
      }
      docInfoString += '<button type="button" id="return" class="btn btn-info">Return</button>';
      $('#details-list').html(docInfoString);
    }).fail(function(error) {
      $('#result-header').text(error.responseText);
    });
  });

  $('#details-list').on('click', '#return', function() {
    $('#details-list').hide();
    $('#doc-list').show();
  });
});
