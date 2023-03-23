/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/rules-of-hooks */

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function writing(props) {
    const { token } = props;

    const caRef = useRef(null);
    const tiRef = useRef(null);
    const [img, setImg] = useState(new FormData());

    //CK에디터 데이터 받아오기
    const [contentsData, setContentsData] = useState("");

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        console.log(data)
        setContentsData(data);
    };

    async function onSubmit(e) {
        e.preventDefault();
        console.log("img");
        console.log(img);
        if (confirm("저장 하시겠습니까?")) {

            //글 등록
            const response = await axios.post(
                `${process.env.REACT_APP_ENDPOINT}/board/write`,
                {
                    category: caRef.current.value,
                    title: tiRef.current.value,
                    contents: contentsData,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                console.log("글저장 완료");
            } else {
                console.error(
                    `저장 중 오류가 발생했습니다: ${response.status} (${response.statusText})`
                );
            }

            //사진 등록=> 임시저장되어있는 이미지 이동
            const resData = response.data.no;
            console.log(resData);
            console.log("img");
            console.log(img);
            fetch(`${process.env.REACT_APP_ENDPOINT}/board/write/${resData}/file`, {
                method: "POST",
                body: img
            })// body에 data를 직접 넣어줍니다.

                .then((res) => {
                    if (res.status === 200) {
                        alert("저장이 완료되었습니다.");
                         location.href = '/board';
                    } else {
                        throw new Error(`${res.status} (${res.statusText})`);
                    }
                })
                .catch((error) =>
                    console.error(`저장 중 오류가 발생했습니다: ${error}`)
                );
        } else {
            alert("취소되었습니다.");
        }
    }

    //파일업로드 플러그인
    const customUploadAdapter = (loader) => {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const data = new FormData();
                    loader.file.then((file) => {
                        data.append("files", file);
                        setImg(data)
                        fetch(`${process.env.REACT_APP_ENDPOINT}/board/write/1/file`, {
                            method: "POST",
                            body: data
                        })
                            .then((res) => {
                                const app = `${process.env.REACT_APP_ENDPOINT}/board/view/1}`.imgs
                                resolve({
                                    default: app
                                });
                            })
                            .catch((err) => {
                                reject(err);
                            });
                    });
                });
            }
        };
    }

    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        }
    }

    // //에디터 객체 생성 후 uploadPlugin 함수를 호출하여 플러그인 추가
    // const editor = new Editor({...});
    // uploadPlugin(editor);

    return (
        <>
            <div className="board-container">
                <div className="signature-join-contents">
                    <h1 style={{ margin: '0px' }}>게시판 글쓰기</h1>
                </div>
                <div className="signature-join-contents">
                    <div>
                        <div style={{ display: "flex", height: "45px" }}>
                            <select
                                id="sorting"
                                style={{ width: "15%", height: "100%" }}
                                defaultValue="random" ref={caRef}
                            >
                                <option value="random">자유</option>
                                <option value="question">Q&A</option>
                            </select>
                            {/* </div>

                        <div> */}
                            <input ref={tiRef} style={{ flexGrow: "1" }} />
                        </div>
                        <br />
                        <div>
                            <label>내용</label>
                            <CKEditor
                                editor={ClassicEditor}
                                config={{
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

                    <div style={{ display: "flex", justifyContent: "center" }}>

                        <form onSubmit={onSubmit}>
                            <Link to='/board'><button className="signature-contents-btn">취소</button></Link>
                            <button className="signature-contents-btn">등록</button>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default writing
