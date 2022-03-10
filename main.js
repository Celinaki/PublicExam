let page1 = []
let page2 = []
let page3 = []
let page4 = []
let page5 = []
let page6 = []
let page7 = []
let page8 = []

let pages = [page1, page2, page3, page4, page5, page6, page7, page8]

let planets = []
let speciesArray=[]

let activePage = 1

let fetchIndex = 1
let pageIndex = 0

let selectedCharacter
let characterIndex

//Buttons i details
let detailButtons=document.querySelectorAll(".flexed section")

for(let button of detailButtons){

    button.addEventListener("click",function(){
            for(let ele of detailButtons){
                console.log(ele)
                if(ele.classList.contains("details-active")){
                    ele.classList.remove("details-active")
                }
            }
             button.classList.add("details-active")
             let buttonIndex= Array.from(detailButtons).findIndex(obj=>obj===button)
             let planetIcon = document.querySelector(".icon3")
             planetIcon.classList.add("show")
             planetIcon.classList.remove("hide")
             clearMoreDetails()
             detailsInfo(buttonIndex)
        
        })
}
for (let button of detailButtons) {
    button.classList.add("hide")
}
//Buttons i details

async function detailsInfo(index){
   
    switch (index) {
        case 0:
            await fetchPlanet(pages[activePage][characterIndex].homeworld)      
            break;

            case 1:
                if(pages[activePage][characterIndex].species[0]!==undefined){
                    await fetchSpecies(pages[activePage][characterIndex].species[0])
                }
                else{
                    showSpecies("unknown")
                }

            break;
            case 2:
                if (pages[activePage][characterIndex].vehicles[0]!==undefined) {
                    await fetchVehicles(pages[activePage][characterIndex].vehicles[0], pages[activePage][characterIndex].vehicles[1])

                }
                else{
                    showVehicles("none")
                }
        
            break;
            case 3:
                if (pages[activePage][characterIndex].starships[0]!==undefined) {
                await fetchStarships(pages[activePage][characterIndex].starships[0],pages[activePage][characterIndex].starships[1])
                
                }
                else{
                    showStarships("none")
                }
        
            break;
    
        default:
            break;
    }
}
        async function  fetchSpecies(selectedSpecies){
        if (speciesArray.some(specie => specie.url=== selectedSpecies)) {
            for (const ele of speciesArray) {
                if (ele.url === selectedSpecies) {
                    showSpecies(ele)
                    
                }
            }
        }
        else{
            const response = await fetch(selectedSpecies)
                const data = await response.json()
                speciesArray.push(data)
                showSpecies(data)                
        }
    }


function showSpecies(species){
    let planetIcon = document.querySelector(".icon3")
    planetIcon.classList.add("hide")
    planetIcon.classList.remove("show")

    let speciesName = document.querySelector(".planet-name")
    let classification = document.querySelector(".details-planetinfo1")
    let designation = document.querySelector(".details-planetinfo2")
    let averageHeight = document.querySelector(".details-planetinfo3")
    let skinColors = document.querySelector(".details-planetinfo4")
    let hairColors = document.querySelector(".details-planetinfo5")
    let eyeColors = document.querySelector(".details-planetinfo6")
    
    if (species !== "unknown") {
        speciesName.innerText = species.name
        classification.innerText = "Classification: " + species.classification
        designation.innerText =  "Designation: " + species.designation
        averageHeight.innerText = "Average heigh: " + species.average_height
        skinColors.innerText = "Skin color: " + species.skin_colors
        hairColors.innerText =  "Hair color: " + species.hair_colors
        eyeColors.innerText = "Eye color: " + species.eye_colors
    }
    else{
        speciesName.innerText = pages[activePage][characterIndex].name
        classification.innerText = "Classification: Unknown"
        designation.innerText =  "Designation: Unknown"
        averageHeight.innerText = "Average heigh: Unknown"
        skinColors.innerText = "Skin color: Unknown"
        hairColors.innerText =  "Hair color: Unknown"
        eyeColors.innerText = "Eye color: Unknown"
    }
}


async function fetchCharacters() {

    let characterIcon = document.querySelector(".icon1")
    characterIcon.classList.add("show")
    characterIcon.classList.remove("hide")
    let detailsIcon = document.querySelector(".icon2")
    detailsIcon.classList.add("show")
    detailsIcon.classList.remove("hide")

    const response = await fetch('https://swapi.dev/api/people/?page=' + fetchIndex )
        const data = await response.json()
       
        for (const obj of data.results) {
            
            if (pageIndex < 8 && pages[pageIndex].length != 6) {
                pages[pageIndex].push(obj)
            } else {
                pageIndex++
                if (pageIndex < 8) {
                    pages[pageIndex].push(obj)
                }
            }
        }
}

