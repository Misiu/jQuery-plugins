(function ($) {
    $.fn.ajaxSelect = function (options) {
        var $this = this;
        //options
        var settings = $.extend({}, defaults, options);
        //disable select
        if ($.ui.selectmenu && settings.selectmenu && settings.disableOnLoad) {
            $this.selectmenu('disable');
        }
        //ajax call
        $.ajax({
            type: settings.type,
            contentType: settings.contentType,
            url: settings.url,
            dataType: settings.dataType,
            data: settings.data
        }).done(function (data) {
            var n = data.d || data;
            var list = "";
            $.each(n, function (i) {
                list += '<option value=' + n[i].Id + '>' + n[i].Nazwa + '</option>';
            });
            $this.filter("select").each(function () {
                $(this).empty();
                $(this).append(list);
                if ($.ui.selectmenu && settings.selectmenu) {
                    $this.selectmenu();
                }
            });
            settings.success.call(this);
        }).fail(function () {
            settings.error.call(this);
        });

        return this;
    };

    var defaults = {
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '/echo/json/',
        dataType: 'json',
        data: null,
        async: true,
        selectmenu: true,
        disableOnLoad: true,
        success: function () {},
        error: function () {}
    };
})(jQuery);