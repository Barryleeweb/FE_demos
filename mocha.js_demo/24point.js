function searchExpression(dest, numbers) {
    if (!numbers) return;
    var precision = 1e-6; // 精度
    var dict = {};        // 判断表达式是否相同，去重输入数字相同的时候
	var n = numbers.length;
    
    function search(numbers, expressions, level, dest, outputs) {
        var result;
        // 判断还剩最后一个数时且和为dest时，输出表达式
        if ((level <= 1) && (Math.abs(numbers[0] - dest) <= precision)) {    
            !dict[expressions[0]] && outputs.push(expressions[0].substring(1,expressions[0].length-1)+"="+dest);
            dict[expressions[0]] = true;
            return true;
        }
        for (var i = 0; i < level; i++) {       // 取数组中两个数字的排列
            for (var j = i + 1; j < level; j++) {
			
                var A = numbers[i];
                var B = numbers[j];
                numbers[j] = numbers[level - 1];  //递归之后，level比以前小一位，所以可以不停向前赋值 
				
                var vExpA = expressions[i];
                var vExpB = expressions[j];
                expressions[j] = expressions[level - 1];//递归之后，level比以前小一位，所以可以不停向前赋值  
			
                expressions[i] = '(' + vExpA + '+' + vExpB + ')';//加法不需要分顺序
                numbers[i] = A + B;				
				if((typeof vExpB) == 'number'){ //去重，判断当vExpB为数字不为有括号的表达式时，执行search
					if (search(numbers, expressions,
	                    level - 1, dest, outputs)) {result = true;}
				}
					
                expressions[i] = '(' + vExpA + '-' + vExpB + ')';//减法应该分顺序，减数以及被减数 
                numbers[i] = A - B;
                if (search(numbers, expressions,
                    level - 1, dest, outputs)) result = true;
					
                expressions[i] = '(' + vExpB + '-' + vExpA + ')';//减法应该分顺序，减数以及被减数 
                numbers[i] = B - A;
                if (search(numbers, expressions,
                    level - 1, dest, outputs)) result = true;
					
                expressions[i] = '(' + vExpA + '*' + vExpB + ')';//乘法不需要分顺序
                numbers[i] = A * B;
				if((typeof vExpB) == 'number'){   //去重，判断当vExpB为数字不为有括号的表达式时，执行search
	                if (search(numbers, expressions,
	                    level - 1, dest, outputs))
						{result = true;}
				}

                if (B != 0) {
                    expressions[i] = '(' + vExpA + '/' + vExpB + ')';//除法应该分顺序，除数以及被除数  
                    numbers[i] = A / B;
                    if (search(numbers, expressions,
                        level - 1, dest, outputs)) result = true;
                }
                if (A != 0) {
                    expressions[i] = '(' + vExpB + '/' + vExpA + ')';//除法应该分顺序，除数以及被除数  
                    numbers[i] = B / A;
                    if (search(numbers, expressions,
                        level - 1, dest, outputs)) result = true;
                }
                numbers[i] = A;//递归的现场保护和恢复，也就是递归调用之前与之后，现场状态应该保持一致
                numbers[j] = B;
                expressions[i] = vExpA;
                expressions[j] = vExpB;
            }
        }
        return result;
    }
    
    if (typeof numbers == "string") {      //取出输入中的数字
        numbers = numbers.split(/[\s,;g]+/);
    }

    var expressions = [];   //表达式变量
    var outputs = [];
    for (var i = 0; i < numbers.length; i++) {
        numbers[i] = +numbers[i];
        expressions.push(numbers[i]);
    }
    search(numbers, expressions, numbers.length, dest, outputs); //执行函数
    if(outputs=="") {outputs=["无解"]};
    return outputs;
}

module.exports = searchExpression;
