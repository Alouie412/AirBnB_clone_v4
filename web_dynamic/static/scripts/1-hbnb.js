$( document ).ready(function () {
  const amenityList = {};
  $('input[type="checkbox"]').click(function () {
    $(this).each(function () {
      if (this.checked === true) {
        amenityList[$(this).data('id')] = $(this).data('name');
      } else {
        delete amenityList[$(this).data('id')];
      }
    });

    console.log("Ohaithar");

    if (Object.values(amenityList).length > 0) {
      $('.amenities h4').text(Object.values(amenityList).join(', '));
    } else {
      $('.amenities h4').html('&nbsp');
    }
  });
});
