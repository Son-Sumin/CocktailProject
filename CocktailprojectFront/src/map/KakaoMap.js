import axios from "axios";
import React, { useMemo, useRef } from "react";
import { useEffect, useState } from "react";
import { MapMarker, Map, CustomOverlayMap, ZoomControl } from "react-kakao-maps-sdk";
import '../css/map.css';
import parse from 'html-react-parser';
import { useParams } from "react-router-dom";
const { kakao } = window;

function KakaoMap(props) {

    // 위치데이터 가져오기
    const [Data, setData] = useState([]);

    const [isOpenList, setIsOpenList] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_ENDPOINT}/place/list`)
            .then((res) => {
                const data0 = res.data;
                console.log("#########: ", data0);
                setData(data0);
                setIsOpenList(data0.map(() => false)); // isOpenList 배열 초기화
            })
            .catch((error) =>
                console.error("error" + error))
    }, []);

    const [state, setState] = useState({
        center: {
            lat: 33.450701,
            lng: 126.570667,
        },
        errMsg: null,
        isLoading: true,
    })

    useEffect(() => {
        if (navigator.geolocation) {
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(
                position => {
                    setState(prev => ({
                        ...prev,
                        center: {
                            lat: position.coords.latitude, // 위도
                            lng: position.coords.longitude, // 경도
                        },
                        isLoading: false,
                    }))
                },
                err => {
                    setState(prev => ({
                        ...prev,
                        errMsg: err.message,
                        isLoading: false,
                    }))
                },
                { enableHighAccuracy: true, timeout: 5000 }
            )
        } else {
            // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            setState(prev => ({
                ...prev,
                errMsg: 'geolocation을 사용할수 없어요..',
                isLoading: false,
            }))
        }
    }, [])

    //뭐였지?
    const [selectedValue, setSelectedValue] = useState(null);
    useEffect(() => {
        console.log(selectedValue);
    }, [selectedValue]);


    const isLoggedIn = props;
    const token = props.token;
    const boardNo = Number(useParams().no);

    // 좋아요 버튼 (false일때에는 하얀하트, true일때에는 빨간하트)
    const [isLiked, setIsLiked] = useState(false);

    // 좋아요 개수 저장 (버튼 클릭 시 실시간으로 좋아요 개수를 반영하기 위한 state)
    const [countLiked, setCountLiked] = useState([]);

    // 클릭시 하트상태 반전
    const handleLikeClick = async (e) => {
        // 로그인 시에만 click이벤트 작동
        if (isLoggedIn) {
            await axios.post(`${process.env.REACT_APP_ENDPOINT}/cocktail/like/${boardNo}`, {}, {/*fetch주소 변경 */
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(() => {
                // Click이벤트 발생 시, 하트상태 반전을 위한 데이버를 서버에서 불러옴
                axios.get(`${process.env.REACT_APP_ENDPOINT}/cocktail/isliked/${boardNo}`, {/*fetch주소 변경 */
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((res) => {
                    const liked = res.data; // 서버에서 회원의 좋아요정보 요청 => true or false
                    setIsLiked(liked); // true or false를 isLiked state에 저장
                    console.log("좋아요 데이터 가져오기 성공: " + liked);
                }).catch((err) => {
                    console.log("좋아요 데이터 가져오기 실패ㅠㅠ");
                    console.log(err)
                })
                // console.log("좋아요 서버전달 성공!");
            }).catch((err) => {
                // console.log("좋아요 서버전달 실패!");
                console.log(err);
            });

            // Click이벤트 발생 시, 실시간으로 숫자를 반영
            axios.get(`${process.env.REACT_APP_ENDPOINT}/cocktail/countliked/${boardNo}`)
                .then((res) => {
                    const counted = res.data;
                    setCountLiked(counted);
                    console.log("좋아요 카운트데이터 가져오기 성공: " + counted);
                }).catch((err) => {
                    console.log("좋아요 카운트데이터 가져오기 실패ㅠㅠ");
                    console.log(err)
                });
        } else {
            // 비로그인 시, Click이벤트 막음
            e.preventDefault();
        }
    }

    // 렌더링 할때마다, 예전에 좋아요 버튼 클릭했다면 ♥으로 고정, 안했다면 ♡으로 고정... 서버에서 데이터를 불러옴
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ENDPOINT}/cocktail/isliked/${boardNo}`, {/*fetch주소 변경 */
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            const liked = res.data;
            setIsLiked(liked);
            console.log("좋아요 데이터 가져오기 성공: " + liked);
        }).catch((err) => {
            console.log("좋아요 데이터 가져오기 실패ㅠㅠ");
            console.log(err)
        })
    }, []);


    //스크롤 이벤트

    return (
        <div className="page" style={{ position: 'fixed', width: "100%" }}>
            <div className="box">
                <div className="boxInner"
                    style={{ float: "left", border: "solid 1px", width: '25%', height: "680px", margin: "0 0 0 10%", overflowY: 'scroll' }} >
                    {Data.map((value, index) => (
                        <div key={index} style={{ display: 'grid', gridTemplateColumns: '0.5fr 0.75fr 1fr 0.75fr', alignItems: "center", columnGap: '10px' }}>
                            <input type="radio" name="example" value={value.name} onChange={(e) => setSelectedValue(selectedValue === e.target.value ? null : e.target.value)}></input>
                            <img src={value.image} width="73" height="70" alt={value.name} />
                            <label>{value.name}</label>
                            <label> 좋아요:{value.likes ? value.likes.length : 0}</label>
                        </div>
                    ))}

                </div>
            </div>
            <Map // 지도를 표시할 Container
                id={`map`}
                center={{
                    // 지도의 중심좌표
                    lng: 127.027621,    //lon
                    lat: 37.497942,     //lat
                }}
                style={{
                    // 지도의 크기
                    width: "1000px",
                    height: "700px",
                    margin: "0 0 40% 0",
                    border: "solid 1px"
                }}
                level={4} // 지도의 확대 레벨
            >
                {/* 마커 등록 */}
                {Data.map((value, index) => {
                    if (value.name === selectedValue) {
                        return (
                            <MapMarker
                                key={`marker_${index}`}
                                position={{ lat: value.lat, lng: value.lon }}
                                onClick={() => {
                                    setIsOpenList(
                                        isOpenList.map((item, i) => (i === index ? !item : item))
                                    );
                                }}
                                image={{
                                    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                                    size: {
                                        width: 20,
                                        height: 30,
                                    }, // 마커이미지의 크기입니다
                                }}
                            />
                        );


                    }
                    else {
                        return (
                            <MapMarker
                                key={`marker_${index}`}
                                position={{ lat: value.lat, lng: value.lon }}
                                onClick={() => {
                                    setIsOpenList(
                                        isOpenList.map((item, i) => (i === index ? !item : item))
                                    );
                                }}
                                image={{
                                    src: "http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_spot.png", // 마커이미지의 주소입니다
                                    size: {
                                        width: 20,
                                        height: 30,
                                    }, // 마커이미지의 크기입니다
                                }}
                            />
                        );
                    }

                })}


                {Data.map((value, index) => (
                    isOpenList[index] && (
                        <CustomOverlayMap key={`overlay_${index}`} position={{ lat: value.lat, lng: value.lon }}>
                            <div className="wrap">
                                <div className="info">
                                    <div className="title">
                                        {value.name}
                                        <div
                                            className="close"
                                            onClick={() =>
                                                setIsOpenList(
                                                    isOpenList.map((item, i) => (i === index ? !item : item))
                                                )
                                            }
                                            title="닫기"
                                        ></div>
                                    </div>

                                    {/* 장소 정보 */}
                                    <div className="body">
                                        {/* 좋아요 */}
                                        <div className="cocktail-ingredient-image" style={{ width: "5px", height: "5px", marginLeft: '0%', marginTop: '1%', cursor: isLoggedIn ? 'pointer' : 'default' }} onClick={handleLikeClick}>
                                            <div className="cocktail-banner-box-contents-favorite" style={{ width: "5px", height: "5px" }}>
                                                {isLiked ? '♥' : '♡'}
                                            </div>
                                        </div>
                                        <div className="desc">
                                            <div className="ellipsis">{parse(value.address)}</div>
                                            <div className="jibun ellipsis">{value.telephone}</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </CustomOverlayMap>
                    )
                ))}
                {/* 현재위치 */}
                {!state.isLoading && (
                    <MapMarker
                        position={state.center}
                        image={{
                            src: "https://ssl.pstatic.net/static/maps/m/pin_rd.png", // 마커이미지의 주소입니다
                            size: {
                                width: 20,
                                height: 20,
                            }, // 마커이미지의 크기입니다
                        }}>
                        <div style={{ padding: "5px", color: "#000" }}>
                            {state.errMsg ? state.errMsg : "현재위치"}
                        </div>
                    </MapMarker>
                )}
                <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
            </Map>
        </div>
    );
}

export default KakaoMap;