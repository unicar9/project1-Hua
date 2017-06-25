var distanceBtw = function(point1, point2) {
  return Math.sqrt(Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y), 2));
};

var angleBtw = function(point1, point2) {
  return Math.atan2(point2.x - point1.x, point2.y - point1.y);
};

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var color = randomColor();
var brushMode = 'basic';


$(document).ready(function() {

  $('.ui.dropdown')
  .dropdown(); //Initializing dropdown menu


  var $canvas = $("canvas");
  //Select the first, only canvas element. Select the actual HTML element using the array syntax [index], get the 2d context.
  var context = $canvas[0].getContext("2d");
  fillBackground();
  // var lastEvent;
  var isDrawing = false;

  var lastEvent;
  var lastPoint;
  var points = [];
  var radius = 15;
  context.lineJoin = context.lineCap = 'round';
  // context.fillStyle = "red";
  // context.strokeStyle = "grey";
  var $clear = $("#clear");
  var $save = $("#save");

  var clearCanvas = function() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  };

  $clear.click(function() {
    clearCanvas();
    fillBackground();
  }); // Clears the canvas

  function fillBackground() {
    var bgcolor = randomColor({hue: 'monochrome'});
    context.fillStyle = bgcolor;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  };


  $save.click(function() {
    window.location = canvas.toDataURL("image/png");
  }); // save the image to computer

  //===========================brush size & click functions=======================

  var $sm = $("#sm");
  var $md = $("#md");
  var $lg = $("#lg");
  var $brushSize = $("#brushSize");
  var size = 5; //default size

  $sm.click(function() {
    size = 5;
  });
  $md.click(function() {
    size = 15;
  });
  $lg.click(function() {
    size = 25;
  });

// ================================brush mode ======================
  var $basic = $("#basic");
  var $tube = $("#tube");
  var $circle = $("#circle");
// ================================brush mode ======================
  $basic.click(function() {
    brushMode = 'basic';
    clearCanvas();
    fillBackground();
    $brushSize.show();
  });
  $tube.click(function() {
    brushMode = 'tube';
    clearCanvas();
    fillBackground();
    $brushSize.hide();
  });
  $circle.click(function() {
    brushMode = 'circle';
    clearCanvas();
    fillBackground();
    $brushSize.hide();
  });


// ======================BASIC BRUSH==========================

  $canvas.mousedown(function(e) {

    if (brushMode !== "basic") {
      return;
    }

    lastEvent = e;
    isDrawing = true;

  }).mousemove(function(e) {

    if (brushMode !== "basic") {
      return;
    }

    if (isDrawing) {
        //Draw lines
        context.beginPath();
        context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
        context.lineTo(e.offsetX, e.offsetY);
        var color = randomColor({
                       luminosity: 'light',
                       format: 'hsla' // e.g. 'hsla(27, 88.99%, 81.83%, 0.6450211517512798)'
                    });
        context.strokeStyle = color;
        context.stroke();
        context.lineWidth = size;
        lastEvent = e;
    }
    }).mouseup(function() {
        isDrawing = false;
    }).mouseleave(function() {
        $canvas.mouseup();
    });



//  ===================== TUBE BRUSH ============================

    $canvas.mousedown(function(e) {
      if (brushMode !== "tube") {
        return;
      }
      isDrawing = true;
      lastPoint = {x: e.offsetX, y: e.offsetY};
      context.strokeStyle = randomColor({hue: 'blue'});
      context.fillStyle = randomColor({luminosity: 'light'});
      context.lineWidth = 1;
    }).mousemove(function(e) {
        if (brushMode !== "tube") {
          return;
        }

        if (isDrawing) {

          var currentPoint = {x: e.offsetX, y: e.offsetY};
          var dist = distanceBtw(lastPoint, currentPoint);
          var angle = angleBtw(lastPoint, currentPoint);

          for (var i = 0; i < dist; i+=5) {
            x = lastPoint.x + (Math.sin(angle) * i) - 25;
            y = lastPoint.y + (Math.cos(angle) * i) - 25;
            context.beginPath();
            // draw a circle
            context.arc(x+10, y+10, 20, false, Math.PI * 2, false);
            context.closePath();
            context.fill();
            context.stroke();
          }

          lastPoint = currentPoint;
        }

    }).mouseup(function() {
        isDrawing = false;
    }).mouseleave(function() {
        $canvas.mouseup();
    });

// ========================== CIRCLE BRUSH=======================

    $canvas.mousedown(function(e) {
      if (brushMode !== "circle") {
        return;
      }
      isDrawing = true;
      points.push({x: e.offsetX, y: e.offsetY, radius: getRandomInt(10, 30), opacity: Math.random()});
      // var color = randomColor();


    }).mousemove(function(e) {
      if (brushMode !== "circle") {
        return;
      }
      if (isDrawing) {

        points.push({x: e.offsetX, y: e.offsetY, radius: getRandomInt(10, 30), opacity: Math.random()});


        for (var i = 0; i < points.length; i++) {
          context.beginPath();

          // draw a circle
          context.arc(points[i].x, points[i].y, points[i].radius, false, Math.PI * 2, false);

          context.fillStyle = color;
          // debugger;
          context.fill();
          context.globalAlpha = points[i].opacity;
          // console.log(context.globalAlpha);

        }
      }

    }).mouseup(function() {
        isDrawing = false;
        points.length = 0;
        color = randomColor();
    }).mouseleave(function() {
        $canvas.mouseup();
    });

    // ============================UPLOAD IMAGE=====================================


    $('#new_post').submit(function () {

      var dataurl = canvas.toDataURL('image/png');
      $('#image').val( dataurl );

      console.log('GOT HERE');

    });


}); // end of .ready()
