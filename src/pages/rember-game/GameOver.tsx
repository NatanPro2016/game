const GameOver = ({ score }: { score: number }) => {
  return <div> {score >= 8 ? "Good Try " : "You falled like a dog"}</div>;
};

export default GameOver;
