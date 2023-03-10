/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Cocktail from "./cocktail/cocktail";
import Ingredient from "./ingredient/ingredient";

function select(props) {

    //전체 데이터 호출
    const Cdata1 = Cocktail.props
    const Idata1 = Ingredient.props
    const Sdata = useParams()

    const [Cdata, setCdata] = useState([]);
    const [Idata, setIdata] = useState([]);
    useEffect(() => {
        setCdata(Cdata1.filter(x => x && x.name === Sdata));
        setIdata(Idata1.filter(x => x && x.name === Sdata));
    }, [Cdata1, Idata1, Sdata]);

    return (
        <>
            <div>
                <h2>칵테일</h2>
                <div>
                    {Cdata.map(app => {
                        return (

                            <text>{app.no}</text>
                        )
                    })}
                </div>
            </div>
            <div>
                <h2>재료</h2>
                <div>
                    {Idata.map(app => {
                        return (

                            <text>{app.no}</text>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default select