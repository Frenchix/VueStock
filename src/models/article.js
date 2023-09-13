import { useDatabaseList } from 'vuefire'
import { ref as dbRef, remove, update, set, get } from 'firebase/database'
import { db } from '../database/firebase'

export function getArticles() {
    return new Promise((resolve, reject) => {
        const { data: dataReferences, pending, error, promise } = useDatabaseList(dbRef(db, "articles"));
        promise.value
            .then(() => {
                resolve(dataReferences.value);
            })
            .catch((err) => {
                console.error("Une erreur s'est produite lors du chargement des données :", err);
                reject(err);
            });
    });
}

export function deleteArticle(key){
    return new Promise((resolve, reject) => {
        const promise = remove(dbRef(db, `articles/${key}`));
        promise
            .then(() => {
                resolve("article supprimé");
            })
            .catch((err) => {
                console.error("Une erreur s'est produite lors du chargement des données :", err);
                reject(err);
            });
    });
}

export async function updateArticle(key, data){
    const articleExist = await getArticle(key);
    const article = {};
    const dataSplit = data.split(',');
    dataSplit.forEach(element => {
        const elementSplit = element.split(':');
        if (articleExist !== false && elementSplit[0].slice(1, elementSplit[0].length - 1) === "quantite"){
            article[elementSplit[0].slice(1, elementSplit[0].length - 1)] = parseInt(elementSplit[1].slice(1, elementSplit[1].length - 1)) + parseInt(articleExist.quantite);
        } else {
            article[elementSplit[0].slice(1, elementSplit[0].length - 1)] = elementSplit[1].slice(1, elementSplit[1].length - 1)
        }
    });
    return new Promise((resolve, reject) => {
        const promise = update(dbRef(db, 'articles/' + key), article);
        promise
            .then(() => {
                resolve("article modifié");
            })
            .catch((err) => {
                console.error("Une erreur s'est produite lors du chargement des données :", err);
                reject(err);
            });
    });
}

export function getArticle(key){
    return new Promise((resolve, reject) => {
        get(dbRef(db, 'articles/' + key)).then((snapshot) => {
            if (snapshot.exists()) {
                resolve(snapshot.val());
            } else {
                resolve(false);
            }
        }).catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}
