/*
Main.js
This file consist of set of helper functions listed below

-Read cookie function
-  it provides cookie value if name of cookie is given as parameter

-setaccordion  function
-used to make accordion in left side bar

-setmilmacookies
find the last opened side bar link and make it open

- click event for class sidebarlink : set cookie to remember the left side bar last clicked link in each of top bar      -

-key up event for input[type='date '] : to check if year of date field is between erpmindate and erpmaxdate

-setarrowtable: for setting table keyboard arrow key movable

-toupperonkeyup : Change to upperkey text on keyup

-toloweonkeyup : Change to lowekey text on keyup

-clearhtmls() :to clear html of passed fields

-clearvals(): to clear val of passed clearfields

-cleartexts(): to clear text of passed fields

-autofocusing autofocus enabled fields inside modals

-en_submitbutton_if_filled: this function check whether the all required feilds are filled or not.
argument
argument[0]: common class name of checking feilds (string)
argument[1]: button id or class (string)

-substractDate : this function reduce the given number of days from a given date string from a date field value
arguments
arguments[0] : values of date (string)
arguments[1] : numberof days (integer)

-checklock : to check locks of modal

-setCookie and getCookie functions : to set and read cookie values

-validateCallCenterTab : to restrict multiple tabs

- events to disable back and forward buttons

-disabling inspect element
line no : 508

*/


// $(document).ready(function () {
//    $('.modal').on('show.bs.modal', function () {
//
//        if ($(document).height() > $(window).height()) {
//            // no-scroll
//            $('body').addClass("modal-open-noscroll");
//        }
//        else {
//            $('body').removeClass("modal-open-noscroll");
//        }
//    });
//    $('.modal').on('hide.bs.modal', function () {
//        $('body').removeClass("modal-open-noscroll");
//    });
// })

//delete highter cookie on page load
deletecookie("highlightrow");
//
$('form').attr("autocomplete", "off");
$('form').attr("autocomplete", "none");



function setaccordion() {
        var acc = document.getElementsByClassName("accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
                acc[i].addEventListener("click", function () {
                        this.classList.toggle("active");
                        var panel = this.nextElementSibling;
                        if (panel.style.maxHeight) {
                                panel.style.maxHeight = null;
                        }
                        else {
                                panel.style.maxHeight = panel.scrollHeight + "px";
                        }
                });
        }

}

function readCookie(name) {
        var cookiename = name + "=";
        var ca = document.cookie.split(';');

        for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(cookiename) == 0) return c.substring(cookiename.length, c.length);
        }
        return null;
}

setmilmacookies();

function setmilmacookies() {
        $("#org_shortname").text(readCookie("org_shortname") + "::");
        $("#region_shortname").text(readCookie("region_shortname") + "::");
        $("#unit_shortname").text(getCookie("unit_name").replace(/\+/g, ' '));
        // var linkactive = $('.navlinkactive').text();
        // var currentpage  = readCookie(linkactive+"csl").replace(/\+/g, ' ');
        // if(currentpage !="")
        // {
        //         $('.sidebarlink').each(function(i, obj)
        //         {
        //                 if(!(currentpage.localeCompare($(this).text())))
        //                 {
        //                         // $(this).parent().closest('.accordion').trigger('click');
        //                         $(this).closest('.panel').prev(".accordion").trigger('click');
        //                 }
        //
        //         });
        // }
        // else
        // {
        //         $(".accordion:first").trigger('click');
        // }
}

// setting cookie for sidebar remembering
$(document).on('click', '.sidebarlink', function () {
        var navlinkactivetext = $('.navlinkactive').text();
        document.cookie = navlinkactivetext + "csl=" + $(this).text();
});

