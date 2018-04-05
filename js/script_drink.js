
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">


function generateRatingStar() {
  var starRating = document.createElement('img');
  starRating.setAttribute('src', 'img/star.png');
  starRating.setAttribute('class', 'rating-img');
  return starRating;
}

function generatePlace(place) {  
  // Find parent
  var contentDiv = document.getElementById("content");
  console.log(place);
  
  // Create column for place
  var column = document.createElement('div');
  column.setAttribute("class", "col-md-3 col");
  contentDiv.appendChild(column);  
  
  // Place name
  var placeName = document.createElement('div');
  placeName.innerHTML = place.name;
  placeName.setAttribute("class", "place-name");
  column.appendChild(placeName);
  
  // Place photo
  if (place.photos) {
    var photocontent = document.createElement('img');
    photocontent.setAttribute("src", place.photos[0].getUrl({'maxWidth':300, 'maxHeight':300}));
    photocontent.setAttribute("class", "place-photo");
    column.appendChild(photocontent);
  }
  
  // Star for rating
  var ratingSection = document.createElement('div');
  for (var i = 1; i <= place.rating; ++i) {
    var ratingStar = generateRatingStar();
    ratingSection.appendChild(ratingStar);
  }
  column.appendChild(ratingSection);
  
  // Raiting
  var placeRating = document.createElement('div');
  placeRating.innerHTML = place.rating;
  column.appendChild(placeRating);
  
  // Review
  var all_reviews = document.createElement('div');
  
  for (var i = 0; i < 5; i++) {
    var review = document.createElement('div');
    review.setAttribute("class", "wrapper");
    
    // Photo
    var reviewPhoto = document.createElement('div');
    reviewPhoto.setAttribute("class", "box grid-photo");
    var content_photo = document.createElement('img');
    var link = document.createElement('a');
    content_photo.setAttribute("src", place.reviews[i].profile_photo_url);
    content_photo.setAttribute("class", "review-photo");
    link.setAttribute("href", place.reviews[i].author_url);
    link.appendChild(content_photo);
    reviewPhoto.appendChild(link);
    
    review.appendChild(reviewPhoto);
    
    // Author
    var author_name = document.createElement('div');
    author_name.setAttribute("class", "box grid-name");
    author_name.innerHTML = place.reviews[i].author_name;
    
    review.appendChild(author_name);
    
    // Review
    var author_review = document.createElement('div');
    author_review.innerHTML = place.reviews[i].text;
    author_review.setAttribute("class", "box grid-review");
    
    review.appendChild(author_review);
    
    all_reviews.setAttribute("class", "all reviews");
    all_reviews.appendChild(review);
  }
  
  column.appendChild(all_reviews);
}


function getPlaceDetails(placeId) {
  service.getDetails({
    placeId: placeId, // from PlaceID Finder
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      generatePlace(place);
    }
  });
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.866, lng: 151.196},
    zoom: 15
  });
  
  var infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  
  var placeIds = [
    'ChIJORqCihYCdkgRn9b55OiEA6c',
    'ChIJNx7vk0IEdkgRc7UEHYoIzsU',
    'ChIJhXigkGgEdkgR0fIdmOFh2r8',
    'ChIJPYAoAPMDdkgR5jvPc54JA9M',
    'ChIJ6Zr2DqIEdkgRhVkq34baxiw',
    'ChIJAZ4eopUDdkgRHJ-GH5jufNA'
  ];
  
  for (var pos = 0; pos < placeIds.length; ++pos) {
    getPlaceDetails(placeIds[pos]);
  }
}
