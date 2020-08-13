(function ($, win) {
    $.fn.wrpage = function (options) {
        if (options.pagesize <= 0) {
            return
        }
        var defaults = {
            pagesize: 10,
            wr_current: 1,
            baseUrl: './',
            cb: function () {}
        };
        var options = $.extend(defaults, options);
        var size = Number(options.pagesize);
        var cur = Number(options.wr_current)
        var baseUrl = options.baseUrl
        var cb = options.cb
        var em = $(this);
        init(size, cur)
        function init(size, cur) {
            var _html = "<span class=\"wrpage wr_pagefirst\">共" + size + "页</span>"
            if (cur <= 1) {
                _html += '<span class="wrpage wr_pagefirst">首页</span>'
            } else {
                _html += '<a href="javascript:;" class="wrpage wr_pagefirst">首页</a>'
            }
            if (cur < 5) {
                var midpage = size < 6 ? size : 6;
                for (var i = 1; i <= midpage; i++) {
                    if (i == cur) {
                        _html += '<span class="curwrpage wrpage wrpage_number">' + cur + '</span>'
                    } else {
                        _html += '<a href="javascript:;" class="wrpage wrpage_number">' + i + '</a>'
                    }
                }
            } else if (cur >= 5) {
                if (size - cur - 1 >= 5) {
                    for (var i = cur - 1; i <= cur * 1 + 5; i++) {
                        if (i == cur) {
                            _html += '<span class="curwrpage wrpage wrpage_number">' + cur + '</span>'
                        } else {
                            _html += '<a href="javascript:;" class="wrpage wrpage_number">' + i + '</a>'
                        }
                    }
                } else {
                    if (size == 6) {
                        for (var i = 2; i <= size; i++) {
                            if (i == cur) {
                                _html += '<span class="curwrpage wrpage wrpage_number">' + cur + '</span>'
                            } else {
                                _html += '<a href="javascript:;" class="wrpage wrpage_number">' + i + '</a>'
                            }
                        }
                    } else {
                        for (var i = size - 6; i <= size; i++) {
                            if (i == cur) {
                                _html += '<span class="curwrpage wrpage wrpage_number">' + cur + '</span>'
                            } else {
                                _html += '<a href="javascript:;" class="wrpage wrpage_number">' + i + '</a>'
                            }
                        }
                    }
                }
            }
            if (cur >= size) {
                _html +=
                    '<span href="javascript:;" class="wrpage wr_pagenext">下一页</span><span href="javascript:;" class="wrpage wr_pageend">尾页</span>'
            } else {
                _html +=
                    '<a href="javascript:;" class="wrpage wr_pagenext">下一页</a><a href="javascript:;" class="wrpage wr_pageend">尾页</a>'
            }
            em.append(_html)
        }
        function jumpPage(page) {
            window.location.href = baseUrl.replace(/currentPage/, page);
        }
        em.on("click", "a.wrpage_number", function () {
            jumpPage($(this).text());
            em.empty($(this).text())
            init(size, $(this).text());
            cb($(this).text())
        });
        em.on("click", "a.wr_pagefirst", function () {
            jumpPage(1);
            em.empty()
            init(size, 1);
            cb(1)
        });
        em.on("click", "a.wr_pageend", function () {
            jumpPage(size);
            em.empty()
            init(size, size);
            cb(size)
        });
        em.on("click", "a.wr_pagenext", function () {
            var cu = parseInt(em.children("span.curwrpage").text());
            jumpPage(cu + 1);
            em.empty()
            init(size, cu + 1);
            cb(cu + 1)
        });
        em.on("click", "a.wr_pagepre", function () {
            var cu = parseInt(em.children("span.curwrpage").text());
            em.empty()
            jumpPage(cu + 1);
            init(size, cu - 1);
            cb(cu - 1)
        });
    }
})(jQuery, window)