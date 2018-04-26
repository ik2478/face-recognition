import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';


const app = new Clarifai.App({apiKey: 'd392bd3cc6fd469d809e67c0cb83adff'});




const particlesOptions =  {
                particles: {
                  number: {
                    value:35,
                    density: {
                      enable: true,
                      value_area:400
                    }
                  }
                },
                interactivity:{
                  onhover: {
                    enable:true,
                    mode:'repulse',
                  }
                }

                } 

const initialState = {

      input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn : false,
      user :{
        id : '',
        name :'',
        email:'',
        password:'',
        entries:0,
        joined: new Date()

      }
    }
class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data)=>{

    this.setState({user:{
        id : data.id,
        name :data.name,
        email:data.email,
        password:data.password,
        entries:data.entries,
        joined: data.joined
    }})
  }


  // componentDidMount(){

  //   fetch('http://localhost:3001/').then(response=>response.json()).then(data=>console.log(data));
  // }



  calculateFaceLocation=(data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return{
      leftCol : clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: width - (clarifaiFace.bottom_row * width),

    }


  }


  displayFaceBox = (box) =>{

    console.log(box);

    this.setState({box:box})
  }
    
  onInputChange = (event) =>{

      this.setState({input:event.target.value});
    }

  onButtonSubmit = ()=>{
      this.setState({imageUrl:this.state.input});
      app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response =>{
          if(response){
            fetch('https://immense-peak-41572.herokuapp.com/image',{
              method : 'put',
              headers: {'Content-Type':'application/json'},
              body:JSON.stringify({
                      id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries:count}))
            })
            .catch(console.log)
          }
          this.displayFaceBox(this.calculateFaceLocation(response));
          console.log(response);
    console.log(response.outputs[0].data.regions[0].region_info.bounding_box);// do something with response
         })
        .catch(err => console.log(err)) 
    // there was an error
    
    
    }

  onRouteChange=(route)=>{
    if(route === 'signout'){
      this.setState(initialState)
      }else if(route === 'home'){
        this.setState({isSignedIn:true})
      }
    
    this.setState({route:route});
  }  
    



  
  render() {
    return (
      <div className="App">
        <Particles className = 'particles'
              params={particlesOptions}
            />
        <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
       { this.state.route === 'home' 
        ? <div>
            <Logo/>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
            <FaceRecognition box = {this.state.box}imageUrl={this.state.imageUrl}/>
          </div>
        :(this.state.route === 'signin'
          ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          :<Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange}/>)
          }
      </div>
    );
  }
}

export default App;
