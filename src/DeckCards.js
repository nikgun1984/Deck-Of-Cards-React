import { useState, useEffect } from "react";
import axios from "axios";
import DrawnCards from "./DrawnCards";

const DeckCards = () => {
  const [deckId, setDeck] = useState(0);

  useEffect(() => {
    async function loadDeck() {
      try {
        const res = await axios.get(
          "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        setDeck(res.data.deck_id);
      } catch (e) {
        console.log("API error has occured");
      }
    }
    loadDeck();
  }, []);

  return (
    <div>
      <div>
        <DrawnCards id={deckId} />
      </div>
    </div>
  );
};

export default DeckCards;
