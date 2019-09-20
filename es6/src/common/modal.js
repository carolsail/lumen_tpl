import {ajax} from  './tool.js'
import Form from  './form.js'

const Modal = {
	/**	
	 * url:頁面
	 * plugin: 插件初始化
	 * callback: 提交后回調
	 */
	open(options){
		options = typeof options === 'string' ? {url: options} : options;
		const opts = $.extend({
			success: function(html){
				$('#modal-dialog').html(html)
				return Modal.submit(options)
			}
		}, options)
		ajax(opts)
	},
	submit(options){
		const modal = $('#modal-dialog .modal')
		const form = $('#modal-dialog form')
		modal.modal()
		modal.off('shown.bs.modal').on('shown.bs.modal', function(){
			// modal中初始化表單驗證parsley 
			form.parsley()
			// 附加插件格式化
			if(options.plugins && typeof options.plugins === 'function'){
				options['plugins'](form);
			}else{
				// 默認焦點focus
				if(form.find('input:first-child').length){
					//form.find('input:first-child')[0].focus()
					form.find('input:first-child')[0].select()
				}
			}
		})
		Form.api.bindevent('#modal-dialog form', function(obj){
			Modal.close()
			if(options.callback && typeof options.callback === 'function'){
				return options['callback'](obj);
			}
		})
	},
	close(){
		$('#modal-dialog .modal').modal('hide')
	}
}

export default Modal