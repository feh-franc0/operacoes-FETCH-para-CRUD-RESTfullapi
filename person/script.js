const postsList = document.querySelector('#minhatabela');
const addPostForm = document.querySelector('.add-post-form');
const nameValue = document.getElementById('name-value');
const salaryValue = document.getElementById('salary-value');
const approvedValue = document.getElementById('approved-value');
const btnSubmit = document.querySelector('.btn')
let output = '';

const renderPosts = (posts) => {
    posts.forEach(post => {
        output += `
        <tr>
                <th scope="row">${post._id}</th>
                <td class="card-title">${post.name}</td>
                <td class="card-subtitle">${post.salary}</td>
                <td class="card-text">${post.approved}</td>
                <td id=${post._id}>
                    <a class="btn btn-success" href="#" id="edit-post">edit</a>
                    <a class="btn btn-danger" href="#" id="delete-post">delete</a>
                </td>
        </tr>`;
    });
    postsList.innerHTML = output;
}

const url = 'http://localhost:3000/person';

//* Get - Read the posts
//* Method: GET
fetch(url)
    .then(res => res.json())
    .then(data => renderPosts(data))

postsList.addEventListener('click', (e) => {
    e.preventDefault();
    let delButtonIsPressed = e.target.id == 'delete-post';
    let editButtonIsPressed = e.target.id == 'edit-post';

    let id = e.target.parentElement.id;

    //* Delete - Remove the existing post
    //* method: Delete
    if(delButtonIsPressed) {
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(() => location.reload()) //? dar reload na abay
    }

    if(editButtonIsPressed) {
        const parent = e.target.parentElement.parentElement;
        let titleContent = parent.querySelector('.card-title').textContent;
        let subtitleContent = parent.querySelector('.card-subtitle').textContent;
        let textContent = parent.querySelector('.card-text').textContent;

        nameValue.value = titleContent;
        salaryValue.value = subtitleContent;
        approvedValue.value = textContent;
    }

    //* Update - update the existing post
    //* Method: PATCH
    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault()
        fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:nameValue.value,
                salary:salaryValue.value,
                approved:approvedValue.value
            })
        })
            .then(res => res.json())
            .then(() => location.reload())
    })

});



//* Create - Insert new post
//* Method : POST
addPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameValue.value,
            salary: salaryValue.value,
            approved: approvedValue.value
        })
    })
        .then(res => res.json())
        .then(data => {
            const dataArr = [];
            dataArr.push(data);
            renderPosts(dataArr);
        })
        .then(() => location.reload())

    //* Reset input field to empty
    nameValue.value = '';
    salaryValue.value = '';
    approvedValue.value = '';
})




















    //! BACKUP


        // async function getContent(){
        //     try {
        //         const response = await fetch('http://localhost:3000/person');
        //         console.log(response)
        //         const data = await response.json()
        //         console.log('response.json',response)
        //         show(data)
        //     } catch (error) { console.error(error) } }

        // getContent()


        // function show(users) {
        //     console.log(users)
        //     let output = '';

        //     for( let user of users) {
        //         output +=         `<tr>
        //                                 <th scope="row">1</th>
        //                                 <td>${user.name}</td>
        //                                 <td>${user.salary}</td>
        //                                 <td>@${user.approved}</td>
        //                                 <td>
        //                                     <a href="atualizar.html/${user._id}"><button type="button" class="btn btn-success">atualizar</button></a>
        //                                     <a href="delete/${user._id}" id="excluir_pessoa"><button type="button" class="btn btn-danger">delete</button></a>
        //                                 </td>
        //                             </tr>`

        //     }

        //     document.querySelector('#minhatabela').innerHTML = output
        // }


