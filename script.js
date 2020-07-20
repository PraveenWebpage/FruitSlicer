var playing=false;
var score;
var trialleft;
var fruits=['apple','carrot','orange','pinaapple','tomota'];
var step;
var action;

$(function() {

  $("#start-reset").click(function(){

    if(playing==true)                                       //to check whether playing
    {
        location.reload();                                 //to reload the page
    }

    else
      {
        playing=true;                                     //to set playing true after we click the start
        score=0;                                          //to set the score to 0 initially
        $("#score-value").html(score);                   //to display the score
        $("#life-box").show();                           //to show the life box
        trialleft=3;                                     //to set the trial left to 3
        addHeart();                                     //this function call to add the 3 lifes
        $("#start-reset").html("Reset Game");          //to change the start button to reset
        startAction();
      }
  });

$("#fruits1").mouseover(function(){                      //to slice the fruit when mouse over it
  score++;                                               //to ++ the score when the mouse over it
  $("#score-value").html(score);                         //to add the score to the scoreboard
  clearInterval(action);

  $("#fruits1").hide("explode",200);


  setTimeout(startAction,200);
});


///function of this logic for calling

function addHeart()
{
  $("#life-box").empty();
  for(i=0;i<trialleft;i++)
    $("#life-box").append(' <img src="images/heart.png" class="life"> ');
}

function startAction()
{
  $("#fruits1").show();
  chooseFruit();                                     //choose the random fruit
  $("#fruits1").css({'left':Math.round(550*Math.random()),'top':-50});    //to choose the random position
  step=1+(5*Math.random());                          //to set the step for vertical position
  action=setInterval(function()
  {
    $("#fruits1").css('top',$("#fruits1").position().top + step);    //to move the fruit

  if($("#fruits1").position().top > $("#fruits-container").height())     //to check whether the fruit reached the bottom
  {
      if(trialleft>1)
      {
        $("#fruits1").show();
        chooseFruit();                                     //choose the random fruit
        $("#fruits1").css({'left':Math.round(550*Math.random()),'top':-50});    //to choose the random position
        step=1+(5*Math.random());
        trialleft--;
        addHeart();
      }
      else
      {
        playing=false;
        $("#start-reset").html("Start Game");
        $("#gameover-box").show();
        $("#gameover-box").html("Your score is" + score + "<br>" + "GAMEOVER");
        $("#life-box").hide();
        stopAction();

      }
  }

  },10);



}

function stopAction()                             //to stop and hide the fruit after slicing
{
  clearInterval(action);                          //to clear the action provided by the setInterval
  $("#fruits1").hide();                           //to hide the fruit when the func is called
}

function chooseFruit()                              //to generate random fruits
{
  $("#fruits1").attr('src' , 'images/'+ fruits[Math.round(4*Math.random())]+'.png');
}

});
