$(function(){
    ////////////////////////////////////////
    //Card game
    ///////////////////////////////////////

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
    var guessCorrect = false;

    //Set data-card and data-suit on load
    card.setAttribute('data-card', firstCard);
    card.setAttribute('data-suit', suitChosen);
    //set css based on data-suit chosen
    pickColor();

    //initial Money and Bet
    updateMoneyAndBet();

    //user's guess
    $("#under").on("click", function() {
      cardGuessed = firstCard - 1;
      //show choice status
      $("#choice-status").text("Under");
    });
    $("#same").on("click", function() {
      cardGuessed = firstCard;
      //show choice status
      $("#choice-status").text("Same");
    });
    $("#over").on("click", function() {
      cardGuessed = firstCard + 1;
      //show choice status
      $("#choice-status").text("Over.");
    });

    //user's bet
    $("#bet-less").on("click", function() {
      if(money > 0){
        bet -= 10;
      }
      $("#bet").text("BET: $" + bet.toString());
    });
    $("#bet-more").on("click", function() {
      if(money > bet){
        bet += 10;
      }
      $("#bet").text("BET: $" + bet.toString());
    });

    // $("#bet-place").on("click", function() {
    //
    // });

    //Set data-card and data-suit on click, and set css as well
    $("#card").on("click", function() {
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
            guessCorrect = true;
            money += bet; //increment money with bet amount
            bet = 10;//reset bet

            $(".cardgame-status").text("WIN!");
          } else {
            guessCorrect = false;
              $(".cardgame-status").text("Lose...");
            //ensure money doesn't go below zero, and decrement bet
            if(money >= bet){
              money -= bet;
            } else {
              money -= money;
            }

            //if money is less than previous bet, reset bet
            if(money < bet){
              bet = 10;
            }
          }

          firstCard = secondCard;//set firstCard with the value of secondCard
          updateMoneyAndBet();//update
        } else {
          alert("Under, over, or same? You haven't chosen...");
        }
        console.log(typeof firstCard);
        console.log(typeof secondCard);

        console.log(typeof cardGuessed);
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

    ////////////////////////////////////////
    //End of Card Game
    ///////////////////////////////////////
});
