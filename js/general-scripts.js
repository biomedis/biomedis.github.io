
var main = {
    initialize:
        function(){
            new WOW().init();
            $(".dropdown-toggle-js").dropdown();
            $(".dropdown-toggle").dropdown();

            $("a.fancyimage").fancybox();

            $(".scrollup").unbind().click(function(e){
                $('html, body').animate({scrollTop:0},1000);
            });
            $(window).scroll(function() {

                if ($(this).scrollTop()>200) $('.scrollup').fadeIn();
                else $('.scrollup').fadeOut();

            });
            this.registration.initSections();
            this.registration.sectionsListeners.initNameListener();
            this.registration.sectionsListeners.initLoginListener();
            this.registration.sectionsListeners.initEmailListener();
            this.registration.sectionsListeners.initPasswordListener();

            $(".messages-block").scrollTop($(".messages-block > div").height());

        },
    registration: {
        sections: {
            sectionName: "",
            sectionLogin: "",
            sectionEmail: "",
            sectionPassword: "",
            sectionFinish: ""
        },

        initSections: function(){
            this.sections.sectionName = $(".registration-form > section:nth-child(1)");
            this.sections.sectionLogin = $(".registration-form > section:nth-child(2)");
            this.sections.sectionEmail = $(".registration-form > section:nth-child(3)");
            this.sections.sectionPassword = $(".registration-form > section:nth-child(4)");
            this.sections.sectionFinish = $(".registration-form > section:nth-child(5)");
        },

        sectionsListeners: {
            initNameListener: function(){
                var names = $("[name = firstName], [name = lastName]");
                var firstName = $("[name = firstName]");
                var lastName = $("[name = lastName]");
                var nextButton = $("section:nth-child(1) > div.form-inline > button.next-button");
                names.keyup(function(){
                    if(firstName.val()!="" && lastName.val()!=""){
                        nextButton.removeAttr("disabled");
                    } else {
                        nextButton.attr("disabled", "disabled");
                    }
                });
                nextButton.click(function(){
                    nextButton.attr("disabled", "disabled");
                    $("section:nth-child(1) > div.message").append("Приятно познакомиться, <b>" + firstName.val() + " " + lastName.val() + "</b>").slideDown(600);
                    setTimeout('main.registration.showSection(main.registration.sections.sectionLogin)', 1400);
                })
            },

            initLoginListener: function(){
                var login = $("[name = login]");
                var message = $("section:nth-child(2) > div.message");
                var nextButton = $("section:nth-child(2) > div.form-inline > button.next-button");

                login.keyup(function(){
                    if(login.val()==""){
                        nextButton.attr("disabled", "disabled");
                        return;
                    }
                    if(main.registration.verifications.isLoginExist(login.val())){
                        nextButton.attr("disabled", "disabled");
                        main.registration.showBorderStatus.showError(login);

                        message.hide();
                        message.empty();
                        message.append("Ой, кажется, у кого-то уже есть такой логин! Надо придумать другой...").slideDown(600);;
                    } else {
                        message.hide();
                        message.empty();
                        main.registration.showBorderStatus.showSuccess(login);

                        nextButton.removeAttr("disabled");
                    }

                    nextButton.click(function(){
                        nextButton.attr("disabled", "disabled");
                        message.hide().empty();
                        message.append("Вы придумали отличный логин!").slideDown(600);
                        setTimeout('main.registration.showSection(main.registration.sections.sectionEmail)', 1400);

                    })
                })
            },

            initEmailListener: function(){
                var email = $("[name = email]");
                var nextButton = $("section:nth-child(3) > div.form-inline > button.next-button");

                function validateEmail(email) {
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(email);
                }

                email.keyup(function(){
                    if(email.val()!="" && validateEmail(email.val())){
                        nextButton.removeAttr("disabled");
                        main.registration.showBorderStatus.showSuccess(email);
                    } else {
                        nextButton.attr("disabled", "disabled");
                        main.registration.showBorderStatus.showError(email);

                    }
                });
                nextButton.click(function(){
                    nextButton.attr("disabled", "disabled");
                    main.registration.showSection(main.registration.sections.sectionPassword);
                })
            },

            initPasswordListener: function(){
                var password = $("[name = password]");
                var passwordCheck = $("[name = passwordCheck]");
                var message = $("section:nth-child(4) > div.message");
                var nextButton = $("section:nth-child(4) > div.form-inline > button.next-button");

                function passwordValidate(){
                    if(password.val().length<6){
                        main.registration.showBorderStatus.showError(password);
                        passwordCheck.attr("disabled", "disabled");
                        return;
                    } else {
                        main.registration.showBorderStatus.showSuccess(password);
                        passwordCheck.removeAttr("disabled");
                    }
                }

                function passwordCheckValidate(){
                    if(passwordCheck.val() == password.val()){
                        main.registration.showBorderStatus.showSuccess(passwordCheck);
                        nextButton.removeAttr("disabled");
                    } else {
                        main.registration.showBorderStatus.showError(passwordCheck);
                        nextButton.attr("disabled", "disabled");
                        return;
                    }
                }

                password.keyup(function(){
                    passwordValidate();
                });

                passwordCheck.keyup(function(){
                    passwordCheckValidate();
                });

                nextButton.click(function(){
                    nextButton.attr("disabled", "disabled");
                    main.registration.showSection(main.registration.sections.sectionFinish);
                });
            }
        },

        showBorderStatus: {
              showSuccess: function(item){
                  if(item.hasClass("error")){
                      item.removeClass("error");
                  }
                  if(!item.hasClass("success")){
                      item.addClass("success");
                  }
              },

            showError: function(item){
                if(item.hasClass("success")){
                    item.removeClass("success");
                }
                if(!item.hasClass("error")){
                    item.addClass("error");
                }
            },
        },

        showSection: function(section){
                if(section.hasClass("invisible")){
                    section.hide();
                    section.removeClass("invisible");
                    section.slideDown(1600);
                } else {
                    /* добавить фигню для проверки открытия блока и перевижения фокуса */
                    return;
                }
        },

        verifications: {
            /**
             * Заглушка под проверку логина
             * @param login
             * @returns {boolean}
             */
            isLoginExist: function(login){
                if(login=="exist"){
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
}


$(document).ready(function(){
    main.initialize();
});

$(document).load(function(){

});