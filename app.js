// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { ref, set, getDatabase, push, onValue, onChildAdded } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";
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

var loader = document.getElementById( 'loading' );
var showQuestion = document.getElementById( 'showQuestion' );

function getDataFromDatabase() {
  var reference = ref(db, 'questions/');
  onChildAdded(reference, function (data) {
    questions.push(data.val());
    renderQuestion();
  });
}
getDataFromDatabase();


var questions = [];

var dispQuestion = document.getElementById("question");
var answerOption = document.getElementById("answerOption");
var totalQuestionNo = document.getElementById("totalQuestionNo");
var currentQuestionNo = document.getElementById("currentQuestionNo");

var index = 0;
var score = 0;

window.checkQuestion = function (a, b) {
  if (a == b) {
    score++;
    // console.log(score);
  }
  nextQuestion();
};


window.nextQuestion = function () {
  if (index + 1 == questions.length) {
    alert("You Score is "+ score)
  } else {
    index++;
    renderQuestion();
  }
};

function renderQuestion() {
  currentQuestionNo.innerHTML = index + 1;
  totalQuestionNo.innerHTML = questions.length;

  var obj = questions[index];
  dispQuestion.innerHTML = obj.question;
  
  answerOption.innerHTML = "";
  for (var i = 0; i < obj.options.length; i++) {
    answerOption.innerHTML += `<div class="col-md-6">
    <div class="py-2">
      <button onclick="checkQuestion('${obj.options[i]}','${obj.correctAnswer}')" class="btn btn-dark rounded-pill w-100 fs-5">
        ${obj.options[i]}
      </button>
    </div>
  </div>`
  }
};
renderQuestion();