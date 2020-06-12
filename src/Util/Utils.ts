export function range(fromInclusive:number, toInclusive:number) : number[] {
    const arr : number[] = [];
    for (let i = fromInclusive; i <= toInclusive; i++) {
        arr.push(i)
    }
    return arr;
}