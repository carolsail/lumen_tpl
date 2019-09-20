function ajax(options, loading=true){
	if(loading){
		var index = layer.load(1)
	}
	options = typeof options === 'string' ? {url: options} : options;
	options = $.extend({
		type: 'GET',
		contentType: "app/json",
		data: {},
		success: function(obj){
			if(obj.code){
		        if(obj.msg){
	        		layer.msg(obj.msg, {icon: 6}, function(){
	        			location.href = obj.url
	        		})
	        	}else{
	        		location.href = obj.url
	        	}
			}
		},
		error: function(err){
			var msg = JSON.parse(err.responseText).msg
			layer.msg(msg, {icon: 5})
		}
	}, options)

	return $.ajax(options).always(function(){
		if(loading){
			layer.close(index)
		}
	})
}

function fixurl(url){
	var fixurl = ''
	if(url.substring(0,4)=='http'){
		fixurl = url
	}else{
		if(url.substring(0,1)=='/'){
			url = url.substr(1);
		}
		fixurl = Config.base_url + "/" + Config.module + '/' + url
	}
	return fixurl
}

//dom转对象数组
function serializeObj(e){
	let o = {};
	const a = e.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
}

function downloadFile(file, name='file.xls'){
	if(file){
		var $a = $("<a>");
		$a.attr("href",file);
		$("body").append($a);
		$a.attr("download", name);
		$a[0].click();
		$a.remove();
	}
}

//去左右空格;
function trim(s){
	s = s + ''
    return s.replace(/(^\s*)|(\s*$)/g, "");
}

export {ajax, fixurl, serializeObj, downloadFile, trim}
