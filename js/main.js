// Объявляем переменные
// Посты
const POSTS_NUMBER = 25;

const PhotoId = {
  MIN: 1,
  MAX: POSTS_NUMBER
};

const DESCRIPTIONS = [
  'Снимали дроном отель, смотрите какой у нас классный пляж',
  'Вход на пляж. Оригинальная работа',
  'Чистая голубая водичка и никого вокруг. Красота!',
  'А вот и сам фотограф. Всем привет 👋',
  'Мое ощущение от первого погружения в воду',
  'Девчонки, поехали кататься 😉',
  'Лучший десерт - полезный десерт. Всем отличного настроения и помните - "Вы - то что вы едите"',
  'Клюквенный морс. Далекие воспоминания из детства. Жаль к бабушке в гости уже не съездить 😢',
  'Недалеко аэродром, встречать каждый самолет было классно в начале воздуха. Сейчас уже поднадоели',
  'Классный органайзер для обуви. Только сегодня по промо цене, 3000 Кексомарок! Налетай!',
  'Дорожка на пляж. Белый песочек, теплая вода... ммм... Завидуйте!',
  'Новая малышка. Врум-врум 🚗',
  'Что-то непонятное сегодня на ужин. Даешь меньше овощей и больше рыбы. Мяу!',
  'Организовали фотосъемку для нашего рыжика. У фотографа чудное видение. ничего не сказать',
  'Разыгрываем крутые теплые домашние тапки, для участия в розыгрыше подпишитесь на всех моих 500 подписок и отправьте 5000 Кексомарок на мой счет. Победитель будет выбран случайно.',
  'Дорога домой. Грустно, но ничего - вернемся через полгодика снова',
  'Ездили на концерт. Красота!',
  'Ничего не знаю про автомобили, вот просто фотка. Красный - классно',
  'Отличные тапки - не вляпаешься в Кексовы какашки, а каждая пылинка будет резать тебе глаз по дороге в туалет, разве не замечательно? Надо брать!',
  'Прощай-прощай отельчик. Спасибо за классный отдых!',
  'Отличное малокалорийное бюлюдо. Каждому прокомментировавшему пришлю в личку 🤤',
  'Потрясающий закат. Как же тут хорошо!',
  'Маленький житель пляжа. Кстати, тарелка жаренных крабов всего-то 200 Кексорублей! Вкуснятина!',
  'Ну где же ручки, ну где же ваши ручки? Давай поднимем ручки и будем танцевать! 🎵💖',
  'На первый взгляд на нас нападает инопланетянин. Вам кажется, это всего лишь гиппопотам *нервно смеется*'
];

const LikesNumber = {
  MIN: 15,
  MAX: 200
};


// Комменты
const CommentsNumber = {
  MIN: 0,
  MAX: 30
};

const CommentsUserPicture = {
  MIN: 1,
  MAX: 6
};

const USER_NAMES = [
  'Максим',
  'Алина',
  'Павел',
  'Анастасия',
  'Даниил',
  'Наталья',
  'Иван',
  'Полина',
  'Артем',
  'Ольга'
];

const CommentMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


// Основная часть кода
// Рандмайзер
function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}


// Создание постов
const postUsedId = [];

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Создаем комментарий
const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(CommentsUserPicture.MIN, CommentsUserPicture.MAX)}.svg`,
  message: getRandomArrayElement(CommentMessages),
  name: getRandomArrayElement(USER_NAMES)
});

const createPost = () => {
  const randomPostId = getRandomInteger(PhotoId.MIN, PhotoId.MAX);
  const randomPostLikesNumber = getRandomInteger(LikesNumber.MIN, LikesNumber.MAX - 1);
  let photoDescription;
  if (randomPostId <= DESCRIPTIONS.length) {
    photoDescription = DESCRIPTIONS[randomPostId - 1];
  } else {
    photoDescription = 'Описание фотографии отсутствует';
  }

  // Создаем массив комментариев, добавляем значение id для каждого комментария
  // const commentsList = [];
  const commentsNumber = getRandomInteger(CommentsNumber.MIN, CommentsNumber.MAX);
  // for (let i = 1; i <= commentsNumber; i++) {
  //   const postComments = createComment();
  //   postComments.id = randomPostId.toString() + (i - 1).toString();
  //   commentsList.push(postComments);
  // }


  // Создаем пост
  if (!postUsedId.includes(randomPostId)) {
    postUsedId.push(randomPostId);

    return {
      id: randomPostId,
      url: `photos/${[randomPostId]}.jpg`,
      description: photoDescription,
      likes: randomPostLikesNumber,
      comments: Array.from({length: commentsNumber}, (_, index) => createComment(index + 1))
    };
  } else {
    return createPost();
  }
};

// Создаем ленту Кекстограма из постов
const kekstogramFeed = Array.from({length: POSTS_NUMBER}, createPost);

console.log(kekstogramFeed);
