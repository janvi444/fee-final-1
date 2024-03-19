window.onload = function() {
    console.log(new URLSearchParams(window.location.search).get('id'));
    const movieID = new URLSearchParams(window.location.search).get('id');
    //console.log(window.location.search);
    const title = document.querySelector('.title');
    const handlung = document.querySelector('.handlung');
    const picture = document.querySelector('.picture');
    const container = document.querySelector('.back');
    const trailer = document.querySelector('.trailer');
    const iframe = document.querySelector('iframe');
    const video = document.querySelector('.video');
    const body = document.querySelector('body');
    const home = document.querySelector('#home');
    const playing = video.querySelector('video');
    var counter = 0;

    getMovies(movieID);
    getActors(movieID);

    home.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    function getMovies(id)
    {
        const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=c5dd1166b8fea2eab352e5822a290868&language=de';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                title.innerText = data.title + " (" + data.release_date.substring(0, 4) + ")";
                document.title = data.title;
                handlung.innerText = data.overview;
                picture.src = 'https://image.tmdb.org/t/p/w300/' + data.poster_path;
                container.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url(https://image.tmdb.org/t/p/original' + data.backdrop_path + ') '; //w1400_and_h450_bestv2
                console.log(data.backdrop_path);
            });
    }

    trailer.addEventListener('click', () => {
        fetch('https://api.themoviedb.org/3/movie/' + movieID + '/videos?api_key=c5dd1166b8fea2eab352e5822a290868&language=de')
        .then(response => response.json())
        .then(data => {
            video.src = 'https://www.youtube.com/embed/' + data.results[0].key + '?autoplay=1';
        })
        iframe.style.visibility = 'visible';
        body.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        document.querySelector('.btn-close').style.visibility = 'visible';
        document.querySelector('.btn-close').addEventListener('click', () => {
            iframe.style.visibility = 'hidden';
            video.src = "";
            body.style.backgroundColor = 'rgba(0, 0, 0, 0)';
            document.querySelector('.btn-close').style.visibility = 'hidden';
        });
    });


    function getActors(id)
    {
        var grid = document.querySelector('.grid');
        fetch('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=c5dd1166b8fea2eab352e5822a290868&language=de')
        .then(response => response.json())
        .then(data => {
            data.cast.forEach(element => {
                console.log(counter);
                if(counter == 4)
                {
                    var column;
                    column = document.createElement('div');
                    column.classList.add('column', 'ms-3');
                    var img = document.createElement('img');
                    if(element.profile_path == null)
                    {
                        img.src = 'imgs/empty.png';
                        img.classList.add('img-empty');
                    }
                    else{
                        img.src = 'https://image.tmdb.org/t/p/w300/' + element.profile_path;
                    }
                    img.addEventListener('click', () => {
                        window.open('actor.html?id=' + element.id, '_blank');
                    });
                    img.style.cursor = 'pointer';
                    var name = document.createElement('p');
                    name.innerText = element.name;
                    column.appendChild(img);
                    column.appendChild(name);
                    grid.appendChild(column);
                    counter = 0;
                }
                else
                {
                    var column;
                    column = document.createElement('div');
                    column.classList.add('column', 'ms-3');
                    var img = document.createElement('img');
                    if(element.profile_path == null)
                    {
                        img.src = 'imgs/empty.png';
                        img.classList.add('img-empty');
                    }
                    else{
                        img.src = 'https://image.tmdb.org/t/p/w300/' + element.profile_path;
                    }
                    img.addEventListener('click', () => {
                        window.open('actor.html?id=' + element.id, '_blank');
                    });
                    img.style.cursor = 'pointer';
                    var name = document.createElement('p');
                    name.innerText = element.name;
                    column.appendChild(img);
                    column.appendChild(name);
                    grid.appendChild(column);
                    counter++;
                }
                console.log(element);
                //counter++;
            });
        });
    }
}