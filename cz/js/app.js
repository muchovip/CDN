$(".nav ul li").hover(function(){$(this).find("ul").show()},function(){$(this).find("ul").hide()});$(".nav ul li ul").hover(function(){$(this).show()},function(){$(this).hide()});$(".nav li").click(function(){if($(this).hasClass("nav-parent")){var a=$(".nav .nav-parent").index($(this));console.log(a);$(this).addClass("active").siblings().removeClass("active");a=$(".nav-child-box .nav-child").eq(a);$(".nav-child-box .nav-child").css({opacity:"0",height:"0",padding:"0"});a.css({opacity:"1",height:"34px"});$(".v-type").addClass("v-type-down")}else $(".nav-child-box .nav-child").css({opacity:"0",height:"0",padding:"0"}),$(".v-type").removeClass("v-type-down")});$("#wyfav").click(function(){if(store.enabled){var a=$(this).data("type"),b,c=store.get("wuye"+a+"fav")?store.get("wuye"+a+"fav"):[];"vod"==a?b=wuyevodfav:"pic"==a?b=wuyepicfav:"txt"==a&&(b=wuyetxtfav);c.unshift(b);store.set("wuye"+a+"fav",c);$("#wyfav").hide();$("#wyunfav").show()}});$("#wyunfav").click(function(){if(store.enabled){var a=$(this).data("type"),b,c=store.get("wuye"+a+"fav")?store.get("wuye"+a+"fav"):[];"vod"==a?b=wuyevodfav:"pic"==a?b=wuyepicfav:"txt"==a&&(b=wuyetxtfav);for(var d=0;d<c.length;d++)if(c[d].type==b.type&&c[d].id==b.id){c.splice(d,1);break}store.set("wuye"+a+"fav",c);$("#wyfav").show();$("#wyunfav").hide()}});