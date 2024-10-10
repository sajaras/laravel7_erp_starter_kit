var showrows =[];
var tr;
var table;
var rowlength;
var found;
var clusterizeobject;
var finaltableobject;


jQuery.fn.extend({   // defining a jquery plugin


        searchtable: function (options) { // name of the plugin

                var defaults = {tablescrollid:"contentArea",tablecontentid:"contentArea",verifychange:true,highlightrow:true,addonheight:3};

                options = $.extend(defaults, options);  // if a perticular option field  in  corresponding js is given then its default option will not be  considered

                $(this).keyup(function(e)
                {
                        console.log(" ENTERING HERE");
                        if (e.keyCode ==13)
                        {

                                // if(options.hasOwnProperty("chanceofpaginate") && paginated)
                                // {
                                //   dataloadandfill("");
                                // }
                                showrows =[];

                                var condition = "#"+$(this).attr("id");
                                var clickcondition = options[condition];
                                console.log("clickcondition",clickcondition);
                                tr = eval(clickcondition.finaltableobject);
                                console.log("tr",tr);
                                // take copy of finaltable to another show arrays
                                showrows = tr.slice();

                                clusterizeobject = eval(clickcondition.clusterizeobject);

                                clusterizeobject.update([]);


                                // table= document.getElementById(tableid);
                                rowlength = tr.length;
                                var searchquery = $(this).val();
                                searchquery = searchquery.replace(/ /g,""); //remove white spaces from search query
                                if(searchquery == "")
                                {
                                        clusterizeobject.update(showrows);
                                        if(options.highlightrow == true)
                                        {
                                                var rowheight = $(clickcondition.table + ' tr').eq(0).height() + options.addonheight;
                                                var cookiehightlightrowindex = getCookie('highlightrow');
                                                $(clickcondition.table).parent().scrollTop((cookiehightlightrowindex)*(rowheight));

                                        }

                                        return;
                                }

                                var searchpattern = searchquery.replace(/%/g,"(.*)");
                                var onlysearchcolumns  = [];
                                $(document).find(clickcondition.table + ' thead th.searchcolumn').each(function(){
                                        onlysearchcolumns.push($(this).index());
                                });
                                console.log(onlysearchcolumns);
                                upgradedsearchtable(searchpattern,tr,onlysearchcolumns);
                                clusterizeobject.update(showrows);

                                if(options.highlightrow == true)
                                {
                                        var rowheight = $(clickcondition.table + ' tr').eq(0).height() + options.addonheight;
                                        var cookiehightlightrowindex = getCookie('highlightrow');
                                        $(clickcondition.table).parent().scrollTop((cookiehightlightrowindex)*(rowheight));

                                }



                        }

                });



        }

});






function upgradedsearchtable(value,searchtable,onlysearchcolumns)
{
        console.log("searchpattern",value);
        console.log(searchtable);

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
                                if(currentcolumn.css("display") !="none" && (onlysearchcolumns.length == 0 || onlysearchcolumns.indexOf(j) > -1))
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


$(document).on('click','#scrollArea thead th',function () {

        $(this).toggleClass('searchcolumn');

});
