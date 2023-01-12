export const onChangedNumber = (text: string) => {
    let newText = '';
    let numbers = '0123456789';
    for (var i = 0; i < text.length; i++) {
        if (numbers.indexOf(text[i]) > -1) {
            newText = newText + text[i];
        }
    }
    return newText
}

export const onlyAlphabetNumeric = (text: string) => {
    let newText = '';
    newText = text.replace(/[^A-Za-z0-9]/gi, '')
    return newText
}