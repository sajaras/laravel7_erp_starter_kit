var $UsersTable = $("#UsersTable");
var $usersTableCluster;
const userService = new UserService();

userService.enableAddService({
    showaddmodalbutton:"#addUserButton",
    tableid:"#UsersTable",
    url:"/users",
    modalid:"#addUserModal",
    formid:"#addUserForm",
});



function loadUsersTable($clickedButton) {

        
        
    userService.fetchUsers(function (users) {

        console.log("sajras", users);

        var allrows = [];
        var userRowTemplate = $("#userRowTemplate").html();
        for (userindex in users) {
            allrows.push(Mustache.to_html(userRowTemplate, users[userindex]));

        }
        $usersTableCluster = new Clusterize({
            rows: allrows,
            scrollId: 'UsersTableDiv',
            contentId: 'UsersTableBody',
            verify_change: true
        });
    });

     



}

$(document).ready(function () {
    
    loadUsersTable($("#element"));

    

    $(document).on('dblclick','.thisrow',function(){


            
    });
   
        

    });






























    



