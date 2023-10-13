//Скрипт для перемещения данных с одного листа в другой по нужному триггер слову:

let A = 'Sheet1'
let B = 'Sheet2'
let C = 'Sheet3'

let At = 'trigger1'
let Bt = 'trigger2'
let Ct = 'trigger3'

function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var range = e.range;
  
  
  if (sheet.getName() !== A && sheet.getName() !== B && sheet.getName() !== C) {
    return;
  }
  
  var status = range.getValue().toLowerCase();
  
  if (sheet.getName() === A && status === Bt) {
    moveData(range, sheet, B);
  } else if (sheet.getName() === B && status === Ct) {
    moveData(range, sheet, C);
  } else if ((sheet.getName() === C || sheet.getName() === B) && status === At) {
    moveData(range, sheet, A);
  } else if (sheet.getName() === C && status === Bt) {
    moveData(range, sheet, B);
  } else if (sheet.getName() === A && status === Ct) {
    moveData(range, sheet, C);
  }
}


function moveData(range, sourceSheet, targetSheetName) {
  var spreadsheet = sourceSheet.getParent();
  var targetSheet = spreadsheet.getSheetByName(targetSheetName);
  
  var row = range.getRow();
  var numColumns = sourceSheet.getLastColumn();
  var data = sourceSheet.getRange(row, 1, 1, numColumns).getValues()[0];
  
  targetSheet.appendRow(data);
  sourceSheet.deleteRow(row);
}
