var gameNumber = 1;
var turnNumber = 1;
var throwNumber = 0;

const diceChars = {
    1:'&#x2680;',
    2:'&#x2681;',
    3:'&#x2682;',
    4:'&#x2683;',
    5:'&#x2684;',
    6:'&#x2685;',
}

const scoreTable = {
    1: document.getElementById(`aces${gameNumber}`),
    2: document.getElementById(`twos${gameNumber}`),
    3: document.getElementById(`threes${gameNumber}`),
    4: document.getElementById(`fours${gameNumber}`),
    5: document.getElementById(`fives${gameNumber}`),
    6: document.getElementById(`sixes${gameNumber}`),
    7: document.getElementById(`threeOfKind${gameNumber}`),
    8: document.getElementById(`fourOfKind${gameNumber}`),
    9: document.getElementById(`fullHouse${gameNumber}`),
    10: document.getElementById(`smStraight${gameNumber}`),
    11: document.getElementById(`lgStraight${gameNumber}`),
    12: document.getElementById(`yahtzee${gameNumber}`),
    13: document.getElementById(`chance${gameNumber}`)
}

const score = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0
}

const lockedScore = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0
}

const nameTable = {
    aces:1,
    twos:2,
    threes:3,
    fours:4,
    fives:5,
    sixes:6,
    threeOfKind: 7,
    fourOfKind: 8,
    fullHouse: 9,
    smStraight: 10,
    lgStraight: 11,
    yahtzee: 12,
    chance: 13
}

var throws = [];

const throwBtn = document.getElementById("btn");
const fillBtn = document.getElementById("btnFill");
const dices = document.getElementsByClassName("dice");
const tds = document.getElementsByTagName('td');

var currentGameReg = new RegExp(`[A-z]+[${gameNumber}]`);
var tmpLockedReg = new RegExp("tmpLocked");

for(var td of tds){
    if(currentGameReg.test(td.id)){ //validation
        document.getElementById(td.id).addEventListener("click",(event)=>{
            var lockedClass = document.getElementsByClassName("tmpLocked");
            if(event.target.classList.contains("tmpLocked")){
                event.target.classList.remove("tmpLocked");
            }else if(lockedClass.length > 0){
                for (let i = 0; i < lockedClass.length; i++) {
                    lockedClass[i].classList.remove("tmpLocked");

                }
                event.target.classList.toggle("tmpLocked");
            }else{
                event.target.classList.add("tmpLocked");
            }
        })
    }
}

for (var dice of dices){
    dice.addEventListener("click", (event)=>{
        event.target.classList.toggle("lockedDice")
    })
}

throwBtn.addEventListener("click", (target)=>{
    let tmpLock = document.getElementsByClassName("tmpLocked");
    if(tmpLock.length == 1 && throwNumber > 0){
        tmpLock[0].classList.add("locked");
        tmpLock[0].classList.remove("tmpLocked");
        FillScore();
        startThrowing();
        const currentPoints = ThrowDice(gameNumber);
        throwNumber++;
        FillPoints(currentPoints);
    }else if(throwNumber == 3){
        alert("selecteer een score om vast te houden");
    }else if(tmpLock.length >0 && throwNumber == 0){
        alert("Nog niet gegooit deze beurt, maar wel een veld gevonden om de score vast te houden. \n\rVelden gewist");
        tmpLock[0].classList.remove("tmpLocked");
    }else{
        const currentPoints = ThrowDice(gameNumber);
        throwNumber++;
        FillPoints(currentPoints);
    }
    console.log("Worp nummer: "+throwNumber.toString());
})

// fillBtn.addEventListener("click", (target)=>{
//     let tmps = document.getElementsByClassName("tmpLocked");
//     //console.log(tmps);
//     if(tmps.length == 1){
//         tmps[0].classList.add("locked");
//         tmps[0].classList.remove("tmpLocked");
//     }else{
//         alert("selecteer maximaal 1 veld om deze score vast te zetten");
//     }
// })

