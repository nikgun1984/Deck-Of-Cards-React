import "./Card.css";
import {useState} from 'react';

const Card = (props) => {
	const [{angle, xPos, yPos}] = useState({
    angle: Math.random() * 90 - 45,
    xPos: Math.random() * 40 - 20,
    yPos: Math.random() * 40 - 20
  });

  const transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
	return (
		<div
			className="Card"
			id={props.id}
			style={{ transform }}
		>
			<img src={props.image} alt="no img present" />
		</div>
	);
};

export default Card;
