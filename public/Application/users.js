var $UsersTable = $("#UsersTable");
var $usersTableCluster;
$(document).ready(function () {

    function loadUsersTable($clickedButton) {
        getUsers(function (users) {

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
        }
   
        

    });






























    

});


