var Mailing = {
	sending : false,

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

	init : function(){
		var o = this;

		CKEDITOR.replace("compose-textarea");

		var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

		$("#cc_mailing").tagEditor({
			placeholder : "Дополнительные адреса",
			delimiter : ", ",
			beforeTagSave : function(field, editor, tags, tag, val){
				if (!pattern.test(val)) {
					o.showMessage("Неверный формат email", "Ошибка", "warning");
					return false;
				}
			}
		});

		var table = $("#emails_table").DataTable(
		{
			"scrollY": "260px",
		    "scrollCollapse": true,
		    "paging": false,
		    "bLengthChange": false,
		    "bSort": true,
		    "bInfo": false,
		    "bAutoWidth": true,
		    // "searching": false,
		    "ajax": {
		        "url": "/admin/mailing",
		        "type": "POST",
		        "data": function ( d ) {
		            d.action = "get_mails";
		        }
		    },
		    "columns": [
		        { "data": "checkbox" },
		        { "data": "customer_email" }
		    ]
		}
		);

		table.on("draw", function(){
	        $('input[type="checkbox"].square, input[type="radio"].square').iCheck({
	          checkboxClass: 'icheckbox_square-blue',
	          radioClass: 'iradio_square-blue'
	        });
	    });

	    window.onbeforeunload = function () { 
	        return (Mailing.sending ? "Внимание! Работает скрипт. Для предотвращения ошибки не покидайте и не обновляйте страницу." : null); 
	    } 

	    this.onModalTemplateOpen();
	    this.onTemplateSave();
	    this.onSend();
	    this.onCheckEmails();
	},

	onModalTemplateOpen : function(){
		var o = this;

		$("#template_modal").on("show.bs.modal", function(e){
			o.getModal();
		});
	},

	getModal : function(){
		var o = this;

		$("#accordion").html("");

		$.ajax({
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
					o.renderModal(data);
				} catch(e){
					o.showMessage("Ошибка обработки данных.", "Ошибка", "error");
				}
			},
			error: function(){
				NProgress.done();
				o.showMessage("Ошибка обработки данных.", "Ошибка", "error");
			}
		});
	},

	renderModal : function(data){
		for (var i = 0; i < data.length; i++) {
			var html = "";

			html += '<div class="panel panel-default">';
			html += '<div class="panel-heading" role="tab" id="heading_'+data[i].id+'">';
			html += '<h4 class="panel-title">';
			html += '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse_'+data[i].id+'" aria-expanded="true" aria-controls="collapseOne">'+data[i].theme+'</a>';
			html += '<a data-id="'+data[i].id+'" href="#" class="pull-right label label-primary choose" style="margin-left: 5px; font-weight: normal;">Выбрать</a><a data-id="'+data[i].id+'" href="#" class="pull-right label label-danger delete" style="margin-left: 5px; font-weight: normal;">Удалить</a></h4></div>'
			html += '<div id="collapse_'+data[i].id+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading_'+data[i].id+'">';
			html += '<div class="panel-body">'+data[i].content+'</div></div></div>';

			$("#accordion").append(html);
		}

		this.modelEvents();
	},

	modelEvents : function(){
		var o = this;

		$("#accordion .choose").unbind("click").on('click', function(e){
			e.preventDefault();

			var theme = $(this).parents(".panel").find("h4").find("a[data-toggle]").html();
			var content = $(this).parents(".panel").find(".panel-body").html();

			$("#mail_theme").val(theme);
			CKEDITOR.instances["compose-textarea"].setData(content);
		});

		$("#accordion .delete").unbind("click").on('click', function(e){
			e.preventDefault();
			var id = $(this).attr("data-id");

			$.ajax({
				type: "POST",
				data: {
					action: "delete_template",
					id : id
				},
				success: function(json){
					try{
						var data = JSON.parse(json);
						if (!data.error) {
							o.getModal();
						}
					} catch(e){
						o.showMessage("Ошибка обработки данных.", "Ошибка", "error");
					}
				},
				error: function(){
					o.showMessage("Ошибка обработки данных.", "Ошибка", "error");
				}
			});
		});
	},

	onTemplateSave : function(){
		var o = this;

		$("#saveTemplate").on("click", function(e){
			e.preventDefault();

			var theme = $("#mail_theme").val();
			if (typeof theme == "undefined" ||
				theme == "") {
				o.showMessage("Невозможно сохранить. Заполните тему письма.", "Ошибка", "error");
				return;
			}

			var content = CKEDITOR.instances["compose-textarea"].getData();
			if (typeof content == "undefined" ||
				content == "") {
				o.showMessage("Невозможно сохранить. Заполните текст письма.", "Ошибка", "error");
				return;
			}

			$.ajax({
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
				error: function(){
					o.showMessage("Ошибка обработки данных.", "Ошибка", "error");
				}
			});
		});
	},

	onSend : function(){
		var o = this;

		$("#send").on("click", function(e){
			e.preventDefault();

			if (o.sending) {
				o.showMessage("Новая отправка невозможна. Дождитесь завершения предыдущей отправки.","Ошибка", "warning");
				return;
			} else {
				o.sending = true;
			}

			var emails = [];
			$("#emails_table tbody input:checked").each(function(n, el){
				emails.push($($(el).parents("tr").find("td")[1]).html());
			});
			emails = emails.concat($("#cc_mailing").tagEditor('getTags')[0].tags);

			var theme = $("#mail_theme").val();
			if (typeof theme == "undefined" ||
				theme == "") {
				o.sending = false;
				o.showMessage("Невозможно отправить. Заполните тему письма.", "Ошибка", "error");
				return;
			}

			var content = CKEDITOR.instances["compose-textarea"].getData();
			if (typeof content == "undefined" ||
				content == "") {
				o.sending = false;
				o.showMessage("Невозможно отправить. Заполните текст письма.", "Ошибка", "error");
				return;
			}

			$.ajax({
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

	onCheckEmails : function(){
		$("#checkEmails").on("ifToggled", function(e){
			if ($(this).is(":checked")) {
				$("#emails_table tbody input[type='checkbox']").iCheck('check');
			} else {
				$("#emails_table tbody input[type='checkbox']").iCheck('uncheck');
			}
		});
	}
}