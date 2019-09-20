import {ajax, fixurl} from '../common/tool'
import Modal from '../common/modal'

const api ={
    bindevent(){
        if($('.action-logout').length){
            $('.action-logout').click(function(){
                layer.confirm('確定注銷？', {icon: 3, title: '提示', shadeClose: true}, function(index){
                    ajax(fixurl('admin/logout'))
                })
            })
        }
        if($('.action-change-psw').length){
           $('.action-change-psw').click(function(){
                Modal.open(fixurl('admin/member_psw'))
           })
        }
    }
}
function init(){
    api.bindevent()
}
export default {init}