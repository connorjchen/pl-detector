let predictlang = () => {
    console.log("something typed!")
    console.log($("#pl-textarea").val())
}

$("#pl-textarea").on("change", function() {
    predictlang()
})
$( document ).ready(function() {
    console.log( "ready!" );
});