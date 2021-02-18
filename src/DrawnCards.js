import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

const DrawnCards = ({ id, isCardsDrawn }) => {
	const [drawnCards, setDrawnCards] = useState([]);
	useEffect(() => {
		async function drawCard() {
			const res = await axios.get(
				`https://deckofcardsapi.com/api/deck/${id}/draw/?count=1`
			);
			const drawnCard = {
				...res.data.cards[0],
				rotation: Math.floor(Math.random() * 360),
			};
			setDrawnCards((cards) => [...cards, drawnCard]);
		}
		const intervalId = setInterval(() => {
			drawCard();
		}, 1000);
		return () => {
			clearInterval(intervalId);
			console.log(drawnCards);
		};
	}, [id, drawnCards]);
	return (
		<div>
			{drawnCards.map((card) => (
				<Card
					key={card.code}
					id={card.code}
					image={card.image}
					rotation={card.rotation}
				/>
			))}
		</div>
	);
};

export default DrawnCards;
