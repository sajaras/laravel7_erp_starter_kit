function IsValidJSONString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

var globalhighlight=null;



jQuery.fn.extend({

    adddata2: function (options) {
        var optiondefaults = {callfilldata:true,data:"",formtype:"static",showaddmodalbutton:"#addbutton",eventlockurlbase:"/acesslock/",haseventlock:false,eventlockname:'',eventreleaselockurlbase:"/releaselock/",addtableid:"",tableid:"#thispagetable",clusterisedatavariable:"finaltable",$serverside_confirmationmodal_body:"#serverside_confirmationmodal_body",$onyestriggerbuttonid:"#onyestriggerbuttonid",$serverside_confirmedvalue:"#serverside_confirmedvalue",$serverside_confirmationmodal_heading:"#serverside_confirmationmodal_heading",$serverside_confirmationmodal:"#serverside_confirmationmodal",eventtype:'click',eventelement:"#saveandexitbutton ,#saveandnextbutton",error403heading:'Constraint Violation',lockbuttons:['#saveandexitbutton','#saveandnextbutton'],modalid:"#addmodal",formid:"#thisform",type:"post",method:"post",showloader:true,loaderid:"#addmodalloader",searchboxfield:"#tablesearchbox",clickedbutton:"",disableclickedbutton:true};
        options = $.extend(optiondefaults, options);



           $(document).on(options.eventtype,options.eventelement,function(event)
           {

               if(options.hasOwnProperty('beforerequest'))
               {
                   $ret = options.beforerequest.call($(this));

                   if($ret == false)
                   {
                       return false;
                   }
               }

               var $currentmodal = $(options.modalid);
               var $clickbutton = $(this);
               var searchboxval =  $(options.searchboxfield).val();
               if(options.disableclickedbutton == true)
               {
                   locksavebuttons({buttons:options.lockbuttons});


               }
               if(options.showloader == true)
               {

                   startloader($(options.loaderid));

               }
               var addform = $(options.formid)[0];
               var formdata = new FormData(addform);

               if(options.hasOwnProperty('appendtoform'))
               {
                   formdata = options.appendtoform.call($(this),formdata);
                   if(formdata == false)
                   {
                       return false;
                   }
               }


                  if($(options.$serverside_confirmedvalue).val() == 1)
                  {
                      formdata.append("confirmed","1");
                  }

                  $(options.$serverside_confirmedvalue).val('');

               formdata.append("_method",options.method);
               formdata.append('haseventlock',options.haseventlock);
               formdata.append("releaselock",1);







               $.ajax({
                 url:options.url,
                 type:options.type,
                 data:formdata,
                 processData: false,
                 contentType: false,
                 success:function(data)
                 {
                     console.log("adddata2 =",data);

                     if(data.hasOwnProperty('confirmation_needed') && data.confirmation_needed == 1)
                     {
                         $(options.$onyestriggerbuttonid).val($clickbutton.attr("id"));
                         $(options.$serverside_confirmationmodal_body).html(data.confirmationhtml);
                         $(options.$serverside_confirmationmodal).modal('show');
                     }

                     var datasettings = options.data;


                     if(options.disableclickedbutton == true)
                     {

                         unlocksavebuttons({buttons:options.lockbuttons});

                     }

                     if(options.showloader == true)
                     {

                         stoploader($(options.loaderid));

                     }

                     if(data.hasOwnProperty('databaseerror'))
                     {
                         erp_toaster({textColor:"white",bgColor:'indian-red',icon:'error','heading':options.databaserrorheading,text:data.databaseerror,hideAfter:3000});
                         return false;
                     }

                     if(options.hasOwnProperty('success_startofajaxreturn'))
                     {

                         if(options.success_startofajaxreturn.call($clickbutton,data)== false)
                         {
                             return false;
                         }

                     }



                      if(data.success)
                      {
                          if(data.hasOwnProperty('successtoast'))
                          {
                              erp_toaster(data.successtoast);

                          }
                          if(options.callfilldata)
                          {
                              globalhighlight = data.highlight;
                              filldata(highlighter);

                          }


                        if($clickbutton.hasClass('exitmodal'))
                        {
                            $currentmodal.modal('hide');
                            if(options.haseventlock == true)
                            {

                                $.get(options.eventreleaselockurlbase + options.eventlockname)
                                // $.get('/releaselocksinpage');

                            }

                        }

                        if(options.formtype == "static")
                        {

                                for(keyfield in datasettings)
                                {
                                    if(datasettings[keyfield].clear == true )
                                    {
                                        $(datasettings[keyfield].valuefield).val("");
                                        $(datasettings[keyfield].errorfield).text("");

                                        if(datasettings[keyfield].hasOwnProperty('hiddenfield'))
                                        {
                                            $(datasettings[keyfield].hiddenfield).val("");
                                            $(datasettings[keyfield].hiddenfield).text("");

                                        }
                                        $(datasettings[keyfield].hiddenfielddisplay).text("");
                                        $(datasettings[keyfield].hiddenfielddisplay).val("");


                                    }

                                }
                        }





                      }
                      else if(data.errors)
                      {
                          if(data.hasOwnProperty('errortoast'))
                          {
                              erp_toaster(data.errortoast);
                          }
                          if(options.formtype =="static")
                          {

                               for (key in data.errors)
                               {
                                        var currentkey= String(key);
                                        $(datasettings[currentkey].errorfield).text(data.errors[key][0]);


                               }
                          }

                       }
                       if(options.hasOwnProperty('success_endofajaxreturn'))
                       {

                           options.success_endofajaxreturn.call($clickbutton,data);

                       }

                 },

                 error:function(ts){

                     if(options.hasOwnProperty('error_startofajaxreturn'))
                     {

                         options.error_startofajaxreturn.call($clickbutton,ts);

                     }

                     if(options.disableclickedbutton == true)
                     {

                         unlocksavebuttons({buttons:options.lockbuttons});

                     }
                     if(options.showloader == true)
                     {

                         stoploader($(options.loaderid));

                     }

                     if(ts.status ==403)
                     {

                         var responseText =JSON.parse(ts.responseText);
                         if(IsValidJSONString(responseText.message))
                         {
                                 var message = JSON.parse(responseText.message);
                             if(message.hasOwnProperty('heading'))
                             {
                                 erp_errortoaster({heading:message.heading,text:message.text,bgColor:"#7b2f30",textColor:'white'});
                             }
                             else {
                                 console.log("403message=>",JSON.parse(responseText.message));
                                 erp_errortoaster({bgColor:"#7b2f30",textColor:'white','heading':'Testing',text:[responseText.message]});

                             }


                         }
                         else {

                             erp_toaster({bgColor:"#7b2f30",textColor:'white','heading':options.error403heading,text:[responseText.message]});
                         }

                     }
                     else if(ts.status == 401)
                     {
                         window.location.href = "/login"
                     }
                     else
                     {
                         alert(ts.responseText);
                     }

                     if(options.hasOwnProperty('error_endofajaxreturn'))
                     {

                         options.error_endofajaxreturn.call($clickbutton,ts);

                     }

                 },





           });

           });

           $(options.modalid).on("hidden.bs.modal", function ()
           {
               if(options.hasOwnProperty('beforemodalclosing'))
               {
                   options.beforemodalclosing.call($(this));
               }

               var datasettings  = options.data;

               clearformfields(datasettings);
               // for(keyfield in datasettings)
               // {
               //
               //         $(datasettings[keyfield].valuefield).val("");
               //         $(datasettings[keyfield].errorfield).text("");
               //
               //         if(datasettings[keyfield].hasOwnProperty('hiddenfield'))
               //         {
               //             $(datasettings[keyfield].hiddenfield).val("");
               //             $(datasettings[keyfield].hiddenfield).text("");
               //             $(datasettings[keyfield].hiddenfielddisplay).text("");
               //             $(datasettings[keyfield].hiddenfielddisplay).val("");
               //
               //         }
               //
               //
               //
               //
               // }

               if(options.haseventlock == true)
               {
                   if(options.eventlockname !="")
                   {

                       var url = options.eventreleaselockurlbase + options.eventlockname;
                       $.get(url);

                   }
                   else {
                       erp_toaster({heading:'event lock name not mentioned',text:['error']});
                   }



               }

               if(options.hasOwnProperty('aftermodalclosing'))
               {
                   options.aftermodalclosing.call($(this));
               }


            });

            $(document).on('click',options.showaddmodalbutton,function()
            {

                if(options.hasOwnProperty('beforemodalshowing'))
                {
                    if(options.beforemodalshowing.call($(this)) == false)
                    {
                            return false;
                    }

                }



                if(options.haseventlock == true)
                {
                    if(options.eventlockname !="")
                    {

                        var url = options.eventlockurlbase + options.eventlockname;
                        $.get(url,function(data){
                            if(data ==1)
                            {

                                $(options.modalid).modal('show');
                            }
                            else
                            {

                                $(options.modalid).modal('hide');
                                erp_toaster({heading:'Event Already in Use',text:['This event is in use by someone in your unit.please wait till the lock has been released']});
                            }
                        }).fail(function(ts)
                        {
                                    alert( ts.responseText );
                        });

                    }
                }
                else
                {
                    $(options.modalid).modal('show');
                }

                if(options.hasOwnProperty('aftermodalshowing'))
                {
                    options.aftermodalshowing.call($(this));
                }

            });


            if(options.hasOwnProperty('tracktotal'))
            {
                var tracktotalsettings = options.tracktotal;
                $(document).on(tracktotalsettings.event,Object.keys(tracktotalsettings.fields).join(", "),function(){

                    var $addtabletbody = $(options.addtableid).find('tbody');
                    var totalarray = {};
                    var totalfindelements = Object.keys(tracktotalsettings.fields);
                    for(keyfield in totalfindelements )
                    {
                        totalarray[totalfindelements[keyfield]] = 0;
                    }

                    var value;
                    $addtabletbody.find('tr').each(function () {
                        $currentrow = $(this);
                        for(k in totalarray)
                        {
                            value = $currentrow.find(k).val();
                            if(!isNaN(value) && value !="")
                            {
                                totalarray[k] = totalarray[k] + parseFloat(value);

                            }
                        }

                    });


                    for(k in totalarray)
                    {
                        $(tracktotalsettings.fields[k]).text("Rs "+ round(totalarray[k],options.tracktotal.rounddecimalplaces));
                    }

                   if(options.hasOwnProperty('aftertracktotal'))
                   {
                           options.aftertracktotal.call($(this),totalarray);
                   }



                });
            }




    }

});


