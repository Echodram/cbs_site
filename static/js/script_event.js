 // Mobile menu toggle
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const mobileMenu = document.querySelector('.mobile-menu');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            });
        });


function loadFromLocalStorage(key) {
    const jsonString = localStorage.getItem(key); 
    if (jsonString) {
        return JSON.parse(jsonString);
    }
    return null;
};


function displayContent(){
    const params = new URLSearchParams(window.location.search);
    const data = loadFromLocalStorage('event')
    console.log('ID récupéré:', id);
    if (id !== null && id < data.length) {
        const item = data[id];
        document.getElementById('event-title').innerHTML = `${item.title}`;
        document.getElementById('event-content').innerHTML = `${item.content}`;
    } else {
        document.getElementById('event-title').innerHTML = `<p>Aucune information disponible.</p>`;
    }
 };

 document.addEventListener('DOMContentLoaded', displayContent)