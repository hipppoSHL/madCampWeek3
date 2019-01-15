var email = "";
var mission_list = [];
var day = 0;
var today_mission = "";
var today_done = false;


$(document).ready(function () {
    email = location.href.substr(
        location.href.lastIndexOf('=') + 1
    );
    console.log('val: ' + email);
    var today = new Date();
    day = today.getDay();
    console.log('today: ', day);

    $.ajaxSetup({
        async: false
    });

    // 유저 정보 가져오기
    $.getJSON('http://socrip3.kaist.ac.kr:5480/api/users/email/' + email, function (data) {
        $.each(data, function (key, val) {
            console.log(val);
            console.log("val.missions: ", val.missions);
            // 미션 성공했는지 여부 가져옴
            for (var i = 0; i < val.missions.length; i++) {
                if (parseInt(val.missions[i]) == 1) {
                    $('.col' + (i+1)).append('<img src="돼지' + (i+1) + '.png" height="90px">');
                } else {
                    $('.col' + (i+1)).append('<img src="돼지' + (i+1) + '.png" height="90px" style="opacity: 0.1">');
                }
            }
            console.log("today done? ", val.missions[day]);
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
    console.log("mission_list: ", mission_list);
    console.log("today's mission: ", mission_list[day]);
    if (today_done) {
        $('#btn_div').empty().append("<button type='button' class='btn btn-secondary btn-block'>오늘의 미션 완료!</button>");
        $('#today_mission').empty().append("<span style='text-decoration: line-through'>" + mission_list[day] + "</span>");
    }
    else { $('#today_mission').text(mission_list[day]); }
    today_mission = mission_list[day];
});

function goto_mealplan() {
    window.location.href = "mealplan.html?email=" + email;
}

function goto_home() {
    window.location.href = "home.html?email=" + email;
}

function goto_profile() {
    window.location.href = "usr_info.html?email=" + email;
}

$('#mission_complete').click(function () {
    // 미션 완료했다고 하면
    $.ajax({
        url: "http://socrip3.kaist.ac.kr:5480/api/users/missions/" + email,
        type: 'PUT',
        dataType: 'application/json',
        data: {
            "number": day,
        },
    });
    $('#today_mission').empty().append("<span style='text-decoration: line-through'>" + mission_list[day] + "</span>");
    $('#btn_div').empty().append("<button type='button' class='btn btn-secondary btn-block'>오늘의 미션 완료!</button>");
    $("#exampleModalCenter").modal('hide');
    $("#congrats").append('<img width="100%" src="돼지' + (day+1) + '.png" alt="">');
    $(".col" + (day+1)).html('<img src="돼지' + (day+1) + '.png" height="90px">');
})