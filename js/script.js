window.onload = setVariables

var questions;
var screenHeight;
var removeBorder;
var addBorder;

function setVariables()
{
    questions = document.querySelectorAll("#form-wrapper>form>ul>li");
    screenHeight = window.innerHeight;

    var container = document.getElementById("center-container");
    if( container )
        {
            console.log( screenHeight/2 + "px" );
            container.style.paddingTop = (screenHeight/2 - (document.getElementById("center-container").scrollHeight/2)) + "px"; 
        }

        window.addEventListener('resize', (ev) => {
            screenHeight = window.innerHeight;
            var container = document.getElementById("center-container");
            if( container )
                {
                    console.log( screenHeight/2 + "px" );
                    container.style.paddingTop = (screenHeight/2 - (document.getElementById("center-container").scrollHeight/2)) + "px"; 
                }
        });
}

function checkActiveQuestion()
{
    var activeQuestion = questions[0];
    for( var index = 0; index<questions.length; index = index + 1 )
    {
        if( questions[index].classList.contains("active") )
            {
                questions[index].classList.remove("active");
                break;
            }
    }

    for( var index = 0; index<questions.length; index = index + 1 )
    {
        var bottomPosition = questions[index].getBoundingClientRect().bottom;
        var topPosition = questions[index].getBoundingClientRect().top;
        if( bottomPosition >  screenHeight/2-100 && topPosition < screenHeight/2-100)
        {
            activeQuestion = questions[index];
            break;
        }
        else if( bottomPosition >  screenHeight/2-100 && topPosition > screenHeight/2-100 )
        {
            activeQuestion = questions[index];
            break;
        }
    }
        activeQuestion.classList.add("active");
}

function checkRadioOption(checkOption)
{
    console.log("Value changed");
    var otherQuestions = checkOption.parentNode.parentNode.parentNode.parentNode.querySelectorAll(".multiple-choice");
        console.log(otherQuestions);
    for( var index = 0; index < otherQuestions.length; index++ )
        {
            if( otherQuestions[index].classList.contains("checked") )
                {
                    otherQuestions[index].classList.remove("checked");
                    break;
                }
        }

    // checkOption.parentNode.parentNode.parentNode.classList.add("wrapper-no-margin");        
    checkOption.parentNode.parentNode.classList.add("checked");
    var container = checkOption.parentNode.parentNode.parentNode.parentNode.querySelectorAll(".wrapper-question-errortext")[0].classList.add("hidden");
    var container = checkOption.parentNode.parentNode.parentNode.parentNode.parentNode.querySelectorAll(".wrapper-question-errortext")[0].classList.add("hidden");
    
    blink(checkOption);
    setTimeout(function() {
        moveToNextQuestion( checkOption );   
    }, 800, false);
    
}

function checkOption(checkOption)
{
    console.log("Value changed");
    // checkOption.parentNode.parentNode.parentNode.classList.add("wrapper-no-margin");        
    if( checkOption.parentNode.parentNode.classList.contains("checked") )
        {
            checkOption.parentNode.parentNode.classList.remove("checked");
        }
    else{
        checkOption.parentNode.parentNode.classList.add("checked");
    }
    var container = checkOption.parentNode.parentNode.parentNode.parentNode.parentNode.querySelectorAll(".wrapper-question-errortext")[0].classList.add("hidden");

    blink(checkOption);
}

function blink(checkOption)
{
    setTimeout(function() {
        checkOption.parentNode.parentNode.classList.add("no-border");
        // checkOption.parentNode.parentNode.parentNode.classList.remove("wrapper-no-margin");        
    }, 150, false);
    setTimeout(function() {
        checkOption.parentNode.parentNode.classList.remove("no-border");
        // checkOption.parentNode.parentNode.parentNode.classList.add("wrapper-no-margin");        

    }, 300, false);
    setTimeout(function() {
        checkOption.parentNode.parentNode.classList.add("no-border");
        // checkOption.parentNode.parentNode.parentNode.classList.remove("wrapper-no-margin");        

    }, 450, false);
    setTimeout(function() {
        checkOption.parentNode.parentNode.classList.remove("no-border");
        // checkOption.parentNode.parentNode.parentNode.classList.add("wrapper-no-margin");     
    }, 600, false);
    
}

function moveToNextQuestion(checkOption)
{
    console.log(checkOption.parentNode.parentNode.parentNode.parentNode.scrollHeight);
    scrollBy(0, checkOption.parentNode.parentNode.parentNode.parentNode.scrollHeight+100);
}

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

function invalidInput(input)
{
    var container = input.parentNode.parentNode.parentNode.parentNode.querySelectorAll(".wrapper-question-errortext")[0].classList.remove("hidden");
    console.log(container);
}

function invalidInputExtraLayer(input)
{
    var container = input.parentNode.parentNode.parentNode.parentNode.parentNode.querySelectorAll(".wrapper-question-errortext")[0].classList.remove("hidden");
    console.log(container);
}

function invalidInputMultiChoice(input)
{
    var container = input.parentNode.parentNode.parentNode.parentNode.parentNode.querySelectorAll("input[type:checkbox]");
    console.log("Here" + container);
}

function input( element )
{
    console.log("input");
    element.setCustomValidity('');
    var container = input.parentNode.parentNode.parentNode.parentNode.querySelectorAll(".wrapper-question-errortext")[0].classList.add("hidden");
}