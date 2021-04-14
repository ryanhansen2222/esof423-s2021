'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web  . You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Database = use('Database')

Route.get('/videos', 'VideoController.home');

Route.get('/', 'VideoController.base');
Route.on('/home').render('home')
Route.on('/devdoc').render('devdoc')
Route.on('/devdoc/gettingstarted').render('getstarted')

Route.get('/comments', 'CommentController.home');

Route.on('/signup').render('auth.signup');
Route.post('/signup', 'UserController.create').validator('CreateUser');

Route.on('/login').render('auth.login');
Route.post('/login', 'UserController.login').validator('LoginUser');

Route.get('/posts', async () => {
  return await Database.table('comments').select('*')
})

Route.get('/logout', async({ auth, response }) => {
    await auth.logout();
    return response.redirect('/home');
})


Route.get('/post-a-comment', 'CommentController.userIndex');
Route.get('/post-a-comment/delete/:id', 'CommentController.delete');
Route.get('/post-a-comment/edit/:id', 'CommentController.edit');
Route.post('/post-a-comment/update/:id/', 'CommentController.update').validator('CreateComment');
Route.post('/post-a-comment/:id', 'CommentController.create').validator('CreateComment');

Route.get('/post-a-video', 'VideoController.userIndex');
Route.get('/post-a-video/delete/:id', 'VideoController.delete');
Route.get('/post-a-video/edit/:id', 'VideoController.edit');
Route.post('/post-a-video/update/:id', 'VideoController.update');
Route.post('/post-a-video', 'VideoController.create');

Route.get('/watchvideo/:id', 'VideoController.watch');
Route.post('/watchvideo/:id/', 'CommentController.create').validator('CreateComment');
Route.get('/watchvideo/edit/:id', 'CommentController.edit');
Route.post('/watchvideo/update/:id', 'CommentController.update').validator('CreateComment');
Route.get('/watchvideo/like/:id', 'CommentController.like');
Route.get('/watchvideo/dislike/:id', 'CommentController.dislike');
Route.get('/watchvideo/funny/:id', 'CommentController.funny');



