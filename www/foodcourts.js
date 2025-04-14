function toggleProfile(){
    const profile = document.querySelector('.profile-view');
    profile.classList.toggle('active');
}

function showMaintenanceMessage() {
    alert("This feature is currently under maintenance. Please check back later!");
}

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    
    const structure = `
        <div class="nav">
            <div class="logo"></div>
            <div class="spaces"></div>
            <div class="profile" onclick="toggleProfile()">
                <img src="./images/explore/boy.png" alt="">
            </div>
        </div>
        <div class="container">
            <div class="navigation">
                <div class="nav-section">
                    <div class="section">
                        <h2>Navigation</h2>
                        <div class="info">
                            <div class="nav-item" onclick="showMaintenanceMessage()">
                                <i class="ri-building-2-fill"></i>
                                <p>Blocks & Areas</p>
                            </div>
                            <div class="nav-item" onclick="showMaintenanceMessage()">
                                <i class="ri-store-2-line"></i>
                                <p>Food Courts</p>
                            </div>
                            <div class="nav-item" onclick="showMaintenanceMessage()">
                                <i class="ri-restaurant-line"></i>
                                <p>Dishes</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nav-section">
                    <div class="section">
                        <h2>Quick Filters</h2>
                        <div class="info">
                            <div class="nav-item" onclick="showMaintenanceMessage()">
                                <i class="ri-fire-fill"></i>
                                <p>Popular Now</p>
                            </div>
                            <div class="nav-item" onclick="showMaintenanceMessage()">
                                <i class="ri-star-s-fill"></i>
                                <p>Top Rated</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="nav-section">
                    <div class="section">
                        <h2>Food Type</h2>
                        <div class="info">
                            <div class="nav-item" onclick="showMaintenanceMessage()">
                                <i class="ri-time-fill"></i>
                                <p>North Indian</p>
                            </div>
                            <div class="nav-item" onclick="showMaintenanceMessage()">
                                <i class="ri-time-fill"></i>
                                <p>South Indian</p>
                            </div>
                            <div class="nav-item" onclick="showMaintenanceMessage()">
                                <i class="ri-time-fill"></i>
                                <p>Chinese</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mx-auto max-w-7xl">
                <div id="main-content"></div>
            </div>
        </div>
    `;
    
    root.innerHTML = structure;

    const blockName = getBlockNameFromURL();
    if (blockName) {
        showFoodCourts(blockName);
    } else {
        window.location.href = 'explore.html';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const profileView = document.querySelector('.profile-view');

    profileView.innerHTML = `
        <div class="username">
            <h3>Username</h3>
            <p id="usernames"> <?php echo $_SESSION['username']; ?> </p>
        </div>
        <div class="detail">
            <div class="data">
                <i class="ri-user-settings-line"></i>
                <p>My Profile</p>
            </div>
            <div class="data">
                <i class="ri-chat-1-fill"></i>
                <p>Your Experience</p>
            </div>
            <div class="data">
                <i class="ri-key-2-fill"></i>
                <p>Change Password</p>
            </div>
            <a class="data logout" href="logout.php">  
                <i class="ri-logout-box-r-line"></i>
                <p>Logout</p>
            </a>
        </div>
    `;
})

document.addEventListener("DOMContentLoaded", function () {
    fetch("get_user.php")
        .then(response => response.json())
        .then(data => {
            document.getElementById("usernames").textContent = data.username;
        })
        .catch(error => console.error("Error fetching username:", error));
});

