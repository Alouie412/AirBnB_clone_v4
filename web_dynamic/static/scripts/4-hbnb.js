$(document).ready(function () {
  const amenityList = {};
  $('input[type="checkbox"]').click(function () {
    $(this).each(function () {
      if (this.checked === true) {
        amenityList[$(this).data('id')] = $(this).data('name');
      } else {
        delete amenityList[$(this).data('id')];
      }
    });

    if (Object.values(amenityList).length > 0) {
      $('.amenities h4').text(Object.values(amenityList).join(', '));
    } else {
      $('.amenities h4').html('&nbsp');
    }
  });
});

$.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
  if (data.status === 'OK') {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').removeClass('available');
  }
});

$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  contentType: 'application/json',
  dataType: 'json',
  data: '{}',
  success: function (data) {
    let placeList;
    for (placeList of Object.values(data)) {
      // Find a better way to write this nightmare of a line. Maybe use Mustache.js for template
      $('section.places').append('<article><div class="title_box"><h2>' + placeList.name + '</h2></div>' + '<div class="price_by_night">' + placeList.price_by_night + '</div>' + '<div class="information">' + '<div class="max_guest">' + placeList.max_guest + ' Guest</div>' + '<div class="number_rooms">' + placeList.number_rooms + ' Bedroom</div>' + '<div class="number_bathrooms">' + placeList.number_bathrooms + ' Bathroom</div>' + '</div>' + '<div class="description">' + placeList.description + '</div></article>');
    }
  }
});

$('button').click(function () {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({ amenities: Object.keys(amenityList) }),
    success: function (data) {
      $('article').remove();
      let placeList;
      for (placeList of Object.values(data)) {
        // Find a better way to write this nightmare of a line. Maybe use Mustache.js for template
        $('section.places').append('<article><div class="title_box"><h2>' + placeList.name + '</h2></div>' + '<div class="price_by_night">' + placeList.price_by_night + '</div>' + '<div class="information">' + '<div class="max_guest">' + placeList.max_guest + ' Guest</div>' + '<div class="number_rooms">' + placeList.number_rooms + ' Bedroom</div>' + '<div class="number_bathrooms">' + placeList.number_bathrooms + ' Bathroom</div>' + '</div>' + '<div class="description">' + placeList.description + '</div></article>');
      }
    }
  });
});
