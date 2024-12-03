import React, { useState, useEffect } from "react";
import "./main.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData, getGradeData } from "../backcon/databaseapi";

const Main = () => {
    const [data, setData] = useState(null);
    const [courses, setCourses] = useState([]);
    const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);
    const [selectedTopicIndex, setSelectedTopicIndex] = useState(0); 
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
                    setData(datajsonResp);
                    setName(datajsonResp.name || "User");
                    setGrade(datajsonResp.grade);

                    const gradeData = getGradeData(datajsonResp.grade);
                    setCourses(gradeData["courses"]);
                })
                .catch((error) => {
                    console.error("Error loading data:", error);
                });
        }
    }, [uid, navigate]);

    useEffect(() => {
        if (courses && courses["ela"]) {
            setSelectedCourseIndex(courses["ela"]);
            alert(selectedCourseIndex.courseName);
        }
    }, [courses]);
    
    useEffect(() => {
        if (selectedCourseIndex !== null && courses[selectedCourseIndex]?.topics) {
            setTopics(courses[selectedCourseIndex].topics || []);
            setSelectedTopicIndex(0); 
        }
    }, [selectedCourseIndex, courses]);

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

    const leaderboard = () => {
        navigate("/leaderboard", {
            state: {
                uid,
                grade
            },
        });
    };
    return (
        <div className="main-container">
            <nav className="hidden-navbar">
                <div className="header">
                    <button className="menu-button">&#9776;</button>
                    <h1>{grade}</h1>
                    <h1>{selectedCourseIndex !== null && courses[selectedCourseIndex] ? 
                    courses[selectedCourseIndex].courseName : 'Select a Course'}</h1>
                    <p className="score">9,325</p>
                    <button className="leaderboard" onClick={leaderboard}>Leaderboard</button>
                    <button className="logout" onClick={logout}>Logout</button>
                </div>
            </nav>
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
                    {topics[selectedTopicIndex]?.name || "Select Course for Topics"}
                </div>
                <button className="arrow-button right-arrow" onClick={handleNextTopic}> &#x276F;</button>
            </div>
            <h1>Hello {name}</h1>
            <button className="play-button" onClick={handlePlay}> Play </button>
        </div>
    );
};

export default Main;