import {React, useState, useRef, useEffect} from 'react'
const SvgMint = (props) => {

	const [schoolText, setSchoolText] = useState();
	const [diplomaText, setDiplomaText] = useState();
	const [studentText, setStudentText] = useState();

	let svg = (<svg width={200} height={200} xmlns="http://www.w3.org/2000/svg" {...props}>
      		<rect x="0" y="0" width="100%" height="100%" fill="#da552f"></rect>
      		<image href="https://s3.amazonaws.com/freestock-prod/450/freestock_337915394.jpg"  height="100%" width="100%"/>
      		     <text fill="black" x="50%" y="30%" alignment-baseline="middle" text-anchor="middle" font-size="12" font-family="Verdana"> {schoolText} </text>

     		<text fill="black" x="50%" y="40%" alignment-baseline="middle" text-anchor="middle" font-size="12" font-family="Verdana">{diplomaText} </text>

     		<text fill="black" x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-size="12" font-family="Verdana">{studentText} </text>	
    		</svg>);


    const schoolTextHandler = (e) => {
    	e.preventDefault();
    	setSchoolText(e.target.value);
    }

    const diplomaTextHandler = (e) => {
    	e.preventDefault();
    	setDiplomaText(e.target.value);
    }

    const studentTextHandler = (e) => {
    	e.preventDefault();
    	setStudentText(e.target.value);
    }

    const convert = async () => {
    	//let img = svg.toDataURL('image/png')
    	//console.log(img);
    	console.log(svg)
    	//let canvas = await Canvg.from(svg);
    }

    const canvasRef = useRef(null);
    useEffect(() => {
    	const canvas = canvasRef.current;
    	const context = canvas.getContext('2d')
    	context.fillStyle = '#000000'
    	context.fillRect(0,0, context.canvas.width, context.canvas.height)
    }, [])
			
	return (
		<div>
			<input type='text' onChange={schoolTextHandler}/>
			<input type='text' onChange={diplomaTextHandler}/>
			<input type='text' onChange={studentTextHandler}/>
			{svg}

			<button onClick={convert}> export </button>

			<canvas ref={canvasRef}/>
		</div>
	)
}

export default SvgMint;


