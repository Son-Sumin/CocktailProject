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
    let [board, setBoard] = useState([])
    useEffect(() => { setBoard([...Data1]); }, [Data1])

    //데이터 분류 (Params)
    const boardNo = useParams().no;
    let [Data2, setData2] = useState([])
    useEffect(() => {
        setData2(board.filter(x => x.no == boardNo))
    }, [board])

    //카테고리 선택
    const [RadioButton, setRadioButton] = useState();

    useEffect(() => {
        Data2.map((test, i) => (
            setRadioButton(test.category)
        ));
    }, [Data2])

    const handleChange = (e) => {
        setRadioButton(e.target.value);
    };

    const caRef = useRef(null)
    const tiRef = useRef(null)

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
            fetch(`/board/update/${boardNo}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    category: caRef.current.value,
                    title: tiRef.current.value,
                    contents: contentsData
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

            // axios.patch('http://localhost:5030/board?no=1', {
            //     category: caRef.current.value,
            //     title: tiRef.current.value,
            //     contents: contentsData
            // })
            //    .then(res => res.ok ? alert("수정 완료되었습니다.") : console.error(res));

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
                                        defaultChecked={test.category}
                                        value={RadioButton}
                                        onChange={handleChange}
                                    >
                                        <option value="자유" ref={caRef}>자유</option>
                                        <option value="Q&A" ref={caRef}>Q&A</option>
                                    </select>
                                </Col>
                                <Col xs={10}>
                                    <input type="text" key={i} defaultValue={test.title} ref={tiRef} style={{ width: "100%" }} />
                                </Col>
                            </Row>
                            {/* <div key={i}>변화 확인용: {RadioButton}</div> */}
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
        </>    )
}

export default boardRe