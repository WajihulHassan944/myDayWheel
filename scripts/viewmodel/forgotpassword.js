/**
 Project Name: My Day wheel
 Version: 1.0
 module: Forgot Password
 Author: EquatorTechnologies
 */
$(function() {

    $('#forgotPass').click(function() {
        var registeredMail = $('#forgot-email').val();

        if (registeredMail != '') {

            var mailValidation = validateEmail(registeredMail);
            if (mailValidation == true) {
                $('.cd-user-modal1').removeClass('is-visible');
                // loader
                $(".spinner").show();
                $("#loader-wrapper").show();
                var url = "forgetPassword/" + registeredMail;
                service.getDataService(url, function(data) {
                    if (data.data[0].Status == "true") {
                        localStorage.setItem('reset_email', registeredMail);
                        $('#ResetModal').addClass('is-visible');
                        // loader
                        $(".spinner").hide();
                        $("#loader-wrapper").hide();
                    } else if (data.data[0].Status == "false") {
                        toastr.warning('User Email Not Found');
                    } else if (data.data[0].Status === "Invalid User") {
                        toastr.error('Your Not Authorized to Access these Details');
                    } else if (data.data[0].Status === "Error") {
                        toastr.error('Database Error');
                    } else {
                        toastr.warning('Invalid email Id');
                    }
                    // loader
                    $(".spinner").hide();
                    $("#loader-wrapper").hide();
                });

            } else {
                toastr.warning('Please enter valid email id');
            }
        } else {
            toastr.warning('Please enter email id');
        }

    });

    $("#ResetModal-ok").click(function() {
        $('#ResetModal').removeClass('is-visible');
        window.location.href = 'passwordreset.php';
    });


    $('#passwordReset').click(function() {
        var email = $('#forgot-email').val();
        var accessCode = $('#forgot_access_code').val();
        var password = $('#forgot_new_password').val();
        var confirmPassword = $('#forgot_confirm_password').val();

        var validationStatus = validateUserDetails(email, accessCode, password, confirmPassword);

        if (validationStatus == "success") {
            // loader
            $(".spinner").show();
            $("#loader-wrapper").show();
            var registeredMail = email;
            var data = {
                "email": registeredMail,
                "access_code": accessCode,
                "password": password
            }
            data = JSON.stringify(data);
            service.operationDataService('resetPassword', data, function(data) {
                if (data.data[0].Status == "true") {
                    localStorage.removeItem('reset_email');
                    toastr.success('Password Reset Successfully');
                    var delay = 1000; //Your delay in milliseconds
                    setTimeout(function() {
                        window.location.href = 'index.php';
                        $(".spinner").hide();
                        $("#loader-wrapper").hide();
                    }, delay);
                } else if (data.data[0].Status == "Invalid Access Code") {
                    toastr.error('Invalid Access Code');
                } else if (data.data[0].Status === "false") {
                    toastr.warning('Unable to Process your Request ');
                } else if (data.data[0].Status === "Invalid User") {
                    toastr.error('Your Not Authorized to Access these Details');
                } else if (data.data[0].Status === "Error") {
                    toastr.error('Database Error');
                } else {
                    toastr.error('Unable to reset your password');
                }
                // loader
                $(".spinner").hide();
                $("#loader-wrapper").hide();

            });

        }

    });



    /*user details validation for password reset*/
    function validateUserDetails(email, accessCode, password, confirmPassword) {

        if (email != '') {

            var mailValidation = validateEmail(email);
            if (mailValidation == true) {

                if (accessCode != '') {

                    if (password != '') {

                        if (confirmPassword != '') {

                            if (password == confirmPassword) {

                                return "success";

                            } else {
                                toastr.warning('New Password and Confirm Password dose not match');
                            }
                        } else {
                            toastr.warning('Please enter confirm password');
                            $("#confirm_password").focus();
                        }
                    } else {
                        toastr.warning('Please enter password');
                        $("#new_password").focus();
                    }
                } else {
                    toastr.warning('Please enter access code');
                    $('#access_code').focus();

                }
            } else {
                toastr.warning('Please enter valid email');
                $('#email').focus();
            }
        } else {
            toastr.warning('Please enter email');
            $('#email').focus();
        }
    }

    /*e-mail validation function*/
    function validateEmail(email) {

        var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return emailRegex.test(email);

    }


});