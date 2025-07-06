
function saveToLocalStorage(key, jsonData) {
    const jsonString = JSON.stringify(jsonData);
    localStorage.setItem(key, jsonString); 
};

    
async function fetchData() {
    try {
        const response1 = await fetch('https://mardoche.pythonanywhere.com/blogs/');
        const data1 = await response1.json();

        const response2 = await fetch('https://mardoche.pythonanywhere.com/event/');
        const data2 = await response2.json();
       
        saveToLocalStorage('event', data2)
        saveToLocalStorage('blogPost', data1)
        recentBlogContent(data1.slice(0, 3));
        recentEvent(data2.slice(0, 3))
    } catch(error) {
        console.error('Error fetching data:', error);
    }
};


function recentBlogContent(data) {
    const blogContainer = document.getElementById('blog-container');
    const blogTemplate = document.getElementById('blog-template').content;
    data.forEach(post => {
        const blogCard = blogTemplate.cloneNode(true);
        blogCard.querySelector('#blog-author').textContent = post.author;
        //blogCard.querySelector('.blog-date').textContent = post.date;
        blogCard.querySelector('#blog-content').textContent = post.description;
        blogCard.querySelector('img').src = post.image;
        blogCard.querySelector('a').href = `blog_content.html?id=${post.id-1}`;
        blogContainer.appendChild(blogCard);
    });

};

function recentEvent(data) {
    const eventContainer = document.getElementById('event-container');
    const eventTemplate = document.getElementById('event-template').content;
    data.forEach(post => {
        const eventCard = eventTemplate.cloneNode(true);
        eventCard.querySelector('#event-title').textContent = post.title;
       // blogCard.querySelector('.blog-date').textContent = post.date;
        eventCard.querySelector('#event-description').textContent = post.description;
        eventCard.querySelector('img').src = post.image;
        eventCard.querySelector('a').href = `event.html?id=${post.id-1}`;
        eventContainer.appendChild(eventCard);
    });

}
document.addEventListener('DOMContentLoaded', fetchData);
