$(document).ready(function(){

  var allPlayers;
  var top200=[];
  $(function() {
        // var params = {
        //     // Request parameters
        // };

        $.ajax({
            url: "https://api.fantasydata.net/nfl/v2/JSON/FantasyPlayers?Team=PIT" ,
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","630f356526af4b368fe08040535f6dda");
            },
            type: "GET",
            // Request body
            data: "{body}",
            success: function(data){
              allPlayers = data;
              console.log(allPlayers);
              for( var i=0; i<200; i++ )
              {
                var thisPlayer={
                  Name: allPlayers[i].Name,
                  Position: allPlayers[i].Position,
                  Team: allPlayers[i].Team,
                  Bye: allPlayers[i].ByeWeek,
                  AverageDraftPosition: allPlayers[i].AverageDraftPosition
                };
                if( thisPlayer.Name === 'Le\'Veon Bell'){
                   thisPlayer.Name = 'LeVeon Bell';
                  console.log( 'leVeon is weird');
                  console.log( allPlayers[i].Name );
                }
                // removeWhack(thisPlayer.Name);
                top200.push( thisPlayer );
                // console.log("test: " + thisPlayer.Name);
                $.ajax({
                    url: "/sendToDb",
                    type: "POST",
                    // Request body
                    data: thisPlayer
                });
                console.log( "Player " + i +": " +  thisPlayer.Name + " - " + thisPlayer.Position + ", " + thisPlayer.Team );
              }
              console.log( "top200: " + top200[2].Name );
              // console.log(jsonString);
            }
        })
        .done(function(data) {
          // console.log(top200);
            alert("success");


            /////////////EXAMPLE //////////////////////////
            // $.ajax({
            //     url: "/sendToDb",
            //     type: "POST",
            //     // Request body
            //     data: {myArray: top200}
            // });
            ///////////////////////////////////////

        })
        .fail(function() {
            alert("error");
        });
    });
});
// function removeWhack(input){
//   if(input === 'Le\'Veon Bell'){
//     input = 'LeVeon Bell';
//   }
  // console.log('removeWhack: ' + input);
    // var name = input;
    // name = name.replace("\'", "");
    // console.log('in removeWhack: ' + input);

// };
