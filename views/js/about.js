function initMap() {
  const location = {
    lat:50.006147,
    lng:36.226999,
  }
  const options = {
    center:location,
    zoom:17
  }
  const map = new google.maps.Map(document.querySelector('.map'),options);
  const mapMobile = new google.maps.Map(document.querySelector('.mapMobile'),options);
  const marker = new google.maps.Marker({position: location, map: map});
  const mobileMarker = new google.maps.Marker({position: location, map: mapMobile});
}
