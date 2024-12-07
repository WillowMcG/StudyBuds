import React, { useState, useEffect } from "react";
import "./main.css";
import flower from "./flower.png";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData, getGradeData } from "../backcon/databaseapi";

var courseIndex = 0;
var topicIndex = 0;
var courses;
var topics = null;
var gradeData;
var gradeId;
var selectedCourseId;
var selectedTopicId;

const Main = () => {
    const [userData, setUserData] = useState(null);
    const [name, setName] = useState("");
    const [grade, setGrade] = useState(null);
    const [selCourse, setSelCourse] = useState("Select a Course");
    const [selTopic, setSelTopic] = useState("Select a Topic");
    const location = useLocation();
    const navigate = useNavigate();
    const { uid } = location.state || {};

    React.useEffect(() => {
        if (!uid) {
            navigate("/login");
        } else {
            // Load information
            if (gradeData) {return};
            getUserData(uid)
                .then((datajsonResp) => {
                    if (gradeData) {return};
                    setUserData(datajsonResp);
                    setName(datajsonResp.name || "User");
                    gradeId = datajsonResp.grade;
                    
                    getGradeData(datajsonResp.grade).then(function(givenGradeData){
                        gradeData = givenGradeData;
                        setGrade(gradeData["gradeName"]);
                        courses = gradeData["courses"];
                        if (courses && courses["ela"]) {
                            selectedCourseId = "ela";
                            setSelCourse(courses[selectedCourseId]["courseName"]);
                            //alert(.courseName);
                        }
                        if (selectedCourseId !== null && courses[selectedCourseId]) {
                            topics = courses[selectedCourseId].topics || {}; 
                        }
                    });
                })
                .catch((error) => {
                    console.error("Error loading data:", error);
                });
        }
    }, [uid, navigate, gradeData, courses, topics, selectedCourseId]);

    const handleCourseSelection = () => {
        if (courses === null) {return}
        courseIndex = courseIndex + 1 < Object.keys(courses).length ? courseIndex + 1 : 0;
        selectedCourseId = Object.keys(courses)[courseIndex];
        setSelCourse(courses[selectedCourseId]["courseName"]);
        topics = courses[selectedCourseId].topics || {}; 
    };

    const handleNextTopic = () => {
        if (topics === null) {return}
        topicIndex = topicIndex + 1 < Object.keys(topics).length ? topicIndex + 1 : 0;
        selectedTopicId = Object.keys(topics)[topicIndex];
        setSelTopic(topics[selectedTopicId]["topicName"]);
    };

    const handlePreviousTopic = () => {
        if (topics === null) {return}
        topicIndex = topicIndex - 1 >= 0 ? topicIndex - 1 : Object.keys(topics).length - 1;
        selectedTopicId = Object.keys(topics)[topicIndex];
        setSelTopic(topics[selectedTopicId]["topicName"]);
    };

    const handlePlay = () => {
        navigate("/questions", {
            state: {
                uid,
                grade,
                gradeId,
                selectedCourseId,
                selectedTopicId,
                questions: courses[selectedCourseId]["topics"][selectedTopicId]["questions"]
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
                    <h1>{grade}</h1>
                    <button className="arrow-button-courses" onClick={handleCourseSelection}>{selCourse} &#x276F;</button>
                    <p className="score">9,325</p>
                    <button className="leaderboard" onClick={leaderboard}>Leaderboard</button>
                    <button className="logout" onClick={logout}>Logout</button>
                </div>
            </nav>
            <div className="content">
                <button className="arrow-button left-arrow" onClick={handlePreviousTopic}> &#x276E;</button>
                <div className="topic-display">
                    {selTopic}
                </div>
                <button className="arrow-button right-arrow" onClick={handleNextTopic}> &#x276F;</button>
            </div>
            <h1>Hello {name}</h1>
            <img src={flower} alt="Question Visual" className="question-image" />
            <button className="play-button" onClick={handlePlay}> Play </button>
        </div>
    );
};

export default Main;