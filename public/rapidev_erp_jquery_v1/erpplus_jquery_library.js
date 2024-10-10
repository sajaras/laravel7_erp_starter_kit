
function stopfilldata_reload() {
        $('.reloadfilldata').each(function(){
                $(this).removeClass('fa-spin');
        });
}

function fetchfirst(parameters) {

        var optiondefaults = {error_morethanonerecord:''};
        parameters = $.extend(optiondefaults, parameters);

        if(parameters.data.length == 1)
        {
                return parameters.data[0];
        }
        else if(parameters.data.length > 1)
        {
                erp_errortoaster({'heading':'More than one record',text:[parameters.error_morethanonerecord]});
                return false;
        }
        else {
                return false;
        }

}

function displayfilename(fileuploader) {
        var filename = $(fileuploader).val().split('\\').pop();
        $(fileuploader).closest('.erpfileuploaderblock').find('.erpfileuploaderfilename').text(filename);

}

function displayfilenames(fileuploader) {
        var filenames = []
        var uploadfiles = document.getElementById($(fileuploader).attr("id")).files;
        for(var i = 0; i < uploadfiles.length; i++)
        {
                filenames.push('<span>'+uploadfiles[i].name +'<span>');

        }
        console.log(filenames);
        $(fileuploader).closest('.erpfileuploaderblock').find(".erpfileuploaderfilename span").each(function ()
        {
                if($(this).find('i').length ==0)
                {
                        $(this).remove();
                }

        });
        if($(fileuploader).closest('.erpfileuploaderblock').hasClass('appendtext'))
        {
                $(fileuploader).closest('.erpfileuploaderblock').find('.erpfileuploaderfilename').append(filenames.join("<br>"));
        }
        else {

                $(fileuploader).closest('.erpfileuploaderblock').find('.erpfileuploaderfilename').html(filenames.join("<br>"));
        }


}


function check_if_required_fields_present(parameters)
{
        var optiondefaults = {showerror:1,data:{},requiredfields:[],showerrortoast:true};
        finalparams = $.extend(optiondefaults, parameters);
        var result = {pass:true,requiredfailedlist:[]};
        for(keyfield in finalparams.data)
        {
                if(parameters.requiredfields.indexOf(keyfield) > -1 && finalparams.data[keyfield] == "" ||finalparams.data[keyfield] == "null" ||finalparams.data[keyfield] == null)
                {
                        result.pass = false;
                        result.requiredfailedlist.push(keyfield);
                }
        }

        if(!result.pass && result.requiredfailedlist.length > 0)
        {
                var errorarray = [];
                for(f in result.requiredfailedlist)
                {
                        errorarray.push(result.requiredfailedlist[f].replace(/_/g, " "));
                }
                if(finalparams.showerror)
                {
                        erp_errortoaster({heading:'Following Fields are Required',text:errorarray});
                }

                else
                {
                        result.error  = {};
                        result.error.heading = 'Following Fields are Required';
                        result.error.text = errorarray;
                }

        }



        return result;


}

function erp_toaster(parameters) {

        $.toast().reset('all');


        var optiondefaults = {icon:'info',allowToastClose:true,position:'mid-center',hideAfter:false,class:'larger-font',bgColor:'#3A3A3A',textColor:'white'};
        finaloptions = $.extend(optiondefaults, parameters);
        var toastobject =  $.toast(finaloptions);
        return toastobject;


}
function erp_errortoaster(parameters) {
        $.toast().reset('all');
        var optiondefaults = {icon:'error',allowToastClose:true,position:'mid-center',hideAfter:false,class:'larger-font',bgColor:'indian-red',textColor:'white'};
        finaloptions = $.extend(optiondefaults, parameters);
        var toastobject =  $.toast(finaloptions);
        return toastobject;
}
function erp_successtoaster(parameters) {
        $.toast().reset('all');
        var optiondefaults = {icon:'success',allowToastClose:true,position:'mid-center',hideAfter:false,class:'larger-font',bgColor:'#3a4433',textColor:'white'};
        finaloptions = $.extend(optiondefaults, parameters);
        var toastobject =  $.toast(finaloptions);
        return toastobject;
}



function display(value) {

        if(value == null)
        {
                return '';
        }
        return value;
}


function displayhumanreadabledate(date_element) {

        date_element = $(date_element);
        var displayfield = $("#"+date_element.attr("id") + "_display");
        if(Date.parse(date_element.val()))
        {
                var d = new Date(date_element.val());
                displayfield.text(d.toDateString());
        }
        else {

                displayfield.text('');

        }

}


