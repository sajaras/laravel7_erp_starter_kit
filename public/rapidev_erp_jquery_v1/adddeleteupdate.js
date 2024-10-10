
var globalhighlight=null;
var searchval;

var globaltable;
var globaltablebody;
var globalsearchbox;
var globalfinaldata;
var globalclusterize;
var success_add;
var success_update;
var searchbox = $(".searchbox");
var extratable;
var vald_error_add;
var vald_error_update;

function adddata()
{
  success_add=0;
  vald_error_add=0;
  searchval = searchbox.val();

  $('#updatestatus').html("<span><i class='fa fa-spinner fa-spin'></i></span>  Data insertion going on").fadeIn(1000);
  $(".savebutton").attr('disabled','disabled');
var args = [];
 extratable=0;
var textfieldtoclearcountindex=null,fieldtotriggercountindex=null;
          for (var i = 0; i < arguments.length; i++)
            {
                args[i] = arguments[i];
                if(args[i] == "@")
                {
                    var textfieldtoclearcountindex = i +1;
                    var textfieldtoclearstartingindex = textfieldtoclearcountindex+1;
                    var textfieldtoclearendindex = textfieldtoclearcountindex + arguments[textfieldtoclearcountindex];

                }
                if(args[i] == "#")
                {


                    success_add = 1;
                    // var textfieldtoenablestartingindex = textfieldtoenablecountindex+1;
                    // var textfieldtoenableendindex = textfieldtoenablecountindex + arguments[textfieldtoenablecountindex];

                }
                if(args[i] == "%")//identifier for invoking the validationerrorsonadd function
                {
                    vald_error_add = 1;
                }
                if(args[i] == "$")
                {
                  var fieldtotriggercountindex = i+1;
                  var triggerfieldstartingindex = fieldtotriggercountindex+1;
                  var triggerfieldendindex = fieldtotriggercountindex + arguments[fieldtotriggercountindex]*2;

                }
                if(args[i] =="*")
                {
                  extratable =1;
                  globaltable = arguments[i+1];
                  globaltablebody = arguments[i+2];
                  globalsearchbox = arguments[i+3];

                }


            }
            if(!extratable)
            {
              globaltable = "#thispagetable";
              globaltablebody = ".tbody";
              globalsearchbox = ".searchbox";

            }

  var i ;
  var sendingurl =arguments[0];
  var totalnooffields = arguments[1] * 2;
  var text = arguments[2];
  var nooffields = totalnooffields/2;
  var nooferrorfields = totalnooffields/2;
  var fieldstartingindex = 3;
  var fieldendingindex = 3 + nooffields -1 ;
  var errorfieldstartingindex = 3 + nooffields;
  var errorfieldendingindex = 3 + totalnooffields -1 ;
  var fieldnamestartingindex = errorfieldendingindex +1;
  var fieldnameendingindex = fieldnamestartingindex + nooffields - 1;


console.log("sendingurl="+sendingurl);
console.log("totalnooffields="+totalnooffields);
console.log("buttontext="+ text);
console.log("nooffields="+nooffields);
console.log("nooferrorfields="+nooferrorfields);
console.log("fieldstartingindex="+fieldstartingindex);
console.log("fieldendingindex="+fieldendingindex);
console.log("errorfieldstartingindex="+errorfieldstartingindex);
console.log("errorfieldendingindex="+errorfieldendingindex);
console.log("fieldnamestartingindex="+fieldnamestartingindex);
console.log("fieldnameendingindex="+fieldnameendingindex);

console.log("texttoclearstarting="+textfieldtoclearstartingindex);
console.log("texttoclearending="+textfieldtoclearendindex);


  for(i=errorfieldstartingindex;i<=errorfieldendingindex;i++)
  {
    $(args[i]).html("");
  }


 var form = $("#thisform");
 var formdata = form.serialize();

 console.log(formdata);
 $.ajax({
   url:sendingurl,
   type:'post',
   data:formdata,
   success:function(data) {
      $('#updatestatus').html("");
        console.log("SUCCESS DATA",data);
        $(".savebutton").removeAttr('disabled');
         if(data.success)         {
             globalhighlight = data.highlight;
             filldata(highlighter); //highligher is a call back function

             if(!next)
             {
               $("#addmodal").modal('hide');
               $("#paymentmodal").modal('hide');
               
               $.get('/releaselocksinpage');
             }
             $('#successmessage').show();
             $('#successmessage').fadeOut(4000);

             for(i=fieldstartingindex;i<=fieldendingindex;i++)
             {
               $(args[i]).val("");
             }
             for(i=errorfieldstartingindex;i<=errorfieldendingindex;i++)
             {
               $(args[i]).html("");
             }
             if(textfieldtoclearcountindex !=null)
             {
                 for(i=textfieldtoclearstartingindex;i<=textfieldtoclearendindex;i++){
                   $(args[i]).html("");
                   $(args[i]).val("");
                 }
            }
            if(success_add==1)
            {
                successofadd(data);
           }

            if(fieldtotriggercountindex !=null)
            {
              for(i=triggerfieldstartingindex;i<=triggerfieldendindex;i=i+2)
              {
                console.log("element"+args[triggerfieldstartingindex]);
                console.log("event"+args[triggerfieldstartingindex+1]);
                $(args[triggerfieldstartingindex]).trigger(args[triggerfieldstartingindex+1]);
              }
            }

         }
         else if(data.eventalreadyinuse)
         {
           $("#modalmessage").text("This event is in use by someone in your unit.please wait till the lock has been released");
           $("#messagemodal").modal('show');
         }
         else if(data.dynamictablefieldemptycheck)
         {
           $("#modalmessage").text("Please fill all required fields");
           $("#messagemodal").modal('show');
         }
         else if(data.errors) {
              console.log(data);
              if(vald_error_add==1){
                validationerrorsonadd(data.errors)
              }
           // console.log(data.errors[0]);
             for (key in data.errors) {
             // console.log(typeof(key));
             // console.log(data.errors[key][0]);
             var currentkey= String(key);
             console.log(currentkey);
             var j=errorfieldstartingindex;

             for(var i=fieldnamestartingindex;i<=fieldnameendingindex;i++)
             {
              // var res = currentkey.localeCompare(args[i]);
              console.log("i="+i);
              console.log("j="+j);
              console.log("ivalue"+ args[i]);
              if(!(currentkey.localeCompare(args[i])))
              {
                  $(args[j]).html(data.errors[key][0]);
                  console.log("j="+j);
                   console.log("enteredifforkey"+key + "forerrorfield" + args[j])
              }
              j = j +1;
             }

          }

         }
         else {
           $('#databaseerror').text(data[2]);
           $('#database_error_modal').modal('show');
         }


 },
 error:function(ts){

   console.log(ts);
    $('#updatestatus').html("");
    $(".savebutton").removeAttr('disabled');

    if(ts.status ==403)
    {
      var responseText =JSON.parse(ts.responseText);
      $('#permissionerror').html(responseText.message);
      $('#permission_error_modal').modal('show');
      // alert(ts.responseJSON.message);

    }
    else if(ts.status == 401)
    {
       window.location.href = "/login"
    }
    else {
        alert(ts.responseText);
    }
 },

 });

console.log("searchvalue="+searchval);



}

