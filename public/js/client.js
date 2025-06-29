
function locationAs(){
    let url = window.location.href;
    if (url.startsWith("https://leonessacup.live") && !url.includes("/chiSiamo") && !url.includes("/squadre") && !url.includes("/partite") && !url.includes("/player") && !url.includes("/classifica") && !url.includes("/credits") && !url.includes("/regolamento") && !url.includes("/inserimenti") && !url.includes("/biglietti")) {
        window.location.href = "https://leonessacup.live/partite";
    }
}
locationAs();
window.addEventListener("load", function(){
    window.cookieconsent.initialise({
        palette: {
            popup: { background: "rgba(26, 18, 86, 0.7)" },
            button: { background: "#194896" },
        },
        theme: "classic",
        position: "bottom",
        content: {
            message: "Questo sito utilizza i cookie per migliorare l’esperienza utente.",
            dismiss: "Accetto",
            link: "Leggi di più",
            href: "/privacy-policy.html"
        }
    });
});
//image slider generale
// hamburger menu
const buttonHamb = document.getElementById('Hamburger');
let isOpen = false;
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
        document.body.style.overflow = 'visible';
    }
}
buttonHamb.addEventListener('click', function(){
    isOpen = !isOpen;
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    //bloccare lo scrolling
    document.body.style.overflow = 'hidden';
    menuHamb();
});
const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('click', function() {
        if (isOpen) {
            menuHamb();
            isOpen = !isOpen;
        }
    });
});
// media query

