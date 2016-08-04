var jsonGet=

        /**
         *
         * @param ajaxUrl урл аякс обработчика
         * @param requestParams json объект с параметрами
         * @param successFunction функция которая сработает по окончаниии запроса . ей передается data
         * @param errorFunction вызывается в случае ошибки на стороне сервере.Получает объект data и msg сообщение об ошибки
         * @param ctx контекст вызова передастся в completeFunction в качестве this
         */
    function (ajaxUrl,requestParams,successFunction,errorFunction,ctx)
   {
        

           $.ajax(
                            {
                                    type:"POST",
                                    dataType: 'json',
                                    context:ctx,
                                    async:true,
                                    url:ajaxUrl,
                                    data:requestParams,
                                    success:function(data,status,xhr)
                                    {
                                        if(data!=null)
                                        {
                                            if("error" in data)
                                            {
                                                    if(data.error==false)successFunction(data.data);
                                                    else errorFunction(data,data.message);
                                            } else alert("JSON объект не соответствует протоколу обмена");
                                        }

                                    },
                                    error:function(jqxht,status,ex){
                                         hideOverlay();
                                         alert(status+" \n"+ex)
                                    }
                            });

   }

var jsonGetSync=

    /**
     *
     * @param ajaxUrl урл аякс обработчика
     * @param requestParams json объект с параметрами
     * @param successFunction функция которая сработает по окончаниии запроса . ей передается data
     * @param errorFunction вызывается в случае ошибки на стороне сервере.Получает объект data и msg сообщение об ошибки
     * @param ctx контекст вызова передастся в completeFunction в качестве this
     */
        function (ajaxUrl,requestParams,successFunction,errorFunction,ctx)
    {


            $.ajax(
                {
                        type:"POST",
                        dataType: 'json',
                        context:ctx,
                        async:false,
                        url:ajaxUrl,
                        data:requestParams,
                        success:function(data,status,xhr)
                        {
                            if(data!=null) {
                                if ("error" in data) {
                                    if (data.error == false)successFunction(data.data);
                                    else errorFunction(data, data.message);
                                } else alert("JSON объект не соответствует протоколу обмена");
                            }

                        },
                        error:function(jqxht,status,ex){
                            hideOverlay();
                                alert(status+" \n"+ex)
                        }
                });

    }










var CookieManager = {

//CookieManager.set('name', 'value'); // параметр days можно не указывать
//alert(CookieManager.get('name'));
//CookieManager.remove('name');


    set: function (name, value, days) {
         var expires = "";
          if (days) {
              var d = new Date();
              d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
              expires = "; expires=" + d.toGMTString();
          }
          document.cookie = name + "=" + value + expires + "; path=/";
          return this.get(name);
    },
    get: function (name) {
          name += "=";
          var b = document.cookie.split(';');
          for (var i = 0, c = b[i].replace(/(^\s+)|(\s+$)/g, ""); i < b.length; i++) {
              while (c.charAt(0) == ' ') 
                   c = c.substring(1, c.length);
              if (c.indexOf(name) == 0) 
                   return c.substring(name.length, c.length);
          }
          return null;
    },
    remove: function (name) {
          this.set(name, "", -1);
    }
};


