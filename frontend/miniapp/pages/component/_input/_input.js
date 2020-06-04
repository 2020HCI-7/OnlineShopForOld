// components/Input/Input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    inputKey: {
      type: String,
    },
    placeholderValue: {
      type: String,
    },
    password: {
      type: Boolean,
    },
    value: {
      type: String,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    underline: "_____________________________________________",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleInputChange: function (e) {
      var parternKV = {
        key: e.currentTarget.dataset["key"],
        value: e.detail.value,
      };
      this.triggerEvent("handleChange", parternKV);
      //console.log(parternKV);
    },
  }
})
