class UserService {
    constructor(params) {
        this.users = [];
        this.usersArray = [];
        this.editUser = null;
        this.userDeleted = null;
        this.userTableCluster = null;
        this.params = params;
        this.highLightUser = null;
    }

    enableClusterize() {
        this.userTableCluster = new Clusterize({
            rows: [],
            scrollId: this.params.displayTableScrollId,
            contentId: this.params.displayTableContentId,
            verify_change: true
        });
    }

    fetchUsers(callback, errorcallback) {

        var userObj = this;
        return ajax_request_formless({ url: '/api/users', headers: getapiRequestheaders(), method: 'get', data: {} }, function (response) {
            console.log("res", response);

            if (response.status == 'success') {
                userObj.users = response.result.users;

                callback(response.result.users, userObj);

            }
            if (response.status == 'error') {
                errorcallback(response, userObj);
            }

        });
    }

    getUsers() {
        return this.users;
    }
    getEditUser() {
        return this.edituser;
    }
    getDeleteUser() {
        return this.userDeleted;
    }

    enableAddService(params) {
        if ($(params.modalid).length > 0) {


            // $("UserService").adddata2({
            //     showaddmodalbutton: params.showaddmodalbutton,
            //     tableid: params.showaddmodalbutton,
            //     url: params.url,
            //     modalid: params.modalid,
            //     formid: params.formid
            // });
        }
        else {
            alert("Users modal code is missing");
        }

    }

    showUserAddForm() {

        this.clearAddForm();
        $(this.params.addFormModal).modal('show');

    }
    closeUserAddForm() {

        this.clearAddForm();
        $(this.params.addFormModal).modal('hide');

    }

    clearAddForm() {

        $(this.params.AddForm)[0].reset();
        $(this.params.addModalUserRoleTable).find('tbody').html('');

    }
    clearEditForm() {

        $(this.params.editForm)[0].reset();
        $(this.params.editModalUserRoleTable).find('tbody').html('');

    }

    saveUserAddForm($clickedButton) {
        this.startLoader($(this.params.addFormModal));
        this.createUser(function (user, userObj) {
            userObj.addUserSuccessMessage();
            userObj.endLoader($(userObj.params.addFormModal));
            userObj.startPageLoader();
            userObj.fetchUsers(function (users, userObj) {
                userObj.endPageLoader();
                userObj.loadUsersTable(users, userObj);
                userObj.clearAddForm();
                if ($clickedButton.hasClass('exitmodal')) {
                    userObj.closeUserAddForm();
                }

            }, userObj.pageLoadErrorHandler);
        }, function (errorResponse, $userObj) {
            $userObj.displayError(errorResponse);
            $userObj.endLoader($($userObj.params.addFormModal));
        });
    }

    createUser(callback, errorcallback) {
        var userObj = this;
        return ajax_request_form({ url: '/api/users', formid: userObj.params.AddForm, headers: getapiRequestheaders(), method: 'post' }, function (response) {

            console.log(response);

            if (response.status == 'success') {
                userObj.highLightUser = response.result.user;
                callback(response.result.user, userObj);

            }

            else if (response.status == 'error') {
                errorcallback(response, userObj);
            }


        });
    }

    loadUsersTable(users, userObj) {

        var allrows = [];
        console.log(userObj);
        var userRowTemplate = $(userObj.params.displayTableRowTemplate).html();
        $(userObj.params.displayTable).find('tbody').html('');
        if (users.length) {

            for (var userindex in users) {
                userObj.usersArray.push([users[userindex].id, users[userindex].name]);
                if (userObj.highLightUser != null && userObj.highLightUser.id == users[userindex].id) {
                    users[userindex].highlight = 'highlight';
                }
                allrows.push(Mustache.to_html(userRowTemplate, users[userindex]));

            }
            userObj.userTableCluster.update(allrows);
            userObj.unsetHighlightUser();
            // userObj.userTableCluster = new Clusterize({
            //     rows: allrows,
            //     scrollId: userObj.params.displayTableScrollId,
            //     contentId: userObj.params.displayTableContentId,
            //     verify_change: true
            // });
        }
        else {
            allrows.push("<tr><td colspan='4' class='text-center'>No Records Found</td></tr>");
            userObj.userTableCluster.update(allrows);

        }

    }

    unsetHighlightUser() {
        this.highLightUser = null;
    }
    showEditForm($userId) {
        this.getUser($userId, this.displayEditFormMainTab);
        this.getUserRoles($userId, this.displayEditFormRolesTab);
    }

