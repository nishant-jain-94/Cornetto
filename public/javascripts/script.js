(function() {

  var addBoard = function(board) {
    console.log(board);
    $(".tc-page-board-section-list > .tc-page-board-section-list-item:last").prev().after('<div class="tc-page-board-section-list-item js-page-board-section-list-item"><a href=\'/b'+board._id+'\'>'+board.name+'</a></div>');
  };

  $('.js-tc-add-board').on('click',function(e) {
    var title = $("#js-tc-board-title").val();
    //clearing the title field so that it can be used next without clearing stuffs
    $("#js-tc-board-title").val('');
    $.post('/boards/create',{ title: title },function(data) {
      addBoard(data);
    });
  });

})();
