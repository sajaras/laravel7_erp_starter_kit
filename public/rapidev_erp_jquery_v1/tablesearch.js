/*
Table search js is used to search the table
searching is available for table for searchbox with id either tablesearchbox or tablesearchbox1
searching start when enter key pressed inside the searchbox or enter key is triggered for searchbox
working:
- if enter key is pressed inside searchbox
    -find the tableid for searching searchbox
    -based on tableid decide the table content and store in finaltableobject
    -copy corresponding table data to showrows(finaltable.slice)
    -based on tableid store the  corresponding cluster object into clusterizeobject
    -find the length of data in finaltableobject
    - if searchquery is empty update clusterizeobject with actual content(finaltableobject) and return
    - if  searchquery is not empty generate pattern for regex by replacing % with (.*)
    -call upgradedsearchtable function with table data and searchpattern
      - function will loop through each row in the table data and concatinate every visible columns of each row and remove white space in full row string and check for match
              using reg's search function
      - if whole row data matches the pattern nothing is done and found set to 1
      - if whole row data does't matches the pattern that row is removed from showrows array.
      -it continues till the end of all rows in the table data and finally showrows will contain only matching rows ie search result
      - finalsearch result in showrows is updated to clusterizeobject of corresponding table
*/

$(document).ready(function(){

    var thispagetable ;
    var showrows =[];
    var tr;
    var table;
    var rowlength;
    var found;
    var clusterizeobject;
    var finaltableobject;
    $('#tablesearchbox, #tablesearchbox1').keyup(function(e)
    {

        if (e.keyCode ==13)
        {
            showrows =[];
            var ud=$(this).parent();
            var p=ud.parent();
            tableid =p.next().find("table").attr("id");
            console.log("Table ID - "+tableid);
            if(tableid == "thispagetable")
            {
                tr =finaltable;
                showrows = finaltable.slice();
                finaltableobject = finaltable;
                clusterizeobject = clusterize;
            }
            else
            {
                tr = finaltable1;
                showrows = finaltable1.slice();
                finaltableobject = finaltable1;
                clusterizeobject = clusterize1;
                clusterizeobject.update([]);
            }
            // table= document.getElementById(tableid);
            rowlength = tr.length;
            var searchquery = $(this).val();
            if(searchquery =="")
            {
                clusterizeobject.update(finaltableobject);
                return;
            }
            var searchpattern = searchquery.replace(/%/g,"(.*)");
            upgradedsearchtable(searchpattern,finaltableobject);
            clusterizeobject.update(showrows);
        }

   });

   function upgradedsearchtable(value,searchtable)
   {
       if(value !="")
       {
           var patt = new RegExp(value, "i");
           for (var i = 0; i < rowlength; i++)
           {
               found =0;
               var searchrow = $(tr[i]);
               var tds = searchrow.find('td');
               var currentrowtext = "";
               var currentcolumn;

               for(var j=0,columnslen=tds.length;j<columnslen;j++)
               {
                   currentcolumn = $(tds[j]);
                   if(currentcolumn.css("display") !="none")
                   {
                       currentrowtext = currentrowtext  +currentcolumn.text();
                   }
               }
               
               var checktext =   currentrowtext.replace(/\s+/g, '');
               if(checktext.search(patt) >= 0)
               {
                 console.log(checktext);
                 found=1;
               }
               if(found==0)
               {
                 var index = showrows.indexOf(searchtable[i]);
                 if (index > -1)
                 {
                   showrows.splice(index, 1);
                 }
               }

           }

       }

   }

 });