async function fetchPlanet(characterPlanet) {
    if (planets.some(planet => planet.url === characterPlanet)) {
        for (const ele of planets) {
            if (ele.url === characterPlanet) {
                showPlanet(ele)
                
            }
        }
    }
    else{
        const response = await fetch(characterPlanet)
            const data = await response.json()
            planets.push(data)
            showPlanet(data)    
    }
}

let starshipsArray=[]
async function  fetchStarships(selectedStarships , selectedSecondStarships){
    let starShipsArr=[]
    if (starshipsArray.some(starship => starship.url === selectedStarships)) {
        for (const ele of starshipsArray) {
            if (ele.url === selectedStarships) {
                starShipsArr.push(ele)
                
            }
        }
    }
    else{
        const response = await fetch(selectedStarships)
            const data = await response.json()
            starshipsArray.push(data)
            starShipsArr.push(data)                
    }

    if (starshipsArray.some(starship => starship.url === selectedSecondStarships)) {
        for (const ele of starshipsArray) {
            if (ele.url === selectedSecondStarships) {
                starShipsArr.push(ele)
                
            }
        }
    }
    else{
        const response = await fetch(selectedSecondStarships)
            const data = await response.json()
            starshipsArray.push(data)
            starShipsArr.push(data)                
    }
    showStarships(starShipsArr)
}

function showStarships(starships){
    let planetIcon = document.querySelector(".icon3")
    planetIcon.classList.add("hide")
    planetIcon.classList.remove("show")

    let modelName = document.querySelector(".planet-name")
    let model     = document.querySelector(".details-planetinfo1")
    let manufacturer = document.querySelector(".details-planetinfo2")
    let costs    = document.querySelector(".details-planetinfo3")
    let length   = document.querySelector(".details-planetinfo4")
    let maxSpeed = document.querySelector(".details-planetinfo5")
    let crew     = document.querySelector(".details-planetinfo6")
    
    let modelNameSec = document.querySelector(".planet-name2")
    let modelSec     = document.querySelector(".details-planetinfo7")
    let manufacturerSec = document.querySelector(".details-planetinfo8")
    let costsSec    = document.querySelector(".details-planetinfo9")
    let lengthSec   = document.querySelector(".details-planetinfo10")
    let maxSpeedSec = document.querySelector(".details-planetinfo11")
    let crewSec     = document.querySelector(".details-planetinfo12")

    if (starships !== "none") {          
        modelName.innerText = starships[0].name
        model.innerText = "Model: " + starships[0].model
        manufacturer.innerText =  "Manufacturer: " + starships[0].manufacturer
        costs.innerText = "Cost in credits: " + starships[0].cost_in_credits
        length.innerText = "Length: " + starships[0].length
        maxSpeed.innerText =  "Max atmospheric speed: " + starships[0].max_atmosphering_speed
        crew.innerText = "Crew: " + starships[0].crew

        modelNameSec.innerText = starships[1].name
        modelSec.innerText = "Model: " + starships[1].model
        manufacturerSec.innerText =  "Manufacturer: " + starships[1].manufacturer
        costsSec.innerText = "Cost in credits: " + starships[1].cost_in_credits
        lengthSec.innerText = "Length: " + starships[1].length
        maxSpeedSec.innerText =  "Max atmospheric speed: " + starships[1].max_atmosphering_speed
        crewSec.innerText = "Crew: " + starships[1].crew
    }

    else{
        modelName.innerText = "None"
        model.innerText = "Model: None" 
        manufacturer.innerText =  "Manufacturer: None" 
        costs.innerText = "Cost in credits: None" 
        length.innerText = "Length: None" 
        maxSpeed.innerText =  "Max atmospheric speed: None" 
        crew.innerText = "Crew: None" 

        modelNameSec.innerText = "None"
        modelSec.innerText = "Model: None" 
        manufacturerSec.innerText =  "Manufacturer: None" 
        costsSec.innerText = "Cost in credits: None" 
        lengthSec.innerText = "Length: None" 
        maxSpeedSec.innerText =  "Max atmospheric speed: None" 
        crewSec.innerText = "Crew: None" 
    }

}

let vehiclesArray=[]
async function  fetchVehicles(selectedVehicles, selectedSecondVehicles){
    let vehicles=[]
    if (vehiclesArray.some(vehicle => vehicle.url === selectedVehicles)) {
        for (const ele of vehiclesArray) {
            if (ele.url === selectedVehicles) {
                vehicles.push(ele)
            }
        }
    }
    else{
        const response = await fetch(selectedVehicles)
            const data = await response.json()
            vehiclesArray.push(data)
            vehicles.push(data)                
    }
    if (vehiclesArray.some(vehicle => vehicle.url === selectedSecondVehicles)) {
        for (const ele of vehiclesArray) {
            if (ele.url === selectedSecondVehicles) {
                vehicles.push(ele)  
            }
        }
    }
    else{
        const response = await fetch(selectedSecondVehicles)
            const data = await response.json()
            vehiclesArray.push(data)
            vehicles.push(data)                
    }
    showVehicles(vehicles)
    console.log(vehiclesArray);
}


