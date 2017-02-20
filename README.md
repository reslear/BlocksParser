# BlocksParser
Скрипт проходит по всему указанному dom дереву, и добавляет блочным элементам contenteditable для их редактирования.

[Demo page](http://demo.io/)

# Использование
1.  Установить стиль и скрипт перед ```</body>```
```
<link rel="stylesheet" href="blocks-parser.min.css">
<script src="BlocksParser.js"></script>
```
2.  Запуск парсинга:
```
var myBlock = new BlocksParser('.blog');
```
где ```.blog``` - селектор с контентом

2.  Получение html:
```
myBlock.get();
```

# API
+ #### Свойства
    + ```BLOCK``` - Узел селектора
```
// пример
var el = document.querySelector('.cust');
myBlock.BLOCK = el;
```

+ #### Методы
    + ```get``` - Получение готового HTML кода
    ```
    // пример
    myBlock.get();
    ```


# Change Log
* #### v 0.1
    * удаление лишнего
    * add "ignore" tag
    * удалить дерево
* #### Released
