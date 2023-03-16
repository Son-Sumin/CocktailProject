import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { MapMarker, Map, CustomOverlayMap } from "react-kakao-maps-sdk";
import '../css/map.css';
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
    // useEffect(() => {
    //     const container = document.getElementById("map");
    //     // 위치정보 가져오기
    //     navigator.geolocation.getCurrentPosition(
    //       (position) => {
    //         const { latitude, longitude } = position.coords;
    //         const currentPosition = new kakao.maps.LatLng(latitude, longitude);
    //         // 지도 중심 위치
    //         const options = {
    //           // 높은 정확도 요청, 배터리 수명에 영향줄 수 있으므로 사용 시 유의!!
    //           // enableHighAccuracy: true,
    //           center: currentPosition,
    //           level: 5,
    //         };
    //         const map = new kakao.maps.Map(container, options);
    //         // 현재 위치 마커 표시
    //         const currentMarker = new kakao.maps.Marker({
    //           position: currentPosition,
    //           title: "현재위치",
    //           map: map,
    //           image: redMarkerImage,
    //         });

    //         const locations = [
    //           {
    //             title: "마커1",
    //             latlng: new kakao.maps.LatLng(37.498216, 127.027548),
    //             content: "마커1입니다.",
    //           },
    //           {
    //             title: "마커2",
    //             latlng: new kakao.maps.LatLng(37.498322, 127.029808),
    //             content: "마커2입니다.",
    //           },
    //           {
    //             title: "마커3",
    //             latlng: new kakao.maps.LatLng(37.498895, 127.027118),
    //             content: "마커3입니다.",
    //           },
    //         ];
    //         locations.forEach((location) => {
    //           const marker = new kakao.maps.Marker({
    //             position: location.latlng,
    //             map: map,
    //             title: location.title,
    //           });
    //           const infowindow = new kakao.maps.InfoWindow({
    //             content: location.content,
    //           });
    //           kakao.maps.event.addListener(marker, "mouseover", function () {
    //             infowindow.open(map, marker);
    //           });
    //           kakao.maps.event.addListener(marker, 'mouseout', function() {
    //             // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
    //             infowindow.close();
    //         });
    //         });
    //       },
    //       (error) => {
    //         console.error(error);
    //         // 위치정보를 가져오는데 실패했을 때 강남역 좌표로 설정
    //         const options = {
    //           center: new kakao.maps.LatLng(37.497942, 127.027621),
    //           level: 3,
    //         };
    //       }
    //     );
    //   }, []);
    const [isOpen, setIsOpen] = useState(false)

    const markerPosition = {
        lat: 33.450701,
        lng: 126.570667,
    }

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
                {/* <div id="map" style={{ width: "500px", height: "500px", margin: "auto" }}></div> */}
                <Map // 지도를 표시할 Container
                    id={`map`}
                    center={{
                        // 지도의 중심좌표
                        lat: 37.497942,
                        lng: 127.027621,
                    }}
                    style={{
                        // 지도의 크기
                        width: "800px",
                        height: "700px",
                        margin: "0  50% ",
                        border: "solid 1px"
                    }}
                    level={3} // 지도의 확대 레벨
                >
                    <MapMarker position={markerPosition} onClick={() => setIsOpen(true)} />
                    {isOpen && (
                        <CustomOverlayMap position={markerPosition}>
                            <div className="wrap">
                                <div className="info">
                                    <div className="title">
                                        카카오 스페이스닷원
                                        <div
                                            className="close"
                                            onClick={() => setIsOpen(false)}
                                            title="닫기"
                                        ></div>
                                    </div>
                                    <div className="body">
                                        <div className="img">
                                            <img
                                                src="//t1.daumcdn.net/thumb/C84x76/?fname=http://t1.daumcdn.net/cfile/2170353A51B82DE005"
                                                width="73"
                                                height="70"
                                                alt="카카오 스페이스닷원"
                                            />
                                        </div>
                                        <div className="desc">
                                            <div className="ellipsis">
                                                제주특별자치도 제주시 첨단로 242
                                            </div>
                                            <div className="jibun ellipsis">
                                                (우) 63309 (지번) 영평동 2181
                                            </div>
                                            <div>
                                                <a
                                                    href="https://www.kakaocorp.com/main"
                                                    target="_blank"
                                                    className="link"
                                                    rel="noreferrer"
                                                >
                                                    홈페이지
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ;
                        </CustomOverlayMap>
                    )}
                </Map>
                {/* <Map center={{ lat: 33.5563, lng: 126.79581 }} style={{ width: "500px", height: "500px" }}>
             <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
                 <div style={{ color: "#000" }}>Hello World!</div>
             </MapMarker>
         </Map> */}
            </div>
        </>
    );
}

export default KakaoMap;