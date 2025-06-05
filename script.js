const allImages = [
    'aw/aw1.gif', 'aw/aw2.gif', 'aw/aw3.gif',
    'aw/aw4.gif', 'aw/aw5.gif', 'aw/aw6.gif',
    'aw/aw7.gif', 'aw/aw8.gif', 'aw/aw9.gif',
    'aw/aw10.gif', 'aw/aw11.gif', 'aw/aw12.gif',
    'aw/aw13.gif', 'aw/aw14.gif', 'aw/aw15.gif',
    'aw/aw16.gif'
];

const COLUMN_COUNT = 3;

// Fisher-Yates shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Helper to get image aspect ratios
function getImageRatios(imagePaths) {
    return Promise.all(imagePaths.map(path => {
        return new Promise(resolve => {
            const img = new window.Image();
            img.onload = function () {
                resolve({ path, ratio: img.width / img.height });
            };
            img.onerror = function () {
                // Default to square if error
                resolve({ path, ratio: 1 });
            };
            img.src = path;
        });
    }));
}

// Distribute images into columns, only one vertical per column
// ...existing code...
function distributeImages(imagesWithRatios, columnCount) {
    const columns = Array.from({ length: columnCount }, () => []);
    const verticals = imagesWithRatios.filter(img => img.ratio < 0.9); // portrait
    let others = imagesWithRatios.filter(img => img.ratio >= 0.9);

    // Distribute the non-vertical images first
    let col = 0;
    others.forEach(img => {
        columns[col].push(img.path);
        col = (col + 1) % columnCount;
    });

    // Shuffle column indices for random placement of verticals
    const colIndices = Array.from({ length: columnCount }, (_, i) => i);
    shuffleArray(colIndices);

    // Place one vertical in each random column (if available), at a random row
    verticals.forEach((img, i) => {
        const colIdx = colIndices[i % columnCount];
        const insertIdx = Math.floor(Math.random() * (columns[colIdx].length + 1));
        columns[colIdx].splice(insertIdx, 0, img.path);
    });

    // Ensure columns without a vertical have 5 images (if possible)
    columns.forEach((colArr, idx) => {
        // Check if this column has a vertical image
        const hasVertical = colArr.some(path => {
            const imgObj = imagesWithRatios.find(img => img.path === path);
            return imgObj && imgObj.ratio < 0.9;
        });
        // If no vertical and less than 5 images, add more from others
        while (!hasVertical && colArr.length < 5 && others.length > 0) {
            // Find an image not already in this column
            const nextImg = others.find(img => !colArr.includes(img.path));
            if (nextImg) {
                colArr.push(nextImg.path);
                // Remove from others to avoid duplicates
                others = others.filter(img => img.path !== nextImg.path);
            } else {
                break;
            }
        }
    });

    return columns;
}


// Populate the gallery with columns
function populateGalleryMasonry(columns) {
    const gallery = document.getElementById('imageGallery');
    gallery.innerHTML = '';
    gallery.style.display = 'grid';
    gallery.style.gridTemplateColumns = `repeat(${columns.length}, 1fr)`;
    gallery.style.gap = '45px'; // Adjust gap as needed

    // Create column containers
    columns.forEach(colImages => {
        const colDiv = document.createElement('div');
        colDiv.style.display = 'flex';
        colDiv.style.flexDirection = 'column';
        colImages.forEach(imagePath => {
            const img = document.createElement('img');
            img.src = imagePath;
            img.alt = 'Gallery Image';
            img.style.width = '100%';
            img.style.marginBottom = '30px';
            colDiv.appendChild(img);
        });
        gallery.appendChild(colDiv);
    });
}

// Main function
document.addEventListener('DOMContentLoaded', async function () {
    shuffleArray(allImages);
    const imagesWithRatios = await getImageRatios(allImages);
    const columns = distributeImages(imagesWithRatios, COLUMN_COUNT);
    populateGalleryMasonry(columns);
});

/* ...existing code for top button, smooth scroll, and form submission... */


//Top button disappears when at the top of the page
window.addEventListener('scroll', function () {
    const topBtn = document.getElementById('topBtn');
    if (window.scrollY === 0) {
        topBtn.style.display = 'none';
    } else {
        topBtn.style.display = '';
    }
});
// Hide on load if already at top
document.addEventListener('DOMContentLoaded', function () {
    const topBtn = document.getElementById('topBtn');
    if (window.scrollY === 0) {
        topBtn.style.display = 'none';
    }
});

// Smooth scroll with ease-out for bottom-bar links
document.addEventListener('DOMContentLoaded', function () {
    const topBtn = document.getElementById('topBtn');
    const contactBtn = document.querySelector('.bottom-bar a[href="#section3"]');

    if (topBtn) {
        topBtn.addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('section1').scrollIntoView({ behavior: 'smooth' });
        });
    }
    if (contactBtn) {
        contactBtn.addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('section3').scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// Initial gallery setup
document.addEventListener('DOMContentLoaded', populateGallery);


// Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    var formData = new FormData(event.target);
    var name = formData.get('name') + ' ';
    var email = formData.get('email');
    var message = formData.get('message');

    // Construct the mailto URL with form data as subject
    var subject = encodeURIComponent('New Mail from ' + name + 'via azwaryoga.com');
    var mailtoUrl = 'mailto:azwaryoga@live.com?subject=' + subject + '&body=' + encodeURIComponent(message);

    // Open the default email client with the mailto URL
    window.location.href = mailtoUrl;
}

// Add event listener to the form for submission
document.getElementById('contactForm').addEventListener('submit', handleFormSubmission);


