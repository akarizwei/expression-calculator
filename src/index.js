function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expression) {
    while (expression.match(/[\(,\))]/)) {
        let pre = expression;
        expression = expression.replace(/\([^()]+?\)/g, calc);
        if (pre === expression) throw new Error('ExpressionError: Brackets must be paired');
    }
    return Number(calc(expression));
}

function calc(string) {
    let arr = string.match(/((?<!\d\s?)-?)\d+\.?\d*|[*/+-]/g),
        calcArr = [],
        result;

    for (let i = 0; i < arr.length; i++) {
        let index = arr[i],
            prevIndex = calcArr[calcArr.length - 1];
        if (['*', '/'].includes(index)) {
            if (index == '*') {
                result = prevIndex * arr[i + 1]
            } else {
                result = prevIndex / arr[i + 1]
            }
            if (Math.abs(result) === Infinity) throw new Error("TypeError: Division by zero.");
            calcArr.pop();
            calcArr.push(result);
            i++;
        } else {
            calcArr.push(index);
        }
    }

    arr = [...calcArr];
    calcArr = [];

    for (let i = 0; i < arr.length; i++) {
        let index = arr[i],
         prevIndex = calcArr[calcArr.length - 1];
        if (['+', '-'].includes(index)) {
            prevIndex = prevIndex || '0';
            let result;
            if (index == '+') {
                result = Number(prevIndex) + Number(arr[i + 1])
            } else {
                result = Number(prevIndex) - Number(arr[i + 1])
            }
            calcArr.pop();
            calcArr.push(result);
            i++;
        } else {
            calcArr.push(index);
        }
    }
    return calcArr.toString();
}

module.exports = {
    expressionCalculator
}