var no = 0;
var stopPlay = 0;
var runTimes = 0;
var sec = 50;

function play() {
  no++;
  runTimes++;
  var options = $(".slotWrap .option");
  if (no >= options.length) {
    no = 0;
  }
  if (runTimes > stopPlay) {
    $(".light").css("animation-duration", "2s");
    var href = $("#letmeopen");
    $(href).fadeIn(250);
    $("#winPrizes").text($(".active span").text());
    $(href).children(".popup-box").removeClass("transform-out").addClass("transform-in");
    event.preventDefault();
  } else if (runTimes + 10 > stopPlay) {
    $(options[no])
      .addClass("active")
      .siblings()
      .removeClass("active");
    setTimeout(play, (sec = sec * 1.4));
  } else {
    $(options[no])
      .addClass("active")
      .siblings()
      .removeClass("active");
    setTimeout(play, sec);
    $(".light").css("animation-duration", ".3s");
  }
}

function init() {
  runTimes = 0;
  sec = 50;
  no = no - 1;
  $("button#start-draw").attr("disabled", false);
}

$("button#start-draw").click(function() {
  if (runTimes > 0) return;
  stopPlay = Math.floor(Math.random() * (20 - 0) + 20);
  $(this).attr("disabled", true);
  play();
});

// 新增選項的邏輯
$("#add-option").click(function() {
  var newOptionNumber = $(".slotWrap .option").length + 1;
  var newOption = $("<div></div>")
    .addClass("option no" + newOptionNumber)
    .html("<span>新選項</span>")
    .click(editOption);
  $(".slotWrap").append(newOption);
  scatterPositions(); // 重新隨機分佈選項
});

// 刪除選項的邏輯
$("#remove-option").click(function() {
  var options = $(".slotWrap .option");
  if (options.length > 1) {
    options.last().remove();
    scatterPositions(); // 重新隨機分佈選項
  }
});

// 修改選項內容的邏輯
function editOption() {
  var newText = prompt("請輸入新的選項內容:", $(this).children("span").text());
  if (newText) {
    $(this).children("span").text(newText);
  }
}

// 為現有的選項添加點擊事件
$(".slotWrap .option").click(editOption);

$(".popup-close").click(function() {
  init();
  $(".popup-wrap").fadeOut(200);
  $(".popup-box")
    .removeClass("transform-in")
    .addClass("transform-out");
  event.preventDefault();
});

function scatterPositions() {
  var options = document.querySelectorAll('.slotWrap .option');
  var slotWrap = document.querySelector('.slotWrap');
  var maxWidth = slotWrap.offsetWidth - 198; // 減去選項的寬度
  var maxHeight = slotWrap.offsetHeight - 92; // 減去選項的高度
  var positions = [];

  options.forEach(option => {
    var attempts = 0;
    var maxAttempts = 100; // 最大嘗試次數以避免無限循環
    var randomX, randomY, collision;

    do {
      collision = false;
      randomX = Math.floor(Math.random() * maxWidth);
      randomY = Math.floor(Math.random() * maxHeight);

      for (var i = 0; i < positions.length; i++) {
        var pos = positions[i];
        if (
          randomX < pos.x + 198 &&
          randomX + 198 > pos.x &&
          randomY < pos.y + 92 &&
          randomY + 92 > pos.y
        ) {
          collision = true;
          break;
        }
      }

      attempts++;
      if (attempts >= maxAttempts) {
        console.warn("位置隨機化達到最大嘗試次數，可能存在重疊");
        break;
      }
    } while (collision);

    positions.push({ x: randomX, y: randomY });
    option.style.left = randomX + 'px';
    option.style.top = randomY + 'px';
  });
}

// 在網頁加載完成後隨機分佈選項
window.onload = function() {
  scatterPositions();
};

// 在新增選項後重新隨機分佈選項
$("#add-option").click(function() {
  var newOptionNumber = $(".slotWrap .option").length + 1;
  var newOption = $("<div></div>")
    .addClass("option no" + newOptionNumber)
    .html("<span>新選項</span>")
    .click(editOption);
  $(".slotWrap").append(newOption);
  scatterPositions(); // 重新隨機分佈選項
});

// 在刪除選項後重新隨機分佈選項
$("#remove-option").click(function() {
  var options = $(".slotWrap .option");
  if (options.length > 1) {
    options.last().remove();
    scatterPositions(); // 重新隨機分佈選項
  }
});
