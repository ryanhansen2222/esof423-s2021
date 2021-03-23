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

Route.get('/', 'CommentController.home');

Route.on('/signup').render('auth.signup');
Route.post('/signup', 'UserController.create').validator('CreateUser');

Route.on('/login').render('auth.login');
Route.post('/login', 'UserController.login').validator('LoginUser');

Route.get('/posts', async () => {
  return await Database.table('comments').select('*')
})

Route.get('/logout', async({ auth, response }) => {
    await auth.logout();
    return response.redirect('/');
})


Route.get('/post-a-comment', 'CommentController.userIndex');
Route.get('/post-a-comment/delete/:id', 'CommentController.delete');
Route.get('/post-a-comment/edit/:id', 'CommentController.edit');
Route.post('/post-a-comment/update/:id', 'CommentController.update').validator('CreateComment');
Route.post('/post-a-comment', 'CommentController.create').validator('CreateComment');



