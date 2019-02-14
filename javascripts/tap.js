var myTouch = {
    /**
     * 获取dom元素
     * @param {*} dom dom节点、类名、ID名
     * @param {*} parent dom的父元素
     */
    getDom(dom,parent){
        parent = parent || document;
        return typeof(dom) === "string" ? parent.querySelector(dom) : dom
    },
    /**
     * 获取滑动方向
     * @param {*} startPos 手指触摸屏幕时的x，y
     * @param {*} endPos 手指离开屏幕时的x，y
     */
    getDir(startPos,endPos){
        var dir;
        var x = startPos.x - endPos.x;
        var y = startPos.y - endPos.y;
        var absX = Math.abs(x);
        var absY = Math.abs(y);
        if (absX > absY && absX > 100){ //水平滑动
            dir = x > 0 ? "swipeLeft" : "swipeRight"
        }
        if (absY > absX && absY > 100){ //垂直滑动
            dir = y > 0 ? "swipeTop" : "swipeBottom"
        }
        return dir
    },
    /**
     * 手指单击屏幕事件
     * @param   {[type]}  dom      dom节点 
     * @param   {[type]}  callback  回调函数
     */
    tap(dom, callback) {
        var dom = this.getDom(dom)
        var startTime, endTime, flag = false;
        dom.addEventListener("touchstart", function (e) {
            starTime = new Date() * 1
        }, false)
        dom.addEventListener("touchmove", function (e) {
            flag = true
        }, false)
        dom.addEventListener("touchend", function (e) {
            endTime = new Date() * 1
            if (endTime - starTime < 150 && !flag) {
                callback && callback()
            }
            flag = false
        }, false)
    },
    /**
     * 
     * @param {*} dom dom节点
     * @param {*} dir 滑动方向  值： "swipeLeft"、"swipeRight"、"swipeTop"、"swipeBottom"
     * @param {*} callback 回调函数
     */
    swipe(dom,dir,callback){
        var that = this
        var dom = this.getDom(dom);
        var startPos,endPos;
        dom.addEventListener("touchstart",function(e){
            startPos = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            }
        },false)
        dom.addEventListener("touchend",function(e){
            endPos = {
                x: e.changedTouches[0].clientX,
                y: e.changedTouches[0].clientY,
            }
            if(dir == that.getDir(startPos,endPos)){
                callback && callback()
            }
            
        },false)
    }
}