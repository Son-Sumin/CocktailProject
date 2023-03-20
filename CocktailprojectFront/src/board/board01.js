/* eslint-disable */
import React from "react";
import '../App.css';
import '../css/board.css';

function Board01() {
    return (
        <div className="board-container">
            <div className='banner'>
                <div className="board-bestcontents-container">
                    <div>
                        <h2>오늘의 Best게시글 ▼</h2>
                        <h3>조회순</h3>
                    </div>
                    <div>
                        <h2>&nbsp;</h2>
                        <h3>인기순</h3>
                    </div>
                    {/*  map 돌릴때에는 <div key={content.id} style={{ gridRow: `${content.id + 1}` }}> */}
                    <div style={{display:'grid', gridTemplateColumns:'0.4fr 1fr 1fr 1fr', gridTemplateRows:'80px', columnGap:'15px'}}>
                        <div className="cocktail-banner-box-minipicturebox" style={{marginBottom:'0px'}}>
                            {/* <img className="cocktail-banner-box-minipicture" src={a.url} width='420px' height='400px'></img> */}
                        </div>
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                    </div>
                    <div style={{gridRow:'3'}}>2</div>
                    <div style={{gridRow:'4'}}>3</div>
                    <div style={{gridRow:'5'}}>4</div>
                    <div style={{gridRow:'6'}}>5</div>

                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>10</div>
                    <div>11</div>
                </div>
            </div>

            <div className="board-menu">
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
            </div>
        </div>
    )
}

export default Board01;