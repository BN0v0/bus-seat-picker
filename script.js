// Gloabal variables
const selectable_area = document.querySelector(".bus")
var selected = 0;
var validate=false;
var total_selected=document.getElementById("quantity").value;
var seats = document.getElementsByClassName('seat');
var seats_booked = document.getElementsByClassName('seat-booked');
var seats_selected = document.getElementsByClassName('seat-selected');

//seat click event 
selectable_area.addEventListener('click', function(e){

    validateSelection();

    if(validate ==false){
        if(selected !== parseInt(total_selected) ){
            if(e.target.classList.contains('seat') && !e.target.classList.contains('seat-booked')){
                e.target.classList.toggle('seat-selected');
                selected++;
            }
        }else{
            if(e.target.classList.contains('seat-selected') && e.target.classList.contains('seat')){
                e.target.classList.toggle('seat-selected');
                selected--;
            }
        }
    }else{
        validate =false;
    }

})


function validateSelection(){
    var total_selected=document.getElementById("quantity").value;

    if(selected >= parseInt(total_selected)){
        selected = 0; 
        var list= selectable_area.getElementsByClassName("seat");

        for(var i = 0 ; i< list.length ; i++){
            if ( list[i].classList.contains('seat-selected') ){
                list[i].classList.toggle('seat-selected');
            }
        }

        validate = true;
        
    }
}

