mapboxgl.accessToken = mapToken;
const campground = JSON.parse(document.getElementById("yy").innerText);
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 4 // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h5><b>${campground.title}</b></h5><p>${campground.location}</p>`
            )
    )
    .addTo(map)