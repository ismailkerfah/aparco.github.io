document.addEventListener("DOMContentLoaded", function() {
    const getLocationBtn = document.getElementById("getLocationBtn");
    const locationsList = document.getElementById("locationsList");

    getLocationBtn.addEventListener("click", function() {
        getLocationBtn.disabled = true; // Deshabilitar el botón mientras se obtiene la ubicación
        getLocationBtn.innerText = "Obteniendo ubicación..."; // Cambiar el texto del botón

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(addLocationToList, handleGeolocationError);
        } else {
            alert("Geolocalización no es soportada por tu navegador.");
            getLocationBtn.disabled = false; // Habilitar el botón en caso de error
            getLocationBtn.innerText = "Detectar mi Ubicación"; // Restaurar el texto del botón
        }
    });

    function handleGeolocationError(error) {
        alert("Error al obtener la ubicación: " + error.message);
        getLocationBtn.disabled = false; // Habilitar el botón en caso de error
        getLocationBtn.innerText = "Detectar mi Ubicación"; // Restaurar el texto del botón
    }

    function addLocationToList(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const date = new Date();
        const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>Latitud: ${latitude}, Longitud: ${longitude}</span>
            <span>${time}</span>`;
        listItem.setAttribute("data-lat", latitude);
        listItem.setAttribute("data-lng", longitude);
        locationsList.appendChild(listItem);
        getLocationBtn.disabled = false; // Habilitar el botón después de agregar la ubicación
        getLocationBtn.innerText = "Detectar mi Ubicación"; // Restaurar el texto del botón

        setTimeout(function() {
            locationsList.removeChild(listItem);
        }, 120000); // Eliminar después de 2 minutos (120,000 milisegundos)
    }

    locationsList.addEventListener("click", function(event) {
        if (event.target && event.target.nodeName === "LI") {
            const latitude = event.target.getAttribute("data-lat");
            const longitude = event.target.getAttribute("data-lng");
            openGoogleMaps(latitude, longitude);
        }
    });

    function openGoogleMaps(latitude, longitude) {
        const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(url, "_blank");
    }
});
