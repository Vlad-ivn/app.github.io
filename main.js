document.getElementById('dataForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Перешкоджаємо відправленню форми за замовчуванням

  // Отримуємо значення з полів вводу
  var app1Value = document.getElementById('app1').value;
  var app2Value = document.getElementById('app2').value;

  // Завантажуємо шаблон docx з GitHub
  fetch('https://raw.githubusercontent.com/Vlad-ivn/app.github.io/main/prob1.docx')
    .then(response => response.arrayBuffer())
    .then(templateData => {
      // Створюємо новий ZIP архів
      var zip = new JSZip();
      // Завантажуємо вміст шаблону в архів
      zip.loadAsync(templateData)
        .then(function(zip) {
          // Отримуємо вміст файлу word/document.xml
          return zip.file('word/document.xml').async('string');
        })
        .then(function(content) {
          // Замінюємо мітки на значення з полів вводу
          content = content.replace('{app1}', app1Value);
          content = content.replace('{app2}', app2Value);

          // Оновлюємо вміст файлу в архіві
          zip.file('word/document.xml', content);

          // Генеруємо бінарні дані архіву
          return zip.generateAsync({type: 'blob'});
        })
        .then(function(updatedTemplate) {
          // Створюємо посилання для завантаження документа
          var downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(updatedTemplate);
          downloadLink.download = 'generated_document.docx';
          downloadLink.click();
        });
    })
    .catch(error => {
      console.error('Помилка при завантаженні файлу:', error);
    });
});
