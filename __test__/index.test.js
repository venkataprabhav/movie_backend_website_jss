const app = require('../app.js');
const request = require('supertest');
const JWT = require('jsonwebtoken');
const { user } = require('../config/config.js');

describe('Testing Registration', () => {
    
    describe('Successfully creating account', () => {
        it('Registers new user successfully and returns status code 201', async () => {
            const response = await request(app).post('/users/register').send({ email: "newuser@gmail.com", password: "Hijk2@" });
            
            expect(response.statusCode).toEqual(201);
            expect(response.body).toHaveProperty(
                'message',
                'User created successfully! '
              );
            expect(response.headers['content-type']).toContain('application/json');  
        })
    });

    describe('No email entered', () => {
        it('Email not entered and returns status code 400', async () => {
            const response = await request(app).post('/users/register').send({ email: "", password: "asde3" });
            
            expect(response.statusCode).toEqual(400);
            expect(response.body).toHaveProperty(
                'message',
                'Please fill in all fields! '
              );
            expect(response.headers['content-type']).toContain('application/json');  
        })
    }); 

    
    describe('No password entered', () => {
        it('password not entered and returns status code 400', async () => {
            const response = await request(app).post('/users/register').send({ email: "usr@gmail.com", password: "" });
            
            expect(response.statusCode).toEqual(400);
            expect(response.body).toHaveProperty(
                'message',
                'Please fill in all fields! '
              );
            expect(response.headers['content-type']).toContain('application/json');
        })
    });
    

    describe('Password strength verification unsuccessful', () => {
        it('Password not strong enough and returns status code 400', async () => {
            const response = await request(app).post('/users/register').send({ email: "usr@gmail.com", password: "asde3" });
            
            expect(response.statusCode).toEqual(400);
            expect(response.body).toHaveProperty(
                'message',
                'Password not strong enough! Please include at least one lowercase character, uppercase character, number and special character! '
              );
            expect(response.headers['content-type']).toContain('application/json');
        })
    });

    describe('Email already exists in database', () => {
        it('Email already existing in database which prevents registration and returns status code 401', async () => {
            const response = await request(app).post('/users/register').send({ email: "usr@gmail.com", password: "aA@sde3" });
            
            expect(response.statusCode).toEqual(401);
            expect(response.body).toHaveProperty(
                'message',
                'Something went wrong! Please try again. '
              );
            expect(response.headers['content-type']).toContain('application/json');
        })
    });

    
});


describe('Testing Logging In', () => {

    describe('Successfully Logging in', () => {
        it('Successfully logs user in, provides JWT token and returns 200 status code', async () => {
            const response = await request(app).post('/users/login').send({ email: "usr@gmail.com", password: "Hijk2@" });
            
            expect(response.statusCode).toEqual(200);
            expect(response.body).toHaveProperty(
                'Generated Token '
              );
            expect(response.headers['content-type']).toContain('application/json');
        })
    })

    describe('Admin Successfully Logging in', () => {
        it('Successfully logs user in, provides JWT token and returns 200 status code', async () => {
            const response = await request(app).post('/users/login').send({ email: "admin@gmail.com", password: "Qwerty1!" });
            
            expect(response.statusCode).toEqual(200);
            expect(response.body).toHaveProperty(
                'Generated Token '
              );
            expect(response.headers['content-type']).toContain('application/json');
        })
    })

    describe('Incorrect Email', () => {
        it('If email does not exist in the database or is not entered, 401 status code is returned', async () => {
            const response = await request(app).post('/users/login').send({ email: "ue@gmail.com", password: "Hijk2@" });
            
            expect(response.statusCode).toEqual(401);
            expect(response.body).toHaveProperty(
                'message',
                'Invalid credentials!'
              );
            expect(response.headers['content-type']).toContain('application/json');
        })
    })

    describe('Incorrect Password', () => {
        it('If the wrong password of the user is entered, 401 status code is returned', async () => {
            const response = await request(app).post('/users/login').send({ email: "user@gmail.com", password: "Hdsff@" });
            
            expect(response.statusCode).toEqual(401);
            expect(response.body).toHaveProperty(
                'message',
                'Invalid credentials!'
              );
            expect(response.headers['content-type']).toContain('application/json');
        })
    });

});




describe('GET /movies', () => {
    describe('Retrieves available movie information from database', () => {
        it('Retrieves Name, Year, Genre and Image of movies.', async () => {
            const response = await request(app).get('/movies');

            expect(response.statusCode).toEqual(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('Retrieves movies of the Horror genre.', async () => {
            const response = await request(app).get('/movies/horror');

            expect(response.statusCode).toEqual(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('Retrieves movies of the Comedy genre.', async () => {
            const response = await request(app).get('/movies/comedy');

            expect(response.statusCode).toEqual(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('Retrieves movies of the Drama genre.', async () => {
            const response = await request(app).get('/movies/drama');

            expect(response.statusCode).toEqual(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('Retrieves movies of the Thriller genre.', async () => {
            const response = await request(app).get('/movies/thriller');

            expect(response.statusCode).toEqual(200);
            expect(response.headers['content-type']).toContain('application/json');
        });
    });
    
});

describe('GET /tvshows', () => {
    describe('Retrieves available movie information from database', () => {
        it('Retrieves Name, Year, Genre and Image of tvshows.', async () => {
            const response = await request(app).get('/tvshows');

            expect(response.statusCode).toEqual(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('Retrieves tv shows of the Horror genre.', async () => {
            const response = await request(app).get('/tvshows/horror');

            expect(response.statusCode).toEqual(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('Retrieves tv shows of the Comedy genre.', async () => {
            const response = await request(app).get('/tvshows/comedy');

            expect(response.statusCode).toEqual(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('Retrieves tv shows of the Drama genre.', async () => {
            const response = await request(app).get('/tvshows/drama');

            expect(response.statusCode).toEqual(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('Retrieves tv shows of the Thriller genre.', async () => {
            const response = await request(app).get('/tvshows/thriller');

            expect(response.statusCode).toEqual(200);
            expect(response.headers['content-type']).toContain('application/json');
        });
    });
    
});

describe('/GET Search for movies using Third-Party API through route (/searchMovies/<name of movie>)', () => {
    it('Returns status code 200', async () => {
        const response = await request(app).get('/searchMovies/john');

        expect(response.statusCode).toEqual(200);
        expect(response.headers['content-type']).toContain('application/json');
    })

    it('Returns status code 500 as this search will not return any movies as no movies in the Third-Party API have such a name', async () => {
        const response = await request(app).get('/searchMovies/quz');

        expect(response.statusCode).toEqual(500);
        expect(response.body).toHaveProperty(
            'message',
            'Failed to fetch movie information'
          );
        expect(response.headers['content-type']).toContain('application/json');
    })
})


