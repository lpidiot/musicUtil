/*eslint-disable*/
import SongListDetail from '@/components/other/SongListDetail.vue'
// let $vm
export default {
    install (_Vue, options) {
        const SongListConstructor = _Vue.extend(SongListDetail) 
        const instance = new SongListConstructor()   //创建alert子实例
        instance.$mount(document.createElement('div')) //挂载实例到创建的DOM上
        document.body.appendChild(instance.$el)
        _Vue.prototype.$showSongList = () => {
            instance.show = true;
        }
    }
}