/**
 * @param {string[]} strs
 * @return {string}
 */
//方法一， 纵向比较，O(nm),n 数组长度，m最小字符串长度
var longestCommonPrefix = function(strs) {
    if(!strs||strs.length == 0 ){
        return "";
    }
    var str_min_len = Number.MAX_VALUE;
    var str_shorter = '';
    for(var i = 0; i < strs.length; i++){
        if(str_min_len > strs[i].length){
            str_min_len = strs[i].length;
            str_shorter = strs[i];
        }
    }
    for(var j = 0; j < str_min_len; j++){
        var chr = str_shorter.charAt(j);
        for(var k = 0; k < strs.length; k++){
            if(strs[k] == str_shorter) continue;
            if(chr != strs[k].charAt(j)) return str_shorter.substring(0,j);
        }   
    }
    return str_shorter;
};

//方法二： 字典树