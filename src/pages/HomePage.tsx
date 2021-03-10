import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import PointForm from "../components/point-form/PointForm";
import {useDispatch, useSelector} from "react-redux";
import {addPoint, fetchAllPoints, POINT_REQUEST_FAILURE} from "../store/ducks/Points";
import {AppState} from "../store/ducks";
import {loggedUser} from "../store/ducks/Auth";
import PointsTable from "../components/table/PointsTable";
import {IPoint, IPointFetched} from "../models/IPoint";
import PointsCanvas from "../components/canvas/PointsCanvas";
import Card from "../components/card/Card";
import {validatePoint} from "../validators";


export interface IPointsArrProps {
    points: IPointFetched[]
}
export interface IPointFormProps {
    valR: number
    setValR: Dispatch<SetStateAction<number>>

    submitPoint(point: IPoint): void
    submitPoints(point: IPoint[]): void
}


const HomePage = () => {
    const dispatch = useDispatch();
    const authSession = useSelector((state: AppState) => loggedUser(state));
    const fetchedPoints = useSelector((state: AppState) => state.points.points);
    const [valR, setValR] = useState(NaN);

    useEffect(() => {
        dispatch(fetchAllPoints(authSession));
    }, [authSession, dispatch]);


    const isValidPoint = (point: IPoint): boolean => {
        let msg = validatePoint(point);
        if (fetchedPoints.length > 0) {
            const lastPoint = fetchedPoints[fetchedPoints.length - 1];
        }
        if (msg !== "") {
            dispatch({
                type: POINT_REQUEST_FAILURE,
                payload: {name: "validation", message: msg} as Error
            });
            return false;
        }
        return true;
    }


    function submitPoint(point: IPoint) {
        point = {
            x: Number(point.x),
            y: Number(Number(point.y).toFixed(3)),
            r: Number(valR)
        };
        if (!isValidPoint(point))
            return;
        dispatch(addPoint(point, authSession));
    }

    function submitPoints(points: IPoint[]) {
        for(let i = 0; i < points.length; i ++) {
            points[i] = {
                x: Number(points[i].x),
                y: Number(Number(points[i].y).toFixed(3)),
                r: Number(points[i].r)
            };
            if (!isValidPoint(points[i]))
                return;
            dispatch(addPoint(points[i], authSession));
        }
    }


    return(
        <>
            <div className="flex-container">
                <Card title="Create a point!">
                    <PointForm valR={valR} setValR={setValR} submitPoint={submitPoint} submitPoints={submitPoints}/>
                </Card>
                <Card>
                    <PointsCanvas valR={valR}
                                  setValR={setValR}
                                  submitPoint={submitPoint}
                                  points={fetchedPoints}
                                  submitPoints={submitPoints}/>
                </Card>
            </div>
            <PointsTable points={fetchedPoints} />
        </>
    );
};

export default HomePage;