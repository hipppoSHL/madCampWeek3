var email = "";
var weight_list = [];
var date_list = [];
var personal_weight = 0;
var personal_height = 0;
var target_weight;
var bmi = 0;
var sub = 0;

$(document).ready(function () {
    email = location.href.substr(
        location.href.lastIndexOf('=') + 1
    );
    console.log('val: ' + email);

    $.getJSON('http://socrip3.kaist.ac.kr:5480/api/users/email/' + email, function (data) {
        $.each(data, function (key, val) {
            personal_weight = parseInt(val.weight[val.weight.length - 1].weight);
            personal_height = parseInt(val.height);
            bmi = personal_weight / (personal_height * personal_height / 10000);
            target_weight = val.target_weight;
            sub = Math.abs(target_weight - personal_weight);
            console.log("bmi: ", bmi);
            console.log(val);
            console.log(val.weight.length - 1);
            console.log("웨이트: " + val.weight[val.weight.length - 1].weight);
            console.log("|target weight - weight| = ", sub);
            $("#target_weight").append(val.target_weight);
            $("#weight_now").append(val.weight[val.weight.length - 1].weight);
            $("#weightcomment").append(val.weight[val.weight.length - 1].weight - val.target_weight);
            $("#bmi").append("BMI(체질량 지수)는 ", bmi.toFixed(2), " 입니다.");
            if (sub > 5) {
                $("#image_weird").append("분발하셔야겠어요 :(<br>");
                $("#image_weird").append("<img src='돼지15.png' width='40%'></img>");
            } else {
                $("#image_weird").append("잘 하고 계시군요 ;)<br>");
                $("#image_weird").append("<img src='돼지16.png' width='40%'></img>");
            }
            $("#user_name").append(val.name + "님,")
            var weight_num = val.weight.length;
            for (var i = 0; i < weight_num; i++) {
                weight_list[i] = parseInt(val.weight[i].weight);
                date_list[i] = val.weight[i].date;
            }

            var ctx = $('#myChart');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: date_list,
                    datasets: [{
                        fill: false,
                        label: '체중',
                        data: weight_list,
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
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true,
                                min: 40
                            }
                        }]
                    }
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

$("#change_weight").click(function() {
    var today = new Date();
    var dateStr = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    $.ajax({
        data: $('#weight_form').serialize() + '&date=' + encodeURI(dateStr),
        type: 'PUT',
        url: "http://socrip3.kaist.ac.kr:5480/api/users/weight/" + email,
        success: function (response) {
            if (response.result == 1) {
                alert('변경되었습니다!');
                // 성공 시 더 할 일들 추가...
            } else {
                alert('변경 실패... 뭐가 문제일까?');
            }
        }
    });
    $("#exampleModalCenter").modal('hide');
})

