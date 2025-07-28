import Die from "./Die.jsx";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useEffect} from "react";

import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(()=>generateRandomNumber());// grunnen til at man kaller funskjonen slik, er for at den ikke skal kalles flere ganger. ()=> 
  const [tenzies, setTenzies] = useState(false);
  const [windowSize, setWindowSize] = useState({
  width: window.innerWidth,
  height: window.innerHeight
});

useEffect(() => {
  function handleResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  function generateRandomNumber() {
    console.log("Generating new dice");
    const newNumber = [];
    for (let i = 0; i < 10; i++) {
      //loopen styrer hvor mange knapper som genereres
      newNumber.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return newNumber;
  }
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id
          ? { ...die /*lager en kopie av object*/, isHeld: !die.isHeld } // Hvis id matcher: oppdater isHeld med motsatt verdi
          : die; //er det ingen enedringer, behold original objectet som er i  generateRandomNumber()
      })
    );
  }

  function rollDice() {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value; // alt skal være likt nulte plass sin value. Vi brukes nulte plass som referanse verdi.
    const allSameValue = dice.every((die) => die.value === firstValue);

    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");

      return;
    }

    setDice((oldDice) =>
      oldDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.floor(Math.random() * 6) + 1 }
      )
    );
  }

  function newGame() {
    setTenzies(false);
    setDice(generateRandomNumber());
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      holdDice={() => holdDice(dieObj.id)}
    />
  ));

  //lager en funksjon, som setter en ny STATE for dice

  return (
    <>
      <main>
        {tenzies && (
  <Confetti width={windowSize.width} height={windowSize.height} />
)}

        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-btn" onClick={tenzies ? newGame : rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </main>
    </>
  );
}

export default App;
