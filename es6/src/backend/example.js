import {fixurl, ajax, serializeObj, trim} from '../common/tool'
import Table from '../common/table'
import Form from '../common/form'
import Modal from '../common/modal'
import {select2Ajax, select2} from '../common/plugins'

const tpl = {
	operate: '<div class="btn-group"><a href="javascript:;" data-toggle="dropdown" class="btn btn-success dropdown-toggle" aria-expanded="false">Action <span class="caret"></span></a><ul class="dropdown-menu"><%for(var i=0;i<lists.length;i++){%><li class="<%=lists[i].classname%>"><a href="javascript:;"><%=lists[i].title%></a></li><%}%></ul></div>'
}

const api = {
	productItemLists: [],
	formatter:{
		member_id(value, row){
			let name = '-'
			if(row.member){
				name = row.member.username
			}
			return name
		},
		status(value, row, index){
			return "<label class='label' style='background:"+row['status_info']['color']+"'>"+row['status_info']['text']+"</label>"
		},
		operate(value, row, index){
			let buttons = [];
			buttons.push({title:'詳情', classname:'table-action-detail'})
			if(row['status']==0){
				if(row['role']=='admin'){
					buttons.push({title:'入倉', classname:'table-action-status-in'})
				}
				buttons.push({title:'取消', classname:'table-action-status-cancel'})
			}
			var html = template.render(tpl.operate, {lists:buttons})
			return html
		}
	},
	events:{
		operate:{
			'click .table-action-detail': function (e, value, row, index) {
				e.stopPropagation();
				e.preventDefault();
				var table = $(this).closest('table');
				var options = table.bootstrapTable('getOptions');
				location.href = options.extend.edit_url + '?id=' + row.id
			},
			'click .table-action-status-cancel': function(e, value, row, index){
				e.stopPropagation();
				e.preventDefault();
				var table = $(this).closest('table');
				var options = table.bootstrapTable('getOptions');
				layer.confirm('確定取消？', {icon: 3, title: '提示', shadeClose: true, btn:['確定', '取消']}, function(index){
					layer.close(index);
					var opts = {
						url: options.extend.cancel_url, 
						data: {id: row.id}, 
						success: function(){
							table.bootstrapTable('refresh', {})
						}
					}
					ajax(opts)
				})
			},
			'click .table-action-status-in': function(e, value, row, index){
				e.stopPropagation();
				e.preventDefault();
				var table = $(this).closest('table');
				var options = table.bootstrapTable('getOptions');
				const opts = {
					url: options.extend.in_url+'?id='+row.id,
					callback(){
						table.bootstrapTable('refresh', {})
					}
				}
				Modal.open(opts)
			}
		}
	},
	bindevent(){
		if($('.modal-product').length){
			$('.modal-product').click(function(){
				api.addProductItem()
			})
		}
		if($('select[name="status"]').length){
			$('select[name="status"]').change(function(){
				$('#table').bootstrapTable('refresh', {})
			})
		}
		if($('.member_id').length){
			$('.member_id').change(function(){
				api.resetProduct()
			})
		}
		if($('.index_member_id').length){
			select2('.index_member_id')
			$('.index_member_id').change(function(){
				$('#table').bootstrapTable('refresh', {})
			})
		}

		$(document).on('click','.product-item-remove',function(){
			const product_no = $(this).data('pno')
			const index = api.productItemIndex(product_no)
			api.productItemLists.splice(index,1);
			$(this).closest('tr').remove();
		})
	},
	addProductItem(){
		const options = {
			url: fixurl('admin/order_product'),
			callback(obj){
				const product = serializeObj(obj.element)
				const index = api.productItemIndex(product.product_no)
				if(index>=0){
					const item = api.productItemLists[index]
					layer.msg('編號'+item.product_no+'已存在')
				}else{
					api.productItemLists.push(product)
					const html = template('tpl-product-item', {product: product})
					$('#content-product-item').append(html)
				}
			}
		}
		Modal.open(options)
	},
	productItemIndex(product_no){
		//去两边空格并转小写
		return _.findIndex(api.productItemLists, (item)=>{return (trim(item.product_no)).toLowerCase() == (trim(product_no)).toLowerCase()});
	},
	productItemListsInt(){
		$('#content-product-item tr').each(function(){
			const product_no = $(this).find('.product_no').val()
			api.productItemLists.push({'product_no': product_no})
		})
		return api.productItemLists
	},
	selectedInt(){
		$(".member_id").val($('.member_id').attr('data-selected')).trigger('change')
	},
	resetProduct(){
		api.productItemLists = []
		$('#content-product-item > *').remove()
	}
}

function index(){
	Table.api.init({
		url: fixurl('example'),
		extend: {
			edit_url: fixurl('order_edit'),
			cancel_url: fixurl('/order_cancel'),
			in_url: fixurl('/order_in')
		}
	})
	var table = $('#table')
	table.bootstrapTable({
		url: $.fn.bootstrapTable.defaults.url,
		columns: [
			[
				{checkbox: true},
				{field: 'create_at', title: '創建時間', sortable: true},
				{field: 'name', title: 'name'},
				{field: 'email', title: 'email'},
				{field: '', title: '', table: table, formatter: api.formatter.operate, events: api.events.operate}
			]
		]
	})
	Table.api.bindevent(table)
	api.bindevent()
}

function create(){
	api.bindevent()
	Form.api.bindevent("form[role=form]")
}

function edit(){
	api.selectedInt()
	api.productItemListsInt()
	api.bindevent()
	Form.api.bindevent("form[role=form]")
}


export default {index, create, edit}