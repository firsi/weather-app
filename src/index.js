import 'react-app-polyfill/ie9';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';





    const daysArr = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    class Weather extends React.Component{
        constructor(props){
            super(props);

            this.state = {
                weatherData:"",
                isLoaded:false,
                city:"",
                isDegree:false
            };
            this.getData = this.getData.bind(this);
            this.temp_conversionHandler = this.temp_conversionHandler.bind(this);
        }
        
        temp_conversionHandler(){
            this.setState({
                isDegree:!this.state.isDegree
            });
        }
        getData (API_URL){
            fetch(API_URL)
                // We get the API response and receive data in JSON format...
                .then(response => response.json())
                // ...then we update the users state
                .then(data =>
                    
                  {this.setState({
                    weatherData: filterJson(data),
                    isLoaded:true,
                    city:data.city.name + "," + data.city.country
                    
                  });
                
                
                }
                )
        }
        componentDidMount(){
            

            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition((position) => {
                    let API_URL = "http://api.openweathermap.org/data/2.5/forecast?lon="+position.coords.longitude+"&lat="+position.coords.latitude+"&units=imperial&APPID=5a14d658ec393bd3bc3052346e3e9db4";
        
                    this.getData(API_URL);
                
                });
                    
                }
                else{
                    let default_URL = "http://api.openweathermap.org/data/2.5/forecast?lon=-8.0004&lat=12.6493&units=imperial&APPID=5a14d658ec393bd3bc3052346e3e9db4";
                    this.getData(default_URL);
                }
            
            
            
        }
        render(){
            return(<div>
                    <div className="container">
                        <Navbar />
                        {(this.state.isLoaded) ? <DispWeather weatherData={this.state.weatherData} city={this.state.city} temp_conversionHandler={this.temp_conversionHandler} isDegree={this.state.isDegree}/>:<div />}
                        
                    </div>
                    <Suscribe />
                { console.log(this.state.weatherData)}{ console.log(this.state.isLoaded)}
                    <News />
            </div>)
        }
    }

    const Suscribe = () => {
            return(<div className="subscribe-band text-center container-fluid">
                <span>Get Daily Forecasts and Weather Alerts by Email! </span>
                <button className="subscribe-button btn btn-primary">Subscribe</button>
                </div>);
    };

    const News = () => {
        return(<div className="news-container container">
            <div className="card news">
                <div className="row">
                    <div className="col-lg-4">
                    <a href="#" className="card-link"><img src="https://s.w-x.co/wu/AP19143182631244-final-835px.jpg" alt="une image" width="100%"/></a>
                    </div>
                    <div className="col-lg-8">
                         <div className="card-body">
                             <h5 className="card-title"><a href="#" className="card-link">Terrible Night of Tornadoes</a></h5>
                             <p className="card-text">Several people were killed and damage was widespread across Missouri from a night of tornadoes, including a direct hit on Jefferson City.</p>
                         </div>  
                    </div>
                </div>
                
                
            </div>

            <div className="card news">
                <div className="row">
                    <div className="col-lg-4">
                    <a href="#" className="card-link"> <img src="https://s.w-x.co/wu/michael-oct10-vis_0.jpg" alt="une image" width="100%"/></a>
                    </div>
                    <div className="col-lg-8">
                         <div className="card-body">
                             <h5 className="card-title"><a href="#" className="card-link">The Outlook for Hurricane Season</a></h5>
                             <p className="card-text">Here's what NOAA and other forecast groups are now predicting.</p>
                         </div>  
                    </div>
                </div>
                
                
            </div>

            <div className="card news">
                <div className="row">
                    <div className="col-lg-4">
                    <a href="#" className="card-link"> <img src="https://s.w-x.co/util/image/w/Primary_est_Precip_YTD.jpg?v=at&w=320&h=180" alt="une image" width="100%"/></a>
                    </div>
                    <div className="col-lg-8">
                         <div className="card-body">
                             <h5 className="card-title"><a href="#" className="card-link">2019 Flood the Longest-Lasting Since Great Flood of 1927</a></h5>
                             <p className="card-text">The three-month long flood is setting records.</p>
                         </div>  
                    </div>
                </div>
                
                
            </div>
        </div>);
    };

    const Navbar = () => {
        var navLinkArr = document.getElementsByClassName("nav-link");
        const navHoverColors=["#36213E","#2E5EAA","#55D6BE","#2BC016","#FDE74C"];
        
        return(<nav className="navbar navbar-expand-lg">
            <a className="navbar-brand" href="#" ><img className="nav-logo" src="https://cdn.freebiesupply.com/logos/large/2x/weather-ios-logo-png-transparent.png" />  YourWeather</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
  </button>
            <div className="collapse navbar-collapse menu-wrapper" id="navbarSupportedContent">
                <ul className="nav navbar-nav">
                    <li id="item1" className="nav-item active"><a className="nav-link" href="#">Home</a></li>
                    <li id="item2" className="nav-item "><a className="nav-link" href="#">Sensor NetworkMaps</a></li>
                    <li id="item3" className="nav-item "><a className="nav-link" href="#">RadarSevere</a></li>
                    <li id="item4" className="nav-item "><a className="nav-link" href="#">WeatherNews</a></li>
                    <li id="item5" className="nav-item "><a className="nav-link" href="#">BlogsMobile</a></li>
                    
                    
                </ul>

                <form className="form-inline my-2 my-lg-0 right">
                    <input className="form-control mr-sm-2 search-bar" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-light my-2 my-sm-0 search-button" type="submit">Search</button>
                </form>
            </div>    

        </nav>)
    };

    const DispWeather = (props) => {
        var tempFareinheit = Math.trunc(props.weatherData[0].main.temp);
        var temp_main ;
        var temp_second ;
        var fareinheitToDegree_Conversion = Math.trunc((tempFareinheit - 32) *5/9);
        var unit_main, unit_second;
        if(props.isDegree){
            temp_main = fareinheitToDegree_Conversion;
            temp_second = tempFareinheit;
            unit_main = "C";
            unit_second = "F";
        }
        else{
            temp_main = tempFareinheit;
            temp_second = fareinheitToDegree_Conversion;
            unit_main = "F";
            unit_second = "C";
        }
        
        return(<div>
            <h1 className="title text-center">{props.city}</h1>
                        
                        <div className="row">
                           
                            <div className="col-sm-12 col-lg-6 current-weather text-center">
                                <div>
                                    <img className="icon" src={"http://openweathermap.org/img/w/"+props.weatherData[0].weather[0].icon+".png"} width="100" height="100"/>
                                    <div className="today-temp">{temp_main}<span className="unit"><a href="#" onClick={props.temp_conversionHandler}>°{unit_main}</a></span>
                                    <p className="degree text-center">Feels like {temp_second}<a href="#" onClick={props.temp_conversionHandler}>°{unit_second}</a></p></div>
                                    <span className="humidity">{props.weatherData[0].main.humidity}%</span>
                                </div>
                            </div>
                            <div className="col-sm-12 col-lg-6 daysForecast text-center">
                                <div className="icons-container">
                            {props.weatherData.map((current, index) => {
                                return(<div className="daysBox" key={"day"+index}>
                                <img className="daysIcon"  src={"http://openweathermap.org/img/w/"+current.weather[0].icon+".png"} width="50" height="50"/>
                                <p className="daysTemp" >{Math.trunc(current.main.temp)}°F</p>
                               
                                <p className="daysday">{dayOfWeek(current.dt)}</p></div>);
                                    
                            })} 
                            </div>
                            </div>
                           
                        </div>
            
        </div>)
    };

    function filterJson(data){
        var oldDate;
        var timestamp;
        var day; 
        var i = 0;
        let filteredList = data.list.filter((current,index) => {
            timestamp = current.dt;
            
            day = new Date(timestamp*1000).getDay();
            
            if(oldDate !== day && i<=4){
                oldDate = day;
                i++;
                return current;
                
            }
            
        });

        return filteredList;
        
    }

    function dayOfWeek(timestamp){
        var day = new Date(timestamp*1000).getDay();
        console.log(day);
    
        
        return daysArr[day];
    }

    

    ReactDOM.render(<Weather />, document.getElementById('root'));