// Squadre page
function insertTeams(dataSquadra) {
    let Pos = document.getElementById('Pos');
    let G = document.getElementById('G');
    let V = document.getElementById('V');
    let PG = document.getElementById('PG');
    let GF = document.getElementById('Pt');

    if (window.innerWidth < 480) {
        Pos.innerText = "Pos";
        G.innerText = "G";
        V.innerText = "V";
        PG.innerText = "PG";
        GF.innerText = "Pt";
    }
    let ContentPosition = "posizione";
    let ContentPunti = "punti";
    let ContentVinte = "vittorie";
    let ContentGol = "gol_fatti";
    let ContentPartite = "partite_giocate";
    let arremptyData = [ContentPosition, ContentPunti, ContentVinte, ContentGol, ContentPartite];
    for (let i = 0; i < arremptyData.length; i++) {
        let field = document.getElementById(arremptyData[i]);
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
}
function insertStaff(dataStaff) {
    let list = document.getElementById('listaStaff');
    list.innerHTML = "";
    for (let i = 0; i < dataStaff.length; i++) {
        if (dataStaff[i]['nome_cognome'] === '00100') {
            list.innerHTML += `
        <div class="" style="color: #fff;">
                <h4>Non disponibile lo staff tecnico.</h4>
            </div>
        </div>`;
        } else {
            let nome = dataStaff[i]['nome_cognome'];
            let ruolo = dataStaff[i]['ruolo'];
            let id = dataStaff[i]['id_staff'];
            list.innerHTML += `
        <div class="giocatore">
            <img alt="" src="/img/player/${id}.png">
            <div>
                <h3>${nome}</h3>
                <p>${ruolo}</p>
            </div>
        </div>`;
        }
    }
}
async function initSquadraPage() {
    let squadraID = document.getElementById('squadraID').innerText;
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
    // comunicazione server per staff in squadra
    await fetch(`/api/squadre/Staff?squadraID=${squadraID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            insertStaff(data);
        })
        .catch(err => console.error('Error loading squadra data:', err));
}
// Classifica page
function immaginiSquadre(squadra) {
    let obj = [
        {
            "nome_scuola": "Arnaldo",
            "img": "/img/Squadre/arnaldo.png"
        },
        {
            "nome_scuola": "Itis Castelli",
            "img": "/img/Squadre/castelli.png"
        },
        {
            "nome_scuola": "Gambara",
            "img": "/img/Squadre/gambara.png"
        },
        {
            "nome_scuola": "Copernico",
            "img": "/img/Squadre/copernico.png"
        },
        {
            "nome_scuola": "Luzzago",
            "img": "/img/Squadre/luzzago.png"
        },
        {
            "nome_scuola": "Calini",
            "img": "/img/Squadre/calini.png"
        },
        {
            "nome_scuola": "Canossa",
            "img": "/img/Squadre/canossa.png"
        },
        {
            "nome_scuola": "De Andrè",
            "img": "/img/Squadre/deandre.png"
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
        let imgSquadra = `${immaginiSquadre(squadra)}`;
        let html = `
        <tr>
          <td class="leggenda${i}"></td>
          <td>${posizione}</td>
          <td class="squadraTable"><img alt="" src="${imgSquadra}"><h4 class="squadraTableh4">${squadra}</h4></td>
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
    for(let i = 0; i < dataClassifica.length; i++) {
        girone.push(dataClassifica[i]);
        if(girone.length === 4) {
            initTable(girone);
            girone = [];
        }
    }
}
// Partite page
// async function loadytMatch() {
//     await fetch('/api/partite/ytMatchs')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             dataytMatch = data;
//         })
//         .catch(err => console.error('Error loading classifica data:', err));
// }
//     // YT API
// function utube() {
//     function loadClient() {
//         gapi.client.setApiKey('AIzaSyBgcQk81g5HKGWadplpG4AHrxySVyDDcLQ');
//         return gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
//             .then(() => {
//                 execute();
//             }, (err) => {
//                 console.error('Error loading GAPI client for API', err);
//             });
//     }
//     function execute() {
//         return gapi.client.youtube.search.list({
//             'part': 'snippet',
//             'q': 'soccer highlights', // Modify the search query as needed
//             'type': 'video',
//             'maxResults': 1
//         }).then(async (response) => {
//             const videoContainer = document.getElementById('video-match');
//             const matchslideryt = document.getElementById('matchSlideryt');
//             if (videoContainer) {
//                 response.result.items.forEach(item => {
//                     const iframe = document.createElement('iframe');
//                     iframe.width = '1153';
//                     iframe.height = '649';
//                     iframe.src = `https://www.youtube.com/embed/6p_acerDKKI?si=_CUQH00zGIMQV6Ne`;
//                     iframe.frameBorder = '0';
//                     iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
//                     iframe.allowFullscreen = true;
//                     videoContainer.appendChild(iframe);
//                 });
//             } else {
//                 console.error('video-container element not found');
//             }
//             if (matchslideryt && dataytMatch.length > 0) {
//                 let data = dataytMatch;
//                 for (let i = 0; i < data.length; i++) {
//                     let link = data[i]["link_youtube"];
//                     response.result.items.forEach(item => {
//                         const videoId = link;
//                         const iframe = document.createElement('iframe');
//                         iframe.width = '250';
//                         iframe.height = '140';
//                         iframe.src = videoId;
//                         iframe.frameBorder = '0';
//                         iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
//                         iframe.allowFullscreen = true;
//                         matchslideryt.appendChild(iframe);
//                     });
//                 }
//             }
//         }, (err) => {
//             console.error('Execute error', err);
//         });
//     }
//     gapi.load('client', loadClient);
// }
// tre stati della partita: 0 = in corso, 1 = finita, 2 = non iniziata      dal tempo dedurre lo stato le partite durano 60 minuti + 15 min intervallo
// 0 = in corso, 1 = finita, 2 = non iniziata
function checkStatus(orario) {
    let dataPartita = new Date(orario);
    let oraPartita = dataPartita.getTime();
    let oraAttuale = new Date().getTime();
    let diff = oraPartita - oraAttuale;
    if(diff > 0) {
        return 2; // non iniziata
    } else if(diff < 0 && diff > -4500000) {
        return 0; // in corso
    } else {
        return 1; // finita
    }
}
// funzione che restituisce il risultato della partita in base allo stato
function risultatoPartita(orario, gol) {
    let stato = checkStatus(orario);
    if(stato === 0) {
        return gol;
    } else if(stato === 1) {
        return gol;
    } else {
        return '-';
    }
}
function abbreviazioneSquadre(squadra) {
    squadra = squadra - 1;
    let obj = ["Cas", "Arn", "Gam", "Cop", "Luz", "Cal", "Can", "DeA"];
    return obj[squadra];
}
function GetSquadraById(squadra) {
    squadra = squadra - 1;
    let obj = ["Itis Castelli", "Arnaldo", "Gambara", "Copernico", "Luzzago", "Calini", "Canossa", "De Andrè"];
    return obj[squadra];
}
function minutoPartita(dataInizio) {
    const inizio = new Date(dataInizio);
    const oraAdesso = new Date();
    return Math.floor((oraAdesso - inizio) / 60000);
}
function getDayOfWeek(data) {
    const date = new Date(data);
    const days = ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
    return days[date.getDay()]; // Orario locale
}
function getMonthName(dateString) {
    const date = new Date(dateString);
    const months = [
        "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
        "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
    ];
    return months[date.getMonth()]; // Orario locale
}
function Snododata(data) {
    const date = new Date(data);
    const day = String(date.getDate()).padStart(2, '0');
    return `${getDayOfWeek(data)} ${day} ${getMonthName(data)}`;
}
function dataMatch(data) {
    const date = new Date(data);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month} - ${hours}:${minutes}h ITA`;
}
function dataMatchCompressed(data) {
    const date = new Date(data);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}  ${hours}:${minutes}h`;
}
function sliderMatch() {
    let idLeft = document.getElementById('btnLeft');
    let idRight = document.getElementById('btnRight');
    let slider = document.getElementById('matchSlider');
    if (!idLeft || !idRight || !slider) return;
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
        if(slider.offsetWidth - window.innerWidth < -matchDayWidth ){
            idRight.style.display = 'none';
        }
        slider.style.transform = `translateX(${matchDayWidth}px)`;
    });
    // slider yt
    let idLeftyt = document.getElementById('btnLyt');
    let idRightyt = document.getElementById('btnRyt');
    let slideryt = document.getElementById('matchSlideryt');
    if (!idLeftyt || !idRightyt || !slideryt) return;
    let matchDayWidthyt = 0;
    idLeftyt.addEventListener('click', function() {
        if(matchDayWidthyt === -160) {
            idLeftyt.style.display = 'none';
        }
        if(slideryt.offsetWidth - window.innerWidth > -matchDayWidthyt ){
            idRightyt.style.display = 'block';
        }
        matchDayWidthyt += 160;
        slideryt.style.transform = `translateX(${matchDayWidthyt}px)`;
    });
    idRightyt.addEventListener('click', function() {
        matchDayWidthyt -= 160;
        if (matchDayWidthyt === -160) {
            idLeftyt.style.display = 'block';
        }
        if(slideryt.offsetWidth - window.innerWidth < -matchDayWidthyt ){
            idRightyt.style.display = 'none';
        }
        slideryt.style.transform = `translateX(${matchDayWidthyt}px)`;
    });
}
function loadMapAndGallery() {
    // Evita di caricare più volte lo script
    if (document.getElementById('google-maps-script')) return;

    // Definisci la funzione di callback globale
    window.initMapAndGallery = function() {
        const campoCoords = { lat: 45.562326143747065, lng: 10.218082938660423 };
        const mapContainer = document.getElementById("map-container");
        if (!mapContainer) {
            console.error("Contenitore mappa non trovato.");
            return;
        }
        const map = new google.maps.Map(mapContainer, {
            zoom: 15,
            center: campoCoords,
        });

        if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
            new google.maps.marker.AdvancedMarkerElement({
                map: map,
                position: campoCoords,
                title: "Campo Leonessa Cup"
            });
        }

        // Galleria immagini
        const imageUrls = [
            "/img/campo (1).jpg",
            "/img/campo (2).jpg",
            "/img/campo (3).jpg",
        ];
        const galleryContainer = document.getElementById("gallery");
        if (galleryContainer) {
            galleryContainer.innerHTML = "";
            imageUrls.forEach((url) => {
                const img = document.createElement("img");
                img.src = url;
                img.style.width = "200px";
                img.style.height = "150px";
                img.style.objectFit = "contain";
                img.style.borderRadius = "12px";
                img.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
                img.alt = "Foto campo";
                galleryContainer.appendChild(img);
            });
        }
    };

    // Carica lo script Google Maps con callback
    const script = document.createElement('script');
    script.id = 'google-maps-script';
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCb15fn0Bbk9VqajdTapTcdjiwvscDVRR0&callback=initMapAndGallery&loading=async';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
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
            // console.log('Data partite:', dataPartite);
        })
        .catch(err => console.error('Error loading classifica data:', err));
    const giornate = 6;
    const slider = document.getElementById('matchSlider');
    slider.innerHTML = "";
    let gironi = {
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [],
        "6": []
    };
    for (let i = 1; i <= giornate; i++) {
        if (i === 1) {
        slider.innerHTML += `                
                <div id="giornata${i}" class="giornata">
                    <div class="hGiornate">
                        <h1 id="finestraTempGirone${i}" class="titleGiornate">Domenica 18 Maggio</h1>
                        <h4 class="nGiornate">Giornata ${i}</h4>
                    </div>
                </div>`;
        } else if (i === 2) {
            slider.innerHTML += `                
                <div id="giornata${i}" class="giornata">
                    <div class="hGiornate">
                        <h1 id="finestraTempGirone${i}" class="titleGiornate">Domenica 25 Maggio</h1>
                        <h4 class="nGiornate">Giornata ${i}</h4>
                    </div>
                </div>`;
        } else if (i === 3) {
            slider.innerHTML += `                
                <div id="giornata${i}" class="giornata">
                    <div class="hGiornate">
                        <h1 id="finestraTempGirone${i}" class="titleGiornate">Venerdì 30 Maggio</h1>
                        <h4 class="nGiornate">Giornata ${i}</h4>
                    </div>
                </div>`;
        } else if (i === 4) {
            slider.innerHTML += `                
                <div id="giornata${i}" class="giornata">
                    <div class="hGiornate">
                        <h1 id="finestraTempGirone${i}" class="titleGiornate">Domenica 1 Giugno</h1>
                        <h4 class="nGiornate">Giornata ${i}</h4>
                    </div>
                </div>`;
        } else if (i === 5) {
            slider.innerHTML += `                
                <div id="giornata${i}" class="giornata">
                    <div class="hGiornate">
                        <h1 id="finestraTempGirone${i}" class="titleGiornate">Martedì 3 Giugno</h1>
                        <h4 class="nGiornate">Giornata ${i}</h4>
                    </div>
                </div>`;
        } else if(i === 6) {
            slider.innerHTML += `                
                <div id="giornata${i}" class="giornata">
                    <div class="hGiornate">
                        <h1 id="finestraTempGirone${i}" class="titleGiornate">Giovedì 05 Giugno</h1>
                        <h4 class="nGiornate">Giornata ${i}</h4>
                    </div>
                </div>`;
        }
        for (let j = 0; j < dataPartite.length; j++) {
            let matchDay = document.getElementById(`giornata${i}`);
            if(dataPartite[j]["squadra_casa"] === dataPartite[j]["squadra_ospite"]){
                if(dataPartite[j]['giornata'] === i) {
                    matchDay.innerHTML += `
                    <div class="matchDay2 centerText" style="">
                        <p class="attesaEstrazioni">In attesa delle prossime estrazioni...</p>
                    </div>`;
                    gironi[`${i}`].push(dataPartite[j]["data_ora"]);
                }
            } else {
                // console.log(dataPartite[j]['giornata'], i);
                if(dataPartite[j]['giornata'] === i) {
                    matchDay.innerHTML += `
                    <a href="/partite/partita?partiteId=${dataPartite[j]["id_partita"]}" class="matchDay">
                        <div class="dataMatch">
                            <h3>${dataMatch(dataPartite[j]["data_ora"])}${checkStatus(dataPartite[j]["data_ora"]) === 0 ? '<div class="live-dot"></div>' : ''}</h3>
                            <h4>Girone ${dataPartite[j]["girone"]}</h4>
                            <hr>
                        </div>
                        <div class="flexContent">
                            <div class="squadreFlex">
                                <div class="match">
                                    <div class="team">
                                        <h3>${abbreviazioneSquadre(dataPartite[j]["squadra_casa"])}</h3>
                                        <img alt="" src="${immaginiSquadre(GetSquadraById(dataPartite[j]["squadra_casa"]))}">
                                    </div>
                                </div>
                                <div class="match">
                                    <div class="team">
                                        <h3>${abbreviazioneSquadre(dataPartite[j]["squadra_ospite"])}</h3>
                                        <img alt="" src="${immaginiSquadre(GetSquadraById(dataPartite[j]["squadra_ospite"]))}">
                                    </div>
                                </div>
                            </div>
                            <div class="risLive">
                                <div class="ris">${risultatoPartita(dataPartite[j]["data_ora"], dataPartite[j]["gol_casa"])}</div>
                                <div class="ris">${risultatoPartita(dataPartite[j]["data_ora"], dataPartite[j]["gol_ospite"])}</div>
                            </div>
                        </div>
                    </a>
                `;
                    gironi[`${i}`].push(dataPartite[j]["data_ora"]);
                }
            }
        }
        slider.innerHTML += `<div class="divisoreGiornate"></div>`;
    }
}
function initPartitePage() {
    loadMapAndGallery();
    initMatchSeason().then(() => {});
    sliderMatch();
    // loadytMatch().then(() => {});
    // utube();
}
// Partita page
async function initEventMatch(idCasa, ora) {
    let idPartita = window.location.search.split('=')[1];
    await fetch(`/api/eventi?partitaID=${idPartita}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            initTimeline(data, idCasa, ora);
        })
        .catch(err => console.error('Error loading partita data:', err));
}
async function returnDataMatch(idPartita) {
    try {
        const response = await fetch(`/api/partite/MatchStat?partitaID=${idPartita}`);
        if (!response.ok) {
            new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log(data);
        return data;
    } catch (err) {
        console.error('Error loading partita data:', err);
        throw err; // Re-throw the error to handle it in the calling function
    }
}
function countdownPartita(data) {
    let dataPartita = new Date(data);
    let oraPartita = dataPartita.getTime();
    let oraAttuale = new Date().getTime();
    let diff = oraPartita - oraAttuale;
    let giorni = Math.floor(diff / (1000 * 60 * 60 * 24));
    let ore = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minuti = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let secondi = Math.floor((diff % (1000 * 60)) / 1000);
    let countdown = document.getElementById('countdown');
    countdown.innerHTML = `${giorni}d ${ore}h ${minuti}m ${secondi}s`;
}
function mediaMatch(){
    //interroghiamo server con id partita se ha video se non lo ha quindi status = false mostriamo un count down per la partita con dietro la diretta e il link al social
    let idPartita = window.location.search.split('=')[1];
    let media = document.getElementById('mediaMatch');
    // interroghiamo server con id partita e ricaviamo il link youtube
    fetch(`/api/partite/mediaMatch?partitaID=${idPartita}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
                media.innerHTML = `<iframe width="560" height="315" src="${data["link_youtube"]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
        })
        .catch(err => console.error('Error loading partita data:', err));
}
    // funzione che riempira la linea temporale con eventi con un html predefinito
function initTimeline(data, idCasa, ora) {
    let timeline = document.getElementById('timeline');
    timeline.innerHTML = "";
    let minutiPr = 0;
    for (let i = 0; i < data.length; i++) {
        let gap = 0;
        let minuto = data[i]['minuto'];
        let evento = data[i]['evento'];
        let giocatore = data[i]['nome_cognome'];
        gap = minuto - minutiPr - 3;
        minutiPr = parseInt(minuto);
        if(data[i]['id_squadra'] === idCasa) {
            timeline.innerHTML += `                
                <div class="evento casaEVENTO" style="margin-top: ${gap}0px;">
                    <h2 class="playerEvento">${giocatore}</h2>
                    <div id="iconEvent${i}" class="pallinoIcon"></div>
                    <div class="lineaOr"></div>
                    <div class="pallino"></div>
                    <div class="Minuto">${minuto}''</div>
                </div>`;
        } else {
            timeline.innerHTML += `                
                <div class="evento" style="margin-top: ${gap}0px;">
                    <div class="Minuto spazio5">${minuto}''</div>
                    <div class="pallino"></div>
                    <div class="lineaOr"></div>
                    <div id="iconEvent${i}" class="pallinoIcon"></div>
                    <h2 class="playerEvento">${giocatore}</h2>
                </div>`;
        }
        let icon = document.getElementById('iconEvent' + i);
        if(evento === 'gol') {
            icon.innerHTML = `<i class="fa-solid fa-thin fa-futbol"></i>`;
        } else if(evento === 'giallo') {
            icon.innerHTML = `<i class="fa-solid fa-thin fa-rectangle cardYellow"></i>`;
        } else if(evento === 'rosso') {
            icon.innerHTML = `<i class="fa-solid fa-thin fa-rectangle cardRed"></i>`;
        }
    }
    let minutoLive = minutoPartita(ora);
    if (minutoLive >= 0 && minutoLive <= 30) {
        timeline.innerHTML += `                
                <div class="redLive" style="margin-top: ${minutoLive - minutiPr - 3}0px;">
                    <div class="Minuto">${minutoLive}''</div>
                    <div class="PointerLive"><div class="pallinoLive"></div></div>
                </div>`;
    } else if(minutoLive > 30 && minutoLive < 35) {
        const minutoIntervallo = 30;
        timeline.innerHTML += `                
                <div class="redLive" style="margin-top: ${minutoIntervallo - minutiPr - 3}0px;">
                    <div class="Minuto">Int</div>
                    <div class="PointerLive"><div class="live-dot"></div></div>
                </div>`;
    } else if(minutoLive >= 35 && minutoLive <= 65) {
        timeline.innerHTML += `                
                <div class="redLive" style="margin-top: ${(minutoLive - 15) - minutiPr - 3}0px;">
                    <div class="Minuto">${minutoLive - 15}''</div>
                    <div class="PointerLive"><div class="pallinoLive"></div></div>
                </div>`;
    }
}
async function imagemSquadre() {
    let idPartita = window.location.search.split('=')[1];
    let matchData = await returnDataMatch(idPartita);
    let nImg = matchData['nImg'];
    let idImg = document.getElementById('slides');
    // console.log(idImg);
    idImg.innerHTML = "";
    // console.log(idPartita, nImg);
    for (let i = 1; i <= nImg; i++) {
        idImg.innerHTML += `
            <div class="slide" style="background-image:url('/img/Partite/${idPartita}/${i}.jpg');"></div>
        `;
    }
    const slides = document.getElementById('slides');
    const dotsContainer = document.getElementById('slider-dots');
    const totalSlides = slides.children.length;
    let currentIndex = 0;

    function showSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        slides.style.transform = `translateX(${-index * 100}%)`;
        currentIndex = index;
        updateDots();
    }

    function updateDots() {
        Array.from(dotsContainer.children).forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => showSlide(i);
        dotsContainer.appendChild(dot);
    }

    document.getElementById('prev').onclick = () => showSlide(currentIndex - 1);
    document.getElementById('next').onclick = () => showSlide(currentIndex + 1);

    // Optional: Auto-play slider
    setInterval(() => showSlide(currentIndex + 1), 4000);

    showSlide(0);
}
function initStatPartita(data) {
    imagemSquadre().then(() => {});
    let logoCasa = document.getElementById('logoSquadraCasa');
    let logoOspite = document.getElementById('logoSquadraOspite');
    logoCasa.src = immaginiSquadre(GetSquadraById(data['squadra_casa']));
    logoOspite.src = immaginiSquadre(GetSquadraById(data['squadra_ospite']));
    //risultati
    let risCasa = data['gol_casa']
    let risOspite = data['gol_ospite'];
    let status;
    let ora = data['data_ora'];
    let statusMatch = checkStatus(ora);
    status = (statusMatch === 0 || statusMatch === 1);
    let risultatoCasa = document.getElementById('gol_casa');
    let risultatoOspite = document.getElementById('gol_ospite');
    let dataPartita = document.getElementById('dataPartita');
    let divTeam1 = document.getElementById('TeamDiv1');
    let divTeam2 = document.getElementById('TeamDiv2');
    if(!status) {
        risCasa = '-';
        risOspite = '-';
        divTeam1.classList.add('pareggio');
        divTeam2.classList.add('pareggio');
        dataPartita.innerText = dataMatchCompressed(ora);
        countdownPartita(data["data_ora"]);
        setInterval(() => {
            countdownPartita(data["data_ora"]);
        }, 1000);
    } else {
        dataPartita.hidden = true;
        mediaMatch(data);
        if (risCasa > risOspite) {
            divTeam1.classList.add('win');
            divTeam2.classList.add('lose');
        } else if(risCasa === risOspite) {
            divTeam1.classList.add('pareggio');
            divTeam2.classList.add('pareggio');
        } else {
            divTeam1.classList.add('lose');
            divTeam2.classList.add('win');
        }
    }
    risultatoCasa.innerText = risCasa;
    risultatoOspite.innerText = risOspite;
    if(status) {
        initEventMatch(data['squadra_casa'], ora).then(() => {});
        setInterval(() => {
            initEventMatch(data['squadra_casa'], ora).then(() => {});
        }, 10000);
    } else {
        let idTimDiv = document.getElementById('timelineTotal');
        idTimDiv.classList.add('hidden');
    }

}
async function partitaPage() {
    // leggiamo i parametri della partita dall'url dopo il '?'
    let idPartita = window.location.search.split('=')[1];
    // comunicazione con il server per dati partita
    await fetch(`/api/partite/MatchStat?partitaID=${idPartita}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            initStatPartita(data);
        })
        .catch(err => console.error('Error loading partita data:', err));
}
// Player page

