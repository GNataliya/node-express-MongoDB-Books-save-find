const cellResult = document.querySelector(".clientResult");
const createbtn =  document.querySelector('.create');
const findbtn =  document.querySelector('.findArticle');
const changebtn =  document.querySelector('.change');
const createForm =  document.querySelector('.createArticle');
const findForm =  document.querySelector('.findArt');
const informEl =  document.querySelector('.inform');
const findFormEl =  document.querySelector('.findInform');


const getArticles = async () => {
    const { data } = await axios.post('/server');
    //console.log(data)
    return data;
};

const renderArticles = async () => {
    const articles = await getArticles();
    //console.log(data)
    const articlesCard = articles.reduce((acc, item) => {
        //console.log(item)
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
    console.log(data[0].name)
    findForm.classList.add('hidden');
    const html =`<p>${data[0].name}</p>`
    findFormEl.innerHTML = html;
    findFormEl.classList.remove('hidden');
});

