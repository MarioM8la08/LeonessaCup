// hamburger menu
const buttonHamb = document.getElementById('Hamburger');
const lineA = document.getElementById('lineA');
const lineB = document.getElementById('lineB');
const lineC = document.getElementById('lineC');
const menu = document.getElementById('menuDev');
function menuHamb() {
    if (buttonHamb.getAttribute('Open') === 'true') {
        document.body.style.overflow = 'auto';
        menu.classList.add('hidden');
        buttonHamb.setAttribute('Open', 'false');
        lineB.classList.remove('element-fade-out');
        lineA.classList.remove('rotate-right');
        lineC.classList.remove('rotate-left');
        lineB.classList.add('element-fade-in');
        lineA.classList.add('return-right');
        lineC.classList.add('return-left');
    } else {
        buttonHamb.setAttribute('Open', 'true');
        lineB.classList.remove('element-fade-in');
        lineA.classList.remove('return-right');
        lineC.classList.remove('return-left');
        lineB.classList.add('element-fade-out');
        lineA.classList.add('rotate-right');
        lineC.classList.add('rotate-left');
        menu.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}
buttonHamb.addEventListener('click', function(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    menuHamb();
});
// Squadre page
function insertTeams(dataSquadra) {
    let ContentPosition = "posizione";
    let ContentPunti = "punti";
    let ContentVinte = "vittorie";
    let ContentGol = "gol_fatti";
    let ContentPartite = "partite_giocate";
    let arremptyData = [ContentPosition, ContentPunti, ContentVinte, ContentGol, ContentPartite];
    for (let i = 0; i < arremptyData.length; i++) {
        let field = document.getElementById(arremptyData[i]);
        console.log('field:', arremptyData[i], field);
        field.innerHTML = dataSquadra[arremptyData[i]];
        if(arremptyData[i] === 'posizione') {
            field.innerHTML += '°';
        }
    }
}
function insertPlayers(dataGiocatori) {
    let list = document.getElementById('listaGiocatori');
    list.innerHTML = "";
    for (let i = 0; i < dataGiocatori.length; i++) {
        let nome = dataGiocatori[i]['nome_cognome'];
        let ruolo = dataGiocatori[i]['ruolo'];
        let id = dataGiocatori[i]['id_giocatore'] ;
        list.innerHTML += `
        <a href="/player?playerID=${id}" class="giocatore">
            <img alt="" src="/img/player/${id}.png">
            <div>
                <h3>${nome}</h3>
                <p>${ruolo}</p>
            </div>
        </a>`;
    }
    console.log('dataGiocatori:', dataGiocatori);
}
async function initSquadraPage() {
    let squadraID = document.getElementById('squadraID').innerText;
    let dataGiocatori = {};
    // comunicazione server per giocatori in squadra
    await fetch(`/api/squadre/Giocatori?squadraID=${squadraID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            insertPlayers(data);
        })
        .catch(err => console.error('Error loading squadra data:', err));
    // comunicazione con il server per dati squadra
    await fetch(`/api/squadre/Data?squadraID=${squadraID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            insertTeams(data);
        })
        .catch(err => console.error('Error loading squadra data:', err));
}
// Classifica page
function immaginiSquadre(squadra) {
    let obj = [
        {
            "nome_scuola": "Arnaldo",
            "img": "/img/iislogo.gif"
        },
        {
            "nome_scuola": "Itis Castelli",
            "img": "/img/iislogo.gif"
        },
        {
            "nome_scuola": "Copernico",
            "img": "/img/iislogo.gif"
        },
        {
            "nome_scuola": "Gambara",
            "img": "/img/iislogo.gif"
        },
        {
            "nome_scuola": "Calini",
            "img": "/img/iislogo.gif"
        },
        {
            "nome_scuola": "Lunardi",
            "img": "/img/iislogo.gif"
        },
        {
            "nome_scuola": "Canossa",
            "img": "/img/iislogo.gif"
        },
        {
            "nome_scuola": "Luzzago",
            "img": "/img/iislogo.gif"
        },
        {
            "nome_scuola": "Leonardo",
            "img": "/img/iislogo.gif"
        },
        {
            "nome_scuola": "De Andrè",
            "img": "/img/iislogo.gif"
        },
        {
            "nome_scuola": "Newton",
            "img": "/img/iislogo.gif"
        },
        {
            "nome_scuola": "Antonietti",
            "img": "/img/iislogo.gif"
        }
    ]
    for (let i = 0; i < obj.length; i++) {
        if(obj[i]['nome_scuola'] === squadra) {
            return obj[i]['img'];
        }
    }
}
function initTable(girone) {
    let table = document.getElementById(`classifica${girone[0]['girone']}`);
    console.log('table:', table);
    table.innerHTML = "";
    for (let i = 0; i < girone.length; i++) {
        let squadra = girone[i]['nome_scuola'];
        let posizione = girone[i]['posizione'];
        let punti = girone[i]['punti'];
        let partiteGiocate = girone[i]['partite_giocate'];
        let vittorie = girone[i]['vittorie'];
        let pareggi = girone[i]['pareggi'];
        let sconfitte = girone[i]['sconfitte'];
        let golFatti = girone[i]['gol_fatti'];
        let golSubiti = girone[i]['gol_subiti'];
        let differenzaReti = girone[i]['differenza_reti'];
        let imgSquadra = `.${immaginiSquadre(squadra)}`;
        let html = `
        <tr>
          <td class="leggenda${i}"></td>
          <td>${posizione}</td>
          <td class="squadraTable"><img alt="" src="${imgSquadra}"><h4>${squadra}</h4></td>
          <td>${punti}</td>
          <td>${partiteGiocate}</td>
          <td>${vittorie}</td>
          <td>${pareggi}</td>
          <td>${sconfitte}</td>
          <td>${golFatti}</td>
          <td>${golSubiti}</td>
          <td>${differenzaReti}</td>
        </tr>
        <tr class="separaRiga"></tr>`;
        table.innerHTML += html;
    }
}
async function initClassificaPage() {
    let dataClassifica = [];
    // comunicazione con il server per dati classifica
    await fetch('/api/classifica/Data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            dataClassifica = data;
        })
        .catch(err => console.error('Error loading classifica data:', err));
    let girone = [];
    console.log('dataClassifica:', dataClassifica);
    for(let i = 0; i < dataClassifica.length; i++) {
        girone.push(dataClassifica[i]);
        if(girone.length === 4) {
            initTable(girone);
            girone = [];
        }
    }
    console.log('girone:', girone);
}
// Partite page
function risultatoPartita(status, gol) {
    console.log(typeof status);
    console.log(typeof gol);
    return status ? gol : '-';
}
function abbreviazioneSquadre(squadra) {
    squadra = squadra - 1;
    let obj = ["Cas", "Arn", "Gam", "Cop", "Luz", "Cal", "Can", "Lun", "Leo", "DeA", "New", "Ant"];
    return obj[squadra];
}
function getDayOfWeek(data) {
    const date = new Date(data);
    const days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
    return days[date.getUTCDay()]; // getUTCDay() restituisce 0 (Domenica) - 6 (Sabato)
}
function getMonthName(dateString) {
    const date = new Date(dateString);
    const months = [
        "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
        "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
    ];
    return months[date.getUTCMonth()]; // getUTCMonth() restituisce un valore da 0 (Gennaio) a 11 (Dicembre)
}
function Snododata(data) { //2025-05-03T15:00:00.000Z
    return `${getDayOfWeek(data)} ${data.slice(8, 10)} ${getMonthName(data)}`;
}
function dataMatch(data) {
    return `${data.slice(8, 10)}/${data.slice(5, 7)} - ${data.slice(11, 16)}h ITA`;
}
function sliderMatch() {
    let idLeft = document.getElementById('btnLeft');
    let idRight = document.getElementById('btnRight');
    let slider = document.getElementById('matchSlider');
    let matchDayWidth = 0;
    idLeft.addEventListener('click', function() {
        if(matchDayWidth === -300) {
            idLeft.style.display = 'none';
        }
        if(slider.offsetWidth - window.innerWidth > -matchDayWidth ){
            idRight.style.display = 'block';
        }
        matchDayWidth += 300;
        slider.style.transform = `translateX(${matchDayWidth}px)`;
    });
    idRight.addEventListener('click', function() {
        matchDayWidth -= 300;
        if (matchDayWidth === -300) {
            idLeft.style.display = 'block';
        }
        console.log(slider.offsetWidth - window.innerWidth);
        if(slider.offsetWidth - window.innerWidth < -matchDayWidth ){
            idRight.style.display = 'none';
        }
        slider.style.transform = `translateX(${matchDayWidth}px)`;
    });
}
async function initMatchSeason() {
    let dataPartite = [];
    // comunicazione con il server per dati classifica
    await fetch('/api/partite/DataMatch')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            dataPartite = data;
        })
        .catch(err => console.error('Error loading classifica data:', err));
    console.log('dataPartite:', dataPartite);
    const giornate = 3;
    const slider = document.getElementById('matchSlider');
    slider.innerHTML = "";
    let gironi = {
        "1": [],
        "2": [],
        "3": [],
    };
    for (let i = 1; i <= giornate; i++) {
        slider.innerHTML += `                
                <div id="giornata${i}" class="giornata">
                    <div class="hGiornate">
                        <h1 id="finestraTempGirone${i}" class="titleGiornate">${Snododata(dataPartite[0]["data_ora"])}</h1>
                        <h4 class="nGiornate">Giornata ${i}</h4>
                    </div>
                </div>`;
        for (let j = 0; j < dataPartite.length; j++) {
            let matchDay = document.getElementById(`giornata${i}`);
            if(dataPartite[j]['giornata'] === i) {
                matchDay.innerHTML += `
                    <div class="matchDay">
                        <div class="dataMatch">
                            <h3>${dataMatch(dataPartite[j]["data_ora"])}</h3>
                            <h4>Girone ${dataPartite[j]["girone"]}</h4>
                            <hr>
                        </div>
                        <div class="flexContent">
                            <div class="squadreFlex">
                                <div class="match">
                                    <div class="team">
                                        <h3>${abbreviazioneSquadre(dataPartite[j]["squadra_casa"])}</h3>
                                        <img alt="" src="/img/iislogo.gif">
                                    </div>
                                </div>
                                <div class="match">
                                    <div class="team">
                                        <h3>${abbreviazioneSquadre(dataPartite[j]["squadra_ospite"])}</h3>
                                        <img alt="" src="/img/iislogo.gif">
                                    </div>
                                </div>
                            </div>
                            <div class="risLive">
                                <div class="ris">${risultatoPartita(dataPartite[j]["status"], dataPartite[j]["gol_casa"])}</div>
                                <div class="ris">${risultatoPartita(dataPartite[j]["status"], dataPartite[j]["gol_ospite"])}</div>
                            </div>
                        </div>
                    </div>
                `;
                gironi[`${i}`].push(dataPartite[j]["data_ora"]);
            }
        }
        slider.innerHTML += `<div class="divisoreGiornate"></div>`;
    }

    for (let k = 1; k <= giornate; k++) {
        let data = document.getElementById('finestraTempGirone' + k);
        data.innerText = `${getDayOfWeek(gironi[k][0]) } ${gironi[k][0].slice(8, 10)} - ${getDayOfWeek(gironi[k].length - 1) } ${gironi[k][gironi[k].length - 1].slice(8, 10)} ${getMonthName(gironi[k][0])}`;
    }
}
function initPartitePage() {
    initMatchSeason().then(() => {});
    sliderMatch();
}
//SPA
const squadreRoutes = [
    '/squadre/itisCastelli.html', '/squadre/Arnaldo.html', '/squadre/Copernico.html',
    '/squadre/Gambara.html', '/squadre/Calini.html', '/squadre/Lunardi.html',
    '/squadre/Canossa.html', '/squadre/Luzzago.html', '/squadre/Leonardo.html',
    '/squadre/DeAndre.html', '/squadre/Newton.html', '/squadre/Antonietti.html'
];
const routes = {
    '/chiSiamo': '/chiSiamo.html',
    '/credits': '/credits.html',
    '/partite': '/partite.html',
    '/classifica': '/classifica.html',
    '/squadre': '/squadre.html',
    '/squadre/itisCastelli': '/squadre/itisCastelli.html',
    '/squadre/arnaldo': '/squadre/Arnaldo.html',
    '/squadre/copernico': '/squadre/Copernico.html',
    '/squadre/gambara': '/squadre/Gambara.html',
    '/squadre/calini': '/squadre/Calini.html',
    '/squadre/lunardi': '/squadre/Lunardi.html',
    '/squadre/canossa': '/squadre/Canossa.html',
    '/squadre/luzzago': '/squadre/Luzzago.html',
    '/squadre/leonardo': '/squadre/Leonardo.html',
    '/squadre/deAndre': '/squadre/DeAndre.html',
    '/squadre/newton': '/squadre/Newton.html',
    '/squadre/antonietti': '/squadre/Antonietti.html',
    '/player': '/player.html',
    '/regolamento': '/regolamento.html'
};
function loadContent(url) {
    const mainContent = document.getElementById('main-content');
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            mainContent.innerHTML = html;
            console.log('Content loaded:', url);
            if (squadreRoutes.includes(url)) {
                initSquadraPage().then(() => {});
            } else if (url === routes['/classifica']) {
                initClassificaPage().then(() => {});
            } else if (url === routes['/partite']) {
                initPartitePage();
            }
        })
        .catch(err => console.error('Error loading content:', err));
}
function navigate(event) {
    event.preventDefault();
    let path = event.target.getAttribute('href');
    if (!path) return;

    if (path.endsWith('/')) {
        path = path.slice(0, -1);
    }

    if (routes[path]) {
        window.history.pushState({}, '', path);
        loadContent(routes[path]);
    } else {
        console.error('Route not found:', path);
    }
}
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', navigate);
});
window.onpopstate = () => {
    let path = window.location.pathname;
    if (path.endsWith('/')) {
        path = path.slice(0, -1);
    }
    if (routes[path]) {
        loadContent(routes[path]);
    } else {
        console.error('Route not found:', path);
    }
};
let initialPath = window.location.pathname;
if (initialPath.endsWith('/')) {
    initialPath = initialPath.slice(0, -1);
}
if (routes[initialPath]) {
    loadContent(routes[initialPath]);
} else {
    console.error('Route not found:', initialPath);
}
