var currentGame = 1;
var currentTurn = 1;
var currentThrow = 1;

const throwBtn = document.getElementById("btn");
const fillBtn = document.getElementById("btnFill");
const dices = document.getElementsByClassName("dice");
const tds = document.getElementsByTagName('td');

var currentGameReg = new RegExp(`[A-z]+[${currentGame}]`);
var tmpLockedReg = new RegExp("tmpLocked");

for(var td of tds){
    if(currentGameReg.test(td.id)){
        document.getElementById(td.id).addEventListener("click",(event)=>{
            if(tmpLockedReg.test(event.target.className)){
                event.target.classList.remove("tmpLocked");
            }else{
                event.target.classList.add("tmpLocked");
            }
        })
    }
}

for (var dice of dices){
    dice.addEventListener("click", (event)=>{console.log(event.target)})
}

throwBtn.addEventListener("click", (target)=>{
    const currentPoints = ThrowDice(currentGame);
    FillPoints(currentPoints);
})

fillBtn.addEventListener("click", (target)=>{
    let tmps = document.getElementsByClassName("tmpLocked");
    console.log(tmps);
    if(tmps.length == 1 ){
        tmps[0].classList.add("locked");
        tmps[0].classList.remove("tmpLocked");
    }else{
        alert("selecteer maximaal 1 veld om deze score vast te zetten");
    }
})

const diceChars = {
    1:'&#x2680;',
    2:'&#x2681;',
    3:'&#x2682;',
    4:'&#x2683;',
    5:'&#x2684;',
    6:'&#x2685;',
}

const scoreTable = {
    1: document.getElementById(`aces${currentGame}`),
    2: document.getElementById(`twos${currentGame}`),
    3: document.getElementById(`threes${currentGame}`),
    4: document.getElementById(`fours${currentGame}`),
    5: document.getElementById(`fives${currentGame}`),
    6: document.getElementById(`sixes${currentGame}`),
    7: document.getElementById(`threeOfKind${currentGame}`),
    8: document.getElementById(`fourOfKind${currentGame}`),
    9: document.getElementById(`fullHouse${currentGame}`),
    10: document.getElementById(`smStraight${currentGame}`),
    11: document.getElementById(`lgStraight${currentGame}`),
    12: document.getElementById(`yahtzee${currentGame}`),
    13: document.getElementById(`chance${currentGame}`)
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

const nameTable = {
    aces:1,
    twos:2,
    threes:3,
    fours:4,
    fives:5,
    sixes:6,
    threeOfAKind: 7,
    fourOfAKind: 8,
    fullHouse: 9,
    smStreet: 10,
    lgStreet: 11,
    yahtzee: 12,
    chance: 13
}

function ThrowDice(game) {
    var throws = [];

    const throwPoints = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    };

    for (i = 0; i < 5; i++) {
        var dice = Math.floor(Math.random() * 6) + 1;
        if (true) {
            throws[i] = dice;
            throwPoints[dice]++;
        }
    }

    console.log(throws);

    for (i = 0; i < 5; i++) {
        document.getElementById(`dice${i + 1}`).innerHTML = diceChars[throws[i]];
    }

    const out = {
        array: throws,
        obj: throwPoints
    };

    return out;
}

function FillPoints(currentThrow) {
    let total = 0;

    for(const value of Object.values(nameTable)){
        scoreTable[value].innerText = score[value];
    }

    let testscore = currentThrow.array.reduce((a,b)=> a+b,0);

    let highestCount = Math.max(...Object.values(currentThrow.obj));
    let lowestCount = Math.min(...Object.values(currentThrow.obj));

    for (const [key, value] of Object.entries(currentThrow.obj)) {
        let score = value * key;
        scoreTable[key].innerText = score;
    }

    // document.getElementById(`upperScore${currentGame}`).innerText = total;
    // upperTotal = total;
    // if (total >= 63) {
    //     document.getElementById(`bonus${currentGame}`).innerText = 35;
    //     upperTotal += 35;
    // } else {
    //     document.getElementById(`bonus${currentGame}`).innerText = 0;
    // }


    switch (highestCount) {
        case 1:
            scoreTable[nameTable.lgStreet].innerText = 40;
            break;
        case 2:
            if (SmallStraight(currentThrow.array) && getKeyByValue(currentThrow.obj,highestCount).length <2) {
                scoreTable[nameTable.smStreet].innerText = 30;
            }
            break;
        case 3:
            if (lowestCount == 2) {
                scoreTable[nameTable.fullHouse].innerText = 25;
            } else {
                scoreTable[nameTable.threeOfAKind].innerText = testscore;
            }
            break;
        case 4:
            scoreTable[nameTable.fourOfAKind].innerText = testscore;
            break;
        case 5:
            scoreTable[nameTable.yahtzee].innerText = 50;
            break;
        default:
            break;
    }
}

function FillScore(scores){

}

//klopt nog niet?
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

{
    // var pointsPart1 = 0;
    // var totalPointsPart1 = 0;
    // var highestCount = 0;

    // var specialScore = {
    //     threeOfAKind:0,
    //     fourOfAKind:0,
    //     fullHouse:0,
    //     smallStraight:0,
    //     largeSraight:0,
    //     yahtzee:0,
    //     chance:0
    // }

    // pointsPart1 = Object.values(worpen).reduce((a,b) => {return a+b;},0);
    // const worpOgenEntries = Object.entries(worpOgen);
    // const specialScoreKeys = Object.keys(specialScore);

    // let uniqueEyes = 0;
    
    // for(const [eye,count] of worpOgenEntries){
    //     if(count>highestCount) highestCount = count;
    //     let score = eye*count;
    //     if(count > 0){
    //         uniqueEyes++;
    //     }
    //     if(count == 3){
    //         specialScore["threeOfAKind"] = pointsPart1;
    //     }else if(count == 4){
    //         specialScore["fourOfAKind"] = pointsPart1;
    //     }else if(count == 5){
    //         specialScore["yahtzee"] = 50;
    //     }
    // }

    // if(uniqueEyes == 2 && highestCount == 3){
    //     specialScore["fullHouse"] = 25;
    // }else if(uniqueEyes == 4){
    //     if(CheckStraight(worpen)){
    //         specialScore["smallStraight"] = 30;
    //     }
    // }else if(uniqueEyes == 5){
    //     specialScore["largeSraight"] = 40;
    // }

    // specialScore["chance"] = pointsPart1;

    // for(var i = 0; i<specialScoreKeys.length;i++){
    //     part2.rows[i].cells[2+throws].innerHTML = specialScore[specialScoreKeys[i]];
    // }

    // total.innerHTML = pointsPart1;
    // totalPointsPart1 = pointsPart1;

    // if(pointsPart1 >= 63){
    //     totalPointsPart1 += 35;
    // }

    // upperTotal.innerHTML = totalPointsPart1;
}
