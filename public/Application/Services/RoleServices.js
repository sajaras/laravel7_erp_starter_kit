// function getRoles(callback) {

//    return  ajax_request_formless({ url: '/api/roles', headers: getapiRequestheaders(), method: 'get', data: {} }, function (response) {
//         console.log("res",response);

//         if(response.status == 'success')
//         {
//             callback(response.result.roles); 

//         }

//     });

// } 

class RoleService {
    constructor() {
        this.roles = [];
        this.editrole = null;
        this.deleterole = null;
    }
    fetchRoles(callback) {
        var roleob = this;
        return ajax_request_formless({ url: '/api/roles', headers: getapiRequestheaders(), method: 'get', data: {} }, function (response) {
            console.log("res", response);
            roleob.roles = response.result.roles;
            if (response.status == 'success') {

                callback(response.result.roles);

            }

        });
    }

    getRoles() {
        return this.roles;
    }
    getEditRole() {
        return his.editrole;
    }
    getDeleteRole() {
        return this.deleterole;
    }

    enableAddService(params) {
        if ($(params.modalid).length > 0) {


            $("RoleService").adddata2({
                showaddmodalbutton: params.showaddmodalbutton,
                tableid: params.showaddmodalbutton,
                url: params.url,
                modalid: params.modalid,
                formid: params.formid
            });
        }
        else
        {
            alert("Roles modal code is missing");
        }

    }


}