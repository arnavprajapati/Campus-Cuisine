function createBlockCard(block) {
    return `
        <div class="block-card ${block.gradientClass}">
            <div class="block-content">
                <div class="block-header">
                    <i class="${block.icon} block-icon"></i>
                    <h3 class="block-title">${block.name}</h3>
                </div>
                <p class="block-description">${block.description}</p>
                <div class="block-info">
                    <div class="info-item">
                        <i class="ri-store-2-line"></i>
                        <span>${block.foodCourts} Food Courts</span>
                    </div>
                    <div class="info-item">
                        <i class="ri-user-line"></i>
                        <span>${block.capacity}</span>
                    </div>
                </div>
                <button class="view-button" onclick="showBlockFoodCourts('${block.name}')">
                    View Food Courts
                    <i class="ri-arrow-right-line"></i>
                </button>
            </div>
        </div>
    `;
}

function showBlockFoodCourts(blockName) {
    window.location.href = `foodcourts.html?block=${encodeURIComponent(blockName)}`;
}

function showAllBlocks() {
    const blocksSection = document.querySelector('#blocks-section');
    blocksSection.classList.add('remove');
    
    fetch('blocks.json')
        .then(response => response.json())
        .then(data => {
            setTimeout(() => {
                blocksSection.innerHTML = `
                    <a href="index.html" class="back-button">
                        <i class="ri-arrow-left-line"></i>
                        Back to Home
                    </a>
                    <h2 class="blocks-title">Blocks & Areas</h2>
                    <div class="blocks-grid">
                        ${Object.values(data).map(block => createBlockCard(block)).join('')}
                    </div>
                `;
                blocksSection.classList.remove('remove');
            }, 300);
        });
}

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
            <div>
                <div class="top-navigation">
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
                </div>
            </div>
            <div class="container mx-auto max-w-7xl">
                <div id="blocks-section">
                
                </div>
            </div>
        </div>
    `;
    
    root.innerHTML = structure;

    fetch('blocks.json')
        .then(response => response.json())
        .then(data => {
            const blocksSection = document.getElementById('blocks-section');
            blocksSection.innerHTML = `
                <h2 class="blocks-title">Blocks & Areas</h2>
                <div class="blocks-grid">
                    ${Object.values(data).map(block => createBlockCard(block)).join('')}
                </div>
            `;
        })
}); 

document.addEventListener("DOMContentLoaded", function () {
    fetch("get_user.php")
        .then(response => response.json())
        .then(data => {
            document.getElementById("usernames").textContent = data.username;
        })
        .catch(error => console.error("Error fetching username:", error));
});

document.addEventListener('DOMContentLoaded', () => {
    const profileView = document.querySelector('.profile-view');

    profileView.innerHTML = `
        <div class="username">
            <h3>Username</h3>
            <p id="usernames"> <?php echo $_SESSION['username']; ?> </p>
        </div>
        <div class="detail">
            
            <a class="data logout" href="logout.php">  
                <i class="ri-logout-box-r-line"></i>
                <p>Logout</p>
            </a>
        </div>
    `;
})


