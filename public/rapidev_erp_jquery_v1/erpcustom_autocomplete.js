
jQuery.fn.extend({   // defining a jquery plugin


    staticautocompletion: function (options) { // name of the plugin

    var defaults = {open:{},slicestart:0,sliceends:200,minimumlength:0,datadelay:100,searchonfocus:false,onkeyup:{"erasekeys":[46]},selectdisabledkeys:[9,16],datamethod:"fromvariable"};
    options = $.extend(defaults, options);  // if a perticular option field  in  corresponding js is given then its default option will not be  considered


    var staticautocompletewidget = $(this).autocomplete({
       autoFocus: true,
       open : options.open,
    source: function(request, response) {


      if(options.datamethod == "fromvariable" || options.datamethod == "alasql")
      {


        if(options.datamethod == "alasql")
        {
            var data = options.datasourcefromalasql.call($(this));
        }
        else {
          var data = eval(options.datasource);
        }



      if(typeof data == 'undefined' || data.length == 0  )
      {
        // var fieldid  = "#"+$(this).attr("id");
        var fieldid = "#"+this.element[0].id;

        if(options.onselection[fieldid].hasOwnProperty("emptylisttext"))
        {

          emptylisttext = options.onselection[fieldid]["emptylisttext"];

        }
        else {

            emptylisttext = "list empty";
        }
        erp_toaster({heading:emptylisttext,text:[]});
        // $('#modalmessage').text(emptylisttext);
        // $('#messagemodal').modal('show');
        // return;

      }

        // find variable corresponding to string given
        var datamap = data.map(function(i) {
        var templabel="";
        for(var x=0;x<options.datalabel.length;x++)
        {
          if(x%2 ==0)
          {
            templabel = templabel + i[options.datalabel[x]];


          }
          else {
            templabel = templabel + options.datalabel[x];

          }
        }

        var tempvalue="";
        for(var x=0;x<options.datavalue.length;x++)
        {
          if(x%2 ==0)
          {
            tempvalue = tempvalue + i[options.datavalue[x]];

          }
          else {
            tempvalue = tempvalue + options.datavalue[x];

          }
        }

        var tempdesc="";
        for(var x=0;x<options.datadesc.length;x++)
        {
          if(x%2 ==0)
          {
            tempdesc = tempdesc + i[options.datadesc[x]];

          }
          else {
            tempdesc = tempdesc + options.datadesc[x];

          }
        }
        var storedinternal = {};
        if(options.hasOwnProperty('internalystored'))
        {
            for(intfield in options.internalystored)
            {
                storedinternal[intfield] = i[options.internalystored[intfield]];
            }
        }
        if(options.hasOwnProperty('datahiddenvalue'))
        {
        var temphidden="";
        for(var x=0;x<options.datahiddenvalue.length;x++)
        {
          if(x%2 ==0)
          {
            temphidden = temphidden + i[options.datahiddenvalue[x]];

          }
          else {
            temphidden = temphidden + options.datahiddenvalue[x];

          }
        }

        return {label:templabel,value:tempvalue,desc:tempdesc,gid:temphidden,internalystored:storedinternal};
        }

        return {label:templabel,value:tempvalue,desc:tempdesc,internalystored:storedinternal};


        });

        var key = request.term;
        datamap = datamap.filter(function(i) {
          if(!(isNaN(key)))
          {
            return i.label.split("-")[0].toLowerCase().indexOf(key.toLowerCase()) >= 0;


          }
          else {

            return i.label.toLowerCase().indexOf(key.toLowerCase()) >= 0;
          }
        });

        response(datamap.slice(options.slicestart,options.sliceends));
      }

      else if(options.datamethod =="ajax")
      {
        var fieldid = "#"+this.element[0].id;

        var ajaxparam = options.ajaxparameters;
        var formdata = {};
        var formdatafields = ajaxparam.datafields[fieldid];
        for(key in formdatafields)
        {
          if(formdatafields[key][2] =="val")
          {
            formdata[formdatafields[key][0]]  = $(formdatafields[key][1]).val();

          }
          else if(formdatafields[key][2] =="text")
          {
            formdata[formdatafields[key][0]]  = $(formdatafields[key][1]).text();

          }


        }

        formdata["_method"] = ajaxparam["ajaxmethod"];
        formdata["_token"]  = $('input[name=_token]').val();

        $.ajax({
                url:ajaxparam["ajaxurl"],
                type:ajaxparam["ajaxtype"],
                dataType: ajaxparam["ajaxdatatype"],
                data:formdata,
                success: function(dataoutput) {

                  data = dataoutput;
                  console.log("staticautocompletionajaxresult",data);
                  var datamap = data.map(function(i) {
                  var templabel="";
                  for(var x=0;x<options.datalabel.length;x++)
                  {
                    if(x%2 ==0)
                    {
                      templabel = templabel + i[options.datalabel[x]];


                    }
                    else {
                      templabel = templabel + options.datalabel[x];

                    }
                  }

                  var tempvalue="";
                  for(var x=0;x<options.datavalue.length;x++)
                  {
                    if(x%2 ==0)
                    {
                      tempvalue = tempvalue + i[options.datavalue[x]];

                    }
                    else {
                      tempvalue = tempvalue + options.datavalue[x];

                    }
                  }

                  var tempdesc="";
                  for(var x=0;x<options.datadesc.length;x++)
                  {
                    if(x%2 ==0)
                    {
                      tempdesc = tempdesc + i[options.datadesc[x]];

                    }
                    else {
                      tempdesc = tempdesc + options.datadesc[x];

                    }
                  }
                  var storedinternal = {};
                  if(options.hasOwnProperty('internalystored'))
                  {
                      for(intfield in options.internalystored)
                      {
                          storedinternal[intfield] = i[options.internalystored[intfield]];
                      }
                  }
                  if(options.hasOwnProperty('datahiddenvalue'))
                  {
                  var temphidden="";
                  for(var x=0;x<options.datahiddenvalue.length;x++)
                  {
                    if(x%2 ==0)
                    {
                      temphidden = temphidden + i[options.datahiddenvalue[x]];

                    }
                    else {
                      temphidden = temphidden + options.datahiddenvalue[x];

                    }
                  }

                  return {label:templabel,value:tempvalue,desc:tempdesc,gid:temphidden,internalystored:storedinternal};
                  }

                  return {label:templabel,value:tempvalue,desc:tempdesc,internalystored:storedinternal};


                  });

                  var key = request.term;
                  datamap = datamap.filter(function(i) {
                    if(!(isNaN(key)))
                    {
                      return i.label.split("-")[0].toLowerCase().indexOf(key.toLowerCase()) >= 0;


                    }
                    else {

                      return i.label.toLowerCase().indexOf(key.toLowerCase()) >= 0;
                    }
                  });

                  response(datamap.slice(options.slicestart,options.sliceends));
              },
              error: function(ts) {
                if(ts.status == 403)
                {
                  $('#permissionerror').text("You are not authorized !");
                  $('#permission_error_modal').modal('show');
                }
                else
                {
                  alert(ts.responseText);
                }
              },
             });

      }




    },
    change: function( event, ui ) {},
    minLength:options.minimumlength,
    delay: options.datadelay,
  }).focus(function () {
      if(options.searchonfocus == true)
      {
        $(this).autocomplete("search", "");

      }

    if(options.hasOwnProperty('afterautocompletefocus'))
    {
        options.afterautocompletefocus.call(this);
    }
    if(options.hasOwnProperty('customwidgetclass'))
    {

        $(this).autocomplete( "widget" ).addClass(options.customwidgetclass);

    }
  });




  $(this).on( "autocompleteselect", function( event, ui ) {

      if(options.hasOwnProperty('beforeautocompleteselect'))
      {
          var output = options.beforeautocompleteselect.call(this,ui);
          if(output == false)
          {
              return false;
          }
      }

    var fieldid  = "#"+$(this).attr("id");
    var description = ui.item[options.onselection[fieldid]["setext"]];

    if(options.onselection[fieldid].hasOwnProperty("labellimit") && description.length > options.onselection[fieldid]["labellimit"])
    {
      $(options.onselection[fieldid]["superentity"]).text(description.substring(0,options.onselection[fieldid]["labellimit"]) +"..");

    }
    else {
      $(options.onselection[fieldid]["superentity"]).text(description);

    }

    if(options.onselection[fieldid].hasOwnProperty('hiddenfield'))
    {
      $(options.onselection[fieldid]["hiddenfield"]).val(ui.item[options.onselection[fieldid]["hfuivalue"]])
    }

    // call the callback and apply the scope:

      if(options.hasOwnProperty('afterautocompleteselect'))
      {


        options.afterautocompleteselect.call(this,ui);
      }

  });

  $(this).on( "autocompletechange", function( event, ui ) {

      var fieldid  = "#"+$(this).attr("id");
    if(!(ui.item))
    {
        $(this).val("");
        $(options.onselection[fieldid]["superentity"]).text("");
        if(options.onselection[fieldid].hasOwnProperty('hiddenfield'))
        {
          $(options.onselection[fieldid]["hiddenfield"]).val("");

        }
        $(this).focus();

        if(options.hasOwnProperty('afterautocompletechangevaluenotexist'))
        {

            options.afterautocompletechangevaluenotexist.call(this,ui);
        }



    }
    else if(ui.item) {


      var description = ui.item[options.onselection[fieldid]["setext"]];



      if(options.onselection[fieldid].hasOwnProperty("labellimit") && description.length > options.onselection[fieldid]["labellimit"])
      {
        $(options.onselection[fieldid]["superentity"]).text(description.substring(0,options.onselection[fieldid]["labellimit"]) +"..");

      }
      else {
        $(options.onselection[fieldid]["superentity"]).text(description);

      }


            if(options.onselection[fieldid].hasOwnProperty('hiddenfield'))
            {
              $(options.onselection[fieldid]["hiddenfield"]).val(ui.item[options.onselection[fieldid]["hfuivalue"]]);

            }
    }

    if(options.hasOwnProperty('afterautocompletechange'))
    {

     options.afterautocompletechange.call(this,ui);
    }



  });

  $(this).on( "keyup", function(e) {

      if((options.selectdisabledkeys.indexOf(e.keyCode)) >-1)    {

        return false;
      }
      //
      // if(e.keyCode === 9 || e.keyCode === 16) {
      //   return false;
      // }

    var fieldid  = "#"+$(this).attr("id");
    if((options.onkeyup["erasekeys"].indexOf(e.keyCode)) >-1)
    {
      $(this).val("");
      $(options.onselection[fieldid]["superentity"]).text("");
      if(options.onselection[fieldid].hasOwnProperty('hiddenfield'))
      {
        $(options.onselection[fieldid]["hiddenfield"]).val("");

      }
      $(this).focus();

    }

    if(options.hasOwnProperty('afterkeyup'))
    {

     options.afterkeyup.call();
    }


  });






}

});


