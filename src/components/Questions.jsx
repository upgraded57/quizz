import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Questions() {
  const [qns, setQns] = useState([]);
  const [currentQn, setCurrentQn] = useState(0);
  const [rndQnsArray, setRndQnsArray] = useState([]);

  useEffect(() => {
    const fetchQns = async () => {
      await axios
        .get("https://quizzbe-production.up.railway.app/questions")
        .then((res) => {
          setQns(res.data);
        })
        .catch((err) => console.log(err));
    };

    fetchQns();
  }, []);

  const prevQn = () => {
    if (!currentQn <= 0) {
      setCurrentQn((prev) => prev - 1);
    }
  };

  const nextQn = () => {
    if (currentQn < qns?.length - 1) {
      setCurrentQn((prev) => prev + 1);
    }
  };

  // shuffle array
  function shuffle(array) {
    const newArray = [...array];
    const length = newArray.length;

    for (let start = 0; start < length; start++) {
      const randomPosition = Math.floor(
        (newArray.length - start) * Math.random()
      );
      const randomItem = newArray.splice(randomPosition, 1);

      newArray.push(...randomItem);
    }

    return newArray;
  }

  useEffect(() => {
    setRndQnsArray(() => shuffle(qns));
  }, [qns]);

  const submitQns = () => {};

  return (
    <div className="container">
      <div className="qn-num">
        <h1>{`Question ${currentQn + 1} of ${qns.length}`}</h1>
        <span
          style={{
            background:
              rndQnsArray[currentQn]?.difficulty_level === "easy"
                ? "green"
                : rndQnsArray[currentQn]?.difficulty_level === "normal"
                ? "orange"
                : "red",
          }}
        >
          {" "}
          {rndQnsArray[currentQn]?.difficulty_level}{" "}
        </span>
        <div className="qn-progress-box">
          <div
            className="qn-progress-indicator"
            style={{ transform: `scaleX(${(currentQn + 1) / qns.length})` }}
          ></div>
        </div>
      </div>
      <div className="question">
        <h3>{rndQnsArray[currentQn]?.qn}</h3>
        <div className="options">
          {rndQnsArray[currentQn]?.options?.map((option, idx) => (
            <label htmlFor={idx} key={idx}>
              <input type="radio" name={rndQnsArray[currentQn]?._id} id={idx} />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="qn-tags">
        {rndQnsArray[currentQn]?.tags?.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="btns">
        <button type="button" onClick={prevQn}>
          Prev
        </button>
        <button type="button" onClick={nextQn}>
          Next
        </button>
        <button type="button" className="submit">
          Submit
        </button>
      </div>
    </div>
  );
}
