class RoleService {
    constructor(params) {
        this.roles = [];
        this.editRole = null;
        this.deleteRole = null;
        this.params = params;
    }
    fetchRoles(callback) {
        var roleObj = this;
        return ajax_request_formless({ url: '/api/roles', headers: getapiRequestheaders(), method: 'get', data: {} }, function (response) {
            console.log("res", response);
            roleObj.roles = response.result.roles;
            if (response.status == 'success') {

                callback(response.result.roles,roleObj);

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
        return this.deleterole;
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
        else
        {
            alert("Roles modal code is missing");
        }

    }

    showRoleAddForm()
    {
       
        this.clearAddForm();
        $(this.params.AddFormModal).modal('show');

    }
    closeRoleAddForm()
    {
       
        this.clearAddForm();
        $(this.params.AddFormModal).modal('hide');

    }

    clearAddForm(){
        
       $(this.params.AddForm)[0].reset();

    }
    clearEditForm(){
        
       $(this.params.editForm)[0].reset();

    }

    saveRoleAddForm($clickedButton)
    {
        this.createRole(function(role,roleObj){
            roleObj.fetchRoles(function(roles,roleObj){
                roleObj.loadRolesTable(roles,roleObj);
                roleObj.clearAddForm();
                if($clickedButton.hasClass('exitmodal'))
                {
                    roleObj.closeRoleAddForm();
                }
                
            });
        });
    }

    createRole(callback)
    {
        var roleObj = this;
        return ajax_request_form({ url: '/api/roles',formid:roleObj.params.AddForm, headers: getapiRequestheaders(), method: 'post'}, function (response) {
            
            console.log(response);
            
            if (response.status == 'success') {

                callback(response.result.role,roleObj);

            }

        });
    }

    loadRolesTable(roles,roleObj)
    {
        
            var allrows = [];
            console.log(roleObj);
            var roleRowTemplate = $(roleObj.params.displayTableRowTemplate).html();
            if (roles.length) {
    
                for(var roleindex in roles) {
                    allrows.push(Mustache.to_html(roleRowTemplate, roles[roleindex]));
    
                }
    
                $rolesTableCluster = new Clusterize({
                    rows: allrows,
                    scrollId: roleObj.params.displayTableScrollId,
                    contentId: roleObj.params.displayTableContentId,
                    verify_change: true
                });
            }
            else
            {
                $(roleObj.params.displayTable).find('tbody').html("<tr><td colspan='4' class='text-center'>No Records Found</td></tr>");
            }
           
        }


        showEditForm($row)
        {
            this.getRole($row.find('.editid').val(),this.displayEditForm);
        }

        displayEditForm(roleObj)
        {
            
            var $EditModal = $(roleObj.params.editFormModal);
            $EditModal.find('#editingId').val(roleObj.editRole.id);
            $EditModal.find('#editRoleName').val(roleObj.editRole.name);
            $EditModal.modal('show');
        }
        getRole($id,callback)
        {
            var roleObj = this;
            return ajax_request_formless({ url: '/api/roles/'+$id, headers: getapiRequestheaders(), method: 'get', data: {} }, function (response) {
                console.log("editresponse", response);
                roleObj.editRole = response.result.role;
                if (response.status == 'success') {
    
                    callback(roleObj);
    
                }
    
            });
        }

        saveRoleEditForm($clickedButton)
        {
            // this.updateRole(function(role,roleObj){
            //     roleObj.fetchRoles(function(roles,roleObj){
            //         roleObj.loadRolesTable(roles,roleObj);
            //         this.closeRoleEditForm();
                    
            //     });
            // });
            this.UpdateRole(function(role,roleObj){
                roleObj.fetchRoles(function(roles,roleObj){
                roleObj.loadRolesTable(roles,roleObj);
                roleObj.closeRoleEditForm();
                roleObj.clearEditForm();
            })},$(this.params.editFormModal).find('#editingId').val());
            
        }

        closeRoleEditForm()
        {
           
            
            $(this.params.editFormModal).modal('hide');
    
        }
    
        UpdateRole(callback,$id)
        {
            var roleObj = this;
            return ajax_request_form({ url: '/api/roles/'+$id,formid:roleObj.params.editForm, headers: getapiRequestheaders(), method: 'put'}, function (response) {
                
                console.log("updateResponse",response);
                
                if (response.status == 'success') {
    
                    callback(response.result.role,roleObj);
    
                }
    
            });
        }


}