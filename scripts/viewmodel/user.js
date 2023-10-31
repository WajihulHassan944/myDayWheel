/**
 Project Name: My Day wheel
 Version: 1.0
 module: User Login and Signup and Account Verification
 Author: EquatorTechnologies
 */
$(function() {

    checkForStorage();

    $("body").bind('keypress', function(e) {
        var code = e.keyCode || e.which;
        if (code == 13) { //Enter keycode
            login();
        }
    });
    /*user login function*/
    $('#login').click(function() {
        login();
    });
    $('.op').click(function() {
        $('#signup-email').val('');
        $('#password').val('');
    });

    function login() {
        var username = $("#username").val();
        var password = $("#lpassword").val();

        if (username != '') {

            var mailValidation = validateEmail(username);

            if (mailValidation == true) {

                if (password != '') {

                    var data = {
                        "username": username,
                        "password": password
                    }
                    var data = JSON.stringify(data);
                    $.support.cors = true;
                    // loader
                    $(".spinner").show();
                    $("#loader-wrapper").show();
                    service.operationDataService('login', data, function(data) {
                        if (data.data[0].Status === "true") {
                            toastr.success('Login Success');
                            localStorage.setItem("token", data.data[0].token);
                            localStorage.setItem("User_id", data.data[0].User_id);
                            var token = localStorage.getItem("token");
                            var delay = 1000; //Your delay in milliseconds
                            setTimeout(function() {
                                window.location.href = 'dashboard.php';
                                $(".spinner").hide();
                                $("#loader-wrapper").hide();
                            }, delay);
                        } else if (data.data[0].Status === "false") {
                            toastr.error('Incorrect Username (or) Password');
                        } else if (data.data[0].Status === "Error") {
                            toastr.error('Database Error');
                        } else if (data.data[0].Status == "Not Verified") {
                            toastr.warning('Please verify your account before login. Verification Link Sent to your Email')
                            /*var delay = 1000; //Your delay in milliseconds
                            setTimeout(function(){ window.location.href =  'accountverification.php'; }, delay);*/
                        } else {
                            toastr.error('Unable to Process Your Request');
                            $("#username").focus();
                        }
                        // loader
                        $(".spinner").hide();
                        $("#loader-wrapper").hide();
                    });
                } else {
                    toastr.warning('Please Enter Your Password');
                }
            } else {
                toastr.warning('Please enter valid email id');
            }
        } else {
            toastr.warning('Please Enter Your Login Email');
        }
    }

    getCountries();
    /*Function to get countries*/
    function getCountries() {
        service.getDataService('getCountries', function(data) {
            var itemLength = data.data[0].countries.length;
            for (var i = 0; i < itemLength; i++) {
                $('#Country').append($('<option>', {
                    value: data.data[0].countries[i].countries_name,
                    text: data.data[0].countries[i].countries_name
                }));
            }

        });
    }

    /*new user sign-up function*/
    $('#signup').click(function() {
        var email = $('#signup-email').val();
        var firstName = $('#firstname').val();
        var lastName = $('#lastname').val();
        var passWord = $('#password').val();
        var zipCode = $('#zipcode').val();
        var gender = $(".gender-input input[type='radio']:checked").val();
        var ageRange = $('#Age :selected').val();
        var country = $('#Country :selected').val();
        var term = $('#accept-terms').is(':checked');
        var validationStatus = signUpValidation(firstName, lastName, passWord, email, ageRange, country, term);
        if (validationStatus == 'valid') {
            $('.cd-user-modal1').removeClass('is-visible');

            var data = {
                "email": email,
                "firstname": firstName,
                "lastname": lastName,
                "password": passWord,
                "zipcode": zipCode,
                "gender": gender,
                "agerange": ageRange,
                "country": country
            }
            data = JSON.stringify(data);
            console.log(data);
            // loader
            $(".spinner").show();
            $("#loader-wrapper").show();
            console.log(1);

            service.operationDataService('userRegister', data, function(data) {
                console.log(data.data[0].Status);
                console.log(2);
                if (data.data[0].Status == true) {

                    console.log(3);
                    $('#alertModal').addClass('is-visible');
                } else if (data.data[0].Status == false) {

                    console.log(4);
                    toastr.error('Unable to Register Your Account');
                } else if (data.data[0].Status === "Error") {

                    console.log(5);
                    toastr.error('Database Error');
                } else {

                    console.log(6);
                    toastr.error('Unable to Process Your Request');
                }

                console.log(7);
                $(".spinner").hide();
                $("#loader-wrapper").hide();
            });
        }

    });

    $("#ok").click(function() {
        $('#alertModal').removeClass('is-visible');
        // window.location.href = 'accountverification.php';
    });




    /*existing user check function*/
    $("#signup-email").focusout(function() {
        toastr.options.positionClass = "toast-bottom-left";
        toastr.options.timeout = 500;
        var emailId = $('#signup-email').val();
        if (emailId != '') {

            var mailValidation = validateEmail(emailId);
            if (mailValidation == true) {

                var url = "checkUserEmailExist/" + emailId;
                service.getDataService(url, function(data) {
                    if (data.data[0].Status === "true") {
                        $("#firstname").removeAttr("disabled");
                        $("#lastname").removeAttr("disabled");
                        $("#password").removeAttr("disabled");
                        $("#zipcode").removeAttr("disabled");
                        $("input[type=radio]").attr("disabled", false);
                        $("#Age").removeAttr("disabled");
                        $("#Country").removeAttr("disabled");
                        $("#signup").removeAttr("disabled");
                        $("#password").focus();
                    } else if (data.data[0].Status === "false") {
                        $("#firstname").attr("disabled", "disabled");
                        $("#lastname").attr("disabled", "disabled");
                        $("#password").attr("disabled", "disabled");
                        $("#zipcode").attr("disabled", "disabled");
                        $("input[type=radio]").attr("disabled", true);
                        $("#Age").attr("disabled", "disabled");
                        $("#Country").attr("disabled", "disabled");
                        $("#signup").attr("disabled", "disabled");
                        toastr.error('User Already Exist');
                        $('#signup-email').focus();
                    } else if (data.data[0].Status === "Error") {
                        toastr.error('Database Error');
                    } else {
                        $("#firstname").attr("disabled", "disabled");
                        $("#lastname").attr("disabled", "disabled");
                        $("#password").attr("disabled", "disabled");
                        $("#zipcode").attr("disabled", "disabled");
                        $("input[type=radio]").attr("disabled", true);
                        $("#Age").attr("disabled", "disabled");
                        $("#Country").attr("disabled", "disabled");
                        $("#signup").attr("disabled", "disabled");
                        toastr.error('Unable to Process Your Request');
                        $('#signup-email').focus();
                    }
                });
            } else {
                toastr.warning('Please enter valid email id');
                $("#signup-email").focus();
            }
        } else {
            toastr.warning('Please enter email');
            $('#signup-email').focus();
        }

    });

    $('#modal-ok').click(function() {
        window.location.href = 'index.html';
    });

    /*zip code validation function*/
    function validateZip(code) {
        var zipRegex = /^\d{6}$/;
        return zipRegex.test(code);
    }

    /*sign-up module validation*/
    function signUpValidation(firstname, lastname, password, email, ageRange, country, term) {
        toastr.options.positionClass = "toast-bottom-left";
        toastr.options.timeout = 500;
        if (email != '') {

            if (password != '') {

                if (firstname != '') {

                    if (lastname != '') {
                        if (ageRange != '') {

                            if (country != '') {

                                if (term == true) {

                                    return 'valid';

                                } else {
                                    toastr.warning('Please accept terms and conditions');
                                }

                            } else {
                                toastr.warning('Please select country');
                            }
                        } else {
                            toastr.warning('Please select age range');
                        }
                    } else {
                        toastr.warning('Please enter last name');
                    }
                } else {
                    toastr.warning('Please enter first name');

                }
            } else {
                toastr.warning('Please enter password');
            }

        } else {
            toastr.warning('Please enter email id');
        }
    }

    $('#account_verification').click(function() {

        var email = $('#verification_mail').val();
        var accessCode = $('#access_code').val();

        var validationStatus = validateVerificationDetails(email, accessCode);

        if (validationStatus == "success") {

            var data = {
                "email": email,
                "access_code": accessCode
            }
            data = JSON.stringify(data);
            // loader
            $(".spinner").show();
            $("#loader-wrapper").show();
            service.operationDataService('accountVerification', data, function(data) {
                if (data.data[0].Status == "true") {
                    // loader
                    $(".spinner").hide();
                    $("#loader-wrapper").hide();
                    toastr.options.positionClass = "toast-bottom-left";
                    toastr.options.timeout = 1000;
                    toastr.success('Your account verified successfully');

                    var delay = 1000; //Your delay in milliseconds
                    setTimeout(function() {
                        window.location.href = 'index.php';
                    }, delay);
                } else if (data.data[0].Status === "Invalid Access Code") {
                    // loader
                    $(".spinner").hide();
                    $("#loader-wrapper").hide();
                    toastr.options.positionClass = "toast-bottom-left";
                    toastr.options.timeout = 1000;
                    toastr.error('Invalid Access Code');
                } else if (data.data[0].Status === "Already Verified") {
                    // loader
                    $(".spinner").hide();
                    $("#loader-wrapper").hide();
                    toastr.options.positionClass = "toast-bottom-left";
                    toastr.options.timeout = 1000;
                    toastr.error('Account Already Verified');
                } else if (data.data[0].Status === "Invalid Email Id") {
                    // loader
                    $(".spinner").hide();
                    $("#loader-wrapper").hide();
                    toastr.options.positionClass = "toast-bottom-left";
                    toastr.options.timeout = 1000;
                    toastr.error('Invalid Email Id');
                } else if (data.data[0].Status === "Error") {
                    toastr.error('Database Error');
                } else {
                    toastr.options.positionClass = "toast-bottom-left";
                    toastr.options.timeout = 1000;
                    toastr.error('Unable to Process Your Request');
                }
                // loader
                $(".spinner").hide();
                $("#loader-wrapper").hide();
            });
        }
    });

    function validateVerificationDetails(email, accessCode) {

        if (email != '') {

            var mailStatus = validateEmail(email);
            if (mailStatus == true) {

                if (accessCode != '') {
                    return "success";
                } else {
                    toastr.warning('Please enter access code');
                }

            } else {
                toastr.warning('Please enter valid email');
            }

        } else {
            toastr.warning('Please enter email');
        }
    }



    /* if user logged in hide login/signup link */
    function checkForStorage() {
        var userId = localStorage.getItem('User_id');

        if (userId == null) {
            $(".login-form").css('display', 'block');
            $(".main-form1").css('display', 'none');
        } else {
            $(".login-form").css('display', 'none');
            $('.main-form').removeClass('main-form').addClass('main-form1');
            $(".main-form1").css('display', 'block');
            $(".user").html(localStorage.getItem('full_name'));
            var namelength = $(".user").text();
            if (namelength.length > 15) {
                $(".user").text(namelength.substr(0, 14) + '...');
            }
        }
    }

    /*Function for feed back form*/
    $("#submit").on("click", function() {

        var name = $("#name").val();
        var email = $("#email").val();
        var phone = $("#telephone").val();
        var msg = $("#comments").val();

        var validationStatus = validateForm(name, email, msg);

        if (validationStatus == "valid") {

            var userid = localStorage.getItem('User_id');
            var token = localStorage.getItem('token');
            if (userid != null && token != null) {
                var data = {
                    "User_id": userid,
                    "token": token,
                    "name": name,
                    "email": email,
                    "phone_no": phone,
                    "message": msg
                }
                data = JSON.stringify(data);
                service.operationDataService('feedBack', data, function(data) {

                    if (data.data[0].Status == "true") {
                        toastr.success('FeedBack Successfully Added');
                    } else if (data.data[0].Status === "false") {
                        toastr.error('Unable to add your feedback');
                    } else if (data.data[0].Status === "Error") {
                        toastr.error('Database Error');
                    } else if (data.data[0].Status === "Invalid User") {
                        toastr.error('Your Not Authorized to Access these details');
                    } else {
                        toastr.error('Unable to Process Your Request');
                    }
                });
            } else {
                toastr.warning('Please Login to post your feedback');
            }

        }

    });

    /*Function for form validation*/

    function validateForm(name, email, msg) {

        if (name != '') {

            if (email != '') {

                var emailValidationStatus = validateEmail(email);

                if (emailValidationStatus == true) {

                    if (msg != '') {
                        return "valid";
                    } else {
                        toastr.warning('Please enter your message');
                    }
                } else {
                    toastr.warning('Please enter valid email');
                }

            } else {
                toastr.warning('Please enter your email');
            }

        } else {
            toastr.warning('Please Enter name');
        }

    }

    /*e-mail validation function*/
    function validateEmail(email) {

        var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return emailRegex.test(email);
    }
    // Toaster option
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-left",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
});