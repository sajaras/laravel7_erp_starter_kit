var $UsersTable = $("#UsersTable");
$(document).ready(function () {

    getUsers(function (users) {

        console.log("sajras",users);
        
        var allrows = [];
        var userRowTemplate = $("#userRowTemplate").html();
        for(userindex in users)
        {
            allrows.push(Mustache.to_html(userRowTemplate, users[userindex]));

        }

        $UsersTable.find('tbody').html(allrows.join(""));

    });






























    

});