$(document).on('keyup', 'input[type="date"]', function () {
        var labelelement;
        if ($(this).hasClass("samedivlabel")) {
                labelelement = $(this).next("label");
                // return;


        }
        else {
                labelelement = $(this).parent().find('label');
        }
        labelelement.text("");
        var d1 = erpmindate.split("-");
        var d2 = erpmaxdate.split("-");
        var c = $(this).val().split("-");
        var from = new Date(d1[0], parseInt(d1[1]) - 1, d1[2]);  // -1 because months are from 0 to 11
        var to = new Date(d2[0], parseInt(d2[1]) - 1, d2[2]);
        var check = new Date(c[0], parseInt(c[1]) - 1, c[2]);
        if (check >= from && check <= to) {

        }
        else {

                labelelement.text("**");
                labelelement.attr("style", "color:red;");
        }

});


function setarrowtable() {
        $(arguments[0]).arrowTable({
                enabledKeys: ['up', 'left', 'right', 'down'],
                focusTarget: 'input, select',
                listenTarget: 'input, select ',
                beforeMove: function (input, targetFinder, direction) {
                        // Determine the target
                        var target = targetFinder();
                        if (direction === 'down' && $(".ui-autocomplete.ui-widget").is(":visible")) {

                                // Don't allow move
                                return false;
                        }
                }

        });
}














// var currCell = $('td').first();
// // User clicks on a cell
// $('#thispagetable >tbody tr td').click(function() {
//     currCell = $(this);
//
// });
// // User navigates table using keyboard
// $('#thispagetable').keydown(function (e) {
//     var c = "";
//       if (e.which == 38) {
//
//         // Up Arrow
//         c = currCell.closest('tr').prev().find('td:eq(' +
//           currCell.index() + ')');
//
//           c.closest('tr').addClass('highlighten');
//     } else if (e.which == 40) {
//         // Down Arrow
//         c = currCell.closest('tr').next().find('td:eq(' +
//           currCell.index() + ')');
//     } else if (!editing && (e.which == 13 || e.which == 32)) {
//         // Enter or Spacebar - edit cell
//         e.preventDefault();
//         edit();
//     } else if (!editing && (e.which == 9 && !e.shiftKey)) {
//         // Tab
//         e.preventDefault();
//         c = currCell.next();
//     } else if (!editing && (e.which == 9 && e.shiftKey)) {
//         // Shift + Tab
//         e.preventDefault();
//         c = currCell.prev();
//     }
//
//     // If we didn't hit a boundary, update the current cell
//     if (c.length > 0) {
//         currCell = c;
//         currCell.focus();
//     }
// });



function toupperonkeyup() {
        $(document).on('focusout', arguments[0], function () {
                this.value = this.value.toLocaleUpperCase();
        });
}

function toloweronkeyup() {
        $(document).on('focusout', arguments[0], function () {
                this.value = this.value.toLocaleLowerCase();
        });
}

function clearhtmls() {
        for (var i = 0; i < arguments.length; i++) {

                $(arguments[i]).html('');
        }
}
function clearvals() {
        for (var i = 0; i < arguments.length; i++) {
                $(arguments[i]).val('');
        }
}
function cleartexts() {
        for (var i = 0; i < arguments.length; i++) {
                $(arguments[i]).text('');
        }
}





// autofucusing autofocus enabled field in modals
$(document).ready(function () {
        $('#addmodal').on('shown.bs.modal', function () {
                $(this).find('[autofocus]').focus();
        });

        $('#addressaddmodal').on('shown.bs.modal', function () {
                $(this).find('[autofocus]').focus();
        });


        $('#addindentmodal').on('shown.bs.modal', function () {
                $(this).find('[autofocus]').focus();
        });

        $('#bulkindnetmodal').on('shown.bs.modal', function () {
                $(this).find('[autofocus]').focus();
        });


        $('#paymentmodal').on('shown.bs.modal', function () {
                $(this).find('[autofocus]').focus();
        });


});


function en_submitbutton_if_filled() {
        $(arguments[1]).attr("disabled", "disabled");
        $(arguments[1]).prop("disabled", true);
        var datecheckfields = $(arguments[0]);
        var allfilled = 1;
        for (var i = 0; i < datecheckfields.length; i++) {
                if ($(datecheckfields[i]).val() == "") {
                        allfilled = 0;
                }
        }
        if (allfilled == 1) {
                $(arguments[1]).removeAttr('disabled');
                $(arguments[1]).prop("disabled", false);
        }
}

