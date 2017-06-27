(function() {
   function flipNear(tile) {
      var i = parseInt(tile.attr("id"));
      var gridSize = parseInt(sessionStorage.gridSize);
      if (i >= gridSize) {
         tileFlip($("#" + (i - gridSize)));
      }
      if (i <= gridSize * (gridSize - 1)) {
         tileFlip($("#" + (i + gridSize)));
      }
      if (i % gridSize > 0) {
         tileFlip($("#" + (i - 1)));
      }
      if ((i + 1) % gridSize != 0) {
         tileFlip($("#" + (i + 1)));
      }
   }

   function tileFlip(tile) {
      if(tile.hasClass("light-off")){
         tile.removeClass("light-off").addClass("light-on");
      } else {
         tile.removeClass("light-on").addClass("light-off");
      }
   }

   function tileClick() {
      sessionStorage.clickCount = parseInt(sessionStorage.clickCount) + 1;
      $("#clickCounter").text(sessionStorage.clickCount);
      tileFlip($(this));
      flipNear($(this));
      checkWin();
   }

   function checkWin() {
      var gridSize = parseInt(sessionStorage.gridSize);
      var state = $("#0").hasClass('light-on');
      for (var i = 0; i < gridSize * gridSize; i++) {
         if (state != $("#" + i).hasClass('light-on')) {
            return;
         }
      }
      $("#moves-count").text(sessionStorage.clickCount)
      $("#win-modal").modal('show').on('hidden.bs.modal', reset);
      $(".game-tile").addClass("disabled").off('click');
   }

   function initGrid(size) {
      var size = parseInt(size);
      sessionStorage.gridSize = size;
      var field = $("#gameField");
      field.html("");
      for (var i = 0; i < size; i++) {
         var div = $("<div></div>");
         for (var j = 0; j < size; j++) {
            var tile = $("<div></div>");
            tile.attr("id", (size * i + j).toString());
            tile.addClass("btn btn-lg game-tile");
            if (Math.random() >= 0.5) {
               tile.addClass("light-off");
            } else {
               tile.addClass("light-on");
            }
            tile.click(tileClick);
            div.append(tile);
         }
         field.append(div);
      }
   }

   function setDifficulty() {
      var diff = $(this).text();
      var gridSize = 4;
      switch (diff) {
         case "Easy":
            gridSize = 3;
            break;
         case "Hard":
            gridSize = 5;
            break;
         default:
            gridSize = 4;
      }
      sessionStorage.gridSize = gridSize;
      reset();
   }

   function reset() {
      $("#win-modal").hide();
      sessionStorage.clickCount = 0;
      $("#clickCounter").text("0");
      initGrid(sessionStorage.gridSize);
   }

   $("#resetBtn").click(reset);
   $(".diff-btn").click(setDifficulty);
   sessionStorage.gridSize = 4;
   reset();

   function debug() {
      $('.game-tile').removeClass('light-off').addClass('light-on');
      $("#0").removeClass('light-on').addClass('light-off');
      $("#1").removeClass('light-on').addClass('light-off');
      $("#" + parseInt(sessionStorage.gridSize)).removeClass('light-on').addClass('light-off');
   }
   $("#debug").click(debug);
})();