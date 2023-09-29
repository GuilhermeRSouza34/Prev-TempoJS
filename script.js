document.addEventListener("DOMContentLoaded", function() {
    const input = document.querySelector("#city-input");
    const button = document.querySelector("#search-button");
    const img = document.querySelector("#weather-icon");

    const city = document.querySelector("#city");
    const degree = document.querySelector("#degree");

    const content = document.querySelector(".content");

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); 
            if (!input.value) return;
            getWeatherData();
        }
    });

    button.addEventListener("click", () => {
        if (!input.value) return;
        getWeatherData();
    });

    async function getWeatherData() {
        let apiKey = "cd0fffc7e4564581dbb20859831ea3ea"; 
        let urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input.value)}&units=metric&appid=${apiKey}`;
        try {
            const response = await fetch(urlAPI);
            if (response.ok) {
                const data = await response.json();
                if (data?.main) {
                    loadWeatherInfo(data);
                } else {
                    alert("Informações de previsão não encontradas para esta cidade.");
                }
            } else {
                alert("Cidade não encontrada.");
            }
        } catch (error) {
            alert(error);
        }
    }

    function loadWeatherInfo(data) {
        city.innerHTML = `${data.name}, ${data.sys.country}`;
        degree.innerHTML = `Temperatura atual: ${Math.floor(data.main.temp)}°C`;
        
        const weatherCode = data.weather[0].id;
        if (weatherCode >= 200 && weatherCode < 600) {
            img.className = "rainy";
        } else if (weatherCode >= 600 && weatherCode < 700) {
            img.className = "snowy";
        } else if (weatherCode >= 700 && weatherCode < 800) {
            img.className = "cloudy";
        } else if (weatherCode === 800) {
            img.className = "sunny";
        } else {
            img.className = "unknown";
        }

        content.style.display = "block";
    }
});