
function btnGroupSelected(id, num, name){
  checkOtherOptions(id, name);
  document.getElementById(id + '-' + name).value = num;
  document.getElementById(id + '-' + name + '-' + num).classList.remove('btn-outline-secondary');
  document.getElementById(id + '-' + name + '-' + num).classList.add('btn-success');
}

function checkOtherOptions(id, name){
  var btnIds = [id + '-' + name + '-1', id + '-' + name + '-2', id + '-' + name + '-3', id + '-' + name + '-4', id + '-' + name + '-5'];
  var i = 0;
  for(i = 0; i < btnIds.length; i++){
    if(document.getElementById(btnIds[i]).classList.contains('btn-success')){
      document.getElementById(btnIds[i]).classList.remove('btn-success');
      document.getElementById(btnIds[i]).classList.add('btn-outline-secondary');
    }
  }
}

function toggleBtn(id, num, data, name){
  var btnIds = [id + '-' + name + '-1', id + '-' + name + '-2'];
  document.getElementById(id + '-' + name).value = data;
  var i = 0;
  for(i = 0; i < btnIds.length; i++){
    if(document.getElementById(btnIds[i]).classList.contains('btn-info')){
      document.getElementById(btnIds[i]).classList.remove('btn-info');
      document.getElementById(btnIds[i]).classList.add('btn-secondary');
    }
  }
  document.getElementById(id + '-' + name + '-' + num).classList.remove('btn-secondary');
  document.getElementById(id + '-' + name + '-' + num).classList.add('btn-info');
}
