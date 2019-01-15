var email = "";
var totalKcal = 0;
var totalKcal_lunch = 0;
var totalKcal_dinner = 0;
var totalKcal_snack = 0;
var eachKcal = 0;
var whole_totalKcal = 0;
var now_kcal = 0;
var check = 0;
var chart_date = [];
var chart_val = [];

$(document).ready(function () {
    email = location.href.substr(
        location.href.lastIndexOf('=') + 1
    );
    console.log('val: ' + email);
    var today = new Date();
    console.log(today);
    var dateStr = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    $.getJSON('http://socrip3.kaist.ac.kr:5480/api/users/email/' + email, function (data) {
        $.each(data, function (key, val) {
            console.log(val);
            console.log(val.daily_kcal);
            console.log(val.daily_kcal.length);
            for (var i = 0; i < val.daily_kcal.length; i++) {
                chart_date[i] = val.daily_kcal[i].date;
                chart_val[i] = parseInt(val.daily_kcal[i].kcal);
            }
            var gender = val.gender;
            if (gender == "male") {
                $("#calorie_content").append("성인 남성 하루 권장섭취량은 약 2500 칼로리 입니다. 하지만 여기서 25%를 줄인 1875 칼로리만 섭취하면 노화를 늦출 수 있대요!");
            } else {
                $("#calorie_content").append("성인 여성 하루 권장섭취량은 약 2000 칼로리 입니다. 하지만 여기서 25%를 줄인 1500 칼로리만 섭취하면 노화를 늦출 수 있대요!");
            }

            totalKcal = parseInt(val.breakfast);
            totalKcal_lunch = parseInt(val.lunch);
            totalKcal_dinner = parseInt(val.dinner);
            totalKcal_snack = parseInt(val.snack);

            $("#breakfast").append(totalKcal + "kcal");
            $("#lunch").append(totalKcal_lunch + "kcal");
            $("#dinner").append(totalKcal_dinner + "kcal");
            $("#snack").append(totalKcal_snack + "kcal");
            whole_totalKcal = totalKcal + totalKcal_lunch + totalKcal_dinner + totalKcal_snack;
            $("#calorie_message").append("오늘은 총 " + whole_totalKcal + " 칼로리 섭취하셨네요!");
            if (whole_totalKcal > 3000) {
                $("#calorie_message").append("<br><div style='font-size: 14px; margin-top: 10px;'>조금 많이 드신 것 같아요...</div>");
            } else {
                $("#calorie_message").append("<br><div style='font-size: 14px; margin-top: 10px;'>오늘 하루 든든하게 먹어요!</div>");
            }
            
            chart_date[val.daily_kcal.length] = dateStr;
            chart_val[val.daily_kcal.length] = whole_totalKcal;

            // 탄수화물
            // $.getJSON("http://socrip3.kaist.ac.kr:5480/api/diets/type/" + encodeURI("탄수화물"), function (data) {
            //     var food_carb = [];
            //     // var food_prot = [];
            //     // var food_fat = [];
            //     $.each(data, function (key, val) {
            //         console.log(val);
            //     })
            // }).fail(function () {
            //     ;
            // })

            var ctx = $('#myChart');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chart_date,
                    datasets: [{
                        fill: false,
                        label: '칼로리 데이터',
                        data: chart_val,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderdash: [],
                        borderdashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                    }]
                }
            });
        })
    })
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

function goto_home() {
    window.location.href = "home.html?email=" + email;
}

// 검색
$('#searchBtn').click(function () {
    var searchKey = $('#searchkey').val();
    console.log(searchKey);
    var escapestr = encodeURI(searchKey);
    $.getJSON("http://socrip3.kaist.ac.kr:5480/api/diets/food/" + escapestr, function (data) {
        console.log(data);
        $("#search_item").empty();
        $.each(data, function (key, val) {
            eachKcal = parseInt(val.kcal);
            $("#search_item").append('<button style="margin-bottom: 0px;" class="btn btn-primary btn-block" type="button" id="one_item" name="' + val.food + '" onclick="button()">' + val.food + ', ' + val.kcal + 'kcal</button><br>');
        })
    }).fail(function () {
        // 검색 실패
        $("#search_item").text("검색 결과가 없어요 :(");
    })
});

// 음식 고르면
function button() {
    var food_name = $('#one_item').attr('name');
    alert(food_name);
    now_kcal += eachKcal;
    console.log("now_kcal: " + now_kcal);
    $('#selected_food').append('<div style="font-size: 15px">' + food_name + ', ' + eachKcal + 'kcal</div>');
    $('#total_kcal').text('총 ' + now_kcal + 'kcal');
}