function setdatatoeditmodal()
{
  // console.log("height of row");
  // console.log($("#tbody").find('tr').eq(1).height());
  var args = [];
  thisrow = arguments[0];
  console.log($(thisrow).closest('tr').find("#col5").text());
  var hrow = readCookie('highlightrow');
  console.log("hrow"+hrow);
  closesttr = $(thisrow).closest('tr');
  $('.tbody tr').eq(hrow).removeClass('highlighten');
  var field = [];
  field[0]= closesttr.find(arguments[1]).text();
  //field[0] contains gid;
   var noofeditfields = arguments[2];
   var editcolstartingindex = 3;
   var editcolendingindex = 3 + noofeditfields -1;
   editfieldstartingindex = editcolendingindex +1;
    $('#thisrowoldid').val(field[0]); //assigning Gid to hidden field thisrowoldid
    for (var i = 1; i <= noofeditfields; ++i) {
        field[i] = closesttr.find(arguments[editcolstartingindex + i -1]).text();
        $(arguments[editfieldstartingindex + i -1]).val(field[i]);
          $('#thisrowfield'+i).val(field[i]);
    }
  var rowid = closesttr.find('td:last').text();
  console.log("row gid is"+rowid);
  for (var i = 0; i < arguments.length; i++)
  {
    args[i] = arguments[i];
    if(args[i] == "#")
    {
        successofsetdatatoedit(thisrow);
    }
  }
  var url = "/acessrowlock/"+rowid;
  $.get(url,function(data){
    console.log(data);
      if(data==1)
      {
        $('#editmodal').modal('show');
      }
      else {
        $("#modalmessage").text("This row is in use by someone in your unit.please wait till the lock has been released");
        $("#messagemodal").modal('show');
      }
  });

}



