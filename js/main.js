$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let username = e.target.value; // we use ES6 syntax

        // Make request to GitHub
        $.ajax({
            url: 'https://api.github.com/users/' + username, // search username from github api
            data: {
                client_id:'d9149d2056dda39be597',
                client_secret:'948bab4df178bdf03e7cd78da8b9aa47798f1b1d'
            }
        }).done(function(user){
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos', // search repos
                data: {
                    client_id:'d9149d2056dda39be597',
                    client_secret:'948bab4df178bdf03e7cd78da8b9aa47798f1b1d',
                    sort: 'created: asc', // sort repos
                    per_page: 5           // get 5 repos per page
                }
            }).done(function(repos){
                $.each(repos, function(index, repo){
                    $('#repos').append(`
                        <div class="well">
                            <div class="row">
                                <div class="col-md-6">
                                    <strong>${repo.name}</strong>: ${repo.description}
                                </div>
                                <div class="col-md-4">
                                    <span class="label label-default">
                                        Forks: ${repo.forks_count}
                                    </span>
                                    <span class="label label-primary">
                                        Watchers: ${repo.watchers_count}
                                    </span>
                                    <span class="label label-success">
                                        Stars: ${repo.stargazers_count}
                                    </span>
                                </div>
                                <div class="col-md-2">
                                    <a class="btn btn-success" href="${repo.html_url}" 
                                       target="_blank">Repo Page</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            });

            $('#profile').html(`
                <div class="panel panel-success">
                  <div class="panel-heading">
                    <h3 class="panel-title">${user.name}</h3>
                  </div>
                  <div class="panel-body">
                    <div class="row">
                        <div class="col-md-3">
                            <img class="thumbnail avatar" src="${user.avatar_url}" 
                            alt="${user.name} avatar">
                            <a target="_blank" class="btn btn-success btn-block" 
                            href="${user.html_url}">
                                View Profile
                            </a>
                        </div>
                        <div class="col-md-9">
                            <span class="label label-default">Public Repos: ${user.public_repos}</span>
                            <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                            <span class="label label-success">Followers: ${user.followers}</span>
                            <span class="label label-info">Following: ${user.following}</span>
                            <br><br>
                            <ul class="list-group">
                                <li class="list-group-item">Company: ${user.company}</li>
                                <li class="list-group-item">Website/Blog: ${user.blog}</li>
                                <li class="list-group-item">Location: ${user.location}</li>
                                <li class="list-group-item">Member Since: ${user.created_at}</li>
                            </ul>
                        </div>
                    </div>
                  </div>
                </div>
                <h3 class="page-header">
                    <div id="repos"> // block for repos
                    
                    </div>
                </h3>
            `);
        });

    });

});



































