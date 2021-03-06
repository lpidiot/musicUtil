/*eslint-disable*/
import SongListDetail from '@/components/other/SongListDetail.vue'
// let $vm
export default {
  install(_Vue, options) {
    const SongListConstructor = _Vue.extend(SongListDetail)
    const instance = new SongListConstructor() //创建子实例
    instance.$mount(document.createElement('div')) //挂载实例到创建的DOM上
    document.body.appendChild(instance.$el)
    _Vue.prototype.$showSongList = (mark, val, context) => {
      if(mark=='local'){
        instance.freshSongList_local();
        instance.show = true;
        instance.isLocal=true;
        instance.context=context;
        return;
      }
      var patt = new RegExp(/^[0-9]*$/);
      //mark有tid(常规)或者url(封面推荐)

      if (patt.test(val)) {
        instance.freshSongList_tid(val)
      } else if (mark == 'singer') {
        instance.isSinger = true;
        instance.singerId = val; //歌手歌单可能会上拉加载 记下id
        instance.freshSongList_singer(val)
      } else if (!patt.test(val)) {
        instance.freshSongList_url(val)
      }

      instance.show = true;
      if (context) {
        //callback()
        //console.log(callback);
        instance.context=context;
      }

    }
  }
}
