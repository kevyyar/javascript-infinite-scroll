//get elements from the DOM
const imageContainer = document.getElementById("image-container");

// Unsplash API
const IMAGE_COUNT = 30;
const API_KEY = "5X_PwkXcEMdf63iQ8MjQ_nu7eHkE6-SK24AMIutCk9M";
const API_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${IMAGE_COUNT}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
// store images in array
let photosArray = [];

// check if all images were loaded
function imageLoaded() {
	console.log("image loaded");
	imagesLoaded++;

	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
		console.log("ready = ", ready);
	}
}

// helper function to set Attributes to DOM elements img and a tag
function setAttributes(element, attributes) {
	// loop through data to set attribute to element
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}
// create and insert data into DOM elements
function renderPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	console.log("total images", totalImages);
	photosArray.forEach((photo) => {
		// create an <a></a> link tag
		const item = document.createElement("A");
		setAttributes(item, {
			href: photo.links.html,
			target: "_blank",
		});

		// create <img /> tag
		const image = document.createElement("IMG");
		setAttributes(image, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
		// event listener to check when each image is loaded
		image.addEventListener("load", imageLoaded());

		// append image inside anchor element
		item.appendChild(image);

		// append image element to parent container
		imageContainer.appendChild(item);
	});
}
// fetch images from API
const fetchPhotos = async () => {
	try {
		const response = await fetch(API_URL);
		photosArray = await response.json();
		renderPhotos();
	} catch (error) {
		alert("there was an error fetching images " + error);
	}
};

// check to see if scrolling near bottom of page; Load more photos
window.addEventListener("scroll", () => {
	if (
		window.innerHeight + window.scrollY >=
			document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		fetchPhotos();
	}
});
// On Load
fetchPhotos();
