window.onload = function() {
    const home = document.querySelector('#home');
    const actorID = new URLSearchParams(window.location.search).get('id');
    const actorName = document.querySelector('#name');
    var counter = 0;
    const grid = document.querySelector('.grid');
    
    home.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    fetch('https://api.themoviedb.org/3/person/' + actorID + '?api_key=c5dd1166b8fea2eab352e5822a290868&language=de')
        .then(response => response.json())
        .then(data => {
            document.title = 'Filme von ' + data.name;
            actorName.innerText += ' ' + data.name;
        });

    getMovies();

    function getMovies()
    {
        fetch('https://api.themoviedb.org/3/person/' + actorID + '/movie_credits?api_key=c5dd1166b8fea2eab352e5822a290868&language=de')
            .then(response => response.json())
            .then(data => {
                data.cast.forEach(element => {
                    console.log(counter);
                    if(counter == 5)
                    {
                        if(element.poster_path == null)
                        {

                        }
                        else
                        {
                            var column;
                            column = document.createElement('div');
                            column.classList.add('column', 'ms-2', 'mb-3');
                            var img = document.createElement('img');
                            img.src = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + element.poster_path;
                            img.addEventListener('click', () => {
                                window.open('movie.html?id=' + element.id, '_blank');
                            });
                            img.style.cursor = 'pointer';
                            column.appendChild(img);
                            grid.appendChild(column);
                            counter = 0;
                        }
                        
                    }
                    else
                    {
                        if(element.poster_path == null)
                        {

                        }
                        else
                        {
                            var column;
                            column = document.createElement('div');
                            column.classList.add('column', 'ms-2', 'mb-3');
                            var img = document.createElement('img');
                            img.src = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + element.poster_path;
                            img.addEventListener('click', () => {
                                window.open('movie.html?id=' + element.id, '_blank');
                            });
                            img.style.cursor = 'pointer';
                            column.appendChild(img);
                            grid.appendChild(column);
                            counter++;
                        }
                    }
                    console.log(element);
                    //counter++;
                });
            });
    }
};