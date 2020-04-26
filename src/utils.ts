export const isOdd = item => item % 2 === 0;
export const subLog = (type) => ({
    next: value => console.log(`[${type}] next: `, value),
    error: value => console.log(`[${type}] error: `, value),
    complete: () => console.log(`[${type}] complete`)
})
