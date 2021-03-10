import React, {useEffect, useState} from "react";
import {IPoint} from "../../models/IPoint";
import {useSelector} from "react-redux";
import {AppState} from "../../store/ducks";
import {isError} from "../../store/ducks/Points";
import {IPointFormProps} from "../../pages/HomePage";
import Alert from "../alert/Alert";



const PointForm = ({valR, setValR, submitPoint, submitPoints}: IPointFormProps) => {

    const hasError = useSelector((state: AppState) => isError(state));
    const error = useSelector((state: AppState) => state.points.error);
    const isFetching = useSelector((state: AppState) => state.points.fetching);
    const [pointInput, setPointInput] = useState<IPoint>({x: NaN, y: 0, r: NaN});
    const [XcheckedItems, setXCheckedItems] = useState(new Map());
    const [YItem, setYItem] = useState(0);
    const [RcheckedItems, setRCheckedItems] = useState(new Map());
    var arr = new Array();

    useEffect(() => {

    }, []);


    const handleChangeX = (event: React.ChangeEvent<HTMLInputElement>) => {
        XcheckedItems.set(event.target.value, event.target.checked);
        setXCheckedItems(new Map(XcheckedItems) );
    };

    const handleChangeY = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYItem(Number(event.target.value))
    };

    const handleChangeR = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValR(Number(event.target.value));
        RcheckedItems.set(event.target.value, event.target.checked);
        setRCheckedItems(new Map(RcheckedItems) );
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        XcheckedItems.forEach((isXchecked, Xvalue)=>{
            if (isXchecked) {
                RcheckedItems.forEach((isRchecked, Rvalue)=>{
                    if (isRchecked) {
                        arr.push({x: Xvalue, y: YItem, r: Rvalue});
                    }
                });
            }
        });
        event.preventDefault();
        for (let i = 0; i < arr.length; i++) console.log(arr[i]);
        submitPoints(arr);
    };

    return (
        <>
            { hasError && <Alert type={"error"} content={error?.message} /> }

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="main-label text-white"><b>X: </b></label>
                    { [-4,-3,-2,-1,0,1,2,3,4].map(item => {
                        return (
                            <div className="form-check-inline" key={item}>
                                <input className={"form-check-input" + (hasError ? ' is-invalid' : '')}
                                       type="checkbox"
                                       checked={XcheckedItems.get(item)}
                                       onChange={handleChangeX}
                                       name="x" value={item} />
                                <label className="form-check-label">{item}</label>
                            </div>
                        )})
                    }
                </div>

                <div className="form-group">
                    <label className="main-label text-white"><b>Y: </b></label>
                    <input type="text" name="y"
                           onChange={handleChangeY}
                           className={'default-text-input' + (hasError ? ' is-invalid' : '')} />
                </div>

                <div className="form-group">
                    <label className="main-label text-white"><b>R: </b></label>
                    { [-4,-3,-2,-1,0,1,2,3,4].map(item => {
                        return (
                            <div className="form-check-inline" key={item}>
                                <input className={"form-check-input" + (hasError ? ' is-invalid' : '')}
                                       type="checkbox"
                                       checked={RcheckedItems.get(item)}
                                       onChange={handleChangeR}
                                       name="r" value={item} />
                                <label className="form-check-label">{item}</label>
                            </div>
                        )})
                    }
                </div>

                <div className="form-group">
                    <button className="default-btn btn-primary btn-block" disabled={isFetching}>
                        Add
                    </button>
                </div>
            </form>
        </>
    );
};

export default PointForm;