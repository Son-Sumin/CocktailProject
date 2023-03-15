/* eslint-disable no-restricted-globals */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

function boardRe(props) {
    // 데이터 연결
    const Data1 = props.board;
    const token = props.token;
    let [board, setBoard] = useState([])
    useEffect(() => { setBoard([...Data1]); }, [Data1])

    //데이터 분류 (Params)
    const boardNo = useParams().no;
    let [Data2, setData2] = useState([])
    useEffect(() => {
        setData2(board.filter(x => x.no == boardNo))
    }, [board])

    const caRef = useRef(null)
    const tiRef = useRef(null)

    //CK에디터 데이터 받아오기
    const [contentsData, setContentsData] = useState('');
    useEffect(() => {
        setContentsData(Data2.map(t => t.contents).join(''));
    }, [Data2]);
    console.log(contentsData)
    console.log(Data2.map(t => t.contents).join(''))    
    console.log(typeof Data2.map(t => t.contents).join(''))    
    const handleEditorChange = (event, editor) => {
        const data = editor.getData()
        setContentsData(data);
    };

    function onSubmit(e) {
        e.preventDefault();
        if (confirm("저장 하시겠습니까?")) {
            fetch(`/board/update/${boardNo}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    "category": caRef.current.value,
                    "title": tiRef.current.value,
                    "contents": contentsData
                }),
            })
                .then(res => {
                    if (res.ok) {
                        alert("수정 완료되었습니다.");
                        location.href = '/board'; // 브라우저 캐시를 비우기 위해 페이지를 다시 로드하세요.
                    } else {
                        throw new Error(`${res.status} (${res.statusText})`);
                    }
                })
                .catch(error => console.error(`수정 중 오류가 발생했습니다: ${error}`));

        } else {
            alert("취소되었습니다.");
        }
    }

    return (
        <>
            <div>
                {Data2.map((test, i) => (
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
                                        defaultValue={test.category}
                                        ref={caRef}>
                                      <option value="random">자유</option>
                                      <option value="question">Q&A</option>
                                    </select>
                                </Col>
                                <Col xs={10}>
                                    <input type="text" key={i} defaultValue={test.title} ref={tiRef} style={{ width: "100%" }} />
                                </Col>
                            </Row>
                            <br />
                            <label>내용</label>
                            <CKEditor
                                editor={ClassicEditor}
                                onChange={handleEditorChange}
                                data={test.contents}
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
                                <button >수정</button>
                            </form>
                        </div>
                    </>
                ))}
            </div>
        </>)
}

export default boardRe