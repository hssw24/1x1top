import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

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

const MultiplicationTrainer = () => {
  const [remainingQuestions, setRemainingQuestions] = useState(questions);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [correctCount, setCorrectCount] = useState({});
  const [errors, setErrors] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (remainingQuestions.length > 0) {
      setCurrentQuestion(remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)]);
    } else {
      setGameOver(true);
    }
  }, [remainingQuestions]);

  const handleAnswer = (answer) => {
    if (!currentQuestion) return;
    const correctAnswer = currentQuestion[2];
    if (answer === correctAnswer) {
      const count = correctCount[correctAnswer] ? correctCount[correctAnswer] + 1 : 1;
      if (count >= 3) {
        setRemainingQuestions(remainingQuestions.filter(q => q[2] !== correctAnswer));
      }
      setCorrectCount({ ...correctCount, [correctAnswer]: count });
    } else {
      setErrors(errors + 1);
    }
  };

  const restartGame = () => {
    setRemainingQuestions(questions);
    setCorrectCount({});
    setErrors(0);
    setStartTime(Date.now());
    setGameOver(false);
  };

  if (gameOver) {
    const totalTime = Math.floor((Date.now() - startTime) / 1000);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h2 className="text-2xl font-bold mb-4">Glückwunsch! Du hast alle Aufgaben gemeistert!</h2>
        <p className="mb-2">Fehler: {errors}</p>
        <p className="mb-4">Zeit: {totalTime} Sekunden</p>
        <Button onClick={restartGame}>Noch einmal spielen</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {currentQuestion && (
        <Card className="p-4 mb-4 text-center w-full max-w-md">
          <CardContent>
            <h2 className="text-2xl font-bold">{currentQuestion[0]} × {currentQuestion[1]} = ?</h2>
          </CardContent>
        </Card>
      )}
      <div className="grid grid-cols-4 gap-2">
        {uniqueResults.map((result) => (
          <motion.div whileTap={{ scale: 0.9 }} key={result}>
            <Button onClick={() => handleAnswer(result)} className="w-full py-2 text-lg">{result}</Button>
          </motion.div>
        ))}
      </div>
      <p className="mt-4">Fehler: {errors}</p>
    </div>
  );
};

export default MultiplicationTrainer;
