import jQuery from "jquery";

jQuery(function ($) {
    $('a[data-toggle="tab"]').on('click', function () {
        $('a[data-toggle="tab"]').removeClass('active')
    });
    $('[data-toggle="tooltip"]').tooltip();

    $('.lightbox').on('click',function(event){
        event = event || window.event
        var target = event.target || event.srcElement
        var link = target.src ? target.parentNode : target
        var options = { index: link, event: event }
        var links = this.getElementsByTagName('a')
        blueimp.Gallery(links, options)
    });
});