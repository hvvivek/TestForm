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
    var otherQuestions = checkOption.parentNode.parentNode.parentNode.parentNode.querySelectorAll(".multiple-choice, .rating-multiple-choice");
    for( var index = 0; index < otherQuestions.length; index++ )
        {
            var prev = otherQuestions[index].querySelectorAll(".rating-checked")[0];
            if( prev )
                {
                    prev.classList.remove("rating-checked");
                }
            else
                {
                    if( otherQuestions[index].classList.contains("checked") )
                        {
                            otherQuestions[index].classList.remove("checked");
                            break;
                        }
                }

        }

    // checkOption.parentNode.parentNode.parentNode.classList.add("wrapper-no-margin");  
    if( checkOption.parentNode.parentNode.classList.contains("rating-choice") )
        {
            
            checkOption.parentNode.parentNode.classList.add("rating-checked");
            var container = checkOption.parentNode.parentNode.parentNode.parentNode.parentNode.querySelectorAll(".wrapper-question-errortext")[0].classList.add("hidden");
            setTimeout(function() {
                moveToNextQuestionRatingButton( checkOption );   
            }, 800, false);
        }
    else
        {      
            checkOption.parentNode.parentNode.classList.add("checked");
            var container = checkOption.parentNode.parentNode.parentNode.parentNode.querySelectorAll(".wrapper-question-errortext")[0].classList.add("hidden");
            blink(checkOption);
            setTimeout(function() {
                moveToNextQuestion( checkOption );   
            }, 800, false);
        }

        fillCompletionBar();

    
    
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

    fillCompletionBar();
}

function fillCompletionBar()
{
    var completeCount = 0;
    var completionText = document.querySelector("#footer p");

    var checkboxQuestions = document.querySelectorAll(".required-checkbox");
    for( var index = 0; index < checkboxQuestions.length; index++ )
        {
            var checkedOptions = checkboxQuestions[index].querySelectorAll("input[type=checkbox]:checked");
            if( checkedOptions.length >0 )
                {
                    completeCount++;
                }
        }

        var checkboxQuestions = document.querySelectorAll(".required-radio");
    for( var index = 0; index < checkboxQuestions.length; index++ )
        {
            var checkedOptions = checkboxQuestions[index].querySelectorAll("input[type=radio]:checked");
            if( checkedOptions.length > 0 )
                {
                    completeCount++;
                }
        }

        var checkboxQuestions = document.querySelectorAll(".required-rating");
    for( var index = 0; index < checkboxQuestions.length; index++ )
        {
            var checkedOptions = checkboxQuestions[index].querySelectorAll("input[type=radio]:checked");
            if( checkedOptions.length > 0 )
                {
                    completeCount++;
                }
        }

        var textareaQuestions = document.querySelectorAll("textarea");
    for( var index = 0; index < textareaQuestions.length; index++ )
        {
            if( textareaQuestions[index].value.length > 0 )
                {
                    completeCount++;
                }
        }

        if( completeCount > 0 )
            {                
                completionText.innerHTML = completeCount + " out of 22 completed";
                var completionBoxes = document.querySelectorAll("#completion-bar>div");
                                        console.log(completeCount);

                for( var index = 0; index < completionBoxes.length; index++ )
                    {
                        if( completeCount > 0 )
                            {
                                completionBoxes[index].style.backgroundColor = "rgba(79, 176, 174,1)"
                                completeCount--;
                            }
                        else{
                                completionBoxes[index].style.backgroundColor = "rgba(79, 176, 174,0.3)"
                            }
                    }
            }
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
    console.log(checkOption.parentNode.parentNode.parentNode.parentNode.offsetHeight/2);
    scrollTo(0, checkOption.parentNode.parentNode.parentNode.parentNode.offsetTop + checkOption.parentNode.parentNode.parentNode.parentNode.offsetHeight/2);
}

function moveToNextQuestionRatingButton(checkOption)
{
    console.log(checkOption.parentNode.parentNode.parentNode.parentNode.offsetHeight/2);
    scrollTo(0, checkOption.parentNode.parentNode.parentNode.parentNode.parentNode.offsetTop + checkOption.parentNode.parentNode.parentNode.parentNode.parentNode.offsetHeight/2);
}

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
    fillCompletionBar()
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

function invalidInputMultiChoice()
{
    console.log("called");
    var errorCount = 0;
    var errorText = document.getElementById("form-error");
    errorText.classList.add("hidden");

    var checkboxQuestions = document.querySelectorAll(".required-checkbox");
    for( var index = 0; index < checkboxQuestions.length; index++ )
        {
            var checkedOptions = checkboxQuestions[index].querySelectorAll("input[type=checkbox]:checked");
            if( checkedOptions.length == 0 )
                {
                    checkboxQuestions[index].querySelectorAll(".wrapper-question-errortext")[0].classList.remove("hidden");
                    errorCount++;
                }
        }

        var checkboxQuestions = document.querySelectorAll(".required-radio");
    for( var index = 0; index < checkboxQuestions.length; index++ )
        {
            var checkedOptions = checkboxQuestions[index].querySelectorAll("input[type=radio]:checked");
            if( checkedOptions.length == 0 )
                {
                    checkboxQuestions[index].querySelectorAll(".wrapper-question-errortext")[0].classList.remove("hidden");
                    errorCount++;
                }
        }

        var checkboxQuestions = document.querySelectorAll(".required-rating");
    for( var index = 0; index < checkboxQuestions.length; index++ )
        {
            var checkedOptions = checkboxQuestions[index].querySelectorAll("input[type=radio]:checked");
            if( checkedOptions.length == 0 )
                {
                    checkboxQuestions[index].querySelectorAll(".wrapper-question-errortext")[0].classList.remove("hidden");
                    errorCount++;
                }
        }

        if( errorCount > 0 )
            {
                event.preventDefault();
                
                errorText.classList.remove("hidden");
                errorText.innerHTML = errorCount + " answer(s) need completing";
            }
}

function input( element )
{
    console.log("input");
    element.setCustomValidity('');
    var container = input.parentNode.parentNode.parentNode.parentNode.querySelectorAll(".wrapper-question-errortext")[0].classList.add("hidden");
}

function selectOption( parentElement )
{
    parentElement.querySelectorAll("input[type=checkbox],input[type=radio]")[0].checked = true;
    if(parentElement.querySelectorAll("input[type=checkbox]")[0])
    {
        checkOption( parentElement.querySelectorAll("input[type=checkbox]")[0] );
    }
    else if(parentElement.querySelectorAll("input[type=radio]")[0])
    {
        checkRadioOption( parentElement.querySelectorAll("input[type=radio]")[0] );
    }
}