function updatedata()
{
  var deletedata = false;
   success_update=0;
   vald_error_update=0;

  console.log("In update");
  console.log("parameter is"+arguments[20]);
  console.log("parameter is"+arguments[21]);
  console.log("parameter is"+arguments[22]);
  console.log("parameter is"+arguments[23]);
  extratable=0;
  console.log("Extartable intialized="+extratable);
  var searchval = $('.searchbox').val();

  $('#updatestatus').html("<span><i class='fa fa-spinner fa-spin'></i></span>  Data updation going on").fadeIn(1000);
  var args = [];
  var textfieldtoclearcountindex=null,fieldtotriggercountindex=null;
            for (var i = 0; i < arguments.length; i++)
              {
                  args[i] = arguments[i];
                  if(args[i] == "@")
                  {
                      var textfieldtoclearcountindex = i +1;
                      var textfieldtoclearstartingindex = textfieldtoclearcountindex+1;
                      var textfieldtoclearendindex = textfieldtoclearcountindex + arguments[textfieldtoclearcountindex];

                  }
                  if(args[i] == "#")
                  {
                      success_update = 1;

                  }
                  if(args[i] == "%")//identifier for invoking the validationerrorsonadd function
                  {
                      vald_error_update = 1;
                  }
                  if(args[i] == "$")
                  {
                    var fieldtotriggercountindex = i+1;
                    var triggerfieldstartingindex = fieldtotriggercountindex+1;
                    var triggerfieldendindex = fieldtotriggercountindex + arguments[fieldtotriggercountindex]*2;

                  }
                  if(args[i] =="*")
                  {
                    console.log("seperator is"+args[i]);
                    console.log("i is"+i);
                    extratable =1;
                    globaltable = arguments[i+1];
                    globaltablebody = arguments[i+2];
                    globalsearchbox = arguments[i+3];
                    console.log("globaltable is"+globaltable);
                    console.log("globaltablebody is"+globaltablebody);
                    console.log("global search box is"+globalsearchbox);
                  }
                  if(args[i] =="^")
                  {
                    var deletedatadetails =  arguments[i+1];
                    deletedata = true;
                  }


              }
              if(!extratable)
              {
                globaltable = "#thispagetable";
                globaltablebody = ".tbody";
                globalsearchbox = ".searchbox";
              }


    var i ;
    var sendingurl =arguments[0];
    var totalnooffields = arguments[1] * 2;
    var gid = $(arguments[2]).val();
    var nooffields = totalnooffields/2;
    var nooferrorfields = totalnooffields/2;
    var fieldstartingindex = 3;
    var fieldendingindex = 3 + nooffields -1 ;
    var errorfieldstartingindex = 3 + nooffields;
    var errorfieldendingindex = 3 + totalnooffields -1 ;
    var fieldnamestartingindex = errorfieldendingindex +1;
    var fieldnameendingindex = fieldnamestartingindex + nooffields - 1;

  console.log("sendingurl="+sendingurl);
  console.log("totalnooffields="+totalnooffields);
  console.log("gid="+ gid);
  console.log("nooffields="+nooffields);
  console.log("nooferrorfields="+nooferrorfields);
  console.log("fieldstartingindex="+fieldstartingindex);
  console.log("fieldendingindex="+fieldendingindex);
  console.log("errorfieldstartingindex="+errorfieldstartingindex);
  console.log("errorfieldendingindex="+errorfieldendingindex);
  console.log("fieldnamestartingindex="+fieldnamestartingindex);
  console.log("fieldnameendingindex="+fieldnameendingindex);

    for(i=errorfieldstartingindex;i<=errorfieldendingindex;i++)
    {
      $(args[i]).html("");
    }

  var editform = $("#thiseditform")[0];
  // var formdata = editform.serialize();
  var formdata = new FormData(editform);
  if(deletedata)
  {
  for(key in deletedatadetails)
  {

    formdata.append(key,deletedatadetails[key]);
  }
 }
  formdata.append("_method","put");


  url = sendingurl + gid;
  console.log("URL",url);

  console.log(url);
  $.ajax({
    url:url,
    type:'post',
    data:formdata,
    processData: false,
    contentType: false,
    success:function(data) {
      console.log(data);
      $('#updatestatus').html("");
      if(data.success)
      {
        globalhighlight = data.highlight;
        filldata(highlighter); //highligher is a call back function
        // $('#editmodal').modal('hide');
        $("#modalmessage").text("Data Updated Successfully !!");
        $("#messagemodal").modal('show');




        if(textfieldtoclearcountindex !=null)
        {
            for(i=textfieldtoclearstartingindex;i<=textfieldtoclearendindex;i++){
              $(args[i]).html("");
            }
       }
       if(success_update==1)
       {
           successofupdate(data);
      }

       if(fieldtotriggercountindex !=null)
       {
         for(i=triggerfieldstartingindex;i<=triggerfieldendindex;i=i+2)
         {
           $(args[triggerfieldstartingindex]).trigger(args[triggerfieldstartingindex+1]);
         }
       }
      }
      else if(data.rateused){
        $("#modalmessage").text(data.rateused);
        $("#messagemodal").modal('show');
        globalhighlight = data.highlight;
        filldata(highlighter); //highligher is a call back function
        $('#editmodal').modal('hide');
      }
      else if(data.rateusedratextranotused){
        $("#modalmessage").text(data.rateusedratextranotused);
        $("#messagemodal").modal('show');
        globalhighlight = data.highlight;
        filldata(highlighter); //highligher is a call back function
        $('#editmodal').modal('hide');
      }
      else if(data.rateusedratextraused){
        $("#modalmessage").text(data.rateusedratextraused);
        $("#messagemodal").modal('show');
        globalhighlight = data.highlight;
        filldata(highlighter); //highligher is a call back function
        $('#editmodal').modal('hide');
      }
      else if(data.eventalreadyinuse)
      {
        $("#modalmessage").text("This event is in use by someone in your unit.please wait till the lock has been released");
        $("#messagemodal").modal('show');
      }
      else if(data.dynamictablefieldemptycheck)
      {
        $("#modalmessage").text("Please fill all required fields");
        $("#messagemodal").modal('show');
      }
      else if(data.errors) {

        console.log(data);
        if(vald_error_update==1){
          validationerrorsonupdate(data.errors)
        }
       for (key in data.errors) {
       // console.log(typeof(key));
       // console.log(data.errors[key][0]);
       var currentkey= String(key);
       console.log(currentkey);
       var j=errorfieldstartingindex;

       for(var i=fieldnamestartingindex;i<=fieldnameendingindex;i++)
       {
        var res = currentkey.localeCompare(args[i]);
        console.log("i="+i);
        console.log("j="+j);
        console.log("ivalue"+ args[i]);
        if(!(currentkey.localeCompare(args[i])))
        {
            $(args[j]).html(data.errors[key][0]);
            console.log("j="+j);
             console.log("enteredifforkey"+key + "forerrorfield" + args[j])
        }
        j = j +1;
       }

    }

      }
      else {
                console.log(data);
        $('#databaseerror').text(data[2]);
        $('#database_error_modal').modal('show');
      }

   },
   error:function(ts){
       $('#updatestatus').html("");
       console.log(ts);

       if(ts.status ==403)
       {
         var responseText =JSON.parse(ts.responseText);
         $('#permissionerror').html(responseText.message);
         $('#permission_error_modal').modal('show');
         // alert(ts.responseJSON.message);

       }
       else if(ts.status == 401)
       {
          window.location.href = "/login"
       }
       else {
           alert(ts.responseText);
       }
   }
  });

}

