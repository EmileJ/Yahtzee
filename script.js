var throwBtn = document.getElementById("btn");

const dices = {
    1:'&#x2680;',
    2:'&#x2681;',
    3:'&#x2682;',
    4:'&#x2683;',
    5:'&#x2684;',
    6:'&#x2685;',
}

var currentGame = 1;

const upperScoreTable = {
    1: document.getElementById(`aces${currentGame}`),
    2: document.getElementById(`twos${currentGame}`),
    3: document.getElementById(`threes${currentGame}`),
    4: document.getElementById(`fours${currentGame}`),
    5: document.getElementById(`fives${currentGame}`),
    6: document.getElementById(`sixes${currentGame}`)
}

throwBtn.addEventListener("click",(target)=>{
    const currentThrow = ThrowDice(currentGame);
    FillScore(currentThrow);
})

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
        document.getElementById(`dice${i + 1}`).innerHTML = dices[throws[i]];
    }

    const out = {
        array: throws,
        obj: throwPoints
    };

    return out;
}

function FillScore(currentThrow) {
    let total = 0;
    let upperTotal = 0;

    let highestCount = Math.max(...Object.values(currentThrow.obj));
    let lowestCount = Math.min(...Object.values(currentThrow.obj));

    for (const [key, value] of Object.entries(currentThrow.obj)) {
        let score = value * key;
        upperScoreTable[key].innerHTML = score;
        total += score;
    }

    document.getElementById(`upperScore${currentGame}`).innerText = total;
    upperTotal = total;
    if (total >= 63) {
        document.getElementById(`bonus${currentGame}`).innerText = 35;
        upperTotal += 35;
    } else {
        document.getElementById(`bonus${currentGame}`).innerText = 0;
    }

    document.getElementById(`totalUpperScore${currentGame}`).innerText = upperTotal;



    switch (highestCount) {
        case 1:
            document.getElementById(`lgStraight${currentGame}`).innerText = 40;
            break;
        case 2:
            if (SmallStraight(currentThrow.array) && getKeyByValue(currentThrow.obj,highestCount).length <2) {
                document.getElementById(`smStraight${currentGame}`).innerText = 30;
            }
            break;
        case 3:
            /* threekind || if(lowestkind == 2) fullhouse */
            if (lowestCount == 2) {
                document.getElementById(`fullHouse${currentGame}`).innerText = 25;
            } else {
                document.getElementById(`threeOfKind${currentGame}`).innerText = total;
            }
            break;
        case 4:
            document.getElementById(`fourOfKind${currentGame}`).innerText = total;
            break;
        case 5:
            document.getElementById(`yahtzee${currentGame}`).innerText = 50;
            break;
        default:
    }
}

//klopt nog niet
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
