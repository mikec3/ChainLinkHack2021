import {React, useState, useRef, useEffect} from 'react'
import blank_diploma from './diploma-template-blank.png'

const Canvas = () => {

	const canvasRef = useRef(null);
	const imageRef = useRef(null);
	const [schoolText, setSchoolText] = useState('');
	const imgSrc = blank_diploma;
	
	useEffect(()=>{
		updateCanvas();
	}, [schoolText])

	const updateCanvas = async () => {
		const canvas = canvasRef.current;
		const image = imageRef.current;
		const ctx = canvas.getContext('2d');

		// clears canvas, otherwise text is laid on top of eachother if editing
		ctx.clearRect(0,0, canvas.width, canvas.height);

		await ctx.drawImage(image, 0, 0)
		ctx.font = '24px Courier';
		ctx.fillText(schoolText, 75, 100);
	}

	const schoolTextHandler = (e) => {
		e.preventDefault();
		setSchoolText(e.target.value);
	}

	const [testImage, setTestImage] = useState(null);
	const mintCanvasHandler = () => {
		const finalCanvas = canvasRef.current;
		setTestImage(finalCanvas.toDataURL());

	 const parts = [
	  new Blob([finalCanvas], {
	    type: 'img/png'
	  })
	 ];

	 const file = new File(parts, 'sample.png', {type:'img/png'});
	 console.log(file);

	}

	return (
		<div>
		<div>
			<canvas ref={canvasRef} width={600} height={325} />
			<form>
				<p> School Name </p>
				<input type='text' maxLength='20' onChange={schoolTextHandler}/>
			</form>
		</div>
		<button onClick={mintCanvasHandler}> Mint Canvas </button>
		<img src={testImage}/>
		<img ref={imageRef} src={imgSrc} style={{visibility:'hidden', height:'100px', width:'100px'}}/>
		</div>
	)
}
export default Canvas;