//dynamic autocompletetion




jQuery.fn.extend({   // defining a jquery plugin


    dynamicautocompletion: function (options) { // name of the plugin

    var defaults = {datamethod:"fromvariable",slicestart:0,sliceends:200,minimumlength:0,datadelay:100,searchonfocus:false,onkeyup:{"erasekeys":[46]},selectdisabledkeys:[9,16]};
    options = $.extend(defaults, options);  // if a perticular option field  in  corresponding js is given then its default option will not be  considered




      var dynamicautocompleteoptions=[];

      var commonautocompleteoption = {
       autoFocus: true,
    source: function(request, response) {

      if(options.datamethod == "fromvariable" || options.datamethod == "alasql")
       {
         if(options.datamethod == "alasql")
         {


           var data = options.datasourcefromalasql.call(this);
         }
          else{
                 var data = eval(options.datasource);  // find variable corresponding to string given

               }

      var datamap = data.map(function(i) {
      var templabel="";
      for(var x=0;x<options.datalabel.length;x++)
      {
        if(x%2 ==0)
        {
          templabel = templabel + i[options.datalabel[x]];


        }
        else {
          templabel = templabel + options.datalabel[x];

        }
      }

      var tempvalue="";
      for(var x=0;x<options.datavalue.length;x++)
      {
        if(x%2 ==0)
        {
          tempvalue = tempvalue + i[options.datavalue[x]];

        }
        else {
          tempvalue = tempvalue + options.datavalue[x];

        }
      }

      var tempdesc="";
      for(var x=0;x<options.datadesc.length;x++)
      {
        if(x%2 ==0)
        {
          tempdesc = tempdesc + i[options.datadesc[x]];

        }
        else {
          tempdesc = tempdesc + options.datadesc[x];

        }
      }
      var storedinternal = {};
      if(options.hasOwnProperty('internalystored'))
      {
          for(intfield in options.internalystored)
          {
              storedinternal[intfield] = i[options.internalystored[intfield]];
          }
      }
      if(options.hasOwnProperty('datahiddenvalue'))
      {
      var temphidden="";
      for(var x=0;x<options.datahiddenvalue.length;x++)
      {
        if(x%2 ==0)
        {
          temphidden = temphidden + i[options.datahiddenvalue[x]];

        }
        else {
          temphidden = temphidden + options.datahiddenvalue[x];

        }
      }



      return {label:templabel,value:tempvalue,desc:tempdesc,gid:temphidden,internalystored:storedinternal};
      }

      return {label:templabel,value:tempvalue,desc:tempdesc,internalystored:storedinternal};

      });

      var key = request.term;
      datamap = datamap.filter(function(i) {
        if(!(isNaN(key)))
        {
          return i.label.split("-")[0].toLowerCase().indexOf(key.toLowerCase()) >= 0;


        }
        else {
          return i.label.toLowerCase().indexOf(key.toLowerCase()) >= 0;

        }

      });

      response(datamap.slice(options.slicestart,options.sliceends));
    }



    },
    change: function( event, ui ) {},
    minLength:options.minimumlength,
    delay: options.datadelay,
  };

var ac_fields ="";
var loop =0;
  for(opts in options.onselection)
     {
      if(loop ==0)
      {

       ac_fields = options.onselection[opts]["tdclass"];

      }
      else
      {
          ac_fields = ac_fields +', '+ options.onselection[opts]["tdclass"];

      }
       dynamicautocompleteoptions[options.onselection[opts]["tdclass"]] = commonautocompleteoption;

        loop = loop+ 1;
    }







//fix it





$(document).on('focus',ac_fields,function(){
  var table = "#"+$(this).closest('table').attr("id");
  var dynamicautocompletewidget;
   if(options.searchonfocus == true)
   {
    dynamicautocompletewidget =$(this).autocomplete(dynamicautocompleteoptions[options.onselection[table]["tdclass"]]).focus(function () {
       $(this).autocomplete("search", "");
    });
   }
   else {

      dynamicautocompletewidget = $(this).autocomplete(dynamicautocompleteoptions[options.onselection[table]["tdclass"]]);
     }

     if(options.hasOwnProperty('customwidgetclass'))
     {
         $(this).autocomplete( "widget").addClass(options.customwidgetclass);
     }

});




$(document).on("autocompleteselect",ac_fields,function( event, ui ) {

    if(options.hasOwnProperty('beforeautocompleteselect'))
    {
        var output = options.beforeautocompleteselect.call(this,ui);
        if(output == false)
        {
            return false;
        }
    }
    var row = $(this).closest('tr');
    var table = "#"+$(this).closest('table').attr("id");

   if(options.selectdisabledkeys.indexOf(event.keyCode) > -1){
    return false;

  }


  var superentityfield = row.find(options.onselection[table]["superentity"]);

  var description = ui.item[options.onselection[table]["setext"]];
  if(superentityfield[0].tagName =="INPUT")
  {

      if(options.onselection[table].hasOwnProperty("labellimit") && description.length > options.onselection[fieldid]["labellimit"])
      {
        superentityfield.val(description.substring(0,options.onselection[table]["labellimit"]) +"..");

      }
      else {
        superentityfield.val(description);

      }

  }
  else
  {

    if(options.onselection[table].hasOwnProperty("labellimit") && description.length > options.onselection[fieldid]["labellimit"])
    {
      superentityfield.text(description.substring(0,options.onselection[fieldid]["labellimit"]) +"..");

    }
    else {
      superentityfield.text(description);

    }


  }

    if(options.onselection[table].hasOwnProperty('hiddenfield'))
      {
        row.find(options.onselection[table]["hiddenfield"]).val(ui.item[options.onselection[table]["hfuivalue"]]);

      }

      if(options.hasOwnProperty('afterautocompleteselect'))
      {

        options.afterautocompleteselect.call(this,ui);

      }
   });



$(document).on("autocompletechange",ac_fields,function( event, ui ) {

    var row = $(this).closest('tr');
    var table = "#"+$(this).closest('table').attr("id");
  superentityfield = $(event.target).closest('tr').find(options.onselection[table]["superentity"]);

  if (!(ui.item)){
        event.target.value = "";

         setsuperentityfield(superentityfield,"");
        if(options.onselection[table].hasOwnProperty('hiddenfield'))
        {
         row.find(options.onselection[table]["hiddenfield"]).val("");

        }

        $(this).focus();

        if(options.hasOwnProperty('afterautocompletechangevaluenotexist'))
        {

         options.afterautocompletechangevaluenotexist.call(this,ui);
        }

      }
      else if(ui.item) {

          if(options.onselection[table].hasOwnProperty('hiddenfield'))
           {
            row.find(options.onselection[table]["hiddenfield"]).val(ui.item[options.onselection[table]["hfuivalue"]]);

          }


            var description = ui.item[options.onselection[table]["setext"]];
            if(options.onselection[table].hasOwnProperty("labellimit") && description.length > options.onselection[fieldid]["labellimit"])
            {
                setsuperentityfield(superentityfield,description.substring(0,options.onselection[fieldid]["labellimit"]) +"..");
            }
            else {
              setsuperentityfield(superentityfield,description);

            }


         }

         if(options.hasOwnProperty('afterautocompletechange'))
         {

           options.afterautocompletechange.call(this,ui);
         }
     });


$(document).on( "keyup",ac_fields,function(e) {



  var row = $(this).closest('tr');
  var table = "#"+$(this).closest('table').attr("id");
  if(options.selectdisabledkeys.indexOf(e.keyCode) > -1){
  // if(e.keyCode === 9 || e.keyCode === 16) {
    return false;

  }


  //clear field on delete and backspace
  if(options.onkeyup["erasekeys"].indexOf(e.keyCode) > -1) {

     $(this).val("");
     superentityfield = row.find(options.onselection[table]["superentity"]);
     setsuperentityfield(superentityfield,"");

      if(options.onselection[table].hasOwnProperty('hiddenfield'))
      {

        row.find(options.onselection[table]["hiddenfield"]).val("");
      }


      $(this).focus();

   }
   if(options.hasOwnProperty('afterkeyup'))
   {

     options.afterkeyup.call(this);

   }

  });

 }

});




