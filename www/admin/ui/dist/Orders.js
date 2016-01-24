var Orders = {
	table: null,

	mailingTemplates : null,

	sending : false,

	init : function(){
		var o = this;

		this.table = $("#orders_list").DataTable(
		{
		    "ajax": {
		        "url": "/admin/orders",
		        "type": "POST",
		        "data": function ( d ) {
		            d.action = "get_orders";
		            d.status = $("#status_filter").val();
		            d.checkRange = $("#checkRange_filter").is(":checked") ? 1 : 0;
		            d.range = $("#orderAdd_range").val();
		        }
		    },
		    "columns": [
		        { "data": "id" },
		        { "data": "order_number" },
		        { "data": "customer_name" },
		        { "data": "date_add_formatted" },
		        { "data": "email_btn" },
		        { "data": "customer_phone" },
		        { "data": "adminName" },
		        { "data": "status_select" },
		        { "data": "action" }
		    ],
		    "columnDefs": [
	            {
	                "targets": [ 0 ],
	                "visible": false,
	                "searchable": false
	            }
	        ],
		    "order": [[ 0, "desc" ]],
		    "bAutoWidth": true,
		    "createdRow": function ( row, data, index ) {
	            $(row).addClass("status_"+data["status"]);
	        }
		}
		);

		this.table.on("draw", function(){
	        o.onStatusChange();
	    });

	    $("#refresh_table").on("click", function(e){
	    	e.preventDefault();

	    	o.table.ajax.reload();
	    });

		$("#orderAdd_range").daterangepicker({
			locale: {
		      format: 'YYYY-MM-DD'
		    }
		});

		$('input[type="checkbox"].square, input[type="radio"].square').iCheck({
          checkboxClass: 'icheckbox_square-blue',
          radioClass: 'iradio_square-blue'
        });

		this.onModalOpen();
		this.onModalSend();
		this.onTemplateSave();
		this.onEmailModalOpen();
		this.initModalElements();
		this.onModalSave();
		this.onStatusChange();
		this.onImageUpload();
	},

	showMessage : function(text, title, type) {
		type = type || "alert";

		if (typeof PNotify === "undefined") {
			alert(text);
		} else {
			new PNotify({
			    title: title,
			    text: text,
			    type: type,
			    styling: 'bootstrap3'
			});
		}
	},

	onModalOpen : function(){
		var o = this;

		$("#order_info_modal").on("show.bs.modal", function(e){
			var order_id = $(e.relatedTarget).attr("data-order-id") || false;

			$.ajax({
				type: "POST",
				data: {
					action: "get_order_info",
					id: order_id
				},
				beforeSend: function(){
					NProgress.start();
				},
				success: function(json){
					NProgress.done();

					try{
						var data = JSON.parse(json);
					} catch(e){
						o.showMessage("Ошибка обработки данных.", "Ошибка", "error");
					}

					if (typeof data.info !== "undefined" &&
						typeof data.error !== "undefined" &&
						!data.error) {
						o.renderModal(data.info);
					} else {
						o.showMessage(data.status || "Ошибка обработки данных.", "Ошибка", "error");
					}
				},
				error: function(data){
					NProgress.done();
					o.showMessage("Ошибка обработки данных.", "Ошибка", "error");
					console.log(data);
				}
			});
		});
	},

	onEmailModalOpen : function(){
		var o = this;

		$("#sendEmail_modal").on("show.bs.modal", function(e){
			var email = $(e.relatedTarget).attr("data-email") || false;
			$("#sendEmail_email").tagEditor("destroy");
			$("#sendEmail_email").val("");
			$("#sendEmail_cc").tagEditor("destroy");
			$("#sendEmail_cc").val("");
			o.initEmailEdit();
			$("#sendEmail_email").tagEditor("addTag", email);

			$.ajax({
				url: "/admin/mailing",
				type: "POST",
				data: {
					action: "get_email_templates"
				},
				beforeSend: function(){
					NProgress.start();
				},
				success: function(json){
					NProgress.done();

					try{
						var data = JSON.parse(json);
					} catch(e){
						o.showMessage("Ошибка обработки данных.", "Ошибка", "error");
					}

					o.renderEmailModal(data);
				},
				error: function(data){
					NProgress.done();
					o.showMessage("Ошибка обработки данных.", "Ошибка", "error");
					console.log(data);
				}
			});
		});
	},

	
	renderModal : function(data){
		$("#modal_orderId").html("#"+data.order_number);
		$("#details_save").attr("data-id", data.id);
		$("#modal_uploadImage").attr("data-id", data.order_number);
		var admin = typeof data.adminName == "undefined"? "":data.adminName;
		if (data.date_status_changed == null) {
			$("#modal_statusChange").html("Заказ ранее не был обработан.");
		} else {
			$("#modal_statusChange").html(data.date_status_changed + "  " + admin);
		}
		$("#modal_orderDate").html(data.date_add);
		$("#modal_name").val(data.customer_name);
		$("#modal_phone").val(data.customer_phone);
		$("#modal_email").val(data.customer_email);
		if (data.mailing == "1") {
			$("#modal_mailing").prop("checked", true);
		} else {
			$("#modal_mailing").prop("checked", false);
		}
		if (data.customer_question == "") {
			$("#modal_question").addClass("hidden");
		} else {
			$("#modal_question").removeClass("hidden");
			$("#modal_questionContent").html(data.customer_question);
		}
		if (data.images) {
			var images = "";
			for (var i = 0; i < data.images.length; i++) {
				images += "<a target='_blank' href='"+data.images[i].path+"'>"+data.images[i].title+"</a><br>";
			}
			$("#modal_imagesList").html(images);
		}
		$("#modal_size_width").val(data.size_width);
		$("#modal_size_height").val(data.size_height);
		$("#modal_deliveryDate").val(data.date_delivery);
		$("#modal_address").val(data.address);
		$("#modal_comment").val(data.comment);
	},

	renderEmailModal : function(data){
		this.mailingTemplates = data;
		var options = "";
		for (var i = 0; i < data.length; i++) {
			options += '<option value="'+i+'">'+data[i].theme+'</option>';
		}
		$("#sendEmail_template").html(options);
	},

	initModalElements : function(){
		// info modal
        $("#modal_deliveryDate").inputmask("y-m-d h:s:s");

        // mailing modal
        CKEDITOR.replace("sendEmail_content");
        var o = this;
		$("#sendEmail_chooseTemplate").on("click", function(e){
			e.preventDefault();

			var templateIndex = $("#sendEmail_template").val();
			var template = o.mailingTemplates[templateIndex];

			$("#sendEmail_theme").val(template.theme);
			CKEDITOR.instances["sendEmail_content"].setData(template.content);
		});
	},

	initEmailEdit : function(){
		var o = this;
		var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
		$("#sendEmail_email").tagEditor({
			placeholder : "Email заказчика",
			delimiter : ", ",
			beforeTagSave : function(field, editor, tags, tag, val){
				if (!pattern.test(val)) {
					o.showMessage("Неверный формат email", "Ошибка", "warning");
					return false;
				}
			}
		});
		$("#sendEmail_cc").tagEditor({
			placeholder : "Дополнительные адреса",
			delimiter : ", ",
			beforeTagSave : function(field, editor, tags, tag, val){
				if (!pattern.test(val)) {
					o.showMessage("Неверный формат email", "Ошибка", "warning");
					return false;
				}
			}
		});
	},

	onModalSave : function(){
		var o = this;

		var shortTextPattern = /^[а-яa-z\s]{1,}$/i;
		var phonePattern = /^[0-9\.\-_\(\)\W]{1,}$/i;
		var emailPattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
		var textPattern = /(<(\s*?)script|<(\s*?)vbscript|<(\s*?)\?|<(\s*?)link|<(\s*?)object|<(\s*?)embed|<(\s*?)param)/i;

		$("#details_save").on("click", function(e){
			e.preventDefault();

			if (!shortTextPattern.test($("#modal_name").val()))
			return o.showMessage("Неверный формат имени заказчика.", "Ошибка", "error");
		
			if (!phonePattern.test($("#modal_phone").val()))
				return o.showMessage("Неверный формат телефона заказчика.", "Ошибка", "error");

			if (!emailPattern.test($("#modal_email").val()))
				return o.showMessage("Неверный формат email заказчика.", "Ошибка", "error");

			var data = {};
			data.id = $(this).attr("data-id");
			data.name = $("#modal_name").val();
			data.phone = $("#modal_phone").val();
			data.email = $("#modal_email").val();
			data.mailing = $("#modal_mailing").is(":checked") ? 1 : 0;
			data.size = $("#modal_size_width").val() + " X " + $("#modal_size_height").val();
			data.date_delivery = $("#modal_deliveryDate").val();
			data.address = $("#modal_address").val();
			data.comment = $("#modal_comment").val();
			data.action = "save_order_info";

			$.ajax({
				type: "POST",
				data: data,
				beforeSend: function(){
					NProgress.start();
				},
				success: function(json){
					NProgress.done();

					try{
						var data = JSON.parse(json);
					} catch(e){
						o.showMessage("Ошибка обработки данных.", "Ошибка", "error");
					}

					if (typeof data.error !== "undefined" &&
						!data.error) {
						o.showMessage("Данные успешно обновлены.", "Успех", "success");
					} else {
						o.showMessage(data.status || "Ошибка обработки данных.", "Ошибка", "error");
					}
				},
				error: function(data){
					NProgress.done();
					o.showMessage("Ошибка обработки данных.", "Ошибка", "error");
					console.log(data);
				}
			});
		});
	},

	onModalSend : function(){
		var o = this;
		$("#sendEmail_send").on("click", function(e){
			e.preventDefault();

			if (o.sending) {
				o.showMessage("Новая отправка невозможна. Дождитесь завершения предыдущей отправки.","Ошибка", "warning");
				return;
			} else {
				o.sending = true;
			}


			var emails = [];
			emails = emails.concat($("#sendEmail_email").tagEditor('getTags')[0].tags);
			emails = emails.concat($("#sendEmail_cc").tagEditor('getTags')[0].tags);

			var theme = $("#sendEmail_theme").val();
			if (typeof theme == "undefined" ||
				theme == "") {
				o.sending = false;
				o.showMessage("Невозможно отправить. Заполните тему письма.", "Ошибка", "error");
				return;
			}

			var content = CKEDITOR.instances["sendEmail_content"].getData();
			if (typeof content == "undefined" ||
				content == "") {
				o.sending = false;
				o.showMessage("Невозможно отправить. Заполните текст письма.", "Ошибка", "error");
				return;
			}

			$.ajax({
				url: "/admin/mailing/",
				type: "POST",
				data: {
					action: "send",
					emails: JSON.stringify(emails),
					theme: theme,
					content: content
				},
				beforeSend: function(){
					NProgress.start();
					o.showMessage("Начинаем отправку...", "Сообщение", "info");
				},
				success: function(json){
					NProgress.done();
					o.sending = false;

					try{
						var data = JSON.parse(json);
						if (!data.error) {
							o.showMessage("Письма отправлены успешно", "Успех", "success");
						} else {
							o.showMessage("При отправке возникла ошибка.", "Ошибка", "error");
						}
					} catch(e){
						o.showMessage("При отправке возникла ошибка.", "Ошибка", "error");
					}
				},
				error: function(){
					NProgress.done();
					o.sending = false;
					o.showMessage("При отправке возникла ошибка.", "Ошибка", "error");
				}
			});
		});
	},

	onStatusChange : function(){
		var o = this;
		$("select[data-status]").unbind("change").on("change", function(e){
			var data = {};
			data.action = "change_status";
			data.status = $(this).val();
			data.id = $(this).attr("data-id");

			var current = this;

			$.ajax({
				type: "POST",
				data: data,
				success: function(json){
					try{
						var data = JSON.parse(json);
					} catch(e){
						o.showMessage("Ошибка обработки данных.", "Ошибка", "error");
					}

					if (typeof data.error !== "undefined" &&
						!data.error) {
						$(current).parents("tr").removeClass("status_new status_send status_coordination status_delivery status_done").addClass("status_"+data.status);
					} else {
						o.showMessage(data.status || "Ошибка обработки данных.", "Ошибка", "error");
					}
				},
				error: function(data){
					o.showMessage("Ошибка обработки данных.", "Ошибка", "error");
					console.log(data);
				}
			});
		});
	},

	onTemplateSave : function(){
		var o = this;

		$("#saveTemplate").on("click", function(e){
			e.preventDefault();

			var theme = $("#sendEmail_theme").val();
			if (typeof theme == "undefined" ||
				theme == "") {
				o.showMessage("Невозможно сохранить. Заполните тему письма.", "Ошибка", "error");
				return;
			}

			var content = CKEDITOR.instances["sendEmail_content"].getData();
			if (typeof content == "undefined" ||
				content == "") {
				o.showMessage("Невозможно сохранить. Заполните текст письма.", "Ошибка", "error");
				return;
			}

			$.ajax({
				url: "/admin/mailing/",
				type: "POST",
				data: {
					action: "add_template",
					theme: theme,
					content: content
				},
				success: function(json){
					try{
						var data = JSON.parse(json);
						if (!data.error) {
							o.showMessage("Шаблон успешно сохранен.", "Успех", "success");
						} else {
							o.showMessage("Ошибка обработки данных.", "Ошибка", "error");
						}
					} catch(e){
						o.showMessage("Ошибка обработки данных.", "Ошибка", "error");
					}
				},
				error: function(data){
					o.showMessage("Ошибка обработки данных.", "Ошибка", "error");
				}
			});
		});
	},


	onImageUpload : function(){
		var btn = $("#modal_uploadImage");
		var o = this;

		$.ajax_upload(btn, {
            action: "",
            name: "image",
            data: {
                action: "img_upload",
                id: function(){
                	return $("#modal_uploadImage").attr("data-id");
                }
            },
            onSubmit: function(file, ext){
                this.disable();
                btn.text("Загрузка...");
            },
            onComplete: function(file, response){
                this.enable();
                btn.text("Загрузить");
                
                try{
                	var data = JSON.parse(response);
                } catch(e){
                	o.showMessage("Ошибка загрузки изображения", "Ошибка", "error");
                }

                if (typeof data !== "undefined" &&
                	typeof data.error !== "undefined" &&
                	typeof data.status !== "undefined" &&
                	typeof data.url !== "undefined" &&
                	typeof data.title !== "undefined" &&
                	!data.error) {
                	o.showMessage("Изображение загружено успешно.", "Успех", "success");
                	$("#modal_imagesList").append("<a target='_blank' href='"+data.url+"'>"+data.title+"</a><br>");
                } else {
                	o.showMessage(data.status || "Ошибка загрузки изображения", "Ошибка", "error");
                }
            }
        });
	}
}