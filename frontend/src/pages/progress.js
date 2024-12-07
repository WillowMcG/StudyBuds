import React, { useState, useEffect } from "react";
import "./progress.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData, getGradeData, getPercentOfTopicDone } from "../backcon/databaseapi";

var courseIndex = 0;
var topicIndex = 0;
var courses;
var topics = null;
var gradeData;
var gradeId;
var selectedCourseId;
var selectedTopicId;

const Progress = () => {
    const [userData, setUserData] = useState(null);
    const [name, setName] = useState("");
    const [grade, setGrade] = useState(null);
    const [selCourse, setSelCourse] = useState("Select a Course");
    const [selTopic, setSelTopic] = useState("Select a Topic");
    const location = useLocation();
    const navigate = useNavigate();
    const { uid } = location.state || {};
    const [completion, setComplete] = useState(0);

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
        getPercentOfTopicDone(uid, selectedCourseId, selectedTopicId).then(function(givenPercent){
            setComplete(givenPercent.percent);
        });
    };

    const handlePreviousTopic = () => {
        if (topics === null) {return}
        topicIndex = topicIndex - 1 >= 0 ? topicIndex - 1 : Object.keys(topics).length - 1;
        selectedTopicId = Object.keys(topics)[topicIndex];
        setSelTopic(topics[selectedTopicId]["topicName"]);
        getPercentOfTopicDone(uid, selectedCourseId, selectedTopicId).then(function(givenPercent){
            setComplete(givenPercent.percent);
        });
    };

    return (
        <div className="main-container">
            <h1>{name}'s Progress</h1>
            <button className="courses" onClick={handleCourseSelection}>{selCourse} &#x276F;</button>
            <div className="content">
                <button className="arrow-button left-arrow" onClick={handlePreviousTopic}> &#x276E;</button>
                <div className="topic-display">
                    {selTopic}
                </div>
                <button className="arrow-button right-arrow" onClick={handleNextTopic}> &#x276F;</button>
            </div>
            <h2>Topic is {typeof completion === "number" ? completion : 0}% completed!</h2>
        </div>
    );
};

export default Progress;