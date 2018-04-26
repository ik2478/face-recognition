import React from 'react';
import './ImageLinkForm.css'





const ImageLinkForm = ({onInputChange ,onButtonSubmit}) =>{

	

		return(
			 <div className = 'pa2'>
				<p className = 'f3'>
					This is a brain magic.Try it
				</p>
				
				<div className = 'center'>
				  <div className =' form center pa4 br-pill shadow-5'>
					<input type='text' className ='f4 pa2 w-70 center' onChange ={onInputChange} placeholder = 'Please enter link'/>
					<button  onClick ={onButtonSubmit} className ='w-30 grow f4 link ph3 pv2  white bg-light-purple'>Detect</button>
				  </div>	
				</div>
			</div>	
			);





}

export default ImageLinkForm;