$("#editmodal").on("hidden.bs.modal", function () {
  console.log("in hidden model of edit")


    var rowid = closesttr.find('td:last').text();
  console.log("rowgid for lock release is "+rowid);
  var url = "/releaserowlock/"+rowid;
  $.get(url,function(data){
  console.log(data);
});
});

// $("#messagemodal").on("hidden.bs.modal", function () {
//   $('#refreshblock').load(location.href + ' #refreshblock',function(){
//   console.log("Refresh Process");
//   });
//   });

function setdatatodeletemodal()
{

  var gid = $(arguments[0]).val();
  var test = $('#thisrowoldid').val();
  console.log("gid="+gid);
  console.log("test="+test);

  $("#entityname").text(arguments[1]);
  $("#entityid").text(gid);
  $('#deletefield1').text(arguments[2]+":  ");
  $('#deletefield2').text(arguments[3]+":  ");
  $('#deletefield1value').text($(arguments[4]).val());
  $('#deletefield2value').text($(arguments[5]).val());
  $('#deletemodal').modal('show');
}



function deletedata()
{
    $('#updatestatus').html("<span><i class='fa fa-spinner fa-spin'></i></span>  Data insertion going on").fadeIn(1000);
  var sendingurl = arguments[0];
  var gid =$('#entityid').text();
  var args = [];
  var success_delete=0;
  for (var i = 0; i < arguments.length; i++)
    {
        args[i] = arguments[i];
        if(args[i] == "@")
        {
            var textfieldtoclearcountindex = i +1;
            var textfieldtoclearstartingindex = textfieldtoclearcountindex+1;
            var textfieldtoclearendindex = textfieldtoclearcountindex + arguments[textfieldtoclearcountindex];

        }
        if(args[i] == "$")
        {
          var fieldtotriggercountindex = i+1;
          var triggerfieldstartingindex = fieldtotriggercountindex+1;
          var triggerfieldendindex = fieldtotriggercountindex + arguments[fieldtotriggercountindex]*2;

        }
        if(args[i] == "#")
        {
            success_delete = 1;

        }

    }

  url = sendingurl + gid;
  console.log("URL",url);
  $.ajax({
    url:url,
    type:'delete',
    data:{'id':gid,_method:'post',_token:$('input[name=_token]').val()},
    success:function(data) {
      console.log("DELETE SUCCESS",data);
      $('#updatestatus').html("");
      if(data == 1)
      {
        filldata();
        if(success_delete==1)
        {
            successofdelete(data);
       }
        $('#editmodal').modal('hide');
        $('#deletemodal').modal('hide');
        if(textfieldtoclearcountindex !=null)
        {
            for(i=textfieldtoclearstartingindex;i<=textfieldtoclearendindex;i++){
              $(args[i]).html("");
            }
       }
       if(fieldtotriggercountindex !=null)
       {
         for(i=triggerfieldstartingindex;i<=triggerfieldendindex;i=i+2)
         {
           $(args[triggerfieldstartingindex]).trigger(args[triggerfieldstartingindex+1]);
         }
       }
      }
      else {
        $('#databaseerror').text(data[2]);
        $('#database_error_modal').modal('show');
      }

  },
  error:function(ts){
    $('#updatestatus').html("");
    if(ts.status ==403)
    {
      var responseText =JSON.parse(ts.responseText);
      $('#permissionerror').html(responseText.message);
      $('#permission_error_modal').modal('show');
    }
    else if(ts.status == 401)
    {
      window.location.href = "/login"
    }



    else {

      $('#updatestatus').html("");
      alert(ts.responseText);
    }
  }
  });
}


