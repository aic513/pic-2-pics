jQuery(document).ready(function ($) {


    /*------------------------------------------------------------------
		Global Variables
	------------------------------------------------------------------*/

    var contactFormVars = {
        "contact_form_required_fields_label_ajax": "This is a required field.",
        "contact_form_warning": "Please verify fields and try again.",
        "contact_form_email_warning": "Please enter a valid e-mail address and try again.",
        "contact_form_error": "There was an error sending your email. Please try again later.",
        "contact_form_success_message": "Thanks, your message has been sent."
    };
    var submitStatus = false;


    /*------------------------------------------------------------------
		Validating
	------------------------------------------------------------------*/

    $('.ss-contact-form input[type="text"], .ss-contact-form input[type="email"], .ss-contact-form textarea').each(function () {
        $(this).val('');
    });

    $('.ss-contact-form').submit(function () {
        submitStatus = false;
        $('.ss-contact-form input, .ss-contact-form textarea').each(function () {
            $(this).removeClass('contactform-not-valid');
        });
        $('.ss-contact-form .submit').attr("disabled", "disabled");
        $(".ajax-loader").css("visibility", "visible");
        var isError = false;
        $('.ss-contact-form input, .ss-contact-form textarea').each(function () {
            if ($(this).attr('aria-required') && ($.trim($(this).val()) == $(this).attr('placeholder') || $.trim($(this).val()) == '')) {
                //Add border
                $(this).addClass('contactform-not-valid');
                //Message
                $('.ss-contact-form-response-output').css("display", "block");
                $('.ss-contact-form-response-output').html(contactFormVars.contact_form_error).removeClass('contactform-mail-sent-ng, contactform-mail-sent-ok');
                $('.ss-contact-form-response-output').html(contactFormVars.contact_form_warning).addClass('contactform-validation-errors');
                isError = true;
            }
            if ($(this).attr('type') == 'email') {
                var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if (reg.test($(this).val()) == false) {
                    $(this).addClass('contactform-not-valid');
                    if (!isError) {
                        $('.ss-contact-form-response-output').css("display", "block");
                        $('.ss-contact-form-response-output').html(contactFormVars.contact_form_error).removeClass('contactform-mail-sent-ng, contactform-mail-sent-ok');
                        $('.ss-contact-form-response-output').html(contactFormVars.contact_form_email_warning).addClass('contactform-validation-errors');
                    }
                    isError = true;
                }
            }
        });

        if (isError) {
            $('.ss-contact-form .submit').removeAttr("disabled");
            $(".ajax-loader").css("visibility", "hidden");
            return false;
        } else {
            var name = $('#contact-name').val(),
                email = $('#contact-email').val(),
                url = $('#contact-url').val(),
                message = $('#contact-message').val();
            $.ajaxSetup({
                cache: false
            });
            var dataString = 'contact-name=' + name + '&contact-email=' + email + '&contact-url=' + url + '&contact-message=' + message + '&submitted=true&isAjax=1';
            $.ajax({
                type: "POST",
                url: $('.ss-contact-form').attr('action'),
                data: dataString,
                success: function (msg) {
                    $('.ajax-loader').css({ visibility: 'hidden' });
                    // Check to see if the mail was successfully sent
                    $('.ss-contact-form-response-output').css("display", "block");
                    if (msg == 'Mail sent') {
                        // Update the progress bar
                        $('.ss-contact-form-response-output').html(contactFormVars.contact_form_error).removeClass('contactform-mail-sent-ng, contactform-validation-errors');
                        $('.ss-contact-form-response-output').html(contactFormVars.contact_form_success_message).addClass('contactform-mail-sent-ok');
                        // Reset the subject field and message textbox
                        $('.ss-contact-form input[type="text"], .ss-contact-form input[type="email"], .ss-contact-form textarea').each(function () {
                                $(this).val('');
                        });
                    } else {
                        $('.ss-contact-form-response-output').html(contactFormVars.contact_form_error).removeClass('contactform-mail-sent-ok, contactform-validation-errors');
                        $('.ss-contact-form-response-output').html(contactFormVars.contact_form_error).addClass('contactform-mail-sent-ng');
                        $('.ss-contact-form .submit').removeAttr("disabled");
                    }
                    // Activate the submit button
                    $('.ss-contact-form .submit').removeAttr("disabled");
                    submitStatus = true;
                },
                error: function (ob, errStr) {
                    $('.ss-contact-form-response-output').css("display", "block");
                    $('.ss-contact-form-response-output').html(contactFormVars.contact_form_error).removeClass('contactform-mail-sent-ok, contactform-validation-errors');
                    $('.ss-contact-form-response-output').html(contactFormVars.contact_form_error).addClass('contactform-mail-sent-ng');
                    //Activate the submit button
                    $('.ss-contact-form .submit').removeAttr("disabled");
                }

            });
            $(".ajax-loader").css("visibility", "hidden");
            return false;
        }
    }); 
});

