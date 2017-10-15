function createPaintApp(parent) {
  var canvas = createEl('canvas', {width: 500, height: 300});
  var cx = canvas.getContext('2d');
  var toolbar = createEl('div', {class: 'toolbar'});
  
  for (var name in controls)
    toolbar.appendChild(controls[name](cx));
  
  var panel = createEl('div', {class: 'picturepanel'}, canvas);
  parent.appendChild(createEl('div', null, panel, toolbar));
}



function createEl(name, attributes) {
  var node = document.createElement(name);
  if (attributes) {
    for (var attr in attributes)
      if (attributes.hasOwnProperty(attr))
        node.setAttribute(attr, attributes[attr]);
  }
  for (var i = 2; i < arguments.length; i++) {
    var child = arguments[i];
    
    
    if (typeof child == 'string')
      child = document.createTextNode(child);
    node.appendChild(child);
  }
  return node;
}


function relativePos(event, element) {
  var rect = element.getBoundingClientRect();
  var xPos = Math.floor(event.clientX - rect.left);
  var yPos = Math.floor(event.clientY - rect.top);
  return {x: xPos, y: yPos};
}


function trackMouseDrag(onMove, onEnd) {
  function end(event) {
    removeEventListener('mousemove', onMove);
    removeEventListener('mouseup', end);
    if (onEnd)
      onEnd(event);
  }
  addEventListener('mousemove', onMove);
  addEventListener('mouseup', end);
}



var controls = Object.create(null);

controls.tool = function(cx) {
  var select = createEl('select');
  

  for (var name in tools)
    select.appendChild(createEl('option', null, name));
  
  
  cx.canvas.addEventListener('mousedown', function(event) {
    
    if (event.which == 1) {
      
     
      tools[select.value](event, cx);
      
      event.preventDefault();
    }
  });
  
  return createEl('span', null, 'Tool: ', select);
};

controls.color = function(cx) {
  var input = createEl('input', {type: 'color'});
  
  
  input.addEventListener('change', function() {
    cx.fillStyle = input.value;
    cx.strokeStyle = input.value;
  });
  return createEl('span', null, 'Color: ', input);
};

controls.brushSize = function(cx) {
  var select = createEl('select');
  var sizes = [1, 2, 3, 5, 10];
  
  
  sizes.forEach(function(size) {
    select.appendChild(createEl('option', {value: size}, size + ' pixels'));
  });
  
  
  select.addEventListener('change', function() {
    cx.lineWidth = select.value;
  });
  return createEl('span', null, 'Brush size: ', select);
};


var tools = Object.create(null);


tools.Pencil = function(event, cx, onEnd) {
  cx.lineCap = 'round';
  
  
  var pos = relativePos(event, cx.canvas);
  trackMouseDrag(function(event) {
    cx.beginPath();
    
    cx.moveTo(pos.x, pos.y);
    
    pos = relativePos(event, cx.canvas);
    
    cx.lineTo(pos.x, pos.y);
    cx.stroke();
  }, onEnd);
};

tools.Erase = function(event, cx) {
  
  cx.globalCompositeOperation = 'destination-out';

  tools.Pencil(event, cx, function() {
    cx.globalCompositeOperation = 'source-over';
  });
};



tools.Rectangle = function(event, cx) {
  var leftX, rightX, topY, bottomY
  var clientX = event.clientX,
      clientY = event.clientY;
  
  var initialPos = relativePos(event, cx.canvas);
  
  
  var xOffset = clientX - initialPos.x,
      yOffset = clientY - initialPos.y;
  
  trackMouseDrag(function(event) {

    var currentPos = relativePos(event, cx.canvas);
    var startX = initialPos.x,
        startY = initialPos.y;
    
    
    if (startX < currentPos.x) {
      leftX = startX;
      rightX = currentPos.x;
    } else {
      leftX = currentPos.x;
      rightX = startX;
    }

    if (startY < currentPos.y) {
      topY = startY;
      bottomY = currentPos.y;
    } else {
      topY = currentPos.y;
      bottomY = startY;
    }
  
    placeholder.style.background = cx.fillStyle;
    
    placeholder.style.left = leftX + xOffset + 'px';
    placeholder.style.top = topY + yOffset + 'px';
    placeholder.style.width = rightX - leftX + 'px';
    placeholder.style.height = bottomY - topY + 'px'; 
  }, function() {
    
    cx.fillRect(leftX, topY, rightX - leftX, bottomY - topY);

  });
};



var appDiv = document.querySelector('#paintCanvas');

createPaintApp(appDiv);

