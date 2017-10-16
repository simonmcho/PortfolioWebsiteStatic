$(function(){
    
    cardGame();

    ////////////////////////////////////////
    //Card game
    ///////////////////////////////////////
    function cardGame() {
      //declare const variables for cards
      const data = '123456789JQKA♣♦♠♥';
      const card = document.getElementById("card");

      //var variables for cards
      var firstCard = chooseCard();
      var suitChosen = data[shuffle(13,16)];
      var secondCard;
      var cardGuessed;
      var money = 100;
      var bet   = 10;
      var gameOver = false;
      var sameChosen = false;//odds are 2:1 for choosing same value for next card 
      var userGuess;
      var statusPlaceholder = $(".cardgame-status").text();

      //ensure height is same between deal and choices
      $("#deal").css({"height" : $(".choice").height()});
      //Hide Deal Action to ensure user always makes a guess
      $("#deal").addClass("hideAction");
      showHideAction($(".choice"));

      //Set data-card and data-suit on load
      card.setAttribute('data-card', firstCard);
      card.setAttribute('data-suit', suitChosen);
      //set css based on data-suit chosen
      pickColor();

      //initial Money and Bet
      updateMoneyAndBet();

      //user's guess
      $("#under").on("click", function() {
          userGuess = this.id;
          userGuessCard(userGuess);

          showHideAction($(".choice"));
          showHideAction($("#deal"));

          sameChosen = false;

          //show choice status
          $("#choice-status").text("Under");
      });
      $("#same").on("click", function() {
          userGuess = this.id;   
          userGuessCard(userGuess);
          showHideAction($(".choice"));
          showHideAction($("#deal"));

          sameChosen = true;

        //show choice status
          $("#choice-status").text("Same");
      });
      $("#over").on("click", function() {
          userGuess = this.id;
          userGuessCard(userGuess);

          showHideAction($(".choice"));
          showHideAction($("#deal"));

          sameChosen = false;
          
          //show choice status
          $("#choice-status").text("Over.");
      });

      //user's bet
      $("#bet-less").on("click", function() {
        if(!gameOver){
          if(bet > 0){
            bet -= 10;
          }
          $("#bet").text("BET: $" + bet.toString());
        }
        else {
          $("#bet").text("BET: $" + bet.toString());
        }
      });

      $("#bet-more").on("click", function() {
        if(!gameOver){
          if(money > bet){
            bet += 10;
          }
    
          $("#bet").text("BET: $" + bet.toString());
        } else {
          $("#bet").text("BET: $" + bet.toString());
        }
      });

      //Set data-card and data-suit on click, and set css as well
      $("#deal").on("click", function() {
        if(!gameOver){
          //Hide Choice options and Show Deal button
        showHideAction($(".choice"));
        showHideAction($("#deal"));
        $("#choice-status").text("None. Choose under, same, or over.");

          if(!(typeof cardGuessed === 'undefined')){
            suitChosen = data[shuffle(13,16)];
            secondCard = chooseCard();//choose second card

            card.setAttribute('data-card', secondCard);
            card.setAttribute('data-suit', suitChosen);

            pickColor();

            //check if user's guess was correct
            if( (secondCard > firstCard && cardGuessed > firstCard) ||
                (secondCard < firstCard && cardGuessed < firstCard) ||
                (secondCard == firstCard && cardGuessed == firstCard) ){


              //feedback to user
              if (bet > (money/2)){
                  $(".cardgame-status").text(statusPlaceholder +  "WIN! That's a lot...");
                  money += bet; //increment money with bet amount
              } else if (money < 30){
                  $(".cardgame-status").text(statusPlaceholder +  "WIN! Yikes, that was close.");
                  money += bet; //increment money with bet amount
              } else if (sameChosen == true) {
                  $(".cardgame-status").text(statusPlaceholder +  "That's a 2:1 win!");
                  money += (bet * 2); //increment money with bet amount
              } else {
                  $(".cardgame-status").text(statusPlaceholder +  "WIN!");
                  money += bet; //increment money with bet amount
              }
            //if lost
            } else {
              
              //ensure money doesn't go below zero, and decrement bet
              if(money >= bet){
                money -= bet;
                $(".cardgame-status").text(statusPlaceholder + "Lose...");
              } else {
                money -= money;
              }
              bet = 10;//reset bet

              //Game Over
              if(money == 0){
                $(".cardgame-status").text(statusPlaceholder + "Game over.");
                gameOver = true;
                bet = 0;
                $("#bet").text("BET: $" + bet.toString());
              }
            }

            firstCard = secondCard;//set firstCard with the value of secondCard
          } else {
            alert("Under, over, or same? You haven't chosen...");
          }
        } 
          updateMoneyAndBet();//update
      });

      //Function to shuffle between two given parameters
      //probably would be good to have typechecker
      function shuffle(min, max){
          return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      //Function to choose color based on suitChosen
      //Again, validation would be good here
      function pickColor(){
        if((suitChosen === "♣") || (suitChosen === "♠")){
            card.style.color = "black";
        } else {
            card.style.color = "#ff0000";
        }
      }

      function updateMoneyAndBet() {
        $("#bet").text("BET: $" + bet.toString());
        $("#money").text("MONEY: $" + money.toString());
      }

      //If face card chosen, return 10
      function chooseCard() {
        let cardSelected = data[shuffle(1, 12)];

        if( cardSelected === 'J' || cardSelected === 'Q' ||
            cardSelected === 'K' || cardSelected ==='A' ){
          return 10;
        } else {
          return parseInt(cardSelected);
        }
      }

      //user's guess
      function userGuessCard(id) {
        if(id === "under"){
          cardGuessed = firstCard - 1;
        } else if(id === "same"){
          cardGuessed = firstCard;
        } else if(id ==="over") {
          cardGuessed = firstCard + 1;
        } else {
          alert("Choose under/over/same");
        }
      }

      //Show Hide
      function showHideAction(element){
        if(element.hasClass("showAction")){
          element.addClass("hideAction");
          element.removeClass("showAction");
        } else {
          element.addClass("showAction");
          element.removeClass("hideAction");
        }
      }
    }
    ////////////////////////////////////////
    //End of Card Game
    ///////////////////////////////////////
});
