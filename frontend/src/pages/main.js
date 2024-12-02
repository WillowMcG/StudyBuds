import React, { useState, useEffect } from "react";
import "./main.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData, getGradeData } from "../backcon/databaseapi";

const Main = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);
    const [selectedTopicIndex, setSelectedTopicIndex] = useState(null);
    const [topics, setTopics] = useState([]);
    const [name, setName] = useState("");
    const [grade, setGrade] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { uid } = location.state || {};

    React.useEffect(() => {
        if (!uid) {
            navigate("/login");
        } else {
            // Load information
            getUserData(uid)
                .then((datajsonResp) => {
                    setName(datajsonResp.name || "User");
                    setGrade(datajsonResp.grade);
                    setCourses(getGradeData(datajsonResp.grade).courses);
                })
                .catch((error) => {
                    console.error("Error loading data:", error);
                });
        }
    }, [uid, navigate]);

    const handleCourseSelection = (index) => {
        alert(index);
        const courseKeys = Object.keys(courses);
        setSelectedCourseIndex(courseKeys[index]);
    };

    const handleNextTopic = () => {
        setSelectedTopicIndex((prev) =>
            prev + 1 < topics.length ? prev + 1 : 0
        );
    };

    const handlePreviousTopic = () => {
        setSelectedTopicIndex((prev) =>
            prev - 1 >= 0 ? prev - 1 : topics.length - 1
        );
    };

    const handlePlay = () => {
        navigate("/questions", {
            state: {
                grade,
                selectedCourseIndex,
                selectedTopicIndex,
                questions: courses[selectedCourseIndex]["topic"][selectedTopicIndex]["questions"]
            },
        });
    };
    
    const logout = () => {
        navigate("/");
    }

    return (
        <div className="main-container">
            <div className="header">
                <button className="menu-button">&#9776;</button>
                <h1>{
                    (courses && selectedCourseIndex) ? courses[selectedCourseIndex].name : 'Loading...'
                    }</h1>
                <p className="score">9,325</p>
                <button className="logout" onClick={logout}> Logout</button>
            </div>
            <div className="menu-dropdown">
                <ul>
                    {Object.keys((course, index) => (
                        <li key={index} onClick={() => handleCourseSelection(index)}> {course.name}</li>
                    ))}
                </ul>
            </div>
            <div className="content">
                <button className="arrow-button left-arrow" onClick={handlePreviousTopic}> &#x276E;</button>
                <div className="topic-display">
                    {topics[selectedTopicIndex]?.name || "Loading..."}
                </div>
                <button className="arrow-button right-arrow" onClick={handleNextTopic}> &#x276F;</button>
            </div>
            <button className="play-button" onClick={handlePlay}> Play </button>
        </div>
    );
};

export default Main;