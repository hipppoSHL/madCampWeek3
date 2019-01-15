var email = "";
var mission_list = [];
var day = 0;
var today_dont = false;

$(document).ready(function() {
    email = location.href.substr(
        location.href.lastIndexOf('=')+1
    );
    console.log('val: ' + email);

    var today = new Date();
    day = today.getDay();

    $.ajaxSetup({
        async: false
    });

    $.getJSON('http://socrip3.kaist.ac.kr:5480/api/users/email/' + email, function(data) {
        $.each(data, function (key, val) {
            $("#hello").append("<h5 align='center'>" + val.name + "님,<br>안녕하세요</h5>");
            if (val.missions[day] == '1') { today_done=true; }
            else { today_done=false; }
        })
    })

    // 미션 리스트 가져오기
    $.getJSON('http://socrip3.kaist.ac.kr:5480/api/missions/', function (data) {
        $.each(data, function (key, val) {
            // console.log(val);
            mission_list.push(val.message);
        })
    })
    if (today_done) {
        $('#today_mission').empty().append("<span style='text-decoration: line-through'>" + mission_list[day] + "</span>");
    }
    else { $('#today_mission').text(mission_list[day]); }
});

function goto_mealplan() {
    window.location.href = "mealplan.html?email=" + email;
}

function goto_farm() {
    window.location.href = "farm.html?email=" + email;
}

function goto_profile() {
    window.location.href = "usr_info.html?email=" + email;
}