function firstof(data) {
        if(data.length > 0)
        {
                return data[0];
        }
        else {
                null;
        }

}


function getjsoncolumn(data,column)
{

        if(IsValidJSONString(data[column]))
        {
                return JSON.parse(data[column]);
        }
        else {
                return null;
        }

}


function getcolumn(data,column) {

        if(data[column] == null || data[column] == "")
        {
                return null;
        }
        else {
                return data[column];
        }

}





function hide_elements() {

        for(key in arguments)
        {
                $(arguments[key]).hide();
        }
}

function show_elements() {
        for(key in arguments)
        {
                $(arguments[key]).show();
        }
}


function lockblock(block,parameters={}) {
        console.log("PARAMS",parameters);
        block.find('input').each(function() {
                // $(this).attr("disabled","disabled");
                if(parameters.hasOwnProperty('exceptions') && parameters.exceptions.indexOf("#"+$(this).attr('id')) > -1)
                {


                }
                else {
                        $(this).attr("disabled","disabled");
                        $(this).prop("disabled",true);
                }
        });

}




function unlockblock(block) {

        block.find('input').each(function() {
                console.log("ENTERING");
                $(this).removeAttr('disabled');
                $(this).prop("disabled",false);
        });

}

function lockbuttons() {

        for(keybuttons in arguments)
        {
                $(arguments[keybuttons]).prop("disabled",true);
                $(arguments[keybuttons]).attr("disabled","disabled");
        }

}

function unlockbuttons() {

        for(keybuttons in arguments)
        {


                $(arguments[keybuttons]).prop("disabled",false);
                $(arguments[keybuttons]).attr("disabled",false);
        }

}
function locksavebuttons(parameters={}) {

        var defaultsavebuttons = {buttons:['#saveandexitbutton','#saveandnextbutton']};
        savebuttons = $.extend(defaultsavebuttons, parameters);
        savebuttonids = savebuttons.buttons;
        for(button in savebuttonids)
        {
                $(savebuttonids[button]).prop("disabled",true);
                $(savebuttonids[button]).attr("disabled","disabled");
        }

}

function unlocksavebuttons(parameters={})
{

        var defaultsavebuttons = {buttons:['#saveandexitbutton','#saveandnextbutton']};
        savebuttons = $.extend(defaultsavebuttons, parameters);
        savebuttonids = savebuttons.buttons;
        for(button in savebuttonids)
        {
                $(savebuttonids[button]).prop("disabled",false);
                $(savebuttonids[button]).attr("disabled",false);
        }

}

function startloader(element) {
        console.log("element",element);
        element.removeClass('d-none');

}
function stoploader(element) {
        element.addClass('d-none');
}

function erp_ac_dis(parameters) {
        var parameterdefault = {addonclass_gid:'',addonclass_display:'',addonclass_value:'',addonattributes:'',showtitle:""};
        parameters = $.extend(parameterdefault, parameters);
        var namefield = '';
        var valuefieldnamefield = '';
        var showtitle = '';

        if(parameters.showtitle == true)
        {
                showtitle = ' showtitle';

        }
        if(parameters.fieldtype == 'array')
        {
                namefield = parameters.field + '_gid[]';
                valuefieldnamefield = parameters.field + '_value[]';

        }
        else {
                namefield = parameters.field + '_gid';
        }

        var idfield = "<input type='text' class='erpautocomplete text-right form-control form-control-sm "+ parameters.modalid + parameters.field +"_value "+ parameters.addonclass_value + showtitle +"' value='" + parameters.id +"' name='"+ valuefieldnamefield +"' placeholder='Search here' "+ parameters.addonattributes +" >";
        var gidfield = "<input tabindex='-1' type='hidden' class=' "+ parameters.modalid + parameters.field +"_gid "+ parameters.addonclass_gid +"' name = '"+ namefield +"' value='" + parameters.gid +"' >";
        var displayfield = "<input tabindex='-1'  type='text' class=' form-control autocomplete-display "+ parameters.modalid + parameters.field +"_display "+ parameters.addonclass_display +"' value='" + parameters.display +"' >";

        return gidfield + idfield + displayfield;


}


