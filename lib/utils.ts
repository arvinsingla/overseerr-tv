export function trunc(str: string, length: number, elipses: boolean = false): string {
    if (str.length > length) {
        if (elipses) {
            return str.slice(0, length - 3) + '...'
        }
        return str.slice(0, length)
    }
    return str
}

export function formatDollars(dollars: number) {
    var dollarsStr = dollars.toString();
    var result = '';
    var length = dollarsStr.length;
    var count = 0;

    for (var i = length - 1; i >= 0; i--) {
        result = dollarsStr[i] + result;
        count++;
        if (count % 3 === 0 && i !== 0) {
            result = ',' + result;
        }
    }

    return '$' + result;
}