$('#modal_close').click(function () {
    now_kcal = 0;
    $('#total_kcal').empty();
    $('#search_item').empty();
    $('#selected_food').empty();
    $('#searchkey').empty();
})

$('#modal_add').click(function () {
    console.log("check: ", check);
    if (check == 1) {
        var breakfastKcal = totalKcal + now_kcal;
        console.log("breakfastKcal: ", breakfastKcal);
        $.ajax({
            url: "http://socrip3.kaist.ac.kr:5480/api/users/email/" + email,
            type: 'PUT',
            dataType: 'application/json',
            data: {
                "breakfast": (breakfastKcal).toString(),
            },
        });
        $("#breakfast").text(breakfastKcal + "kcal");
        totalKcal = breakfastKcal;
        // location.reload();
    } else if (check == 2) {
        var lunchKcal = totalKcal_lunch + now_kcal;
        console.log("lunchKcal: ", lunchKcal);
        $.ajax({
            url: "http://socrip3.kaist.ac.kr:5480/api/users/email/" + email,
            type: 'PUT',
            dataType: 'application/json',
            data: {
                "lunch": (lunchKcal).toString()
            },
        });
        $("#lunch").text(lunchKcal + "kcal");
        totalKcal_lunch = lunchKcal;
        // location.reload();
    } else if (check == 3) {
        var dinnerKcal = totalKcal_dinner + now_kcal;
        console.log("dinnerKcal: ", dinnerKcal);
        $.ajax({
            url: "http://socrip3.kaist.ac.kr:5480/api/users/email/" + email,
            type: 'PUT',
            dataType: 'application/json',
            data: {
                "dinner": (dinnerKcal).toString()
            },
        });
        $("#dinner").text(dinnerKcal + "kcal");
        totalKcal_dinner = dinnerKcal;
    } else if (check == 4) {
        var snackKcal = totalKcal_snack + now_kcal;
        console.log("snackKcal: ", snackKcal);
        $.ajax({
            url: "http://socrip3.kaist.ac.kr:5480/api/users/email/" + email,
            type: 'PUT',
            dataType: 'application/json',
            data: {
                "snack": (snackKcal).toString()
            },
        });
        $("#snack").text(snackKcal + "kcal");
        totalKcal_snack = snackKcal;
        // location.reload();
    }
    whole_totalKcal = totalKcal + totalKcal_lunch + totalKcal_dinner + totalKcal_snack;
    $("#calorie_message").text("오늘은 총 " + whole_totalKcal + " 칼로리 섭취하셨네요!");
    if (whole_totalKcal > 3000) {
        $("#calorie_message").append("<br><div style='font-size: 14px; margin-top: 10px;'>조금 많이 드신 것 같아요...</div>");
    } else {
        $("#calorie_message").append("<br><div style='font-size: 14px; margin-top: 10px;'>오늘 하루 든든하게 먹어요!</div>");
    }
    $("#exampleModalCenter").modal('hide');
})

$('#breakfast_act').click(function () {
    check = 1;
    document.getElementById('modal_title').innerHTML = '아침 섭취량 추가';
})
$('#lunch_act').click(function () {
    check = 2;
    document.getElementById('modal_title').innerHTML = '점심 섭취량 추가';
})
$('#dinner_act').click(function () {
    check = 3;
    document.getElementById('modal_title').innerHTML = '저녁 섭취량 추가';
})
$('#snack_act').click(function () {
    check = 4;
    document.getElementById('modal_title').innerHTML = '간식 섭취량 추가';
})

// 사용자가 직접 음식 추가
$('#add_item').click(function () {
    $('#add_food_form').submit(function () {
        var calorie = parseInt($('input[name="kcal"]').val());
        var adding_food_name = $('input[name="food"]').val();
        $.ajax({
            data: $(this).serialize() + '&type=' + "기타",
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            success: function (response) {
                if (response.result == 1) {
                    alert('추가되었습니다!');
                    // 성공 시 더 할 일들 추가...
                    now_kcal += calorie;
                    $('#selected_food').append('<div style="font-size: 15px">' + adding_food_name + ', ' + calorie + 'kcal</div>');
                    $('#total_kcal').text('총 ' + now_kcal + 'kcal');
                } else {
                    alert('추가 실패... 뭐가 문제일까?');
                }
            }
        });
        return false;
    });
});