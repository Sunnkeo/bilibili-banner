$(function () {
    // 获取元素
    var bn_image1 = document.querySelector('#bn_image1')
    var bn_image2 = document.querySelector('#bn_image2')
    var bn_image3 = document.querySelector('#bn_image3')
    var bn_image4 = document.querySelector('#bn_image4')
    var bn_image5 = document.querySelector('#bn_image5')
    var bn_image6 = document.querySelector('#bn_image6')
    // 将距离变量开放为全局变量，这样下面封装的函数内部才能使用这两个变量
    var moveX = null;
    var abs_moveX = null;
    var total_blur = null;
    // 封装改变图片blur的函数
    // dom：图片dom元素
    // de：默认的blur值
    // num：算法中的分母
    // bg_num：第几个图片
    // max_X：让图片的blur减少为最小 鼠标要移动的距离
    function changeBlur(dom, de, num, bg_num, max_X) {
        // moveX的范围要分开写
        // || 或这里的判断要加括号不然程序会把这行代码当成 或 判断这样这样只要后面的那个bg_num成立则这个代码就是true
        // 比如当我传入的bg_num为3的时候，不管moveX的值为多少，始终有bg_num == 3成立，因为如果不加()则这是一个逻辑或语句，因此||两边只要有一个true就返回true
        if (0 < moveX && moveX < max_X && (bg_num == 2 || bg_num == 3)) {
            // console.log((de - abs_moveX / num));
            console.log(moveX)
            dom.children[0].style.filter = 'blur(' + (de - abs_moveX / num) + 'px)';
        } else {
            // 图片的模糊程度用鼠标移动的绝对值，因为图片只有在靠近那一个点时blur的值才会减少，其他向左向右的时候blur的值都会增加
            dom.children[0].style.filter = 'blur(' + (de + abs_moveX / num) + 'px)';
            // dom.children得到的时dom子元素的数组，一定不要忘记用dom.children[index]来获取具体的元素
        }
    }
    // 封装改变图片位置的函数
    function changeTranslate(dom, num) {
        dom.children[0].style.transform = 'translate(' + moveX / num + 'px, 0px)';
    }
    var x = null;
    $('.banner').mouseenter(function (e) {
        x = e.offsetX
        // console.log(x)
    })
    $('.banner').on('mousemove', function (e) {
        // 得到鼠标移动的距离
        moveX = e.offsetX - x;
        // 取鼠标移动距离的绝对值
        abs_moveX = Math.abs(moveX);
        // bg1
        changeBlur(bn_image1, 4, 500);
        // bn_image1.children[0].style.filter = 'blur('+ (4 + abs_moveX / 500) + 'px)';
        // bg2
        changeBlur(bn_image2, 0, 200);
        changeTranslate(bn_image2, 360);
        // bn_image2.children[0].style.transform = 'translate(' + moveX / 360 + 'px, 0px)';
        // bg3
        changeBlur(bn_image3, 1, 1000, 3, 365);
        changeTranslate(bn_image3, 100)
        // bg4
        changeBlur(bn_image4, 4, 200, 2, 800);
        changeTranslate(bn_image4, 40);
        // bg5
        changeBlur(bn_image5, 5, 100, 2, 1000);
        changeTranslate(bn_image5, 30);
    })
})