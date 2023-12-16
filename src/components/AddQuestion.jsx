import React, { useState } from "react";
import axios from "axios";

export default function AddQuestion() {
  const [qn, setQn] = useState("");
  const [qnTags, setQnTags] = useState("");

  const addQn = async () => {
    const options = [
      document.getElementById("op1").value,
      document.getElementById("op2").value,
      document.getElementById("op3").value,
      document.getElementById("op4").value,
    ];

    const radios = document.getElementsByName("option");

    let ans = "";
    radios.forEach((radio) => {
      if (radio.checked) {
        ans = radio.nextSibling.value;
      }
    });

    const tags = qnTags.split(",");

    let difficulty_level;
    const levels = document.getElementsByName("level");

    levels.forEach((level) => {
      if (level.checked) {
        difficulty_level = level.id;
      }
    });

    const newQn = { qn, options, ans, tags, difficulty_level };

    await axios
      // .post("http://quizz-be.vercel.app/questions", newQn)
      .post("http://localhost:8800/questions", newQn)
      .then(() => {
        alert("New question created successfully");
        window.location.reload();
      })
      .catch((err) => alert("Something went wrong. Please retry"));
  };
  return (
    <div className="add">
      <h1>Add New Question</h1>
      <label htmlFor="qn" className="new-qn">
        <p>Question: </p>
        <textarea id="qn" onChange={(e) => setQn(e.target.value)}></textarea>
      </label>

      <div className="add_options">
        <p>Options. Tick the correct option</p>
        <div className="add_options-option">
          <label htmlFor="op1">
            <p>Option 1</p>
            <span>
              <input type="radio" name="option" />
              <input type="text" name="" id="op1" />
            </span>
          </label>
          <label htmlFor="op2">
            <p>Option 2</p>
            <span>
              <input type="radio" name="option" />
              <input type="text" name="" id="op2" />
            </span>
          </label>
          <label htmlFor="op3">
            <p>Option 3</p>
            <span>
              <input type="radio" name="option" />
              <input type="text" name="" id="op3" />
            </span>
          </label>
          <label htmlFor="op4">
            <p>Option 4</p>
            <span>
              <input type="radio" name="option" />
              <input type="text" name="" id="op4" />
            </span>
          </label>
        </div>
      </div>

      <div className="level">
        <p>Choose difficulty level:</p>
        <label htmlFor="easy">
          <input type="radio" name="level" id="easy" />
          <p>Easy</p>
        </label>
        <label htmlFor="normal">
          <input type="radio" name="level" id="normal" />
          <p>Normal</p>
        </label>
        <label htmlFor="hard">
          <input type="radio" name="level" id="hard" />
          <p>Hard</p>
        </label>
      </div>

      <div className="add_tags">
        <p>Add tags (comma separated for multiple tags)</p>
        <input type="text" onChange={(e) => setQnTags(e.target.value)} />
      </div>
      <button type="button" onClick={addQn}>
        Submit
      </button>
    </div>
  );
}
