// components/_button/_button.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    buttonText: {
      type: String,
    },
    buttonKey: {
      type: String,
    }
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
    handleButtonClicked(e){
      var parternKV = {
        key: this.properties.buttonKey,
        value: true,
      };
      this.triggerEvent("handleChange", parternKV);
      //console.log(parternKV);
    }
  }
})
