// Write your JavaScript code here!
window.addEventListener("load", function() {
   let form = document.querySelector("form");
   let pilotName = document.querySelector("input[name = pilotName]");
   let copilotName = document.querySelector("input[name = copilotName]");
   let fuelLevel = document.querySelector("input[name = fuelLevel]");
   let cargoMass = document.querySelector("input[name = cargoMass]");
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let faultyItems = document.getElementById("faultyItems");
   let launchStatus = document.getElementById("launchStatus");
   let queryString = window.location.search;
   let urlParams = new URLSearchParams(queryString);
   let currentFuel = urlParams.get('fuelLevel');
   let currentCargo = urlParams.get('cargoMass');
   let launch = 0;
   
   form.addEventListener("submit", function(event) {
      let validationArr = [pilotName.value, copilotName.value, fuelLevel.value, cargoMass.value];
      for(input of validationArr) {
         if(input === "") {
            alert("All fields are required!")
            event.preventDefault();
            return
         }
      }
      if (!isNaN(parseInt(pilotName.value)) || !isNaN(parseInt(copilotName.value)) || isNaN(fuelLevel.value) || isNaN(cargoMass.value)) {
            alert("Incorrect value in field");
            event.preventDefault();
      }
   });

      pilotStatus.innerHTML = `${urlParams.get('pilotName')} Ready`;
      copilotStatus.innerHTML = `${urlParams.get('copilotName')} Ready`;
      if (currentFuel < 10000 && currentFuel > 0) {
         faultyItems.style.visibility = "visible";
         fuelStatus.innerHTML = "There is not enough fuel for the journey!";
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
         launch = 1;

      }
      if(currentCargo > 10000) {
         faultyItems.style.visibility = "visible";
         cargoStatus.innerHTML = "There is too much mass to take off!";
         launchStatus.innerHTML = "Shuttle not ready for launch";
         launchStatus.style.color = "red";
         launch = 1;
      }
      if(launch === 0 && currentFuel > 0) {
         launchStatus.style.color = "green";
         launchStatus.innerHTML = "Ready to launch!";
         faultyItems.style.visibility = "visible";
      }
  
      fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
         response.json().then(function(json) {
            const target = document.getElementById("missionTarget");
            target.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[5].name}</li>
               <li>Diameter: ${json[5].diameter}</li>
               <li>Star: ${json[5].star}</li>
               <li>Distance from Earth: ${json[5].distance}</li>
               <li>Number of Moons: ${json[5].moons}</li>
            </ol>
            <img src="${json[5].image}">
            `; 
         });
      });   
});




/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
