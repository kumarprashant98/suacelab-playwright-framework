export class PlayWrightHelper{

 /**
   * Generates a random alphanumeric string of the specified length.
   * 
   * @param numberOfCharacters - The number of characters in the generated string.
   * @returns - The random alphanumeric string.
   */    
getAlphabeticString(numberOfCharacters:number){
    const alphanumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvxyz";
    
    let randomString = " ";
    for (let i=0; i< numberOfCharacters; i++){
    const index = Math.floor(Math.random()* alphanumericString.length);
    randomString += alphanumericString.charAt(index);
    }
    return randomString;
}

/**
   * Generates a random alphanumeric string of the specified length.
   * 
   * @param numberOfCharacters - The number of characters in the generated string.
   * @returns - The random alphanumeric string.
   */    
getRandomStringFromList<T>(List:T[]){

    const randomIndex = Math.floor(Math.random()* List.length);
    return List[randomIndex];
}

/**
   * Generates a random alphanumeric string of the specified length.
   * 
   * @param numberOfValue - The number of characters in the generated string.
   * @returns - The random alphanumeric string.
   */  
getRandomNumber(min: number = 1, max: number = 100): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
}