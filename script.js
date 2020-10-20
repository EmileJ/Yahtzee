var gooi = document.getElementById("gooi");
var worpTabel = document.getElementById('worp').cells;
var part1 = document.getElementById("part1");
var part2 = document.getElementById("part2");
var p1points = document.getElementById('pointsPart1');
var p1TotalPoints = document.getElementById('totalPointsPart1');
var throws = 0;

gooi.addEventListener("click",(target)=>{
    var worpen = [];
    var pointsPart1 = 0;
    var totalPointsPart1 = 0;
    var points = 0;

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
        let score = eye*count;
        part1.rows[eye-1].cells[2+throws].innerHTML = score;
        if(count == 1){
            uniqueEyes++;
        }else if(count == 3){
            specialScore["threeOfAKind"] = pointsPart1;
        }else if(count == 4){
            specialScore["fourOfAKind"] = pointsPart1;
        }else if(count == 5){
            specialScore["yahtzee"] = 50;
        }
        if(uniqueEyes == 5){
            specialScore["largeSraight"] = 40;
        }
        if(uniqueEyes == 3 && true){
            specialScore["smallStraight"] = 30;
        }
    }

    specialScore["chance"] = pointsPart1;

    for(var i = 0; i<specialScoreKeys.length;i++){
        part2.rows[i].cells[2+throws].innerHTML = specialScore[specialScoreKeys[i]];
    }

    /* Debug */
    console.log(Math.max(...worpen));
    console.log(Math.min(...worpen));
    console.log("##################");

    p1points.innerHTML = pointsPart1;
    totalPointsPart1 = pointsPart1;

    if(pointsPart1 >= 63){
        totalPointsPart1 += 35;
    }

    p1TotalPoints.innerHTML = totalPointsPart1;
})

