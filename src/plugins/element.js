import Vue from 'vue'
import {
  Tabs,
  TabPane,
  Image,
  Button,
  Slider,
  Tag,
  InfiniteScroll
} from 'element-ui'
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Image)
Vue.use(Button)
Vue.use(Slider)
Vue.use(Tag)
Vue.use(InfiniteScroll)

import {Swipe,SwipeItem } from 'mint-ui'
import 'mint-ui/lib/swipe/style.css'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);