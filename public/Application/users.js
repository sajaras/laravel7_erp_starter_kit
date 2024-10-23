var $UsersTable = $("#UsersTable");
var $usersTableCluster;

var userServiceParams = {
    pageLoaderId: "#pageLoader",
    pageSearchBox: '#UserTableSearch',
    displayTable: '#UsersTable',

    addFormModal: '#addUserModal',
    AddForm: '#addUserForm',
    addModalUserRoleTable:'#userRolesTable',

    displayTableScrollId: 'UsersTableDiv',
    displayTableContentId: 'UsersTableBody',
    displayTableRowTemplate: '#userRowTemplate',

    editFormModal: '#editUserModal',
    editForm: '#editUserForm',
    editModalUserRoleTable:'#userRolesEditTable',
    editButtonClass: '.editButton',

    deleteForm: '#deleteUserForm',
    deleteButtonClass: '.deleteButton',



};
const userService = new UserService(userServiceParams);
const roleService = new RoleService({});

userService.enableClusterize();

$(document).ready(function () {


    $("#UsersTable").tableHeadFixer();
     roleService.fetchRoles();
     
  

console.log(roleService.getRoles());

    $(document).on('click', '#viewUserButton', function () {
        userService.startPageLoader();
        userService.fetchUsers(function(users,$userObj){
              userService.loadUsersTable(users,$userObj);
              userService.endPageLoader();
        }, userService.pageLoadErrorHandler);
    });

    $(document).on('click', '#addUserButton', function () {

        userService.showUserAddForm();
    });

    $(document).on('click', userServiceParams.addFormModal + ' .saveButton', function () {

        userService.saveUserAddForm($(this));

    });

    $(document).on('click','.userRoleAddButton',function(){

        userService.addUserRoleRow($(this).closest('table'),{});
    });

    $(document).on('click','.userRoledeleteButton',function(){

        userService.removeSelectedUserRoleRows($(this).closest('table'));
    });

    $(document).on('click', userServiceParams.editButtonClass, function () {

        userService.showEditForm($(this).closest('tr').find('.editid').val());

    });

    $(document).on('click', userServiceParams.editFormModal + ' .updateButton', function () {

        userService.saveUserEditForm($(this));

    });

    $(document).on('click', userServiceParams.deleteButtonClass, function () {
        var $row = $(this).closest('tr');
        userService.promptAndDeleteUser($row.find('.editid').val(), $row.find('.deleteDisplay').val());

    });

    $(document).on('keyup', userServiceParams.pageSearchBox, function (e) {
        if (e.keyCode == 13) {
            var searchkey = $(this).val();
            if (searchkey != "") {
                userService.searchTable(searchkey);

            }
            else {
                userService.loadUsersTable(userService.getUsers(), userService);
            }

        }

    });




    $(document).find("#viewUserButton").trigger("click");

    $("#userRolesTable tbody, #userRolesEditTable tbody").dynamicautocompletion({customwidgetclass:"ui-autocomplete-900px",datamethod:"alasql",
        datalabel :["id","-","name"],datahiddenvalue:['id'],datavalue:["id"],datadesc:["name"],
        onselection:{
                "#userRolesTable":{ emptylisttext:"Role List Empty",tdclass:'.roleValue',superentity:".roleDisplay",setext:"desc",hiddenfield:".roleId",hfuivalue:"gid"},
                "#userRolesEditTable":{ emptylisttext:"Role List Empty",tdclass:'.roleValue',superentity:".roleDisplay",setext:"desc",hiddenfield:".roleId",hfuivalue:"gid"},
        },
        datasourcefromalasql:function(){
                
                return roleService.getRoles();
    
        }
    });

});




































