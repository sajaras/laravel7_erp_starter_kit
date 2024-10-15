var $RolesTable = $("#RolesTable");
var $rolesTableCluster;
const roleService = new RoleService();

roleService.enableAddService({
    showaddmodalbutton: "#addRoleButton",
    tableid: "#RolesTable",
    url: "/roles",
    modalid: "#addRoleModal",
    formid: "#addRoleForm",
});



function loadRolesTable($clickedButton) {



    roleService.fetchRoles(function (roles) {

        console.log("sajras", roles);

        var allrows = [];
        var roleRowTemplate = $("#roleRowTemplate").html();
        if (roles.length) {

            for (roleindex in roles) {
                allrows.push(Mustache.to_html(roleRowTemplate, roles[roleindex]));

            }

            $rolesTableCluster = new Clusterize({
                rows: allrows,
                scrollId: 'RolesTableDiv',
                contentId: 'RolesTableBody',
                verify_change: true
            });
        }
        else
        {
            $RolesTable.find('tbody').html("<tr><td colspan='4' class='text-center'>No Records Found</td></tr>");
        }
       
    });





}

$(document).ready(function () {

    loadRolesTable($("#element"));



    $(document).on('dblclick', '.thisrow', function () {



    });



});


































