import Vue from 'vue'
import {
  Tabs,
  TabPane,
  Image,
} from 'element-ui'

Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Image)

import {Swipe,SwipeItem } from 'mint-ui'
import 'mint-ui/lib/swipe/style.css'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);