function clearformfields(datasettings) {
    for(keyfield in datasettings)
    {

            $(datasettings[keyfield].valuefield).val("");
            $(datasettings[keyfield].errorfield).text("");

            if(datasettings[keyfield].hasOwnProperty('hiddenfield'))
            {
                $(datasettings[keyfield].hiddenfield).val("");
                $(datasettings[keyfield].hiddenfield).text("");
                $(datasettings[keyfield].hiddenfielddisplay).text("");
                $(datasettings[keyfield].hiddenfielddisplay).val("");

            }




    }
}
function clearonlyerrorfields(datasettings) {
    for(keyfield in datasettings)
    {

            $(datasettings[keyfield].errorfield).text("");

    }




}

jQuery.fn.extend({


    updatedata2: function (options) {
        var optiondefaults = {rowlock:true,releaserowlockurl:"/releaserowlock/",editing_gid:"#editing_gid",tableid:"#thispagetable",clusterisedatavariable:"finaltable",$serverside_confirmationmodal_body:"#serverside_confirmationmodal_body",$onyestriggerbuttonid:"#onyestriggerbuttonid",$serverside_confirmedvalue:"#serverside_confirmedvalue",$serverside_confirmationmodal_heading:"#serverside_confirmationmodal_heading",$serverside_confirmationmodal:"#serverside_confirmationmodal",eventtype:'click',eventelement:"#updatebutton",error403heading:'Constraint Violation',lockbuttons:['#updatebutton','#deletebutton'],modalid:"#editmodal",formid:"#thiseditform",type:"post",method:"put",showloader:true,loaderid:"#editmodalloader",searchboxfield:"#tablesearchbox",clickedbutton:"",disableclickedbutton:true};
        options = $.extend(optiondefaults, options);



           $(document).on(options.eventtype,options.eventelement,function(event)
           {


                   if(options.hasOwnProperty('beforerequest'))
                   {
                       $ret = options.beforerequest.call($(this));
                       if($ret == false)
                       {
                           return false;
                       }
                   }

                   var $currentmodal = $(options.modalid);
                   var $clickbutton = $(this);
                   var searchboxval =  $(options.searchboxfield).val();
                   if(options.disableclickedbutton == true)
                   {
                       locksavebuttons({buttons:options.lockbuttons});

                   }
                   if(options.showloader == true)
                   {

                       startloader($(options.loaderid));

                   }
                       if(options.hasOwnProperty('data'))
                       {
                           clearonlyerrorfields(options.data);
                       }
                       var editform = $(options.formid)[0];
                       var formdata = new FormData(editform);
                       if(options.hasOwnProperty('appendtoform'))
                       {
                           formdata = options.appendtoform.call($(this),formdata);
                           if(formdata == false)
                           {
                               return false;
                           }
                       }

                   formdata.append("_method",options.method);
                   var url = options.url +"/" + $currentmodal.find(options.editing_gid).val();

                   if($(options.$serverside_confirmedvalue).val() == 1)
                   {
                       formdata.append("confirmed","1");
                   }
                     $(options.$serverside_confirmedvalue).val('');

                   $.ajax({
                     url:url,
                     type:options.type,
                     data:formdata,
                     processData: false,
                     contentType: false,
                     success:function(data)
                     {
                        console.log("updatedata2 =",data);



                        if(data.hasOwnProperty('confirmation_needed') && data.confirmation_needed == 1)
                        {
                            $(options.$onyestriggerbuttonid).val($clickbutton.attr("id"));
                            $(options.$serverside_confirmationmodal_body).html(data.confirmationhtml);
                            $(options.$serverside_confirmationmodal).modal('show');
                        }

                        var datasettings = options.data;
                        if(options.disableclickedbutton == true)
                        {

                            unlocksavebuttons({buttons:options.lockbuttons});

                        }
                        if(options.showloader == true)
                        {

                            stoploader($(options.loaderid));

                        }

                        if(data.hasOwnProperty('databaseerror'))
                        {
                            erp_toaster({textColor:"white",bgColor:'indian-red',icon:'error','heading':options.databaserrorheading,text:data.databaseerror});
                            return false;
                        }

                        if(options.hasOwnProperty('success_startofajaxreturn'))
                        {

                            if(options.success_startofajaxreturn.call($clickbutton,data)== false)
                            {
                                return false;
                            }

                        }

                        if(data.success)
                        {
                            if(data.hasOwnProperty('successtoast'))
                            {
                                erp_toaster(data.successtoast);

                            }

                            globalhighlight = data.highlight;
                            filldata(highlighter);


                            if($clickbutton.hasClass('exitmodal'))
                            {
                                $currentmodal.modal('hide');
                                if(options.releaselockinpage)
                                {
                                    $.get('/releaselocksinpage');

                                }

                            }

                        }

                        else if(data.errors)
                        {
                            if(data.hasOwnProperty('errortoast'))
                            {
                                erp_toaster(data.errortoast);
                            }

                            for (key in data.errors)
                            {
                                var currentkey= String(key);
                                $(datasettings[currentkey].errorfield).text(data.errors[key][0]);


                            }

                        }
                        if(options.hasOwnProperty('success_endofajaxreturn'))
                        {

                            options.success_endofajaxreturn.call($clickbutton,data);

                        }
                    },

                     error:function(ts){

                         if(options.hasOwnProperty('error_startofajaxreturn'))
                         {

                             options.error_startofajaxreturn.call($clickbutton,data);

                         }

                         if(options.disableclickedbutton == true)
                         {

                             unlocksavebuttons({buttons:options.lockbuttons});

                         }
                         if(options.showloader == true)
                         {

                             stoploader($(options.loaderid));

                         }

                         if(ts.status ==403)
                         {


                                 var responseText =JSON.parse(ts.responseText);

                                 if(IsValidJSONString(responseText.message))
                                 {
                                         var message = JSON.parse(responseText.message);
                                     if(message.hasOwnProperty('heading'))
                                     {
                                         erp_errortoaster({heading:message.heading,text:message.text,bgColor:"#7b2f30",textColor:'white'});
                                     }
                                     else {
                                         console.log("403message=>",JSON.parse(responseText.message));
                                         erp_errortoaster({bgColor:"#7b2f30",textColor:'white','heading':'Testing',text:[responseText.message]});

                                     }


                                 }
                                 else {

                                     erp_toaster({bgColor:"#7b2f30",textColor:'white','heading':options.error403heading,text:[responseText.message]});
                                 }



                         }
                         else if(ts.status == 401)
                         {
                             window.location.href = "/login"
                         }
                         else
                         {
                             alert(ts.responseText);
                         }

                         if(options.hasOwnProperty('error_endofajaxreturn'))
                         {

                             options.error_endofajaxreturn.call($clickbutton,data);

                         }

                     },





               });




           });

           $(options.modalid).on("hidden.bs.modal", function ()
           {
               if(options.hasOwnProperty('beforemodalclosing'))
               {
                   options.beforemodalclosing.call($(this));
               }

               var datasettings  = options.data;

               clearformfields(datasettings);
               if(options.rowlock)
               {
                       releaserowlock(options.releaserowlockurl,$(options.modalid).find(options.editing_gid).val());
               }



           });
    }

});


