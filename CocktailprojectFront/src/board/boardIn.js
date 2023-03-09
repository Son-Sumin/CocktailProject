/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import useFetch from './useFetch'

function boardIn(){
// 데이터 연결
const boardNo = Number(useParams().no);
const Data = useFetch(`/board/view/${boardNo}`)

console.log(Data)
console.log(Data.reviews)

// 본문 삭제 
const onRemove = (event) => {
    event.preventDefault();
    if (confirm("정말 삭제합니까?")) {
        fetch(`/board/delete/${boardNo}`, {
            method: "DELETE"
        })
            .then(res => {
                if (res.ok) {
                    alert("삭제되었습니다.");
                    location.href = '/board'; // 브라우저 캐시를 비우기 위해 페이지를 다시 로드하세요.
                } else {
                    throw new Error(`${res.status} (${res.statusText})`);
                }
            })
            .catch(error => console.error(`실행 중 오류가 발생했습니다: ${error}`));
    } else {
        alert("취소되었습니다.");
    }
};

// 댓글 삭제 
const onRemove2 = (event, app) => {
    event.preventDefault();
    if (confirm("정말 삭제합니까?")) {
        fetch(`/board/view/${boardNo}/review/delete/${app.no}`, {
            method: "DELETE"
        })
            .then(res => {
                if (res.ok) {
                    alert("삭제되었습니다.");
                    location.href = '/board'; // 브라우저 캐시를 비우기 위해 페이지를 다시 로드하세요.
                } else {
                    throw new Error(`${res.status} (${res.statusText})`);
                }
            })
            .catch(error => console.error(`실행 중 오류가 발생했습니다: ${error}`));
    } else {
        alert("취소되었습니다.");
    }
};

//좋아요수 증가 함수

// 임시 봉인 (likes 가 배열인 이유 확인)
// const handleClick = (event, test) => {
//     if (test && test.no) {
//         const updatedFavorite = Number((Data.filter(x => x.no === test.no))[0].likes) + 1;
//         event.preventDefault();
//         fetch(`/board/list/like/${test.no}`, {
//             method: 'PATCH',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 favorite: updatedFavorite
//             })
//         })
//     } else {
//         console.log('X or X.no is undefined or null');
//     }
// };

//댓글 입력
const reRef = useRef(null);

function onSubmit(e) {
    e.preventDefault();
    if (confirm("댓글을 입력 하시겠습니까?")) {
        fetch(`/board/view/${boardNo}/review/write`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // user_no: boardNo, 
                board_no: boardNo,
                contents: reRef.current.value,
                // createdDate: Date(),
                // modifiedDate: Date()
            }),
        })
            .then(res => {
                if (res.ok) {
                    alert("입력이 완료되었습니다.");
                    location.href = `/board/${boardNo}`; // 브라우저 캐시를 비우기 위해 페이지를 다시 로드하세요.
                } else {
                    throw new Error(`${res.status} (${res.statusText})`);
                }
            })
            .catch(error => console.error(`저장 중 오류가 발생했습니다: ${error}`));
    } else {
        alert("취소되었습니다.");
    }
}

return (
    <div>
        <>
        {/* 상단 정보창 */}
            <div>
                <table>
                    <tr>
                        <td>①{Data.category}</td>
                        <td>②{Data.title}</td>
                    </tr>
                    <tr>
                        <td>③{Data.member}</td>
                        <td>④{Data.createdDate} ⑤ {Data.hit} ⑥ {Data.likes}</td>
                        <td style={{ width: "10%" }}>
                            <button><Link to={`/boardRe/${Data.no}`}>수정</Link></button>
                            <button onClick={onRemove}>삭제</button>
                        </td>
                    </tr>
                </table>
            </div>
            {/* 이미지창 */}
            <div>
                {/* test.img.map((test2)=>(
                        {test2.no}
                    )) */}
            </div>
            {/* 콘텐츠창 */}
            <div style={{ minHeight: "800px" }}>
                {/* {Data.contents} */}
                <p dangerouslySetInnerHTML={{ __html: Data.contents }}></p>
            </div>
            {/* 좋아요 버튼 */}
            <div style={{ textAlign: "center" }}>
                <button
                    type='button'
                    style={{ height: '100px', width: '100px', borderRadius: '50px' }}
                    // onClick={(e) => handleClick(e, Data)}
                >
                    좋아요
                </button>
            </div>

            {/* 댓글창 */}
            <div>
                <p className="text-center">
                    <h4>댓글</h4>
                </p>
                <div style={{ margin: "auto" }}>
                    <form onSubmit={onSubmit} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <input style={{ width: "75%", height: "40px" }} placeholder="댓글창" ref={reRef} />
                        <button style={{ width: "10%", height: "40px" }}>작성</button>
                    </form>
                </div>
                {/* 댓글창 view */}
                <table className='border text-center' style={{ margin: "auto" }}>
                    {Data && Data.reviews &&
                        <tbody>
                            {Data.reviews.map(app => {
                                return (
                                    <tr>
                                        <td>{app.member}</td>
                                        <td>{app.contents}</td>
                                        <td>{app.createdDate}</td>
                                        <td style={{ width: "10%" }}>
                                            <Link to={`/boardRe/${boardNo}`}><button>수정</button></Link>
                                            <button onClick={(e)=>onRemove2(e,app)}>삭제</button>
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td> 1</td>
                                <td>semple01</td>
                                <td>2023-03-08</td>
                                <td style={{ width: "10%" }}>
                                    <button><Link to={`/boardRe/${boardNo}`}>수정</Link></button>
                                    {/* <button onClick={onRemove2}>삭제</button> */}
                                </td>
                            </tr>
                        </tbody>
                    }
                </table>
            </div>
        </>
    </div>
)
}

export default boardIn