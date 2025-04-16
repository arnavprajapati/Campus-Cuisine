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
                            <div class="nav-item">
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
                                <div style="width: 8px; height: 8px; background-color: #FF7043 ;border-radius: 50%;"></div>
                                <p>North Indian</p>
                            </div>
                            <div class="nav-item" onclick="showMaintenanceMessage()">
                                <div style="width: 8px; height: 8px; background-color: #43A047;border-radius: 50%;"></div>
                                <p>South Indian</p>
                            </div>
                            <div class="nav-item" onclick="showMaintenanceMessage()">
                                <div style="width: 8px; height: 8px; background-color: #D32F2F;border-radius: 50%;"></div>
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

    const { block, foodCourtId } = getParamsFromURL();
    if (block && foodCourtId) {
        showDishes(block, foodCourtId);
    } else {
        window.location.href = 'foodcourts.html';
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
            // <div class="data">
            //     <i class="ri-user-settings-line"></i>
            //     <p>My Profile</p>
            // </div>
            // <div class="data">
            //     <i class="ri-chat-1-fill"></i>
            //     <p>Your Experience</p>
            // </div>
            // <div class="data">
            //     <i class="ri-key-2-fill"></i>
            //     <p>Change Password</p>
            // </div>
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

function dishCard(dish) {
    // Always show the dish card with initial 0 rating if no reviews
    const rating = dish.rating || 0;
    const reviewCount = dish.reviewCount || 0;
    const hasReviews = reviewCount > 0;
    const displayRating = hasReviews ? parseFloat(rating).toFixed(1) : '0.0';
    const reviewText = hasReviews ? `${reviewCount} reviews` : 'No reviews yet';
    
    return `
        <div class="dish-card" data-dish-id="${dish.id}">
            <div class="dish-image-container">
                <img src="${dish.image}" alt="${dish.name}" class="dish-image">
            </div>
            <div class="dish-content">
                <div class="dish-header">
                    <h2 class="dish-name">${dish.name}</h2>
                    <div class="price">₹${dish.price}</div>
                </div>
                
                <p class="dish-description">${dish.description}</p>
                
                <div class="dish-footer">
                    <div class="dish-stats">
                        <div class="rating-display">
                            <i class="ri-star-fill" style="color: #fbbf24;"></i>
                            <span class="rating-text">${displayRating}</span>
                            <span class="review-count">${reviewText}</span>
                        </div>
                    </div>
                    <button class="rate-review-btn" onclick="openReviewModal('${dish.id}', '${dish.name}', '${dish.image}', ${rating})">
                        <i class="ri-edit-line"></i> Write Review
                    </button>
                </div>
            </div>
        </div>
    `;
}

function fetchDishReviews(dishId) {
    return fetch(`get_reviews.php?dishId=${dishId}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                return data.reviews;
            }
            return [];
        })
        .catch(error => {
            console.error('Error fetching reviews:', error);
            return [];
        });
}

function openReviewModal(dishId, dishName, dishImage, rating) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'reviewModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    // Initial modal structure
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <div class="dish-info">
                    <img src="${dishImage}" alt="${dishName}" class="modal-dish-image" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                    <div>
                        <h2 style="margin: 0; font-size: 1.5rem; color: #111827;">${dishName}</h2>
                    </div>
                </div>
                <span class="close" style="cursor: pointer; font-size: 24px;">&times;</span>
            </div>
            
            <div class="modal-body">
                <h3>Write your review</h3>
                <div class="rating-input">
                    <div class="stars">
                        ${[1, 2, 3, 4, 5].map(num => `
                            <i class="ri-star-line" data-rating="${num}" onclick="setRating(${num})" style="cursor: pointer; font-size: 24px; color: #fbbf24;"></i>
                        `).join('')}
                    </div>
                    <span class="rating-value">0</span>
                </div>
                
                <textarea id="reviewText" placeholder="Share your experience with this dish..." style="width: 100%; min-height: 100px; padding: 12px; border: 1px solid #e5e7eb; border-radius: 8px; margin: 10px 0;"></textarea>
                <button class="submit-review-btn" onclick="submitReview('${dishId}')" style="width: 100%; padding: 12px; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer;">Submit Review</button>

                <div class="reviews-section">
                    <h3>Customer Reviews</h3>
                    <div class="reviews-list">
                        <div class="loading-reviews">
                            <i class="ri-loader-4-line"></i> Loading reviews...
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => closeReviewModal();
    window.onclick = (event) => {
        if (event.target === modal) closeReviewModal();
    };
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeReviewModal();
    });

    // Fetch reviews from database
    fetch(`get_reviews.php?dishId=${dishId}`)
        .then(response => response.json())
        .then(data => {
            const reviewsList = modal.querySelector('.reviews-list');
            if (data.status === 'success' && data.reviews && data.reviews.length > 0) {
                const reviewsHtml = data.reviews.map(review => `
                    <div class="review-item" style="background: #f9fafb; border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
                        <div class="review-header" style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <span class="reviewer-name" style="font-weight: 600; color: #111827;">${review.username}</span>
                            <div class="review-rating" style="display: flex; gap: 0.25rem;">
                                ${generateStars(review.rating)}
                            </div>
                            <span class="review-date" style="color: #6b7280; font-size: 0.875rem; margin-left: auto;">
                                ${formatDate(review.date)}
                            </span>
                        </div>
                        <p class="review-text" style="margin: 0; color: #374151;">${review.review_text}</p>
                    </div>
                `).join('');
                reviewsList.innerHTML = reviewsHtml;
            } else {
                reviewsList.innerHTML = '<p class="no-reviews" style="text-align: center; color: #6b7280; padding: 1rem;">No reviews yet. Be the first to review!</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching reviews:', error);
            const reviewsList = modal.querySelector('.reviews-list');
            reviewsList.innerHTML = '<p class="error-message" style="text-align: center; color: #dc2626; padding: 1rem;">Error loading reviews. Please try again.</p>';
        });
}

function submitReview(dishId) {
    const ratingValue = document.querySelector('.rating-input').dataset.currentRating;
    const rating = parseInt(ratingValue);
    const reviewText = document.getElementById('reviewText').value;
    
    if (!rating || rating === 0) {
        const submitBtn = document.querySelector('.submit-review-btn');
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = `
            color: #dc3545;
            text-align: center;
            margin-top: 10px;
            font-size: 14px;
            padding: 8px;
            background: #f8d7da;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
        `;
        errorMsg.innerHTML = '<i class="ri-error-warning-line"></i> Please select a rating';
        submitBtn.parentNode.insertBefore(errorMsg, submitBtn.nextSibling);
        return;
    }
    
    if (!reviewText.trim()) {
        const submitBtn = document.querySelector('.submit-review-btn');
        const errorMsg = document.createElement('div');
        errorMsg.style.cssText = `
            color: #dc3545;
            text-align: center;
            margin-top: 10px;
            font-size: 14px;
            padding: 8px;
            background: #f8d7da;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
        `;
        errorMsg.innerHTML = '<i class="ri-error-warning-line"></i> Please write a review';
        submitBtn.parentNode.insertBefore(errorMsg, submitBtn.nextSibling);
        return;
    }

    // First check if user is logged in
    fetch('test_session.php')
    .then(response => response.json())
    .then(sessionData => {
        if (!sessionData.username) {
            window.location.href = 'login.php';
            return;
        }

        // If logged in, proceed with review submission
        const reviewData = {
            dishId: dishId,
            rating: rating,
            reviewText: reviewText.trim()
        };

        // Show loading state
        const submitBtn = document.querySelector('.submit-review-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="ri-loader-4-line"></i> Submitting...';
        submitBtn.style.opacity = '0.7';

        fetch('add_review.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Show success message
                submitBtn.innerHTML = '<i class="ri-check-line"></i> Review Submitted';
                submitBtn.style.backgroundColor = '#45a049';
                submitBtn.style.opacity = '1';
                
                // Add success message below the button
                const successMsg = document.createElement('div');
                successMsg.style.cssText = `
                    color: #45a049;
                    text-align: center;
                    margin-top: 10px;
                    font-size: 14px;
                    padding: 8px;
                    background: #e8f5e9;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                `;
                successMsg.innerHTML = '<i class="ri-check-line"></i> Review posted successfully';
                submitBtn.parentNode.insertBefore(successMsg, submitBtn.nextSibling);

                // Get the current food court ID from URL
                const urlParams = new URLSearchParams(window.location.search);
                const foodCourtId = urlParams.get('foodCourtId');

                // Fetch updated dish data from the database
                fetch(`get_dish_rating.php?dishId=${dishId}`)
                .then(response => response.json())
                .then(dishData => {
                    if (dishData.status === 'success') {
                        // Update the dish card with new rating
                        updateDishCardRating(dishId, dishData.rating, dishData.reviewCount);
                        
                        // Update the reviews list in the modal
                        fetch(`get_reviews.php?dishId=${dishId}`)
                            .then(response => response.json())
                            .then(reviewsData => {
                                if (reviewsData.status === 'success') {
                                    const reviewsList = document.querySelector('.reviews-list');
                                    updateReviewsList(reviewsData.reviews, reviewsList);
                                }
                            });
                    }
                })
                .catch(error => {
                    console.error('Error fetching updated dish data:', error);
                });

                // Close the modal after successful submission with a delay
                setTimeout(() => {
                    closeReviewModal();
                }, 1500);

                // Clear the form
                document.getElementById('reviewText').value = '';
                setRating(0);
            } else {
                // Show error in the modal
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Submit Review';
                submitBtn.style.opacity = '1';
                
                const errorMsg = document.createElement('div');
                errorMsg.style.cssText = `
                    color: #dc3545;
                    text-align: center;
                    margin-top: 10px;
                    font-size: 14px;
                    padding: 8px;
                    background: #f8d7da;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 5px;
                `;
                errorMsg.innerHTML = '<i class="ri-error-warning-line"></i> ' + (data.message || 'Error submitting review');
                submitBtn.parentNode.insertBefore(errorMsg, submitBtn.nextSibling);
            }
        })
        .catch(error => {
            console.error('Network error:', error);
            // Show network error in the modal
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Submit Review';
            submitBtn.style.opacity = '1';
            
            const errorMsg = document.createElement('div');
            errorMsg.style.cssText = `
                color: #dc3545;
                text-align: center;
                margin-top: 10px;
                font-size: 14px;
                padding: 8px;
                background: #f8d7da;
                border-radius: 6px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;
            `;
            errorMsg.innerHTML = '<i class="ri-error-warning-line"></i> Network error. Please try again.';
            submitBtn.parentNode.insertBefore(errorMsg, submitBtn.nextSibling);
        });
    })
    .catch(error => {
        console.error('Session check error:', error);
        window.location.href = 'login.php';
    });
}

