
      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.866, lng: 151.196},
          zoom: 15
        });

        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        

        service.getDetails({
          placeId: 'ChIJ718D3dIEdkgRoNucDQfv4Es' // from PlaceID Finder
        }, function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                // Create marker
                var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
                });
                // Center map on place location
                map.setCenter(place.geometry.location);
                console.log(place);
            
        // Place name
                var name_place = document.getElementById("name-place-id");
                var content = document.createElement('div');
                content.innerHTML = place.name;
                name_place.appendChild(content);
        // Raiting
                var rating_place = document.getElementById("rating-place-id");
                var content = document.createElement('div');
                content.innerHTML = place.rating;
                rating_place.appendChild(content);


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
 