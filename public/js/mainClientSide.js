const cellResult = document.querySelector('.clientResult');      // div которій выводит список статей
const createbtn =  document.querySelector('.create');            // кнопки
const findbtn =  document.querySelector('.findArticle');
const changebtn =  document.querySelector('.changeArticle');
const createForm =  document.querySelector('.createArticle');    // формы
const findForm =  document.querySelector('.findArt');
const changeForm = document.querySelector('.changeArt');
const informEl =  document.querySelector('.inform');             // div с сообщениями пользователю
const findFormEl =  document.querySelector('.findInform');
const changeMsg =  document.querySelector('.changemsg');

const getArticles = async () => {
    const { data } = await axios.post('/server');
    return data;
};

const renderArticles = async () => {
    const articles = await getArticles();
    const articlesCard = articles.reduce((acc, item) => {
        acc += `<div>${item.name}</div>`
        return acc;
    }, '');
    cellResult.innerHTML = articlesCard;
};
renderArticles();


createbtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    createForm.classList.remove('hidden');
});


const formEl = document.forms.setInfo;
formEl.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post('/form', formData);
    
    createForm.classList.add('hidden');
    informEl.classList.remove('hidden');  
});



findbtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    findForm.classList.remove('hidden');
})

const findnameform = document.forms.findInfo;
findnameform.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post('/find', formData);
    
    findForm.classList.add('hidden');
    // const html =`<p>${data[0].name}</p>`    // выведет имя
    const html =`<p>${data[0].text}</p>`      // отдает текст статьи
    findFormEl.innerHTML = html;
    findFormEl.classList.remove('hidden');
});


changebtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    changeForm.classList.remove('hidden');
});

const changeTextForm = document.forms.changeInfo;
changeTextForm.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const { data } = await axios.post('/change', formData);
    
    changeForm.classList.add('hidden');
    changeMsg.classList.remove('hidden');
});

