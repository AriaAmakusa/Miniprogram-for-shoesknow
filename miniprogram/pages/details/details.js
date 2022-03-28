// miniprogram/pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    inputValue: '',
    name_input:'',
    number_input:'',
    now_state:null
  },

  onShareAppMessage() {
    return {
      title: 'form',
      path: 'page/component/pages/form/form'
    }
  },

  formSubmit: function (e) {     
    //console.log(e.detail.value);
    if (e.detail.value.name_input.length == 0) {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }else if(e.detail.value.name_input.length>=8){
      wx.showToast({
        title: '姓名不能过长',
        icon:'loading',
        duration:1500
      })
      setTimeout(function(){
        wx.hideToast()
      },2000)
    } else if (e.detail.value.number_input.length == 0) {
      wx.showToast({
        title: '号码不能为空!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      //数据提交给数据库
      const db = wx.cloud.database({});
      const cont = db.collection('family');
      cont.add({
        data: {
          _id:e.detail.value.name_input,
          name: e.detail.value.name_input,
          tell: e.detail.value.number_input,
          done:false,
        },
        success: function (res) {
          console.log(res._id)
          wx.showModal({
            title: '成功',
            content: '您已经登记成功',
            showCancel: false
          })
        }
      });
    }
  },

  Popup(e){
    var that = this 
    that.setData({
      now_state:true
    })
    console.log(that.data.now_state);
 
  },
  //点击黑色背景触发的事件
  hideModal(e){
    //首先创建一个动画对象（让页面不在是一个“死页面”）
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    //animation.translateY(300)中的translate函数是表示在y轴上平移多少px，而后面紧接着的.step表示前面动画的完成，可以开始下一个动画了
    animation.translateY(300).step()
    this.setData({
      /*这里的export函数是导出动画队列，在外米的wxml中会用到该数据，同时export方法在调用完后会清掉前面的动画操作 */
      animationData: animation.export(),
    })
    /*这里的setTimeout是一个延时器，而它在这里延时了200ms，然后在执行动画 */
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        now_state: false,
      })
    }.bind(this), 200)
    var that = this
   
  },

  
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindReplaceInput: function (e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    var left
    if (pos !== -1) {
      // 光标在中间
      left = e.detail.value.slice(0, pos)
      // 计算光标的位置
      pos = left.replace(/11/g, '2').length
    }

    // 直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

    // 或者直接返回字符串,光标在最后边
    // return value.replace(/11/g,'2'),
  },
  bindHideKeyboard: function (e) {
    if (e.detail.value === '123') {
      // 收起键盘
      wx.hideKeyboard()
    }
      /* ... */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})