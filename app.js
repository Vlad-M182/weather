class Weather {
	constructor(cityName,humidity,pressure,wind,deg,description,temperature,min,max,feel,img_code,parent) {
		this.cityName = cityName,
		this.humidity = humidity,
		this.pressure = pressure,
		this.wind = wind,
		this.deg = deg,
		this.description = description,
		this.temperature = temperature,
		this.min = min,
		this.max = max,
		this.feel = feel,
		this.img_code = img_code,
		this.parent = parent
	}

	render() {
		let weatherBody = document.createElement('weather__body');
		weatherBody.classList.add('weather__body');
		weatherBody.innerHTML = `
			<div class="weather__col">
			<p class="name">${this.cityName}</p>
				<p class="humidity">Humidity: ${this.humidity}%</p>
				<p class="pressure">Pressure: ${this.pressure} hPa</p>
				<p class="wind">Wind: ${this.wind} km/h / ${this.deg} deg</p>
			</div>
			<div class="weather__col">
				<p class="weather__image">
					<img src="https://openweathermap.org/img/w/${this.img_code}.png" alt="">
				</p>
				<p class="temp">${parseInt(this.temperature)}℃</p>
				<p class="description">Description: ${this.description}</p>
				<p class="borders">Min: ${this.min}℃ - Max: ${this.max}℃</p>
				<p class="feels">Feels like: ${this.feel}℃</p>
			</div>
		`
		this.parent.append(weatherBody);
	}
}

let parent = document.querySelector('.weather');

fetch('https://api.openweathermap.org/data/2.5/weather?q=kyiv&units=metric&APPID=5d066958a60d315387d9492393935c19')
.then(response => response.json())
.then(data => {
	new Weather(
		data.name,
		data.main.humidity,
		data.main.pressure,
		data.wind.speed,
		data.wind.deg,
		data.weather.map((item) => item.description)[0],
		data.main.temp,
		data.main.temp_min,
		data.main.temp_max,
		data.main.feels_like,
		data.weather.map((item) => item.icon)[0],
		parent
	).render()
})

let btn = document.querySelector('button');

btn.addEventListener('click',function() {
	if(document.querySelector('.weather__body')){
		document.querySelector('.weather__body').remove();
	}
	let inputValue = document.querySelector('input');

	let cityName = inputValue.value;
	if(cityName != '') {
		let link = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=5d066958a60d315387d9492393935c19`;

		fetch(link)
		.then(response => response.json())
		.then(data => {
			new Weather(
				data.name,
				data.main.humidity,
				data.main.pressure,
				data.wind.speed,
				data.wind.deg,
				data.weather.map((item) => item.description)[0],
				data.main.temp,
				data.main.temp_min,
				data.main.temp_max,
				data.main.feels_like,
				data.weather.map((item) => item.icon)[0],
				parent
			).render()
		})
	}
})
