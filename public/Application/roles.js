var $RolesTable = $("#RolesTable");
var $rolesTableCluster;

var roleServiceParams = {
    displayTable:'#RolesTable',
    AddFormModal:'#addRoleModal',
    AddForm:'#addRoleForm',
    displayTableScrollId: 'RolesTableDiv',
    displayTableContentId: 'RolesTableBody',
    displayTableRowTemplate:'#roleRowTemplate',

     editFormModal:'#editRoleModal',
     editForm:'#editRoleForm',
    editButtonClass:'.editButton',
    pageLoaderId:"#pageLoader"
    
};
const roleService = new RoleService(roleServiceParams);




$(document).ready(function () {

   
    $("#RolesTable").tableHeadFixer();

    $(document).on('click','#viewRoleButton',function(){
        
        roleService.fetchRoles(roleService.loadRolesTable);
    });
    
    $(document).on('click','#addRoleButton',function(){

        roleService.showRoleAddForm();
    });

    $(document).on('click',roleServiceParams.AddFormModal + ' .saveButton',function(){

        roleService.saveRoleAddForm($(this));

    });
    $(document).on('click',roleServiceParams.editButtonClass ,function(){

        roleService.showEditForm($(this).closest('tr'));

    });

    $(document).on('click',roleServiceParams.editFormModal + ' .updateButton',function(){


        roleService.saveRoleEditForm($(this));

    });




    $(document).find("#viewRoleButton").trigger("click");

});




































