export const trainingTypes = [
  {
    typeKey: 'memory',
    typeName: 'Память',
  },
  {
    typeKey: 'attention',
    typeName: 'Внимание',
  },
  {
    typeKey: 'logic',
    typeName: 'Логика',
  },
  {
    typeKey: 'thinking',
    typeName: 'Мышление',
  },
];

export const trainingsItems = [
  {
    typeKey: 'memory',
    trainings: [
      {
        key: 'matrix',
        name: 'Матрицы памяти',
        image: 'images/memory/matrix.png',
        bg: 'images/memory/bg/memory.jpg',
        type: 'Память',
        description: 'Тренажер для развития образной памяти',
        rules: '<p>В клетчатом поле на некоторое время подсветятся зеленым цветом квадратики, расположение которых нужно запомнить.</p><p>Далее квадратики станут одного цвета, нужно за определенное время успеть нажать на те квадратики, которые были подсвечены зеленым цветом, в любом порядке.</p><p>Если выбранный квадратик окажется неверным, то он подсветится красным цветом.</p><p>Игра повторяется, пока не закончилось время таймера.</p>',
      },
    ],
  },
  {
    typeKey: 'attention',
    trainings: [
      {
        key: 'click',
        name: 'Клик-Клик',
        image: 'images/attention/click.png',
        bg: 'images/attention/bg/attention.jpg',
        type: 'Внимание',
        description: 'Тренажер для развития внимания',
        rules: '<p>В клетчатом поле появятся числа, которые нужно прокликать (нажать) по возрастанию.</p></p><p>Игра повторяется, пока не закончилось время таймера.</p>',
      },
    ],
  },
  {
    typeKey: 'logic',
    trainings: [
      {
        key: 'addition',
        name: 'Сложение',
        image: 'images/logic/addition.png',
        bg: 'images/logic/bg/logic.jpg',
        type: 'Логика',
        description: 'Тренажер для развития логики',
        rules: '<p>Необходимо в уме сложить все числа в предложенном примере и нажать на кнопку с правильным ответом.</p><p>Нужно решать примеры, пока не закончилось время таймера.</p>',
      },
      {
        key: 'subtraction',
        name: 'Вычитание',
        image: 'images/logic/subtraction.png',
        bg: 'images/logic/bg/logic.jpg',
        type: 'Логика',
        description: 'Тренажер для развития логики',
        rules: '<p>Необходимо в уме вычесть все числа в предложенном примере и нажать на кнопку с правильным ответом.</p><p>Нужно решать примеры, пока не закончилось время таймера.</p>',
      },
      {
        key: 'multiplication',
        name: 'Умножение',
        image: 'images/logic/multiplication.png',
        bg: 'images/logic/bg/logic.jpg',
        type: 'Логика',
        description: 'Тренажер для развития логики',
        rules: '<p>Необходимо в уме перемножить все числа в предложенном примере и нажать на кнопку с правильным ответом.</p><p>Нужно решать примеры, пока не закончилось время таймера.</p>',
      },
    ],
  },
  {
    typeKey: 'thinking',
    trainings: [
      {
        key: 'comparison',
        name: 'Пространственное сравнение',
        image: 'images/thinking/comparison.png',
        bg: 'images/thinking/bg/thinking.jpg',
        type: 'Мышление',
        description: 'Тренажер для развития образного мышления',
        rules: '<p>Необходимо запомнить в каком месте расположен закрашенный кружок, если при смене кружков закрашенный кружок останется на свем месте, то нужно нажать на кнопку "Да", иначе - "Нет".</p><p>Если вы ответили верно, то поле вокруг кружков подсветится зеленым цветом, иначе - красным.</p><p>Смена кружков происходит, пока не закончилось время таймера.</p>',
      },
    ],
  },
];