function erp_input(parameters) {
        var parameterdefault = {addonclass:'',addonattributes:'',canenter:"1",showtitle:""};
        parameters = $.extend(parameterdefault, parameters);
        var namefield = '';
        var readonly = '';
        var showtitle = '';

        if(parameters.showtitle == true)
        {
                showtitle = ' showtitle';
        }
        if(parameters.canenter == 0)
        {
                readonly = 'readonly';
        }

        if(parameters.hasOwnProperty('removenamefield') && parameters.removenamefield == true)
        {
                namefield = '';
        }
        else
        {

                if(parameters.fieldtype == 'array')
                {
                        namefield = parameters.field + '[]';
                }
                else {
                        namefield = parameters.field ;
                }
        }
        var inputfield = "<input type='"+ parameters.inputtype +"' class='erpinput form-control form-control-sm "+ parameters.modalid + parameters.field + "_value "+ parameters.addonclass+ showtitle+ "' type='text' name='"+namefield +"' value='"+ parameters.value +"' "+ parameters.addonattributes +" "+ readonly+">";
        return inputfield;
}

function erp_span(parameters) {
        var parameterdefault = {addonclass:'',addonattributes:'',canenter:"1",showtitle:""};
        parameters = $.extend(parameterdefault, parameters);
        var namefield = '';
        var readonly = '';
        var showtitle = '';
        if(parameters.showtitle == true)
        {
                showtitle = ' showtitle';
        }

        if(parameters.canenter == 0)
        {
                readonly = 'readonly';
        }

        if(parameters.fieldtype == 'array')
        {
                namefield = parameters.field + '[]';
        }
        else {
                namefield = parameters.field ;
        }
        var spanfield = "<span class='erpspan form-control form-control-sm "+ parameters.modalid + parameters.field + "_text "+ ' lineheight27px ' + parameters.addonclass+ showtitle +"' type='text' name='"+namefield +"' "+ parameters.addonattributes +" "+ readonly+">"+ parameters.value +"</span>";
        return spanfield;
}

function erp_button(parameters) {
        var icontext=  '';
        if(parameters.hasOwnProperty('icon'))
        {
                icontext = "<i class ='fa "+ parameters.icon +"'></i> ";
        }
        return "<a class='"+ parameters.class + "' >"+ icontext + parameters.display+  "</a>";
}



function erp_checkbox(parameters) {
        var namefield = '';
        if(parameters.fieldtype == 'array')
        {
                namefield = parameters.field + '[]';
        }
        else {
                namefield = parameters.field ;
        }
        var inputfield = "<input type='"+ parameters.inputtype +"' class='rowcheckbox "+ parameters.modalid + parameters.field + "_value' type='text' name='"+namefield + "'>";
        return inputfield;
}

function erp_checkbox2(parameters) {

        var namefield = '';
        if(parameters.fieldtype == 'array')
        {
                namefield = parameters.field + '[]';
        }
        else {
                namefield = parameters.field ;
        }
        if(!parameters.hasOwnProperty('divclass'))
        {
                parameters.divclass = '';
        }

        var checkboxblock = "<div class='checkbox "+ parameters.divclass+"'>"+
        "<input class='rowcheckbox "+ parameters.modalid + parameters.field + "_value' type='checkbox' name='"+ namefield +"' id='optinosCheckbox1' >"+
        "<label for=''>"+
        "</label>"+
        "</div>";

        return checkboxblock;

}


function erp_checkbox3(parameters)
{

        var checkboxidentifier = randomid()

        var namefield = '';
        var checked = '';
        var checkboxattributes = '';
        if(parameters.hasOwnProperty('checked') && parameters.checked == true)
        {
                checked = 'checked';
        }
        if(parameters.fieldtype == 'array')
        {
                namefield = parameters.field + '[]';
        }
        else {
                namefield = parameters.field ;
        }
        if(!parameters.hasOwnProperty('divclass'))
        {
                parameters.divclass = '';
        }
        if(!parameters.hasOwnProperty('label'))
        {
                parameters.label = '';
        }
        if(parameters.hasOwnProperty('addonattributes'))
        {
                checkboxattributes = parameters.addonattributes;
        }
        var checkboxhtml = '<div class="custom-control custom-checkbox mb-1 '+ parameters.divclass+'">'+
        '<input '+ checkboxattributes+ ' type="checkbox" '+ checked +' tabindex="-1" class="rowcheckbox '+ parameters.modalid + parameters.field +'_value custom-control-input" name="'+ namefield +'" id="customCheck_'+ checkboxidentifier+'">'+
        '<label class="custom-control-label" for="customCheck_'+ checkboxidentifier+'">'+ parameters.label+'</label>'+
        '</div>';
        return checkboxhtml;

}

