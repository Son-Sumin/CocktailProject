/* eslint-disable */
import React from "react";
import { Link } from 'react-router-dom';
import '../App.css';
import '../css/board.css';

function Board02() {
    return (
        <>
        <div className="board-container">
            <div className="board-eachcontents-container">
                <div style={{margin:'auto'}}>
                    <h3 className="board-eachcontents-category">자유</h3>
                </div>
                <div style={{gridColumn:'2/9'}}>
                    <div>제목</div>
                </div>
                <div className="board-eachcontents-profilepicture" style={{gridRow:'2/5'}}>
                    {/* <img src=""></img> */}
                </div>
                <div style={{gridRow:'3/4'}}>닉네임</div>
                <div style={{gridRow:'3/4'}}>2023-03-20</div>
                <div style={{gridColumn:'2/8'}}>&nbsp;</div>
                <div style={{gridRow:'3/4', gridColumn:'4/5'}}>조회수</div>
                <div style={{gridRow:'3/4', gridColumn:'5/6'}}>좋아요</div>
                <button style={{gridRow:'3/4', gridColumn:'7/8'}}>수정</button>
                <button style={{gridRow:'3/4', gridColumn:'8/9'}}>삭제</button>
            </div>
            <div style={{border:'1px solid black', marginBottom:'40px', marginTop:'20px'}}></div>

            <div style={{fontSize:'20px'}}>
                내용
            </div>

            <div className="board-eachcontents-button">
                <Link to="/board01" style={{gridColumn:"2/3", margin:'auto'}}>
                    <button>목록</button>
                </Link>
                <div className="board-eachcontents-favorite">
                    <div className="board-eachcontents-favorite-contents">♡</div>
                    <div className="board-eachcontents-favorite-contents" style={{fontSize:'25px'}}>1</div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Board02;