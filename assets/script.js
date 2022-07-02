function firstCalendarHour() {
  var startOfDay = moment().startOf("day");
  return startOfDay.add(9, "hours");
}
function setAllColors() {
  var currentHour = firstCalendarHour();
  var rows = $(".bar-task input");

  for (var i = 0; i < rows.length; i++) {
    rows[i].classList.add(color(currentHour));
    currentHour = currentHour.add(1, "hour");
  }
}

function setTime() {
  var today = moment();
  $("#currentDay").text(today.format("dddd, MMMM Do, h:mm:ss a"));
  setAllColors();
}

setInterval(setTime, 1000);

// Write a function that given the date will
// tell you what class should be used to style
// e.g .future, .present, .past
function color(time) {
  let currentHr = moment().startOf("hour");
  if (time < currentHr) {
    return "past";
  } else if (time > currentHr) {
    return "future";
  } else {
    return "present";
  }
}

function loadTasks() {
  var currentHour = firstCalendarHour();
  var rows = $(".bar-task input");

  for (var i = 0; i < rows.length; i++) {
    var storageKey = "input" + (i + 1);
    var storedThing = localStorage[storageKey];
    if (storedThing) {
      rows[i].value = storedThing;
    }
    currentHour = currentHour.add(1, "hour");
  }
}

function storeTask(event) {
  var storageKey = event.srcElement.attributes.target.nodeValue;
  var selector = "#" + storageKey;
  var input = document.querySelector(selector);
  localStorage[storageKey] = input.value;
}

document.querySelectorAll(".saveBtn").forEach(function (button) {
  button.addEventListener("click", storeTask);
});

setTime();
loadTasks();
