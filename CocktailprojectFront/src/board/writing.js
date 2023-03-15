/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/rules-of-hooks */

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import useFetch from './useFetch';

function writing(props) {
    // let Data1 = useFetch("http://localhost:5030/board")
    const Data1 = props.board;
    const token = props.token;

    const noData = Math.max.apply(null, Data1.map(function (v) { return v.no })) + 1;
    const caRef = useRef(null);
    const tiRef = useRef(null);
    // const hitRef = useRef(null);
    // const rdRef = useRef(null, Date());
    // const faRef = useRef(null);
    // const unRef = useRef(null);
    //CK에디터 데이터 받아오기
    const [contentsData, setContentsData] = useState("");

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        console.log(data)
        setContentsData(data);
    };

    function onSubmit(e) {
        e.preventDefault();
        if (confirm("저장 하시겠습니까?")) {
            fetch(`/board/write`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    "category": caRef.current.value,
                    "title": tiRef.current.value,
                    "contents": contentsData,
                }),
            })
                .then(res => {
                    if (res.ok) {
                        alert("저장이 완료되었습니다.");
                        location.href = '/board'; // 브라우저 캐시를 비우기 위해 페이지를 다시 로드하세요.
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
        <>
            <h1>글쓰기</h1>
            <div>
                <>
                    <div className="App mt-5">

                        <Row>
                            <Col xs={2}>category</Col>
                            <Col xs={10}>제목</Col>
                        </Row>
                        <Row>
                            <Col xs={2}>
                                <select
                                    id="sorting"
                                    style={{ width: "100%", height: "100%" }}
                                    defaultValue="random" ref={caRef}
                                >
                                    <option value="random">자유</option>
                                    <option value="question">Q&A</option>
                                </select>
                            </Col>
                            <Col xs={10}>
                                <input type="text" ref={tiRef} style={{ width: "100%" }} />
                            </Col>
                        </Row>
                        {/* <div key={i}>변화 확인용: {RadioButton}</div> */}
                        <br />
                        <label>내용</label>
                        <CKEditor
                            editor={ClassicEditor}
                            onChange={handleEditorChange}
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            // onChange={(event, editor) => {
                            //     const data = editor.getData();
                            //     console.log({ event, editor, data });
                            // }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <form onSubmit={onSubmit}>
                            <Link to='/board'><button>목록 </button></Link>
                            <button >추가</button>
                        </form>
                    </div>
                </>
            </div>
        </>
    )
}

export default writing