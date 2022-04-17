const imageContainer = document.getElementById("image-container")
const loader = document.getElementById("loader")

let photosArray = []

const count = 10
const apiKey = "YOUR_API_KEY"
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

const setAttributes = (element, attributtes) => {
	for (const key in attributtes) {
		element.setAttribute(key, attributtes[key])
	}
}

const displayPhotos = () => {
	photosArray.forEach(photo => {
		const item = document.createElement("a")
		setAttributes(item, {
			href: photo.links.html,
			target: "_blank",
		})
		const img = document.createElement("img")
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		})
		item.appendChild(img)
		imageContainer.appendChild(item)
	})
}

async function getPhotos() {
	try {
		const response = await fetch(apiUrl)
		photosArray = await response.json()
		displayPhotos()
	} catch (error) {}
}

window.addEventListener("scroll", () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        getPhotos()
    }
})

getPhotos()