var MD5 = function (string) {

        function RotateLeft(lValue, iShiftBits) {
                return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
        }

        function AddUnsigned(lX,lY) {
                var lX4,lY4,lX8,lY8,lResult;
                lX8 = (lX & 0x80000000);
                lY8 = (lY & 0x80000000);
                lX4 = (lX & 0x40000000);
                lY4 = (lY & 0x40000000);
                lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
                if (lX4 & lY4) {
                        return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                }
                if (lX4 | lY4) {
                        if (lResult & 0x40000000) {
                                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                        } else {
                                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                        }
                } else {
                        return (lResult ^ lX8 ^ lY8);
                }
        }

        function F(x,y,z) { return (x & y) | ((~x) & z); }
        function G(x,y,z) { return (x & z) | (y & (~z)); }
        function H(x,y,z) { return (x ^ y ^ z); }
        function I(x,y,z) { return (y ^ (x | (~z))); }

        function FF(a,b,c,d,x,s,ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
        };

        function GG(a,b,c,d,x,s,ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
        };

        function HH(a,b,c,d,x,s,ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
        };

        function II(a,b,c,d,x,s,ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
        };

        function ConvertToWordArray(string) {
                var lWordCount;
                var lMessageLength = string.length;
                var lNumberOfWords_temp1=lMessageLength + 8;
                var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
                var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
                var lWordArray=Array(lNumberOfWords-1);
                var lBytePosition = 0;
                var lByteCount = 0;
                while ( lByteCount < lMessageLength ) {
                        lWordCount = (lByteCount-(lByteCount % 4))/4;
                        lBytePosition = (lByteCount % 4)*8;
                        lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
                        lByteCount++;
                }
                lWordCount = (lByteCount-(lByteCount % 4))/4;
                lBytePosition = (lByteCount % 4)*8;
                lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
                lWordArray[lNumberOfWords-2] = lMessageLength<<3;
                lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
                return lWordArray;
        };

        function WordToHex(lValue) {
                var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
                for (lCount = 0;lCount<=3;lCount++) {
                        lByte = (lValue>>>(lCount*8)) & 255;
                        WordToHexValue_temp = "0" + lByte.toString(16);
                        WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
                }
                return WordToHexValue;
        };

        function Utf8Encode(string) {
                string = string.replace(/\r\n/g,"\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                        var c = string.charCodeAt(n);

                        if (c < 128) {
                                utftext += String.fromCharCode;
                        }
                        else if((c > 127) && (c < 2048)) {
                                utftext += String.fromCharCode((c >> 6) | 192);
                                utftext += String.fromCharCode((c & 63) | 128);
                        }
                        else {
                                utftext += String.fromCharCode((c >> 12) | 224);
                                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                                utftext += String.fromCharCode((c & 63) | 128);
                        }

                }

                return utftext;
        };

        var x=Array();
        var k,AA,BB,CC,DD,a,b,c,d;
        var S11=7, S12=12, S13=17, S14=22;
        var S21=5, S22=9 , S23=14, S24=20;
        var S31=4, S32=11, S33=16, S34=23;
        var S41=6, S42=10, S43=15, S44=21;

        string = Utf8Encode(string);

        x = ConvertToWordArray(string);

        a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

        for (k=0;k<x.length;k+=16) {
                AA=a; BB=b; CC=c; DD=d;
                a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
                d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
                c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
                b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
                a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
                d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
                c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
                b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
                a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
                d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
                c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
                b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
                a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
                d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
                c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
                b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
                a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
                d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
                c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
                b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
                a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
                d=GG(d,a,b,c,x[k+10],S22,0x2441453);
                c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
                b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
                a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
                d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
                c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
                b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
                a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
                d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
                c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
                b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
                a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
                d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
                c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
                b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
                a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
                d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
                c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
                b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
                a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
                d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
                c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
                b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
                a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
                d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
                c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
                b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
                a=II(a,b,c,d,x[k+0], S41,0xF4292244);
                d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
                c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
                b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
                a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
                d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
                c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
                b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
                a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
                d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
                c=II(c,d,a,b,x[k+6], S43,0xA3014314);
                b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
                a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
                d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
                c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
                b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
                a=AddUnsigned(a,AA);
                b=AddUnsigned(b,BB);
                c=AddUnsigned(c,CC);
                d=AddUnsigned(d,DD);
        }

        var temp = WordToHex(a)+WordToHex(b)+WordToHex+WordToHex(d);

        return temp.toLowerCase();
}