function foodCourt(foodCourt, blockName) {
    const card = document.createElement('div');
    card.className = 'food-court-card';
    card.setAttribute('data-food-court-id', foodCourt.id);
    
    card.innerHTML = `
        <div class="card-image">
            <img src="${foodCourt.image}" alt="Food Court" class="food-court-image">
        </div>
        <div class="food-court-content">
            <div class="food-court-header">
                <h2 class="food-court-name">${foodCourt.name}</h2>
                <div class="speciality-badge">
                    <i class="ri-award-fill"></i>
                    <span>${foodCourt.speciality}</span>
                </div>
            </div>
            
            <div class="cuisines">
                ${foodCourt.cuisines.map(cuisine => `<span class="cuisine-tag">${cuisine}</span>`).join('')}
            </div>

            <div class="rating-info" title="Loading ratings...">
                <div class="stars">
                    <i class="ri-star-fill"></i>
                </div>
                <span class="rating-number">0.0</span>
                <span class="review-count">(0 reviews)</span>
            </div>

            <div class="button-container">
                <button class="view-menu-btn" onclick="window.location.href='dishes.html?block=${blockName}&foodCourtId=${foodCourt.id}'">
                    <span>View Menu</span>
                    <i class="ri-arrow-right-line"></i>
                </button>
            </div>
        </div>
    `;

    // Fetch food court rating directly
    fetch(`get_foodcourt_rating.php?foodCourtId=${foodCourt.id}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const ratingNumber = card.querySelector('.rating-number');
                const reviewCount = card.querySelector('.review-count');
                const stars = card.querySelector('.stars');
                const ratingInfo = card.querySelector('.rating-info');
                
                // Update rating number
                const rating = parseFloat(data.rating);
                ratingNumber.textContent = rating.toFixed(1);
                
                // Update review count
                const reviewText = data.reviewCount === 1 ? 'review' : 'reviews';
                reviewCount.textContent = `(${data.reviewCount} ${reviewText})`;
                
                // Update stars
                stars.innerHTML = generateStars(rating);

                // Update tooltip with detailed stats
                ratingInfo.title = `Average rating: ${rating.toFixed(1)}\nTotal reviews: ${data.reviewCount}\nDishes with reviews: ${data.dishesWithReviews}\nTotal dishes: ${data.totalDishes}`;
            }
        })
        .catch(error => {
            console.error('Error fetching food court rating:', error);
            const ratingInfo = card.querySelector('.rating-info');
            ratingInfo.title = 'Error loading ratings';
        });

    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - Math.ceil(rating);
    
    let starsHtml = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="ri-star-fill" style="color: #fbbf24;"></i>';
    }
    
    // Add half star if needed
    if (hasHalfStar) {
        starsHtml += '<i class="ri-star-half-fill" style="color: #fbbf24;"></i>';
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="ri-star-line" style="color: #fbbf24;"></i>';
    }
    
    return starsHtml;
}

function getBlockNameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('block');
}

function showFoodCourts(blockName) {
    fetch('get_foodcourts_ratings.php')
        .then(response => response.json())
        .then(ratingsData => {
            if (ratingsData.status === 'success') {
                return fetch('foodCourts.json')
                    .then(response => response.json())
                    .then(data => ({ ratingsData, foodCourtsData: data }));
            }
            throw new Error('Failed to fetch ratings');
        })
        .then(({ ratingsData, foodCourtsData }) => {
            const mainContent = document.querySelector('.container.mx-auto.max-w-7xl');
            const blockFoodCourts = foodCourtsData[blockName] || [];
            
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'content-wrapper';
            contentWrapper.innerHTML = `
                <a href="explore.html" class="back-button">
                    <i class="ri-arrow-left-line"></i>
                    Back to Blocks
                </a>
                <div class="page-header">
                    <h1 class="section-title">Food Courts</h1>
                    <p class="section-subtitle">in ${blockName}</p>
                </div>
                <div class="food-courts-grid"></div>
            `;
            
            const foodCourtsGrid = contentWrapper.querySelector('.food-courts-grid');
            
            // Create and append each food court card
            blockFoodCourts.forEach(foodCourt => {
                const rating = ratingsData.ratings[foodCourt.id] || {
                    rating: 0,
                    reviewCount: 0,
                    totalDishes: 0,
                    dishesWithReviews: 0
                };
                
                const card = document.createElement('div');
                card.className = 'food-court-card';
                card.setAttribute('data-food-court-id', foodCourt.id);
                
                card.innerHTML = `
                    <div class="card-image">
                        <img src="${foodCourt.image}" alt="Food Court" class="food-court-image">
                    </div>
                    <div class="food-court-content">
                        <div class="food-court-header">
                            <h2 class="food-court-name">${foodCourt.name}</h2>
                            <div class="speciality-badge">
                                <i class="ri-award-fill"></i>
                                <span>${foodCourt.speciality}</span>
                            </div>
                        </div>
                        
                        <div class="cuisines">
                            ${foodCourt.cuisines.map(cuisine => `<span class="cuisine-tag">${cuisine}</span>`).join('')}
                        </div>

                        <div class="rating-info" title="Average rating: ${rating.rating.toFixed(1)}\nTotal reviews: ${rating.reviewCount}\nDishes with reviews: ${rating.dishesWithReviews}\nTotal dishes: ${rating.totalDishes}">
                            <div class="stars">
                                ${generateStars(rating.rating)}
                            </div>
                            <span class="rating-number">${rating.rating.toFixed(1)}</span>
                            <span class="review-count">(${rating.reviewCount} ${rating.reviewCount === 1 ? 'review' : 'reviews'})</span>
                        </div>

                        <div class="button-container">
                            <button class="view-menu-btn" onclick="window.location.href='dishes.html?block=${blockName}&foodCourtId=${foodCourt.id}'">
                                <span>View Menu</span>
                                <i class="ri-arrow-right-line"></i>
                            </button>
                        </div>
                    </div>
                `;
                
                foodCourtsGrid.appendChild(card);
            });
            
            mainContent.innerHTML = '';
            mainContent.appendChild(contentWrapper);
        })
}
 