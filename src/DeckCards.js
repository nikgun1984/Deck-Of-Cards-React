import { useState, useEffect } from "react";
import axios from "axios";
import DrawnCards from "./DrawnCards";
import './DeckCards.css';

const DeckCards = () => {
	const [deckId, setDeckId] = useState("");
	const [isCardsDrawn, setIsCardDrawn] = useState(false);
	useEffect(() => {
		async function loadDeck() {
			const res = await axios.get(
				"https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
			);
			setDeckId(res.data.deck_id);
		}
		loadDeck();
	}, []);
	const handleClick = () => {
		setIsCardDrawn(!isCardsDrawn);
	};
	return (
		<div>
			<button id="button" onClick={handleClick} className="DeckCards-button">
				Gimme a Card
			</button>
			<div className="DeckCards">
				{isCardsDrawn && <DrawnCards id={deckId} isCardsDrawn={isCardsDrawn} />}
			</div>
		</div>
	);
};

export default DeckCards;
