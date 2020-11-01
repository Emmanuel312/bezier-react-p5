import p5Types, {Vector}from "p5"; //Import this for typechecking and intellisense

let p1 : p5Types.Vector;
let p2 : p5Types.Vector;
let p3 : p5Types.Vector;
let p4 : p5Types.Vector;
let p5 : p5Types.Vector;
let points : Vector[];
let t : number;
let bezier : Vector[];


export const setup = (P5: p5Types, canvasParentRef: Element) => {
    P5.createCanvas(400, 400);
    p1 = P5.createVector(Math.random() * 400,Math.random() * 400);
    p2 = P5.createVector(Math.random() * 400,Math.random() * 400);
    p3 = P5.createVector(Math.random() * 400,Math.random() * 400);
    p4 = P5.createVector(Math.random() * 400,Math.random() * 400);
    p5 = P5.createVector(Math.random() * 400,Math.random() * 400);
    points = [p1,p2,p3,p4,p5];
    t = 0;
    bezier = [];
}

export const draw = (P5: p5Types) =>  {
    P5.background(220);
    P5.strokeWeight(5);
    P5.fill('red');
    P5.point(p1.x,p1.y);
    P5.point(p2.x,p2.y);
    P5.point(p3.x,p3.y);
    P5.point(p4.x,p4.y);
    P5.point(p5.x,p5.y);
    bezierCurve(P5);

    P5.noLoop();

    
  
}

function bezierCurve(P5: p5Types){
    P5.noFill();
    for(t = 0; t <= 1; t += 0.001){
        const currentPoint = casteljau(P5,points,t)
        bezier.push(currentPoint)
    }
    
    for (let i = 0; i < bezier.length - 1; i++) {
        P5.line(bezier[i].x,bezier[i].y,bezier[i+1].x,bezier[i+1].y)
        
    }

}


function casteljau(P5: p5Types,points : Vector[],t : number) : Vector{
    const result = []
    for(let i=1;i < points.length;i++) {
        const medPoint = P5.createVector(((1-t)*points[i-1].x) + (t*points[i].x),((1-t)*points[i-1].y )+ (t*points[i].y))
        
        result.push(medPoint)
    }

    if(result.length === 1){ 
        return result[0]
    }

    
    return casteljau(P5,result,t)
}
  
   