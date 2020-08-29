import api from './api';


class App {
    constructor(){
        this.reponsitories = [];

        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById('repo-list');

        this.registerHandlers();
    }

    registerHandlers() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading = true){
        if (loading === true) {
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando...'));
            loadingEl.setAttribute('id', 'loading');
            
            this.formEl.appendChild(loadingEl);
        } else {
            document.getElementById('loading').remove();
        }
    }

    async addRepository() {
        event.preventDefault();

        const repoInput = this.inputEl.value;

        this.setLoading();

        if (repoInput.length === 0)
        {   
            this.setLoading(false);
            return;
        }
            

        try{

            const response = await api.get(`/repos/${repoInput}`)
            const { name, description, html_url ,owner: { avatar_url }  } = response.data;

            this.reponsitories.push({
                name,
                description,
                avatar_url,
                html_url,
            })
        
            this.inputEl.value = "";
            this.render();
        } catch (err) {
            
            alert('O repositório não existe!');
        }

        this.setLoading(false);
    }

    render() {
        this.listEl.innerHTML = '';

        this.reponsitories.forEach( repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.appendChild(document.createTextNode('Acessar'));
            linkEl.setAttribute('href', repo.html_url);
            linkEl.setAttribute('target', '_blank');

            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);

            this.listEl.appendChild(listItemEl);
        });
    }
}

new App();




/*import axios from 'axios';


class Api {
    static async getUserInfo(username) {
        try{
            const response = await axios.get(`https://api.github.com/users/${username}`);

            console.log(response);

        } catch (err) {
            console.warn('Erro na API');
        }    
    }
}

*/


/*const minhaPromise = () => new Promise((resolve, reject) => {
    setTimeout(() => { resolve('ok')}, 2000);
});


// async function executaPromise() {
//     console.log(await minhaPromise());
//     console.log(await minhaPromise());
//     console.log(await minhaPromise());
// }
// executaPromise();


const executaPromise = async () => {
    console.log(await minhaPromise());
    console.log(await minhaPromise2());
    console.log(await minhaPromise());
    console.log(await minhaPromise());
}

executaPromise();

// minhaPromise()
// .then(response => {
//     console.log(response);
// }).catch( err => {
//     console.log(err);
// })*/