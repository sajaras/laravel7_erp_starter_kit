
class RoleService {
    constructor(params) {
        this.roles = [];
        this.rolesArray = [];
        this.editRole = null;
        this.roleDeleted = null;
        this.roleTableCluster = null;
        this.params = params;
        this.highLightRole = null;
    }

    enableClusterize() {
        this.roleTableCluster = new Clusterize({
            rows: [],
            scrollId: this.params.displayTableScrollId,
            contentId: this.params.displayTableContentId,
            verify_change: true
        });
    }

    fetchRoles(callback=null, errorcallback=null) {

        var roleObj = this;
        return ajax_request_formless({ url: '/api/roles', headers: getapiRequestheaders(), method: 'get', data: {} }, function (response) {
            console.log("res", response);

            if (response.status == 'success') {
                roleObj.roles = response.result.roles;
                if(callback)
                {
                    callback(response.result.roles, roleObj);
                }
                

            }
            if (response.status == 'error') {
                if(errorcallback)
                {
                    errorcallback(response, roleObj);
                }
                
            }

        });
    }

    getRoles() {
        return this.roles;
    }
    getEditRole() {
        return this.editrole;
    }
    getDeleteRole() {
        return this.roleDeleted;
    }

    enableAddService(params) {
        if ($(params.modalid).length > 0) {


            // $("RoleService").adddata2({
            //     showaddmodalbutton: params.showaddmodalbutton,
            //     tableid: params.showaddmodalbutton,
            //     url: params.url,
            //     modalid: params.modalid,
            //     formid: params.formid
            // });
        }
        else {
            alert("Roles modal code is missing");
        }

    }

    showRoleAddForm() {

        this.clearAddForm();
        $(this.params.addFormModal).modal('show');

    }
    closeRoleAddForm() {

        this.clearAddForm();
        $(this.params.addFormModal).modal('hide');

    }

    clearAddForm() {

        $(this.params.AddForm)[0].reset();
        $(this.params.addModalRolePermissionTable).find('tbody').html('');

    }
    clearEditForm() {

        $(this.params.editForm)[0].reset();
        $(this.params.editModalRolePermissionTable).find('tbody').html('');

    }

    saveRoleAddForm($clickedButton) {
        this.startLoader($(this.params.addFormModal));
        this.createRole(function (role, roleObj) {
            roleObj.addRoleSuccessMessage();
            roleObj.endLoader($(roleObj.params.addFormModal));
            roleObj.startPageLoader();
            roleObj.fetchRoles(function (roles, roleObj) {
                roleObj.endPageLoader();
                roleObj.loadRolesTable(roles, roleObj);
                roleObj.clearAddForm();
                if ($clickedButton.hasClass('exitmodal')) {
                    roleObj.closeRoleAddForm();
                }

            }, roleObj.pageLoadErrorHandler);
        }, function (errorResponse, $roleObj) {
            $roleObj.displayError(errorResponse);
            $roleObj.endLoader($($roleObj.params.addFormModal));
        });
    }

    createRole(callback=null, errorcallback=null) {
        var roleObj = this;
        return ajax_request_form({ url: '/api/roles', formid: roleObj.params.AddForm, headers: getapiRequestheaders(), method: 'post' }, function (response) {

            console.log(response);

            if (response.status == 'success') {
                roleObj.highLightRole = response.result.role;
                if(callback)
                {
                    callback(response.result.role, roleObj);

                }
                
            }

            else if (response.status == 'error') {
                if(errorcallback)
                {
                    errorcallback(response, roleObj);
                }
                
            }


        });
    }

