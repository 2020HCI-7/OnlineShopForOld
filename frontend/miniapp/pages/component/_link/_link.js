
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    linkKey:{
      type: String,
    },
    linkText:{
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
   
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleLinkClicked(e) {
        var parternKV = {
          key: e.currentTarget.dataset["key"],
          value: true,
        };
        this.triggerEvent("handleChange", parternKV);
      }
    }
})
