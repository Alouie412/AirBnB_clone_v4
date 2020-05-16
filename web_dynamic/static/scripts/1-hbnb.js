$( document ).ready(function () {
  const amenityList = [];
  $('input[type="checkbox"]').click(function () {
    let x = document.getElementById("amenity.name")
    if (x.checked === true) {
      amenityList[$(this).data('id') = x
    } else {
      delete amenityList[$(this).data('id')];
    }

    if (Object.values(amenityList).length > 0 {
      $('.amenities h4').text(Object.values(amenityList));
    } else {
      $('.amenities h4').html('&nbsp');
    }
  });
});
