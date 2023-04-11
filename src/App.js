import { Component } from "react";
import "./App.css";
import Globe from 'react-globe.gl';	
import WeatherService from "./weatherServices.js";


class App extends Component {
	state = {
		dataCity: {},
		value: null  
		
	}

	weatherService = new WeatherService();

	gData = [...Array(20).keys()].map(() => ({
		lat: (Math.random() - 0.5) * 180,
		lng: (Math.random() - 0.5) * 360,
		size: Math.random() / 3,
		color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
	  }))

    inputChange = (e) => {
        this.setState({
            value: e.target.value
        });
		console.log(this.state.value);
        
    }

	componentDidMount() {
		
        this.weatherService.getCityByName("Aktobe").then(res => {
			this.setState({ dataCity: res })
			console.log(res);
		})
		.catch((error) => {
			this.props.removeCity(this.props.cityName);
			this.props.alertAdd({
				label: `Sorry but city with name "${this.props.cityName}" undefined`,
				id: error.name + this.props.itemId,
				type: 'error'
			})
		})
	}

    formSubmit = (e) => {
		e.preventDefault();
        this.weatherService.getCityByName(this.state.value).then(res => {
			this.setState({ dataCity: res })
			console.log(res);
		})
		.catch((error) => {
			this.props.removeCity(this.props.cityName);
			this.props.alertAdd({
				label: `Sorry but city with name "${this.props.cityName}" undefined`,
				id: error.name + this.props.itemId,
				type: 'error'
			})
		})
    }

	pointOfView
	

	render () {
		if (this.state.dataCity != null) {
			console.log(this.state.dataCity.coordLat);
		}

		return (
			<div className="App">
					<form className={"main-form"} onSubmit={this.formSubmit}>
						<input name="city" onChange={this.inputChange} placeholder={"Search city here"}/>
						<button>Search</button>
					</form>
					<Globe
				      globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
						pointsData={[{
							lat: this.state.dataCity != null ? this.state.dataCity.coordLat : 52,
							lng: this.state.dataCity != null ? this.state.dataCity.coordLon : 22,
							size: .5,
							color: ['red', 'white', 'blue'][Math.round(Math.random() * 3)]

						}]}
						pointAltitude="size"
						pointColor="color"
						pointRadius={.5}
						pointLabel={this.state.dataCity != null ? this.state.dataCity.name : null}
					/>
					<div className="weather">
						<div className="weather-title">Weather in {this.state.dataCity.name}</div>
						<div className="weather-temp">Temperature: {this.state.dataCity.temp} °C</div>
						<div className="weather-temp">Wind: {this.state.dataCity.windSpeed} m/s</div>
						<div className="weather-temp">Today in {this.state.dataCity.name} {this.state.dataCity.weatherDescr}</div>

					</div>
			</div>
		);

	}
}

export default App;