import { useState } from "react";

export default function PurchaseWidget({ event }) {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter(counter + 1);
  };

  const handleDecrement = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  return (
    <div className="bg-lime-400 shadow p-4 rounded-2xl">
      <div className="text-2xl font-bold text-center">
        Price: {event.price} € / per person
      </div>
      <div className="my-4 bg-lime-200 px-3 py-4 rounded-2xl">
        <label>Quantity:</label>
        <div className="">
          <input type="number" value={counter} className="" readOnly />
          <div className="flex justify-center gap-8 mt-2">
          <button className="px-2 py-1 bg-gray-300 rounded-full w-8 h-8" onClick={handleDecrement}>
            -
          </button>
          <button className="px-2 py-1 bg-gray-300 rounded-full w-8 h-8 text-auto" onClick={handleIncrement}>
            +
          </button>
          </div>
        </div>
      </div>
      <button className="primary hover:bg-lime-600">Buy now</button>
    </div>
  );
}