function releaserowlock(releaserowlockurl,rowgid)
{
        var url = releaserowlockurl +rowgid;
        $.get(url,function(data){
                console.log(data);
        });

}


jQuery.fn.extend({

    setdatatoeditmodal2: function (options) {

        var defaults = {staticurl:false,nonnumericprimarykey:false,rowlockbaseurl:"/acessrowlock/",deleting_gid:"#deleting_gid",showmodal:true,modalid:"#editmodal",fromtype:"json",eventtype:"dblclick",eventelement:".thisrow",editing_gid:"#editing_gid",loader:"",entity:'',highlightenrow:'.highlighten'};
        options = $.extend(defaults, options);

        $(document).on(options.eventtype,options.eventelement,function(){

            $currentmodal = $(options.modalid);
            var $currentgid = $(this).closest('tr').find(options.rowgidfield).val();

            if(options.hasOwnProperty('before'))
            {
                options.before.call($(this));
            }



            if(options.fromtype == "json")
            {



                var jsondata = eval(options.datasource);;
                console.log("Data Source - ",jsondata);
                console.log("Current Gid - ",$currentgid);
                $gidvalue = options.nonnumericprimarykey?$currentgid:parseInt($currentgid);
                var currentdata = alasql("select * from ? where " + options.datagidcolumn+" = ?",[jsondata,$gidvalue]);
                console.log("Current Data - ",currentdata);
                if(currentdata.length == 0)
                {
                    erp_toaster({'heading':'Data Not Found',icon:'error',bgColor:'indian-red',textColor:"white;",text:[]})
                    return false;
                }

                if(options.formtype == "simple")
                {

                    currentdata = currentdata[0];
                    $currentmodal.find(options.editing_gid).val(currentdata[options.modalgidcolumn]);
                    $currentmodal.find(options.deleting_gid).val($currentgid);

                    var url = options.rowlockbaseurl + currentdata[options.modalgidcolumn];
                    $.get(url,function(data)
                    {
                        if(data==1)
                        {
                            for(eachwebelement in options.set)
                            {
                                if(options.set[eachwebelement].hasOwnProperty('type') && options.set[eachwebelement].type == 'text')
                                {
                                    $currentmodal.find(options.set[eachwebelement].element).text(currentdata[options.set[eachwebelement].datacolumn]);

                                }
                                else
                                {
                                    $currentmodal.find(options.set[eachwebelement].element).val(currentdata[options.set[eachwebelement].datacolumn]);
                                }
                            }

                            if(options.showmodal == true)
                            {

                                $currentmodal.modal('show');

                            }

                            if(options.hasOwnProperty('after'))
                            {
                                options.after.call($(this),currentdata);
                            }


                        }
                        else
                        {
                                erp_toaster({heading:'Data Being Edited',text:['This record is being edited by someone in your unit.please wait till the lock has been released.']});
                        }

                    });



                }
                else {
                    currentdata = currentdata[0];
                    $currentmodal.find(options.editing_gid).val(currentdata[options.modalgidcolumn]);
                    $currentmodal.find(options.deleting_gid).val($currentgid);
                    if(options.hasOwnProperty('after'))
                    {
                        options.after.call($(this),currentdata);
                    }
                }




            }
            else if(options.fromtype == "ajax")
            {
                var $clickedelement = $(this);
                var $currentgidenc = $(this).closest('tr').find(options.enc_field).val();
                var $currentgid = $(this).closest('tr').find(options.rowgidfield).val();
                $currentmodal.find(options.editing_gid).val($currentgidenc);
                $currentmodal.find(options.deleting_gid).val($currentgid);
                if(options.staticurl == true)
                {
                    options.ajaxsettings.url =options.ajaxsettings.baseurl ;

                }
                else {

                    options.ajaxsettings.url =options.ajaxsettings.baseurl + "/" + $currentgidenc + "/edit";
                }
                startloader(options.loader);
                if(options.hasOwnProperty('appenddatatoajax'))
                {
                    options.ajaxsettings.data = options.appenddatatoajax.call($clickedelement);

                }
                ajax_request_formless(options.ajaxsettings,function(data)
                {

                    stoploader(options.loader);
                    if(data.usingby)
                    {
                        erp_toaster({'heading':'Being Edited',text:['This '+ options.entity+' is being edited by ' + data.usingby + '.Please try after some time']});
                    }
                    if(options.hasOwnProperty('after'))
                    {
                        options.after.call($clickedelement,data);
                    }
                });


            }



        });

        $(document).on('click',options.highlightenrow+' '+options.eventelement,function() {

            $(this).closest(options.highlightenrow).removeClass(options.highlightenrow.slice(1));
        });


        if(options.hasOwnProperty('tracktotal'))
        {
            var tracktotalsettings = options.tracktotal;
            $(document).on(tracktotalsettings.event,Object.keys(tracktotalsettings.fields).join(", "),function(){

                var $edittabletbody = $(options.edittableid).find('tbody');
                var totalarray = {};
                var totalfindelements = Object.keys(tracktotalsettings.fields);
                for(keyfield in totalfindelements )
                {
                    totalarray[totalfindelements[keyfield]] = 0;
                }

                var value;
                $edittabletbody.find('tr').each(function () {
                    $currentrow = $(this);
                    for(k in totalarray)
                    {
                        value = $currentrow.find(k).val();
                        if(!isNaN(value) && value !="")
                        {
                            totalarray[k] = totalarray[k] + parseFloat(value);

                        }
                    }

                });


                for(k in totalarray)
                {
                    $(tracktotalsettings.fields[k]).text("Rs "+ round(totalarray[k],options.tracktotal.rounddecimalplaces));
                }

               if(options.hasOwnProperty('aftertracktotal'))
               {
                       options.aftertracktotal.call($(this),totalarray);
               }



            });
        }




      }

});



