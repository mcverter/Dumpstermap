var map;
L.mapbox.accessToken = 'pk.eyJ1IjoiZGViYWtlbCIsImEiOiJjMWVJWEdFIn0.WtaUd8Rh0rgHRiyEZNzSjQ';

// Handlebars
var hb_dumpster_popup_template = $("#dumpster_popup_template").html();
var hb_dumpster_popup = Handlebars.compile(hb_dumpster_popup_template);

var hb_dumpster_popup_comments_template = $("#dumpster_popup_comments_template").html();
var hb_dumpster_popup_comments = Handlebars.compile(hb_dumpster_popup_comments_template);

var dumpsters;
window.onload = loadMap();
function loadMap() {
    // Karte laden
    map = L.map('map').setView([48.2633321, 10.8405515], 13);
    L.mapbox.tileLayer('mapbox.light', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'debakel.in6i4ino',
        accessToken: 'pk.eyJ1IjoiZGViYWtlbCIsImEiOiJjMWVJWEdFIn0.WtaUd8Rh0rgHRiyEZNzSjQ'
    }).addTo(map);

    L.control.locate().addTo(map);


    // Märkte holen
    function onEachFeature(feature, layer) {
        var context = feature.properties;
        var html = hb_dumpster_popup(context);
        var popup = L.popup({minWidth: 333}).setContent(html);
        layer.bindPopup(popup);
    }

    $.ajax({
        url: "/api/dumpster/all",
        cache: false
    })
        .done(function (response) {
            dumpsters = JSON.parse(response);
            L.geoJson(JSON.parse(response), {onEachFeature: onEachFeature}).addTo(map);
        });
}

// Api Calls
function send_vote(dumpster_id, voting, options) {
    $.ajax("/api/vote/" + dumpster_id + "/" + voting, options);
}
function send_comment(dumpster_id, name, comment, on_success) {
    $.post("/api/comments/add/" + dumpster_id,
        {'name': name, 'comment': comment},
        on_success
    );
}
function getDumpsterId() {
    return id = $("#dumpster_id").val();
}

// Register buttons
$(document).on('click', '.btn-vote', function () {
    send_vote(getDumpsterId(), $(this).attr('voting'),
        //Ajax options
        {
            // callback on success
            success: function (json) {
                //TODO: check result
                $(this).addClass('active');
                // count up
                var element = $(this).children("span[name=count]")
                var value = parseInt(element.text()) + 1;
                element.text(value);
            },
            context: $(this)
        }
    );
});
$(document).on('click', '#btn_comment', function (event) {
    event.preventDefault();
    var name = $("#txt_name").val();
    var comment = $("#txt_comment").val();
    var id = getDumpsterId();

    //update view
    var update_comments = function() {
        var comment = {'name': name, 'comment': comment, 'date': '?'};
        var html = hb_dumpster_popup_comments(comment);
        $(html).hide().appendTo("#comment_list").fadeIn(500);
    };

    send_comment(id, name, comment, update_comments);


});