function substractDate(convertdate, noofdays) {
        var date = new Date(convertdate);
        date.setDate(date.getDate() - noofdays);
        var month = date.getMonth() + 1;
        var twodigitmonth = ("0" + month).slice(-2);
        var day = date.getDate();
        var twodigitdays = ("0" + day).slice(-2);
        var year = date.getFullYear();
        return year + "-" + twodigitmonth + "-" + twodigitdays;
}
function addDate(convertdate, noofdays) {
        var date = new Date(convertdate);
        date.setDate(date.getDate() + noofdays);
        var month = date.getMonth() + 1;
        var twodigitmonth = ("0" + month).slice(-2);
        var day = date.getDate();
        var twodigitdays = ("0" + day).slice(-2);
        var year = date.getFullYear();
        return year + "-" + twodigitmonth + "-" + twodigitdays;
}


/* locks,multiple tab windows handling functions */
function checklock(element, event_name) {
        var modalid = $(element).data("target");
        var url = "/acesslock/" + event_name;
        $.get(url, function (data) {
                if (data == 1) {
                        $(modalid).modal('show');
                }
                else {
                        $(modalid).modal('hide');
                        $("#modalmessage").text("This event is in use by someone in your unit.please wait till the lock has been released");
                        $("#messagemodal").modal('show');
                }
        }).fail(function (ts) {
                alert(ts.responseText);
        });
}

function associativearrayjoin(array, key, seperator) {

        return array.map(function (elem) {
                return elem[key];
        }).join(seperator);
}

function round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
}

$(window).on("beforeunload", function () {

        $.get("/releaselocksinpage", function (data) {

        })
});

// for disabling back and forward buttons
jQuery(document).ready(function ($) {

        if (window.history && window.history.pushState) {

                window.history.pushState('forward', null, null);

                $(window).on('popstate', function () {
                        $("#msgtitle").text("WARNING");
                        $("#modalmessage").text(" Back and forward buttons are not allowed.");
                        $("#messagemodal").modal('show');
                });

        }

        // validateCallCenterTab();
});

