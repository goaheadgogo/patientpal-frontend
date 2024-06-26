import React, { useEffect } from 'react';
const { kakao } = window;
function Map() {
  const positions = [
    {
      title: '강남구',
      address: '서울시 강남구',
    },
    {
      title: '중랑구',
      address: '서울시 중랑구',
    },
    {
      title: '중구',
      address: '서울시 중구',
    },
    {
      title: '송파구',
      address: '서울시 송파구',
    },
  ];

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 6,
    };
    const map = new kakao.maps.Map(container, options);
    positions.forEach((item) => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(item.address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${item.title}</div>`,
          });
          infowindow.open(map, marker);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      });
    });
  }, []);

  return <div id="map" className="h-full w-full"></div>;
}

export default Map;