function showVehicles(vehicles){
    let planetIcon = document.querySelector(".icon3")
    planetIcon.classList.add("hide")
    planetIcon.classList.remove("show")

    let modelName = document.querySelector(".planet-name")
    let model     = document.querySelector(".details-planetinfo1")
    let manufacturer = document.querySelector(".details-planetinfo2")
    let costs    = document.querySelector(".details-planetinfo3")
    let length   = document.querySelector(".details-planetinfo4")
    let maxSpeed = document.querySelector(".details-planetinfo5")
    let crew     = document.querySelector(".details-planetinfo6")
    
    let modelNameSec = document.querySelector(".planet-name2")
    let modelSec     = document.querySelector(".details-planetinfo7")
    let manufacturerSec = document.querySelector(".details-planetinfo8")
    let costsSec    = document.querySelector(".details-planetinfo9")
    let lengthSec   = document.querySelector(".details-planetinfo10")
    let maxSpeedSec = document.querySelector(".details-planetinfo11")
    let crewSec     = document.querySelector(".details-planetinfo12")

    if (vehicles !== "none") {          
        modelName.innerText = vehicles[0].name
        model.innerText = "Model: " + vehicles[0].model
        manufacturer.innerText =  "Manufacturer: " + vehicles[0].manufacturer
        costs.innerText = "Cost in credits: " + vehicles[0].cost_in_credits
        length.innerText = "Length: " + vehicles[0].length
        maxSpeed.innerText =  "Max atmospheric speed: " + vehicles[0].max_atmosphering_speed
        crew.innerText = "Crew: " + vehicles[0].crew

        modelNameSec.innerText = vehicles[1].name
        modelSec.innerText = "Model: " + vehicles[1].model
        manufacturerSec.innerText =  "Manufacturer: " + vehicles[1].manufacturer
        costsSec.innerText = "Cost in credits: " + vehicles[1].cost_in_credits
        lengthSec.innerText = "Length: " + vehicles[1].length
        maxSpeedSec.innerText =  "Max atmospheric speed: " + vehicles[1].max_atmosphering_speed
        crewSec.innerText = "Crew: " + vehicles[1].crew
    }

    else{
        modelName.innerText = "None"
        model.innerText = "Model: None" 
        manufacturer.innerText =  "Manufacturer: None" 
        costs.innerText = "Cost in credits: None" 
        length.innerText = "Length: None" 
        maxSpeed.innerText =  "Max atmospheric speed: None" 
        crew.innerText = "Crew: None" 

        modelNameSec.innerText = "None"
        modelSec.innerText = "Model: None" 
        manufacturerSec.innerText =  "Manufacturer: None" 
        costsSec.innerText = "Cost in credits: None" 
        lengthSec.innerText = "Length: None" 
        maxSpeedSec.innerText =  "Max atmospheric speed: None" 
        crewSec.innerText = "Crew: None" 
    }
}

async function displayCharacter() {
    if (pages[activePage].length != 6) {
        fetchIndex++
        await fetchCharacters()
    }

    let characterIcon = document.querySelector(".icon1")
    characterIcon.classList.add("hide")
    characterIcon.classList.remove("show")
    let displayIcon = document.querySelector(".icon2")
    displayIcon.classList.add("hide")
    displayIcon.classList.remove("show")

    let pagecharacters = document.querySelectorAll(".character-wrapper p")
    let index = 0

    for (const ele of pagecharacters) {
        ele.innerText = pages[activePage][index].name
        ele.classList.add("loaded-char")
        index++
    }
}



function setupButtons() {
    let back = document.querySelector(".back")
    back.addEventListener("click", backButton)

    let next = document.querySelector(".next")
    next.addEventListener("click", nextButton)
}

function nextButton() {
    if (activePage != 7) {   
        let pageNumber = document.querySelector(".active-page")
        activePage++
        pageNumber.innerText = activePage + 1
        if (selectedCharacter !== undefined) {
            selectedCharacter.classList.remove("character-active")
            selectedCharacter = undefined
        }
        clearCharacters()
        clearDetails()
        clearMoreDetails()
        displayCharacter()
    }
}

