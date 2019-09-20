import Upload from './upload.js'
import {ajax, fixurl} from './tool.js'
import {select2, select2Ajax, datepicker, kindeditor, dragsort} from './plugins.js'

const Form = {
    events: {
        plupload(form) {
            if ($(".plupload", form).length) {
               Upload.api.plupload($(".plupload", form));
            }
        },
        kindeditor(form){
            if ($(".kindeditor", form).length) {
                kindeditor(form + ' .kindeditor')
            }
        },
        select2(form){
            if ($(".select-advanced", form).length) {
                select2($(".select-advanced", form))
            }
        },
        dragsort(form){
            if($(".draglist", form).length){
                dragsort($('.draglist', form))
            }
        }
    },
    api: {
        submit(form, successb, errorb) {
            var options = {
                url: form.attr('action'),
                data: form.serialize(),
                type: 'POST',
                success(obj){
                    if(typeof successb === 'function'){
                        return successb({result:obj, element:form})
                    }
                    if(obj.code){//tp中$this->success()
                        if(obj.msg){
                            layer.msg(obj.msg, {icon: 6}, function(){
                                location.href = obj.url
                            })
                        }else{
                            location.href = obj.url
                        } 
                    }
                },
                error(err){
                    if(typeof errorb === 'function'){
                        return errorb(err)
                    }
                    var msg = JSON.parse(err.responseText).msg
                    layer.msg(msg, {icon: 5})
                }
            }
            return ajax(options)
        },
        bindevent: function(form, success, error) {
            //form = typeof form === 'object' ? form : $(form)
            var events = Form.events
            events.plupload(form)
            events.select2(form)
            events.kindeditor(form) 
            events.dragsort(form) 
            //加載完畢啓用按鈕
            $(form).find("button[type='submit']").removeAttr('disabled')
            //表單提交
            $(form).on('submit', function(e){
                e.preventDefault()
                //禁止重复提交
                const button = $(this).find("button[type='submit']")
                if($(this).parsley().isValid() && !button.hasClass('disabled')){
                    button.addClass('disabled')
                    return Form.api.submit($(this), success, error).fail(function(){
                        button.removeClass('disabled')
                    })
                }
            })
        }
    }
}

export default Form