function erp_formcheckbox2(parameters)
{


        var checkboxidentifier = randomid()

        var namefield = '';
        var checked = '';
        value = "0";
        if(parameters.hasOwnProperty('checked') && parameters.checked == true)
        {
                checked = 'checked';
                value = "1";
        }
        if(parameters.fieldtype == 'array')
        {
                namefield = parameters.field + '[]';

        }
        else {
                namefield = parameters.field ;
        }
        if(!parameters.hasOwnProperty('divclass'))
        {
                parameters.divclass = '';
        }
        if(!parameters.hasOwnProperty('label'))
        {
                parameters.label = '';
        }
        var checkboxhtml = '<div class="formcheckboxdiv custom-control custom-checkbox mb-1 '+ parameters.divclass+'">'+
        '<input type="checkbox" '+ checked +' tabindex="-1" class="formrowcheckbox '+ parameters.modalid + parameters.field +'_value custom-control-input"  id="customCheck_'+ checkboxidentifier+'">'+
        '<label class="custom-control-label" for="customCheck_'+ checkboxidentifier+'">'+ parameters.label+'</label>'+
        '<input type="hidden"  name="'+ namefield +'" value="'+value+'" class="autoupdatecheckbox ' + parameters.field + '_hidden" >'+
        '</div>';
        return checkboxhtml;


}


$(document).on('change','.formrowcheckbox',function(){

        var checkboxelement = $(this);
        if(checkboxelement.prop("checked") == true)
        {

                checkboxelement.closest('.formcheckboxdiv').find('.autoupdatecheckbox').val("1");
        }
        else
        {
                checkboxelement.closest('.formcheckboxdiv').find('.autoupdatecheckbox').val("0");
        }


});


$(document).on('mouseover','.erpautocomplete.showtitle',function () {
        $(this).attr('title',$(this).next('input').val());
});

$(document).on('mouseover','.erpinput.showtitle',function () {
        $(this).attr('title',$(this).val());
});

$(document).on('mouseover','.erpspan.showtitle',function () {
        $(this).attr('title',$(this).text());
});


function randomid() {

        var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        var uniqid = randLetter + Date.now() + Math.random();
        return uniqid;
}


function randomid2() {

        var nums = [1,2,3,4,5,6,7,8,9,10],
        ranNums = [],
        i = nums.length,
        j = 0;

        while (i--) {
                j = Math.floor(Math.random() * (i+1));
                ranNums.push(nums[j]);
                nums.splice(j,1);
        }
        return ranNums
}

function erp_addmorebutton(parameters) {

        return "<a onclick='addmore(this);' id='"+parameters.id+"' class='addmorebutton "+parameters.class +"' ><i class='fa fa-plus fa-1x text-white'></i></a>";
}

function erp_deletemorebutton(parameters) {

        return "<a onclick='deletemore(this);' id='"+parameters.id+"' class='"+parameters.class +"' ><i class='fa fa-minus fa-1x text-white'></i></a>";

}


function erp_button2(parameters)
{
        var   defaultparameters ={class:"",icon:"",display:"",style:''};
        var finalparameters = $.extend(defaultparameters,parameters);
        console.log("DP",finalparameters);

        var buttonhtml = '<button type="button" class="btn '+ finalparameters.class+'" data-bgcolor="#3d464d" data-color="#ffffff" '+ (parameters.style?parameters.style:('style="color: rgb(255, 255, 255); background-color: rgb(61, 70, 77);')) +' "><i class="'+ finalparameters.icon+'"></i>'+ finalparameters.display+'</button>';
        return buttonhtml;
}






