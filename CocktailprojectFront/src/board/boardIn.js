/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import useFetch from './useFetch'
import parse from 'html-react-parser';

const boardIn = () => {

    // 데이터 연결
    let Data1 = useFetch("http://localhost:5030/board")
    let [board, setBoard] = useState([])
    useEffect(() => { setBoard([...Data1]); }, [Data1])

    //댓글
    let Data3 = useFetch("http://localhost:7030/review")
    let [review, setReview] = useState([])
    useEffect(() => { setReview([...Data3]); }, [Data3])

    //데이터 분류 (Params)
    const boardNo = useParams();
    const Data2 = board.filter(x => x.no == boardNo.no)
    const Data4 = review.filter(x => x.board_no == boardNo.no)

    // confirm 창
    const onRemove = () => {

        if (window.confirm("정말 삭제합니까?")) {
            alert("삭제되었습니다.");
            window.location.href = '/board'
        }
    };
    console.log(Data4)

    //좋아요수 증가 함수

    const handleClick = (event, test) => {
        if (test && test.no) {
            const updatedFavorite = Number((board.filter(x => x.no === test.no))[0].favorite) + 1;
            event.preventDefault();
            fetch(`http://localhost:5030/board/${test.no}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    favorite: updatedFavorite
                })
            })
        } else {
            console.log('X or X.no is undefined or null');
        }
    };
    return (
        <div>
            {Data2.map(test => (
                <>
                    <div>
                        <table>
                            <tr>
                                <td>1.{test.category}</td>
                                <td>2.{test.title}</td>
                            </tr>
                            <tr>
                                <td>3.{test.user_no}</td>
                                <td>4.{test.reg_date} 5.{test.hit} 6.{test.favorite}</td>
                                <td style={{ width: "10%" }}>
                                    <button><Link to={`/boardRe/${test.no}`}>수정</Link></button>
                                    <button onClick={onRemove}>삭제</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    {/* 이미지창 */}
                    <div>

                    </div>
                    {/* 콘텐츠창 */}
                    <div style={{ minHeight: "800px" }}>
                        {test.contents}<br />
                        {test.contents}<br />
                        {test.contents}<br />
                        {test.contents}<br />
                    </div>
                    {/* 좋아요 버튼 */}
                    <div style={{ textAlign: "center" }}>
                        <button
                            type='button'
                            style={{ height: '100px', width: '100px', borderRadius: '50px' }}
                            onClick={(e) => handleClick(e, test)}
                        >
                            좋아요
                        </button>
                    </div>

                    {/* 댓글창 */}
                    <div>
                        <p className="text-center">
                            <h4>댓글</h4>
                        </p>
                        <table className='border text-center'>
                            {Data4.map(X => {
                                return (
                                    <tr>
                                        <td>{X.user_no}</td>
                                        <td>{parse(X.contents)}</td>
                                        <td>{X.reg_date}</td>
                                        <td style={{ width: "10%" }}>
                                            <button><Link to={`/boardRe/${test.no}`}>수정</Link></button>
                                            <button onClick={onRemove}>삭제</button>
                                        </td>
                                    </tr>

                                )
                            })}
                        </table>
                    </div>
                </>
            ))}
        </div>
    )
}

export default boardIn