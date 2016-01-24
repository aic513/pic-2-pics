/**
 * Orders application plugin
 * Author: Trushin Victor 12/2015
 */
var App = (function($){

	// jQuery
	if (!$) {
		alert("jQuery is missing");
		return;
	}
	
	function setError(status){
		$(document).trigger("app:error", [status]);
		return false;
	}

	var get_uid = function(){
		var uid = 0;
		return function(){
			return uid++;
		}
	}();

	/*----------------------------------------------------------------------*/
	// Plugin starts

	// Copyright (c) 2008 Andris Valums, http://valums.com
	// Licensed under the MIT license (http://valums.com/mit-license/)
	var Ajax_upload = function(button, options){
		this.button = button;

		this.wrapper = null;
		this.form = null;
		this.input = null;
		this.iframe = null;

		this.disabled = false;
		this.submitting = false;

		this.settings = {
			// Location of the server-side upload script
			action: 'upload.php',
			// File upload name
			name: 'image',
			// Additional data to send
			data: {},
			// Fired when user selects file
			// You can return false to cancel upload
			onSubmit: function(file, extension) {},
			// Fired when file upload is completed
			onComplete: function(file, response) {},
			// Fired when server returns the "success" string
			onSuccess: function(file){},
			// Fired when server return something else
			onError: function(file, response){}
		};

		// Merge the users options with our defaults
		$.extend(this.settings, options);

		this.create_wrapper();
		this.create_input();

		if (jQuery.support.msie){
			// fix ie transparent background bug
			this.make_parent_opaque();
		}

		this.create_iframe();
	}
	// assigning methods to our class
	Ajax_upload.prototype = {
		set_data : function(data){
			this.settings.data = data;
		},
		disable : function(){
			this.disabled = true;
			if ( ! this.submitting){
				this.input.attr('disabled', true);
			}
		},
		enable : function(){
			this.disabled = false;
			this.input.attr('disabled', false);
		},
		create_wrapper : function(){
			// Shorten names
			var button = this.button, wrapper;

			wrapper = this.wrapper = $('<div></div>')
				.insertAfter(button)
				.append(button);

			// wait a bit because of FF bug
			// it can't properly calculate the outerHeight
			setTimeout(function(){
				wrapper.css({
					position: 'relative'
					,display: 'block'
					,overflow: 'hidden'

					,height: button.outerHeight(true)
					,width: button.outerWidth(true)
				});
			}, 20);

			var self = this;
			wrapper.mousemove(function(e){
				// Move the input with the mouse, so the user can't misclick it
				if (!self.input) {
					return;
				}

				self.input.css({
					top: e.pageY - wrapper.offset().top - 5 + 'px'
					,left: e.pageX - wrapper.offset().left - 170 + 'px'
				});
			});


		},
		create_input : function(){
			var self = this;

			this.input =
				$('<input type="file" />')
				.attr('name', this.settings.name)
				.css({
					'position' : 'absolute'
					,'margin': 0
					,'padding': 0
					,'width': '220px'
					,'heigth': '10px'
					,'opacity': 0
				})
				// .change(function(){
				// 	if ($(this).val() == ''){
				// 		// there is no file
				// 		return;
				// 	}

				// 	// we need to lock "disable" method
				// 	self.submitting = true;

				// 	// Submit form when value is changed
				// 	self.submit();

				// 	// unlock "disable" method
				// 	self.submitting = false;
				// })
				// 
				// submit method has to be called from another method
				.appendTo(this.wrapper)

				//
				.hover(
					function(){self.button.addClass('hover');}
					,function(){self.button.removeClass('hover');}
				);

			if (this.disabled){
				this.input.attr('disabled', true);
			}

		},
		create_iframe : function(){
			var name = 'iframe_au' + get_uid();
			this.iframe =
				$('<iframe name="' + name + '"></iframe>')
				.css('display', 'none')
				.appendTo('body');
		},
		submit : function(options){
			$.extend(this.settings, options);

			var self = this, settings = this.settings;

			//
			var file = this.file_from_path(this.input.val());

			//
			if (settings.onSubmit.call(this, file, this.get_ext(file)) === false){
				// Do not continue if user function returns false
				if (self.disabled){
					this.input.attr('disabled', true);
				}
				return;
			}

			this.create_form();
			this.input.appendTo(this.form);
			this.form.submit();

			this.input.remove(); this.input = null;
			this.form.remove();	this.form = null;

			this.submitting = false;

			//
			this.create_input();

			var iframe = this.iframe;
			iframe.load(function(){
				var response = iframe.contents().find('body').html();

				settings.onComplete.call(self, file, response);
				if (response == 'success'){
					settings.onSuccess.call(self, file);
				} else {
					settings.onError.call(self, file, response);
				}

				// CLEAR ( ,   FF2 )
				setTimeout(function(){
					iframe.remove();
				}, 1);
			});

			//   ,
			this.create_iframe();
		},
		create_form : function(){
			this.form =
				$('<form method="post" enctype="multipart/form-data"></form>')
				.css("display", "none")
				.appendTo('body')
				.attr({
					"action" : this.settings.action
					,"target" : this.iframe.attr('name')
				});
			for (var i in this.settings.data){
				$('<input type="hidden" />')
					.appendTo(this.form)
					.attr({
						'name': i
						,'value': this.settings.data[i]
					});
			}
		},
		file_from_path : function(file){
			var i = file.lastIndexOf('\\');
			if (i !== -1 ){
				return file.slice(i+1);
			}
			return file;
		},
		get_ext : function(file){
			var i = file.lastIndexOf('.');

			if (i !== -1 ){
				return file.slice(i+1);
			}
			return '';
		},
		make_parent_opaque : function(){
			// ie
			this.button.add(this.button.parents()).each(function(){
				var color = $(this).css('backgroundColor');
				var image = $(this).css('backgroundImage');

				if ( color != 'transparent' ||  image != 'none'){
					$(this).css('opacity', 1);
					return false;
				}
			});
		}

	};

	// Plugin ends
	/*----------------------------------------------------------------------*/


	var shortTextPattern = /^[а-яa-z\s]{1,}$/i;
	var phonePattern = /^[0-9\.\-_\(\)\W]{1,}$/i;
	var emailPattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
	var textPattern = /(<(\s*?)script|<(\s*?)vbscript|<(\s*?)\?|<(\s*?)link|<(\s*?)object|<(\s*?)embed|<(\s*?)param)/i;

	// Methods for work with data
	var Data = {

		upload : null,

		activateBlock : function(field){
			var file = $(field);
			if (file.size() != 1) 
				return setError('You passed '+file.size()+' elements to ajax_upload at once');

			this.upload = new Ajax_upload(file);	
		},

		newOrder : function(data){
			if (this.upload == null) 
				return setError("Upload was not activated");

			if (typeof data !== "object")
				return setError("Wrong parameter passed");

			var Defaults = {
				url: "",
		        name: "",
		        phone: "",
		        email: "",
		        mailing: true,
		        question: "",

			};
			$.extend(Defaults, data);


			var checking = this.checkFields(Defaults);
			if (checking.error) {
				return;
			} else {
				Defaults = checking.defaults;
			}

			this.upload.submit({
				action: Defaults.url,
				data: {
					action: "new_order",
					name: Defaults.name,
					phone: Defaults.phone,
					email: Defaults.email,
					mailing: (Defaults.mailing ? 1 : 0),
					question: Defaults.question
				},
				onSubmit: function(file, extension) {
					$(document).trigger("app:start");
				},
				onComplete: function(file, response) {
					$(document).trigger("app:end", [response]);
				}
			});

		},


		checkFields : function(Defaults){
			var error = false;
			// Check name
			if (!shortTextPattern.test(Defaults.name)) {
				error = true;
				setError("Wrong name passed");
			}

			// Check phone
			if (!phonePattern.test(Defaults.phone)) {
				error = true;
				setError("Wrong phone passed");
			}

			// Check email
			if (!emailPattern.test(Defaults.email)) {
				error = true;
				setError("Wrong email passed");
			}

			// Make field boolean
			Defaults.mailing = !!Defaults.mailing;

			// Check question
			if (Defaults.question !== "" &&
				textPattern.test(Defaults.question)) {
				error = true;
				setError("Wrong question passed");
			}

			return {
				error: error,
				defaults: Defaults
			};
		}
	}


	// Public API
	return {
		newOrder : function(data){
			return Data.newOrder(data);
		},

		activateBlock : function(field){
			Data.activateBlock(field);
		}
	};

})(jQuery);