class PermissionService {
    constructor(params) {
        this.permissions = [];
        this.permissionsArray = [];
        this.editPermission = null;
        this.permissionDeleted = null;
        this.permissionTableCluster = null;
        this.params = params;
        this.highLightPermission = null;
    }

    enableClusterize() {
        this.permissionTableCluster = new Clusterize({
            rows: [],
            scrollId: this.params.displayTableScrollId,
            contentId: this.params.displayTableContentId,
            verify_change: true
        });
    }

    fetchPermissions(callback=null, errorcallback=null) {
        
        var permissionObj = this;
        return ajax_request_formless({ url: '/api/permissions', headers: getapiRequestheaders(), method: 'get', data: {} }, function (response) {
            console.log("res", response);

            if (response.status == 'success') {
                permissionObj.permissions = response.result.permissions;
                if(callback)
                {
                    callback(response.result.permissions, permissionObj);
                }
                

            }
            if (response.status == 'error') {
                if(errorcallback)
                {
                    errorcallback(response, permissionObj);
                }
                
            }

        });
    }

    getPermissions() {
        return this.permissions;
    }
    getEditPermission() {
        return this.editpermission;
    }
    getDeletePermission() {
        return this.permissionDeleted;
    }

    enableAddService(params) {
        if ($(params.modalid).length > 0) {


            // $("PermissionService").adddata2({
            //     showaddmodalbutton: params.showaddmodalbutton,
            //     tableid: params.showaddmodalbutton,
            //     url: params.url,
            //     modalid: params.modalid,
            //     formid: params.formid
            // });
        }
        else {
            alert("Permissions modal code is missing");
        }

    }

    showPermissionAddForm() {

        this.clearAddForm();
        $(this.params.addFormModal).modal('show');

    }
    closePermissionAddForm() {

        this.clearAddForm();
        $(this.params.addFormModal).modal('hide');

    }

    clearAddForm() {

        $(this.params.AddForm)[0].reset();

    }
    clearEditForm() {

        $(this.params.editForm)[0].reset();

    }

    savePermissionAddForm($clickedButton) {
        this.startLoader($(this.params.addFormModal));
        this.createPermission(function (permission, permissionObj) {
            permissionObj.addPermissionSuccessMessage();
            permissionObj.endLoader($(permissionObj.params.addFormModal));
            permissionObj.startPageLoader();
            permissionObj.fetchPermissions(function (permissions, permissionObj) {
                permissionObj.endPageLoader();
                permissionObj.loadPermissionsTable(permissions, permissionObj);
                permissionObj.clearAddForm();
                if ($clickedButton.hasClass('exitmodal')) {
                    permissionObj.closePermissionAddForm();
                }

            },permissionObj.pageLoadErrorHandler);
        }, function (errorResponse, $permissionObj) {
            $permissionObj.displayError(errorResponse);
            $permissionObj.endLoader($($permissionObj.params.addFormModal));
        });
    }

    createPermission(callback, errorcallback) {
        var permissionObj = this;
        return ajax_request_form({ url: '/api/permissions', formid: permissionObj.params.AddForm, headers: getapiRequestheaders(), method: 'post' }, function (response) {

            console.log(response);

            if (response.status == 'success') {
                permissionObj.highLightPermission = response.result.permission;
                callback(response.result.permission, permissionObj);

            }

            else if (response.status == 'error') {
                errorcallback(response, permissionObj);
            }


        });
    }

    loadPermissionsTable(permissions, permissionObj) {

        var allrows = [];
        console.log(permissionObj);
        var permissionRowTemplate = $(permissionObj.params.displayTableRowTemplate).html();
        if (permissions.length) {

            for (var permissionindex in permissions) {
                permissionObj.permissionsArray.push([permissions[permissionindex].id, permissions[permissionindex].name]);
                if (permissionObj.highLightPermission != null && permissionObj.highLightPermission.id == permissions[permissionindex].id) {
                    permissions[permissionindex].highlight = 'highlight';
                }
                allrows.push(Mustache.to_html(permissionRowTemplate, permissions[permissionindex]));

            }
            permissionObj.permissionTableCluster.update(allrows);
            permissionObj.unsetHighlightPermission();
            // permissionObj.permissionTableCluster = new Clusterize({
            //     rows: allrows,
            //     scrollId: permissionObj.params.displayTableScrollId,
            //     contentId: permissionObj.params.displayTableContentId,
            //     verify_change: true
            // });
        }
        else {
            allrows.push("<tr><td colspan='4' class='text-center'>No Records Found</td></tr>");
            permissionObj.permissionTableCluster.update(allrows);
        }

    }

    unsetHighlightPermission() {
        this.highLightPermission = null;
    }
    showEditForm($permissionId) {
        this.getPermission($permissionId, this.displayEditForm,this.displayError);
    }

