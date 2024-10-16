var $RolesTable = $("#RolesTable");
var $rolesTableCluster;

var roleServiceParams = {
    displayTable:'#RolesTable',
    AddFormModal:'#addRoleModal',
    AddForm:'#addRoleForm',
    displayTableScrollId: 'RolesTableDiv',
    displayTableContentId: 'RolesTableBody',
    displayTableRowTemplate:'#roleRowTemplate'
};
const roleService = new RoleService(roleServiceParams);




$(document).ready(function () {

   


    $(document).on('click','#viewRoleButton',function(){

        roleService.fetchRoles(roleService.loadRolesTable);
    });
    
    $(document).on('click','#addRoleButton',function(){

        roleService.showRoleAddForm();
    });

    $(document).on('click',roleServiceParams.AddFormModal + ' .saveButton',function(){

        roleService.saveRoleAddForm();

    });




    $(document).find("#viewRoleButton").trigger("click");

});




































