$(document).ready(function() {
  var token = 'C2IOXLYRS3CMI3IT35NA';
  var organizer = '6102108837';
  var $events = $('#events');

  $events.html('<i>Loading events...</i>');
  $.get(
    'https://www.eventbriteapi.com/v3/events/search/?token=' +
      token +
      '&organizer.id=' +
      organizer +
      '&expand=venue',
    function(res) {
      if (res.events.length) {
        var s = '';
        for (var i = 0; i < res.events.length; i++) {
          var event = res.events[i];

          //console.debug(event);

          var eventTime = moment(event.start.local).format('D MMM YYYY h:mm A');

          let address = event.venue.name;
          if (!!event.venue.address.localized_address_display) {
            address += ', ' + event.venue.address.localized_address_display;
          }

          let gAddress = address.replace(', ', '+');
          gAddress = gAddress.replace(' ', '+');

          let gmap =
            'https://www.google.com/maps/dir/?api=1&origin=' +
            event.venue.address.localized_address_display; // gAddress;

          s += "<section class='section static courses'>";
          s += "<div class='panel'>";
          s +=
            "<div class='course'><a href='" +
            event.url +
            "'>" +
            event.name.text +
            '</a></div>';
          s += "<div class='description'>";
          s +=
            '<p><b>Location: ' +
            address +
            "</b>&nbsp;&nbsp;&nbsp;<a href='" +
            gmap +
            "' target='_new'><img title='directions' src='img/map.png'></a><br/>";
          s += '<b>Date/Time: ' + eventTime + '</b></p>';
          // s += "<p>" + event.description.text + "</p>";
          s += event.description.html;
          s += '</div>';
          s += "<div class='price'></div>";
          s += "<div class='button'>";
          s +=
            "<button><a href='mailto:events@motorradcentral.com'>CONTACT US</a></button>";
          s += '</div>';
          s += "<div class='clear'></div>";
          s += '</section>';
        }
        $events.html(s);
      } else {
        $events.html('<p>Sorry, there are no upcoming events.</p>');
      }
    }
  );
});
