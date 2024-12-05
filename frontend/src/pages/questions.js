import React, { useState, useEffect } from "react";
import "./questions.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getQuestion } from "../backcon/databaseapi";

var questionsData = [];
var curQuestion = {};
//var curQuestion;

const Questions = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        questions,
        grade,
        gradeId,
        selectedCourseId,
        selectedTopicId,
        uid,
    } = location.state || {};

    const [score, setScore] = useState(0);
    const [index, setIndex] = useState(0);
    const [prompt, setPrompt] = useState("Loading");

    useEffect(() => {
        if (!uid) {
            navigate("/login");
        } else {
            for (let i = 0; i < Object.keys(questions).length; i++) {
                const questionId = Object.keys(questions)[i];
                // alert(`${grade}, ${selectedCourseId}, ${selectedTopicId}, ${questionId}`)
                getQuestion(
                    gradeId,
                    selectedCourseId,
                    selectedTopicId,
                    questionId
                ).then(function(givenQData){
                    questionsData.push(givenQData);
                    const qIndex = Object.keys(questionsData)[index];
                    curQuestion = questionsData[qIndex];
                    setPrompt(curQuestion.qPrompt);
                });
            }
            
        }
    }, [gradeId, selectedCourseId, selectedTopicId, questions, questionsData, curQuestion]);

    
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
