import header from './backend/header'
export {default as example} from './backend/example'

if(!(Config.controllername=='member' && Config.actionname=='login')){
    header.init()
}