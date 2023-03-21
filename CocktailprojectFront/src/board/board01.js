/* eslint-disable */
import React from "react";
import { Link } from 'react-router-dom';
import '../App.css';
import '../css/board.css';

function Board01() {
    return (
        <div className="board-container">
            <div className='banner'>
                <div className="board-bestcontents-container">
                    <div style={{gridColumn:'1/3'}}>
                        <h1 style={{marginTop:'10px', marginBottom:'10px', textAlign:'center'}}>오늘의 Best게시글</h1>
                    </div>
                    <div>
                        <h3 style={{marginTop:'10px'}}>조회순 ▼</h3>
                    </div>
                    <div>
                        <h3 style={{marginTop:'10px'}}>인기순 ▼</h3>
                    </div>
                    {/*  map 돌릴때에는 <div key={content.id} style={{ gridRow: `${content.id + 1}` }}> */}
                    <div className="board-each-bestcontents">
                        <div className="cocktail-banner-box-minipicturebox" style={{marginBottom:'0px', gridRow:'1/3'}}>
                            {/* <img className="cocktail-banner-box-minipicture" src={a.url} width='420px' height='400px'></img> */}
                        </div>
                        <div style={{gridColumn:'2/6'}}>제목</div>
                        <div style={{gridRow:'2/3'}}>시간</div>
                        <div style={{gridRow:'2/3'}}>2</div>
                        <div style={{gridRow:'2/3'}}>3</div>
                    </div>

                    <div className="board-each-bestcontents">
                        <div className="cocktail-banner-box-minipicturebox" style={{marginBottom:'0px', gridRow:'1/3'}}>
                            {/* <img className="cocktail-banner-box-minipicture" src={a.url} width='420px' height='400px'></img> */}
                        </div>
                        <div style={{gridColumn:'2/6'}}>제목</div>
                        <div style={{gridRow:'2/3'}}>시간</div>
                        <div style={{gridRow:'2/3'}}>2</div>
                        <div style={{gridRow:'2/3'}}>3</div>
                    </div>

                    <div>7</div>
                    <div>8</div>
                    <div>9</div>
                    <div>10</div>
                    <div>11</div>
                    <div>12</div>
                </div>
            </div>

            <div className="board-menu">
                <button>전체</button>
                <button>자유게시판</button>
                <button>Q&A</button>
                <div>&nbsp;</div>
                <Link to="/board03">
                    <button style={{marginRight:'0px'}}>글쓰기</button>
                </Link>
            </div>

            <div className="board-contents">
                <div className="board-each-contents">
                    <div className="board-contents-picture">
                        {/* <img className="cocktail-banner-box-minipicture" src={a.url} width='420px' height='400px'></img> */}
                    </div>
                    <div>카테고리</div>
                    <div style={{gridRow:'2/3'}}>닉네임</div>
                    <div style={{gridColumn:'3/6'}}>제목</div>
                    <div>날짜</div>
                    <div>조회수</div>
                    <div>좋아요</div>
                </div>
                <div style={{border:'1px solid #ddd', marginBottom:'20px'}}></div>

                <div className="board-each-contents">
                    <div className="board-contents-picture">
                        {/* <img className="cocktail-banner-box-minipicture" src={a.url} width='420px' height='400px'></img> */}
                    </div>
                    <div>카테고리</div>
                    <div style={{gridRow:'2/3'}}>닉네임</div>
                    <div style={{gridColumn:'3/6'}}>제목</div>
                    <div>날짜</div>
                    <div>조회수</div>
                    <div>좋아요</div>
                </div>
                <div style={{border:'1px solid #ddd', marginBottom:'20px'}}></div>

                <div className="board-each-contents">
                    <div className="board-contents-picture">
                        {/* <img className="cocktail-banner-box-minipicture" src={a.url} width='420px' height='400px'></img> */}
                    </div>
                    <div>카테고리</div>
                    <div style={{gridRow:'2/3'}}>닉네임</div>
                    <div style={{gridColumn:'3/6'}}>제목</div>
                    <div>날짜</div>
                    <div>조회수</div>
                    <div>좋아요</div>
                </div>
                <div style={{border:'1px solid #ddd', marginBottom:'20px'}}></div>

                <div className="board-each-contents">
                    <div className="board-contents-picture">
                        {/* <img className="cocktail-banner-box-minipicture" src={a.url} width='420px' height='400px'></img> */}
                    </div>
                    <div>카테고리</div>
                    <div style={{gridRow:'2/3'}}>닉네임</div>
                    <div style={{gridColumn:'3/6'}}>제목</div>
                    <div>날짜</div>
                    <div>조회수</div>
                    <div>좋아요</div>
                </div>
                <div style={{border:'1px solid #ddd', marginBottom:'20px'}}></div>

                <div className="board-each-contents">
                    <div className="board-contents-picture">
                        {/* <img className="cocktail-banner-box-minipicture" src={a.url} width='420px' height='400px'></img> */}
                    </div>
                    <div>카테고리</div>
                    <div style={{gridRow:'2/3'}}>닉네임</div>
                    <div style={{gridColumn:'3/6'}}>제목</div>
                    <div>날짜</div>
                    <div>조회수</div>
                    <div>좋아요</div>
                </div>
                <div style={{border:'1px solid #ddd', marginBottom:'20px'}}></div>
            </div>
        </div>
    )
}

export default Board01;