var Common = {
	init : function(){
		this.loginStatus();
	},

	loginStatus : function(){
		var o = this;
		o.checkExistingData();

		setInterval(function(){
			$.ajax({
				url: "/admin/checkStatus",
				type: "POST",
				success: function(data){
					switch(data){
						// Everything is all right
						case "User is logged in": break;

						// Needs to be rerouted to login page
						case "Wrong token":
						case "Token expired":
						case "Different IP":
						case "Wrong link between user and token":
						case "Users IP is not in white list":
						case "Users IP is in black list":
						case 'Error in settings. IPList must be "white" or "black"':
							o.reroute("login");
							break;

						// Needs to be rerouted to lockscreen page
						case "Token lockDelay expired":
						default:
							o.saveData();
							o.reroute("lockscreen");
							break;
					}
				}
			});
		}, 1000);
	},

	checkExistingData : function(){
		var dataJSON = $.cookie("cache");
		if(dataJSON !== undefined){
			var data = JSON.parse(dataJSON);
			
			if(typeof(data) == "object"){

				$("form").each(function(n, el){
					$(el).attr("data-restore", n);
				});

				var cke = [];
				
				for (var i = 0; i < data.length; i++) {
					if( typeof(data[i].type) !== undefined &&
						typeof(data[i].name) !== undefined &&
						typeof(data[i].value) !== undefined){
						
						switch(data[i].type){
							case "input":
								$("form[data-restore='"+data[i].form+"'] input[name='"+data[i].name+"']").val(data[i].value);
								break;
							case "select":
								$("form[data-restore='"+data[i].form+"'] select[name='"+data[i].name+"'] option[value='"+data[i].value+"']").attr("selected", "selected");
								break;
							case "textarea":
								$("form[data-restore='"+data[i].form+"'] textarea[name='"+data[i].name+"']").val(data[i].value);
								break;
							case "cke":
								cke.push(data[i]);
								break;
						}
					}
				}

				if (typeof CKEDITOR != "undefined") {
					setTimeout(function(){
						$.each(CKEDITOR.instances, function(n, el){
							for (var i = 0; i < cke.length; i++) {
								if (el.name == cke[i].name) {
									el.setData(cke[i].value);
								}
							}
						});
					}, 2000);
				}
			}

			$.removeCookie("cache");

			$.removeCookie("referer");
		}
	},

	saveData : function(){
		var data = [];

		$("form").each(function(n, el){
			$(el).attr("data-restore", n);
		});

		$("input[type='text'], input[type='password'], input[type='email']").each(function(n, el){
			var curr = {
				name: $(el).attr("name"),
				value: $(el).val(),
				type: "input",
				form: $(el).parents("form").attr("data-restore")
			}
			data.push(curr);
		});

		$("select option:selected").each(function(n, el){
			var curr = {
				name: $(el).parents("select").attr("name"),
				value: $(el).val(),
				type: "submit",
				form: $(el).parents("form").attr("data-restore")
			}
			data.push(curr);
		});

		$("textarea").each(function(n, el){
			var curr = {
				name: $(el).attr("name"),
				value: $(el).val(),
				type: "textarea",
				form: $(el).parents("form").attr("data-restore")
			}
			data.push(curr);
		});

		if (typeof CKEDITOR != "undefined") {
			$.each(CKEDITOR.instances, function(n, el){
				var curr = {
					name: el.name,
					value: el.getData(),
					type: "cke"
				}
				data.push(curr);
			});
		}

		$.cookie("referer", location.pathname, {
			expires: 0.014, // 10min
			path: "/"
		});

		$.cookie("cache", JSON.stringify(data), {
			expires: 0.014, // 10min
			path: location.href
		});
	},

	reroute : function(scope){
		switch(scope){
			case "login":
				location.assign("/admin/");
				break;
			case "lockscreen":
				location.assign("/admin/lockscreen");
				break;
		}
	}
}



$(document).ready(function(){
	Common.init();
});