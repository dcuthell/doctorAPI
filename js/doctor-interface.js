const apiKey = require('./../.env').apiKey;

let displayDocList = (results) => {
  if(results.data.length == 0){
    $('#result-header').text(`No doctors found for your search of ${query}, please retry search!`);
    $('#doc-list').text("");
  }else{
    $('#result-header').text(`Your search for ${query} has the following results`);
    let docInfoString = "";
    for(let i in results.data){
      docInfoString += `<li>
                          <ul>
                            <li>Doctor Name: ${results.data[i].profile.first_name} ${results.data[i].profile.last_name} ${results.data[i].profile.title}</li>
                            <li>Specialty: ${results.data[i].specialties[0].name}</li>
                            <button type="button" id="${results.data[i].uid}" class="btn btn-info doc-button">Details</button>
                          </ul>
                        </li>`;
    }
    $('#doc-list').html(docInfoString);
  }
};

let displayDocsByName = (results) => {
  if(results.data.length == 0){
    $('#result-header').text(`No doctors found for your search of ${query}, please retry search!`);
    $('#doc-list').text("");
  }else{
    $('#result-header').text(`Your search for ${query} has the following results`);
    let docInfoString = "";
    for(let i in results.data){
      docInfoString += `<li>
                          <ul>
                            <li>Doctor Name: ${results.data[i].profile.first_name} ${results.data[i].profile.last_name} ${results.data[i].profile.title}</li>
                            <li>Specialty: ${results.data[i].specialties[0].name}</li>
                            <button type="button" id="${results.data[i].uid}" class="btn btn-info doc-button">Details</button>
                          </ul>
                        </li>`;
    }
    $('#doc-list').html(docInfoString);
  }
};

let displayDocDetails = (results) => {
  $('#result-header').text(`Here is some more detailed information on ${results.data.profile.first_name} ${results.data.profile.last_name}`);
  let specialties = '';
  if(results.data.specialties){
    specialties += '<li>Specialty: ';
    for(let j in results.data.specialties){
      specialties += results.data.specialties[j].name;
      if(results.data.specialties[j+1]){
        specialties += ", ";
      }
    }
    specialties += '</li>';
  }
  let docInfoString = `<li>Doctor Name: ${results.data.profile.first_name} ${results.data.profile.last_name} ${results.data.profile.title}</li>
                        ${specialties}`;
  for(let i in results.data.practices){
    if(i > 0){
      if(results.data.practices[i].name == results.data.practices[i-1].name){
        continue;
      }
    }
    let phone = "";
    for(let j in results.data.practices[i].phones){
      if(results.data.practices[i].phones[j].type == "landline"){
        phone = results.data.practices[i].phones[j].number;
      }
    }
    let suite = '';
    if(results.data.practices[i].visit_address.street2 != null){
      suite = results.data.practices[i].visit_address.street2;
    }
    let website = '';
    if(results.data.practices[i].website != null){
      website = `<li><a href="${results.data.practices[i].website}">Practice Website</a></li>`;
    }
    docInfoString += `<li>
                        <ul>
                          <li>Practice Name: ${results.data.practices[i].name}</li>
                          <li>Address: ${suite} ${results.data.practices[i].visit_address.street}, ${results.data.practices[i].visit_address.zip} </li>
                          <li>Phone: ${phone}</li>
                          <li>Accepts New Patients: ${results.data.practices[i].accepts_new_patients}</li>
                          ${website}
                        </ul>
                      </li>`;
  }
  docInfoString += `<img src="${results.data.profile.image_url}" alt="No Image"><button type="button" id="return" class="btn btn-info">Return</button>`;
  $('#details-list').html(docInfoString);
};

let displayError = (error) => {
  $('#result-header').text(error.responseText);
};


$(document).ready(function(){
  let doctorModule = new Doctor();

  $("#symptom-form").submit(function(event){
    event.preventDefault();
    let query = $("#symptom-input").val();
    doctorModule.doctorList(query, doctorList, displayError);
    $('#details-list').hide();
    $('#doc-list').show();
  });

  $("#name-form").submit(function(event){
    event.preventDefault();
    let query = $("#name-input").val();
    doctorModule.doctorsByName(query, doctorList, displayError);
    $('#details-list').hide();
    $('#doc-list').show();
  });

  $('#doc-list').on('click', '.doc-button', function() {
    let uid = $(this).attr('id');
    doctorModule.doctorDetails(uid);
    $("#doc-list").hide();
    $("#details-list").show();

  });

  $('#details-list').on('click', '#return', function() {
    $('#details-list').text("Loading...");
    $('#result-header').text("Results from your previous search");
    $('#details-list').hide();
    $('#doc-list').show();
  });
});