    loadRolesTable(roles, roleObj) {

        var allrows = [];
        console.log(roleObj);
        var roleRowTemplate = $(roleObj.params.displayTableRowTemplate).html();
        if (roles.length) {

            for (var roleindex in roles) {
                roleObj.rolesArray.push([roles[roleindex].id, roles[roleindex].name]);
                if (roleObj.highLightRole != null && roleObj.highLightRole.id == roles[roleindex].id) {
                    roles[roleindex].highlight = 'highlight';
                }
                allrows.push(Mustache.to_html(roleRowTemplate, roles[roleindex]));

            }
            roleObj.roleTableCluster.update(allrows);
            roleObj.unsetHighlightRole();
            // roleObj.roleTableCluster = new Clusterize({
            //     rows: allrows,
            //     scrollId: roleObj.params.displayTableScrollId,
            //     contentId: roleObj.params.displayTableContentId,
            //     verify_change: true
            // });
        }
        else {
            allrows.push("<tr><td colspan='4' class='text-center'>No Records Found</td></tr>");
            roleObj.roleTableCluster.update(allrows);
        }

    }

    unsetHighlightRole() {
        this.highLightRole = null;
    }
    showEditForm($roleId) {
        this.getRole($roleId, this.displayEditFormMainTab);
        this.getRolePermissions($roleId, this.displayEditFormPermissionsTab);
    }

    displayEditFormMainTab(roleObj) {

        var $EditModal = $(roleObj.params.editFormModal);
        $EditModal.find('#editingId').val(roleObj.editRole.id);
        $EditModal.find('#editRoleName').val(roleObj.editRole.name);
        $EditModal.modal('show');
    }
    displayEditFormPermissionsTab(rolePermissions, roleObj) {
        var allrows = [];
        for (var kroleperm in rolePermissions) {
            rolePermissions[kroleperm].permissionValue = rolePermissions[kroleperm].id;
            rolePermissions[kroleperm].permissionDisplay = rolePermissions[kroleperm].name;
            allrows.push(roleObj.getRowForRolePermissionsTable(rolePermissions[kroleperm]));
        }

        $(roleObj.params.editModalRolePermissionTable).find('tbody').html(allrows.join(""));

    }
    getRole($id, callback=null) {
        var roleObj = this;
        return ajax_request_formless({ url: '/api/roles/' + $id, headers: getapiRequestheaders(), method: 'get', data: {} }, function (response) {
            console.log("editresponse", response);
            roleObj.editRole = response.result.role;
            if (response.status == 'success') {
                if(callback)
                {
                    callback(roleObj);
                }
                

            }

        });
    }
    getRolePermissions($id, callback=null) {
        var roleObj = this;
        return ajax_request_formless({ url: '/api/roles/' + $id + '/permissions', headers: getapiRequestheaders(), method: 'get', data: {} }, function (response) {
            console.log("editrolepermissionsresponse", response);

            if (response.status == 'success') {

                if(callback)
                {
                    callback(response.result.permissions, roleObj);
                }
                

            }

        });
    }



    saveRoleEditForm($clickedButton) {
        // this.updateRole(function(role,roleObj){
        //     roleObj.fetchRoles(function(roles,roleObj){
        //         roleObj.loadRolesTable(roles,roleObj);
        //         this.closeRoleEditForm();

        //     });
        // });
        this.startLoader($(this.params.editFormModal));
        this.UpdateRole(function (role, roleObj) {
            roleObj.editRoleSuccessMessage();
            roleObj.endLoader($(roleObj.params.editFormModal));
            roleObj.fetchRoles(function (roles, roleObj) {
                roleObj.loadRolesTable(roles, roleObj);
                roleObj.closeRoleEditForm();
                roleObj.clearEditForm();

            }, roleObj.pageLoadErrorHandler)
        }, function (errorResponse, $roleObj) {
            $roleObj.displayError(errorResponse);
            $roleObj.endLoader($($roleObj.params.editFormModal));
        }, $(this.params.editFormModal).find('#editingId').val());

    }

    displayError(errorResponse) {
        Swal.fire({
            icon: 'error',
            title: errorResponse.type + ' Error',
            html: errorResponse.message
        });
    }

    closeRoleEditForm() {


        $(this.params.editFormModal).modal('hide');

    }

