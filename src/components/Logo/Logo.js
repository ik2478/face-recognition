import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';


const Logo = () =>{

	

		return(
			 <div className = 'pa2'>
				<div className = 'ma4 mt0 '>
					<Tilt className="Tilt br4 shadow-2 " options={{ max : 65 }} style={{ height: 150, width: 150 }} >
 						<div className="Tilt-inner pa3"><img style = {{paddingTop:'5px'}}src = {brain} alt ='brain'/> </div>
					</Tilt>	
				</div>
			 </div>
			);





}

export default Logo;