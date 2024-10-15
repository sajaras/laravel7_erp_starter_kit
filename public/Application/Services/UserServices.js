// function getUsers(callback) {

//    return  ajax_request_formless({ url: '/api/users', headers: getapiRequestheaders(), method: 'get', data: {} }, function (response) {
//         console.log("res",response);

//         if(response.status == 'success')
//         {
//             callback(response.result.users); 

//         }

//     });

// } 

class UserService {
    constructor() {
        this.users = [];
        this.edituser = null;
        this.deleteuser = null;
    }
    fetchUsers(callback) {
        var userob = this;
        return ajax_request_formless({ url: '/api/users', headers: getapiRequestheaders(), method: 'get', data: {} }, function (response) {
            console.log("res", response);
            userob.users = response.result.users;
            if (response.status == 'success') {

                callback(response.result.users);

            }

        });
    }

    getUsers() {
        return this.users;
    }
    getEditUser() {
        return his.edituser;
    }
    getDeleteUser() {
        return this.deleteuser;
    }

    enableAddService(params) {
        if ($(params.modalid).length > 0) {


            $("UserService").adddata2({
                showaddmodalbutton: params.showaddmodalbutton,
                tableid: params.showaddmodalbutton,
                url: params.url,
                modalid: params.modalid,
                formid: params.formid
            });
        }
        else
        {
            alert("Users modal code is missing");
        }

    }


}