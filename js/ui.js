$(document).ready(function(){
function enterOnModal(event){
	$(event.currentTarget).find('.ok-modal').click();
}

window.confirm = function (text, callback){
$('#confirm-content').text(text);

$('#confirm-modal-ok').click(callback);
$('#confirm-modal').keyup(enterOnModal);
$('#confirm-modal').on('hidden.bs.modal', function(){
	$('#confirm-modal-ok').off('click');
	$('#confirm-modal').off('keyup', 'enterOnModal');
});
$('#confirm-modal').modal('show');
}

$('#modal-new-meeting').modal('show');
});
