function getUser(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson =>
            displayResults(responseJson))
        .catch(error => {
            $('.badRequest').text(`Something went wrong: $(error.message`)
        }
            )

}

function displayResults(responseJson) {
    let username = $('.repoSearch').val();
    let userRepo = responseJson;
    $('.results').append(`<h2>${username}<h2>`)
    $('.results').append(`<ul class="result"></ul>`)
        for (let i = 0; i < userRepo.length; i++) {
            console.log(userRepo[i].name);
            console.log(userRepo[i].html_url);
            $('.result').append(`
           <li>
               <p><a href="${userRepo[i].html_url}">${userRepo[i].name}</a></p>
           </li>
`)
        }
}

function pressSubmit() {
    $('.submit').on('click', function (s) {
        s.preventDefault();
        let username = $('.repoSearch').val();
        getUser(username);
        $('.results').empty();
    })
}

$(function () {
    console.log('App is loaded and ready to go!')
    pressSubmit();
})