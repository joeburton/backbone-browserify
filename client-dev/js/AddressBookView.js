var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

var AddressModel  = require('./AddressModel');

var AddressBook = Backbone.View.extend({
    
    template: _.template('<li><%= house %>, <%= address1 %>, <%= address2 %>, <%= postcode %></li>'),
    
    el: '.address-container',
    
    events: {
    	'click .add-address': 'addAddress',
        'click .number-addresses': 'getNumberOfAddresses'   	
    },
    
    initialize: function () {
    	
        this.render();
        
        this.listenTo(this.collection, 'add', function(model) {
        	this.render();
            this.getNumberOfAddresses();
        }, this);
        
    },

    render: function() {
        
        console.log(this.collection);
        
        var addresses = '';
        
        this.collection.each(function (model) {
            addresses += this.template(model.attributes);
            console.log(this.template(model.attributes));
        }, this); 

        this.$el.find('.addresses').html(addresses);
        
        return this;
        
  	},
        
    addAddress: function() {
    	
        this.collection.add(new AddressModel({ 
    		house: '66 Selwyn Avenue',
    		address1: 'Highams Park',
			address2: 'London',
    		postcode: 'E4 9QT'
		}));	
        
  	},

    getNumberOfAddresses: function () {

        var numAddresses = this.collection.models.length;
        this.$('.num').html('(' + numAddresses + ')');

        return numAddresses;
        
    }
    
});

module.exports = AddressBook;