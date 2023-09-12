export const paginatedArray = function(myArray, start, end) {
    return myArray.slice(start, end);
}

export const nbPages = function(myArray) {
    return Math.ceil(myArray.length / 10);
}