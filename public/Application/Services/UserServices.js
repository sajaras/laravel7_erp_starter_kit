function getUsers(callback) {

   return  ajax_request_formless({ url: '/api/users', headers: getapiRequestheaders(), method: 'get', data: {} }, function (response) {
        console.log("res",response);
        
        if(response.status == 'success')
        {
            callback(response.result.users); 
           
        }

    });

} 