var DialogHelper=
{
        /**
         * @param title заголовок
         * Фунция очищает все кроме общей структуры с прошлого вызова
         *@param buttons json объект кнопок с обработчиками нажатия
         * в обработчике данные data будут доступны по названию переменной в function(data)
         * {
            "Сохранить":
            {
                "func":function(data){alert(data);},
                "data":"Привет"

             }
        }
         @param content_constuct  true или false если False то htmlContent просто строка иначе это объект json, определяющий форму

         {
           "Название элемента":
                {
                  "id":"id элемента, для поиска",
                  "name":"имя элемента, если мы отправим форму на сервер",
                  "value":"Значение",
                  "radioValue":"значение переключателя",
                  "label":"Текст пометки",
                  "placeholder":"placeholder",
                  "type":"Тип формы. text, mulltytext, checkbox, radio, select, password, email",
                  "help":"строка подсказки"
                  "options":[{"value":"value","name":"название пункта","selected":true},{"value":"value","name":"название пункта","selected":false},{"value":"value","name":"название пункта","selected":false}]

                }

         }


         * @param htmlContent html вставляется в <div class="container-fluid" id="dialogContent">
         *
         */
        open : function(title,htmlContent, buttons,content_constuct)
        {
                var dialog=$("#dialogBox");
                if(dialog.size()==0)
                {

                        var str=' <div id="dialogBox" class="modal fade">'+
                                '<div class="modal-dialog">'+
                    '<div class="modal-content">'+
                            '<!-- Заголовок модального окна -->'+
                    '<div class="modal-header">'+
                   ' <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>'+
                '<h4 class="modal-title">'+title+'</h4>'+
               ' </div>'+
                        '<!-- Основное содержимое модального окна -->'+
                '<div class="modal-body">'+
                   '<div class="container-fluid" id="dialogContent">'+
                            '<!-- Контейнер, в котором можно создавать классы системы сеток -->'+

                    '</div>'+
                    '</div>'+
                            '<!-- Футер модального окна -->'+
                    '<div class="modal-footer" id="dialogButtonsArea">'+
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Закрыть</button>'+
                '</div> </div>  </div> </div>';
                        $("body").prepend(str);
                        dialog=$("#dialogBox");


                }
                if(content_constuct ==false)  dialog.find("#dialogContent").empty().html(htmlContent);
                else
                {
                        var content = dialog.find("#dialogContent");

                        var  start= '<div class="form-group">';
                        var end='</div>';
                        var str="";
                        for(var itm in htmlContent)
                        {


                                if(htmlContent[itm].type=="checkbox")start='<div class="checkbox">';
                                else  if(htmlContent[itm].type=="radio") start='<div class="radio">';
                                else start= '<div class="form-group">';

                                str+= start;
                              if(htmlContent[itm].type=="checkbox" ||  htmlContent[itm].type=="radio") str+=""; else   str+= '<label for="'+htmlContent[itm].id+'">'+htmlContent[itm].label+'</label>';
                                switch (htmlContent[itm].type)
                                {
                                        case 'text':
                                            str+= '<input type="text" class="form-control"  name="'+htmlContent[itm].name+'" id="'+htmlContent[itm].id+'" placeholder="'+htmlContent[itm].placeholder+'" value="'+htmlContent[itm].value+'">'
                                        break;
                                        case 'mulltytext':
                                                str+= '<textarea rows="3"  name="'+htmlContent[itm].name+'" class="form-control" id="'+htmlContent[itm].id+'" placeholder="'+htmlContent[itm].placeholder+'">'+htmlContent[itm].value+'</textarea>'
                                                break;
                                        case 'checkbox':
                                            str+='<label> <input type="checkbox" id="'+htmlContent[itm].id+'" name="'+htmlContent[itm].name+'"';
                                                if(htmlContent[itm].value===true) str+=' checked="checked" ';
                                                str+=' />'+htmlContent[itm].label+'</label>';
                                                break;
                                        case 'radio':
                                                str+='<label> <input type="radio" id="'+htmlContent[itm].id+'" name="'+htmlContent[itm].name+'"';
                                                if(htmlContent[itm].value===true) str+=' checked="checked" ';
                                                str+='  value="'+htmlContent[itm].radioValue+'" />'+htmlContent[itm].label+'</label>';
                                                break;
                                        case 'select':
                                            str+='<select class="form-control" id="'+htmlContent[itm].id+'"   name="'+htmlContent[itm].name+'"  >';
                                                for(var option in htmlContent[itm].options)
                                                {
                                                        str+='<option value = "'+htmlContent[itm].options[option].value+'"';
                                                        if(htmlContent[itm].options[option].selected==true) str+=' selected="selected" ';
                                                        str+=' >'+htmlContent[itm].options[option].name+'</option>'
                                              }
                                            str+="</select>";
                                                break;
                                        case 'password':
                                                str+= '<input type="password" class="form-control"  name="'+htmlContent[itm].name+'" id="'+htmlContent[itm].id+'" placeholder="'+htmlContent[itm].placeholder+'" value="'+htmlContent[itm].value+'">'
                                                break;
                                        case 'email':
                                                str+= '<input type="email" class="form-control"   name="'+htmlContent[itm].name+'" id="'+htmlContent[itm].id+'" placeholder="'+htmlContent[itm].placeholder+'" value="'+htmlContent[itm].value+'">'
                                                break;
                                }
                               if(htmlContent[itm].help!="") str+='<p class="help-block">'+htmlContent[itm].help+'</p>';


                               str+= end;


                        }
                        //создадим форму


                        content.empty().html('<form  role="form"><div class="form-group">'+str+'</div></form>');



                }

               var buttonsArea =dialog.find("#dialogButtonsArea");

                if( buttonsArea.find("button[id*=dialogBtn_]").size()!=0) buttonsArea.find("button[id*=dialogBtn_]").unbind().remove();
                var cnt=0;
                for(var name in buttons)
                {

                        buttonsArea.prepend('<button type="button" class="btn btn-primary" id="dialogBtn_'+cnt+'">'+name+'</button>');
                        buttonsArea.find("button[id*='dialogBtn_']").unbind().click(function(){buttons[name].func(buttons[name].data);});

                }




                dialog.modal('handleUpdate');
                dialog.modal('show');

                //dialog.on('show.bs.modal', function()
              //  {
              //  });



        },
        /**
         * Очистка контента диалога и привязок кнопок
         */
        clear: function()
        {
                var dialog=$("#dialogBox");
                if(dialog.size()!=0)
                {
                  dialog.find("dialogContent").empty();
                  var buttonsArea =dialog.find("#dialogButtonsArea");
                  if( buttonsArea.find("button[id*=dialogBtn_]").size()!=0) buttonsArea.find("button[id*=dialogBtn_]").unbind().remove();
                }
        },
        close:function()
        {
                $("#dialogBox").modal("hide");
                this.clear();

        }






}