    displayEditFormMainTab(userObj) {

        var $EditModal = $(userObj.params.editFormModal);
        $EditModal.find('#editingId').val(userObj.editUser.id);
        $EditModal.find('#editUserName').val(userObj.editUser.name);
        $EditModal.find('#editUserEmail').val(userObj.editUser.email);
        $EditModal.find('#editUserPhoneNumber').val(userObj.editUser.phone_number);
        $EditModal.modal('show');
    }
    displayEditFormRolesTab(userRoles, userObj) {
        var allrows = [];
        for (var kuserperm in userRoles) {
            userRoles[kuserperm].roleValue = userRoles[kuserperm].id;
            userRoles[kuserperm].roleDisplay = userRoles[kuserperm].name;
            allrows.push(userObj.getRowForUserRolesTable(userRoles[kuserperm]));
        }

        $(userObj.params.editModalUserRoleTable).find('tbody').html(allrows.join(""));

    }
    getUser($id, callback) {
        var userObj = this;
        return ajax_request_formless({ url: '/api/users/' + $id, headers: getapiRequestheaders(), method: 'get', data: {} }, function (response) {
            console.log("editresponse", response);
            userObj.editUser = response.result.user;
            if (response.status == 'success') {

                callback(userObj);

            }

        });
    }
    getUserRoles($id, callback) {
        var userObj = this;
        return ajax_request_formless({ url: '/api/users/' + $id + '/roles', headers: getapiRequestheaders(), method: 'get', data: {} }, function (response) {
            console.log("edituserrolesresponse", response);

            if (response.status == 'success') {

                callback(response.result.roles, userObj);

            }

        });
    }



    saveUserEditForm($clickedButton) {
        // this.updateUser(function(user,userObj){
        //     userObj.fetchUsers(function(users,userObj){
        //         userObj.loadUsersTable(users,userObj);
        //         this.closeUserEditForm();

        //     });
        // });
        this.startLoader($(this.params.editFormModal));
        this.UpdateUser(function (user, userObj) {
            userObj.editUserSuccessMessage();
            userObj.endLoader($(userObj.params.editFormModal));
            userObj.fetchUsers(function (users, userObj) {
                userObj.loadUsersTable(users, userObj);
                userObj.closeUserEditForm();
                userObj.clearEditForm();

            }, userObj.pageLoadErrorHandler)
        }, function (errorResponse, $userObj) {
            $userObj.displayError(errorResponse);
            $userObj.endLoader($($userObj.params.editFormModal));
        }, $(this.params.editFormModal).find('#editingId').val());

    }

    displayError(errorResponse) {
        Swal.fire({
            icon: 'error',
            title: errorResponse.type + ' Error',
            html: errorResponse.message
        });
    }

    closeUserEditForm() {


        $(this.params.editFormModal).modal('hide');

    }

    UpdateUser(callback, errorcallback, $id) {
        var userObj = this;

        return ajax_request_form({ url: '/api/users/' + $id, formid: userObj.params.editForm, headers: getapiRequestheaders(), method: 'put' }, function (response) {

            console.log("updateResponse", response);

            if (response.status == 'success') {
                userObj.highLightUser = response.result.user;
                callback(response.result.user, userObj);

            }
            else if (response.status == 'error') {
                errorcallback(response, userObj);
            }

        });
    }

    startLoader($modal) {
        $modal.find('.erploader').removeClass('d-none');
    }
    endLoader($modal) {
        $modal.find('.erploader').addClass('d-none');
    }

    startPageLoader() {
        $(this.params.pageLoaderId).removeClass('d-none');
    }
    endPageLoader() {
        $(this.params.pageLoaderId).addClass('d-none');
    }

