$('#card-populate').on('click', function(){
  $.get('ajax/exercise', function(data){
    $('#card-data').html(data);
  });
});