function insertDataPlayer(dataPlayer) {
    let imgPlayer = document.getElementById('imgPlayer');
    imgPlayer.src = `/img/player/${dataPlayer[0]['id_giocatore']}.png`;
    let squadra = "nome_scuola";
    let ContentNome = "nome_cognome";
    let ContentAnno = "anno_scolastico";
    let ContentNumero = "numero_maglia";
    let ContentRuolo = "ruolo";
    let ContentGol = "total_gol";
    let ContentAssist = "total_assist";
    let ContentGialli = "total_cartellini_gialli";
    let ContentRossi = "total_cartellini_rossi";
    let ContentMinuti = "total_minuti_giocati";
    let presenze = "total_titolare_true";
    let arremptyData = [ContentNome, ContentAnno, ContentNumero, ContentRuolo, ContentGol, ContentAssist, ContentGialli, ContentRossi, ContentMinuti, presenze, squadra];
    for (let i = 0; i < arremptyData.length; i++) {
        let field = document.getElementById(arremptyData[i]);
        field.innerHTML = dataPlayer[0][arremptyData[i]];
    }
}
async function initPlayerPage(){
    let playerID = window.location.search.split('=')[1];
    // comunicazione server per giocatori in squadra
    await fetch(`/api/player/Data?playerID=${playerID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            insertDataPlayer(data);
        })
        .catch(err => console.error('Error loading player data:', err));
}
// biglietti page
function deleteEffect(elementId, interval) {
    return new Promise((resolve) => {
        const element = document.getElementById(elementId);
        if (!element || !element.textContent) {
            resolve(); // Resolve immediately if no text to delete
            return;
        }

        const text = element.textContent;
        let index = text.length;

        const deletingInterval = setInterval(() => {
            if (index > 0) {
                element.textContent = text.substring(0, --index);
            } else {
                clearInterval(deletingInterval); // Stop when the text is fully deleted
                resolve(); // Resolve the Promise
            }
        }, interval);
    });
}
async function typeEffect(elementId, text, interval) {
    await deleteEffect(elementId, interval); // Wait for text deletion to complete
    const element = document.getElementById(elementId);
    let index = 0;

    const typingInterval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
        } else {
            clearInterval(typingInterval); // Stop when the text is fully displayed
        }
    }, interval);
}
function initBigliettiPage() {
    const form = document.getElementById('bookingForm');
    const numeroPersone = document.getElementById('numeroPersone');
    const prezzo = document.getElementById('prezzo');
    numeroPersone.addEventListener('input', () => {
        prezzo.innerHTML = `All'ingresso si richiede un contributo di ${(numeroPersone.value * 3)}€`;
    });
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            name: form.nome.value.trim(),
            surname: form.cognome.value.trim(),
            email: form.email.value.trim(),
            numeroPersone: form.numeroPersone.value.trim(),
        };

        await typeEffect('feedback', 'Invio in corso...', 5);

        try {
            const response = await fetch('/api/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                await typeEffect('feedback', 'Prenotazione inviata! Controlla la tua email.', 50);
            } else {
                await typeEffect('feedback', `Errore: ${result.message}`, 50);
            }
        } catch (error) {
            await typeEffect('feedback', 'Errore di rete o server non raggiungibile.', 50);
        }
    });
}
//SPA
const squadreRoutes = [
    '/squadre/itisCastelli.html', '/squadre/Arnaldo.html', '/squadre/Copernico.html',
    '/squadre/Gambara.html', '/squadre/Calini.html',
    '/squadre/Canossa.html', '/squadre/Luzzago.html',
    '/squadre/DeAndre.html'
];
const routes = {
    '/chiSiamo': '/chiSiamo.html',
    '/credits': '/credits.html',
    '/partite': '/partite.html',
    '/partite/partita': '/partite/partita.html',
    '/classifica': '/classifica.html',
    '/squadre': '/squadre.html',
    '/squadre/itisCastelli': '/squadre/itisCastelli.html',
    '/squadre/arnaldo': '/squadre/Arnaldo.html',
    '/squadre/copernico': '/squadre/Copernico.html',
    '/squadre/gambara': '/squadre/Gambara.html',
    '/squadre/calini': '/squadre/Calini.html',
    '/squadre/canossa': '/squadre/Canossa.html',
    '/squadre/luzzago': '/squadre/Luzzago.html',
    '/squadre/deAndre': '/squadre/DeAndre.html',
    '/player': '/player.html',
    '/regolamento': '/regolamento.html',
    '/biglietti': '/biglietti.html',
};
function loadContent(url) {
    const mainContent = document.getElementById('main-content');

    // Redirect root path to /chiSiamo
    if (url === '/') {
        url = routes['/chiSiamo'];
        window.history.replaceState({}, '', '/chiSiamo');
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            mainContent.innerHTML = html;
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            if (squadreRoutes.includes(url)) {
                initSquadraPage().then(() => {});
            } else if (url === routes['/classifica']) {
                initClassificaPage().then(() => {});
            } else if (url === routes['/partite']) {
                initPartitePage();
            } else if (url === routes['/player']) {
                initPlayerPage().then(() => {});
            } else if (url === routes['/partite/partita']) {
                partitaPage().then(() => {});
            } else if (url === routes['/biglietti']) {
                initBigliettiPage();
            }
        })
        .catch(err => console.error('Error loading content:', err));
}

function navigate(event) {
    event.preventDefault();
    let path = event.target.getAttribute('href');
    if (!path) return;

    // Check if the link is external
    if (path.startsWith('http://') || path.startsWith('https://')) {
        window.open(path, '_blank'); // Open external links in a new tab
        return;
    }

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
