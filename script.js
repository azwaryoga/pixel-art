// Array of image paths
/*
const images = [
    'aw/aw1.gif', 'aw/aw2.gif', 'aw/aw3.gif',
    'aw/aw4.gif', 'aw/aw5.gif', 'aw/aw6.gif',
    'aw/aw7.gif', 'aw/aw8.gif', 'aw/aw9.gif',
];*/

// Shuffle function
// Array of image paths



const allImages = [
    'aw/aw1.gif', 'aw/aw2.gif', 'aw/aw3.gif',
    'aw/aw4.gif', 'aw/aw5.gif', 'aw/aw6.gif',
    'aw/aw7.gif', 'aw/aw8.gif', 'aw/aw9.gif',
    'aw/aw10.gif', 'aw/aw11.gif', 'aw/aw12.gif'
];

let displayedImages = [];

// Shuffle function
function shuffleImages() {
    const gallery = document.getElementById('imageGallery');
    displayedImages = allImages.slice(); // Make a copy of allImages
    for (let i = displayedImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [displayedImages[i], displayedImages[j]] = [displayedImages[j], displayedImages[i]];
    }
    updateGallery(gallery);
}

// Update gallery with shuffled images
function updateGallery(gallery) {
    gallery.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const img = document.createElement('img');
        const link = document.createElement('a');
        link.href = 'https://www.youtube.com/@azwaryoga/videos'; // Replace with your YouTube channel URL
        link.target = '_blank'; // Open link in a new tab
        link.rel = 'noopener noreferrer'; // Set rel attribute
        img.src = displayedImages[i];
        img.alt = 'Gallery Image';
        img.style.width = '100%'; // Set image width to 100% of its container
        img.style.height = 'auto'; // Maintain aspect ratio
        gallery.appendChild(link);
        link.appendChild(img); // Append img to link, not directly to gallery 
    }
}

// Initial gallery setup
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('imageGallery');
    shuffleImages();

// //send button
// document.querySelectorAll(".contactForm").forEach(form => {
//     form.addEventListener("submit", function(event) {
//         event.preventDefault(); // Prevent default form submission

//         // Get form data
//         var formData = new FormData(this);

//         // Send form data using fetch API
//         fetch("send_email.php", {
//             method: "POST",
//             body: formData
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             return response.text();
//         })
//         .then(data => {
//             alert("Email sent successfully!"); // Display success message
//             console.log(data); // Log response data to console (for debugging)
//             // You can optionally redirect the user to another page here
//         })
//         .catch(error => {
//             console.error("Error:", error); // Log any errors to console
//             alert("Failed to send email. Please try again."); // Display error message
//         });
//     });
// });

});

// Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get form data
    var formData = new FormData(event.target);
    var name = formData.get('name');
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
  
