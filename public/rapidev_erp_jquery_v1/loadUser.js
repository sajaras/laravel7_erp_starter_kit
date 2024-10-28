
function getAuthUser(callback) {

    var access_token = getCookie('access_token');
    ajax_request_formless({ url: '/api/user', headers: getapiRequestheaders(), method: 'get', data: {} }, function (result) {
        callback(result);
    });
}

function getAuthUserUnreadNotifications(callback) {

    var access_token = getCookie('access_token');
    ajax_request_formless({ url: '/api/user/unreadnotifications', headers: getapiRequestheaders(), method: 'get', data: {} }, function (result) {
        callback(result);
    });
}



function logout() 
{

    deletecookie('access_token');
    redirectToLogin();

}