function backButton() {
    if (activePage !== 0) {   
        let pageNumber = document.querySelector(".active-page")
        activePage--
        pageNumber.innerText = activePage + 1
        if (selectedCharacter !== undefined) {
            selectedCharacter.classList.remove("character-active")
            selectedCharacter = undefined
        }
        clearCharacters()
        clearDetails()
        clearMoreDetails()
        displayCharacter()
    }
}

function clearCharacters() {
    let pageCharacters = document.querySelectorAll(".character-wrapper p")
    for (const ele of pageCharacters) {
        ele.classList.remove("loaded-char")
        ele.innerText = ""
    }
}

function clearMoreDetails() {
    let details = document.querySelectorAll(".moreDetails >*")
    for (const ele of details) {
        ele.innerText = ""
    }
}

function clearDetails() {
    let details = document.querySelectorAll(".details > section > *:not(.flexed)")
    for (const ele of details) {
        ele.innerText = ""
    }
}

function setActivePage() {
    activePage = document.querySelector(".active-page").innerText - 1
}

function characterListeners() {
    let pageCharacters = document.querySelectorAll(".character-wrapper p")

    for (let i = 0 ; i < pageCharacters.length; i++) {
        pageCharacters[i].addEventListener("click", async function() {
            if (selectedCharacter !== pageCharacters[i]) {
                let detailsIcon = document.querySelector(".icon2")
                detailsIcon.classList.add("show")
                detailsIcon.classList.remove("hide")
                clearDetails()
                if (document.querySelector(".details-active") !== null) {                
                    document.querySelector(".details-active").classList.remove("details-active")
                }
                showDetail(i)
                
                if (selectedCharacter !== undefined) {
                    selectedCharacter.classList.remove("character-active")
                    selectedCharacter.innerHTML = pages[activePage][characterIndex].name
                }
                selectedCharacter = pageCharacters[i]
                characterIndex = i
                pageCharacters[i].classList.add("character-active")
                pageCharacters[i].innerHTML += '<i class="fas fa-caret-right"></i>'
            }
        })
    }
}

function showDetail(i) {
    let detailsIcon = document.querySelector(".icon2")
    detailsIcon.classList.add("hide")
    detailsIcon.classList.remove("show")
    if (detailButtons[0].classList.contains("hide")){ 
    
        for (let button of detailButtons) {
            button.classList.remove("hide")
        }
    }

    let character = pages[activePage][i]
    let characterName = document.querySelector(".character-name")

    let height = document.querySelector(".details-character-height")
    let mass = document.querySelector(".details-character-mass")
    let haircolor = document.querySelector(".details-character-haircolor")
    let skincolor = document.querySelector(".details-character-skincolor")
    let eyecolor = document.querySelector(".details-character-eyecolor")
    let birthyear = document.querySelector(".details-character-birthyear")
    let gender = document.querySelector(".details-character-gender")

    characterName.innerText = character.name
    height.innerText = "Height: " + character.height
    mass.innerText = "Mass: " + character.mass
    haircolor.innerText = "Hair color: " + character.hair_color
    skincolor.innerText = "Skin color: " + character.skin_color
    eyecolor.innerText = "Eye color: " + character.eye_color
    birthyear.innerText = "Birth year: " + character.birth_year
    gender.innerText = "Gender: " + character.gender

}

function showPlanet(planet) {
    let planetIcon = document.querySelector(".icon3")
    planetIcon.classList.add("hide")
    planetIcon.classList.remove("show")

    let planetName = document.querySelector(".planet-name")
    let rotation = document.querySelector(".details-planetinfo1")
    let orbital = document.querySelector(".details-planetinfo2")
    let diameter = document.querySelector(".details-planetinfo3")
    let climate = document.querySelector(".details-planetinfo4")
    let gravity = document.querySelector(".details-planetinfo5")
    let terrain = document.querySelector(".details-planetinfo6")
             
    planetName.innerText = planet.name
    rotation.innerText = "Rotation period: " + planet.rotation_period
    orbital.innerText =  "Orbital period: " + planet.orbital_period
    diameter.innerText = "Diameter: " + planet.diameter
    climate.innerText = "Climate: " + planet.climate
    gravity.innerText =  "Gravity: " + planet.gravity
    terrain.innerText = "Terrain: " + planet.terrain
}

async function main() {
    let characterIcon = document.querySelector(".icon1")
    characterIcon.classList.add("hide")
    let detailsIcon = document.querySelector(".icon2")
    detailsIcon.classList.add("hide")
    let planetIcon = document.querySelector(".icon3")
    planetIcon.classList.add("hide")

    await fetchCharacters()
    setActivePage()
    
    setTimeout(displayCharacter, 3000)
    setTimeout(setupButtons, 3100)
    setTimeout(characterListeners, 3200)  
}
main();