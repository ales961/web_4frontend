import {IPoint, IPointFetched} from "../../models/IPoint";

export const drawer = (canvas: HTMLCanvasElement, valR: number, points: IPointFetched[]) => {

    const canvasCtx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    const width = canvas.width;
    const height = canvas.height;

    if (!canvasCtx) {
        alert('your browser doesn\'t support canvas');
        return;
    }

    let R = height / 3;
    const maxX = 10;
    const minX = -10;
    const maxY = maxX * height / width;
    const minY = minX * height / width;

    const getPhysicalX = (x: number) => {
        return (x - minX) / (maxX - minX) * width ;
    }

    const getPhysicalY = (y: number) => {
        return height - (y - minY) / (maxY - minY) * height ;
    }

    canvasCtx.clearRect(0, 0, width, height);
    canvasCtx.font='8px sans-serif';
    canvasCtx.strokeStyle = "rgba(30,144,255,1)";
    canvasCtx.fillStyle = "rgba(30,144,255,1)";

    if(valR > 0) {
        canvasCtx.beginPath();
        canvasCtx.moveTo(getPhysicalX(0), getPhysicalY(0));
        canvasCtx.arc(getPhysicalX(0), getPhysicalY(0), R, 3*Math.PI/2, Math.PI, true);
        canvasCtx.closePath();
        canvasCtx.fill();
        canvasCtx.stroke();

        canvasCtx.strokeStyle = "rgba(30,144,255,1)";
        canvasCtx.fillStyle = "rgba(30,144,255,1)";
        canvasCtx.fillRect(getPhysicalX(0), getPhysicalY(0), R/2, -R);

        canvasCtx.strokeStyle = "rgba(30,144,255,1)";
        canvasCtx.fillStyle = "rgba(30,144,255,1)";
        canvasCtx.beginPath();
        canvasCtx.moveTo(getPhysicalX(0) - R, getPhysicalY(0));
        canvasCtx.lineTo(getPhysicalX(0), getPhysicalY(0));
        canvasCtx.lineTo(getPhysicalX(0), getPhysicalY(0) + R/2);
        canvasCtx.closePath();
        canvasCtx.fill();
        canvasCtx.stroke();
    } else if (valR < 0) {
        valR = NaN;
    }

    const limitMargin = 15;
    canvasCtx.save();
    canvasCtx.strokeStyle = "black";
    canvasCtx.fillStyle = "black";

    canvasCtx.beginPath();
    canvasCtx.moveTo(getPhysicalX(0), getPhysicalY(0));
    canvasCtx.lineTo(getPhysicalX(0), getPhysicalY(maxY)+limitMargin);
    canvasCtx.stroke();

    canvasCtx.beginPath();
    canvasCtx.moveTo(getPhysicalX(0), getPhysicalY(0));
    canvasCtx.lineTo(getPhysicalX(0), getPhysicalY(minY)-limitMargin);
    canvasCtx.stroke();

    canvasCtx.beginPath();
    canvasCtx.moveTo(getPhysicalX(0), getPhysicalY(0));
    canvasCtx.lineTo(getPhysicalX(maxX)+limitMargin, getPhysicalY(0));
    canvasCtx.stroke();

    canvasCtx.beginPath();
    canvasCtx.moveTo(getPhysicalX(0), getPhysicalY(0));
    canvasCtx.lineTo(getPhysicalX(minX)-limitMargin, getPhysicalY(0));
    canvasCtx.stroke();

    canvasCtx.fillText('X', width - limitMargin, getPhysicalY(0) - 3)
    canvasCtx.fillText('Y', getPhysicalX(0) - 10, maxY + limitMargin)


    const startTickX = width / 1.95, finishTickX = width / 2.05;
    const startTickY = height / 1.9, finishTickY = height / 2.1;

    canvasCtx.fillText(String(-valR / 2), width / 2.05+8, getPhysicalY(0) + R / 2+2)
    canvasCtx.fillText(String(-valR), width / 2.05+8, getPhysicalY(0) + R+2)
    canvasCtx.fillText(String(valR/2), width / 2.05+8, getPhysicalY(0) - R / 2+2)
    canvasCtx.fillText(String(valR), width / 2.05+8, getPhysicalY(0) - R+2)
    canvasCtx.beginPath();
    canvasCtx.moveTo(startTickX, getPhysicalY(0) + R);
    canvasCtx.lineTo(finishTickX, getPhysicalY(0) + R);
    canvasCtx.stroke();
    canvasCtx.beginPath();
    canvasCtx.moveTo(startTickX, getPhysicalY(0) + R / 2);
    canvasCtx.lineTo(finishTickX, getPhysicalY(0) + R / 2);
    canvasCtx.stroke();
    canvasCtx.beginPath();
    canvasCtx.moveTo(startTickX, getPhysicalY(0) - R);
    canvasCtx.lineTo(finishTickX, getPhysicalY(0) - R);
    canvasCtx.stroke();
    canvasCtx.beginPath();
    canvasCtx.moveTo(startTickX, getPhysicalY(0) - R / 2);
    canvasCtx.lineTo(finishTickX, getPhysicalY(0) - R / 2);
    canvasCtx.stroke();

    canvasCtx.fillText(String(-valR/2), getPhysicalX(0) - R / 2-6, height / 2.2)
    canvasCtx.fillText(String(-valR), getPhysicalX(0) - R-3, height / 2.2)
    canvasCtx.fillText(String(valR/2), getPhysicalX(0) + R / 2-6, height / 2.2)
    canvasCtx.fillText(String(valR), getPhysicalX(0) + R-3, height / 2.2)
    canvasCtx.beginPath();
    canvasCtx.moveTo(getPhysicalX(0) + R, startTickY);
    canvasCtx.lineTo(getPhysicalX(0) + R, finishTickY);
    canvasCtx.stroke();
    canvasCtx.beginPath();
    canvasCtx.moveTo(getPhysicalX(0) + R / 2, startTickY);
    canvasCtx.lineTo(getPhysicalX(0) + R / 2, finishTickY);
    canvasCtx.stroke();
    canvasCtx.beginPath();
    canvasCtx.moveTo(getPhysicalX(0) - R, startTickY);
    canvasCtx.lineTo(getPhysicalX(0) - R, finishTickY);
    canvasCtx.stroke();
    canvasCtx.beginPath();
    canvasCtx.moveTo(getPhysicalX(0) - R / 2, startTickY);
    canvasCtx.lineTo(getPhysicalX(0) - R / 2, finishTickY);
    canvasCtx.stroke();

    drawSavedPoints(canvas, points, valR);
};


const drawSavedPoints = (canvas:HTMLCanvasElement, savedPoints: IPointFetched[], valR: number) => {
    if (savedPoints == null)
        return;

    savedPoints.forEach(point => {
        let color = (point.result === true) ? "green" : "red";
        drawPoint(canvas, point, valR, color);
    });
}


export const drawPoint = (canvas: HTMLCanvasElement, point: IPoint, valR: number, color = "red") => {
    const canvasCtx: CanvasRenderingContext2D = canvas.getContext('2d')!;
    const width = canvas.width;
    const height = canvas.height;
    let R = height / 3 / valR;

    canvasCtx.beginPath();
    canvasCtx.moveTo((width / 2) + R * point.x, (height / 2) - R * point.y);
    canvasCtx.arc((width / 2) + R * point.x, (height / 2) - R * point.y, width/300,0,2*Math.PI);
    canvasCtx.closePath();
    canvasCtx.strokeStyle = color;
    canvasCtx.fillStyle = color;
    canvasCtx.fill();
    canvasCtx.stroke();
}