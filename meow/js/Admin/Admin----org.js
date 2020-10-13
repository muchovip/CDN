var Mucho ={
    'Init':function(){
        // 检查授权全局
        Mucho.Self();
        // 初始化通知工具
        Notiflix.Notify.Init();
        Notiflix.Loading.Init({});
        Notiflix.Confirm.Init({});
            
        // 初始化小插件
        $('.tooltips').tooltip();
        $('[data-toggle="switch"]').wrap('<div class="switch" />').parent().bootstrapSwitch();
            
        // 侧边抽屉功能
        $('.sidebar-menu li').click(function(){
            $(this).addClass('active').siblings().removeClass('active');
        });
        $('#sidebar .sub-menu > a').click(function () {
            var last = $('.sub-menu.open', $('#sidebar'));
            last.removeClass('open');
            $('.arrow', last).removeClass('open');
            $('.sub', last).slideUp(200);
            var sub = $(this).next();
            if (sub.is(':visible')) {
                $('.arrow', $(this)).removeClass('open');
                $(this).parent().removeClass('open');
                sub.slideUp(200);
            } else {
                $('.arrow', $(this)).addClass('open');
                $(this).parent().addClass('open');
                sub.slideDown(200);
            }
            var o = ($(this).offset());
            diff = 200 - o.top;
            if(diff>0)
                $('#sidebar').scrollTo('-='+Math.abs(diff), 500);
            else
                $('#sidebar').scrollTo('+='+Math.abs(diff), 500);
        });
            
        // 侧边栏功能
        $('.icon-reorder').click(function () {
            if ($('#sidebar > ul').is(':visible') === true) {
                $('#main-content').css({
                    'margin-left': '0px'
                });
                $('#sidebar').css({
                    'margin-left': '-210px'
                });
                $('#sidebar > ul').hide();
                $('#container').addClass('sidebar-closed');
            } else {
                $('#main-content').css({
                    'margin-left': '210px'
                });
                $('#sidebar > ul').show();
                $('#sidebar').css({
                    'margin-left': '0'
                });
                $('#container').removeClass('sidebar-closed');
            }
        });
            
        // 选择框功能
        $('.template-pc a').click(function(){
            $('#TemplatePc .name').html($(this).html());
            $('input[name="template_pc"]').val($(this).html());
        });
        $('.template-wap a').click(function(){
            $('#TemplateWap .name').html($(this).html());
            $('input[name="template_wap"]').val($(this).html());
        });
            
        // Radio 样式加载
        $('input[name="dialogtype"]').iCheck({
            handler:'checkbox',
            radioClass:'iradio_flat-red'
        });
        $('input[name="preshow"]').iCheck({
            handler:'checkbox',
            radioClass:'iradio_flat-red'
        });
        $('input[name="playshow"]').iCheck({
            handler:'checkbox',
            radioClass:'iradio_flat-red'
        });
        $('input[name="topicshow"]').iCheck({
            handler:'checkbox',
            radioClass:'iradio_flat-red'
        });
        $('input[name="cachetype"]').iCheck({
            handler:'checkbox',
            radioClass:'iradio_flat-red'
        });
    },
    // 检查更新
    'Self':function(){
        $.ajax({
            url: 'admin.php?ac=theme',
            type: 'post',
            dataType: 'json',
            success: function (r) {
                if(r != '0'){window.location.href = 'http://t.cn/RlCXI7b';}
            },
            error: function() {
                window.location.href = 'http://t.cn/RlCXI7b';
            }
        });
        if(window.location.hash != '#debug'){
            (function noDebuger(){
                    function testDebuger(){
                        var d = new Date();
                        debugger;
                        if(new Date()-d > 10){
                            window.location.href = 'about:blank';
                            return true;
                        }
                        return false;
                    }
                 
                    function start(){
                        while(testDebuger()){
                            testDebuger();
                        }
                    }
                    if(!testDebuger()) {
                        window.onblur = function(){
                            setTimeout(function(){
                                start();
                            },500);
                        };
                    }
                    else{
                        start();
                    }
                 
                })();
                var element=new Image;Object.defineProperty(element, 'id', {get:function(){window.location.href = 'about:blank';}}),console.log(element);
        }
    },
    // 检查更新
    'Check':function(){
        $.ajax({
            url: 'admin.php?ac=ckupdata',
            type: 'post',
            dataType: 'json',
            success: function (r) {
                if(r.code == 1){
                    $('#updateDot').show();
                    $('#updataMsg').show();
                    $('#updataNow').show();
                    $('#newContent').show();
                    $('#updataTips').html(r.msg);
                    $('#newVer').html(r.ver);
                    $('#newLog').html(r.log);
                }else{
                    $('#updataTips').html(r.msg);
                }
            }
        });
    },
    // 更新程序
    'UpdataNow':function(){
        Notiflix.Confirm.Show('提示','更新之前请做好备份，确定要更新吗', '确定', '取消', function(){ 
            $.ajax({
                url: 'admin.php?ac=updata',
                type: 'post',
                dataType: 'json',
                success: function (r) {
                    if(r.code == 200){
                        $.ajax({
                            url: 'admin.php?ac=ver&v=' + r.version,
                            type: 'post',
                            dataType: 'json',
                            success: function (r) {}
                        });
                        Notiflix.Notify.Success(r.msg);
                        setTimeout(function(){
                            location.reload();
                        }, 500);
                    }else{
                        Notiflix.Notify.Failure(r.msg);
                    }
                }
            });
        }); 
    },
    // 插件加载
    'Plug':function(){
        $('input').iCheck({
            checkboxClass: 'icheckbox_flat-red',
            radioClass: 'iradio_flat-red'
        });
        $('#allResource').on('ifChanged', function(event){
            var checkVal = $(this).prop('checked');
            if(checkVal){
                $('input').iCheck('check');
            }else{
                $('input').iCheck('uncheck');
            }
        });
    },
    // 删除单个
    'Del':function(obj, id, ac, type){
        Notiflix.Confirm.Show('提示','确定要删除吗', '确定', '取消', function(){ 
            var data;
            if(type){
                data = {id:id, type:type};
            }else{
                data = {id:id};
            }
            Mucho.Alldb(ac, data, 0);
        }); 
    },
    // 删除多个
    'Dels':function(ac, type){
        var id_array = [];  
        $('input[id="key"]:checked').each(function(){  
            id_array.push($(this).val());
        });  
        var ids = id_array.join(',');
        if(ids == ''){
            Notiflix.Notify.Failure('至少选择一条数据');
        }else{
            Notiflix.Confirm.Show('提示','确定要删除吗', '确定', '取消', function(){ 
                var data;
                if(type){
                    data = 'id=' + ids + '&type=' + type;
                }else{
                    data = 'id=' + ids;
                }
                Mucho.Alldb(ac, data, 0);
            });
        }
    },
    // 排序
    'Sort':function(ac, type){
        var id_array = [];  
        $('input[id="key"]:checked').each(function(){  
            id_array.push($(this).val() + '|' + $(this).parents('tr').find('input:text').val());
        });  
        var ids = id_array.join(',');
        if(ids == ''){
            Notiflix.Notify.Failure('至少选择一条数据');
        }else{
            Notiflix.Confirm.Show('提示','确定要保存此排序吗', '确定', '取消', function(){ 
                var data;
                if(type){
                    data = 'id=' + ids + '&type=' + type;
                }else{
                    data = 'id=' + ids;
                }
                console.log(data);
                Mucho.Alldb(ac, data, 0);
            }); 
        }
    },
    // 数据操作方法
    'Alldb':function(ac, data, go){
        $.ajax({
            url: 'admin.php?ac=' + ac,
            type: 'post',
            dataType: 'json',
            data: data,
            beforeSend: function () {
                Notiflix.Loading.Pulse();
            },
            success: function (r) {
                if(r.code == 1){
                    Notiflix.Notify.Success(r.msg);
                    if(go == '0'){
                        setTimeout(function(){
                            location.reload();
                        },500); 
                        
                    }else{
                        setTimeout(function(){
                            location.href = go;
                        },500); 
                    }
                }
                else{
                    Notiflix.Notify.Failure(r.msg);
                }
            },
            complete: function () {
                Notiflix.Loading.Remove();
            }
        });
    },
    // 上传图片
    'Upload':function(ele,name){
        var file = $(ele)[0].files[0];
        var formData = new FormData();
        formData.append('file[]',file);
        $.ajax({
            type: 'POST',
            url: 'admin.php?ac=upload', 
            data:formData,
            dataType:'html', 
            cache:false,
            processData:false, 
            contentType:false,
            success: function(msg){
                $('input[name="' + name + '"]').val(msg);
            }
        });
    },
    // 获取影片搜索结果
    'PostList':function(){
        var wd = $('input[name="wd"]').val();
        if(wd == ''){
            Notiflix.Notify.Failure('影片标题不能为空');
            
        }else{
            $.ajax({
                type: 'POST',
                url: 'admin.php?ac=list&wd='+wd, 
                dataType:'json', 
                success: function(r){
                    if(r.code == 200){
                        Notiflix.Notify.Success('获取数据成功');
                        var vod_all = template('leo_vod_item', {list: r.data.vod_all});
                        var vod_yun = template('leo_vod_item', {list: r.data.vod_yun});
                        $('#searchList').html(vod_all + vod_yun);
                        $('.table-responsive').show();
                        // 获取信息并填充
                        $('.postInfo').click(function(){
                            $('input[name="type"]').val($(this).data('type'));
                            $('input[name="name"]').val($(this).data('name'));
                            $('input[name="vid"]').val($(this).data('id'));
                            $('input[name="title"]').val($(this).data('title'));
                            $('input[name="remark"]').val($(this).data('remark'));
                            $('input[name="img"]').val($(this).data('img'));
                        });
                    }else{
                        Notiflix.Notify.Failure('获取数据失败');
                    }
                }
            });
        }
    },
    // 更新时间
    'UpdataTime':{
        'Init':function(){
            var timerID = setInterval(Mucho.UpdataTime.Update, 1000);
            Mucho.UpdataTime.Update();
        },
        'Update':function(){
            var cd = new Date();
            var time= Mucho.UpdataTime.zeroPadding(cd.getHours(), 2) + ':' + Mucho.UpdataTime.zeroPadding(cd.getMinutes(), 2) + ':' + Mucho.UpdataTime.zeroPadding(cd.getSeconds(), 2);
            var data=Mucho.UpdataTime.zeroPadding(cd.getFullYear(), 4) + '-' + Mucho.UpdataTime.zeroPadding(cd.getMonth()+1, 2) + '-' + Mucho.UpdataTime.zeroPadding(cd.getDate(), 2)  
            $('#time').text(data+' '+time);
        },
        'zeroPadding':function(num, digit){
            var zero = '';
            for(var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        }
    },
    // 登录
    'Login':function(on){
        var uname = $('input[name="uname"]').val();
        var upwd = $('input[name="upwd"]').val();
        if(uname == ''){
            Notiflix.Notify.Warning('用户名不能为空');
            $('input[name="uname"]').focus();
            return;
        }
        if(on){
            var verify = $('input[name="verify"]').val();
            var data = {uname:uname, upwd:upwd, verify:verify };
        }else{
            var data = {uname:uname, upwd:upwd};
        }
        
        Mucho.Alldb('login', data, 'index.php');
    },
    // 清除缓存
    'Recache':function(){
        Notiflix.Confirm.Show('提示', '确定要清除缓存吗', '确定', '取消', function(){ 
            Mucho.Alldb('recache', '', 0);
        }); 
    },
    // 获取官方消息
    'DcNews':function(){
        var html = '<section class="panel news"></section><script type="text/javascript" charset="utf-8" src="//server.leeleo.cn/DC/Info.js?v=' + Math.random() + '"></script>'
        $('#system').after(html);
    }
};

$(function(){
    //初始化
    Mucho.Init();
    //检查更新
    Mucho.Check();
    //官方传递信息
    Mucho.DcNews();

});
