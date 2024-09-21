interface props {
  score: number;
}

const WinPage = ({ score }: props) => {
  return (
    <div>
      {score > 1 ? (
        <div className="flex gap-2 items-center flex-col w-60 text-center">
          <p className="text-[2rem] font-bold text-gray-100"> Proud winner</p>
          <img
            src="/clapping-cat.gif"
            alt=""
            className="w-60 h-60 object-cover rounded-lg"
          />
          <p className="text-gray-300 text-sm">
            You won very rare low quality clapping cat card
          </p>
        </div>
      ) : (
        <div className="flex gap-2 items-center flex-col w-60 text-center">
          <p className="text-[2rem] font-bold text-gray-100">You almost lost</p>
          <img src="/brother-eww.jpg" alt="" className="rounded-lg" />
          <p className="text-gray-300 text-sm"> you got brother eww card</p>
        </div>
      )}
    </div>
  );
};

export default WinPage;
