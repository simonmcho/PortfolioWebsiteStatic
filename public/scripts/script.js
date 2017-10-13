$(function(){

//     const NUMBER_TO_DEAL = 10;
//     var card = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


//    function deal(){
//         return Math.floor(Math.random() * NUMBER_TO_DEAL) + 1;
//    }

    var data = '123456789JQKA♣♦♠♥';
    var pick = data[shuffle(13,16)];
    var card = document.getElementById("card");

    $("#card").on("click", function() {
        console.log('clicked');
        card.setAttribute('data-card',data[shuffle(1,12)]);
        card.setAttribute('data-suit',data[shuffle(13,16)]);

        if((pick === "♣") || (pick === "♠")){
            $("#card").style.color = "#fff";
        } else {
            $("card").style.color = "#ff0000";
        }
    });

    function shuffle(min,max){ 
        return Math.floor(Math.random()*(max-min+1))+min;
    }
});