function deletecookie(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


// helper function to set cookies
function setCookie(cname, cvalue, seconds) {
        var d = new Date();
        d.setTime(d.getTime() + (seconds * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                        c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                        return c.substring(name.length, c.length);
                }
        }
        return "";
}

// Do not allow multiple call center tabs

$(window).on('beforeunload onbeforeunload', function () {
        document.cookie = 'ic_window_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
});

function validateCallCenterTab() {
        var win_id_cookie_duration = 10; // in seconds
        if (!window.name) {
                window.name = Math.random().toString();
        }
        if (!getCookie('ic_window_id') || window.name === getCookie('ic_window_id')) {
                // This means they are using just one tab. Set/clobber the cookie to prolong the tab's validity.
                setCookie('ic_window_id', window.name, win_id_cookie_duration);
        }
        else if (getCookie('ic_window_id') !== window.name) {
                formdata = $('#logout-form').serialize();
                $.ajax({
                        url: '/logout',
                        type: 'post',
                        data: formdata,
                        success: function (data) {
                                if (data == 1) {
                                        window.open('/');
                                }

                        },



                });
                // this means another browser tab is open, alert them to close the tabs until there is only one remaining
                var message = 'You cannot have this website open in multiple tabs. ' +
                        'Please close them until there is only one remaining. Thanks!';
                $('html').html(message);
                clearInterval(callCenterInterval);
                // throw 'Multiple call center tabs error. Program terminating.';
        }

}

var urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
if (urlParams.has('from')) {
        var exeptionlist = ['datalock', 'routeshift', 'drcr', 'invoice'];
        var currenturl = location.href.split("?")[0].split("/")[3];
        if (exeptionlist.indexOf(currenturl) == -1) {

                callCenterInterval = setInterval(validateCallCenterTab, 1000);

        }

}
else if (urlParams.has('viewmode')) {

        allowedviewmodes = ['reportsinnewtab', 'mastersinnewtab', 'externallink'];
        var newurl;
        // var viewmodeval  =  location.href.split("?")[1].split("=")[1];
        var viewmodeval = urlParams.get('viewmode');


        if (allowedviewmodes.indexOf(viewmodeval) > -1) {

                $("#link0").removeClass('d-none');
                $("#link0").text('You are now in sub tab');

                $("#link1").remove();
                $("#link2").remove();
                $("#link3").remove();
                $("#link5").remove();
                // $("#link2").text("");
                // $("#link2").attr("href","#");
                // $("#link3").attr("href","#");
                // $(".navbar-fixed-top").attr("style","display:none;");
                // $('.sidebarfactors').attr("style","top:0%;");


                if (viewmodeval == "reportsinnewtab" || viewmodeval == 'mastersinnewtab') {

                        $('.sidebar-menu').find('a').each(function () {
                                var currentlink = $(this);
                                if (currentlink.attr("id") != "latestactionslink") {
                                        newurl = currentlink.attr("href") + "&viewmode=" + viewmodeval;
                                        currentlink.attr("href", newurl);

                                }
                        });
                }
                else {
                        $(".navbar-fixed-left").attr("style", "display:none;");
                }

        }

}
else {
        var commonexeption = "ParamReports";
        var overridingreportexception = "/reports/overridingratetypereport";
        var latestactionexception = "/latestactions";
        var currenturlelements = location.href.split("/");
        if (currenturlelements.indexOf(commonexeption) == -1 && location.href.indexOf(overridingreportexception) == -1 && location.href.indexOf(latestactionexception) == -1) {

                callCenterInterval = setInterval(validateCallCenterTab, 1000);
        }
}

if (urlParams.has('from')) {
        var from = urlParams.get('from').split("/");

        $("#backto").append("<a id='backtobutton' onclick='window.close();' class='btn selectionlist'>Go back to " + from[1] + "</a>")
}

/*  end of locks,multiple tab windows handling functions */

// disabling inspect element
// document.onkeydown = function(e) {
// if(event.keyCode == 123) {
// return false;
// }
// if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
// return false;
// }
// if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
// return false;
// }
// if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
// return false;
// }
// }


// milma plugins

var currCell;
var c;
jQuery.fn.extend({

        keyboardnavigate: function (options) {

                var defaults = { tableid: "#thispagetable", tdclass: ".thisrow" };
                options = $.extend(defaults, options);

                window.addEventListener("keydown", function (e) {
                        // space and arrow keys
                        if ([38, 40].indexOf(e.keyCode) > -1) {
                                e.preventDefault();
                                var y = $(options.scrollarea).scrollTop();
                                if (e.keyCode == 38) {
                                        //your current y position on the page
                                        $(options.scrollarea).scrollTop(y - options.scrolldistance);
                                }
                                else if (e.keyCode == 40) {
                                        $(options.scrollarea).scrollTop(y + options.scrolldistance);
                                }


                        }
                }, false);

                // User clicks on a cell
                $(document).on('click', options.tdclass, function () {
                        var rowincookie = getCookie("highlightrow");
                        if (rowincookie) {

                                $(options.tableid + " tbody tr").eq(rowincookie).removeClass('highlighten');
                                deletecookie("highlightrow");
                        }

                        if (c) {
                                c.closest('tr').removeClass('rowselected');
                        }
                        currCell = $(this);
                        c = $(this);
                        c.closest('tr').addClass('rowselected');


                });


                // User navigates table using keyboard
                $(document).on('keydown', options.tableid, function (e) {
                        if (!c) {
                                c = $(options.tableid + "tbody").find('tr td').eq(0);
                                c.closest('tr').addClass('rowselected');
                        }
                        // $(this).trigger('click');
                        // $(options.tableid).keydown(function (e) {
                        if (typeof e.which !== 'undefined') {

                                c.closest('tr').removeClass('rowselected');
                        }
                        // c = "";
                        // if (e.which == 39) {
                        //     // Right Arrow
                        //     c = currCell.next();
                        // } else if (e.which == 37) {
                        //     // Left Arrow
                        //     c = currCell.prev();
                        // }
                        if (e.which == 38) {
                                // Up Arrow
                                c = currCell.closest('tr').prev().find('td:eq(' +
                                        currCell.index() + ')');
                                currCell.closest('tr').prev().addClass('rowselected');
                        } else if (e.which == 40) {
                                // Down Arrow
                                c = currCell.closest('tr').next().find('td:eq(' +
                                        currCell.index() + ')');
                                currCell.closest('tr').next().addClass('rowselected');
                        } else if ((e.which == 13 || e.which == 32)) {
                                // Enter or Spacebar - edit cell
                                c.trigger('dblclick');
                                e.preventDefault();

                        }
                        //  else if ((e.which == 9 && !e.shiftKey)) {
                        //     // Tab
                        //     e.preventDefault();
                        //     c = currCell.next();
                        // } else if (!editing && (e.which == 9 && e.shiftKey)) {
                        //     // Shift + Tab
                        //     e.preventDefault();
                        //     c = currCell.prev();
                        // }

                        // If we didn't hit a boundary, update the current cell
                        if (c.length > 0) {
                                currCell = c;
                                currCell.focus();
                        }
                });


                $(document).on('mouseover', options.tdclass, function () {

                        var rowincookie = getCookie("highlightrow");
                        if (!rowincookie) {
                                // $(this).closest('tr').find('td').eq(options.tabindexcol).trigger('click');
                                // $(options.tableid).trigger('keydown');
                        }




                });


        }
});
// 65 : ctrl + A
// 83 : ctrl + S
// 68 : ctrl + D
// 69 : ctrl + E
// 80 : ctrl + P
// 67 : ctrl + C

var modalshortcuts = { 65: ".shortcutsave", 83: ".shortcutsaveandnext", 68: ".shortcutdelete", 69: ".shortcutexit", 80: ".shortcutprint", 67: "shorcutclear" };



$(document).on("keydown", function (e) {

        // if (!e.metaKey) {
        // we.preventDefault();
        // }


        if ((e.ctrlKey && e.keyCode == 65) || (e.ctrlKey && e.keyCode == 83) || (e.ctrlKey && e.keyCode == 68) || (e.ctrlKey && e.keyCode == 69) || (e.ctrlKey && e.keyCode == 80)) {

                e.preventDefault();

                var currentmodal = $(document).find('.show');

                if (currentmodal.length > 0) {
                        // $(currentmodal.attr("id"));

                        currentmodal.find(modalshortcuts[e.keyCode]).trigger('click');






                }





        }




});



localStorage.idleTime = 0;
var idleTime = 0;
$(document).ready(function () {
        //Increment the idle time counter every minute.

        // var idleInterval = setInterval(timerIncrement, 60000); // 1 minute //// unncomment when http mapped to https

        //Zero the idle timer on mouse movement.
        $(this).mousemove(function (e) {
                idleTime = 0;
                localStorage.idleTime = 0;


        });
        $(this).keypress(function (e) {
                idleTime = 0;
                localStorage.idleTime = 0;
        });

});

window.addEventListener('storage', function () {
        updateeachtabidletime();

});


function updateeachtabidletime() {
        // alert("calling here")
        idleTime = parseInt(localStorage.idleTime);
        // console.log("STORAGE IDLE TIME",idleTime);
}

function timerIncrement() {
        // idleTime = localStorage.idleTime;
        idleTime = idleTime + 1;
        localStorage.idleTime = -1;
        console.log("Incrementidletime", idleTime);
        // localStorage.idleTime = parseInt(idleTime);
        if (idleTime > 15) { // 30 minutes
                localStorage.idleTime = idleTime;

                // $("#logoutbutton").trigger('click'); // unncomment when http mapped to https

        }
}



function set_autocomplete_default(property) {
        if (property.variablename.length == 1) {
                $(property.idfield).val(property.variablename[0][property.idfieldval]);
                $(property.hiddenfield).val(property.variablename[0][property.hiddenfieldval]);
                $(property.superentity).text(property.variablename[0][property.superentitytext]);
                set_disable("*", 1, property.idfield);
        }
}

function set_autocompletedynamic_default(property) {
        if (property.variablename.length == 1) {
                property.row.find(property.idfield).val(property.variablename[0][property.idfieldval]);
                property.row.find(property.hiddenfield).val(property.variablename[0][property.hiddenfieldval]);
                property.row.find(property.superentity).val(property.variablename[0][property.superentitytext]);
                property.row.find(property.idfield).attr("disabled", true);
        }
}



function formatDate(dateval) {
        // var monthNames = [
        //   "January", "February", "March",
        //   "April", "May", "June", "July",
        //   "August", "September", "October",
        //   "November", "December"
        // ];
        var date = new Date(dateval);
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        return ("0" + (day)).slice(-2) + '-' + ("0" + (monthIndex + 1)).slice(-2) + '-' + year;
}

function begin_fyear(date) {
        var begin_fyear;
        var date = new Date(date);
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month > 3) {
                begin_fyear = year + '-04-01';
        } else {
                begin_fyear = (year - 1) + '-04-01';
        }
        return begin_fyear;
}

