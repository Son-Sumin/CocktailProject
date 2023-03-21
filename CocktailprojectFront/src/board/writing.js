/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/rules-of-hooks */

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import useFetch from './useFetch';
import axios from "axios";

function writing({ setDesc, desc, setImage }, props) {
    // let Data1 = useFetch("http://localhost:5030/board")
    // const Data1 = props.board;
    const token = props.token;

    // const noData = Math.max.apply(null, Data1.map(function (v) { return v.no })) + 1;
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
            //글 등록
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

            /*  //사진 등록
             fetch(`/board/write/image`, {
                 method: "POST",
                 headers: {
                     "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}`,
                 },
                 body: JSON.stringify({
                     "imgs": imgs.current.value,
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
                 .catch(error => console.error(`저장 중 오류가 발생했습니다: ${error}`)); */

        } else {
            alert("취소되었습니다.");
        }
    }

    //ㅅㅅㅅ
    const [flag, setFlag] = useState(false);
    const imgLink = "http://localhost:5000/images/"

    const customUploadAdapter = (loader) => { // (2)
        return {
            upload() {
                return new Promise((resolve, reject) => {
                    const data = new FormData();
                    loader.file.then((file) => {
                        data.append("name", file.name);
                        data.append("file", file);

                        axios.post('/board/write', data)
                            .then((res) => {
                                if (!flag) {
                                    setFlag(true);
                                    setImage(res.data.filename);
                                }
                                resolve({
                                    default: `${imgLink}/${res.data.filename}`
                                });
                            })
                            .catch((err) => reject(err));
                    })
                })
            }
        }
    }
    function uploadPlugin(editor) { // (3)
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        }
    }
    return (
        <>
            <div className="board-container">
                <div className="signature-join-contents">
                    <h1 style={{ margin: '0px' }}>게시판 글쓰기</h1>
                </div>
                <div className="signature-join-contents">
                    <div className="board-insert-title">
                        <div>
                            <tr>
                                <td >제목</td>
                                <td ><input type="text" ref={tiRef} style={{ width: "100%" }} /></td>
                            </tr>
                            <tr>
                                <td>category</td>
                                <td>
                                    <select
                                        id="sorting"
                                        style={{ width: "100%", height: "100%" }}
                                        defaultValue="random" ref={caRef}
                                    >
                                        <option value="random">자유</option>
                                        <option value="question">Q&A</option>
                                    </select>
                                </td>
                            </tr>
                        </div>
                        <br />
                        <div>
                            <label>내용</label>
                            <CKEditor
                                editor={ClassicEditor}
                                config={{ // (4)
                                    extraPlugins: [uploadPlugin]
                                }}
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
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', columnGap: '2%' }}>

                        <form onSubmit={onSubmit}>
                            <button className="signature-contents-btn"><a href='/board'>취소</a></button>
                            <button className="signature-contents-btn">등록</button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default writing