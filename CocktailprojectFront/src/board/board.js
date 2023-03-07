/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function board(props) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // let Data1 = useFetch("http://localhost:5030/board")
    // let Data1 = useFetch("http://192.168.0.4:8080/cocktail")

    const board = props.board;

    let [eachBoard, setEachBoard] = useState([])
    let [topHitData, setTopHitData] = useState([])
    let [topFavoriteData, setTopFavoriteData] = useState([])

    useEffect(() => { setEachBoard([board]); }, [board])
    useEffect(() => { setTopHitData([...Data1]); }, [Data1])
    useEffect(() => { setTopFavoriteData([...Data1]); }, [Data1])

    // const handleSelect = (e) => {
    //     setBoard(e.target.value);
    // };

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

    // 정렬 데이터
    sortJSON(topHitData, "hit", "desc")
    sortJSON(topFavoriteData, "favorite", "desc")

    //  내림차순 이벤트

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

    // 방문자수 증가 함수

    const handleClick = (event, test) => {
        if (test && test.no) {
            const updatedHit = Number((board.filter(x => x.no === test.no))[0].hit) + 1;
            event.preventDefault();
            fetch(`http://localhost:5030/board/${test.no}`, {
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
        }
    };

    return (
        <>
            <div className='border ' style={{ margin: "auto", height: "500px", width: "1400px" }}>
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
                                                    {i + 1}. <Link to={`/boardIn/${test.no}`}>{test.title}</Link>
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
                                                    <Link to={`/boardIn/${test.no}`}>{i + 1}. {test.title}</Link>
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
                <button onClick={() => setBoard(Data1)} className='DefaultButton mx-3'>전체</button>
                <button onClick={() => setBoard(Data1.filter(x => x.category === '자유'))} className=' mx-3'>자유</button>
                <button onClick={() => setBoard(Data1.filter(x => x.category === 'Q&A'))} className=' mx-3'>Q&A</button>

                {/* <select name="sorting" id="sorting" onClick={(e) => onSorted}> */}
                <select onChange={onSorted} id="sorting" value={board.title}>{/* value : title을 기준으로 변경 */}

                    <option value="asc" > 오름차순 </option>
                    <option value="desc" > 내림차순 </option>
                </select>

            </div>
            <div className='d-flex justify-content-end'>
                <button><a href='/writing'>추가</a></button>
            </div>
            {/* 내용  그리드 */}
            <div className='m-5'>
                <Row>
                    <Col xs={1} />
                    <Col xs={10} >
                        {board.map((test, i) => (
                            <h3 className='text-center' key={i}>
                                <div className="d-flex align-items-center" style={{ float: "left", height: "67px" }}>                            <p>{test.no}</p>
                                </div>
                                <div className='border' >

                                    <Link
                                        to={`/boardIn/${test.no}`}
                                        onClick={(e) => handleClick(e, test)}
                                        style={{ textDecoration: 'none', textDecorationColor: "black" }}
                                    >
                                        <div>
                                            <Row className='mt-3 xxl'>

                                                <Col xs={1}> {test.category}</Col>
                                                <Col xs={6} className='text-start'> {test.title}</Col>
                                                <Col ><button><Link to={`/boardRe/${test.no}`}>수정</Link></button></Col>
                                            </Row>
                                            <Row className='xxl'>
                                                <Col xs={1}> {test.user_no}</Col>
                                                <Col xs={2}> {test.reg_date}</Col>
                                                <Col xs={2}> H:{test.hit}</Col>
                                                <Col xs={2}> F:{test.favorite}</Col>

                                            </Row>
                                        </div>
                                    </Link>
                                </div>
                            </h3>
                        ))}
                    </Col>
                    <Col xs={1} />
                </Row>
            </div >
        </>
    )
}

export default board;