jQuery.fn.extend({

    deletedata2: function (options) {
        var optiondefaults = {clientside_confirmationmodal_nodecline:"#clientside_confirmationmodal_nodecline",clientside_confirmationmodal_yesproceed:"#clientside_confirmationmodal_yesproceed",clientside_confirmationmodal:"#clientside_confirmationmodal",clientside_confirmationbody_ul:".clientside_confirmationbody_ul",formid:"#deleteform",$serverside_confirmationmodal_body:"#serverside_confirmationmodal_body",$onyestriggerbuttonid:"#onyestriggerbuttonid",$serverside_confirmedvalue:"#serverside_confirmedvalue",$serverside_confirmationmodal_heading:"#serverside_confirmationmodal_heading",$serverside_confirmationmodal:"#serverside_confirmationmodal",deleting_gid:"#deleting_gid",editing_gid:"#editing_gid",eventtype:'click',eventelement:"#deletebutton",databaserrorheading:'Constraint Violation',lockbuttons:["#updatebutton","#deletebutton","#editmodal_exit"],modalid:"#editmodal",type:"post",method:"delete",showloader:true,loaderid:"#editmodalloader",searchboxfield:"#tablesearchbox",clickedbutton:"",disableclickedbutton:true,nonnumericprimarykey:false};
        options = $.extend(optiondefaults, options);

        $(document).on(options.eventtype,options.eventelement,function () {

            if(options.hasOwnProperty('customdisplayconfirmation'))
            {
                options.customdisplayconfirmation.call($(this));
            }
            else {

                $currentgid = $(options.deleting_gid).val();
                var jsondata = eval(options.datasource);
                $gidvalue = options.nonnumericprimarykey?$currentgid:parseInt($currentgid);
                var currentdata = alasql("select * from ? where " + options.datagidcolumn+" = ?",[jsondata,$gidvalue]);
                console.log("IN DELETE",currentdata);
                if(options.hasOwnProperty('beforedeleteconfirmpopup'))
                {
                        var out = options.beforedeleteconfirmpopup.call(this,currentdata);
                        if(out == false)
                        {
                                return false;
                        }
                }
                if(currentdata.length == 0)
                {
                    erp_toaster({'heading':'Data Not Found',icon:'error',bgColor:'indian-red',textColor:"white;",text:[]})
                    return false;
                }
                else {
                    currentdata = currentdata[0];

                        var confirmbox = $(options.clientside_confirmationbody_ul);
                        var html = [];
                        for(keydatafields in options.confirmboxdisplaydatafields)
                        {

                            html.push("<li class='list-group-item'>"+  options.confirmboxdisplaydatafields[keydatafields]  + ' : ' + currentdata[keydatafields]  +"</li>");
                        }

                        confirmbox.html(html.join(""));

                        $(options.clientside_confirmationmodal).modal('show');
                        if(options.hasOwnProperty('displaymoreinformations'))
                        {
                                options.displaymoreinformations.call(this,currentdata);
                        }



                }


            }





        });

           $(document).on(options.eventtype,options.clientside_confirmationmodal_yesproceed,function(event)
           {

               $(options.clientside_confirmationmodal).modal('hide');


               if(options.hasOwnProperty('beforerequest'))
               {
                   $ret = options.beforerequest.call($(this));
                   if($ret == false)
                   {
                       return false;
                   }
               }

               var $currentmodal = $(options.modalid);
               var $clickbutton = $(this);
               var searchboxval =  $(options.searchboxfield).val();
               if(options.disableclickedbutton == true)
               {
                   locksavebuttons({buttons:options.lockbuttons});

               }
               if(options.showloader == true)
               {

                   startloader($(options.loaderid));

               }



                   var deleteform = $(options.formid)[0];
                   var formdata = new FormData(deleteform);
                   if(options.hasOwnProperty('appendtoform'))
                   {
                       formdata = options.appendtoform.call($(this),formdata);
                       if(formdata == false)
                       {
                           return false;
                       }
                   }

               formdata.append("_method",options.method);
               var url = options.url +"/" + $currentmodal.find(options.editing_gid).val();

               if($(options.$serverside_confirmedvalue).val() == 1)
               {
                   formdata.append("confirmed","1");
               }
                 $(options.$serverside_confirmedvalue).val('');

               $.ajax({
                 url:url,
                 type:options.type,
                 data:formdata,
                 processData: false,
                 contentType: false,
                 success:function(data)
                 {

                    console.log("deletedata2 =",data);


                    if(data.hasOwnProperty('confirmation_needed') && data.confirmation_needed == 1)
                    {
                        $(options.$onyestriggerbuttonid).val($clickbutton.attr("id"));
                        $(options.$serverside_confirmationmodal_body).html(data.confirmationhtml);
                        $(options.$serverside_confirmationmodal).modal('show');
                    }

                    var datasettings = options.data;
                    if(options.disableclickedbutton == true)
                    {

                        unlocksavebuttons({buttons:options.lockbuttons});

                    }
                    if(options.showloader == true)
                    {

                        stoploader($(options.loaderid));

                    }
                    if(data.hasOwnProperty('databaseerror'))
                    {
                        erp_toaster({textColor:"white",bgColor:'indian-red',icon:'error','heading':options.databaserrorheading,text:data.databaseerror});
                        return false;
                    }

                    if(options.hasOwnProperty('success_startofajaxreturn'))
                    {

                        if(options.success_startofajaxreturn.call($clickbutton,data)== false)
                        {
                            return false;
                        }

                    }

                    if(data.success)
                    {
                        if(data.hasOwnProperty('successtoast'))
                        {
                            erp_toaster(data.successtoast);

                        }
                        filldata();
                        $currentmodal.modal('hide');





                    }

                    else if(data.errors)
                    {
                        if(data.hasOwnProperty('errortoast'))
                        {
                            erp_toaster(data.errortoast);
                        }

                    }
                    if(options.hasOwnProperty('success_endofajaxreturn'))
                    {

                        options.success_endofajaxreturn.call($clickbutton,data);

                    }
                },

                 error:function(ts){

                     if(options.hasOwnProperty('error_startofajaxreturn'))
                     {

                         options.error_startofajaxreturn.call($clickbutton,data);

                     }

                     if(options.disableclickedbutton == true)
                     {

                         unlocksavebuttons({buttons:options.lockbuttons});

                     }

                     if(options.showloader == true)
                     {

                         stoploader($(options.loaderid));

                     }

                     if(ts.status ==403)
                     {

                         var responseText =JSON.parse(ts.responseText);
                         if(IsValidJSONString(responseText.message))
                         {
                             var message = JSON.parse(responseText.message);
                             erp_toaster({heading:message.heading,text:message.text,bgColor:"#7b2f30",textColor:'white'});

                         }
                         else {

                             erp_toaster({bgColor:"#7b2f30",textColor:'white','heading':options.error403heading,text:[responseText.message]});
                         }

                     }
                     else if(ts.status == 401)
                     {
                         window.location.href = "/login"
                     }
                     else
                     {
                         alert(ts.responseText);
                     }

                     if(options.hasOwnProperty('error_endofajaxreturn'))
                     {

                         options.error_endofajaxreturn.call($clickbutton,data);

                     }

                 },





           });

           });

           $(document).on(options.eventtype,options.clientside_confirmationmodal_nodecline,function(event)
           {
                 $(options.clientside_confirmationmodal).modal('hide');
           });
    }

});