function highlighter() {

  // var searchval = arguments[0];
if(extratable)
{
  globalfinaldata = finaltable1;

}
else {
  globalfinaldata = finaltable;

}
  var datahighlight = globalhighlight;
  console.log(datahighlight);
  var searchbox = $(globalsearchbox);
  console.log("In highliter searchbox is"+searchbox);
  searchval = searchbox.val();
  // searchbox.val(searchval);
  // searchbox.trigger('keyup');

  console.log(datahighlight);
  console.log($(globaltablebody).attr("id"));
  console.log($(globaltable + ' ' +'tbody tr').find('td:first').text()+ " TD VALUE");
  console.log();
var highlightrowindex;
var currentrow;
for (var i = 0,rowlength=globalfinaldata.length; i < rowlength; i++)
 {
   currentrow = $(globalfinaldata[i]);
   console.log(currentrow);
  // $(globaltablebody).find('tr').each(function() {
    // console.log("inside function..");
    console.log("check match");
    console.log(datahighlight);
    console.log(currentrow.find('td:first').text());
    if(currentrow.find('td:first').text() == datahighlight)
    {
      console.log("matching i"+ i);
      console.log("In highligher");

      // currentrow.addClass('rowselected');
      // c= currentrow.find('td:first');

       currentrow.addClass('highlighten');
      console.log("wrap data");
      console.log(currentrow.wrap('<p/>').parent().html());
      globalfinaldata[i] = currentrow.wrap('<p/>').parent().html();

      highlightrowindex=  i;


     document.cookie = "highlightrow=" + highlightrowindex;
     // $('#tbody').find('tr td').eq(highlightrowindex).click();
     // $('#thispagetable').trigger('keydown');


    }
  }

 // var rowpos = $(globaltable+' tr:eq('+highlightrowindex+')').position();
 console.log("globaltable"+globaltable);
rowheight = $(globaltable + ' tr').eq(0).height();
console.log("rowheight"+rowheight);
console.log("value of i - "+i);
$(globaltable).parent().scrollTop((highlightrowindex)*(rowheight-10));

searchbox.val(searchval);
console.log("i am executing here");
var e = $.Event("keyup");
e.keyCode = 13; // # Some key code value
searchbox.trigger(e);




}


