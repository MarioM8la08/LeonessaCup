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

// SPA routes
const routes = {
    '/chiSiamo': '/chiSiamo.html',
    '/partite': '/partite.html',
    '/calendario': '/calendario.html',
    '/classifica': '/classifica.html',
    '/squadre': '/squadre.html',
    '/squadre/itisCastelli': '/squadre/itisCastelli.html',
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