function end_fyear(date) {
        var end_fyear;
        var date = new Date(date);
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month > 3) {
                end_fyear = (year + 1) + '-03-31';
        } else {
                end_fyear = year + '-03-31';
        }
        return end_fyear;
}


function startofmonthsbetweentwodates(startdate, enddate) {
        var setofdates = [];
        var enddate = new Date(enddate);
        var startdate = currentloopdate = new Date(startdate);
        var year = startdate.getFullYear();
        var month = startdate.getMonth();

        console.log(startdate.getTime());
        console.log(currentloopdate.getTime());
        console.log(enddate.getTime());



        for (i = 0; currentloopdate.getTime() <= enddate.getTime(); i++) {


                setofdates.push(currentloopdate.getFullYear() + '-' + ("0" + (currentloopdate.getMonth() + 1)).slice(-2) + '-01');

                if (month == 11) {
                        month = 0;
                        year = year + 1;
                }
                else {
                        month++;
                }
                currentloopdate = new Date(year, month, 1);

        }


        return setofdates;

}


function roundandshowastwodecimalplaces(num) {

        return (Math.round(num * 100) / 100).toFixed(2);

}


function begin_month(rdate) {

        var date = new Date(rdate);
        y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        return firstDay.getFullYear() + '-' + ("0" + (firstDay.getMonth() + 1)).slice(-2) + '-' + ("0" + (firstDay.getDate())).slice(-2);


}