function set_disable()
{
  var args = [];
  var textdatefieldtoclearcountindex=null;
  var dropdownfieldtoclearcountindex=null;
  var autocompletefieldtoclearcountindex=null;
  var buttontoclearcountindex=null;

  for (var i = 0; i < arguments.length; i++)
    {
      args[i] = arguments[i];
      if(args[i] == "@")
      {
        var textdatefieldtoclearcountindex = i +1;
        var textdatefieldtoclearstartingindex = textdatefieldtoclearcountindex+1;
        var textdatefieldtoclearendindex = textdatefieldtoclearcountindex + arguments[textdatefieldtoclearcountindex];
      }
      if(args[i] == "$")
      {
        var dropdownfieldtoclearcountindex = i +1;
        var dropdownfieldtoclearstartingindex = dropdownfieldtoclearcountindex+1;
        var dropdownfieldtoclearendindex = dropdownfieldtoclearcountindex + arguments[dropdownfieldtoclearcountindex];
      }
      if(args[i] == "*")
      {
        var autocompletefieldtoclearcountindex = i +1;
        var autocompletefieldtoclearstartingindex = autocompletefieldtoclearcountindex+1;
        var autocompletefieldtoclearendindex = autocompletefieldtoclearcountindex + arguments[autocompletefieldtoclearcountindex];
      }
      if(args[i] == "^")
      {
        var buttontoclearcountindex = i +1;
        var buttontoclearstartingindex = buttontoclearcountindex+1;
        var buttontoclearendindex = buttontoclearcountindex + arguments[buttontoclearcountindex];
      }
    }

    if(textdatefieldtoclearcountindex !=null)
    {
        for(i=textdatefieldtoclearstartingindex;i<=textdatefieldtoclearendindex;i++){
          $(args[i]).prop("readonly", true);
        }
    }

    if(dropdownfieldtoclearcountindex !=null)
    {
        for(i=dropdownfieldtoclearstartingindex;i<=dropdownfieldtoclearendindex;i++){
          $(args[i]).attr("disabled", true);
        }
    }

    if(autocompletefieldtoclearcountindex !=null)
    {
        for(i=autocompletefieldtoclearstartingindex;i<=autocompletefieldtoclearendindex;i++){
          $(args[i]).attr("disabled", true);
          // $(args[i]).prop("readonly", true);
          // $(args[i]).autocomplete("disable");
        }
    }

    if(buttontoclearcountindex !=null)
    {
        for(i=buttontoclearstartingindex;i<=buttontoclearendindex;i++){
          $(args[i]).attr('disabled','disabled');
        }
    }
}

