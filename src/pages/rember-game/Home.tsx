import { useEffect, useState } from "react";
import file from "../../cards.json";
import WinPage from "./WinPage";
import GameOver from "./GameOver";

const Home = () => {
  interface file {
    img: string;
    id: number;
  }
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [cards, setCards] = useState<file[]>([]);
  const [fliped, setfliped] = useState<number[]>([]);
  const [gameOver, setGameover] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);
  const [gameStarted, setGamestarted] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [incorrectTries, setIncorrectTries] = useState<number>(3);
  const [hearts, setHearts] = useState<number[]>([]);
  const shuffleCards = () => {
    const shuffledCards1 = file.sort(() => 0.5 - Math.random()).slice(0, 6);
    const shuffledCards2 = [...shuffledCards1];

    setCards(
      shuffledCards1.concat(shuffledCards2).sort(() => 0.5 - Math.random())
    );
  };
  useEffect(() => {
    shuffleCards();
  }, []);

  const handleFlip = (index: number) => {
    if (!loading) {
      if (!fliped.includes(index)) {
        setfliped((current) => [...current, index]);

        if (currentCard !== null) {
          setLoading(true);
          if (currentCard === cards[index].id) {
            setLoading(false);
          } else {
            setTimeout(() => {
              setfliped((current) =>
                current.filter((item) => {
                  return (
                    item !== current[current.length - 1] &&
                    item !== current[current.length - 2]
                  );
                })
              );
              setLoading(false);
              setIncorrectTries((current) => current - 1);
            }, 1000);
          }
          setCurrentCard(null);
        } else {
          setCurrentCard(cards[index].id);
        }
      }
    }
  };

  const showCards = () => {
    if (cards) {
      for (let i = 0; i <= cards.length; i++) {
        setfliped((current) => [...current, i]);
      }
    }

    setTimeout(() => {
      setfliped([]);
    }, 3000);
  };

  const handleGameStart = () => {
    shuffleCards();
    showCards();
    setGamestarted(true);
    setGameover(false);
    setIncorrectTries(3);
    setWin(false);
  };

  useEffect(() => {
    if (incorrectTries <= 0) {
      setGameover(true);
      setGamestarted(false);
    }

    console.log(incorrectTries);
    const h = [];
    for (let i = incorrectTries; i >= 1; i--) {
      h.push(i);
    }
    setHearts(h);
  }, [incorrectTries]);
  useEffect(() => {
    if (fliped.length === 12) {
      setWin(true);
      setGamestarted(false);
      shuffleCards();
    }
  }, [fliped]);
  useEffect(() => {
    const handleImagesLoad = () => {
      // Select all images in the document
      const images = Array.from(document.images);
      const promises = images.map((image) => {
        // If the image is already loaded, resolve immediately
        if (image.complete) return Promise.resolve();

        // Otherwise, create a promise that resolves when the image loads
        return new Promise<void>((resolve) => {
          image.onload = () => resolve();
          image.onerror = () => resolve(); // resolve even if there's an error
        });
      });

      // Wait for all images to load
      Promise.all(promises).then(() => {
        setPageLoading(false);
      });
    };

    // Use `document.readyState` for checking if images are already loaded
    if (document.readyState === "complete") {
      handleImagesLoad();
    } else {
      window.addEventListener("load", handleImagesLoad);
    }

    // Clean up the event listener
    return () => window.removeEventListener("load", handleImagesLoad);
  }, []);

  return (
    <div className="bg-[url('/background.jpg')] bg-center-top bg-cover min-h-screen  home flex flex-col justify-center items-center text-white  ">
      {!gameOver && !win && (
        <div className="flex gap-2 m-2 ">
          {hearts.map((heart) => (
            <img src="/heart.png" alt="" className="w-4" key={heart} />
          ))}
        </div>
      )}
      <div className="backdrop-blur shadow  relative border z-10 border-[#f0e4e418] flex flex-col items-center p-4 gap-4  rounded-lg">
        {win && !gameOver && <WinPage score={incorrectTries} />}
        {gameOver && <GameOver score={fliped.length} />}
        {!gameStarted && !win && !gameOver && (
          <>
            <h1 className="text-[2rem] font-bold text-gray-100">
              Start Game You have 3 tries
            </h1>
            <p className="text-gray-300 text-sm max-w-96 text-center">
              when you click play cards will apper and show the front face for 3
              second and face the other way they you will choose the same cards
              if you get correct same cards you win and get rewarded for you
              effort simply remembering game
              <br />
              <br />
              you got three lifes indecated by those hearts
            </p>
          </>
        )}

        <div
          className={` grid-cols-3 gap-3  rounded-lg p-1 ${
            !gameStarted || win || gameOver ? "hidden" : "grid"
          }`}
        >
          {cards.map((card, index: number) => (
            <div className="container rounded-lg" key={index}>
              <div
                className={`card ${fliped.includes(index) && "active"}`}
                id="code"
                onClick={() => handleFlip(index)}
              >
                <div className="front"></div>
                <div className="back">
                  <img
                    src={card.img}
                    alt=""
                    className="h-100 w-100 object-cover rounded"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {pageLoading && <div className="loader"></div>}
        {(!gameStarted || win) && !pageLoading && (
          <button
            onClick={handleGameStart}
            className="py-1 px-6 rounded-lg font-bold bg-slate-500"
          >
            {!gameOver && !win ? "Play" : "Play again "}
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
