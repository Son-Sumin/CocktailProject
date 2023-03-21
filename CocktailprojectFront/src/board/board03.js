/* eslint-disable */
import React from "react";
import { Link } from 'react-router-dom';
import '../App.css';
import '../css/board.css';

function Board03() {
    return (
        <>
        <div className="board-container">
            <div className="signature-join-contents">
                <h1 style={{margin:'0px'}}>게시판 글쓰기</h1>
            </div>
            <div className="signature-join-contents">
                <div className="board-insert-title">
                    <div>1</div>
                    <div>2</div>
                </div>

                <div style={{display:'grid', gridTemplateColumns:'1fr 200px', columnGap:'2%'}}>
                    <Link to="/board01">
                        <button className="signature-contents-btn">취소</button>
                    </Link>
                    <button className="signature-contents-btn">회원가입</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Board03;