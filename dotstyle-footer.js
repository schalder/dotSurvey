let head = document.querySelector("head");
let surveyStyle = surveyStyleSheet(
  "https://ghlexperts.s3.amazonaws.com/dotSurvey/main.css"
);
head.append(surveyStyle);
let questions = [...document.querySelectorAll(".ghl-question")];
let form = document.querySelector(".hl_form-builder--main");

let ul = document.createElement("ul");
form.append(ul);
ul.className = "dot-progress-container";
ul.innerHTML = questions
  .map((question, index) => {
    return `<li class="dot">${index}</li>`;
  })
  .join("");

ul.querySelector("li").classList.add("active");

function addAndRemoveActiveClass(actionType) {
  let dots = ul.querySelectorAll("li");
  let index = activeSlideIndex(questions);
  dots.forEach((dot) => {
    let isActive = dot.classList.contains("active");
    if (isActive) dot.classList.remove("active");
  });

  if (actionType === "NEXT") dots[index].classList.add("active");
  if (actionType === "PREVIOUS") dots[index - 1].classList.add("active");
}

let questionContainer = document.querySelector(".ghl-question-set");

let config = { attributes: true, children: true, subtree: true };
let mutationObserver = new MutationObserver(mutationCallback);
mutationObserver.observe(questionContainer, config);
function mutationCallback(mutationList, observe) {
  mutationList.forEach((mutation) => {
    if (mutation.attributeName !== "class") return;
    let targetClass = mutation.target.classList;
    let isNext = targetClass.contains("ghl-page-rotateSlideOutNext");
    let isPrevious = targetClass.contains("ghl-page-rotateSlideOutPrev");
    if (isNext) addAndRemoveActiveClass("NEXT");
    if (isPrevious) addAndRemoveActiveClass("PREVIOUS");
  });
}

function activeSlideIndex(questions = []) {
  let activeSlide = questions.find((slide) => {
    return slide.classList.contains("ghl-page-current");
  });

  let index = questions.indexOf(activeSlide);

  return (index += 1);
}

function surveyStyleSheet(url) {
  let style = document.createElement("link");
  style.setAttribute("rel", "stylesheet");
  style.setAttribute("surveyStyle", "true");
  style.href = url;
  return style;
}

