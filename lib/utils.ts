export function trunc(str: string, length: number, elipses: boolean = false): string {
    if (str.length > length) {
        if (elipses) {
            return str.slice(0, length - 3) + '...'
        }
        return str.slice(0, length)
    }
    return str
}