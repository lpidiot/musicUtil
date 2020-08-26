/*eslint-disable*/
import SongListDetail from '@/components/other/SongListDetail.vue'
// let $vm
export default {
  install(_Vue, options) {
    const SongListConstructor = _Vue.extend(SongListDetail)
    const instance = new SongListConstructor() //创建子实例
    instance.$mount(document.createElement('div')) //挂载实例到创建的DOM上
    document.body.appendChild(instance.$el)
    _Vue.prototype.$showSongList = (mark, val, callback) => {
      //mark有tid(常规)或者url(封面推荐)
      instance.show = true;
      if (mark == 'songlist' || mark == 'default' || mark == 'tid') {
        instance.freshSongList_tid(val)
      } else if (mark == 'url' || mark == 'cover') {
        instance.freshSongList_url(val)
      } else if (mark == 'album') {
        instance.freshSongList_album(val)
      }
      if (callback) {
        callback()
      }

    }
  }
}