    UpdateRole(callback, errorcallback, $id) {
        var roleObj = this;

        return ajax_request_form({ url: '/api/roles/' + $id, formid: roleObj.params.editForm, headers: getapiRequestheaders(), method: 'put' }, function (response) {

            console.log("updateResponse", response);

            if (response.status == 'success') {
                roleObj.highLightRole = response.result.role;
                callback(response.result.role, roleObj);

            }
            else if (response.status == 'error') {
                errorcallback(response, roleObj);
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

    addRoleSuccessMessage() {
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
        //     title: 'Role Added successfully'
        // });

        // let timerInterval
        Swal.fire({
            title: 'Role Added Successfully',
            html: 'Role Added Successfully',
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
    editRoleSuccessMessage() {
        Swal.fire({
            //  icon: 'success',
            title: 'Role Updated Successfully',
            html: 'Role Updated Successfully',
            timer: 2000,
            timerProgressBar: true,
        });
    }

    promptAndDeleteRole($roleId, $displayName) {
        this.showDeleteRolePrompt($roleId, $displayName, function ($roleId, $roleObj, $displayName) {
            $roleObj.deleteRole($roleId, $displayName, function ($role, $roleObj, $displayName) {
                $roleObj.deleteRoleSuccessMessage($displayName);
                $roleObj.fetchRoles($roleObj.loadRolesTable, $roleObj.pageLoadErrorHandler);
            }, $roleObj.displayError);

        });

    }

    showDeleteRolePrompt($roleId, $displayName, callback) {
        var $roleObj = this;
        Swal.fire({
            title: 'Are you sure to delete Role ' + $displayName,
            text: "You won't be able to revert this!",
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                callback($roleId, $roleObj, $displayName);

                // this.deleteRole();
                // Swal.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                // )
            }
        });
    }

    deleteRole($roleId, $displayName, callback, errorcallback) {

        var roleObj = this;
        return ajax_request_form({ url: '/api/roles/' + $roleId, formid: roleObj.params.deleteForm, headers: getapiRequestheaders(), method: 'delete' }, function (response) {

            console.log("deleteResponse", response);

            if (response.status == 'success') {

                callback(response.result.role, roleObj, $displayName);

            }
            else if (response.status == 'error') {
                errorcallback(response, roleObj);
            }


        });
    }

    deleteRoleSuccessMessage($displayName) {
        Swal.fire({
            //  icon: 'success',
            title: 'Role Deleted Successfully',
            html: 'Role <span class="text-danger">' + $displayName + '</span> has been deleted',
            timer: 2000,
            timerProgressBar: true,
        });
    }

    searchTable($searchKey) {
        var $roleObj = this;
        var matchrecords = []
        for (var i = 0; i < this.roles.length; i++) {
            var match = false;
            for (var j = 0; j < this.rolesArray[i].length; j++) {
                if (match) {
                    continue;
                }
                else if (this.rolesArray[i][j].toString().indexOf($searchKey) > -1) {
                    match = true;
                }

            }
            if (match) {
                matchrecords.push(this.roles[i]);
            }

        }
        $roleObj.loadRolesTable(matchrecords, $roleObj);

    }

    pageLoadErrorHandler(errorResponse, $roleObj) {
        $roleObj.endPageLoader();
        $roleObj.displayError(errorResponse)
    }

    getRowForRolePermissionsTable(data) {
        var RolePermissionsTableRowTemplate = $("#rolePermissionsRowTemplate").html();
        return Mustache.to_html(RolePermissionsTableRowTemplate, data);
    }

    removeSelectedRolePermissionRows($table) {
        $table.find('tbody tr').each(function () {

            if ($(this).find('.rowCheckbox').prop("checked") == true) {

                $(this).remove();
            }
        });
    }
    addRolePermissionRow($table, data) {

        $table.append(this.getRowForRolePermissionsTable(data));

    }
}