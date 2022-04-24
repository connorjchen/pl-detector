let predictlang = () => {
    const editor_input = $("#pl-textarea").val()
    $.ajax({
        type: "POST",
        url: "api/backend/predictlang/",
        data: JSON.stringify({"contents": editor_input}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: success_response
    });

    function success_response(response, response_code) {
        $("#predict-lang").text(response['nb_model'])
    }
}

$("#pl-textarea").on("change", function() {
    predictlang()
})
$( document ).ready(function() {
    console.log( "ready!" );
});