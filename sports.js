const loadPlayer = () => {
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    toggleSpinner('block')
    inputField.value = '';
    if(inputText == '' || !isNaN(inputText)){
        alert('Enter a string Name')
    }
    // // else if(!isNaN(inputText)){
    // //   alert('Enter name of string')
    // }


    //load All player---------------
    else{
        const url = (`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputText}`)
        fetch(url)
        .then(res => res.json())
        .then(data => displayPlayers(data.player))
    }
}
// toggole spinner method--------------
const toggleSpinner = displayStyle => {
  document.getElementById('spinner').style.display = displayStyle;
}

// Display All Player by Name--------------
const displayPlayers = players => {
  console.log(players)
    const main = document.getElementById('main');
    main.textContent = '';
   if(!players){
     alert('result not found')
     toggleSpinner('none')
    }
    else{
      toggleSpinner('none')
      players.forEach(player => {
        console.log(player)
     const div = document.createElement('div');
     div.classList.add('col-lg-4');
     div.classList.add('mt-3')
     div.innerHTML = `
     <div class="card" style="width: 18rem;">
   <img src="${player.strThumb} " class="card-img-top" alt="...">
   <div class="card-body">
     <h5 class="card-title">${player.strPlayer}</h5>
     <p class="card-text">${player.strDescriptionEN?.slice(0, 100)}</p>
     <a href="#" onclick="seeDetails('${player.idPlayer}')" class="btn btn-primary">See Details</a>
   </div>
 </div>
     `
     main.appendChild(div);

    });

    }
       
}

// Load Single Player details----------------
const seeDetails= (playerId) =>{
  toggleSpinner('block');
  
    fetch(`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`)
    .then(res => res.json())
    .then(data => displayDetail(data.players[0]))
} 

//Display details Single player------------------->
const displayDetail = singlePlayer =>{
  const seeDetailsDiv = document.getElementById('see-detail');
    const div = document.createElement('div');
    div.classList.add('mt-3');
    seeDetailsDiv.innerHTML = '';
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
    <img src="${singlePlayer.strThumb} " class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${singlePlayer.strPlayer}</h5>
      <h6>${singlePlayer.strTwitter}</h6>
      <h6>${singlePlayer.strGender}</h6>
      <h6>${singlePlayer.strNationality}</h6>
      <p class="card-text">${singlePlayer.strDescriptionEN?.slice(0, 100)}</p>
      
    </div>
  </div>
    `
    seeDetailsDiv.appendChild(div);
    toggleSpinner('none');
}