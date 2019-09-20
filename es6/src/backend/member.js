import {fixurl, ajax, downloadFile} from '../common/tool'
import Table from '../common/table'
import Form from '../common/form'
import Modal from '../common/modal'
import {daterange} from '../common/plugins'

const tpl = {
	operate: '<div class="btn-group"><a href="javascript:;" data-toggle="dropdown" class="btn btn-success dropdown-toggle" aria-expanded="false">Action <span class="caret"></span></a><ul class="dropdown-menu"><%for(var i=0;i<lists.length;i++){%><li class="<%=lists[i].classname%>"><a href="javascript:;"><%=lists[i].title%></a></li><%}%></ul></div>'
}

const api = {
	formatter:{
		operate(value, row, index){
			var html = '';
			const buttons = [
				{title:'導出報表', classname:'table-action-export'},
				{title:'編輯', classname:'table-action-editone'},
				{title:'刪除', classname:'table-action-deleteone'}
			];
			var html = template.render(tpl.operate, {lists:buttons})
			return html	
		}
	},
	events:{
		operate:{
			'click .table-action-editone': function (e, value, row, index) {
				e.stopPropagation();
				e.preventDefault();
				var table = $(this).closest('table');
				var options = table.bootstrapTable('getOptions');
				location.href = options.extend.edit_url + '?id=' + row.id
			},
			'click .table-action-deleteone': function(e, value, row, index){
				e.stopPropagation();
				e.preventDefault();
				var table = $(this).closest('table');
				var options = table.bootstrapTable('getOptions');
				layer.confirm('確定刪除？', {icon: 3, title: '提示', shadeClose: true, btn:['確定', '取消']}, function(index){
					layer.close(index);
					var opts = {
						url: options.extend.delete_url, 
						data: {ids: row.id}, 
						success: function(){
							table.bootstrapTable('refresh', {})
						}
					}
					ajax(opts)
				})
			},
			'click .table-action-export': function(e, value, row, index){
				var options = {
					url: fixurl('admin/member_export')+'?id='+row.id,
					plugins(){
						daterange('.datetimerange')
					},
					callback(obj){
						console.log(obj)
						downloadFile(obj.result.file, obj.result.name)
					}
				}
				Modal.open(options)
			}
		}
	},
	bindevent(){
		$('.action-change-member-psw').click(function(){
			var id = $("input[name='row[id]']").val()
			Modal.open(fixurl('admin/member_psw?id='+id))
		})

		$('.action-reset-member-psw').click(function(){
		    layer.confirm('將密碼重置為123456？', {icon: 3, title: '提示', shadeClose: true}, function(index){
                var id = $("input[name='row[id]']").val()
                var options = {
                	url: fixurl('admin/member_reset'),
                	data: {id: id},
                	success(){
                		layer.close(index);
                	}
                }
                ajax(options)
            })
		})
	}
}

function login(){
	Form.api.bindevent("form")
}

function index(){
	Table.api.init({
		url: fixurl('admin/member'),
		extend: {
			edit_url: fixurl('admin/member_edit'),
			delete_url: fixurl('admin/member_delete'),
			switch_url: fixurl('admin/member_switch'),
		}
	})
	var table = $('#table')
	table.bootstrapTable({
		url: $.fn.bootstrapTable.defaults.url,
		columns: [
			[
				{checkbox: true},
				{field: 'create_time', title: '創建時間', sortable: true},
				{field: 'username', title: '用戶名'},
				{field: 'mobile', title: '電話'},
				{field: 'img', title: '頭像', formatter: Table.api.formatter.image},
				// {field: 'is_disable', title: '禁用與否', sortable: true, formatter: Table.api.formatter.switch},
				{field: '', title: '', table: table, formatter: api.formatter.operate, events: api.events.operate}
			]
		]
	})
	Table.api.bindevent(table)
}

function create(){
	Form.api.bindevent("form[role=form]")
}

function edit(){
	Form.api.bindevent("form[role=form]")
	api.bindevent()
}


export default {login, index, create, edit}