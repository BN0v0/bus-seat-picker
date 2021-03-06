// Gloabal variables
const selectable = document.getElementById("selectable");
const selectable_area = document.querySelector(".bus");
var selected = 0;
var validate=false;
var total_selected;
var seats = document.getElementsByClassName('seat');
var seats_booked = document.getElementsByClassName('seat-booked');
var seats_selected = document.getElementsByClassName('seat-selected');
var increment;
var final_selected_seats = [];

function Init(){
    total_selected= getURLParameterValue("quantity");
}

function PopulateUI(){
    var booked_seats = [];
    //For now randomize the booked seats
    for(var i = 0 ; i< Math.floor(Math.random() * 54); i++){
        var val = Math.floor(Math.random() * 54);;
        booked_seats.push(val);
    }

    for(var i = 0 ; i<booked_seats.length; i++){
        var temp_seat = document.getElementById(booked_seats[i]);
        temp_seat.className = "seat-booked";
    }

}


//seat click event 

    selectable_area.addEventListener('click', function(e){

        validateSelection(e);

 

            if(selected !== total_selected && validate == false){
                if(increment==true){
                    e.target.classList.toggle('seat-selected');
                    selected++;
                    AddSelectedSeats(e.srcElement.id);
                }else if(increment==false){
                    e.target.classList.toggle('seat-selected');
                    selected--;
                    RemoveSelectedSeats(e.srcElement.id);

                }
            }else{
                if(increment==false){
                    e.target.classList.toggle('seat-selected');
                    selected--;
                    RemoveSelectedSeats(e.srcElement.id);
                }
                validate =false;
            }
        
        document.getElementById("f_seats").innerHTML = final_selected_seats;

    })


  /* #region  Final Seats Operations */
    function AddSelectedSeats(seat){
        final_selected_seats.push(seat);  
    }
    function RemoveSelectedSeats(value){
        const index = final_selected_seats.indexOf(value);
        if (index > -1) {
         final_selected_seats.splice(index, 1);
        }
    }
  /* #endregion */


function validateSelection(e){
    //Validate the selection
    if(selected >= total_selected){
       
        validate = true;

        if(!e.target.classList.contains('seat-selected')){
            alert("Only select "+total_selected+" seat, quantity previous selected!");
        }else if(e.target.classList.contains('seat-selected')){
            increment = false;
        }
        
    }else{

        if(e.target.classList.contains('seat') && !e.target.classList.contains('seat-booked') && !e.target.classList.contains('seat-selected')){
            increment = true;
        }else if(e.target.classList.contains('seat-selected') && !e.target.classList.contains('seat-booked')){
            increment = false;
        }else{
            increment=null;
        }

    }

    return increment;
}

// GET URL parameters
function getURLParameterValue(parameter){
    var value;
    var parameters = window.location.search;
    //count the number of possible parameters -1
    var count=(parameters.match('/&/g') || []).length;

    //if the count = 0 , there is one parameter
    if(count==0){
        var occurencies = (parameters.match(parameter) || []).length;
        // check if the existing parameter is the pretended
        if(occurencies!=0){
             value = parseInt(parameters.replace("?"+parameter+"=", ""));
        }
    }else{
        //Split the existing parameters
        var parameters_array = parameters.split("&");

        for(var i = 0 ; i< parameters_array.length ; i++){
            element = parameters_array[i];
            //if the parameter string is the first it will contain "?" in the beginning, lets remove it
            if((element.match('/?/g') || []).length == 1){
                element = element.replace("?", "");
            }
            // Now lets see if the pretended  parameter is existing in the url 
            if((element.match('/&/g') || []).length == 1 && ( element.match(parameter) || []).length == 1  ){
                value = parseInt(element.replace("?"+parameter+"=", ""));
            }else if((element.match('/&/g') || []).length == 0 && ( element.match(parameter) || []).length == 1){
                value = parseInt(element.replace(parameter+"=", ""));
            }
        }
        
    }
    return value;
}



// Init process 
Init();
PopulateUI();