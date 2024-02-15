document.getElementById('dataForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Предотвращаем отправку формы по умолчанию

  // Получаем данные из формы
  var field1Value = document.getElementById('field1').value;
  var field2Value = document.getElementById('field2').value;

  // Загружаем шаблон docx с GitHub
  fetch('https://raw.githubusercontent.com/Vlad-ivn/app.github.io/main/prob1.docx'')
    .then(response => response.arrayBuffer())
    .then(templateData => {
      // Создаем новый ZIP архив
      var zip = new JSZip();
      // Загружаем содержимое шаблона в архив
      zip.loadAsync(templateData)
        .then(function(zip) {
          // Получаем содержимое файла word/document.xml
          return zip.file('word/document.xml').async('string');
        })
        .then(function(content) {
          // Заменяем помеченные поля на данные из формы
          content = content.replace('{field1}', field1Value);
          content = content.replace('{field2}', field2Value);

          // Обновляем содержимое файла в архиве
          zip.file('word/document.xml', content);

          // Генерируем бинарные данные архива
          return zip.generateAsync({type: 'blob'});
        })
        .then(function(updatedTemplate) {
          // Создаем ссылку для скачивания документа
          var downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(updatedTemplate);
          downloadLink.download = 'generated_document.docx';
          downloadLink.click();
        });
    });
});
