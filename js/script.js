
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
  //Gird : class wrapper, 
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

return;


  // Review photo
  for (var i = 0; i < 3; i++) {
    var reviewPhoto = document.createElement('div');
    var content_photo = document.createElement('img');
    var link = document.createElement('a');
    
    content_photo.setAttribute("src", place.reviews[i].profile_photo_url);
    content_photo.setAttribute("class", "review-photo");
    link.setAttribute("href", place.reviews[i].author_url);
    link.appendChild(content_photo);
    reviewPhoto.appendChild(link);
    column.appendChild(reviewPhoto);
  }

  // Review author
  for (var i = 0; i < 3; i++) {
    var authorReview = document.createElement('div');
    authorReview.setAttribute("class", "all-authors");

    var author_name = document.createElement('div');
    author_name.innerHTML = place.reviews[i].author_name;
    column.appendChild(author_name);
    author_name.setAttribute("class", "review-author");
  }

  // Review comment
    for (var i = 0; i < 3; i++) {
      var placeReview = document.createElement('div');
      placeReview.setAttribute("class", "all-reviews");

      var author_review = document.createElement('div');
      author_review.innerHTML = place.reviews[i].text;
      column.appendChild(author_review);

      author_review.setAttribute("class", "revoew-text");
    }
  






  
  
  // Opening hours
  // // Get DIV element to display opening hours
  // var opening_hours_div = document.getElementById("opening-hours");                
  // // Loop through opening hours weekday text
  // for (var i = 0; i < place.opening_hours.weekday_text.length; i++) {
  // // Create DIV element and append to opening_hours_div
  // var content = document.createElement('div');
  // content.innerHTML = place.opening_hours.weekday_text[i];
  // opening_hours_div.appendChild(content);
  // }
  
  // Reviews: name, photo        
  var reviews_aut = document.getElementById("review-author"); //  id elem from html
  var author_pho = document.getElementById("author-photo");
  // console.log(place.reviews[0].author_name);
  
  for (var i = 0; i < place.reviews.length; i++) { // loop through reviews array
    
    var content = document.createElement('div'); //create div
    content.innerHTML = place.reviews[i].author_name;
    reviews_aut.appendChild(content); // append info to div elem from html
    
    var content_photo = document.createElement('img');
    var link = document.createElement('a');
    content_photo.setAttribute("src", place.reviews[i].profile_photo_url);
    link.setAttribute("href", place.reviews[i].author_url);
    link.appendChild(content_photo);
    author_pho.appendChild(link);
    
  }
  
  
  
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
    'Place ID: ' + place.place_id + '<br>' +
    place.formatted_address + '</div>');
    infowindow.open(map, this);
  });
  // console.log(place.reviews);
}

function getPlaceDetails(placeId) {
  service.getDetails({
    placeId: placeId, // from PlaceID Finder
  }, function(place, status) {
    generatePlace(place);
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
    'ChIJD2bPdVcDdkgRuUSgnOXnKDE',
    'ChIJPcmKgaYDdkgRdx_55JaHct0',
    'ChIJZ7w_t3oCdkgRkg9mdejtZfM',
    'ChIJq4CUD8wEdkgRUVzqNNB1E30',
    'ChIJq4CUD8wEdkgRUVzqNNB1E30',
    'ChIJq4CUD8wEdkgRUVzqNNB1E30'
  ];

  for (var pos = 0; pos < placeIds.length; ++pos) {
    getPlaceDetails(placeIds[pos]);
  }
  
  return;

  service.getDetails({
    placeId: 'ChIJ718D3dIEdkgRoNucDQfv4Es' // from PlaceID Finder
  }, function(place, status) {
    // TODO: should move this in the function above
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // Create marker
      
      generatePlace(place);
      
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      // Center map on place location
      map.setCenter(place.geometry.location);
      console.log(place);
      
      // // Place name
      // var name_place = document.getElementsByClassName("place-name")[0];
      // var content = document.createElement('div');
      // content.innerHTML = place.name;
      // name_place.appendChild(content);
      
      // // Raiting
      // var rating_place = document.getElementById("rating-place-id");
      // var content = document.createElement('div');
      // content.innerHTML = place.rating;
      // rating_place.appendChild(content);
      
      
      // Opening hours
      // // Get DIV element to display opening hours
      // var opening_hours_div = document.getElementById("opening-hours");                
      // // Loop through opening hours weekday text
      // for (var i = 0; i < place.opening_hours.weekday_text.length; i++) {
      // // Create DIV element and append to opening_hours_div
      // var content = document.createElement('div');
      // content.innerHTML = place.opening_hours.weekday_text[i];
      // opening_hours_div.appendChild(content);
      // }
      
      // Reviews: name, photo        
      var reviews_aut = document.getElementById("review-author"); //  id elem from html
      var author_pho = document.getElementById("author-photo");
      // console.log(place.reviews[0].author_name);
      
      for (var i = 0; i < place.reviews.length; i++) { // loop through reviews array
        
        var content = document.createElement('div'); //create div
        content.innerHTML = place.reviews[i].author_name;
        reviews_aut.appendChild(content); // append info to div elem from html
        
        var content_photo = document.createElement('img');
        var link = document.createElement('a');
        content_photo.setAttribute("src", place.reviews[i].profile_photo_url);
        link.setAttribute("href", place.reviews[i].author_url);
        link.appendChild(content_photo);
        author_pho.appendChild(link);
        
      }
      
      // ===== place photo ======
      if (place.photos !== 'undefined') {
        var photocontent = document.createElement('img');
        photocontent.setAttribute("src", place.photos[0].getUrl({'maxWidth':300, 'maxHeight':300}));
        
        var placephoto = document.getElementById('place-photo');
        placephoto.appendChild(photocontent);
      }
      else {
        // no photo jpg
      }
      // ====================
      
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        'Place ID: ' + place.place_id + '<br>' +
        place.formatted_address + '</div>');
        infowindow.open(map, this);
      });
      // console.log(place.reviews);
      
    }
  });
}
