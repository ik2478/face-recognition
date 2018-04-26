import React from 'react';
import './FaceRecognition.css'



const FaceRecognition = ({box,imageUrl}) =>{

	

		return(

				<div className = 'center ma'>
				  <div className = 'absolute mt2'>
					 <img id = 'inputimage' alt = ''src = {imageUrl} width='auto' />
					 <div style = {{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}} className = 'bouncing-box'></div>
				  </div>
				</div>

			);


	


}

export default FaceRecognition;