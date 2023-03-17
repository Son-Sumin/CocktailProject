import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { MapMarker, Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import '../css/map.css';
import parse from 'html-react-parser';

const { kakao } = window;

// 현재위치 마커 이미지 조정
// const redMarkerImage = new kakao.maps.MarkerImage(
//     "https://ssl.pstatic.net/static/maps/m/pin_rd.png",
//     new kakao.maps.Size(20, 20),
//     {
//         offset: new kakao.maps.Point(10, 10),
//     }
// );
function KakaoMap() {
    // 위치데이터 가져오기
    const [Data, setData] = useState([]);

    const [isOpenList, setIsOpenList] = useState([]);

    useEffect(() => {
        axios
            .get(`/place/list`)
            .then((res) => {
                const data0 = res.data;
                console.log("#########: ", data0);
                setData(data0);
                setIsOpenList(data0.map(() => false)); // isOpenList 배열 초기화
            })
            .catch((error) =>
                console.error("error" + error))
    }, []);
    // useEffect(() => {
    //     const container = document.getElementById("map");
    // 위치정보 가져오기
    // navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //         const { latitude, longitude } = position.coords;
    //         const currentPosition = new kakao.maps.LatLng(latitude, longitude);
    //         // 지도 중심 위치 
    //         const options = {
    //             // 높은 정확도 요청, 배터리 수명에 영향줄 수 있으므로 사용 시 유의!!
    //             // enableHighAccuracy: true,
    //             center: currentPosition,
    //             level: 5,
    //         };
    //         const map = new kakao.maps.Map(container, options);
    //         // 현재 위치 마커 표시
    //         const currentMarker = new kakao.maps.Marker({
    //             position: currentPosition,
    //             title: "현재위치",
    //             map: map,
    //             image: redMarkerImage,
    //         });
    //     }
    // );
    // }, []);
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
      
    // // 개시판 부분
    // //scroll 이벤트 관련
    // const lastScroll = useSelector(state => state.review.current_scroll);
    // var timer;
    // const scroll = (e) => {
    //     if (timer) {
    //         clearTimeout(timer);
    //     }
    //     timer = setTimeout(function () {
    //         dispatch(reviewActions.saveCurrentScroll(e.target.scrollTop))
    //     }, 500);

    // }

    // const container = useRef(null);
    // useEffect(() => {
    //     container.current.scrollTo(0, lastScroll);
    // }, [])

    return (
        <>
            <div>
                {/* <div onScroll={scroll} ref={contain}>

                </div> */}

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
                        margin: "0 40% ",
                        border: "solid 1px"
                    }}
                    level={3} // 지도의 확대 레벨
                >
                    {/* 마커 등록 */}
                    {Data.map((value, index) => (
                        <MapMarker
                            key={`marker_${index}`}
                            position={{ lat: value.lat, lng: value.lon }}
                            onClick={() =>
                                setIsOpenList(
                                    isOpenList.map((item, i) => (i === index ? !item : item))
                                )
                            }
                        />
                    ))}
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
                                            <div className="img">
                                                <img
                                                    src={value.image}
                                                    width="73"
                                                    height="70"
                                                    alt={value.name}
                                                />
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
                          {state.errMsg ? state.errMsg : "여기에 계신가요?!"}
                        </div>
                      </MapMarker>
                    )}
                </Map>
            </div>
        </>
    );
}

export default KakaoMap;