/*eslint-disable*/
import SongListDetail from '@/components/other/SongListDetail.vue'
// let $vm
export default {
  install(_Vue, options) {
    const SongListConstructor = _Vue.extend(SongListDetail)
    const instance = new SongListConstructor() //创建子实例
    instance.$mount(document.createElement('div')) //挂载实例到创建的DOM上
    document.body.appendChild(instance.$el)
    _Vue.prototype.$showSongList = (mark,callback) => {
      //mark有tid(常规)或者url(封面推荐)
      instance.show = true;
      var patt = new RegExp(/^[0-9]*$/);
      //纯数字为tid
      if(patt.test(mark)){
        instance.freshSongList_tid(mark)
      }else{
        instance.freshSongList_url(mark)
      }
      if (callback) {
        callback()
      }

    }
  }
}