function setsuperentityfield(superentityfield,value) {


   if(superentityfield[0].tagName == "INPUT")
           {

              superentityfield.val(value);
           }
           else
           {
                superentityfield.text(value);
           }

}




jQuery.fn.extend({   // defining a jquery plugin


    enableshortcuts: function (options) { // name of the plugin

      var defaults = {duprowkey:82,dupfieldkey:67,newrowkey:187, newrowalternatekey:107,deleterowkey:189,shortcuttriggerclass:".form-control"};

     options = $.extend(defaults, options);  // if a perticular option field  in  corresponding js is given then its default option will not be  considered

     if(options.hasOwnProperty('jstable'))
     {
             var tablescope = document;
     }
     else {
              var tablescope = this;
     }

    $(tablescope).on( "keyup",options.shortcuttriggerclass,function(e) {


  if((e.altKey && e.keyCode == options.newrowkey) || (e.altKey && e.keyCode == options.newrowalternatekey)){


     var table = "#"+$(this).closest('table').attr("id");
     console.log("SAJARAS",table);
    $(options.tables[table]["plusbutton"]).trigger('click');

    $(this).closest('tbody').find('tr:last td').eq(options.tables[table]["focuscolindex"]).find('input:not(".autocomplete-display")').focus();


 }

 else if(e.altKey && e.keyCode == options.deleterowkey){
     var table = "#"+$(this).closest('table').attr("id");
   var row = $(this).closest('tr');
   var prevrow = row.prev();
   var namefield = options.tables[table]["checkboxname"];

   row.find('input[name='+namefield+'\\[\\]]').prop('checked', true);
  $(options.tables[table]["minusbutton"]).trigger('click');
    // row.remove();
    prevrow.find('td').eq(options.tables[table]["focuscolindex"]).find('input:not(".autocomplete-display")').focus();
 }

 else if(e.altKey && e.keyCode == options.duprowkey){
      var table = "#"+$(this).closest('table').attr("id");
      var  row = $(this).closest('tr');
      var clone = row.clone();
    if(options.tables[table].hasOwnProperty('duprowavoidcols'))
    {
        if(Array.isArray(options.tables[table]["duprowavoidcols"]))
        {
            var avoidcols = options.tables[table]["duprowavoidcols"];
            for(eachfield in avoidcols)
            {
                clone.find(avoidcols[eachfield]).val("");
                clone.find(avoidcols[eachfield]).text("");
            }
        }
        else {
            clone.find(options.tables[table]["duprowavoidcols"]).val("");
            clone.find(options.tables[table]["duprowavoidcols"]).text("");

        }

        if(options.tables[table].hasOwnProperty('addnotrequired'))
        {
            clone.find(options.tables[table]["duprowavoidcols"]).addClass("notrequired");
        }


    }

    var clonecheckboxrandomid = "customCheck_" + randomid();
    clone.find('.custom-checkbox .rowcheckbox').attr("id",clonecheckboxrandomid);
    clone.find('.custom-checkbox .custom-control-label').attr("for",clonecheckboxrandomid);


    var newrow = row.after(clone);
      row.next().find('td').eq(options.tables[table]["focuscolindex"]).find('input:not(".autocomplete-display")').focus();

      if(options.hasOwnProperty('afterduplicatingrow'))
      {
          options.afterduplicatingrow.call(this);
      }
 }

  else if(e.altKey && e.keyCode == options.dupfieldkey){
      var col =$(this).closest('td');

       var colummnno = col.parent().children().index(col);

      var  prevrow = $(this).closest('tr').prev();
      val = prevrow.find('td').eq(colummnno).find('input').val();
      $(this).val(val);
      // $(this).trigger('autocompleteselect');

    }

  });

 }

});
