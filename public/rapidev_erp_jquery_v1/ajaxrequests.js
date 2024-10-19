function ajax_request_formless(ajaxparameters, callback) {

    var ajaxdefaults = { headers: {}, errorhandle: "automatic", url: "", type: "post", method: "post", databaseerrorfield: "#databaseerror", database_error_modal: "#database_error_modal", dberrorreturnfield: "database_error", dberrorreturnfield2: "databaseerror", dberrormsgheading: "Constraint Violation", dberror_icon: 'error' };
    ajaxoptions = $.extend(ajaxdefaults, ajaxparameters);
    var senddata = ajaxoptions.data;
    senddata._method = ajaxoptions.method,
        senddata._token = $('input[name=_token]').val();
    $.ajax({
        url: ajaxoptions.url,
        type: ajaxoptions.type,
        data: senddata,
        headers: ajaxoptions.headers,
        success: function (data) {

            return callback(data);


            // if (ajaxoptions.errorhandle == 'automatic' && data.hasOwnProperty(ajaxoptions.dberrorreturnfield)) {
            //     erp_errortoaster({
            //         heading: ajaxoptions.dberrormsgheading,
            //         hideAfter: false,
            //         text: data.database_error[2],
            //         allowToastClose: true,
            //         icon: ajaxoptions.dberror_icon
            //     });
            // }

            // else if (ajaxoptions.errorhandle == 'automatic' && data.hasOwnProperty(ajaxoptions.dberrorreturnfield2)) {
            //     erp_errortoaster({
            //         heading: ajaxoptions.dberrormsgheading,
            //         hideAfter: false,
            //         text: data.databaseerror[2],
            //         allowToastClose: true,
            //         icon: ajaxoptions.dberror_icon
            //     });

            // }
            // else {

            //     return callback(data);
            // }


        },
        error: function (ts) {

            
            var responseText = JSON.parse(ts.responseText);
            if (responseText.message == '') {
                responseText.message = "Server Error";
            }
            
            return callback({ status: 'error', message: responseText.message, type: 'http' });

            // if (ajaxoptions.errorhandle == 'automatic') {


            //     if (ts.status == 403) {
            //         var responseText = JSON.parse(ts.responseText);
            //         erp_errortoaster({ heading: responseText.message, text: [] });



            //     }
            //     else if (ts.status == 401) {
            //         // window.location.href = "/login"
            //     }
            //     else {
            //         alert(ts.responseText);
            //     }
            // }
            // if (ajaxoptions.hasOwnProperty('errorcallback')) {
            //     ajaxoptions.errorcallback.call($(this), ts);
            // }



        },
    });

}








function ajax_request_form(ajaxparameters, callback) {

    var ajaxdefaults = { headers: {}, errorhandle: "automatic", url: "", formid: "", type: "post", method: "post", contenttype: false, processdata: false, appenddata: [], databaseerrorfield: "#databaseerror", database_error_modal: "#database_error_modal", dberrorreturnfield: "database_error", dberrormsgheading: "Constraint Violation", dberror_icon: 'error' };
    ajaxoptions = $.extend(ajaxdefaults, ajaxparameters);  // if a perticular option field  in  corresponding js is given then its default option will not be  considered

    var formelement = $(ajaxoptions.formid);
    var formData = new FormData(formelement[0]);


    if (!jQuery.isEmptyObject(ajaxoptions.appenddata)) {

        for (appendkey in ajaxoptions.appenddata) {
            formData.append(appendkey, ajaxoptions.appenddata[appendkey]);
        }

    }

    formData.append("_method", ajaxoptions.method);

    $.ajax({
        url: ajaxoptions.url,
        headers: ajaxoptions.headers,
        type: ajaxoptions.type,
        data: formData,
        contentType: ajaxoptions.contenttype, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: ajaxoptions.processdata,
        success: function (data) {

            return callback(data);


            // if (ajaxoptions.errorhandle == 'automatic' && data.hasOwnProperty('status') && data.status == 'error') {

            //     Swal.fire({
            //         icon: 'error',
            //         title: 'Error',
            //         html: data.message
            //     });
            //     if (ajaxoptions.hasOwnProperty('errorcallback')) {

            //         ajaxoptions.errorcallback.call(data);
            //     }




            // }
            // else {

            //     return callback(data);
            // }


        },
        error: function (ts) {

            var responseText = JSON.parse(ts.responseText);
            if (responseText.message == '') {
                responseText.message = "Server Error";
            }
            return callback({ status: 'error', message: responseText.message, type: 'http' });

            // if (ajaxoptions.errorhandle == 'automatic') {


            //     if (ts.status == 403) {
            //         var responseText = JSON.parse(ts.responseText);
            //         erp_errortoaster({ heading: responseText.message, text: [] });

            //     }
            //     else if (ts.status == 401) {
            //         window.location.href = "/login"
            //     }
            //     else {
            //         var responseText = JSON.parse(ts.responseText);
            //         erp_errortoaster({ heading: responseText.message, text: [] });
            //     }

            // }

            // if (ajaxoptions.hasOwnProperty('errorcallback')) {

            //     ajaxoptions.errorcallback.call($(this), ts);
            // }


        },
    });



}
