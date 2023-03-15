// import { useEffect, useState } from "react";
// const { kakao } = window;
// // 현재위치 마커 이미지 조정
// const redMarkerImage = new kakao.maps.MarkerImage(
//   "https://ssl.pstatic.net/static/maps/m/pin_rd.png",
//   new kakao.maps.Size(20, 20),
//   {
//     offset: new kakao.maps.Point(10, 10),
//   }
// );
// function Map() {
//   useEffect(() => {
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

//   return (
//     <div id="map" style={{ width: "500px", height: "500px", margin: "auto" }}></div>
//   );
// }

// export default Map;