/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/board.css';

function Board(props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const Data1 = props.board;

    //페이징 데이터
    const [data, setData] = useState([]); // 전체 / 데이터 원본 데이터 화
    const [itemsPerPage, setItemsPerPage] = useState(10); // 한 페이지에 보여질 아이템 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    //분류 데이터
    let [board, setBoard] = useState([])
    //정렬 데이터
    let [topHitData, setTopHitData] = useState([])
    let [topFavoriteData, setTopFavoriteData] = useState([])

    //정렬 소스코드
    var sortJSON = function (data, key, type) {
        if (type == undefined) {
            type = "asc";
        }
        return data.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            if (type == "desc") {
                return x > y ? -1 : x < y ? 1 : 0;
            } else if (type == "asc") {
                return x < y ? -1 : x > y ? 1 : 0;
            }
        });
    };

    const [sorting, setSorting] = useState("desc");
    const onSorted = (e) => {
        const sortByValue = e.target.value;
        setSorting(sortByValue);
        if (sortByValue === 'asc') {
            sortJSON(board, "createdDate", "asc")
        } else if (sortByValue === 'desc') {
            sortJSON(board, "createdDate", "desc")
        }
    };

    sortJSON(topHitData, "hit", "desc")
    sortJSON(topFavoriteData, "favorite", "desc")

    //페이징 소스코드
    useEffect(() => {
        setData([...Data1])
        setBoard([...Data1]);
        setTopHitData([...Data1]);
        setTopFavoriteData([...Data1]);
    }, [Data1])

    const totalPages = Math.ceil(board.length / itemsPerPage); // 전체 페이지 수
    const startItem = (currentPage - 1) * itemsPerPage; // 현재 페이지 시작 아이템 인덱스
    const endItem = currentPage * itemsPerPage; // 현재 페이지 마지막 아이템 인덱스
    const currentData = board.slice(startItem, endItem); // 현재 페이지 데이터

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(e.target.value)
    }



    return (
        <div className="board-container">
            <div className='banner' style={{backgroundColor:'white', border:'1px solid black', borderRadius:'10px'}}>
                <div className="board-bestcontents-container">
                    <div style={{ gridColumn: '1/3' }}>
                        <h1 style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'center', cursor:'default' }}>오늘의 Best게시글</h1>
                    </div>

                    <div>
                        <h3 style={{ marginTop: '10px', marginLeft:'15px', cursor:'default' }}>조회순 ▼</h3>
                    </div>

                    <div>
                        <h3 style={{ marginTop: '10px', marginLeft:'15px', cursor:'default' }}>인기순 ▼</h3>
                    </div>
                    {/* {topHitData.map((test, i) => {
                        if (i < 5) {
                            return (
                                <div className="board-each-bestcontents" >
                                    <Link to={`/board/view/${test.no}`}>
                                        <div className="cocktail-banner-box-minipicturebox" style={{ marginBottom: '0px', gridRow: '1/3' }}>
                                            {/* <img className="cocktail-banner-box-minipicture" src={a.url} width='420px' height='400px'></img>
                                        </div>
                                        <div style={{ gridColumn: '2/6' }}>{test.title}</div>
                                        <div style={{ gridRow: '2/3' }}>{test.createdDate}</div>
                                        <div style={{ gridRow: '2/3' }}>{test.hit}</div>
                                        <div style={{ gridRow: '2/3' }}>{test.category}</div>
                                    </Link>
                                </div>
                            )
                        }
                    })} */}

                    <div className="board-each-bestcontents" style={{gridColumn:'1/2'}}> 
                        <div className="cocktail-banner-box-minipicturebox" style={{ marginBottom: '0px', gridRow: '1/3', cursor:'pointer' }}>
                            {/* <img className="cocktail-banner-box-minipicture" src={a.url} width='420px' height='400px'></img> */}
                        </div>
                        <div style={{ gridColumn: '2/6', cursor: 'pointer' }}>제목</div>
                        <div style={{ gridRow: '2/3' }}>시간</div>
                        <div style={{ gridRow: '2/3' }}>2</div>
                        <div style={{ gridRow: '2/3' }}>3</div>
                    </div>

                    <div className="board-each-bestcontents" style={{gridColumn:'1/2'}}>
                        <div className="cocktail-banner-box-minipicturebox" style={{ marginBottom: '0px', gridRow: '1/3', cursor:'pointer' }}>
                            {/* <img className="cocktail-banner-box-minipicture" src={a.url} width='420px' height='400px'></img> */}
                        </div>
                        <div style={{ gridColumn: '2/6', cursor: 'pointer' }}>제목</div>
                        <div style={{ gridRow: '2/3' }}>시간</div>
                        <div style={{ gridRow: '2/3' }}>2</div>
                        <div style={{ gridRow: '2/3' }}>3</div>
                    </div>




                    {/* ---------------------- 위는 조회순 map, 아래는 인기순 map ------------------------ */}



                    {/* 첫번째 데이터만 gridRow:'3/4' 속성을 줘야함... */}
                    <div className="board-each-bestcontents" style={{gridColumn:'2/3', gridRow:'3/4'}}> 
                        <div className="cocktail-banner-box-minipicturebox" style={{ marginBottom: '0px', gridRow: '1/3', cursor:'pointer' }}>
                            {/* <img className="cocktail-banner-box-minipicture" src={a.url} width='420px' height='400px'></img> */}
                        </div>
                        <div style={{ gridColumn: '2/6', cursor: 'pointer' }}>제목</div>
                        <div style={{ gridRow: '2/3' }}>시간</div>
                        <div style={{ gridRow: '2/3' }}>2</div>
                        <div style={{ gridRow: '2/3' }}>3</div>
                    </div>

                    <div className="board-each-bestcontents" style={{gridColumn:'2/3'}}> 
                        <div className="cocktail-banner-box-minipicturebox" style={{ marginBottom: '0px', gridRow: '1/3', cursor:'pointer' }}>
                            {/* <img className="cocktail-banner-box-minipicture" src={a.url} width='420px' height='400px'></img> */}
                        </div>
                        <div style={{ gridColumn: '2/6', cursor: 'pointer' }}>제목</div>
                        <div style={{ gridRow: '2/3' }}>시간</div>
                        <div style={{ gridRow: '2/3' }}>2</div>
                        <div style={{ gridRow: '2/3' }}>3</div>
                    </div>

                    <div className="board-each-bestcontents" style={{gridColumn:'2/3'}}> 
                        <div className="cocktail-banner-box-minipicturebox" style={{ marginBottom: '0px', gridRow: '1/3', cursor:'pointer' }}>
                            {/* <img className="cocktail-banner-box-minipicture" src={a.url} width='420px' height='400px'></img> */}
                        </div>
                        <div style={{ gridColumn: '2/6', cursor: 'pointer' }}>제목</div>
                        <div style={{ gridRow: '2/3' }}>시간</div>
                        <div style={{ gridRow: '2/3' }}>2</div>
                        <div style={{ gridRow: '2/3' }}>3</div>
                    </div>


                </div>
            </div>

            <div className="board-menu">
                <button onClick={() => setBoard(data)}>전체</button>
                <button onClick={() => setBoard(data.filter(x => x.category === 'random'))}>자유</button>
                <button onClick={() => setBoard(data.filter(x => x.category === 'question'))}>Q&A</button>
                <select onChange={onSorted} id="sorting" value={currentData.createdDate}>
                    <option value="desc" > 최신순 </option>
                    <option value="asc" > 오래된순 </option>
                </select>
                {/* <button onClick={() => setBoard(Data1)}>초기화</button> */}

                {/* <div>&nbsp;</div> */}
                <button style={{ marginRight: '0px' }}><a href='/writing'>글쓰기</a></button>
            </div>

            <div className="board-contents">
                {currentData.map((test, mappingIndex) => {
                    return (
                        <>
                            <Link to={`/board/view/${test.no}`} className="board-each-contents">
                                <div className="board-contents-picture">
                                    {/* <img className="cocktail-banner-box-minipicture" src={a.url} width='420px' height='400px'></img> */}
                                </div>

                                <div>{test.category}</div>
                                <div style={{ gridRow: '2/3' }}>{test.member.nickname}</div>
                                <div style={{ gridColumn: '3/6' }}>{test.title}</div>
                                <div>{test.createdDate}</div>
                                <div>{test.hit}</div>
                                <div>{test.likeBoard.length}</div>
                            </Link>
                            <div style={{ border: '1px solid #ddd', marginBottom: '20px' }}></div>
                        </>
                    )
                })}

            </div>
            {/* 페이징 UI */}
            <div className="pagination flex justify-content-center" >
                {/* 이전 버튼 */}
                {currentPage !== 1 && (
                    <button className='page-button' onClick={() => handlePageChange(currentPage - 1)}>
                        <span>Previous</span>
                    </button>
                )}

                {/* 페이지 번호 목록 */}
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""} //css 수정해야됨 : .active를 변경시 현재페이지 표시됨 
                    >
                        {index + 1}
                    </button>
                ))}

                {/* 다음 버튼 */}
                {currentPage !== totalPages && (
                    <button className='page-button' onClick={() => handlePageChange(currentPage + 1)}> 
                        <span>Next</span>
                    </button>
                )}
            </div>
        </div>



    )
}


export default Board;