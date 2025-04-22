import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Card from "./components/Card";

function App() {
  const defualtCards = [
    {
      path: "/images/cilek.jpg",
      matched: false,
    },
    {
      path: "/images/elma.jpg",
      matched: false,
    },
    {
      path: "/images/incir.jpg",
      matched: false,
    },
    {
      path: "/images/karpuz.jpg",
      matched: false,
    },
    {
      path: "/images/kivi.jpg",
      matched: false,
    },
    {
      path: "/images/nar.jpg",
      matched: false,
    },
  ];

  const [cards, setCards] = useState([]);
  const [selectedOne, setSelectedOne] = useState(null);
  const [selectedTwo, setSelectedTwo] = useState(null);
  const [disable, setDisable] = useState(false);

  const prepareCards = () => {
    const sortedCards = [...defualtCards, ...defualtCards]
    .sort(() => 0.5 - Math.random()) 
      .map((card) => ({...card, id:Math.random()}));

    setCards(sortedCards);
    resetState();
  };

  const handleSelected = (card) => {
    if (disable) return true;
    selectedOne ? setSelectedTwo(card) : setSelectedOne(card);
  };

  useEffect(() => {
    prepareCards();
  }, []);

  useEffect(() => {
    if (selectedOne && selectedTwo) {
      setDisable(true);

      if (selectedOne.path == selectedTwo.path) {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.path == selectedOne.path) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetState();
      } else {
        setTimeout(() => {
          resetState();
        }, 1000);
      }
    }
  }, [selectedOne, selectedTwo]);

  const resetState = () => {
    setSelectedOne(null);
    setSelectedTwo(null);
    setDisable(false);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-5 mt-20">
      <h1 className="text-3xl font-semibold text-center ">Tahmin Etme Oyunu</h1>
      <button
        className=" bg-indigo-400 px-3 py-2 rounded hover:-translate-y-1 transition-all"
        onClick={() => prepareCards()}
      >
        Oyunu Başlat
      </button>

      <div className="grid grid-cols-4 gap-2 mt-10">
        {cards.map((card, ind) => (
          <Card
            card={card}
            key={ind}
            handleSelected={handleSelected}
            disabled={disable}
            rotated={card == selectedOne || card == selectedTwo || card.matched }
          />
        ))}
      </div>
    </section>
  );
}

export default App;