    addUserSuccessMessage() {
        // const Toast = Swal.mixin({
        //     toast: true,
        //     position: 'bottom-end',
        //     showConfirmButton: false,
        //     timer: 3000,
        //     timerProgressBar: true,
        //     didOpen: (toast) => {
        //       toast.addEventListener('mouseenter', Swal.stopTimer)
        //       toast.addEventListener('mouseleave', Swal.resumeTimer)
        //     }
        // })

        // Toast.fire({
        //     icon: 'success',
        //     title: 'User Added successfully'
        // });

        // let timerInterval
        Swal.fire({
            title: 'User Added Successfully',
            html: 'User Added Successfully',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                // Swal.showLoading();
                // const b = Swal.getHtmlContainer().querySelector('b')
                // timerInterval = setInterval(() => {
                //     b.textContent = Swal.getTimerLeft()
                // }, 100)
            },
            willClose: () => {
                // clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                // console.log('I was closed by the timer')
            }
        })
    }
    editUserSuccessMessage() {
        Swal.fire({
            //  icon: 'success',
            title: 'User Updated Successfully',
            html: 'User Updated Successfully',
            timer: 2000,
            timerProgressBar: true,
        });
    }

    promptAndDeleteUser($userId, $displayName) {
        this.showDeleteUserPrompt($userId, $displayName, function ($userId, $userObj, $displayName) {
            $userObj.deleteUser($userId, $displayName, function ($user, $userObj, $displayName) {
                $userObj.deleteUserSuccessMessage($displayName);
                $userObj.fetchUsers($userObj.loadUsersTable, $userObj.pageLoadErrorHandler);
            }, $userObj.displayError);

        });

    }

   

    showDeleteUserPrompt($userId, $displayName, callback) {
        var $userObj = this;
        Swal.fire({
            title: 'Are you sure to delete User ' + $displayName,
            text: "You won't be able to revert this!",
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                callback($userId, $userObj, $displayName);

                // this.deleteUser();
                // Swal.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                // )
            }
        });
    }

    deleteUser($userId, $displayName, callback, errorcallback) {

        var userObj = this;
        return ajax_request_form({ url: '/api/users/' + $userId, formid: userObj.params.deleteForm, headers: getapiRequestheaders(), method: 'delete' }, function (response) {

            console.log("deleteResponse", response);

            if (response.status == 'success') {

                callback(response.result.user, userObj, $displayName);

            }
            else if (response.status == 'error') {
                errorcallback(response, userObj);
            }


        });
    }

    deleteUserSuccessMessage($displayName) {
        Swal.fire({
            //  icon: 'success',
            title: 'User Deleted Successfully',
            html: 'User <span class="text-danger">' + $displayName + '</span> has been deleted',
            timer: 2000,
            timerProgressBar: true,
        });
    }


    promptAndResetPassword($userId, $displayName) {
        this.showUserPasswordChangePrompt($userId, $displayName, function ($userId, $userObj, $displayName) {
            $userObj.ChangePassword($userId, $displayName, function ($user, $userObj, $displayName) {
                $userObj.ChangePasswordSuccessMessage($displayName);
            }, $userObj.displayError);

        });

    }


    showUserPasswordChangePrompt($userId, $displayName, callback) {
        var $userObj = this;
        Swal.fire({
            title: 'Are you sure to Reset Password of the User ' + $displayName,
            text: "You won't be able to revert this!",
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Reset it!'
        }).then((result) => {
            if (result.isConfirmed) {
                callback($userId, $userObj, $displayName);

                // this.deleteUser();
                // Swal.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                // )
            }
        });
    }

    ChangePassword($userId, $displayName, callback, errorcallback) {

        var userObj = this;
        return ajax_request_formless({ url: '/api/users/' + $userId + '/resetpassword',data:{autoGeneratePassword:'yes'}, headers: getapiRequestheaders(), method: 'post' }, function (response) {

            console.log("passwordChangeResponse", response);

            if (response.status == 'success') {

                callback(response.result.user, userObj,response.result.password);

            }
            else if (response.status == 'error') {
                errorcallback(response, userObj);
            }


        });
    }
    ChangePasswordSuccessMessage($password) {
        Swal.fire({
            //  icon: 'success',
            title: 'User Password Reset Successfully',
            html: 'Password : ' + $password ,
            timer: 2000,
            timerProgressBar: true,
        });
    }

    searchTable($searchKey) {
        var $userObj = this;
        var matchrecords = []
        for (var i = 0; i < this.users.length; i++) {
            var match = false;
            for (var j = 0; j < this.usersArray[i].length; j++) {
                if (match) {
                    continue;
                }
                else if (this.usersArray[i][j].toString().indexOf($searchKey) > -1) {
                    match = true;
                }

            }
            if (match) {
                matchrecords.push(this.users[i]);
            }

        }
        $userObj.loadUsersTable(matchrecords, $userObj);

    }

    pageLoadErrorHandler(errorResponse, $userObj) {
        $userObj.endPageLoader();
        $userObj.displayError(errorResponse)
    }

    getRowForUserRolesTable(data) {
        var UserRolesTableRowTemplate = $("#userRolesRowTemplate").html();
        return Mustache.to_html(UserRolesTableRowTemplate, data);
    }

    removeSelectedUserRoleRows($table) {
        $table.find('tbody tr').each(function () {

            if ($(this).find('.rowCheckbox').prop("checked") == true) {

                $(this).remove();
            }
        });
    }
    addUserRoleRow($table, data) {

        $table.append(this.getRowForUserRolesTable(data));

    }
}