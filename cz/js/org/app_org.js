$(".nav ul li").hover(function(){
    $(this).find("ul").show();
},function(){
    $(this).find("ul").hide();
});

$(".nav ul li ul").hover(function(){
    $(this).show();
},function(){
    $(this).hide();
});
// 二级导航 伸缩性
$(".nav li").click(function () {
    if ($(this).hasClass("nav-parent")) {
        var liThis = $(".nav .nav-parent").index($(this));
        console.log(liThis);
        $(this).addClass('active').siblings().removeClass('active')
        var navChildThis = $(".nav-child-box .nav-child").eq(liThis);
        $(".nav-child-box .nav-child").css({
            'opacity': '0',
            'height': '0',
            'padding': '0'
        });
        navChildThis.css({
            'opacity': '1',
            'height': '34px'
        });
        $(".v-type").addClass("v-type-down");
    } else {
        $(".nav-child-box .nav-child").css({
            'opacity': '0',
            'height': '0',
            'padding': '0'
        });
        $(".v-type").removeClass("v-type-down");

    };
});
$("#wyfav").click(function () {
    if (store.enabled) {
        var type = $(this).data('type');
        var typefav;
        var favtemp = store.get('wuye'+type+'fav') ? store.get('wuye'+type+'fav') : [];
        if(type == 'vod'){
            typefav = wuyevodfav;
        }else if(type == 'pic'){
            typefav = wuyepicfav;
        }else if(type == 'txt'){
            typefav = wuyetxtfav;
        }
        favtemp.unshift(typefav);
        store.set('wuye'+type+'fav', favtemp);
        $("#wyfav").hide();
        $("#wyunfav").show();
    }
});
$("#wyunfav").click(function () {
    if (store.enabled) {
        var type = $(this).data('type');
        var typefav;
        var favtemp = store.get('wuye'+type+'fav') ? store.get('wuye'+type+'fav') : [];
        if(type == 'vod'){
            typefav = wuyevodfav;
        }else if(type == 'pic'){
            typefav = wuyepicfav;
        }else if(type == 'txt'){
            typefav = wuyetxtfav;
        }
        for (var i = 0; i < favtemp.length; i++) {
            if (favtemp[i].type == typefav.type && favtemp[i].id == typefav.id) {
                favtemp.splice(i, 1);
                break;
            }
        }
        store.set('wuye'+type+'fav', favtemp);
        $("#wyfav").show();
        $("#wyunfav").hide();
    }
});



