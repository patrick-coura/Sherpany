var NewMeetingVM = function(){
	var self = this;
	self.name = ko.observable('');
	
	self.submitForm = function(){
		agendaVM.meetingName(self.name());
		$('#modal-new-meeting').modal('hide');
	}
}


var newMeetingVM = new NewMeetingVM();
ko.applyBindings(newMeetingVM, document.getElementById('modal-new-meeting'));