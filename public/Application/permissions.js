var $PermissionsTable = $("#PermissionsTable");
var $permissionsTableCluster;

var permissionServiceParams = {
    pageLoaderId: "#pageLoader",
    pageSearchBox: '#PermissionTableSearch',
    displayTable: '#PermissionsTable',
    addFormModal: '#addPermissionModal',
    AddForm: '#addPermissionForm',
    displayTableScrollId: 'PermissionsTableDiv',
    displayTableContentId: 'PermissionsTableBody',
    displayTableRowTemplate: '#permissionRowTemplate',

    editFormModal: '#editPermissionModal',
    editForm: '#editPermissionForm',
    editButtonClass: '.editButton',

    deleteForm: '#deletePermissionForm',
    deleteButtonClass: '.deleteButton',



};
const permissionService = new PermissionService(permissionServiceParams);
permissionService.enableClusterize();



$(document).ready(function () {


    $("#PermissionsTable").tableHeadFixer();

    $(document).on('click', '#viewPermissionButton', function () {
        permissionService.startPageLoader();
        permissionService.fetchPermissions(function(permissions,$permissionObj){
              permissionService.loadPermissionsTable(permissions,$permissionObj);
              permissionService.endPageLoader();
        }, permissionService.pageLoadErrorHandler);
    });

    $(document).on('click', '#addPermissionButton', function () {

        permissionService.showPermissionAddForm();
    });

    $(document).on('click', permissionServiceParams.addFormModal + ' .saveButton', function () {

        permissionService.savePermissionAddForm($(this));

    });
    $(document).on('click', permissionServiceParams.editButtonClass, function () {

        permissionService.showEditForm($(this).closest('tr').find('.editid').val());

    });

    $(document).on('click', permissionServiceParams.editFormModal + ' .updateButton', function () {


        permissionService.savePermissionEditForm($(this));

    });

    $(document).on('click', permissionServiceParams.deleteButtonClass, function () {
        var $row = $(this).closest('tr');
        permissionService.promptAndDeletePermission($row.find('.editid').val(), $row.find('.deleteDisplay').val());

    });

    $(document).on('keyup', permissionServiceParams.pageSearchBox, function (e) {
        if (e.keyCode == 13) {
            var searchkey = $(this).val();
            if (searchkey != "") {
                permissionService.searchTable(searchkey);

            }
            else {
                permissionService.loadPermissionsTable(permissionService.getPermissions(), permissionService);
            }

        }

    });




    $(document).find("#viewPermissionButton").trigger("click");

});




































