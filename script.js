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
    
    for(i=0;i<6;i++){
        var points = worpOgen[i+1]*(i+1);
        part1.rows[i].cells[2].innerHTML = points;
        pointsPart1 += points;
    }

    p1points.innerHTML = pointsPart1;
    totalPointsPart1 = pointsPart1;

    if(pointsPart1 >= 63){
        totalPointsPart1 += 35;
    }

    p1TotalPoints.innerHTML = totalPointsPart1;
})