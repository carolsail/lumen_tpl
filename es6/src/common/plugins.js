//https://bootstrap-datepicker.readthedocs.io/en/latest/
function datepicker(element){
    $(element).datepicker({
        todayHighlight: !0,
        autoclose: !0,
        format: 'yyyy-mm-dd'
    })
}

//https://sensortower.github.io/daterangepicker/docs [moment.js]
function daterange(element){
	var options = {
        timePicker: false,
        autoUpdateInput: false,
        timePickerSeconds: true,
        timePicker24Hour: true,
        autoApply: true,
        locale: {
            format: 'YYYY-MM-DD HH:mm:ss',
            customRangeLabel: "Custom Range",
            applyLabel: "Apply",
            cancelLabel: "Clear",
        },
        ranges: {
        	'Today': [moment().startOf('day'), moment().endOf('day')],
        	'Yesterday': [moment().subtract(1, 'days').startOf('day'), moment().subtract(1, 'days').endOf('day')],
        	'Last 7 Days': [moment().subtract(6, 'days').startOf('day'), moment().endOf('day')],
        	'Last 30 Days': [moment().subtract(29, 'days').startOf('day'), moment().endOf('day')],
        	'This Month': [moment().startOf('month'), moment().endOf('month')],
        	'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }

    var origincallback = function (start, end) {
        $(this.element).val(start.format(this.locale.format) + " - " + end.format(this.locale.format));
        $(this.element).trigger('blur');
    }

    $(element).each(function () {
        var callback = typeof $(this).data('callback') == 'function' ? $(this).data('callback') : origincallback;
        $(this).on('apply.daterangepicker', function (ev, picker) {
            callback.call(picker, picker.startDate, picker.endDate);
        });
        $(this).on('cancel.daterangepicker', function (ev, picker) {
            $(this).val('').trigger('blur');
        });
        $(this).daterangepicker($.extend({}, options, $(this).data()), callback);
    })
}

/**
 * selector
 * url
 * data: fn
 * selection: fn
 * result: fn
 */
function select2Ajax(options){
    $(options.selector).select2({
        ajax: {
            url: options.url,
            dataType: 'json',
            delay: 250,
            data: function (params){
                if(typeof options.data === 'function'){
                    return options['data'](params)
                }
                return { q: params.term }
            },
            processResults: function (data, params) {
                if(typeof options.process === 'function'){
                    return options['process'](data, params)
                }
                return { results: data }
            },
            cache: true
        },
        minimumInputLength: options.inputLength,
        escapeMarkup: function (markup) { return markup },
        templateResult: function(repo){
            if (repo.loading) {
                return repo.text;
            }  
            if(typeof options.result === 'function'){
                return options['result'](repo)
            }
            return repo.title
        },
        templateSelection: function(repo){
            if(typeof options.selection === 'function'){
                return options['selection'](repo)
            }
            return repo.title || repo.text
        }
    }).on('select2:select', function(e){
        //填充數據回調
        if(typeof options.selected === 'function'){
            return options['selected'](e)
        }
    }).closest("form").on("reset",function(ev){
        //解决表单reset清空问题
        var targetJQForm = $(ev.target)
        setTimeout((function(){
            this.find("select").trigger("change")
        }).bind(targetJQForm),0)
    })
}

//https://select2.org/
function select2(element){
    var options = {
        width: 'resolve'
    }
    $(element).select2(options).closest("form").on("reset",function(ev){
        //解决表单reset清空问题
        var targetJQForm = $(ev.target)
        setTimeout((function(){
            this.find("select").trigger("change")
        }).bind(targetJQForm),0)
    })
}

//http://kindeditor.net/doc.php
function kindeditor(element){
    var options = {
        uploadJson: fixurl('ajax/kindeditor_upload'),
        items : [
            'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
            'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
            'insertunorderedlist', '|', 'emoticons', 'image', 'link']
    }
    KindEditor.create(element, options)  
}

function dragsort(element){
    $(element).dragsort({
        dragSelector: "li",
        dragEnd: function(){
            $(element).trigger('change')
        }
    })

    $(element).change(function(){
        const that = $(this)
        const idArr = [];
        that.find('li').each(function(k,v){
            idArr.push($(this).data("id"))
        })
        that.parent().find('input').val(idArr.join(","))
    })
}

export {datepicker, daterange, select2Ajax, select2, kindeditor, dragsort}