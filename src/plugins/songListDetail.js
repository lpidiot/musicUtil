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
      var patt = new RegExp(/^[0-9]*$/);
      //mark有tid(常规)或者url(封面推荐)

      if (patt.test(val)) {
        instance.freshSongList_tid(val)
      } else if (mark == 'songer') {
        instance.isSinger = true;
        instance.freshSongList_songer(val)
      } else if (!patt.test(val)) {
        instance.freshSongList_url(val)
      }

      instance.show = true;
      if (callback) {
        callback()
      }

    }
  }
}
