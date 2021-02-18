import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";
import "./DeckCards.css";

const DeckCards = () => {
  const [deckId, setDeck] = useState(0);
  const [remaining, setRemaining] = useState(54);
  const [drawnCards, setDrawnCards] = useState([]);
  const [isStartDrawing, setIsStartDrawing] = useState(false);
  const [title, setTitle] = useState("Deck of Cards");

  const timer = useRef();

  useEffect(() => {
    async function loadDeck() {
      try {
        const res = await axios.get(
          "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
        );
        setDeck(res.data.deck_id);
        setRemaining((remaining) => remaining - 1);
      } catch (e) {
        console.log("API error has occured");
      }
    }
    async function drawCard() {
      try {
        const res = await axios.get(
          `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
        );
        setRemaining((remaining) => remaining - 1);
        setDrawnCards((cards) => [...cards, res.data.cards[0]]);
      } catch (e) {
        console.log("API error has occured...");
      }
    }

    //initialize deck
    if (remaining === 54) loadDeck();
    //timer 1 second for each card to appear
    if (isStartDrawing && remaining) {
      timer.current = setInterval(() => {
        drawCard();
      }, 100);
    }
    if (!remaining) {
      setTitle("Drawing Completed!!!");
    }

    return () => {
      //clean our interval
      clearInterval(timer.current);
    };
  }, [isStartDrawing, remaining, drawnCards, deckId]);

  const stopTimer = () => {
    /*Stop timer*/
    clearInterval(timer.current);
    setIsStartDrawing((stop) => !stop);
    setTitle("Drawing Initiated...");
  };
  const startTimer = () => {
    /*Start timer*/
    setIsStartDrawing((stop) => !stop);
    setTitle("Drawing Stopped");
  };
  const resetDeck = () => {
    /*Reset our Deck*/
    setDrawnCards([]);
    setRemaining(54);
    setTitle("Deck of Cards");
  };

  return (
    <div>
      <h1>{title}</h1>
      {remaining !== 0 && (
        <button
          id="button"
          onClick={isStartDrawing ? startTimer : stopTimer}
          className="DeckCards-button"
        >
          {isStartDrawing ? "Stop" : "Gimme Cards"}
        </button>
      )}

      <button className="DeckCards-button" onClick={resetDeck}>
        Reset Deck
      </button>

      <div className="DeckCards">
        {drawnCards.map((card) => (
          <Card key={card.code} id={card.code} image={card.image} />
        ))}
      </div>
    </div>
  );
};

export default DeckCards;
