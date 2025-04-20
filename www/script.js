function showMaintenanceMessage() {
    alert("This feature is currently under maintenance. Please check back later!");
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `
        <div class="container">
            <div class="left-section">
                <div class="slider-card">
                    <div class="slide-number">1</div>
                    <div class="image-container">
                        <img src="./images/homePage/slider-img.png" alt="" class="slide-image">
                        <img src="./images/homePage/hot-3.png" alt="" class="slide-image">
                        <img src="./images/homePage/hot-1.png" alt="" class="slide-image">
                        <img src="./images/homePage/hot-2.png" alt="" class="slide-image">
                    </div>
                    <div class="arrow-container">
                        <img src="./images/homePage/arrow-left-long-line.svg" alt="" class="arrow-btn prev-btn">
                        <img src="./images/homePage/arrow-right-long-line.svg" alt="" class="arrow-btn next-btn">
                    </div>
                </div>
            </div>

            <div class="content-section">
                <div class="content-wrapper">
                    <div class="title">
                        <p>CAMPUS</p>
                        <p>CUISINE</p>
                    </div>
                    <div class="description">
                        <p>At LPU, our food courts are the heart of campus dining With our new Food Court Review System, you can share your feedback, rate your favorite dishes, and help us improve the dining experience for everyone. Join the community, leave a review, and let's make campus dining even better!</p>
                    </div>
                    <div class="btn">
                        <a class="explore-btn" id="btn1" href="signup.php">Explore Now</a>
                        <a class="explore-btn" id="btn2" onclick="showMaintenanceMessage()">Contact Us</a>
                    </div>
                </div>
            </div>

            <div class="right-section">
                <div class="menu-icon">
                    <i class="ri-menu-line"></i>
                </div>
                <div class="vertical-text">
                    ${['C', 'A', 'M', 'P', 'U', 'S', '', 'C', 'U', 'I', 'S', 'I', 'N', 'E']
            .map(letter => `<div>${letter}</div>`).join('')}
                </div>
                <div></div>
            </div>
        </div>

        <div class="part-2">
            <div class="about">
                <div class="abt-content">
                    <div class="heading">
                        <div class="head">Explore</div>
                        <div class="head">Our</div>
                        <div class="head">Dishes</div>
                        <div class="dash"></div>
                    </div>
                    <div class="para">
                        <p>From spicy North Indian curries to tangy South Indian dosas, crispy Chinese noodles to cheesy
                            pizzas, our college food courts have something for everyone! Whether you're craving a quick
                            snack between classes our diverse menu options are prepared fresh daily to satisfy your taste
                            buds. Check out reviews from fellow students to find the best dishes on campus!</p>
                    </div>
                    <div>
                        <a class="explore-btn" id="btn1" onclick="showMaintenanceMessage()">Read More</a>
                    </div>
                </div>
                <div class="abt-img">
                    <img src="./images/homePage/about-img.jpg" alt="">
                </div>
            </div>
            <div class="explore">
                <div class="abt-img">
                    <img src="./images/homePage/pexels-ella-olsson-572949-1640777.jpg" alt="">
                </div>
                <div class="exp-content">
                    <div class="exp-heading">
                        <div class="head">About</div> 
                        <div class="head">Our</div>
                        <div class="head">Food</div>
                        <div class="head">Courts</div>
                        <div class="exp-dash"></div>
                    </div>
                    <div class="para">
                        <p>At LPU, our food courts are the heart of campus dining, offering a variety of cuisines to suit every palate. With our new Food Court Review System, you can share your feedback, rate your favorite dishes, and help us improve the dining experience for everyone. Join the community, leave a review, and let's make campus dining even better!</p>
                    </div>
                    <div>
                        <a class="explore-btn" id="btn1" onclick="showMaintenanceMessage()">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide-image');
    const slideNumber = document.querySelector('.slide-number');

    function showSlide(n) {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'next', 'prev');
            if (index === n) {
                slide.classList.add('active');
            } else if (index > n) {
                slide.classList.add('next');
            } else {
                slide.classList.add('prev');
            }
        });
        slideNumber.textContent = n + 1;
    }

    showSlide(currentSlide);

    document.querySelector('.next-btn').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    document.querySelector('.prev-btn').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });
});