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

        // Blog filtering functionality
        const filterButtons = document.querySelectorAll('.filter-btn');
        const blogCards = document.querySelectorAll('.blog-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active', 'bg-amber-500', 'text-white'));

                // Add active class to clicked button
                button.classList.add('active', 'bg-amber-500', 'text-white');
                button.classList.remove('text-amber-500');

                const filter = button.dataset.filter;

                // Filter blog cards
                blogCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });



function loadFromLocalStorage(key) {
    const jsonString = localStorage.getItem(key); 
    if (jsonString) {
        return JSON.parse(jsonString);
    }
    return null;
};

function updateBlogContent() {
    const data = loadFromLocalStorage('blogPost')
    const blogContainer = document.getElementById('blog-container');
    const blogTemplate = document.getElementById('blog-template').content;
    data.forEach(post => {
        const blogCard = blogTemplate.cloneNode(true);
        blogCard.querySelector('#blog-author').textContent = post.author;
       // blogCard.querySelector('.blog-date').textContent = post.date;
        blogCard.querySelector('#blog-content').textContent = post.description;
        blogCard.querySelector('img').src = post.image;
        blogCard.querySelector('a').href = `blog_content.html?id=${post.id-1}`;
        blogContainer.appendChild(blogCard);
    });

}

// Call the fetchData function when the page loads  
document.addEventListener('DOMContentLoaded', updateBlogContent);