function highlighter(finaltableobject,finaltablevariable,searchboxid,tableid,$type="single")
{

    var globalfinaldata = eval(finaltablevariable);
    var datahighlight = globalhighlight;
    var searchbox = $(searchboxid);
    searchval = searchbox.val();
    var highlightrowindex;
    var currentrow;
    var changedrecordsarray = [];

    if($type == "single")
    {
        changedrecordsarray = [datahighlight];

    }
    else {
        changedrecordsarray = datahighlight;
    }

    for(key in changedrecordsarray)
    {
        changedrecordsarray[key] = changedrecordsarray[key].toString();
    }

    for (var i = 0,rowlength=globalfinaldata.length; i < rowlength; i++)
    {
       currentrow = $(globalfinaldata[i]);
       $checkval = currentrow.find('.editgid').val();
       // $checkval = isNaN($checkval)?$checkval:parseInt($checkval);
       if(changedrecordsarray.indexOf($checkval) > -1)
       {

           currentrow.addClass('highlighten');

           globalfinaldata[i] = currentrow.wrap('<p/>').parent().html();
           highlightrowindex=  i;
           document.cookie = "highlightrow=" + highlightrowindex;
       }
   }
   finaltableobject =  globalfinaldata;
   searchbox.val(searchval);
   var e = $.Event("keyup");
   e.keyCode = 13; // # Some key code value
   searchbox.trigger(e);


}





