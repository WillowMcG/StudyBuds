import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Questions = () => {
    const { state } = useLocation();
    const { grade, courseId, topicId } = state || {};
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (grade && courseId && topicId) {
            axios
                .get(`/api/questions/${grade}/${courseId}/${topicId}`)
                .then((response) => setQuestions(response.data));
        }
    }, [grade, courseId, topicId]);

    return (
        <div>
            <h1>Questions</h1>
            {questions.map((question, index) => (
                <div key={index}>
                    <p>{question.qName}</p>
                </div>
            ))}
        </div>
    );
};

export default Questions;