function ThrowDice(game) {
    let skip = [];

    for(let i =0; i < dices.length; i++){
        if(dices[i].classList.contains("lockedDice")){
            skip.push(i);
        }
    }

    for (i = 0; i < 5; i++) {
        var dice = Math.floor(Math.random() * 6) + 1;
        if (!skip.includes(i)) {
            throws[i] = dice;
        }
    }

    console.log("Geworpen dobbelstenen:");
    console.log(throws);
    console.log();

    for (i = 0; i < 5; i++) {
        document.getElementById(`dice${i + 1}`).innerHTML = diceChars[throws[i]];
    }

    return throws;
}

function FillPoints(currentThrow) {
    const throwPoints = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    };

    for (i = 0; i < 5; i++) {
        throwPoints[currentThrow[i]]++;
    }

    let total = 0;

    for(const value of Object.values(nameTable)){
        scoreTable[value].innerText = lockedScore[value];
    }

    let testscore = currentThrow.reduce((a,b)=> a+b,0);

    let highestCount = Math.max(...Object.values(throwPoints));
    let lowestCount = 5;

    for (const [key, value] of Object.entries(throwPoints)) {
        let score = value * key;
        if(value > 0 && value < lowestCount){
            lowestCount = value;
        }
        if(!scoreTable[key].classList.contains("locked")){
            scoreTable[key].innerText = score;
        }
    }

    switch (highestCount) {
        case 1:
            if(!scoreTable[nameTable.lgStraight].classList.contains("locked")){
                scoreTable[nameTable.lgStraight].innerText = 40;
            }
            break;
        case 2:
            if(!scoreTable[nameTable.smStraight].classList.contains("locked")){
                if (SmallStraight(currentThrow) && getKeyByValue(throwPoints,highestCount).length <2) {
                    scoreTable[nameTable.smStraight].innerText = 30;
                }
            }
            break;
        case 3:
            if (lowestCount == 2) {
                if(!scoreTable[nameTable.fullHouse].classList.contains("locked")){
                    scoreTable[nameTable.fullHouse].innerText = 25;
                }
            } else {
                if(!scoreTable[nameTable.threeOfKind].classList.contains("locked")){
                    scoreTable[nameTable.threeOfKind].innerText = testscore;
                }
            }
            break;
        case 4:
            if(!scoreTable[nameTable.fourOfKind].classList.contains("locked")){
                scoreTable[nameTable.fourOfKind].innerText = testscore;
            }
            break;
        case 5:
            if(!scoreTable[nameTable.yahtzee].classList.contains("locked")){
                scoreTable[nameTable.yahtzee].innerText = 50;
            }
            break;
        default:
            break;
    }
}

function FillScore(scores){
    let lockedFields = document.getElementsByClassName("locked");
    for(let field of lockedFields){
        let name = field.id;
        name = name.slice(0,-1);
        console.log();
        console.log(name);
        console.log(nameTable[name]);
        console.log();
        lockedScore[nameTable[name]] = field.innerText;
    }
    console.log(lockedFields);
    console.log();
    console.log(lockedScore);
}

function startThrowing(){
    throwNumber = 0;
    for(let dice of dices){
        dice.classList.remove("lockedDice");
    }
}

function SmallStraight(val) {
    if (Array.isArray(val) && val.length == 5) {
        var min = Math.min(...val);
        var max = Math.max(...val);

        if (min + 3 == max)
            return true;
        else if (min == 1 && max == 6) {
            if (val.includes(min + 1) && val.includes(max - 1)) {
                return true;
            } else if (val.includes(min + 1) && val.includes(min + 2)) {
                return true;
            } else if (val.includes(max - 1) && val.includes(max - 2)) {
                return true;
            } else {
                return false;
            }
        } else
            return false;
    }
}

function getKeyByValue(object, value) {
    return Object.keys(object).filter(key => object[key] === value);
}