function showOverlay(){$("#overlay").fadeIn();}
function hideOverlay(){$("#overlay").fadeOut();}
$(document).ready(function(){

       $("body").append("<div style='position: fixed; top: 0px; bottom: 0px; right:0px;left:0px; background-color: rgba(0, 0, 0, 0.23);display: none;filter: blur(10px); z-index:10108;' id='overlay'>");

    });


/**
 * Маскирует ввод телефона в поле ID
 * @param id
 */
function maskPhoneInput(id)
{

    $('#'+id).keydown(function (e) {
            var key = e.charCode || e.keyCode || 0;
            $phone = $(this);

            // Don't let them remove the starting '('
            if ($phone.val().length <= 3 && (key === 8 || key === 46)) {
                $phone.val('+7(');
                return false;
            }
            // Reset if they highlight and type over first char.
            else if ($phone.val().charAt(0) !== '+') {
                $phone.val('+7(');
            }
            var flag= (key == 8 ||
            key == 9 ||
            key == 46 ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105))
            if(!flag) return false;

            // Auto-format- do not expose the mask as the user begins to type
            if (key !== 8 && key !== 9) {
                if ($phone.val().length === 6) {
                    if(key!=48)$phone.val($phone.val() + ')');
                }
                if ($phone.val().length === 7) {
                    $phone.val($phone.val() + ' ');
                }
                if ($phone.val().length === 11) {
                    $phone.val($phone.val() + '-');
                }
                if ($phone.val().length === 14) {
                    $phone.val($phone.val() + '-');
                }
                if ($phone.val().length >16) {
                    $phone.val($phone.val().substring(0,16));
                }
            }

            return true;

        })
        .bind('focus click', function () {
            $phone = $(this);

            if ($phone.val().length === 0) {
                $phone.val('+7(');
            }
            else {
                var val = $phone.val();
                $phone.val('').val(val); // Ensure cursor remains at the end
            }
        })

        .blur(function () {
            $phone = $(this);

            if ($phone.val() === '+7(') {
                $phone.val('');
            }
        });

}