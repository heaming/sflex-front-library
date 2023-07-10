/**
 * print Element
 * @param elementRef
 */
function print(printContents) {
  const app = document.getElementById('app');
  const printDiv = document.createElement('DIV');
  printDiv.className = 'print-division';
  printDiv.innerHTML = printContents;
  document.body.appendChild(printDiv);

  document.querySelectorAll('.q-dialog').forEach((el) => {
    el.style.display = 'none';
  });
  app.style.display = 'none';
  window.print();

  document.querySelectorAll('.q-dialog').forEach((el) => {
    el.style.display = 'block';
  });
  app.style.display = 'block';
  printDiv.style.display = 'none';
  document.body.removeChild(printDiv);
}
export function printElement(elementRef) {
  print(elementRef.value.$el.innerHTML);
}

export function printElementsByClassName(className) {
  const el = document.getElementsByClassName(className)[0];
  print(el.innerHTML);
}

export function printAddClassBody(addClassName) {
  const el = document.querySelector('body');
  el.classList.add(addClassName);
  window.print();
  el.classList.remove(addClassName);
}
