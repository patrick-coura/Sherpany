var AgendaItem = function(){	
	var self = this;
	
	self.description = ko.observable('');
	self.order = ko.observable(0);
	self.files = ko.observableArray([]);
	self.subItems = ko.observableArray([]);
	self.parent = ko.observable('');
		
	self.filesName = ko.observable('');
	
	self.addSubItem = function(description){
		var subItem = new AgendaItem();
		subItem.description(description);
		subItem.parent(self);
		
		self.subItems.push(subItem);
	}
	
	self.removeSubItem = function(subItem){
		confirm('Are you sure do you want to remove this item?', function(){
			self.subItems.remove(subItem);
		});
	}
	
	self.addFile = function(file){
		self.files.push(file);
		self.filesName(self.filesName() + file.name + '<br/>');
	}	
}


var NewAgendaItemVM = function(modal){
	var self = this;
	
	self.modal = ko.observable(modal);
	
	self.action = ko.observable('');
	self.item = ko.observable(null);
	self.parentItem = ko.observable(null);
	self.oldValue = ko.observable('');
	
	
	self.show = function(action, parentItem, item){
		self.action(action);
		self.parentItem(parentItem);
		if (item == null)
			item = new AgendaItem();
		
		
		self.oldValue(item.description());
		self.item(item);
				
		self.modal().modal('show');
		self.modal().find('input').first().focus();
	}
	
	self.submitForm = function(){
		var description = self.item().description();
		switch(self.action()){
			case NEW_ITEM:
				agendaVM.addItem(description);
				break;
			case NEW_SUB_ITEM:
				agendaVM.addSubItem(self.parentItem(), description);
				break;
		}
		
		self.item(null);
		self.modal().modal('hide');
	}
	
	self.cancelForm = function(){
		if (self.item() != null)
			self.item().description(self.oldValue());
	}
}




var newAgendaItemVM = new NewAgendaItemVM($('#modal-agenda-item'));
ko.applyBindings(newAgendaItemVM, document.getElementById('modal-agenda-item'));