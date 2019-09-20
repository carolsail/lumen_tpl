import {fixurl, ajax} from './tool.js'
import {daterange} from './plugins.js'

const Table = {
    defaults: {
        url: '',
        sidePagination: 'server',
        method: 'get',
        pageSize: 10,
        pageList: [10, 25, 50, 'All'],
        pagination: true,
        pk: 'id',
        sortName: 'id',
        sortOrder: 'desc',
        queryParams: function(params){
            return Table.api.getQueryParams(params, Table.api.getSearchQuery())
        },
        paginationFirstText: '首頁',
        paginationPreText: '上一頁',
        paginationNextText: '下一頁',
        paginationLastText: '尾頁',
        formatLoadingMessage: function(){
            return '' //加载进度信息
        },
        extend: {
            edit_url: '',
            delete_url: '',
            delete_notice: '確認刪除？'
        },
        //height: 500
    },
    config: {
        operatetpl: '<div class="btn-group"><a href="javascript:;" data-toggle="dropdown" class="btn btn-success dropdown-toggle" aria-expanded="false">Action <span class="caret"></span></a><ul class="dropdown-menu"><%for(var i=0;i<lists.length;i++){%><li class="<%=lists[i].classname%>"><a href="javascript:;"><%=lists[i].title%></a></li><%}%></ul></div>'
    },
    api: {
        init: function(defaults){
            defaults = defaults ? defaults : {}
            $.extend(true, $.fn.bootstrapTable.defaults, Table.defaults, defaults)
        },
        bindevent: function(table){
            var options = table.bootstrapTable('getOptions')

            //当内容渲染完成后
            table.on('post-body.bs.table', function (e, settings, json, xhr) {
                $('.table-view-group-btn > a').toggleClass('disabled', true);
                $('[data-toggle="tooltip"]').tooltip()
            })

            // 複選框選中
            table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function () {
                var ids = Table.api.selectedids(table)
                $('.table-view-group-btn > a').toggleClass('disabled', !ids.length);
            })

            //搜索
            $(table).closest('.bs-table-container').on('click', '.table-action-search', function(){
                table.bootstrapTable('refresh',{pageNumber:1})
            })

            //重置
            $(table).closest('.bs-table-container').on('click', '.table-action-reset', function(){
                $(this).closest('form')[0].reset();
                table.bootstrapTable('refresh',{pageNumber:1})
            })

            //回车触发搜索
            $(document).keyup(function(event){
              if(event.keyCode ==13){
                //獲取焦點位置(未選中或選擇form中帶有.search)
                if(!$("input:focus").length || $("input:focus").closest('form').hasClass('search')){
                    $('.bs-table-container .table-action-search').trigger('click')
                }
                return false
              }
            })

            //搜索range日期
            if($('.datetimerange').length>0){
                daterange('.datetimerange')
            }

            //批量修改状态
            $('.batch-action-status').on('click', function(){
                alert('batch status')
            })

            //批量删除
            $('.batch-action-del').on('click', function(){
                layer.confirm('確定刪除？', {icon: 3, title: '提示', shadeClose: true}, function(index){
                    var ids = Table.api.selectedids(table)
                    var ids_str = ids.join(',')
                    layer.close(index);
                    Table.api.delrows(options.extend.delete_url, {ids:ids_str}, table)
                })
            })

            //switch开关切换
            $(table).on("click", "[data-id].btn-switch-change", function (e) {
                e.preventDefault();
                const id = $(this).data("id")
                const params = $(this).data("params")
                const opts = {
                    url: options.extend.switch_url+'?id='+id,
                    type: 'POST',
                    data: {param: params},
                    success(obj){
                        table.bootstrapTable('refresh', {})
                    }
                }
                ajax(opts)
            })
        },
        selectedids: function(table){
            var options = table.bootstrapTable('getOptions')
            return $.map(table.bootstrapTable('getSelections'), function (row) {
                return row[options.pk];
            })
        },
        delrows: function(url, data, table){
            var options = {
                    url, 
                    data, 
                    success: function(){
                        table.bootstrapTable('refresh', {})
                    }
                }
            ajax(options)
        },
        getSearchQuery: function(table=''){
            var op = {}
            var filter = {}
            var value = ''
            if(table){
                var form = $(table).closest('.bs-table-container').find('form');
                var operate = $(table).closest('.bs-table-container').find('.operate');
            }else{
                var form = $(".bs-table-container form");
                var operate = $(".bs-table-container form .operate");
            }
            operate.each(function (i) {
                var name = $(this).data("name")
                var sym = $(this).is("select") ? $("option:selected", this).val() : $(this).val().toUpperCase()
                var obj = $(form).find("[name='" + name + "']")
                if (obj.length == 0){
                    return true
                }
                if(obj.length > 1){
                    if (/BETWEEN$/.test(sym)) {
                        var value_begin = $.trim($(form).find("[name='" + name + "']:first").val()),
                            value_end = $.trim($(form).find("[name='" + name + "']:last").val());
                        if (value_begin.length || value_end.length) {
                            value = value_begin + ',' + value_end;
                        } else {
                            value = '';
                        }
                        //如果是时间筛选，将operate置为RANGE
                        if ($(form).find("[name='" + name + "']:first").hasClass("datetimepicker")) {
                            sym = 'RANGE';
                        }
                    } else {
                        value = $(form).find("[name='" + name + "']:checked").val();
                    }
                }else{
                    value = obj.val()
                }

                if(value){
                    op[name] = sym
                    filter[name] = value
                }
            })
            return {op: op, filter: filter}
        },
        getQueryParams: function (params, searchQuery) {
            params.filter = typeof params.filter === 'Object' ? params.filter : (params.filter ? JSON.parse(params.filter) : {});
            params.op = typeof params.op === 'Object' ? params.op : (params.op ? JSON.parse(params.op) : {});

            params.filter = $.extend({}, params.filter, searchQuery.filter);
            params.op = $.extend({}, params.op, searchQuery.op);
            params.filter = JSON.stringify(params.filter);
            params.op = JSON.stringify(params.op);
            return params;
        },
        formatter: {
            image: function (value, row, index) {
                var img = value ? fixurl(value) : fixurl('/static/img/blank.gif');
                if(row.img_from && row.img_from==1){
                    img = value
                }
                var classname = typeof this.classname !== 'undefined' ? this.classname : 'img-sm img-center';
                return '<a href="' + img + '" target="_blank"><img class="' + classname + '" src="' + img + '" /></a>';
            },
            date: function(value, row, index){
                return value ? moment(value).format("DD/MM/YYYY") : ''
            },
            switch: function(value, row, index){
                    return "<a href='javascript:;' data-toggle='tooltip' class='btn-switch-change' data-id='"
                        + row.id + "' data-params='" + this.field + "=" + value + "'><i class='fa fa-toggle-on " + (value == 1 ? 'text-success' : 'fa-flip-horizontal text-grey') + " fa-2x'></i></a>";
            },
            operate: function(value, row, index){
                var table = this.table
                var options = table ? table.bootstrapTable('getOptions') : {}
                var buttons = []
                if(options.extend.edit_url){
                    buttons.push({
                        name: 'edit',
                        icon: 'fa fa-pencil',
                        title: '編輯',
                        classname: 'table-action-editone',
                        url: options.extend.edit_url
                    })
                }
                if(options.extend.delete_url){
                    buttons.push({
                        name: 'delete',
                        icon: 'fa fa-pencil',
                        title: '刪除',
                        classname: 'table-action-deleteone',
                        url: options.extend.delete_url
                    })  
                }
                var html = template.render(Table.config.operatetpl, {lists:buttons})
                return html
            }
        },
        events: {
            operate: {
                'click .table-action-editone': function (e, value, row, index) {
                    e.stopPropagation();
                    e.preventDefault();
                    var table = $(this).closest('table');
                    var options = table.bootstrapTable('getOptions');
                    location.href = options.extend.edit_url + '?id=' + row.id
                },
                'click .table-action-deleteone': function (e, value, row, index) {
                    e.stopPropagation();
                    e.preventDefault();
                    var that = this;
                    var table = $(that).closest('table');
                    var options = table.bootstrapTable('getOptions');
                    layer.confirm(options.extend.delete_notice, {icon: 3, title: '提示', shadeClose: true, btn:['確定', '取消']}, function(index){
                        layer.close(index);
                        Table.api.delrows(options.extend.delete_url, {ids: row.id}, table)
                    })
                }
            }
        }
    }
}

export default Table