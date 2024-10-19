var $RolesTable = $("#RolesTable");
var $rolesTableCluster;

var roleServiceParams = {
    pageLoaderId: "#pageLoader",
    pageSearchBox: '#RoleTableSearch',
    displayTable: '#RolesTable',
    addFormModal: '#addRoleModal',
    AddForm: '#addRoleForm',
    displayTableScrollId: 'RolesTableDiv',
    displayTableContentId: 'RolesTableBody',
    displayTableRowTemplate: '#roleRowTemplate',

    editFormModal: '#editRoleModal',
    editForm: '#editRoleForm',
    editButtonClass: '.editButton',

    deleteForm: '#deleteRoleForm',
    deleteButtonClass: '.deleteButton',



};
const roleService = new RoleService(roleServiceParams);
const permissionService = new PermissionService({});

roleService.enableClusterize();



$(document).ready(function () {


    $("#RolesTable").tableHeadFixer();
    permissionService.fetchPermissions();
console.log(permissionService.getPermissions());

    $(document).on('click', '#viewRoleButton', function () {
        roleService.startPageLoader();
        roleService.fetchRoles(function(roles,$roleObj){
              roleService.loadRolesTable(roles,$roleObj);
              roleService.endPageLoader();
        }, roleService.pageLoadErrorHandler);
    });

    $(document).on('click', '#addRoleButton', function () {

        roleService.showRoleAddForm();
    });

    $(document).on('click', roleServiceParams.addFormModal + ' .saveButton', function () {

        roleService.saveRoleAddForm($(this));

    });

    $(document).on('click','.rolePermissionAddButton',function(){

        $(this).closest('.modal').find('.rolePermissionsTable tbody').append(roleService.getRowForRolePermissionsTable({rid:'d'}));
    });
    $(document).on('click', roleServiceParams.editButtonClass, function () {

        roleService.showEditForm($(this).closest('tr').find('.editid').val());

    });

    $(document).on('click', roleServiceParams.editFormModal + ' .updateButton', function () {


        roleService.saveRoleEditForm($(this));

    });

    $(document).on('click', roleServiceParams.deleteButtonClass, function () {
        var $row = $(this).closest('tr');
        roleService.promptAndDeleteRole($row.find('.editid').val(), $row.find('.deleteDisplay').val());

    });

    $(document).on('keyup', roleServiceParams.pageSearchBox, function (e) {
        if (e.keyCode == 13) {
            var searchkey = $(this).val();
            if (searchkey != "") {
                roleService.searchTable(searchkey);

            }
            else {
                roleService.loadRolesTable(roleService.getRoles(), roleService);
            }

        }

    });




    $(document).find("#viewRoleButton").trigger("click");

});




































