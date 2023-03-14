/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import { tr, Container, td } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Board(props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const Data1 = useFetch("/board/list")
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

    const [sorting, setSorting] = useState("asc");
    const onSorted = (e) => {
        const sortByValue = e.target.value;
        setSorting(sortByValue);
        if (sortByValue === 'asc') {
            sortJSON(board, "title", "asc")
        } else if (sortByValue === 'desc') {
            sortJSON(board, "title", "desc")
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

    // 방문자수 증가 함수
    const handleClick = (event, test) => {
        if (test && test.no) {
            const updatedHit = Number((board.filter(x => x.no === test.no))[0].hit) + 1;
            event.preventDefault();
            // fetch(`http://localhost:5030/board/${test.no}`, {
            fetch(`/board/list/${test.no}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    hit: updatedHit
                })
            })
        } else {
            console.log('X or X.no is undefined or null');
        };
        window.location.href = `/board/${test.no}`;
    };


    return (
        <>
            <div className='border ' style={{ margin: "auto", height: "500px", width: "1400px", backgroundColor:'aliceblue' }}>
                <h2 className='text-center'> 오늘의 Best 게시글</h2>

                <div style={{ marginLeft: '40%' }}>
                    <table >
                        <h3>
                            <td style={{ margin: "0 auto", width: "Auto" }}>  {/* 변경한 줄 */}
                                <tr>방문 수</tr>
                                {/* 반복 i 값 변경시 출력수 변경가능 */}
                                <Container>
                                    {topHitData.map((test, i) => {
                                        if (i < 5) {
                                            return (
                                                <tr className='text-start '>
                                                    {i + 1}. <Link to={`/board/${test.no}`}>{test.title}</Link>
                                                </tr>
                                            )
                                        }
                                    })}

                                </Container>
                            </td>
                            <td style={{ margin: "0 auto", width: "Auto" }}>  {/* 변경한 줄 */}
                                <tr>좋아요 수</tr>
                                <Container>
                                    {topFavoriteData.map((test, i) => {
                                        if (i < 5) {
                                            return (
                                                <tr className='text-start'>
                                                    <Link to={`/board/${test.no}`}>{i + 1}. {test.title}</Link>
                                                </tr>
                                            )
                                        }
                                    })}
                                </Container>
                            </td>
                        </h3>
                    </table>
                </div>
            </div>

            <div className='d-flex justify-content-center mt-1'> {/* 필터 버튼 */}
                {/* <button onClick={() => {
                    const sortedData = sortJSON(board, "no", "asc");
                    setData(Data1);
                }}>
                    초기화
                </button> */}
                <button onClick={() => setBoard(Data1)} className='DefaultButton mx-3'>전체</button>
                <button onClick={() => setBoard(Data1.filter(x => x.category === 'random'))} className=' mx-3'>자유</button>
                <button onClick={() => setBoard(Data1.filter(x => x.category === 'question'))} className=' mx-3'>Q&A</button>
                {/*  */}
                <select onChange={onSorted} id="sorting" value={board.title}>   {/* value : title을 기준으로 변경 */}
                    <option value="asc" > 오름차순 </option>
                    <option value="desc" > 내림차순 </option>
                </select>

                <select id="paging" onChange={handleItemsPerPageChange} value={itemsPerPage} defaultValue={10}>
                    <option value="5" > 5 </option>
                    <option value="10" > 10 </option>
                    <option value="15" > 15 </option>
                    <option value="20" > 20 </option>
                </select>
            </div>

            <div className='d-flex justify-content-end'>
                <button><a href='/writing'>추가</a></button>
            </div>



            {/* 내용  그리드 */}
            <>
                {/* 페이지별 데이터 출력 */}
                <div className='m-5' >
                    <td >
                        <tr xs={1} />
                        <tr xs={10} >
                            {currentData.map((test, i) => {
                                // if (i < { countNo }) {
                                return (
                                    <div style={{border:"solid 1px",margin:"10px"}}>
                                        <h3 className='text-center' key={i}>
                                            <div className="d-flex align-items-center" style={{ float: "left", height: "67px" }}>
                                                <p>{test.no}</p>
                                            </div>
                                            <div className='border' >
                                                <div>
                                                    <Link onClick={(e) => handleClick(e, test)}>

                                                        <td className='mt-3 xxl'>

                                                            <tr> {test.category}</tr>
                                                            <tr className='text-start'> {test.title}</tr>
                                                        </td>
                                                        <td className='xxl'>
                                                            <tr> {test.member}</tr>
                                                            <tr> {test.createdDate}</tr>
                                                            <tr> H:{test.hit}</tr>
                                                            <tr> F:{test.likes}</tr>
                                                        </td>
                                                    </Link>
                                                </div>
                                                <div >
                                                    <button><Link to={`/board/update/${test.no}`}>수정</Link></button>
                                                </div>
                                            </div>
                                        </h3>
                                    </div>
                                )
                                // }
                            })}
                        </tr>
                        <tr xs={1} />
                    </td>
                </div >


                {/* 페이징 UI */}
                <div className="pagination flex justify-content-center" >
                    {/* 이전 버튼 */}
                    {currentPage !== 1 && (
                        <button onClick={() => handlePageChange(currentPage - 1)}>
                            Previous
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
                        <button onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                        </button>
                    )}
                </div>
            </>
        </>
    )
}


export default Board;