$(document).on('click','#serverside_confirmationmodal_yesproceed ,#serverside_confirmationmodal_nodecline',function () {
var $currentclicked = $(this);
var $onyesbutton = $("#onyestriggerbuttonid");


var $serverside_confirmedvalue = $("#serverside_confirmedvalue");
var $serverside_confirmationmodal_body = $("#serverside_confirmationmodal_body");

    if($currentclicked.attr("id") == "serverside_confirmationmodal_yesproceed")
    {
        $serverside_confirmedvalue.val(1);
        $("#"+$onyesbutton.val()).click();

    }
    else {
        $serverside_confirmedvalue.val('');
    }

    $serverside_confirmationmodal_body.html('');
    $onyesbutton.val('');
    $currentclicked.closest('.modal').modal('hide');


});


 /// temperary functions

function set_disable()
{
  var args = [];
  var textdatefieldtoclearcountindex=null;
  var dropdownfieldtoclearcountindex=null;
  var autocompletefieldtoclearcountindex=null;
  var buttontoclearcountindex=null;
  var tagtoclearcountindex=null;

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
      if(args[i] == "#")
      {
        var tagtoclearcountindex = i +1;
        var tagtoclearstartingindex = tagtoclearcountindex+1;
        var tagtoclearendindex = tagtoclearcountindex + arguments[tagtoclearcountindex];
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
    if(tagtoclearcountindex !=null)
    {
        for(i=tagtoclearstartingindex;i<=tagtoclearendindex;i++){
          $(args[i]).prop('disabled', true);
        }
    }
}

function set_enable2(parameters)
{

         var defaults = {disablemethod:[],readonlymethod:[]};
         var finalparameters = $.extend(defaults,parameters);

         if(finalparameters.disablemethod.length > 0)
         {
             var disablefields = finalparameters.disablemethod;
             for(field in disablefields)
             {
                 $(disablefields[field]).attr("disabled","disabled");
                 $(disablefields[field]).prop("disabled",true);
             }

         }
         if(finalparameters.readonlymethod.length > 0)
         {
             var readonlyfields = finalparameters.readonlymethod;
             for(field in readonlyfields)
             {
                    $(readonlyfields[field]).prop("readonly", false);
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
  var tagtoclearcountindex=null;

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
      if(args[i] == "#")
      {
        var tagtoclearcountindex = i +1;
        var tagtoclearstartingindex = tagtoclearcountindex+1;
        var tagtoclearendindex = tagtoclearcountindex + arguments[tagtoclearcountindex];
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
    if(tagtoclearcountindex !=null)
    {
        for(i=tagtoclearstartingindex;i<=tagtoclearendindex;i++){
          $(args[i]).prop('disabled', false);
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
