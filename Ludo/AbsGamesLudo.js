//var canvas=document.querySelector('canvas');
var canvas=document.getElementById('canvas');
var arrPosintion=[-1,-1,-1,-1,
                  -1,-1,-1,-1,
                  -1,-1,-1,-1,
                  -1,-1,-1,-1];
var validMove=[0,0,0,0,
               0,0,0,0,
               0,0,0,0,
               0,0,0,0];
var win=[0,0,0,0];
var turn=1;
var value=0;
var selected=-1;
var finalposition=-1;
var reverseSelected=-1;
var reverseValue=0;
var validValue=0;
var validSelected=0;
var checked=0;
var lastValue=1;
var k=0;
var turnPosible=0;
var turnChanged=0;

function loop(){
    //c.clearRect(0,0,accLen,accLen);
    requestAnimationFrame(loop);
    var accLen=0,x1=0,x2=0,y1=0,y2=0;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    if(canvas.width>canvas.height){
        accLen=window.innerHeight;
        x1=(window.innerWidth-window.innerHeight)/2;
        x2=x1+accLen;
    }else{
        accLen=window.innerWidth;
        y1=(window.innerHeight-window.innerWidth)/2;
        y2=y1+accLen;
    }

    var c = canvas.getContext('2d');
    var boxLen=2*accLen/5;
    var indLenLeave=accLen/5;
    var innerBoxLen=2*boxLen/3;
    var startBox=boxLen/6;
    var radius=innerBoxLen/8;
    var indLen=indLenLeave/3;

    boardCreate(c,boxLen,indLenLeave,innerBoxLen,startBox,radius,indLen,accLen,x1,y1);
    
    if(selected>=0&&selected<16&&validSelected===1&&validValue===1){
        if(value===0){
            circleCreate(c,x1,y1,accLen,boxLen,innerBoxLen,indLen,indLenLeave,radius,startBox);
            validValue=0;
            validSelected=0;
        }else{
            if(selected<4){
                if(arrPosintion[selected]==-1&&value==6){
                    arrPosintion[selected]=0;
                    value=0;
                }else if(arrPosintion[selected]<50){
                    value--;
                    arrPosintion[selected]++;
                }else if(arrPosintion[selected]==50){
                    value--;
                    arrPosintion[selected]=52;
                }else if(arrPosintion[selected]>50 && arrPosintion[selected]+value<58){
                    value--;
                    arrPosintion[selected]++;
                }
            }else if(selected<8){
                if(arrPosintion[selected]==-1&&value==6){
                    arrPosintion[selected]=13;
                    value=0;
                }else if(arrPosintion[selected]==11){
                    value--;
                    arrPosintion[selected]=58;
                }else if(arrPosintion[selected]<51){
                    value--;
                    arrPosintion[selected]++;
                }else if(arrPosintion[selected]==51){
                    value--;
                    arrPosintion[selected]=0;
                }else if(arrPosintion[selected]>=58 && arrPosintion[selected]+value<64){
                    value--;
                    arrPosintion[selected]++;
                }
            }else if(selected<12){
                if(arrPosintion[selected]==-1&&value==6){
                    arrPosintion[selected]=26;
                    value=0;
                }else if(arrPosintion[selected]==24){
                    value--;
                    arrPosintion[selected]=64;
                }else if(arrPosintion[selected]<51){
                    value--;
                    arrPosintion[selected]++;
                }else if(arrPosintion[selected]==51){
                    value--;
                    arrPosintion[selected]=0;
                }else if(arrPosintion[selected]>=64 && arrPosintion[selected]+value<70){
                    value--;
                    arrPosintion[selected]++;
                }
            }else if(selected<16){
                if(arrPosintion[selected]==-1&&value==6){
                    arrPosintion[selected]=39;
                    value=0;
                }else if(arrPosintion[selected]==37){
                    value--;
                    arrPosintion[selected]=70;
                }else if(arrPosintion[selected]<51){
                    value--;
                    arrPosintion[selected]++;
                }else if(arrPosintion[selected]==51){
                    value--;
                    arrPosintion[selected]=0;
                }else if(arrPosintion[selected]>=70 && arrPosintion[selected]+value<76){
                    value--;
                    arrPosintion[selected]++;
                }
            }
            circleCreate(c,x1,y1,accLen,boxLen,innerBoxLen,indLen,indLenLeave,radius,startBox);
            if(value===0){
                finalposition=arrPosintion[selected];
                var i=0;
                if(finalposition!=0&&finalposition!=8&&finalposition!=13&&finalposition!=21&&finalposition!=26&&
                   finalposition!=34&&finalposition!=39&&finalposition!=47){
                    for(i=0;i<16;i++){
                        if(Math.floor(i/4)==Math.floor(selected/4))
                            continue;
                        else{
                            if(finalposition===arrPosintion[i]){
                                reverseSelected=i;
                                reverseValue=-1*finalposition-1;
                                arrPosintion[i]=-1;
                            }
                        }
                    }
                }
                validValue=0;
                validSelected=0;
                /*for(var makingZero=0;makingZero<16;makingZero++){
                    validMove[makingZero]=0;
                }*/
            }
            /*for(var makingZero=0;makingZero<16;makingZero++){
                validMove[makingZero]=0;
            }*/
        }
    }else{
        if(validValue===0){
            canvas.addEventListener('mousedown',getValue,false);                
            function getValue(event){
                cx=event.pageX;
                cy=event.pageY;
                if(turn===1){
                    if(cx>x1 && cy>y1 && cx<x1+boxLen/4 && cy<y1+boxLen/4 && validValue===0){
                        value=Math.ceil(Math.random() * 6);
                        lastValue=value;
                        console.log(cx," ",cy," ",value," ",validValue);
                        validValue=1;
                    }
                }else if(turn===2){
                    if(cx>x1+accLen-boxLen/4 && cy>y1 && cx<x1+accLen && cy<y1+boxLen/4 && validValue===0){
                        value=Math.ceil(Math.random() * 6);
                        lastValue=value;
                        console.log(cx," ",cy," ",value," ",validValue);
                        validValue=1;
                    }
                }else if(turn===3){
                    if(cx>x1+accLen-boxLen/4 && cy>y1+accLen-boxLen/4 && cx<x1+accLen && cy<y1+accLen && validValue===0){
                        value=Math.ceil(Math.random() * 6);
                        lastValue=value;
                        console.log(cx," ",cy," ",value," ",validValue);
                        validValue=1;
                    }
                }else if(turn===4){
                    //console.log("come to do ",turn," ",cx," ",cy," \n");
                    if(cx>x1 && cy>y1+accLen-boxLen/4 && cx<x1+boxLen/4 && cy<y1+accLen && validValue===0){
                        value=Math.ceil(Math.random() * 6);
                        lastValue=value;
                        console.log(cx," ",cy," ",value," ",validValue);
                        validValue=1;
                    }
                }
                /*for(var makingZero=0;makingZero<16;makingZero++){
                    validMove[makingZero]=0;
                }*/
            }
            /*for(var makingZero=0;makingZero<16;makingZero++){
                validMove[makingZero]=0;
            }*/
        }else if(validSelected===0){
            //Math.floor()
            console.log("yes i'm here!\n");
            var j=0;
            if(checked===0){
                for(var makingZero=0;makingZero<16;makingZero++){
                    validMove[makingZero]=0;
                }
                console.log("coming!\n");
                k=0;
                if(turn===1){
                    console.log("coming 2!\n");
                    for(j=0;j<4;j++){
                        if(value!=6){
                            if(arrPosintion[j]==-1)
                                k++;
                            else if(arrPosintion[j]+value>57)
                                k++;
                            else
                                validMove[j]=1;
                        }else{
                            if(arrPosintion[j]+value>57)
                                k++;
                            else 
                                validMove[j]=1;
                        }
                    }
                }else if(turn===2){
                    for(j=4;j<8;j++){
                        if(value!=6){
                            if(arrPosintion[j]==-1)
                                k++;
                            else if(arrPosintion[j]+value>63)
                                k++;
                            else 
                                validMove[j]=1;
                        }else{
                            if(arrPosintion[j]+value>63)
                                k++;
                            else 
                                validMove[j]=1;
                        }
                    }
                }else if(turn===3){
                    for(j=8;j<12;j++){
                        if(value!=6){
                            if(arrPosintion[j]==-1)
                                k++;
                            else if(arrPosintion[j]+value>69)
                                k++;
                            else 
                                validMove[j]=1;
                        }else{
                            if(arrPosintion[j]+value>69)
                                k++;
                            else 
                                validMove[j]=1;
                        }
                    }
                }else if(turn===4){
                    for(j=12;j<16;j++){
                        if(value!=6){
                            if(arrPosintion[j]==-1)
                                k++;
                            else if(arrPosintion[j]+value>75)
                                k++;
                            else 
                                validMove[j]=1;
                        }else{
                            if(arrPosintion[j]+value>75)
                                k++;
                            else 
                                validMove[j]=1;
                        }
                    }
                }
                for(j=0;j<16;j++){
                    if(validMove[j]==1)
                        console.log(j," ");
                }
                console.log("\n");
            }
            if(k===4){
                console.log("yes i'm here 2! ",turn," \n");
                turnPosible=1;
                turnChange();
                validValue=0;
                validSelected=0;
                checked=0;
            }else{
                checked=1;
                canvas.addEventListener('mousedown',getSelected,false);
                function getSelected(event){
                    var cx1=event.pageX;
                    var cy1=event.pageY;
                    if(validSelected===0 && cx1>x1 && cy1>y1+boxLen && cx1<x1+boxLen && cy1<y1+accLen-boxLen){
                        var startInd1=y1+boxLen+indLen;
                        if(cy1<startInd1){
                            if(cx1<x1+indLen){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===51){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<x1+2*indLen){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===0){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<x1+3*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===1){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<x1+4*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===2){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<x1+5*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===3){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else {
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===4){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }
                        }else if(cy1<startInd1+indLen){
                            if(cx1<x1+indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===50){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<x1+2*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===52){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<x1+3*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===53){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<x1+4*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===54){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<x1+5*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===55){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else {
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===56){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }
                        }else {
                            if(cx1<x1+indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===49){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<x1+2*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===48){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<x1+3*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===47){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<x1+4*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===46){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<x1+5*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===45){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else {
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===44){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }
                        }
                    }else if(validSelected===0 && cx1>x1+boxLen && cy1>y1 && cx1<x1+accLen-boxLen && cy1<y1+boxLen){
                        var startInd1=x1+boxLen+indLen;
                        if(cx1<startInd1){
                            if(cy1<y1+indLen){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===10){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<y1+2*indLen){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===9){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<y1+3*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===8){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<y1+4*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===7){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<y1+5*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===6){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else {
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===5){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }
                        }else if(cx1<startInd1+indLen){
                            if(cy1<y1+indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===11){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<y1+2*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===58){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<y1+3*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===59){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<y1+4*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===60){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<y1+5*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===61){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else {
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===62){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }
                        }else {
                            if(cy1<y1+indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===12){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<y1+2*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===13){
                                        if(validMove[j]===1){
                                            selected=j;
                                            console.log("ready to move ",j,"\n");
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<y1+3*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===14){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<y1+4*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===15){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<y1+5*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===16){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else {
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===17){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }
                        }
                    }else if(validSelected===0 && cx1>x1+accLen-boxLen && cy1>y1+boxLen && cx1<x1+accLen && cy1<y1+accLen-boxLen){
                        var startInd1=y1+boxLen+indLen;
                        var xStartInd1=x1+accLen-boxLen;
                        if(cy1<startInd1){
                            if(cx1<xStartInd1+indLen){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===18){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<xStartInd1+2*indLen){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===19){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<xStartInd1+3*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===20){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<xStartInd1+4*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===21){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<xStartInd1+5*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===22){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else {
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===23){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }
                        }else if(cy1<startInd1+indLen){
                            if(cx1<xStartInd1+indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===68){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<xStartInd1+2*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===67){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<xStartInd1+3*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===66){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<xStartInd1+4*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===65){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<xStartInd1+5*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===64){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else {
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===24){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }
                        }else {
                            if(cx1<xStartInd1+indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===30){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<xStartInd1+2*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===29){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<xStartInd1+3*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===28){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<xStartInd1+4*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===27){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cx1<xStartInd1+5*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===26){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else {
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===25){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }
                        }
                    }else if(validSelected===0 && cx1>x1+boxLen && cy1>y1+accLen-boxLen && cx1<x1+accLen-boxLen && cy1<y1+accLen){
                        var startInd1=x1+boxLen+indLen;
                        var yStartInd=y1+accLen-boxLen;
                        if(cx1<startInd1){
                            if(cy1<yStartInd+indLen){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===43){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<yStartInd+2*indLen){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===42){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<yStartInd+3*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===41){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<yStartInd+4*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===40){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<yStartInd+5*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===39){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else {
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===38){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }
                        }else if(cx1<startInd1+indLen){
                            if(cy1<yStartInd+indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===74){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<yStartInd+2*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===73){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<yStartInd+3*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===72){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<yStartInd+4*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===71){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<yStartInd+5*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===70){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else {
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===37){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }
                        }else {
                            if(cy1<yStartInd+indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===31){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<yStartInd+2*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===32){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<yStartInd+3*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===33){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<yStartInd+4*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===34){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else if(cy1<yStartInd+5*indLen ){
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===35){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }else {
                                for(j=0;j<16;j++){
                                    if(arrPosintion[j]===36){
                                        if(validMove[j]===1){
                                            selected=j;
                                            validSelected=1;
                                            turnChanged=1;
                                        }
                                    }
                                }
                            }
                        }
                    }else if(validSelected===0 && cx1>x1+startBox && cy1>y1+startBox && cx1<x1+boxLen-startBox && cy1<y1+boxLen-startBox){
                        if(cy1<y1+boxLen/2){
                            if(cx1<x1+boxLen/2){
                                if(arrPosintion[0]===-1){
                                    if(validMove[0]===1){
                                        selected=0;
                                        validSelected=1;
                                        //turnChanged=1;
                                    }
                                }
                            }else{
                                if(arrPosintion[1]===-1){
                                    if(validMove[1]===1){
                                        selected=1;
                                        validSelected=1;
                                        //turnChanged=1;
                                    }
                                }
                            }
                        }else {
                            if(cx1<x1+boxLen/2){
                                if(arrPosintion[2]===-1){
                                    if(validMove[2]===1){
                                        selected=2;
                                        validSelected=1;
                                        //turnChanged=1;
                                    }
                                }
                            }else{
                                if(arrPosintion[3]===-1){
                                    if(validMove[3]===1){
                                        selected=3;
                                        validSelected=1;
                                        //turnChanged=1;
                                    }
                                }
                            }
                        }
                    }else if(validSelected===0 && cx1>x1+10*startBox && cy1>y1+startBox && cx1<x1+accLen-startBox && cy1<y1+boxLen-startBox){
                        if(cy1<y1+boxLen/2){
                            if(cx1<x1+accLen-boxLen/2){
                                if(arrPosintion[4]===-1){
                                    if(validMove[4]===1){
                                        selected=4;
                                        validSelected=1;
                                        //turnChanged=1;
                                    }
                                }
                            }else{
                                if(arrPosintion[5]===-1){
                                    if(validMove[5]===1){
                                        selected=5;
                                        validSelected=1;
                                        //turnChanged=1;
                                    }
                                }
                            }
                        }else {
                            if(cx1<x1+accLen-boxLen/2){
                                if(arrPosintion[6]===-1){
                                    if(validMove[6]===1){
                                        selected=6;
                                        validSelected=1;
                                        //turnChanged=1;
                                    }
                                }
                            }else{
                                if(arrPosintion[7]===-1){
                                    if(validMove[7]===1){
                                        selected=7;
                                        validSelected=1;
                                        //turnChanged=1;
                                    }
                                }
                            }
                        }
                    }else if(validSelected===0 && cx1>x1+10*startBox && cy1>y1+10*startBox && cx1<x1+accLen-startBox && cy1<y1+accLen-startBox){
                        if(cy1<y1+2*boxLen){
                            if(cx1<x1+2*boxLen){
                                if(arrPosintion[8]===-1){
                                    if(validMove[8]===1){
                                        selected=8;
                                        validSelected=1;
                                        //turnChanged=1;
                                    }
                                }
                            }else{
                                if(arrPosintion[9]===-1){
                                    if(validMove[9]===1){
                                        selected=9;
                                        validSelected=1;
                                        //turnChanged=1;
                                    }
                                }
                            }
                        }else {
                            if(cx1<x1+2*boxLen){
                                if(arrPosintion[10]===-1){
                                    if(validMove[10]===1){
                                        selected=10;
                                        validSelected=1;
                                        //turnChanged=1;
                                    }
                                }
                            }else{
                                if(arrPosintion[11]===-1){
                                    if(validMove[11]===1){
                                        selected=11;
                                        validSelected=1;
                                        //turnChanged=1;
                                    }
                                }
                            }
                        }
                    }else if(validSelected===0 && cx1>x1+startBox && cy1>y1+10*startBox && cx1<x1+boxLen-startBox && cy1<y1+accLen-startBox){
                        if(cy1<y1+2*boxLen){
                            if(cx1<x1+boxLen/2){
                                if(arrPosintion[12]===-1){
                                    if(validMove[12]===1){
                                        selected=12;
                                        validSelected=1;
                                        //turnChanged=1;
                                    }
                                }
                            }else{
                                if(arrPosintion[13]===-1){
                                    if(validMove[13]===1){
                                        selected=13;
                                        validSelected=1;
                                        //turnChanged=1;
                                    }
                                }
                            }
                        }else {
                            if(cx1<x1+2*boxLen){
                                if(arrPosintion[14]===-1){
                                    if(validMove[14]===1){
                                        selected=14;
                                        validSelected=1;
                                        //turnChanged=1;
                                    }
                                }
                            }else{
                                if(arrPosintion[15]===-1){
                                    if(validMove[15]===1){
                                        selected=15;
                                        validSelected=1;
                                        //turnChanged=1;
                                    }
                                }
                            }
                        }
                    }
                    turnPosible=1;
                    if(validSelected===1&&turnChanged==1){
                        turnChanged=0;
                        if(value!=6){   
                            //turnPosible=1; 
                            turnChange();
                            turnPosible=0;
                        }else{
                            for(j=0;j<16;j++){
                                validMove[j]=0;
                            }
                            k=0;
                        }
                        validValue=1;
                        validSelected=1;
                        checked=0;
                    }
                }
            }
        }
        circleCreate(c,x1,y1,accLen,boxLen,innerBoxLen,indLen,indLenLeave,radius,startBox);
    }

    diseCreate(c,x1,y1,boxLen,indLen,accLen);
}

function diseCreate(c,x1,y1,boxLen,indLen,accLen){
    c.lineWidth="3";
    c.strokeStyle="black";
    var smallboxSize=boxLen/4;
    if(turn==1){
        if(lastValue==1){
            c.beginPath();
            c.arc((x1+smallboxSize/2),(y1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==2){
            c.beginPath();
            c.arc(x1+smallboxSize-indLen,y1+smallboxSize-indLen,3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc(x1+indLen,y1+indLen,3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==3){
            c.beginPath();
            c.arc(x1+smallboxSize-indLen,y1+smallboxSize-indLen,3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+smallboxSize/2),(y1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc(x1+indLen,y1+indLen,3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==4){
            c.beginPath();
            c.arc((x1+smallboxSize/4),(y1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+3*smallboxSize/4),(y1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+smallboxSize/4),(y1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+3*smallboxSize/4),(y1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==5){
            c.beginPath();
            c.arc((x1+smallboxSize/4),(y1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+3*smallboxSize/4),(y1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+smallboxSize/2),(y1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+smallboxSize/4),(y1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+3*smallboxSize/4),(y1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==6){
            c.beginPath();
            c.arc((x1+smallboxSize/4),(y1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+smallboxSize/4),(y1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+smallboxSize/4),(y1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+3*smallboxSize/4),(y1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+3*smallboxSize/4),(y1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+3*smallboxSize/4),(y1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
        }
    }else if(turn==2){
        var xs1= x1+accLen-boxLen/4;
        if(lastValue==1){
            c.beginPath();
            c.arc((xs1+smallboxSize/2),(y1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==2){
            c.beginPath();
            c.arc(xs1+smallboxSize-indLen,y1+smallboxSize-indLen,3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc(xs1+indLen,y1+indLen,3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==3){
            c.beginPath();
            c.arc(xs1+smallboxSize-indLen,y1+smallboxSize-indLen,3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+smallboxSize/2),(y1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc(xs1+indLen,y1+indLen,3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==4){
            c.beginPath();
            c.arc((xs1+smallboxSize/4),(y1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+3*smallboxSize/4),(y1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+smallboxSize/4),(y1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+3*smallboxSize/4),(y1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==5){
            c.beginPath();
            c.arc((xs1+smallboxSize/4),(y1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+3*smallboxSize/4),(y1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+smallboxSize/2),(y1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+smallboxSize/4),(y1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+3*smallboxSize/4),(y1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==6){
            c.beginPath();
            c.arc((xs1+smallboxSize/4),(y1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+smallboxSize/4),(y1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+smallboxSize/4),(y1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+3*smallboxSize/4),(y1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+3*smallboxSize/4),(y1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+3*smallboxSize/4),(y1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
        }
    }else if(turn==3){
        var xs1= x1+accLen-boxLen/4;
        var ys1=y1+accLen-boxLen/4;
        if(lastValue==1){
            c.beginPath();
            c.arc((xs1+smallboxSize/2),(ys1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==2){
            c.beginPath();
            c.arc(xs1+smallboxSize-indLen,ys1+smallboxSize-indLen,3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc(xs1+indLen,ys1+indLen,3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==3){
            c.beginPath();
            c.arc(xs1+smallboxSize-indLen,ys1+smallboxSize-indLen,3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+smallboxSize/2),(ys1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc(xs1+indLen,ys1+indLen,3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==4){
            c.beginPath();
            c.arc((xs1+smallboxSize/4),(ys1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+3*smallboxSize/4),(ys1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+smallboxSize/4),(ys1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+3*smallboxSize/4),(ys1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==5){
            c.beginPath();
            c.arc((xs1+smallboxSize/4),(ys1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+3*smallboxSize/4),(ys1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+smallboxSize/2),(ys1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+smallboxSize/4),(ys1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+3*smallboxSize/4),(ys1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==6){
            c.beginPath();
            c.arc((xs1+smallboxSize/4),(ys1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+smallboxSize/4),(ys1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+smallboxSize/4),(ys1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+3*smallboxSize/4),(ys1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+3*smallboxSize/4),(ys1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((xs1+3*smallboxSize/4),(ys1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
        }
    }else if(turn==4){
        //var xs1= accLen-boxLen/4;
        var ys1=y1+accLen-boxLen/4;
        if(lastValue==1){
            c.beginPath();
            c.arc((x1+smallboxSize/2),(ys1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==2){
            c.beginPath();
            c.arc(x1+smallboxSize-indLen,ys1+smallboxSize-indLen,3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc(x1+indLen,ys1+indLen,3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==3){
            c.beginPath();
            c.arc(x1+smallboxSize-indLen,ys1+smallboxSize-indLen,3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+smallboxSize/2),(ys1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc(x1+indLen,ys1+indLen,3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==4){
            c.beginPath();
            c.arc((x1+smallboxSize/4),(ys1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+3*smallboxSize/4),(ys1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+smallboxSize/4),(ys1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+3*smallboxSize/4),(ys1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==5){
            c.beginPath();
            c.arc((x1+smallboxSize/4),(ys1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+3*smallboxSize/4),(ys1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+smallboxSize/2),(ys1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+smallboxSize/4),(ys1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+3*smallboxSize/4),(ys1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
        }else if(lastValue==6){
            c.beginPath();
            c.arc((x1+smallboxSize/4),(ys1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+smallboxSize/4),(ys1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+smallboxSize/4),(ys1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+3*smallboxSize/4),(ys1+smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+3*smallboxSize/4),(ys1+smallboxSize/2),3,0,2*Math.PI);
            c.stroke();
            c.beginPath();
            c.arc((x1+3*smallboxSize/4),(ys1+3*smallboxSize/4),3,0,2*Math.PI);
            c.stroke();
        }
    }
}


function turnChange(){
    if(turnPosible==1){
        if(turn===1){
            if(win[1]===0)
                turn=2;
            else if(win[2]===0)
                turn=3;
            else if(win[3]===0)
                turn=4;
        }else if(turn===2){
            if(win[2]===0)
                turn=3;
            else if(win[3]===0)
                turn=4;
            else if(win[0]===0)
                turn=1;
        }else if(turn===3){
            if(win[3]===0)
                turn=4;
            else if(win[0]===0)
                turn=1;
            else if(win[1]===0)
                turn=2;
        }else if(turn===4){
            if(win[0]===0)
                turn=1;
            else if(win[1]===0)
                turn=2;
            else if(win[2]===0)
                turn=3;    
        }
        for(j=0;j<16;j++){
            validMove[j]=0;
        }
        k=0;
        turnPosible=0;
    }
    console.log("turn : ",turn," value : ",value);
}
/*function getValue(event){
    cx=event.pageX;
    cy=event.pageY;
    if(cx>x1 && cx>y1 && cx<accLen+x1 && cy<accLen+)
}*/

function boardCreate(c,boxLen,indLenLeave,innerBoxLen,startBox,radius,indLen,accLen,x1,y1){
    //    document.write(canvas.width," ",x1," ",x2," ",y1," ",y2);
    c.fillStyle="white";
    //big rect
    c.fillRect(x1,y1,accLen,accLen);
    
    //samll four rect
    c.fillStyle = "red";
    c.fillRect(x1,y1,boxLen,boxLen);
    c.fillStyle="white";
    c.lineWidth="3";
    c.fillRect(x1+boxLen/6,y1+boxLen/6,innerBoxLen,innerBoxLen);
    //inner circle
        c.strokeStyle="black";
        c.arc(x1+startBox+innerBoxLen/4,y1+startBox+innerBoxLen/4,radius,0,2*Math.PI);
        c.stroke();
        c.beginPath();
        c.arc(x1+startBox+3*innerBoxLen/4,y1+startBox+innerBoxLen/4,radius,0,2*Math.PI);
        c.stroke();
        c.beginPath();
        c.arc(x1+startBox+innerBoxLen/4,y1+startBox+3*innerBoxLen/4,radius,0,2*Math.PI);
        c.stroke();
        c.beginPath();
        c.arc(x1+startBox+3*innerBoxLen/4,y1+startBox+3*innerBoxLen/4,radius,0,2*Math.PI);    
        c.stroke();
    c.fillStyle = "green";
    c.fillRect(x1+indLenLeave+boxLen,y1,boxLen,boxLen);
    c.fillStyle="white";
    c.fillRect(x1+accLen-boxLen+boxLen/6,y1+boxLen/6,innerBoxLen,innerBoxLen);
    //inner circle   
        c.beginPath(); 
        c.arc(x1+accLen-boxLen+startBox+innerBoxLen/4,y1+startBox+innerBoxLen/4,radius,0,2*Math.PI);
        c.stroke();
        c.beginPath();
        c.arc(x1+accLen-boxLen+startBox+3*innerBoxLen/4,y1+startBox+innerBoxLen/4,radius,0,2*Math.PI);
        c.stroke();
        c.beginPath();
        c.arc(x1+accLen-boxLen+startBox+innerBoxLen/4,y1+startBox+3*innerBoxLen/4,radius,0,2*Math.PI);
        c.stroke();
        c.beginPath();
        c.arc(x1+accLen-boxLen+startBox+3*innerBoxLen/4,y1+startBox+3*innerBoxLen/4,radius,0,2*Math.PI);    
        c.stroke();
    c.fillStyle = "blue";
    c.fillRect(x1,y1+indLenLeave+boxLen,boxLen,boxLen);
    c.fillStyle="white";
    c.fillRect(x1+boxLen/6,y1+accLen-boxLen+boxLen/6,innerBoxLen,innerBoxLen);
    //inner circle   
        c.beginPath(); 
        c.arc(x1+startBox+innerBoxLen/4,y1+accLen-boxLen+startBox+innerBoxLen/4,radius,0,2*Math.PI);
        c.stroke();
        c.beginPath();
        c.arc(x1+startBox+3*innerBoxLen/4,y1+accLen-boxLen+startBox+innerBoxLen/4,radius,0,2*Math.PI);
        c.stroke();
        c.beginPath();
        c.arc(x1+startBox+innerBoxLen/4,y1+accLen-boxLen+startBox+3*innerBoxLen/4,radius,0,2*Math.PI);
        c.stroke();
        c.beginPath();
        c.arc(x1+startBox+3*innerBoxLen/4,y1+accLen-boxLen+startBox+3*innerBoxLen/4,radius,0,2*Math.PI);    
        c.stroke();
    c.fillStyle = "yellow";
    c.fillRect(x1+indLenLeave+boxLen,y1+indLenLeave+boxLen,boxLen,boxLen);
    c.fillStyle="white";
    c.fillRect(x1+accLen-boxLen+boxLen/6,y1+accLen-boxLen+boxLen/6,innerBoxLen,innerBoxLen);
    //inner circle   
        c.beginPath(); 
        c.arc(x1+accLen-boxLen+startBox+innerBoxLen/4,y1+accLen-boxLen+startBox+innerBoxLen/4,radius,0,2*Math.PI);
        c.stroke();
        c.beginPath();
        c.arc(x1+accLen-boxLen+startBox+3*innerBoxLen/4,y1+accLen-boxLen+startBox+innerBoxLen/4,radius,0,2*Math.PI);
        c.stroke();
        c.beginPath();
        c.arc(x1+accLen-boxLen+startBox+innerBoxLen/4,y1+accLen-boxLen+startBox+3*innerBoxLen/4,radius,0,2*Math.PI);
        c.stroke();
        c.beginPath();
        c.arc(x1+accLen-boxLen+startBox+3*innerBoxLen/4,y1+accLen-boxLen+startBox+3*innerBoxLen/4,radius,0,2*Math.PI);    
        c.stroke();
    
    
    //indexing 
    c.lineWidth = "3";
    c.strokeStyle = "black";
    //red-blue : 
    c.strokeRect(x1,y1+boxLen, indLen, indLen);
        //stump
    c.fillStyle="rgb(255,70,70)";
    c.fillRect(x1+indLen,y1+boxLen, indLen, indLen);
    c.strokeRect(x1+2*indLen,y1+boxLen, indLen, indLen);
    c.strokeRect(x1+3*indLen,y1+boxLen, indLen, indLen);
    c.strokeRect(x1+4*indLen,y1+boxLen, indLen, indLen);
    c.strokeRect(x1+5*indLen,y1+boxLen, indLen, indLen);
    
    c.strokeRect(x1,y1+boxLen+2*indLen, indLen, indLen);
    c.strokeRect(x1+indLen,y1+boxLen+2*indLen, indLen, indLen);
        //stump
    c.fillRect(x1+2*indLen,y1+boxLen+2*indLen, indLen, indLen);
    c.strokeRect(x1+3*indLen,y1+boxLen+2*indLen, indLen, indLen);
    c.strokeRect(x1+4*indLen,y1+boxLen+2*indLen, indLen, indLen);
    c.strokeRect(x1+5*indLen,y1+boxLen+2*indLen, indLen, indLen);
    
    c.strokeRect(x1,y1+boxLen+indLen, indLen, indLen);
    c.strokeStyle = "red";
    c.strokeRect(x1+indLen,y1+boxLen+indLen, indLen, indLen);
    c.strokeRect(x1+2*indLen,y1+boxLen+indLen, indLen, indLen);
    c.strokeRect(x1+3*indLen,y1+boxLen+indLen, indLen, indLen);
    c.strokeRect(x1+4*indLen,y1+boxLen+indLen, indLen, indLen);
    c.strokeRect(x1+5*indLen,y1+boxLen+indLen, indLen, indLen);

    //red-green : 
    c.strokeStyle="black";
    c.strokeRect(x1+boxLen,y1, indLen, indLen);
        //stump
    c.fillStyle="rgb(70,255,70)";
    c.strokeRect(x1+boxLen,y1+indLen, indLen, indLen);
    c.fillRect(x1+boxLen ,y1+2*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen ,y1+3*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen,y1 +4*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen,y1 +5*indLen, indLen, indLen);

    c.strokeRect(x1+boxLen+2*indLen,y1, indLen, indLen);
        //stump
    c.fillRect(x1+boxLen+2*indLen,y1+indLen, indLen, indLen);
    c.strokeRect(x1+boxLen+2*indLen,y1+2*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen+2*indLen,y1 +3*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen+2*indLen,y1+4*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen+2*indLen,y1+5*indLen, indLen, indLen);
    
    c.strokeRect(x1+boxLen+indLen,y1, indLen, indLen);
    c.strokeStyle = "green";
    c.strokeRect(x1+boxLen+indLen,y1+indLen, indLen, indLen);
    c.strokeRect(x1+boxLen+indLen,y1+2*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen+indLen,y1+3*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen+indLen,y1+4*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen+indLen,y1+5*indLen, indLen, indLen);

    //green-yellow : 
    c.strokeStyle="black";
    c.strokeRect(x1+accLen-indLen,y1+boxLen, indLen, indLen);
        //stump
    c.fillStyle="rgb(220,255,100)";
    c.strokeRect(x1+accLen-2*indLen,y1+boxLen, indLen, indLen);
    c.fillRect(x1+accLen-3*indLen,y1+boxLen, indLen, indLen);
    c.strokeRect(x1+accLen-4*indLen,y1+boxLen, indLen, indLen);
    c.strokeRect(x1+accLen-5*indLen,y1+boxLen, indLen, indLen);
    c.strokeRect(x1+accLen-6*indLen,y1+boxLen, indLen, indLen);

    c.strokeRect(x1+accLen-indLen,y1+boxLen+2*indLen, indLen, indLen);
    c.fillRect(x1+accLen-2*indLen,y1+boxLen+2*indLen, indLen, indLen);
    c.strokeRect(x1+accLen-3*indLen,y1+boxLen+2*indLen, indLen, indLen);
    c.strokeRect(x1+accLen-4*indLen,y1+boxLen+2*indLen, indLen, indLen);
    c.strokeRect(x1+accLen-5*indLen,y1+boxLen+2*indLen, indLen, indLen);
    c.strokeRect(x1+accLen-6*indLen,y1+boxLen+2*indLen, indLen, indLen);
    
    c.strokeRect(x1+accLen-indLen,y1+boxLen+indLen, indLen, indLen);
    c.strokeStyle = "yellow";
    c.strokeRect(x1+accLen-2*indLen,y1+boxLen+indLen, indLen, indLen);
    c.strokeRect(x1+accLen-3*indLen,y1+boxLen+indLen, indLen, indLen);
    c.strokeRect(x1+accLen-4*indLen,y1+boxLen+indLen, indLen, indLen);
    c.strokeRect(x1+accLen-5*indLen,y1+boxLen+indLen, indLen, indLen);
    c.strokeRect(x1+accLen-6*indLen,y1+boxLen+indLen, indLen, indLen);

    //blue-yellow :
    c.strokeStyle="black";
    c.strokeRect(x1+boxLen ,y1+accLen-indLen, indLen, indLen);
        //stump
    c.fillStyle="rgb(70,70,255)";
    c.fillRect(x1+boxLen ,y1+accLen-2*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen ,y1+accLen-3*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen ,y1+accLen-4*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen ,y1+accLen-5*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen ,y1+accLen-6*indLen, indLen, indLen);
    
    c.strokeRect(x1+boxLen+2*indLen,y1+accLen-indLen, indLen, indLen);
    c.strokeRect(x1+boxLen+2*indLen,y1+accLen-2*indLen, indLen, indLen);
    c.fillRect(x1+boxLen+2*indLen,y1+accLen-3*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen+2*indLen,y1+accLen-4*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen+2*indLen,y1+accLen-5*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen+2*indLen,y1+accLen-6*indLen, indLen, indLen);
    
    c.strokeRect(x1+boxLen+indLen,y1+accLen-indLen, indLen, indLen);
    c.strokeStyle = "blue";
    c.strokeRect(x1+boxLen+indLen,y1+accLen-2*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen+indLen,y1+accLen-3*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen+indLen,y1+accLen-4*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen+indLen,y1+accLen-5*indLen, indLen, indLen);
    c.strokeRect(x1+boxLen+indLen,y1+accLen-6*indLen, indLen, indLen);

    c.fillStyle="white";
    c.strokeStyle="black";
    c.fillRect(x1,y1,boxLen/4,boxLen/4);
    c.strokeRect(x1,y1,boxLen/4,boxLen/4);
    
    c.fillRect(x1+accLen-boxLen/4,y1,boxLen/4,boxLen/4);
    c.strokeRect(x1+accLen-boxLen/4,y1,boxLen/4,boxLen/4);
    
    c.fillRect(x1,y1+accLen-boxLen/4,boxLen/4,boxLen/4);
    c.strokeRect(x1,y1+accLen-boxLen/4,boxLen/4,boxLen/4);
    
    c.fillRect(x1+accLen-boxLen/4,y1+accLen-boxLen/4,boxLen/4,boxLen/4);
    c.strokeRect(x1+accLen-boxLen/4,y1+accLen-boxLen/4,boxLen/4,boxLen/4);
    
}

function circleCreate(c,x1,y1,accLen,boxLen,innerBoxLen,indLen,indLenLeave,radius,startBox){
    var i=0;
    var radiusCir=radius/2;
    c.lineWidth="1";
    c.strokeStyle="black";
    for(i=0;i<16;i++){
        c.beginPath();
        if(i/4<1){
            c.fillStyle="red";
        }else if(i/4<2){
            c.fillStyle="green";
        }else if(i/4<3){
            c.fillStyle="yellow";
        }else if(i/4<4){
            c.fillStyle="blue";
        }
        var position=arrPosintion[i];
        if(position==-1){
            if(i<4){
                if(i===0){
                    c.beginPath();
                    c.arc(x1+startBox+innerBoxLen/4,y1+startBox+innerBoxLen/4,radiusCir,0,2*Math.PI);
                    c.fill();
                    c.beginPath();
                    c.arc(x1+startBox+innerBoxLen/4,y1+startBox+innerBoxLen/4,radiusCir,0,2*Math.PI); 
                    c.stroke();        
                }else if(i===1){
                    c.beginPath();
                    c.arc(x1+startBox+3*innerBoxLen/4,y1+startBox+innerBoxLen/4,radiusCir,0,2*Math.PI);
                    c.fill();
                    c.beginPath();
                    c.arc(x1+startBox+3*innerBoxLen/4,y1+startBox+innerBoxLen/4,radiusCir,0,2*Math.PI); 
                    c.stroke();  
                }else if(i===2){
                    c.beginPath();
                    c.arc(x1+startBox+innerBoxLen/4,y1+startBox+3*innerBoxLen/4,radiusCir,0,2*Math.PI);
                    c.fill();
                    c.beginPath();
                    c.arc(x1+startBox+innerBoxLen/4,y1+startBox+3*innerBoxLen/4,radiusCir,0,2*Math.PI); 
                    c.stroke();  
                }else if(i===3){
                    c.beginPath();
                    c.arc(x1+startBox+3*innerBoxLen/4,y1+startBox+3*innerBoxLen/4,radiusCir,0,2*Math.PI);
                    c.fill();
                    c.beginPath();
                    c.arc(x1+startBox+3*innerBoxLen/4,y1+startBox+3*innerBoxLen/4,radiusCir,0,2*Math.PI); 
                    c.stroke();  
                }
            }else if(i<8){
                if(i===4){
                    c.beginPath();
                    c.arc(x1+accLen-boxLen+startBox+innerBoxLen/4,y1+startBox+innerBoxLen/4,radiusCir,0,2*Math.PI);
                    c.fill();
                    c.beginPath();
                    c.arc(x1+accLen-boxLen+startBox+innerBoxLen/4,y1+startBox+innerBoxLen/4,radiusCir,0,2*Math.PI); 
                    c.stroke();        
                }else if(i===5){
                    c.beginPath();
                    c.arc(x1+accLen-boxLen+startBox+3*innerBoxLen/4,y1+startBox+innerBoxLen/4,radiusCir,0,2*Math.PI);
                    c.fill();
                    c.beginPath();
                    c.arc(x1+accLen-boxLen+startBox+3*innerBoxLen/4,y1+startBox+innerBoxLen/4,radiusCir,0,2*Math.PI); 
                    c.stroke();  
                }else if(i===6){
                    c.beginPath();
                    c.arc(x1+accLen-boxLen+startBox+innerBoxLen/4,y1+startBox+3*innerBoxLen/4,radiusCir,0,2*Math.PI);
                    c.fill();
                    c.beginPath();
                    c.arc(x1+accLen-boxLen+startBox+innerBoxLen/4,y1+startBox+3*innerBoxLen/4,radiusCir,0,2*Math.PI); 
                    c.stroke();  
                }else if(i===7){
                    c.beginPath();
                    c.arc(x1+accLen-boxLen+startBox+3*innerBoxLen/4,y1+startBox+3*innerBoxLen/4,radiusCir,0,2*Math.PI);
                    c.fill();
                    c.beginPath();
                    c.arc(x1+accLen-boxLen+startBox+3*innerBoxLen/4,y1+startBox+3*innerBoxLen/4,radiusCir,0,2*Math.PI); 
                    c.stroke();  
                }
            }else if(i<12){
                if(i===8){
                    c.beginPath();
                    c.arc(x1+accLen-boxLen+startBox+innerBoxLen/4,y1+accLen-boxLen+startBox+innerBoxLen/4,radiusCir,0,2*Math.PI);
                    c.fill();
                    c.beginPath();
                    c.arc(x1+accLen-boxLen+startBox+innerBoxLen/4,y1+accLen-boxLen+startBox+innerBoxLen/4,radiusCir,0,2*Math.PI); 
                    c.stroke();        
                }else if(i===9){
                    c.beginPath();
                    c.arc(x1+accLen-boxLen+startBox+3*innerBoxLen/4,y1+accLen-boxLen+startBox+innerBoxLen/4,radiusCir,0,2*Math.PI);
                    c.fill();
                    c.beginPath();
                    c.arc(x1+accLen-boxLen+startBox+3*innerBoxLen/4,y1+accLen-boxLen+startBox+innerBoxLen/4,radiusCir,0,2*Math.PI); 
                    c.stroke();  
                }else if(i===10){
                    c.beginPath();
                    c.arc(x1+accLen-boxLen+startBox+innerBoxLen/4,y1+accLen-boxLen+startBox+3*innerBoxLen/4,radiusCir,0,2*Math.PI);
                    c.fill();
                    c.beginPath();
                    c.arc(x1+accLen-boxLen+startBox+innerBoxLen/4,y1+accLen-boxLen+startBox+3*innerBoxLen/4,radiusCir,0,2*Math.PI); 
                    c.stroke();  
                }else if(i===11){
                    c.beginPath();
                    c.arc(x1+accLen-boxLen+startBox+3*innerBoxLen/4,y1+accLen-boxLen+startBox+3*innerBoxLen/4,radiusCir,0,2*Math.PI);
                    c.fill();
                    c.beginPath();
                    c.arc(x1+accLen-boxLen+startBox+3*innerBoxLen/4,y1+accLen-boxLen+startBox+3*innerBoxLen/4,radiusCir,0,2*Math.PI); 
                    c.stroke();  
                }
            }else if(i<16){
                if(i===12){
                    c.beginPath();
                    c.arc(x1+startBox+innerBoxLen/4,y1+accLen-boxLen+startBox+innerBoxLen/4,radiusCir,0,2*Math.PI);
                    c.fill();
                    c.beginPath();
                    c.arc(x1+startBox+innerBoxLen/4,y1+accLen-boxLen+startBox+innerBoxLen/4,radiusCir,0,2*Math.PI); 
                    c.stroke();        
                }else if(i===13){
                    c.beginPath();
                    c.arc(x1+startBox+3*innerBoxLen/4,y1+accLen-boxLen+startBox+innerBoxLen/4,radiusCir,0,2*Math.PI);
                    c.fill();
                    c.beginPath();
                    c.arc(x1+startBox+3*innerBoxLen/4,y1+accLen-boxLen+startBox+innerBoxLen/4,radiusCir,0,2*Math.PI); 
                    c.stroke();  
                }else if(i===14){
                    c.beginPath();
                    c.arc(x1+startBox+innerBoxLen/4,y1+accLen-boxLen+startBox+3*innerBoxLen/4,radiusCir,0,2*Math.PI);
                    c.fill();
                    c.beginPath();
                    c.arc(x1+startBox+innerBoxLen/4,y1+accLen-boxLen+startBox+3*innerBoxLen/4,radiusCir,0,2*Math.PI); 
                    c.stroke();  
                }else if(i===15){
                    c.beginPath();
                    c.arc(x1+startBox+3*innerBoxLen/4,y1+accLen-boxLen+startBox+3*innerBoxLen/4,radiusCir,0,2*Math.PI);
                    c.fill();
                    c.beginPath();
                    c.arc(x1+startBox+3*innerBoxLen/4,y1+accLen-boxLen+startBox+3*innerBoxLen/4,radiusCir,0,2*Math.PI); 
                    c.stroke();  
                }
            }
        }else if(position>=0 && position<5){
            c.beginPath();
            c.arc(x1+(position+1)*indLen+indLen/2,y1+boxLen+indLen/2,radiusCir,0,2*Math.PI);
            c.fill();
            c.beginPath();
            c.arc(x1+(position+1)*indLen+indLen/2,y1+boxLen+indLen/2,radiusCir,0,2*Math.PI); 
            c.stroke(); 
        }else if(position>4&&position<11){
            c.beginPath();
            c.arc(x1+6*indLen+indLen/2,y1+boxLen+indLen/2-(position-4)*indLen,radiusCir,0,2*Math.PI);
            c.fill();
            c.beginPath();
            c.arc(x1+6*indLen+indLen/2,y1+boxLen+indLen/2-(position-4)*indLen,radiusCir,0,2*Math.PI); 
            c.stroke(); 
        }else if(position==11){
            c.beginPath();
            c.arc(x1+7*indLen+indLen/2,y1+indLen/2,radiusCir,0,2*Math.PI);
            c.fill();
            c.beginPath();
            c.arc(x1+7*indLen+indLen/2,y1+indLen/2,radiusCir,0,2*Math.PI); 
            c.stroke(); 
        }else if(position>11&&position<18){
            c.beginPath();
            c.arc(x1+8*indLen+indLen/2,y1+indLen/2+(position-12)*indLen,radiusCir,0,2*Math.PI);
            c.fill();
            c.beginPath();
            c.arc(x1+8*indLen+indLen/2,y1+indLen/2+(position-12)*indLen,radiusCir,0,2*Math.PI); 
            c.stroke(); 
        }else if(position>17&&position<24){
            c.beginPath();
            c.arc(x1+(position-9)*indLen+indLen/2,y1+boxLen+indLen/2,radiusCir,0,2*Math.PI);
            c.fill();
            c.beginPath();
            c.arc(x1+(position-9)*indLen+indLen/2,y1+boxLen+indLen/2,radiusCir,0,2*Math.PI); 
            c.stroke(); 
        }else if(position==24){
            c.beginPath();
            c.arc(x1+accLen-indLen/2,y1+boxLen+3*indLen/2,radiusCir,0,2*Math.PI);
            c.fill();
            c.beginPath();
            c.arc(x1+accLen-indLen/2,y1+boxLen+3*indLen/2,radiusCir,0,2*Math.PI); 
            c.stroke(); 
        }else if(position>24&&position<31){
            c.beginPath();
            c.arc(x1+accLen-(position-25)*indLen-indLen/2,y1+boxLen+5*indLen/2,radiusCir,0,2*Math.PI);
            c.fill();
            c.beginPath();
            c.arc(x1+accLen-(position-25)*indLen-indLen/2,y1+boxLen+5*indLen/2,radiusCir,0,2*Math.PI); 
            c.stroke(); 
        }else if(position>30&&position<37){
            c.beginPath();
            c.arc(x1+8*indLen+indLen/2,y1+(position-22)*indLen+indLen/2,radiusCir,0,2*Math.PI);
            c.fill();
            c.beginPath();
            c.arc(x1+8*indLen+indLen/2,y1+(position-22)*indLen+indLen/2,radiusCir,0,2*Math.PI); 
            c.stroke(); 
        }else if(position==37){
            c.beginPath();
            c.arc(x1+7*indLen+indLen/2,y1+accLen-indLen/2,radiusCir,0,2*Math.PI);
            c.fill();
            c.beginPath();
            c.arc(x1+7*indLen+indLen/2,y1+accLen-indLen/2,radiusCir,0,2*Math.PI); 
            c.stroke(); 
        }else if(position>37&&position<44){
            c.beginPath();
            c.arc(x1+6*indLen+indLen/2,y1+accLen-(position-38)*indLen-indLen/2,radiusCir,0,2*Math.PI);
            c.fill();
            c.beginPath();
            c.arc(x1+6*indLen+indLen/2,y1+accLen-(position-38)*indLen-indLen/2,radiusCir,0,2*Math.PI); 
            c.stroke(); 
        }else if(position>43&&position<50){
            c.beginPath();
            c.arc(x1+(49-position)*indLen+indLen/2,y1+boxLen+5*indLen/2,radiusCir,0,2*Math.PI);
            c.fill();
            c.beginPath();
            c.arc(x1+(49-position)*indLen+indLen/2,y1+boxLen+5*indLen/2,radiusCir,0,2*Math.PI); 
            c.stroke(); 
        }else if(position==50){
            c.beginPath();
            c.arc(x1+indLen/2,y1+boxLen+3*indLen/2,radiusCir,0,2*Math.PI);
            c.fill();
            c.beginPath();
            c.arc(x1+indLen/2,y1+boxLen+3*indLen/2,radiusCir,0,2*Math.PI); 
            c.stroke(); 
        }else if(position==51){
            c.beginPath();
            c.arc(x1+indLen/2,y1+boxLen+indLen/2,radiusCir,0,2*Math.PI);
            c.fill();
            c.beginPath();
            c.arc(x1+indLen/2,y1+boxLen+indLen/2,radiusCir,0,2*Math.PI); 
            c.stroke(); 
        }else if(position>51&&position<58){
            c.beginPath();
            c.arc(x1+(position-51)*indLen+indLen/2,y1+boxLen+3*indLen/2,radiusCir,0,2*Math.PI);
            c.fill();
            c.beginPath();
            c.arc(x1+(position-51)*indLen+indLen/2,y1+boxLen+3*indLen/2,radiusCir,0,2*Math.PI); 
            c.stroke(); 
        }else if(position>57&&position<64){
            c.beginPath();
            c.arc(x1+7*indLen+indLen/2,y1+(position-57)*indLen+indLen/2,radiusCir,0,2*Math.PI);
            c.fill();
            c.beginPath();
            c.arc(x1+7*indLen+indLen/2,y1+(position-57)*indLen+indLen/2,radiusCir,0,2*Math.PI); 
            c.stroke(); 
        }else if(position>63&&position<70){
            c.beginPath();
            c.arc(x1+accLen-(position-63)*indLen-indLen/2,y1+boxLen+3*indLen/2,radiusCir,0,2*Math.PI);
            c.fill();
            c.beginPath();
            c.arc(x1+accLen-(position-63)*indLen-indLen/2,y1+boxLen+3*indLen/2,radiusCir,0,2*Math.PI); 
            c.stroke(); 
        }else if(position>69&&position<77){
            c.beginPath();
            c.arc(x1+7*indLen+indLen/2,y1+accLen-(position-69)*indLen-indLen/2,radiusCir,0,2*Math.PI);
            c.fill();
            c.beginPath();
            c.arc(x1+7*indLen+indLen/2,y1+accLen-(position-69)*indLen-indLen/2,radiusCir,0,2*Math.PI); 
            c.stroke(); 
        }
    }
}

loop();