function generateStars(rating) {
    return Array(5).fill('').map((_, index) => `
        <i class="ri-star-${index < rating ? 'fill' : 'line'}"></i>
    `).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else {
        return date.toLocaleDateString('en-US', { 
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

function closeReviewModal() {
    const modal = document.getElementById('reviewModal');
    if (modal) {
        modal.remove();
        // Re-enable body scrolling
        document.body.style.overflow = 'auto';
    }
}

function setRating(rating) {
    const stars = document.querySelectorAll('.stars i');
    const ratingValue = document.querySelector('.rating-value');
    
    stars.forEach((star, index) => {
        star.className = `ri-star-${index < rating ? 'fill' : 'line'}`;
    });
    
    ratingValue.textContent = rating;
    
    // Store the current rating
    document.querySelector('.rating-input').dataset.currentRating = rating;
    
    // Add hover effect to stars
    stars.forEach((star, index) => {
        star.addEventListener('mouseover', () => {
            stars.forEach((s, i) => {
                s.className = `ri-star-${i <= index ? 'fill' : 'line'}`;
            });
        });
        
        star.addEventListener('mouseout', () => {
            const currentRating = document.querySelector('.rating-input').dataset.currentRating || 0;
            stars.forEach((s, i) => {
                s.className = `ri-star-${i < currentRating ? 'fill' : 'line'}`;
            });
        });
    });
}

function updateReviewsList(reviews, reviewsList) {
    if (reviews && reviews.length > 0) {
        const reviewsHtml = reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <span class="reviewer-name">${review.username}</span>
                    <div class="review-rating">
                        ${generateStars(review.rating)}
                    </div>
                    <span class="review-date">${formatDate(review.date)}</span>
                </div>
                <p class="review-text">${review.review_text}</p>
            </div>
        `).join('');
        reviewsList.innerHTML = reviewsHtml;
        
        // Scroll to the latest review smoothly
        const latestReview = reviewsList.firstElementChild;
        if (latestReview) {
            latestReview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    } else {
        reviewsList.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to review!</p>';
    }
}

function getParamsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        block: urlParams.get('block'),
        foodCourtId: urlParams.get('foodCourtId')
    };
}

function showDishes(blockName, foodCourtId) {
    fetch('foodCourts.json')
        .then(response => response.json())
        .then(data => {
            const mainContent = document.querySelector('.container.mx-auto.max-w-7xl');
            const blockFoodCourts = data[blockName] || [];
            const foodCourt = blockFoodCourts.find(fc => fc.id === parseInt(foodCourtId));
            
            if (foodCourt) {
                mainContent.innerHTML = `
                    <div class="content-wrapper">
                        <a href="foodcourts.html?block=${blockName}" class="back-button">
                            <i class="ri-arrow-left-line"></i>
                            Back to Food Courts
                        </a>
                        <div class="page-header">
                            <h1 class="section-title">${foodCourt.name}</h1>
                            <p class="section-subtitle">Menu</p>
                        </div>
                        <div class="dishes-grid">
                            ${foodCourt.dishes.map(dish => dishCard(dish)).join('')}
                        </div>
                    </div>
                `;

                // After rendering, fetch actual ratings for each dish
                foodCourt.dishes.forEach(dish => {
                    fetch(`get_dish_rating.php?dishId=${dish.id}`)
                        .then(response => response.json())
                        .then(ratingData => {
                            if (ratingData.status === 'success') {
                                updateDishCardRating(dish.id, ratingData.rating, ratingData.reviewCount);
                            }
                        })
                        .catch(error => console.error('Error fetching dish rating:', error));
                });
            } else {
                window.location.href = 'foodcourts.html';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            window.location.href = 'foodcourts.html';
        });
}

function updateDishCardRating(dishId, rating, reviewCount) {
    const dishCard = document.querySelector(`[data-dish-id="${dishId}"]`);
    if (dishCard) {
        const ratingDisplay = dishCard.querySelector('.rating-display');
        const hasReviews = reviewCount > 0;
        const ratingText = hasReviews ? rating.toFixed(1) : '0.0';
        const reviewText = hasReviews ? `${reviewCount} reviews` : 'No reviews yet';
        
        ratingDisplay.innerHTML = `
            <i class="ri-star-fill" style="color: #fbbf24;"></i>
            <span class="rating-text">${ratingText}</span>
            <span class="review-count">${reviewText}</span>
        `;
    }
}