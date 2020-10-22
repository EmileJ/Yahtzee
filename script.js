var gooi = document.getElementById("btn");
var worpTabel = document.getElementById('worp').cells;
var part1 = document.getElementById("part1");
var part2 = document.getElementById("part2");
var total = document.getElementById('total');
var upperTotal = document.getElementById('upperTotal');
var throws = 0;

gooi.addEventListener("click",(target)=>{
    var worpen = [];
    var pointsPart1 = 0;
    var totalPointsPart1 = 0;
    var highestCount = 0;

    var specialScore = {
        threeOfAKind:0,
        fourOfAKind:0,
        fullHouse:0,
        smallStraight:0,
        largeSraight:0,
        yahtzee:0,
        chance:0
    }

    const worpOgen = {
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0
    }

    for(i=0;i<5;i++){
        var worp = Math.floor(Math.random() * 6)+1;
        if(!worpTabel[i].classList.contains("tmpLocked")){
            worpTabel[i].innerHTML = worp;
            worpen[i] = worp;
            worpOgen[worp]++;
        }
    }

    pointsPart1 = Object.values(worpen).reduce((a,b) => {return a+b;},0);
    const worpOgenEntries = Object.entries(worpOgen);
    const specialScoreKeys = Object.keys(specialScore);

    let uniqueEyes = 0;
    
    for(const [eye,count] of worpOgenEntries){
        if(count>highestCount) highestCount = count;
        let score = eye*count;
        if(count > 0){
            uniqueEyes++;
        }
        if(count == 3){
            specialScore["threeOfAKind"] = pointsPart1;
        }else if(count == 4){
            specialScore["fourOfAKind"] = pointsPart1;
        }else if(count == 5){
            specialScore["yahtzee"] = 50;
        }
    }

    if(uniqueEyes == 2 && highestCount == 3){
        specialScore["fullHouse"] = 25;
    }else if(uniqueEyes == 4){
        if(CheckStrait(worpen)){
            specialScore["smallStraight"] = 30;
        }
    }else if(uniqueEyes == 5){
        specialScore["largeSraight"] = 40;
    }

    specialScore["chance"] = pointsPart1;

    for(var i = 0; i<specialScoreKeys.length;i++){
        part2.rows[i].cells[2+throws].innerHTML = specialScore[specialScoreKeys[i]];
    }

    total.innerHTML = pointsPart1;
    totalPointsPart1 = pointsPart1;

    if(pointsPart1 >= 63){
        totalPointsPart1 += 35;
    }

    upperTotal.innerHTML = totalPointsPart1;
})

var CheckStrait = (val) =>{
    if(Array.isArray(val) && val.length == 5){
        var min = Math.min(...val);
        var max = Math.max(...val);

        if(min+3==max) return true;
        else if(min==1&&max==6){
            if(val.includes(min+1)&&val.includes(max-1)){
                return true;
            }else if(val.includes(min+1)&&val.includes(min+2)) {
                return true;
            }else if(val.includes(max-1)&&val.includes(max-2)) {
                return true;
            }else{
                return false;
            }
        }else return false;
    }
}