function set_enable()
{
  var args = [];
  var textdatefieldtoclearcountindex=null;
  var dropdownfieldtoclearcountindex=null;
  var autocompletefieldtoclearcountindex=null;
  var buttontoclearcountindex=null;

  for (var i = 0; i < arguments.length; i++)
    {
      args[i] = arguments[i];
      if(args[i] == "@")
      {
        var textdatefieldtoclearcountindex = i +1;
        var textdatefieldtoclearstartingindex = textdatefieldtoclearcountindex+1;
        var textdatefieldtoclearendindex = textdatefieldtoclearcountindex + arguments[textdatefieldtoclearcountindex];
      }
      if(args[i] == "$")
      {
        var dropdownfieldtoclearcountindex = i +1;
        var dropdownfieldtoclearstartingindex = dropdownfieldtoclearcountindex+1;
        var dropdownfieldtoclearendindex = dropdownfieldtoclearcountindex + arguments[dropdownfieldtoclearcountindex];
      }
      if(args[i] == "*")
      {
        var autocompletefieldtoclearcountindex = i +1;
        var autocompletefieldtoclearstartingindex = autocompletefieldtoclearcountindex+1;
        var autocompletefieldtoclearendindex = autocompletefieldtoclearcountindex + arguments[autocompletefieldtoclearcountindex];
      }
      if(args[i] == "^")
      {
        var buttontoclearcountindex = i +1;
        var buttontoclearstartingindex = buttontoclearcountindex+1;
        var buttontoclearendindex = buttontoclearcountindex + arguments[buttontoclearcountindex];
      }
    }

    if(textdatefieldtoclearcountindex !=null)
    {
        for(i=textdatefieldtoclearstartingindex;i<=textdatefieldtoclearendindex;i++){
          $(args[i]).prop("readonly", false);
        }
    }

    if(dropdownfieldtoclearcountindex !=null)
    {
        for(i=dropdownfieldtoclearstartingindex;i<=dropdownfieldtoclearendindex;i++){
          $(args[i]).attr("disabled", false);
        }
    }

    if(autocompletefieldtoclearcountindex !=null)
    {
        for(i=autocompletefieldtoclearstartingindex;i<=autocompletefieldtoclearendindex;i++){
          $(args[i]).attr("disabled", false);
          // $(args[i]).prop("readonly", false);
          // $(args[i]).autocomplete("enable");
        }
    }

    if(buttontoclearcountindex !=null)
    {
        for(i=buttontoclearstartingindex;i<=buttontoclearendindex;i++){
          $(args[i]).removeAttr('disabled');
        }
    }
}
function set_display()
{
  var args = [];
  var textdatefieldtoclearcountindex=null;
  var dropdownfieldtoclearcountindex=null;
  var autocompletefieldtoclearcountindex=null;
  var labelfieldtoclearcountindex=null;

  for (var i = 0; i < arguments.length; i++)
    {
      args[i] = arguments[i];
      if(args[i] == "@")
      {
        var textdatefieldtoclearcountindex = i +1;
        var textdatefieldtoclearstartingindex = textdatefieldtoclearcountindex+1;
        var textdatefieldtoclearendindex = textdatefieldtoclearcountindex + arguments[textdatefieldtoclearcountindex];
      }
      if(args[i] == "$")
      {
        var dropdownfieldtoclearcountindex = i +1;
        var dropdownfieldtoclearstartingindex = dropdownfieldtoclearcountindex+1;
        var dropdownfieldtoclearendindex = dropdownfieldtoclearcountindex + arguments[dropdownfieldtoclearcountindex];
      }
      if(args[i] == "*")
      {
        var autocompletefieldtoclearcountindex = i +1;
        var autocompletefieldtoclearstartingindex = autocompletefieldtoclearcountindex+1;
        var autocompletefieldtoclearendindex = autocompletefieldtoclearcountindex + arguments[autocompletefieldtoclearcountindex];
      }
      if(args[i] == "#")
      {
        var labelfieldtoclearcountindex = i +1;
        var labelfieldtoclearstartingindex = labelfieldtoclearcountindex+1;
        var labelfieldtoclearendindex = labelfieldtoclearcountindex + arguments[labelfieldtoclearcountindex];
      }
    }

    if(textdatefieldtoclearcountindex !=null)
    {
        for(i=textdatefieldtoclearstartingindex;i<=textdatefieldtoclearendindex;i++){
          $(args[i]).show();
        }
    }

    if(dropdownfieldtoclearcountindex !=null)
    {
        for(i=dropdownfieldtoclearstartingindex;i<=dropdownfieldtoclearendindex;i++){
          $(args[i]).show();
        }
    }

    if(autocompletefieldtoclearcountindex !=null)
    {
        for(i=autocompletefieldtoclearstartingindex;i<=autocompletefieldtoclearendindex;i++){
          $(args[i]).show();
        }
    }
    if(labelfieldtoclearcountindex !=null)
    {
        for(i=labelfieldtoclearstartingindex;i<=labelfieldtoclearendindex;i++){
          $(args[i]).show();
        }
    }
}
function set_hide()
{
  var args = [];
  var textdatefieldtoclearcountindex=null;
  var dropdownfieldtoclearcountindex=null;
  var autocompletefieldtoclearcountindex=null;
  var labelfieldtoclearcountindex=null;

  for (var i = 0; i < arguments.length; i++)
    {
      args[i] = arguments[i];
      if(args[i] == "@")
      {
        var textdatefieldtoclearcountindex = i +1;
        var textdatefieldtoclearstartingindex = textdatefieldtoclearcountindex+1;
        var textdatefieldtoclearendindex = textdatefieldtoclearcountindex + arguments[textdatefieldtoclearcountindex];
      }
      if(args[i] == "$")
      {
        var dropdownfieldtoclearcountindex = i +1;
        var dropdownfieldtoclearstartingindex = dropdownfieldtoclearcountindex+1;
        var dropdownfieldtoclearendindex = dropdownfieldtoclearcountindex + arguments[dropdownfieldtoclearcountindex];
      }
      if(args[i] == "*")
      {
        var autocompletefieldtoclearcountindex = i +1;
        var autocompletefieldtoclearstartingindex = autocompletefieldtoclearcountindex+1;
        var autocompletefieldtoclearendindex = autocompletefieldtoclearcountindex + arguments[autocompletefieldtoclearcountindex];
      }
      if(args[i] == "#")
      {
        var labelfieldtoclearcountindex = i +1;
        var labelfieldtoclearstartingindex = labelfieldtoclearcountindex+1;
        var labelfieldtoclearendindex = labelfieldtoclearcountindex + arguments[labelfieldtoclearcountindex];
      }
    }

    if(textdatefieldtoclearcountindex !=null)
    {
        for(i=textdatefieldtoclearstartingindex;i<=textdatefieldtoclearendindex;i++){
          $(args[i]).hide();
        }
    }

    if(dropdownfieldtoclearcountindex !=null)
    {
        for(i=dropdownfieldtoclearstartingindex;i<=dropdownfieldtoclearendindex;i++){
          $(args[i]).hide();
        }
    }

    if(autocompletefieldtoclearcountindex !=null)
    {
        for(i=autocompletefieldtoclearstartingindex;i<=autocompletefieldtoclearendindex;i++){
          $(args[i]).hide();
        }
    }
    if(labelfieldtoclearcountindex !=null)
    {
        for(i=labelfieldtoclearstartingindex;i<=labelfieldtoclearendindex;i++){
          $(args[i]).hide();
        }
    }
}
