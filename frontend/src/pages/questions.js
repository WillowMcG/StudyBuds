import React, { useState, useEffect } from "react";
import "./questions.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getQuestion } from "../backcon/databaseapi";

var questionsData = [];
//var curQuestion;

const Questions = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        questions = [],
        grade,
        selectedCourseId,
        selectedTopicId,
        uid,
    } = location.state || {};

    const [score, setScore] = useState(0);
    const [index, setIndex] = useState(0);
    const [curQuestion, setCurQuestion] = useState(null);
    const [prompt, setPrompt] = useState("Loading");

    useEffect(() => {
        if (!uid) {
            navigate("/login");
        } else {
            for (let i = 0; i < questions.length; i++) {
                const questionId = questions[i];
                getQuestion(
                    grade,
                    selectedCourseId,
                    selectedTopicId,
                    questionId
                ).then(function(givenQData){
                    questionsData.push(givenQData);
                    const qIndex = Object.keys(questionsData)[index];
                    setCurQuestion(questionsData[qIndex]);
                    setPrompt(curQuestion.qPrompt);
                });
            }
            
        }
    }, [grade, selectedCourseId, selectedTopicId, questions, questionsData, curQuestion]);

    
    const handleAnswer = (isCorrect) => {
        
    };

    return (
        <div className="questions-container">
            <h1>{grade}</h1>
            <h2>{selectedCourseId} - {selectedTopicId} Score: {score}</h2>
            <div className="question-prompt">
                <h3>{prompt}</h3>
            </div>
            <div className="progress">
                Question {index + 1} of {questions.length}
            </div>
        </div>
    );
};

export default Questions;