    displayEditForm(permissionObj) {

        var $EditModal = $(permissionObj.params.editFormModal);
        $EditModal.find('#editingId').val(permissionObj.editPermission.id);
        $EditModal.find('#editPermissionName').val(permissionObj.editPermission.name);
        $EditModal.modal('show');
    }
    getPermission($id, callback,errorcallback) {
        var permissionObj = this;
        return ajax_request_formless({ url: '/api/permissions/' + $id, headers: getapiRequestheaders(), method: 'get', data: {} }, function (response) {
            console.log("editresponse", response);
            
            if (response.status == 'success') {
                permissionObj.editPermission = response.result.permission;
                callback(permissionObj);

            }
            else if (response.status == 'error') {
                errorcallback(response, permissionObj);
            }

        });
    }

    savePermissionEditForm($clickedButton) {
        // this.updatePermission(function(permission,permissionObj){
        //     permissionObj.fetchPermissions(function(permissions,permissionObj){
        //         permissionObj.loadPermissionsTable(permissions,permissionObj);
        //         this.closePermissionEditForm();

        //     });
        // });
        this.startLoader($(this.params.editFormModal));
        this.UpdatePermission(function (permission, permissionObj) {
            permissionObj.editPermissionSuccessMessage();
            permissionObj.endLoader($(permissionObj.params.editFormModal));
            permissionObj.fetchPermissions(function (permissions, permissionObj) {
                permissionObj.loadPermissionsTable(permissions, permissionObj);
                permissionObj.closePermissionEditForm();
                permissionObj.clearEditForm();

            }, permissionObj.pageLoadErrorHandler)
        }, function (errorResponse, $permissionObj) {
            $permissionObj.displayError(errorResponse);
            $permissionObj.endLoader($($permissionObj.params.editFormModal));
        }, $(this.params.editFormModal).find('#editingId').val());

    }

    displayError(errorResponse) {
        Swal.fire({
            icon: 'error',
            title: errorResponse.type + ' Error',
            html: errorResponse.message
        });
    }

    closePermissionEditForm() {


        $(this.params.editFormModal).modal('hide');

    }

    UpdatePermission(callback, errorcallback, $id) {
        var permissionObj = this;

        return ajax_request_form({ url: '/api/permissions/' + $id, formid: permissionObj.params.editForm, headers: getapiRequestheaders(), method: 'put' }, function (response) {

            console.log("updateResponse", response);

            if (response.status == 'success') {
                permissionObj.highLightPermission = response.result.permission;
                callback(response.result.permission, permissionObj);

            }
            else if (response.status == 'error') {
                errorcallback(response, permissionObj);
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

    addPermissionSuccessMessage() {
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
        //     title: 'Permission Added successfully'
        // });

        // let timerInterval
        Swal.fire({
            title: 'Permission Added Successfully',
            html: 'Permission Added Successfully',
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
    editPermissionSuccessMessage() {
        Swal.fire({
            //  icon: 'success',
            title: 'Permission Updated Successfully',
            html: 'Permission Updated Successfully',
            timer: 2000,
            timerProgressBar: true,
        });
    }

    promptAndDeletePermission($permissionId, $displayName) {
        this.showDeletePermissionPrompt($permissionId, $displayName, function ($permissionId, $permissionObj, $displayName) {
            $permissionObj.deletePermission($permissionId, $displayName, function ($permission, $permissionObj, $displayName) {
                $permissionObj.deletePermissionSuccessMessage($displayName);
                $permissionObj.fetchPermissions($permissionObj.loadPermissionsTable, $permissionObj.pageLoadErrorHandler);
            },$permissionObj.displayError);

        });

    }

    showDeletePermissionPrompt($permissionId, $displayName, callback) {
        var $permissionObj = this;
        Swal.fire({
            title: 'Are you sure to delete Permission ' + $displayName,
            text: "You won't be able to revert this!",
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                callback($permissionId, $permissionObj, $displayName);

                // this.deletePermission();
                // Swal.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                // )
            }
        });
    }

    deletePermission($permissionId, $displayName, callback,errorcallback) {

        var permissionObj = this;
        return ajax_request_form({ url: '/api/permissions/' + $permissionId, formid: permissionObj.params.deleteForm, headers: getapiRequestheaders(), method: 'delete' }, function (response) {

            console.log("deleteResponse", response);

            if (response.status == 'success') {

                callback(response.result.permission, permissionObj, $displayName);

            }
            else if (response.status == 'error') {
                errorcallback(response, permissionObj);
            }
            

        });
    }

    deletePermissionSuccessMessage($displayName) {
        Swal.fire({
            //  icon: 'success',
            title: 'Permission Deleted Successfully',
            html: 'Permission <span class="text-danger">' + $displayName + '</span> has been deleted',
            timer: 2000,
            timerProgressBar: true,
        });
    }

    searchTable($searchKey) {
        var $permissionObj = this;
        var matchrecords = []
        for (var i = 0; i < this.permissions.length; i++) {
            var match = false;
            for (var j = 0; j < this.permissionsArray[i].length; j++) {
                if (match) {
                    continue;
                }
                else if (this.permissionsArray[i][j].toString().indexOf($searchKey) > -1) {
                    match = true;
                }

            }
            if (match) {
                matchrecords.push(this.permissions[i]);
            }

        }
        $permissionObj.loadPermissionsTable(matchrecords, $permissionObj);

    }

    pageLoadErrorHandler(errorResponse,$permissionObj) {
        $permissionObj.endPageLoader();
        $permissionObj.displayError(errorResponse)
    }
}