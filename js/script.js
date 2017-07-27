window.onload = setVariables

var questions;
var screenHeight;

function setVariables()
{
    questions = document.querySelectorAll("#form-wrapper>form>ul>li");
    screenHeight = window.innerHeight;
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

function checkOption(checkOption)
{
    console.log(checkOption);
    
}