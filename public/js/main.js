
$( document ).ready(function() {
    $.get('/questions', function(data) {
    	// console.log(data);

		$(".question_answer_area").html(data);
	});

});

$(document).on("click", '#submit_btn', function() {
	// alert(data); return true;
	// CKEDITOR.instances.editor1.updateElement();
	var formData = $('#question_form').serializeArray();
	console.log(formData);
	$.ajax({
		url: "/question",
		data: formData,
		method: "POST",
		success: function(result){
			console.log(result);
			console.log("errlng"+result.length);
			$('#question_form').reset();
			
		}
	});
	$.get('/questions', function(data) {
		$(".question_answer_area").html(data);
	});
});