const aviso = document.querySelector('.aviso');
const resultado = document.querySelector('.resultado');

//Consulta a Api e retorno
document.querySelector(".busca").addEventListener('submit', async (event) =>{
    event.preventDefault();

    let input = document.querySelector("#searchInput").value;

    if(input != ''){
        clear();
        showWarning();

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=be2c1f1cdfe52b9d7fa86891ff80da55&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();

        console.log(json);

        if(json.cod === 200){
            aviso.innerHTML = "";
            
            showInfos(json);
            
        }else{
            clear();
            aviso.innerHTML = "Não encontramos a cidade solicitada.";
        }
    }
});


//Exibe o spinner
function showWarning() {
    aviso.innerHTML = `<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`;
}

//Limpa a tela
function clear() {
    resultado.style.display = "none";
    aviso.innerHTML = "";
}

//Preenche as informações na tela
function showInfos(json) {
    document.querySelector('.titulo').innerHTML = `${json.name} - ${json.sys.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.main.temp}<sup> ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.wind.speed}<span> km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`)
    document.querySelector('.iconDescricao').innerHTML = json.weather[0].description;
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.wind.deg -90}deg)`;
    resultado.style.display = "block";
}
