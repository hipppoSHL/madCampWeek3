$(document).ready(function () {
    // click on button submit
    $("#submit").on('click', function () {
        var today = new Date();
        console.log(today);
        var dateStr = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
        console.log(dateStr);
        // send ajax
        $.ajax({
            crossOrigin: true,
            url: 'http://socrip3.kaist.ac.kr:5480/api/users',
            type: "POST",
            data: $("#inputForm").serialize()+'&date='+ encodeURI(dateStr),
            success: function (result) {
                console.log(result);
                alert('회원가입 성공!');
                window.location.href='index.html';
            }
        })
    });
});