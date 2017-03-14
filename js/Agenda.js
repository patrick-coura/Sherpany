var AgendaVM = function(){
	var self = this;
	
	self.items = ko.observableArray([]);
	self.meetingName = ko.observable('');
	
	
	self.addItem = function(description){
		var item = new AgendaItem();
		item.description(description);
		
		self.items.push(item);
	}
	
	self.addSubItem = function(parentItem, description){
		parentItem.addSubItem(description);
	}
	
	self.updateItem = function(item){
		var item = new AgendaItem();
		item.description(description);
		
		self.items.push(item);
	}
	
	self.removeItem = function(item){
		confirm('Are you sure do you want to remove this item?', function(){
			self.items.remove(item);	
		});
	}

	self.attachToItem = function(file){
		var matchingItems = self.findMatchingItems(file.name);
				
		if (matchingItems.length == 1)
			matchingItems[0].addFile(file);
	}

	self.findMatchingItems = function(name){
		name = name.substring(0, name.lastIndexOf('.')).toLowerCase();
		var matchingItems = ko.utils.arrayFilter(self.items(), function(item) {
			return name == item.description().toLowerCase();
		});
		
		if (matchingItems.length == 0){
			 matchingItems = ko.utils.arrayFilter(self.items(), function(item) {
				return name.indexOf(item.description().toLowerCase()) >= 0
						|| item.description().toLowerCase().indexOf(name) >= 0;
			});
		}
		
		return matchingItems;
	}
	
	self.newItem = function(){
		newAgendaItemVM.show(NEW_ITEM, null, null);
	}
	
	self.editItem = function(item){
		newAgendaItemVM.show(EDIT_ITEM, null, item);
	}
	
	self.newSubItem = function(item){
		newAgendaItemVM.show(NEW_SUB_ITEM, item, null);
	}
	
}

var agendaVM = new AgendaVM();
ko.applyBindings(agendaVM, document.getElementById('agenda-section'));

