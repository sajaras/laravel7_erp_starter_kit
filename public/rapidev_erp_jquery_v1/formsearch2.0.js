
jQuery.fn.extend({


        formsearch: function (options)
        {

                var defaults = {block:"",searchfieldid:'',eachcontentin:'tr',triggerevent:'keyup',triggerkeycode:13,highlightcolor:'',matchclass:'searchstringmatch',matchcheckfields:[],focusfield:''};
                options = $.extend(defaults, options);  // if a perticular option field  in  corresponding js is given then its default option will not be  considered


                var currentfocus = null;

                $(document).on(options.triggerevent,options.searchfieldid,function(e) {
                        if(currentfocus != null)
                        {
                                currentfocus.closest(options.eachcontentin).removeClass(options.highlightcolor);
                                options.block.find(options.eachcontentin).each(function(){
                                        $(this).find('.'+options.matchclass).removeClass(options.matchclass);
                                });
                                currentfocus = null;
                        }

                        if(e.keyCode == options.triggerkeycode && $(this).val())
                        {
                                var searchkey = $(this).val();
                                options.block.find(options.eachcontentin).each(function(){

                                        var eachelementin = $(this);
                                        for(eachelement in options.matchcheckfields)
                                        {
                                                if(eachelementin.find(options.matchcheckfields[eachelement]).val().toLowerCase().indexOf(searchkey.toLowerCase()) > -1)
                                                {
                                                        eachelementin.find(options.focusfield).addClass(options.matchclass);
                                                }
                                        }


                                });
                                currentfocus = options.block.find('.'+options.matchclass+':first');
                                currentfocus.focus();
                                currentfocus.closest(options.eachcontentin).addClass(options.highlightcolor);
                        }
                });

                $(document).on(options.triggerevent,'.'+options.matchclass,function(e){
                        if(e.keyCode == options.triggerkeycode)
                        {
                                currentfocus.closest(options.eachcontentin).removeClass(options.highlightcolor);
                                if(currentfocus.closest(options.eachcontentin).is(":last-child"))
                                {
                                        currentfocus = options.block.find('.'+options.matchclass+':first');
                                }
                                else
                                {
                                        var nextrowhavingcontent = ':has(.'+options.matchclass+'):first';
                                        currentfocus = currentfocus.closest(options.eachcontentin).nextAll(nextrowhavingcontent).find('.'+options.matchclass);

                                }


                                currentfocus.focus();
                                currentfocus.closest(options.eachcontentin).addClass(options.highlightcolor);
                        }
                });



        }

});
