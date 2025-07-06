function loadFromLocalStorage(key) {
    const jsonString = localStorage.getItem(key); 
    if (jsonString) {
        return JSON.parse(jsonString);
    }
    return null;
};


function displayContent(){

    const params = new URLSearchParams(window.location.search);
    const data = loadFromLocalStorage('blogPost')
    const id = params.get('id');


    console.log('ID récupéré:', id);
    if (id !== null && id < data.length) {
        console.log('Chargement des données pour l\'ID:', id);
        const item = data[id];
        document.getElementById('blog-title').innerHTML = `${item.title}`;
        document.getElementById('blog-content').innerHTML = `${item.content}`;
    } else {
        document.getElementById('blog-title').innerHTML = `<p>Aucune information disponible.</p>`;
    }
 };

 document.addEventListener('DOMContentLoaded', displayContent)


    