function end_month(rdate) {

        var date = new Date(rdate);
        y = date.getFullYear(), m = date.getMonth();
        var lastDay = new Date(y, m + 1, 0);
        return lastDay.getFullYear() + '-' + ("0" + (lastDay.getMonth() + 1)).slice(-2) + '-' + ("0" + (lastDay.getDate())).slice(-2);

}


function diffdays(d2, d1) {
        const date2 = new Date(d2);
        const date1 = new Date(d1);
        const diffTime = (date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
}


function standarddateformat(d) {

        return d.split("-").reverse().join("-");
}



function getmonthname(date) {

        const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
        ];

        const d = new Date(date);
        return monthNames[d.getMonth()];

}
function getyear(date) {

        const d = new Date(date);
        return d.getFullYear();
}


function endOfMonth(date) {

        var date = new Date(date);
        var monthend = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return monthend.getFullYear() + '-' + ("0" + (monthend.getMonth() + 1)).slice(-2) + '-' + ("0" + (monthend.getDate())).slice(-2);



}
function startOfMonth(date) {

        var date = new Date(date);
        var monthend = new Date(date.getFullYear(), date.getMonth(), 1);
        return monthend.getFullYear() + '-' + ("0" + (monthend.getMonth() + 1)).slice(-2) + '-' + ("0" + (monthend.getDate())).slice(-2);

}


function arraymergeremovingduplicates(array1, array2) {

        var result_array = [];
        var arr = array1.concat(array2);
        var len = arr.length;
        var assoc = {};

        while (len--) {
                var item = arr[len];

                if (!assoc[item]) {
                        result_array.unshift(item);
                        assoc[item] = true;
                }
        }

        return result_array;
}