jQuery.fn.extend({

        reportselect2: function (options) {
                var optiondefaults = {idnamefield:{},displaynamefield:{},selectorblock:'.reportselect2block',displaytextbox:'.displaytextbox',data:[],displayvalue:'',value:'',text:[]};
                options = $.extend(optiondefaults, options);
                var dataset = generateselect2data({data:options.data,displayvalue:options.displayvalue,value:options.value,text:options.text});
                console.log;
                var select2object = $(this).select2({
                        data:dataset,
                        templateSelection:showonly_displayvalue_inselectedlist,
                        dropdownCssClass:options.customwidgetclass,

                });



                $(this).change(function() {

                        if(options.hasOwnProperty('single') && options.single == true)
                        {
                                var currentselectedlists = [$(this).val()];
                        }
                        else
                        {
                                var currentselectedlists = $(this).val();
                        }

                        console.log('currentselectedlists',currentselectedlists);


                        var datarecords = alasql("select * from ? where "+options.value+" in("+currentselectedlists.join(',')+")",[options.data]);
                        var displayhtml = '';
                        if(datarecords.length >0)
                        {
                                for(k in datarecords)
                                {
                                        displaytextarray = [];
                                        $.each(options.displaytext,function(index,value)
                                        {
                                                displaytextarray.push(datarecords[k][value]);

                                        });

                                        displayhtml = displayhtml + '<small class="d-block eachdisplaytext">'+ displaytextarray.join('-') +'</small>' +
                                        '<input type="hidden" class="'+ options.idnamefield.name+'" name="'+ options.idnamefield.name +'[]" value="'+ datarecords[k][options.idnamefield.column] +'" >'+
                                        '<input type="hidden" class="'+ options.displaynamefield.name+'" name="'+ options.displaynamefield.name +'[]" value="'+ datarecords[k][options.displaynamefield.column] +'" >';


                                }

                        }

                        $(this).closest(options.selectorblock).find(options.displaytextbox).html(displayhtml);




                });

                $(document).on('mouseover',options.displaytextbox,function () {

                        var titletexts = [];
                        $(this).find('.eachdisplaytext').each(function(){

                                titletexts.push($(this).text());
                        });
                        $(this).attr('title',titletexts.join('\n'));


                });

                return select2object;


        },

        rangeselect2: function (options) {
                var optiondefaults = {fromidnamefield:{},fromdisplaynamefield:{},fromdisplaytextbox:'.displaytextbox',fromdata:[],fromdisplayvalue:'',fromvalue:'',fromtext:[],
                toidnamefield:{},todisplaynamefield:{},todisplaytextbox:'.displaytextbox',todata:[],todisplayvalue:'',tovalue:'',totext:[]};
                options = $.extend(optiondefaults, options);
                var fromdataset = generateselect2data({data:options.fromdata,displayvalue:options.fromdisplayvalue,value:options.fromvalue,text:options.fromtext});
                fromdataset.unshift({id:'',text:'None Selected'});
                console.log(fromdataset);
                var todataset =   generateselect2data({data:options.todata,displayvalue:options.todisplayvalue,value:options.tovalue,text:options.totext});
                todataset.unshift({id:'',text:'None Selected'});

                // templateSelection:showonly_displayvalue_inselectedlist,
                // dropdownCssClass:options.fromcustomwidgetclass,
                $(options.fromelement).select2({
                        data:fromdataset,
                        templateSelection:showonly_displayvalue_inselectedlist,
                        dropdownCssClass:options.tocustomwidgetclass,


                });
                $(options.toelement).select2({
                        data:todataset,
                        templateSelection:showonly_displayvalue_inselectedlist,
                        dropdownCssClass:options.tocustomwidgetclass,

                });

                $(document).on('click','#newrangebutton_'+options.represents,function ()
                {
                        var $clickedbutton = $(this);

                        addnewrangeblock($(this),options.represents);

                        setTimeout(
                                function() {
                                        $(options.fromelement).select2({
                                                data:fromdataset,
                                                templateSelection:showonly_displayvalue_inselectedlist,
                                                dropdownCssClass:options.tocustomwidgetclass,


                                        });

                                        $(options.toelement).select2({
                                                data:todataset,
                                                templateSelection:showonly_displayvalue_inselectedlist,
                                                dropdownCssClass:options.tocustomwidgetclass,


                                        });
                                }, 0000);
                        });

                        $(document).on('change',options.fromelement,function () {

                        });
                        $(document).on('change',options.toelement,function () {

                        });


                }

        });


        function addnewrangeblock(clickedbutton,represents) {
                var rangeblock = $(clickedbutton).closest('.rangeblock');
                var appendhtml = '<div class="row col-12 additionalrangeblock">';
                appendhtml = appendhtml + additionrangerowhtml('from',represents);
                appendhtml = appendhtml + additionrangerowhtml('to',represents) ;
                appendhtml = appendhtml + '<div class="col-2 text-center"><input type="checkbox" class="rangecheckbox"></div></div>' ;
                rangeblock.find('.rangerows').append(appendhtml);

        }

        function additionrangerowhtml($fromorto,$represents)
        {

                var rowhtml = '<div class="col-5 singlerange'+$fromorto+'block">'+
                '<div class="input-group nomarginbottom bootstrap-touchspin bootstrap-touchspin-injected">'+
                '<span class="input-group-btn input-group-prepend">'+
                '<button class="btn themecolor8 bootstrap-touchspin-down " type="button">'+$fromorto+'</button></span>'+
                '<select class="'+$fromorto+'source_'+$represents+' form-control btn-block" name="'+$fromorto+'range_'+$represents+'[]">'+
                '</select>'+
                '</div>'+
                '<span style="display:block;min-height:15px;font-size:11px;" class="'+$fromorto+'source'+$represents+'_display themecolor9"></span>'+
                '</div>';
                return rowhtml;

        }





        function removerangeblock(clickedbutton) {

                var rangeblock = $(clickedbutton).closest('.rangeblock');

                rangeblock.find('.rangecheckbox').each(function(){
                        var currentcheckbox = $(this);
                        if(currentcheckbox.prop("checked") == true)
                        {
                                currentcheckbox.closest('.additionalrangeblock').remove();
                        }
                });
        }





        function showonly_displayvalue_inselectedlist(val) {
                return val.displayvalue;

        }

        function generateselect2data(parameters) {
                var select2data = [];
                for(keyoption in parameters.data)
                {
                        var displaytext = '';
                        $.each(parameters.text,function(i,f){
                                displaytext = displaytext + ' ' + parameters.data[keyoption][f];
                        });
                        select2data.push({id:parameters.data[keyoption][parameters.value],text:displaytext,displayvalue:parameters.data[keyoption][parameters.displayvalue]});

                }
                return select2data;


        }

        function generateoptionlist(parameters) {
                var selectoptions = '';
                var selected;
                for(keyoption in parameters.data)
                {
                         selected = '';
                        var displaytext = '';
                        $.each(parameters.text,function(i,f){
                                displaytext = displaytext + ' ' + parameters.data[keyoption][f];
                        });
                        if(parameters.hasOwnProperty('selectvalue') &&  parameters.selectvalue == parameters.data[keyoption][parameters.value] )
                        {
                                selected = 'selected';
                        }
                        selectoptions = selectoptions + '<option  value="'+ parameters.data[keyoption][parameters.value] +'" + '+ selected+' >'+ displaytext + ' </option>';
                }

                return selectoptions;

        }



        function deleteselectedfiles(element) {

                $(element).closest('.erpfileuploaderblock').find('.erpfileuploader').val('').trigger('change');

        }


        function disablefield(field) {

                field.attr("disabled","disabled");
                field.prop("disabled",true);
        }
        function enablefield(field) {

                field.attr("disabled","");
                field.prop("disabled",false);
        }




        // ;(function($) {
        //    $.fn.fixHeader = function() {
        //       return this.each(function() {
        //          var $table = $(this),
        //             $t_fixed;
        //
        //          function init() {
        //             $t_fixed = $table.clone();
        //             $t_fixed.find('tbody').remove().end().addClass('fixed_table_header').insertBefore($table);
        //             resizeFixed();
        //          }
        //
        //          function resizeFixed() {
        //             $t_fixed.find("th").each(function(index) {
        //                $(this).css("min-width",$table.find("th").eq(index).width()+"px");
        //             });
        //          }
        //
        //          function scrollFixed() {
        //             var offset = $(this).scrollTop(),
        //             tableOffsetTop = $table.offset().top,
        //             tableOffsetBottom = tableOffsetTop + $table.height() - $table.find("thead").height();
        //             if(offset < tableOffsetTop || offset > tableOffsetBottom)
        //                $t_fixed.hide();
        //             else if(offset >= tableOffsetTop && offset <= tableOffsetBottom && $t_fixed.is(":hidden"))
        //                $t_fixed.show();
        //
        //             // left-align $t_fixed with $table
        //             $t_fixed.css("left", $table.offset().left - $(this).scrollLeft());
        //          }
        //
        //          $(window).resize(resizeFixed);
        //          $(window).scroll(scrollFixed);
        //
        //          init();
        //       });
        //    };
        // })(jQuery);

        function focuslastrow(table){

                table.find('tr:last :input:visible:first').focus();
        }


        $(document).on('click','.addmorebutton',function() {
                setTimeout($(this).closest('table').find('tbody tr:last :input:visible:first').focus(), 2000);

        });

        function erp_select2(parameters)
        {
                var   defaultparameters ={rowindex:'',select2plugin:false,addonclass:'',modalid:'',fieldtype:'',id:'',multiple:'',name:'',options:{},value:'',valuefield:"id",textfield:"text",addonattributes:''};
                var finalparameters = $.extend(defaultparameters,parameters);
                var namefield = '';
                if(finalparameters.multiple == "multiple")
                {
                        namefield = parameters.field + '['+finalparameters.rowindex+'][]';
                }
                else {

                        if(parameters.fieldtype == 'array')
                        {
                                namefield = parameters.field + '[]';
                        }
                        else {
                                namefield = parameters.field ;
                        }
                }

                var selected = "";
                var select2html = "<select data-width='100%' id= '"+ finalparameters.id +"' "+ finalparameters.multiple+" class='form-control "+ finalparameters.field + " "+ finalparameters.addonclass +"' name='"+ namefield+"' "+ finalparameters.addonattributes+ "  >";
                if(finalparameters.multiple == "multiple" && finalparameters.select2plugin == true )
                {

                        for(key in finalparameters.options)
                        {

                                if( finalparameters.value !=[] && finalparameters.value.indexOf(finalparameters.options[key][finalparameters.valuefield]) > -1)
                                {
                                        selected = "selected";

                                }
                                else {
                                        selected = "";
                                }
                                select2html = select2html + "<option "+ selected +" value = '"+ finalparameters.options[key][finalparameters.valuefield] +"'>"+ finalparameters.options[key][finalparameters.textfield] +"</option>";
                        }
                }

                else
                {
                        var keyvaluearray = false;
                        if(Array.isArray(finalparameters.options))
                        {
                                keyvaluearray = true;
                        }

                        var checkval;
                        for(key in finalparameters.options)
                        {
                                console.log(key,finalparameters.value);
                                var checkval  = keyvaluearray?finalparameters.options[key][finalparameters.valuefield]:key;


                                if(finalparameters.options.value !=""  && checkval == finalparameters.value)
                                {
                                        selected = "selected";

                                }
                                else {
                                        selected = "";
                                }
                                select2html = select2html + "<option "+ selected +" value = '"+ (keyvaluearray?finalparameters.options[key][finalparameters.valuefield]:key) +"'>"+ (keyvaluearray?finalparameters.options[key][finalparameters.textfield]:finalparameters.options[key]) +"</option>";
                        }
                }



                select2html = select2html + "</select>";

                return select2html;

        }


        function erp_fileuploader(parameters)
        {
                var parameterdefault = {fieldtype:'',deleteblock:false,label:'',field:'',fileuploaderlabel:'',addonclass:'',addonattributes:'',canenter:"1"};
                parameters = $.extend(parameterdefault, parameters);
                var namefield = '';
                var readonly = '';
                var showtitle = '';
                if(parameters.fieldtype == 'array')
                {
                        namefield = parameters.field + '[]';
                }
                else {
                        namefield = parameters.field ;
                }

                var filefield =  [];

                var randomidval = randomid();

                filefield.push('<div class="input-group nomarginbottom erpfileuploaderblock">');
                if(parameters.label !='')
                {
                        filefield.push('<div class="input-group-prepend themecolor8">');
                        filefield.push('<span class="input-group-text" id="newvoucher_document_label">Upload</span>');
                        filefield.push('</div>');
                }


                filefield.push('<div class="custom-file">');


                filefield.push('<input type="file" class="erpfileuploader custom-file-input '+ parameters.field+'" onchange="displayfilename(this);"  name="'+namefield+'" aria-describedby="fu'+ randomidval +'">');
                filefield.push('<label class="custom-file-label " for="fu'+ randomidval +'"> '+parameters.fileuploaderlabel +'</label>');

                filefield.push('</div>');

                if(parameters.deleteblock == true)
                {
                        filefield.push('<label class="input-group-text"><a style="cursor:pointer;" class="'+parameters.field+'_deletefiles" onclick="deleteselectedfiles(this)"><i class="fa fa-trash"></i></a></label>');
                        filefield.push('<small class="mt-2 row col-12 erpfileuploaderfilename '+parameters.field+'_erpfileuploaderfilename"></small>');
                        filefield.push('</div>');
                }

                return filefield.join("");
        }




        function ifnotempty(parameters) {
                var parameterdefault = {errorheading:'Required',errormessage:[]};
                var finalparameters = $.extend(parameterdefault, parameters);

                if(finalparameters.value != '' && finalparameters.value != null && finalparameters.value != 'null')
                {
                        return true;
                }
                else {
                        erp_errortoaster({heading:finalparameters.errorheading,text:finalparameters.errormessage});
                        return false;
                }
        }



        function isNumeric(str) {
                if (typeof str != "string") return false // we only process strings!
                return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
                !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
        }


        function ifEmpty(value)
        {

                if(value == '' || value == null)
                {
                        return 1;
                }
                return 0;
        }


        function numericFilter(txb)
        {
                txb.value = txb.value.replace(/[^\0-9]/ig, "");
        }


        function isJSON(str) {
                try {
                        return (JSON.parse(str) && !!str);
                } catch (e) {
                        return false;
                }
        }


        function restrict_tomaxlength(element,maxlength)
        {

                var $element = $(element);
                $element.val($element.val().replace(/'/g,''));
                var l = $element.val().length;
                if(l > maxlength)
                {
                        $element.val($element.val().substring(0,maxlength));
                }


        }


        function ExcelDateToJSDate(serial) {
                var utc_days  = Math.floor(serial - 25569);
                var utc_value = utc_days * 86400;
                var date_info = new Date(utc_value * 1000);
                return  date_info.getFullYear() + '-' +  ("0" + (date_info.getMonth()+1)).slice(-2) + '-' + ("0" + (date_info.getDate())).slice(-2);


        }

        function ExcelDateTimeToJSDateTime(serial) {
                var utc_days  = Math.floor(serial - 25569);
                var utc_value = utc_days * 86400;
                var date_info = new Date(utc_value * 1000);

                var fractional_day = serial - Math.floor(serial) + 0.0000001;

                var total_seconds = Math.floor(86400 * fractional_day);

                var seconds = total_seconds % 60;

                total_seconds -= seconds;

                var hours = Math.floor(total_seconds / (60 * 60));
                var minutes = Math.floor(total_seconds / 60) % 60;

                return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
        }



        function correctjsondata(parameters,data) {
                /*------------------------------------------------------------------------
                usage sample
                correctjsondata({removespacefromkeys:true,removespecialcharacters:[{substring:"@",replacewith:""}]},[{"key 1 ":"hello world@"}]);
                written by sajaras k
                -----------------------------------------------------------------------*/

                var optiondefaults = {removespacefromkeys:false,removespecialcharacters:[]};
                parameters = $.extend(optiondefaults, parameters);
                var newdata = [];
                var newl;
                for(k in data)
                {
                        newdata[k] = {};
                        for(l in data[k])
                        {
                                newl = l;
                                if(parameters.removespacefromkeys)
                                {
                                        newl =   l.replace(/ /g, "");
                                }
                                for($i=0;$i<parameters.removespecialcharacters.length;$i++)
                                {
                                        // data[k][l] = data[k][l].toString().replaceAll(parameters.removespecialcharacters[$i].substring,parameters.removespecialcharacters[$i].replacewith);

                                        var re = new RegExp(parameters.removespecialcharacters[$i].substring,"g");

                                        data[k][l] = data[k][l].toString().replace(re, parameters.removespecialcharacters[$i].replacewith);

                                }

                                newdata[k][newl] = data[k][l];
                        }
                }

                return newdata;
        }

        function extractparticularkeyfromjsonarray(sourcearray,keyname)
        {

                var rtarray;
                rtarray = sourcearray.map(function(value) {
                        return value[keyname];
                });

                rtarray = jQuery.grep(rtarray, function(n, i){
                        return (n !== "" && n != null);
                });
                return rtarray;
        }


        function money_format(parameters)
        {
                var optiondefaults = {currency:'inr'};
                parameters = $.extend(optiondefaults, parameters);

                var portions = parameters.value.toString().split(".");


                if(parameters.currency == 'inr')
                {
                        var x=parseFloat(portions[0]);
                        x=x.toString();
                        var lastThree = x.substring(x.length-3);
                        var otherNumbers = x.substring(0,x.length-3);
                        if(otherNumbers != '')
                        lastThree = ',' + lastThree;
                        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
                        if(portions.length ==2)
                        {
                                return res.toString() + "." + portions[1];
                        }
                        return res.toString();

                }
        }

        function generatetableserialnumber(parameters)
        {
                var optiondefaults = {tableid:'',slnofield:'.serialnumber'};
                parameters = $.extend(optiondefaults, parameters);

                var serialno = 0;
                $(parameters.tableid).find('tbody tr').each(function ()
                {

                        $(this).find(parameters.slnofield).text(++serialno);

                });
        }




        $(document).on('keyup','.allownumbers',function(){  // this is to enter only integers in qty field
                var temp = this.value.split('.')[0];
                this.value = temp.replace(/\D/g, '');
        });

        $(document).on('keyup','.allownumberswithdecimal',function()
        {  // this is to enter only integers in qty field
                        if(this.value.substr(-1) != '.')
                        {
                                var temp = this.value.split('.');
                                if(temp.length> 1 && temp[1] != '' && temp[1] != null)
                                {

                                                this.value = Number(temp[0]).toString().replace(/\D/g, '')  + '.'+   temp[1].replace(/\D/g, '');

                                }
                                else
                                {
                                        this.value = temp[0].replace(/\D/g, '');
                                }
                        }
        });



        function roundandshowasfourdecimalplaces(num)
        {

                return (Math.round(num * 10000) / 10000).toFixed(4);

        }
        function roundandshowasthreedecimalplaces(num)
        {

                return (Math.round(num * 1000) / 1000).toFixed(3);

        }



        function formatDatefromyymmdd(dateval)
        {

        var mileniumyear = new Date().getFullYear().toString().substring(0, 2);
        var year =  mileniumyear + dateval.substring(0, 2);
        var month =dateval.substring(2, 4);
        var day = dateval.substring(4, 6);
        return year + '-' + month + '-' + day;


        }
