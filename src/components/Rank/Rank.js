import React from 'react';



const Rank = ({name, entries}) =>{

	

		return(
				<div>
					<div className = 'white f3'>
						<p className = 'f3'>
							{`${name},Your current rank is ..`}
						</p>
					</div>
					
					<div className = 'white f1'>
						<p className = 'f3'>
							{entries}
						</p>
					</div>
				</div>
			);


	


}

export default Rank;