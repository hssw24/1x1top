import React, { useState, useEffect } from "react";

const questions = [
  [3, 3, 9], [3, 4, 12], [3, 5, 15], [3, 6, 18], [3, 7, 21], [3, 8, 24], [3, 9, 27],
  [4, 3, 12], [4, 4, 16], [4, 5, 20], [4, 6, 24], [4, 7, 28], [4, 8, 32], [4, 9, 36],
  [5, 3, 15], [5, 4, 20], [5, 5, 25], [5, 6, 30], [5, 7, 35], [5, 8, 40], [5, 9, 45],
  [6, 3, 18], [6, 4, 24], [6, 5, 30], [6, 6, 36], [6, 7, 42], [6, 8, 48], [6, 9, 54],
  [7, 3, 21], [7, 4, 28], [7, 5, 35], [7, 6, 42], [7, 7, 49], [7, 8, 56], [7, 9, 63],
  [8, 3, 24], [8, 4, 32], [8, 5, 40], [8, 6, 48], [8, 7, 56], [8, 8, 64], [8, 9, 72],
  [9, 3, 27], [9, 4, 36], [9, 5, 45], [9, 6, 54], [9, 7, 63], [9, 8, 72], [9, 9, 81]
];

const uniqueResults = [...new Set(questions.map(q => q[2]))].sort((a, b) => a - b);

const App = () => {
  const [remainingQuestions, setRemainingQuestions] = useState(questions);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [log, setLog] = useState([]);
  const [excludedQuestions, setExcludedQuestions] = useState([]);
  const [correctCount, setCorrectCount] = useState({});
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    getNewQuestion();
  }, [remainingQuestions]);

  const getNewQuestion = () => {
    if (remainingQuestions.length === 0) {
      setCurrentQuestion(null);
      return;
    }
    const newQuestion = remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)];
    setCurrentQuestion(newQuestion);
  };

  const handleAnswer = (answer) => {
    if (!currentQuestion) return;
    const correctAnswer = currentQuestion[2];
    if (answer !== correctAnswer) {
      setLog([...log, { question: `${currentQuestion[0]} × ${currentQuestion[1]}`, wrong: answer, correct: correctAnswer }]);
    } else {
      const updatedCount = { ...correctCount, [correctAnswer]: (correctCount[correctAnswer] || 0) + 1 };
      setCorrectCount(updatedCount);
      
      if (updatedCount[correctAnswer] >= 2) {
        setExcludedQuestions([...excludedQuestions, currentQuestion]);
        setRemainingQuestions(remainingQuestions.filter(q => q[2] !== correctAnswer));
      }
    }
    getNewQuestion();
  };

  const resetGame = () => {
    setRemainingQuestions(questions);
    setLog([]);
    setExcludedQuestions([]);
    setCorrectCount({});
    setStartTime(Date.now());
  };

  if (remainingQuestions.length === 0) {
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
    return (
      <div style={{ textAlign: "center", padding: "20px", maxWidth: "400px", margin: "auto" }}>
        <h2>Rechenspiel beendet!</h2>
        <p>Aufgaben gerechnet: {questions.length}</p>
        <p>Fehlerversuche: {log.length}</p>
        <p>Benötigte Zeit: {totalTime} Sekunden</p>
        <button onClick={resetGame} style={{ padding: "10px", fontSize: "18px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px" }}>Noch einmal spielen</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "400px", margin: "auto" }}>
      {currentQuestion ? <h2>{currentQuestion[0]} × {currentQuestion[1]} = ?</h2> : <h2>Alle Aufgaben abgeschlossen!</h2>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", justifyContent: "center" }}>
        {uniqueResults.map((result) => (
          <button key={result} onClick={() => handleAnswer(result)} style={{ padding: "10px", fontSize: "18px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}>{result}</button>
        ))}
      </div>
      <h3>Fehlerversuche:</h3>
      <ul>
        {log.map((entry, index) => (
          <li key={index}>{entry.question}: Falsch: {entry.wrong}, Richtig: {entry.correct}</li>
        ))}
      </ul>
      <h3>Abgeschlossene Aufgaben:</h3>
      <ul>
        {excludedQuestions.map((entry, index) => (
          <li key={index}>{entry[0]} × {entry[1]} = {entry[2]}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
