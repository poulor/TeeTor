var lastSelectedRow;
var trs;
var isMouseDown = false;
var days = ["Sundays", "Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays"];

$(document).ready(function () {

  $('#contentTime').hide();

  $("#timeIcon").click(function () {
    $("#locationIcon").css("width", "80%");
    $("#calendarIcon").css("width", "80%");
    getCurrentTimePrefs();
    $("#sideBarLocs").css("display", "none");
    $("#sideBarRequest").css("display", "none");
    $("#timeIcon").css("width", "100%");

    if ($('#openclose').text() == '>') {
      openclose('time');
    } else {
      $("#sideBarTimes").css("display", "inherit");
      $("#notifBar").text("Time Preferences");
    }
  });
  $("#locationIcon").click(function () {
    getCurrentLocPrefs();
    $("#timeIcon").css("width", "80%");
    $("#calendarIcon").css("width", "80%");
    $("#locationIcon").css("width", "100%");
    $("#sideBarTimes").css("display", "none");
    $("#sideBarRequest").css("display", "none");

    if ($('#openclose').text() == '>') {
      openclose('loc');
    } else {
      $("#sideBarLocs").css("display", "inherit");
      $("#notifBar").text("Location Preferences");
    }
  });
  $("#calendarIcon").click(function () {
    getMeetingReccs();
    $("#locationIcon").css("width", "80%");
    $("#timeIcon").css("width", "80%");
    $("#calendarIcon").css("width", "100%");
    $("#sideBarTimes").css("display", "none");
    $("#sideBarLocs").css("display", "none");
    if ($('#openclose').text() == '>') {
      openclose('cal');
    } else {
      $("#sideBarRequest").css("display", "inherit");
      $("#notifBar").text("Meetings");
    }
  });

function RowClick(currenttr, lock) {

  if (window.event.ctrlKey) {
    toggleRow(currenttr);
    isMouseDown = true;
  }

  if (window.event.button === 0) {
    if (!window.event.ctrlKey && !window.event.shiftKey) {
      if (currenttr.className == 'selected') {
        clearAll();
      } else {
        clearAll();
        toggleRow(currenttr);
      }
      isMouseDown = true;
    }

    if (window.event.shiftKey) {
      selectRowsBetweenIndexes([lastSelectedRow.rowIndex, currenttr.rowIndex])
    }
  }
}

function RowOver(e, lock) {
  if (isMouseDown) {
    toggleRow(e);
  }
}

function MouseUp(e, lock) {
  isMouseDown = false;
}

function toggleRow(row) {
  row.className = row.className == 'selected' ? '' : 'selected';
  lastSelectedRow = row;
}

function selectRowsBetweenIndexes(indexes) {
  indexes.sort(function (a, b) {
    return a - b;
  });

  for (var i = indexes[0]; i <= indexes[1]; i++) {
    trs[i - 1].className = 'selected';
  }
}

function clearAll() {
  for (var i = 0; i < trs.length; i++) {
    trs[i].className = '';
  }
}

function Tomorrow(e) {
  var string = $('#day').text();
  var index = getIndex(string);
  if (index == 6) {
    $('#day').text(days[0]);
  } else {
    $('#day').text(days[index + 1]);
  }
  $('#day').css("width", "50%");
  clearAll();
}

function Yesterday(e) {
  var string = $('#day').text();
  var index = getIndex(string);
  if (index == 0) {
    $('#day').text(days[6]);
  } else {
    $('#day').text(days[index - 1]);
  }
  $('#day').css("width", "50%");

  clearAll();
}

function getIndex(query) {
  var ret = 0;
  var i = 0;
  days.forEach(function (item) {
    if (item == query) {
      ret = i;
    }
    i++;
  });
  return ret;
}



function openclose(string) {
  var txt = $('#openclose').text();
  if (txt == '>') {
    // expand
    $('#openclose').css("margin-right", "2%");
    document.getElementById("mySidebar").style.width = "40%";
    $('#openclose').text('<');
    document.getElementById("main").style.marginLeft = "40%";
    setTimeout(function () {

      if (string == 'loc') {
        $("#sideBarLocs").css("display", "inherit");
        $("#notifBar").text("Location Preferences");
      } else if (string == 'cal') {
        $("#sideBarRequest").css("display", "inherit");
        $("#notifBar").text("Request a meeting");
      } else {
        $("#sideBarTimes").css("display", "inherit");
        $("#notifBar").text("Time Preferences");
        $("#timeIcon").css("width", "100%");

      }
      $('#notifBar').css("display", "inherit");
      $('#notifContainer').css("border", "1px solid black");

    }, 300);

  } else {
    $('#openclose').css("margin-right", "25%");
    document.getElementById("mySidebar").style.width = "5%";
    $('#openclose').text('>');
    document.getElementById("main").style.marginLeft = "5%";

    $("#sideBarTimes").css("display", "none");
    $("#sideBarLocs").css("display", "none");
    $("#sideBarRequest").css("display", "none");
    $('#notifBar').css("display", "none");
    $('#notifContainer').css("border", "none");

    $("#locationIcon").css("width", "80%");
    $("#timeIcon").css("width", "80%");
    $("#calendarIcon").css("width", "80%");



  }
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
