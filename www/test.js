$(document).ready(function () {
    $('#comment').text('in test.js onReady');

    var calc = function(){
        //var element = $('#comment');
        //    let content = element.html();
        //    element.html(content + '<br>' + text);
    };
    var sxlog = function (text) {
        var element = $('#comment');
        var content = element.html();
        element.html(content + '<br>' + text);
    };
    //
    //sxlog('start defining Date');
    //
    //if (typeof Date == 'function') {
    //
    //    sxlog('date exist as a function');
    //
    //    //Date.prototype.toRussianString = function () {
    //    //    let year = this.getFullYear();
    //    //    let month = this.getMonth() + 1;
    //    //    if (month < 10)
    //    //        month = "0" + month.toString();
    //    //    let day = this.getDate();
    //    //
    //    //    return day + '.' + month + '.' + year;
    //    //};
    //}
    //else sxlog('date is NOT exists');
    //
    //sxlog('end');
});

