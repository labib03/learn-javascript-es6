import '../component/search-bar.js';
import '../component/club-list.js';
import DataSource from "../data/data-source.js";

const main = () => {
  const searchElement = document.querySelector('search-bar');
  const clubListElement = document.querySelector('club-list');

  // == asynchronous template ==
  // const onButtonSearchClicked = () => {
  //   DataSource.searchClub(searchElement.value)
  //     .then(renderResult)
  //     .catch(fallbackResult)
  // };

  // === asynchronous but syncronous template ===
  const onButtonSearchClicked = async () => {
    try {
    const data = await DataSource.searchClub(searchElement.value);
    renderResult(data)
    } catch (error) {
      fallbackResult(error)
    }    
  }

  // const renderResult = (results) => {
  //   clubListElement.innerHTML = '';
  //   results.forEach((club) => {
  //     const { name, fanArt, description } = club;

  //     const clubElement = document.createElement('div');
  //     clubElement.setAttribute('class', 'club');

  //     clubElement.innerHTML = `
  //     <img class="fan-art-club" src="${fanArt}" alt="Fan Art">
  //     <div class="club-info">
  //     <h2>${name}</h2>
  //     <p>${description}</p>
  //     </div>
  //     `
  //     clubListElement.appendChild(clubElement);
  //   });
  // };
 
  // const fallbackResult = (message) => {
    //   clubListElement.innerHTML = '';
    //   clubListElement.innerHTML += `<h2 class="placeholder">${message}</h2>`;
    // };
    
    const renderResult = results => {
      clubListElement.clubs = results;
    };

    const fallbackResult = message => {
      clubListElement.renderError(message);
    };

  searchElement.clickEvent = onButtonSearchClicked;
};

export default main
