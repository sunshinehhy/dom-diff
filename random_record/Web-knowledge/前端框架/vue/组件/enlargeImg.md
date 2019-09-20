```
/**
 * 开发插件介绍：https://cn.vuejs.org/v2/guide/plugins.html
 */
import enlargeImgVue from './enlargeImg.vue';
import Vue from 'vue'
const EnlargeImg = {};

EnlargeImg.install = function (Vue) {
  const EnlargeImgInstance = Vue.extend(enlargeImgVue);
  let currentMsg, instance;
  const initInstance = () => {
    currentMsg = new EnlargeImgInstance();
    let msgBoxEl = currentMsg.$mount().$el;
    document.body.appendChild(msgBoxEl);
  };

  Vue.prototype.$imgBox = {
    showLargeImg(options) {
      if (!instance) {
        initInstance();
      }
      if (typeof options === 'string') {
        currentMsg.imgSrc = options;
      } else if (typeof options === 'object') {
        Object.assign(currentMsg, options);
      }
      currentMsg.showLargeImg()
    }
  };
};

Vue.use(EnlargeImg);


this.$imgBox.showLargeImg(
      {
        imgSrc:'https://coolcdn.igetcool.com/t/wxapp/20190313/5fd917a2e34984542fadd7de7c9b1585.jpg'
      }
    )
```

```
let instance;
const EnlargeImgInstance = Vue.extend(enlargeImgVue);

const EnlargeImg = (options) => {
  // 创建元素
  if (!instance) {
    instance = new EnlargeImgInstance();
  }
  let msgBoxEl = instance.$mount().$el;
  if (typeof options === 'string') {
    instance.imgSrc = options;
  }else{
    for (const key in options) {
        if (options.hasOwnProperty(key)) {
            let value = options[key];
            if (key === 'imgSrc' && typeof value !== 'string') {
                value = 'Toast：imgSrc必须是string类型';
            }
            instance[key] = options[key];
        }
    }
  }

  document.body.appendChild(msgBoxEl);
  Vue.nextTick(() => {
    instance.isShow = true;
  })
}
Vue.prototype.$imgBox = EnlargeImg;


this.$imgBox(
    {
      imgSrc:'https://coolcdn.igetcool.com/t/wxapp/20190313/5fd917a2e34984542fadd7de7c9b1585.jpg'
    }
  )
this.$imgBox(
'https://coolcdn.igetcool.com/t/wxapp/20190313/5fd917a2e34984542fadd7de7c9b1585.jpg'
  )
```