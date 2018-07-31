// document.getElementById("reps-1").addEventListener("click", btnGroupSelected(1));
// document.getElementById("reps-2").addEventListener("click", btnGroupSelected(2));
// document.getElementById("reps-3").addEventListener("click", btnGroupSelected(3));
// document.getElementById("reps-4").addEventListener("click", btnGroupSelected(4));
// document.getElementById("reps-5").addEventListener("click", btnGroupSelected(5));

function btnGroupSelected(num){
  checkOtherOptions();
  document.getElementById('reps-count').value = num;
  document.getElementById('reps-' + num).classList.remove('btn-outline-secondary');
  document.getElementById('reps-' + num).classList.add('btn-success');
}

function checkOtherOptions(){
  var btnIds = ['reps-1', 'reps-2', 'reps-3', 'reps-4', 'reps-5'];
  var i = 0;
  for(i = 0; i < btnIds.length; i++){
    if(document.getElementById(btnIds[i]).classList.contains('btn-success')){
      document.getElementById(btnIds[i]).classList.remove('btn-success');
      document.getElementById(btnIds[i]).classList.add('btn-outline-secondary');
    }
  }
}
