/* eslint-disable no-sequences */
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
    const [imgData, setImgData] = useState(false);
    // 데이터 연결
    const Data1 = props.board;
    const token = props.token;
    const [board, setBoard] = useState([])
    useEffect(() => { setBoard([...Data1]); }, [Data1])

    //데이터 분류 (Params)
    const boardNo = useParams().no;
    const [Data2, setData2] = useState([])
    useEffect(() => {
        const inData = board.filter(x => x.no == boardNo)
        setData2(inData)

    }, [board])

    const [content, setContent] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    console.log("imageUrls")
    console.log(imageUrls)

    useEffect(() => {
        // 데이터베이스에서 글과 이미지 URL 가져오기
        axios.get(`${process.env.REACT_APP_ENDPOINT}/board/view/${boardNo}`)
            .then(response => {
                const { contents, imgs } = response.data;
                setContent(contents);
                const paths = imgs.map(img => `${img.path}`);
                setImageUrls(paths);
                // setImageUrls(imgs);
            });
    }, [boardNo]);

    const getInitialData = () => {
        // 초기 데이터 설정
        return content;
    };

    // const onReady = (editor) => {
    //     // 이미지 URL을 기반으로 이미지 파일 다시 불러오기
    //     editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    //         return new Promise((resolve, reject) => {
    //             const imageUrl = loader.file.url;
    //             if (imageUrl) {
    //                 axios.get(`${process.env.REACT_APP_ENDPOINT}/${imageUrl}`, { responseType: 'blob' })
    //                    .then(response => {
    //                     resolve({
    //                         default: response.data,
    //                         url: imageUrl
    //                     });
    //                 });
    //             } else {
    //                 reject(
    //                     console.log("이미지 실패")
    //                 );
    //             }
    //         });
    //     };
    // };

    // const config = {
    //     extraPlugins: [uploadPlugin],
    //     image: {
    //         toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
    //         styles: ['full', 'side'],
    //         // 이미지 로더 함수
    //         loader: (url, success, failure, progress) => {
    //             // 이미지 URL이 `imageUrls` 배열에 포함되어 있는 경우
    //             if (imageUrls.indexOf(url) !== -1) {
    //                 // 이미지 URL을 로드하여 success 함수 호출
    //                 const image = new Image();
    //                 image.src = url;
    //                 image.onload = () => {
    //                     success(image);
    //                 };
    //                 image.onerror = failure;
    //                 return;
    //             } else {
    //                 console.log("이미지 로딩 실패   ")
    //             }
    //             // 이미지 URL이 `imageUrls` 배열에 포함되어 있지 않은 경우
    //             failure();
    //         }
    //     }
    // }



    //CK에디터 데이터 받아오기
    const [contentsData, setContentsData] = useState("");
    const caRef = useRef(null);
    const tiRef = useRef(null);
    const [img, setImg] = useState(new FormData());

    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        console.log(data)
        setContentsData(data);
    };

    async function onSubmit(e) {
        e.preventDefault();
        if (confirm("저장 하시겠습니까?")) {

            //글 등록
            const response = await axios.put(`${process.env.REACT_APP_ENDPOINT}/board/update/${boardNo}`,
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
                if (imgData === false) {
                    alert("저장이 완료되었습니다.");
                    location.href = '/board';
                }
            } else {
                console.error(
                    `저장 중 오류가 발생했습니다: ${response.status} (${response.statusText})`
                );
            }

            // //사진 등록=> 임시저장되어있는 이미지 이동
            fetch(`${process.env.REACT_APP_ENDPOINT}/board/write/${boardNo}/file`, {
                method: "POST",
                body: img
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
    const data = new FormData();
    const customUploadAdapter = (loader) => {
        return {
            upload: () => {
                return new Promise(() => {
                    loader.file.then((file) => {
                        data.append("files", file);
                        setImg(data)
                        setImgData(true)
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
                                        extraPlugins: [uploadPlugin],
                                    }}
                                    // data={test.contents}
                                    data={
                                        getInitialData()
                                    }
                                    // onReady={onReady}

                                    onChange={handleEditorChange}
                                    onReady={editor => {
                                        console.log('Editor is ready to use!', editor);
                                    }}
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