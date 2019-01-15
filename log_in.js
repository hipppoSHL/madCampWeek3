$('#submit').click(function() {
    $('#inputForm').submit(function() {
        var email = $("#email").val();
        // alert(email);
        $.ajax({
            data: $(this).serialize(),
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            success: function(response) {
                if (response.result == 1) {
                    alert('success!');
                    setChildValue(email);
                }
                else {
                    alert('fail to login..');
                }
            }
        });
        return false;
    });
});

function setChildValue(val) {
    window.location.href = "dkdk/home.html?email=" + val;
}