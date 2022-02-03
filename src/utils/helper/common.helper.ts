export const idGenerate = (uppercaseLength = 2, lowercaseLength = 4) => {
    const lettersUppercase = "ABCDEFGHIJKLMNOPQRSTUFWXYZ";
    const lengthLetters = lettersUppercase.length;
    const numbersLowercase = "0123456789";
    const lengthNumbers = numbersLowercase.length;
    const possibleIndexLetters = parseInt((Math.random() * lengthLetters).toFixed(0));
    const possibleIndexNumbers = parseInt((Math.random() * lengthNumbers).toFixed(0));
    let generatedId = "";
    
    for(let i = 0; i < uppercaseLength; i++) {
        generatedId += lettersUppercase[possibleIndexLetters];
    }

    for(let i = 0; i < lowercaseLength; i++) {
        generatedId += numbersLowercase[possibleIndexNumbers];
    }
    
    return generatedId;
}