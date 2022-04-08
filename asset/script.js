var phase;
window.dragMoveListener = dragMoveListener;
interact(".resize-drag")
  .resizable({
    edges: { left: true, right: true, bottom: true, top: true },
    listeners: {
      move (event) {
        var target = event.target
        var x = (parseFloat(target.getAttribute("data-x")) || 0)
        var y = (parseFloat(target.getAttribute("data-y")) || 0)
        target.style.width = event.rect.width + "px"
        target.style.height = event.rect.height + "px"
        x += event.deltaRect.left
        y += event.deltaRect.top
        target.style.transform = "translate(" + x + "px," + y + "px)"
        target.setAttribute("data-x", x)
        target.setAttribute("data-y", y)
      }
    },
    modifiers: [
      interact.modifiers.restrictEdges({
        outer: "parent"
      }),
      interact.modifiers.restrictSize({
        min: { width: 320, height: 180 }
      })
    ],
    inertia: true
  })
  .draggable({
    listeners: { move: window.dragMoveListener },
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: "parent",
        endOnly: true
      })
    ]
  })
function x() {
  document.getElementById("bg").style.display = "none";
}
function add() {
  document.getElementById("bg").style.display = "block";
  phase = "add";
}
function minus() {
  document.getElementById("bg").style.display = "block";
  phase = "minus";
}
function go() {
  if (document.getElementById("inp").value != "") {
    if (phase == "add") {
	  div = document.createElement("div");
	  div.id = "t-"+document.getElementById("inp").value;
	  div.innerHTML = "<iframe id='chat_embed' src='https://www.twitch.tv/embed/"+document.getElementById("inp").value+"/chat?parent="+location.hostname+"' frameborder='0'></iframe>";
	  document.getElementById("chat").appendChild(div);
	  div = document.createElement("div");
	  div.id = "v-"+document.getElementById("inp").value;
	  div.classList.add("resize-drag");
	  div.innerHTML = "<div class='tag'>"+document.getElementById("inp").value+"</div><iframe class='vid' src='https://player.twitch.tv/?channel="+document.getElementById("inp").value+"&parent="+location.hostname+"' frameborder='0'></iframe>";
	  document.getElementById("vid").appendChild(div);
	  document.getElementById("col").innerHTML += "<option id='o-"+document.getElementById("inp").value+"' value='"+document.getElementById("inp").value+"'>"+document.getElementById("inp").value+"</option>";
	  document.getElementById("inp").value = "";
	  document.getElementById("bg").style.display = "none";
    } else if (phase == "minus") {
      document.getElementById("t-"+document.getElementById("inp").value).remove();
	  document.getElementById("v-"+document.getElementById("inp").value).remove();
	  document.getElementById("o-"+document.getElementById("inp").value).remove();
	  document.getElementById("inp").value = "";
	  document.getElementById("bg").style.display = "none";
    }
  }
}
function chg(elm) {
  l = document.querySelectorAll("[id^=t-]");
  for (i=0; i<l.length; i+=1) {
    if (l[i].id == "t-"+elm.value) {
	  l[i].style.display = "block";
	} else {
	  l[i].style.display = "none";
	}
  }
}
function dragMoveListener (event) {
  var target = event.target
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy
  target.style.transform = "translate(" + x + "px, " + y + "px)"
  target.setAttribute("data-x", x)
  target.setAttribute("data-y", y)
}