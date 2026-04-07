/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

"use strict";

const movieDB = {
  movies: [
    "Логан",
    "Лига справедливости ",
    "Ла-ла лэнд",
    "Одержимость",
    "Скотт Пилигрим против...",
  ],
};

const adv = document.querySelectorAll(".promo__adv img"),
  genre = document.querySelector(".promo__genre"),
  poster = document.querySelector(".promo__bg"),
  movieList = document.querySelector(".promo__interactive-list"),
  addForm = document.querySelector("form.add"),
  addInput = document.querySelector(".adding__input");

addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let newFilm = addInput.value;

  if (newFilm) {
    if (newFilm.length > 21) {
      newFilm = `${newFilm.substring(0, 22)}...`.trim();
    }

    movieDB.movies.push(newFilm);
    createMovieList(movieDB.movies, movieList);
  }

  event.target.reset();
});

const advRemove = (advImg) => {
  advImg.forEach((item) => {
    item.remove();
  });
};

const changeGenre = (genreText) => {
  genreText.textContent = "Драма";
};

const changePosterBG = (posterImg) => {
  posterImg.style.backgroundImage = 'url("img/bg.jpg")';
};

const sortMovieDB = (films) => {
  films.sort();
};

const createMovieList = (dataBase, movieList) => {
  movieList.innerHTML = "";

  sortMovieDB(dataBase);

  dataBase.forEach((item, i) => {
    movieList.innerHTML += `                        
  <li class="promo__interactive-item">${i + 1}) ${item}
        <div class="delete"></div>
  </li>`;
  });

  const deleteBin = document.querySelectorAll(".delete");

  deleteBin.forEach((item, i) => {
    item.addEventListener("click", () => {
      item.parentElement.remove();
      dataBase.splice(i, 1);
      createMovieList(dataBase, movieList);
    });
  });
};

advRemove(adv);
changeGenre(genre);
changePosterBG(poster);
createMovieList(movieDB.movies, movieList);
