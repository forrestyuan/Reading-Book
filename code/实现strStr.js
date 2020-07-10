/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if(haystack.length == 0 && needle.length != 0) return -1;
    if(haystack.length < needle.length) return -1;
    var offset = 0; //needle的滑动指针
    for(var i = 0; i < haystack.length; i++ ){
        //console.log("offset:("+ offset+")==>("+needle.charAt(offset) + ")  i:("+i+")==>("+haystack.charAt(i)+")");
        //判断haystack下标为i出的字符是否等于needle下标为offset的字符。
        if(needle.charAt(offset) == haystack.charAt(i)){ 
            offset++;   //needle的滑动指针滑向needle下一个字符，准备和下一个索引i出的字符比较
            if(offset >= needle.length){ //如果needle的滑动指针滑向needle下一个字符之后，超出了needle的长度，那么说明匹配成功
                offset = i - needle.length + 1; // offset 此时作为找到的起始下标的储存器。
                break;  // 退出循环
            }
            //如果needle还没走完，但是haystack已经走完了。很明显，匹配失败，直接返回 -1
            if(i + 1 >= haystack.length){
                return -1;
            }
        }else{   //haystack下标为i出的字符不等于needle下标为offset的字符。
            // 如果offset滑动指针都还没有在haystack中滑动过，而此时haystack中剩余的字符串长度已经不足以匹配完needle，那么，匹配失败，返回-1.
            if(offset == 0 && (i + needle.length >= haystack.length)){
                offset = -1; 
                break;
            }else{  // 否则，只是单纯字符不等，那么，i下标返回此轮匹配的开始字符的下一个字符，重新进行匹配。
                i = i - offset;
                offset = 0;
            }
        }
    }
    //最后返回offset, 这里的offset已经变成了结果储存器。
    return offset;
};

作者：forrestyuan
链接：https://leetcode-cn.com/problems/implement-strstr/solution/shi-xian-strstr-kmp-by-forrestyuan/
来源：力扣（LeetCode）
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。