$(document).on('keyup', '.allowonlytwodecimalplaces', function () {
        var element = $(this);
        value = element.val();
        decimal = value.split(".");
        if (isNumeric(value) && decimal.length > 1 && decimal[1].length > 2) {

                finalval = parseFloat(element.val(), 10).toFixed(2);
                element.val(finalval);
        }
        else if (!isNumeric(value)) {
                finalval = '';
                element.val(finalval);
        }

});



function rupeewords(num) {


        var splittedNum = num.toString().split('.');
        var nonDecimal = splittedNum[0];
        var numberpart = rupee_in_words(Number(nonDecimal));
        var decimalpart = '';
        if (splittedNum.length == 2) {
                var decimal = splittedNum[1].length == 1 ? (splittedNum[1] + 0) : splittedNum[1];
                decimalpart = "and" + rupee_in_words(Number(decimal)) + "paise";

        }
        return numberpart + decimalpart;


}

function rupee_in_words(price) {
        var sglDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
                dblDigit = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
                tensPlace = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"],
                handle_tens = function (dgt, prevDgt) {
                        return 0 == dgt ? "" : " " + (1 == dgt ? dblDigit[prevDgt] : tensPlace[dgt])
                },
                handle_utlc = function (dgt, nxtDgt, denom) {
                        return (0 != dgt && 1 != nxtDgt ? " " + sglDigit[dgt] : "") + (0 != nxtDgt || dgt > 0 ? " " + denom : "")
                };

        var str = "",
                digitIdx = 0,
                digit = 0,
                nxtDigit = 0,
                words = [];
        if (price += "", isNaN(parseInt(price))) str = "";
        else if (parseInt(price) > 0 && price.length <= 10) {
                for (digitIdx = price.length - 1; digitIdx >= 0; digitIdx--) switch (digit = price[digitIdx] - 0, nxtDigit = digitIdx > 0 ? price[digitIdx - 1] - 0 : 0, price.length - digitIdx - 1) {
                        case 0:
                                words.push(handle_utlc(digit, nxtDigit, ""));
                                break;
                        case 1:
                                words.push(handle_tens(digit, price[digitIdx + 1]));
                                break;
                        case 2:
                                words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] && 0 != price[digitIdx + 2] ? " and" : "") : "");
                                break;
                        case 3:
                                words.push(handle_utlc(digit, nxtDigit, "Thousand"));
                                break;
                        case 4:
                                words.push(handle_tens(digit, price[digitIdx + 1]));
                                break;
                        case 5:
                                words.push(handle_utlc(digit, nxtDigit, "Lakh"));
                                break;
                        case 6:
                                words.push(handle_tens(digit, price[digitIdx + 1]));
                                break;
                        case 7:
                                words.push(handle_utlc(digit, nxtDigit, "Crore"));
                                break;
                        case 8:
                                words.push(handle_tens(digit, price[digitIdx + 1]));
                                break;
                        case 9:
                                words.push(0 != digit ? " " + sglDigit[digit] + " Hundred" + (0 != price[digitIdx + 1] || 0 != price[digitIdx + 2] ? " and" : " Crore") : "")
                }
                str = words.reverse().join("")
        } else str = "";
        return str

}


$(document).on('keyup', '.nonewline', function (e) {
        if (e.keyCode == 13) {
                $(this).val($(this).val().replace(/\n/g, " "));
                $(this).text($(this).text().replace(/\n/g, " "));

        }

});



function getapiRequestheaders() {

        var headers = {};
        headers['Authorization'] = 'Bearer ' + getCookie('access_token');
        headers['Accept'] = 'application/json';
        return headers;
}


function redirectToHome() {
        window.location.href = '/home';
}
function redirectToLogin() {
        window.location.href = '/login';
}



function checkLogin()
{
    var access_token = getCookie('access_token');
    ajax_request_formless({url:'/api/user',headers:getapiRequestheaders(),method:'get',data:{}},function(result)
    {
            if(result.id)
            {
                redirectToHome();
            }
    });

}