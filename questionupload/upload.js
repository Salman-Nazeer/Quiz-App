// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { ref, set, getDatabase, push } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAhQuC9NyELIx7b-SaYZ83-uVPLYIUSo9Y",
    authDomain: "quize-app-80cae.firebaseapp.com",
    databaseURL: "https://quize-app-80cae-default-rtdb.firebaseio.com",
    projectId: "quize-app-80cae",
    storageBucket: "quize-app-80cae.appspot.com",
    messagingSenderId: "676193373432",
    appId: "1:676193373432:web:f9e859119b43b878667f0d",
    measurementId: "G-X1DHBLXE8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();


var question = document.getElementById("question");
var option = document.getElementById("option");
var optionsParent = document.getElementById("optionsParent");
var correctAnswerElem = document.getElementById("correctAnswer");

var options = [];
var correctAnswer;


function renderOptions() {
    optionsParent.innerHTML = '';
    for (var i = 0; i < options.length; i++) {
        optionsParent.innerHTML += `<li onclick = "setCorrectAnswer('${options[i]}')" class = 'p-2 bg-light fs-5 rounded shadow my-2'>${options[i]}</li>`
    };
};


window.addOption = function () {
    options.push(option.value)
    // console.log(options);
    renderOptions();
    option.value = '';
};


window.setCorrectAnswer = function (a) {
    correctAnswer = a;
    correctAnswerElem.innerHTML = correctAnswer;
}

window.submitquestion = function () {
    var obj = {
        question: question.value,
        options: options,
        correctAnswer: correctAnswer,
    }

    obj.id = push(ref(db, 'questions/')).key
    var reference = ref(db, `questions/${obj.id}`);
    set(reference, obj);
}