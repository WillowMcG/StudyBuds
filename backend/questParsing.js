var seedrandom = require('seedrandom');

function getRandomEntry(array, setSeed) {
    const rng = seedrandom(setSeed);
    const index =  Math.floor(rng() * (array.length-1));
    const selectedEntry = array[index]
    array.splice(index, 1);
    return selectedEntry;
}

function shuffleArray(array, setSeed) {
    const rng = seedrandom(setSeed);
    for (let firsti = array.length - 1; firsti > 0; firsti--) {
        let otheri = Math.floor(rng() * firsti);
        [array[firsti], array[otheri]] = [array[otheri], array[firsti]];
    }

}

module.exports = {
    generateQuestion(questData, seed=Date.now()) {
        switch(questData["qType"]){
            case "ans-mc":
                var corAns = structuredClone(questData["corAns"]);
                var incAns = structuredClone(questData["incAns"]);
                delete questData["corAns"];
                delete questData["incAns"];

                questData["seed"] = seed;
                
                questData["ans"] = [];

                questData["ans"].push(
                    getRandomEntry(corAns, seed), 
                    getRandomEntry(incAns, seed+1), 
                    getRandomEntry(incAns, seed+2), 
                    getRandomEntry(incAns, seed+3));

                shuffleArray(questData["ans"], seed);
                
                return questData;
                break;
            case "pair-mc":
                // NOT YET IMPLEMENTED
                break;
            case "pair-ti":
                // NOT YET IMPLEMENTED
                break;
            case "random-mc":
                // NOT YET IMPLEMENTED
                break;
            case "random-ti":
                // NOT YET IMPLEMENTED
                break;
            case "spec-mc":
                // NOT YET IMPLEMENTED
                break;
            case "pair-gv":
                // NOT YET IMPLEMENTED
                break;
            case "multispec-mc":
                // NOT YET IMPLEMENTED
                break;
            default:
                return ["hello world!"];
                break;
        }
    },

    checkQuestion(oldQuestData, questAnswered) {
        switch(oldQuestData["qType"]){
            case "ans-mc":
                var selAns = structuredClone(questAnswered["selAns"]);
                var corAns = structuredClone(oldQuestData["corAns"]);

                const seed = questAnswered["seed"];

                const theAns = getRandomEntry(corAns, seed);

                return {
                    passed: theAns == selAns,
                    corAns: theAns
                };
                break;
            case "pair-mc":
                // NOT YET IMPLEMENTED
                break;
            case "pair-ti":
                // NOT YET IMPLEMENTED
                break;
            case "random-mc":
                // NOT YET IMPLEMENTED
                break;
            case "random-ti":
                // NOT YET IMPLEMENTED
                break;
            case "spec-mc":
                // NOT YET IMPLEMENTED
                break;
            case "pair-gv":
                // NOT YET IMPLEMENTED
                break;
            case "multispec-mc":
                // NOT YET IMPLEMENTED
                break;
            default:
                return ["hello world!"];
                break;
        }
    }
 };