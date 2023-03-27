/* eslint-disable no-restricted-globals */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function boardRe(props) {
    // 데이터 연결
    const Data1 = props.board;
    const token = props.token;
    const [board, setBoard] = useState([])
    const [content, setContent] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    useEffect(() => { setBoard([...Data1]); }, [Data1])

    //데이터 분류 (Params)
    const boardNo = useParams().no;
    const [Data2, setData2] = useState([])
    useEffect(() => {
        const inData = board.filter(x => x.no == boardNo)
        setData2(inData)

        // setContent(inData.contents);
        // const paths = inData.imgs.map(img => img.path);
        // setImageUrls(paths);

    }, [board])




    // useEffect(() => {
    //     // 데이터베이스에서 글과 이미지 URL 가져오기
    //     axios.get(`${process.env.REACT_APP_ENDPOINT}/board/view/${boardNo}`)
    //         .then(response => {
    //             const { contents, imgs } = response.data;
    //             setContent(contents);
    //             const paths = imgs.map(img => img.path);
    //             setImageUrls(paths);
    //             console.log("imageUrls")
    //             console.log(typeof imageUrls)
    //             console.log(imageUrls)
    //             console.log("content")
    //             console.log(typeof content)
    //             console.log(content)
    //         });
    // }, [boardNo]);

    const getInitialData = () => {
        // 초기 데이터 설정
        return content;
    };

    const onReady = (editor) => {
        // 이미지 URL을 기반으로 이미지 파일 다시 불러오기
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new Promise((resolve, reject) => {
                const imageUrl = loader.file.url;
                if (imageUrl) {
                    axios.get(imageUrl, { responseType: 'blob' }).then(response => {
                        resolve({
                            default: response.data,
                            url: imageUrl
                        });
                    });
                } else {
                    reject();
                }
            });
        };
    };



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
        if (confirm("저장 하시겠습니까?")) {

            //글 등록
            const response = await axios.post(
                `${process.env.REACT_APP_ENDPOINT}/board/update/${boardNo}`,
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
                body: imageUrls
            }) // body에 data를 직접 넣어줍니다.
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

    return (
        <>
            <div className="board-container">
                <div className="signature-join-contents">
                    <h1 style={{ margin: '0px' }}>글 수정하기</h1>
                </div>
                {Data2.map((test, i) => (
                    <div className="signature-join-contents">
                        <div>
                            <div style={{ display: "flex", height: "45px" }}>
                                <select
                                    id="sorting"
                                    style={{ width: "15%", height: "100%" }}
                                    defaultValue={test.category} ref={caRef}
                                >
                                    <option value="random">자유</option>
                                    <option value="question">Q&A</option>
                                </select>

                                <input key={i} defaultValue={test.title} ref={tiRef} style={{ flexGrow: "1" }} />
                            </div>
                            <br />
                            <div>
                                <label>내용</label>
                                <CKEditor
                                    editor={ClassicEditor}
                                    config={{
                                        extraPlugins: [uploadPlugin]
                                    }}
                                    // data={test.contents}
                                    data={getInitialData()}
                                    onReady={onReady}

                                    onChange={handleEditorChange}
                                    // onReady={editor => {
                                    //     console.log('Editor is ready to use!', editor);
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
                                <Link to='/board'>
                                    <button className="signature-contents-btn">취소</button>
                                </Link>
                                <button className="signature-contents-btn">등록</button>
                            </form>

                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default boardRe