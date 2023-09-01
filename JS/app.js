
const input = document.getElementById('input');
const ayahBtn = document.getElementById('ayahTextBtn');
const transBtn = document.getElementById('translationBtn');
const reciteBtn = document.getElementById('recitationBtn');
const showAyahDiv = document.getElementById('show_Ayah');
const showTransDiv = document.getElementById('showTranslation');
const showArabic = document.getElementById('displayArabic');
const showTrans = document.getElementById('displayTrans');
const recitation = document.getElementById('audioQuran');
const modeBtn = document.getElementById('mode-button');
const cardMode = document.querySelector('.card');

//Add event Listener
ayahBtn.addEventListener('click', function (e) {
    e.preventDefault();
    getAyah(input.value);
})
transBtn.addEventListener('click', function (e) {
    e.preventDefault();
    getTranslation(input.value);
})
reciteBtn.addEventListener('click', function (e) {
    e.preventDefault();
    getRecitation(input.value);
})

//Arabic:   http://api.alquran.cloud/v1/ayah/262
//Translation: http://api.alquran.cloud/v1/ayah/2:255/en.asad
//Recitation: http://api.alquran.cloud/v1/ayah/262/ar.alafasy


//Get Arabic of Ayah
async function getAyah(ayahNo) {
    try {
        const response = await fetch(`http://api.alquran.cloud/v1/ayah/${ayahNo}`)
        const ayahData = await response.json();
        //Show Ayah
        showAyah(ayahData.data.text);
    }
    catch (error) {
       showError(error);
    }
}

//Show Ayah
function showAyah(ayahData) {
    //Display 
    showAyahDiv.style.display = 'block';
    showArabic.innerText = ayahData;
}

//Get Translation of Ayah
async function getTranslation(ayahNo) {
    try {
        const response = await fetch(`http://api.alquran.cloud/v1/ayah/${ayahNo}/en.asad`)
        const ayahData = await response.json();

        //Show Translation
        showTranslation(ayahData.data.text);
    }
    catch (error) {
         showError(error);
    }

}

//Show Translation
function showTranslation(translation) {
    //Display 
    showTransDiv.style.display = 'block';
    showTrans.innerText = translation;
}

//Get Recitation

async function getRecitation(ayahNo) {
    try {
        const response = await fetch(`http://api.alquran.cloud/v1/ayah/${ayahNo}/ar.alafasy`)
        const recitation = await response.json();
        console.log(recitation.data.audio);

        //Play audio
        doRecitation(recitation.data.audio);
    }
    catch (error) {
        showError(error);
    }

}

//Recitation
function doRecitation(audio) {
  
    audioEl = document.createElement("audio");
    audioEl.setAttribute('src', audio);
    recitation.appendChild(audioEl);

    audioEl.play();
}


function showError(error) {

    //Hide details
    showAyahDiv.style.display = 'none';
    showTransDiv.style.display = 'none';

    //Create a div
    const errorDiv = document.createElement('div');
    //Get Elements
    const card = document.querySelector('.card-body');
    const heading = document.querySelector('.heading');
    //Add class
    errorDiv.className = 'alert alert-danger';
    //Create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    //Insert error above heading
    card.insertBefore(errorDiv, heading);
    //Clear error after 3 seconds
    setTimeout(clearError, 3000);  //3000ms = 3s
}

//Clear error
function clearError() {
    document.querySelector('.alert').remove();
}

//Mode Change
modeBtn.addEventListener('click', function () {

    console.log('mode');
    cardMode.classList.toggle('light-mode');
})
