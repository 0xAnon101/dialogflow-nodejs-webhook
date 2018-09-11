const fetch = require('node-fetch');


module.exports = (app) => {

    const requestOne = async () => {
        const result = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&region=US&sort_by=popularity.desc&certification_country=US&certification=G&include_adult=false&include_video=false&page=1`);
        return await result.json();
    }

    const requestTwo = async (movieTitle) => {
        const result = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${movieTitle}`);
        return await result.json();
    }


    app.post('/moviebot/get-movie-details', (req, res) => {
        if (req.body.queryResult.parameters['movie_feature']) {
           requestOne()
                .then((data) => {
                    const {results} = data;
                    console.log(results)
          
                        let output = "Hey there sir ! I got a ton of movies at my hand , here you go !";
                        for(let i = 0; i < results.length; i++) {
                        output += `${results[i].title}  with a average vote of ${results[i].vote_average}. `;
                            
                        }
                        output += "That's it for now haha";
                        res.json({
                            "fulfillmentText": output,
                            "source": "get-top-rated-movies"
                        });
            
                })
                .catch(reason => console.log(reason.message));
        }

        const getMovie =  req.body.queryResult.parameters['movie_name_specific'];
        if(getMovie) {
            requestTwo(getMovie)
                .then((data) => {
                    const {results} = data;
                    
                    res.json({
                        "fulfillmentText":  results[0].overview,
                        "source": "get-top-rated-movies"
                    });
                })
                .catch(error => console.log(`here is Some ERR:${err.code} --> ${err.message}`))
        }

        
       
    });
}