function displayform(formobject) {
    formobject.modal('show');
}

function hideform(formobject) {
    formobject.modal('hide');

}

function all_requiredfields_entered(parametersobjects) {

    var emptylist = [];
    var valtypes = ['input','select','checkbox','radio'];
    for(keywebelementname in parametersobjects)
    {

        if(valtypes.indexOf(parametersobjects[keywebelementname][0].nodeName.toLowerCase()) > -1 )
        {
            if(emptyornull(parametersobjects[keywebelementname].val()))
            {
                emptylist.push(keywebelementname.split('_').join(' '));
            }

        }
        else
        {

            if(emptyornull(parametersobjects[keywebelementname].text()) )
            {
                emptylist.push(keywebelementname.split('_').join(' '));

            }

        }


    }
    
    if(emptylist.length > 0)
    {
        erp_toaster({hideAfter:5000,class:'toaster-medium',textColor:"white",icon:"error",bgColor:"indian-red",heading:"Following Fields are Required",text:emptylist});
        return false;
    }

    return true;
}


function emptyornull(value) {

    if(value == null || value == '')
    {
        return 1;
    }
    return 0;
}
