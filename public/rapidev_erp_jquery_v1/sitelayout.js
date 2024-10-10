$(document).ready(function(){

setTimeout(
function() {
 $(".pre-loader").addClass('d-none');
}, 1000);


});

$(document).on('click','#showcalculator',function(){

$("#calculatormodal").modal('show');



setTimeout(function() {    $(document).find('.calc-edit').focus(); }, 500);



});


     $(document).ready(function(){
         $('#calcexample').jsRapCalculator({
             name: 'CalculatorDemo',
             showBitwise: false
         });

     });


// implementation of set accordion and setmilmacookies function is written in main.js
setaccordion();
setmilmacookies();
var  finaltable;
var clusterize;
var rowheight = 21;
$('#helpTab a[href="#keyshortcuts"]').tab('show');
