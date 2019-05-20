'use strict';

const questionSet = [
  { 
    number: 1,
    text: `Who walks into the bathroom when Cole is sitting on the toilet?`,
    ans1: `Zane`,
    ans2: `Master Wu`, 
    ans3: `Nia`, 
    ans4: `Lloyd`
  }, 

  {
    number: 2,
    text: `What does Master Wu drink?`,
    ans1: `Tramp Juice`, 
    ans2: `Strength Coffee`, 
    ans3: `Travelers Tea`, 
    ans4: `Snake Spit`
  }, 

  {
    number: 3,
    text: `Who was the snake that raised the Great Devourer and caused a major attack on Ninjago?`,
    ans1: `Serpentine (Nia)`, 
    ans2: `Ruler Snake Pyhthor`, 
    ans3: `Fangpyre Snake Leader`, 
    ans4: `Hypnobrai Snake Leader`
  }, 
  {
    number: 4, 
    text: `The Green Ninja was the chosen one, the person who will protect the golden weapons. Who was picked?`,
    ans1: `Zane`, 
    ans2: `Lloyd`, 
    ans3: `Kai`, 
    ans4: `Jay`
  }, 
  {
    number: 5,
    text: `What is the ice ninja, Zane identity that he eventually found out?`,
    ans1: `Human`, 
    ans2: `Falcon`, 
    ans3: `Robot`, 
    ans4: `Snake`
  }, 
  {
    number: 6,
    text: `How many total times has Nya been kidnapped`,
    ans1: `77`, 
    ans2: `5`, 
    ans3: `23`, 
    ans4: `3`
  }, 
  {
    number: 7,
    text: `Who is the Dark Lord`,
    ans1: `The Overlord`, 
    ans2: `Lord Garmadon`, 
    ans3: `Lloyd`, 
    ans4: `Pythor`
  }, 
  {
    number: 8,
    text: `Who unlocked thier full potential first`,
    ans1: `Zane`, 
    ans2: `Kai`, 
    ans3: `Jay`, 
    ans4: `Cole`
  }, 
  {
    number: 9,
    text: `What is the Ninjago theme song called`,
    ans1: `Ninja Go!`, 
    ans2: `Born To Be A Ninja`, 
    ans3: `Rock What You Got`, 
    ans4: `The Weekend Whip`
  }, 
  {
    number: 10,
    text: `Who sings the Ninjago theme song`,
    ans1: `Selena Gomez`, 
    ans2: `The Fold`, 
    ans3: `Rhianna`, 
    ans4: `Taylor Swift`
  }
];

const ANSWERS = [ 
  `Zane`, 
  `Travelers Tea`, 
  `Ruler Snake Pyhthor`, 
  `Lloyd`, 
  `Robot`, 
  `5`, 
  `The Overlord`, 
  `Zane`, 
  `The Weekend Whip`, 
  `The Fold`
];

let questionNum = 1;

let correctAnswers = 0;

function questionTemplate(correctAnswers, question, questionsAnswered) {
  return `
    <section id="question-page" role="main">
    <h2 id="question">${question.text}</h2>
    
    <form>
      <fieldset>
        <label>
          <input class="answer" type="radio" name="option" checked></input>
          <span>${question.ans1}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans2}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans3}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans4}</span>
        </label>
      </fieldset>  
      <button id="js-submit-button">Submit</button>

    </form>

    <div id="status-bar">
      <span id="question-count">Question: ${question.number}/10</span>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
  </section>
  `;
}
//start quiz
function handleStartButton() {
  $('#js-start-button').click(function(event) {
    nextQuestion();
  });
}
//user selects answer on submit run user feedback
function handleSubmitButton() {
  $('#container').on('click', '#js-submit-button', function(event) {
    event.preventDefault()

    const answer = $('input:checked').siblings('span');

    const userIsCorrect = checkUserAnswer(answer);
    if(userIsCorrect) {
      generateCorrectFeedback();
    } else {
      generateIncorrectFeedback();
    }
  });
}
//user selects next button
function handleNextButton() {
  $('#container').on('click', '#js-next-button', function(event) {

    if(questionNum === 10) {
      createResultsPage(correctAnswers);
    } else {
      iterateQuestion();
      nextQuestion();
  }
  });
}
//quiz reset
function handleRestartButton() {
  $('#container').on('click', '#js-restart-button', function(event) {

    questionNum = 1;

    correctAnswers = 0;

    nextQuestion();
  });
}

function nextQuestion() {

  const question = questionSet[questionNum - 1];

  const questionsAnswered = questionNum - 1;

  $('#container').html(questionTemplate(correctAnswers, question, questionsAnswered));
}

function checkUserAnswer(answer) {
  if(answer.text() === ANSWERS[questionNum - 1]) {
    return true;
  } else {
    return false;
  }
}
//user visual feedback of correct or incorrect answers
function generateCorrectFeedback() {
  $('#container').html(correctFeedback);
  iterateCorrectAnswers();
}

const correctFeedback = `
  <section class="feedback-page" role="main">
    <h2>Correct!</h2>
    <img src="https://www.indiewire.com/wp-content/uploads/2017/09/lego-ninjago-movie-poster.jpg?w=780" alt="look of approval">
    <button id="js-next-button">Next</button>
  </section>
`;

function generateIncorrectFeedback() {
  $('#container').html(incorrectFeedbackTemplate(questionNum));
}

function incorrectFeedbackTemplate(questionNum) {
  return `
    <section class="feedback-page" role="main">
      <h2>Nope! It was ${ANSWERS[questionNum - 1]}!</h2>
      <img src="https://cdn1.thr.com/sites/default/files/imagecache/scale_crop_768_433/2017/02/the_lego_ninjago_movie_-_trailer_tease_screen_shot-h_2017.jpg" alt="look of concern">
      <button id="js-next-button">Next</button>
    </section>
`;
}
//update questions
function iterateQuestion() {
  questionNum++;
}

function iterateCorrectAnswers() {
  correctAnswers++;
}

function createResultsPage(correctAnswers) {
  $('#container').html(`
    <section id="final-page">
      <h2>Final Score: ${correctAnswers} out of 10</h2>
      <button id="js-restart-button">Retry?</button>
    </section>
  `);
}
//run quiz functions
function handleButtons() {
  handleStartButton();
  handleSubmitButton();
  handleNextButton();
  handleRestartButton();
}

handleButtons();