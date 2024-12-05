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
                var corAns = structuredClone(questData["corAns"]);
                var qVal = structuredClone(questData["qVal"]);
                delete questData["corAns"];
                delete questData["qVal"];

                for (let i = 0; i < Object.keys(qVal); i++) {
                    const qKey = Object.keys(qVal)[i];
                    questData["qPrompt"] = questData["qPrompt"].replace(qKey, getRandomEntry(qVal[qKey], seed));
                }

                questData["seed"] = seed;
                
                questData["ans"] = corAns;

                shuffleArray(questData["ans"], seed);
                
                return questData;
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
        const seed = questAnswered["seed"];
        switch(oldQuestData["qType"]){
            case "ans-mc":
                var selAns = structuredClone(questAnswered["selAns"]);
                var corAns = structuredClone(oldQuestData["corAns"]);

                const ansmcsol = getRandomEntry(corAns, seed);

                return {
                    passed: ansmcsol == selAns,
                    corAns: ansmcsol
                };
                break;
            case "pair-mc":
                var selAns = structuredClone(questAnswered["selAns"]);
                var corAns = structuredClone(oldQuestData["corAns"]);
                
                const pairmcsol = getRandomEntry(corAns, seed);

                return {
                    passed: pairmcsol == selAns,
                    corAns: pairmcsol
                };
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