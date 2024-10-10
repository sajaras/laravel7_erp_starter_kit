
jQuery.fn.extend({


        iemailreport: function (options)
        {

                var defaults = {iemail_gidfield:"#iemail_gid",gidnamefield:'',iemail_checkbox:".iemail_checkbox",iemailreportform:"#mailreportmodal_form",iemailreportmodal:"#mailreportmodal",iemailreportbutton:".imailreportbutton",
                getreportbutton:'#iemail_getreport',removerecipientbutton:'#iemail_removerecipients',addrecipientbutton:"#iemail_addrecipients",rowgidfield:'.editgid',rowrecipientgidfield:'.partygid',
                recipientsource:{gidfield:'gid',sourcedata:[],emailfield:'email'},iemail_recipientstbody:"#iemail_recipientstbody",rowdatefield:'',iemail_datefield:''};
                options = $.extend(defaults, options);  // if a perticular option field  in  corresponding js is given then its default option will not be  considered
                console.log(options,options.iemailreportbutton);
                var $iemail_recipientstbody = $(options.iemail_recipientstbody);
                $(options.iemail_gidfield).attr("name",options.gidnamefield);

                $(document).on('click',options.iemailreportbutton,function(){
                        var $row = $(this).closest('tr');
                        var entitygid = $row.find(options.rowgidfield).val();
                        $(options.iemail_gidfield).val(entitygid);
                        if(options.iemail_startdatefield != '')
                        {
                                var dateval = $row.find(options.rowdatefield).val();
                                $(options.iemail_startdatefield).val(dateval);
                                $(options.iemail_enddatefield).val(dateval);
                        }
                        var partygid = $row.find(options.rowrecipientgidfield).val();
                        var partymail = alasql("select * from ? where "+ options.recipientsource.gidfield + " = ?",[options.recipientsource.sourcedata,parseInt(partygid)])[0][options.recipientsource.emailfield];
                        $iemail_recipientstbody.html('');
                        $("#iemaildisplay").html('');
                        $("#iemail_subject").val('');
                        if(partymail !=null)
                        {
                                $iemail_recipientstbody.html("<tr><td class='col-10'><input type='text' name='iemail_recipients[]' placeholder='Enter recipient email address' value='"+partymail+"' class='form-control form-control-sm'></td><td><input type='checkbox' class='iemail_checkbox'></td>");

                        }
                        if(options.hasOwnProperty('beforemodalshowing'))
                        {
                                $ret = options.beforemodalshowing.call($(this),$row);

                                if($ret == false)
                                {
                                        return false;
                                }
                        }


                        $(options.iemailreportmodal).modal('show');
                });

                $(document).on('click',options.addrecipientbutton,function () {

                        $iemail_recipientstbody.append("<tr><td class='col-10'><input type='text' name='iemail_recipients[]' placeholder='Enter recipient email address' class='form-control form-control-sm'></td><td><input type='checkbox' class='iemail_checkbox'></td>");

                });

                $(document).on('click',options.removerecipientbutton,function () {

                        $iemail_recipientstbody.find(options.iemail_checkbox).each(function () {

                                var $checkbox =  $(this);
                                if($checkbox.prop("checked") == true)
                                {
                                        $(this).closest('tr').remove();
                                }
                        });


                });


                $(document).on('click',options.getreportbutton,function () {

                        var $iemailformobj = $(options.iemailreportform);
                        $iemailformobj.attr("action",options.reporturl);
                        $iemailformobj.find("#iemail_selectedreport").val(options.selectedreport);
                        $iemailformobj.find("#iemail_p_rtype").val(options.p_rtype);
                        $iemailformobj.submit();

                });




        }

});
