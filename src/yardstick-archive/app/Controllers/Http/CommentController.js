'use strict'

const Comment = use('App/Models/Comment')
const Database = use('Database')
const User = use('App/Models/User')

class CommentController {
  async home({view}) {

/*
    //create user
    const test = ((await Database.from('users').getMax('id'))+1).toString();
    const user = new User;
    user.username = ('George' + test);
    user.email = ('fakemail' + test + '@test.com');
    user.password = 'trollslyfe';

    await user.save();

    //create a comment
    const comment = new Comment;
    comment.text = 'Dynamic Comment Testing BABYYYY';
    comment.video_id = '1';
    comment.user_id = test;

    await comment.save();
*/


    // Fetch all comments
    const comments = await Comment.all();
     //const comments = await Database.from('comments').paginate(1,10);
    //Find Username + Video Name
    //name = await Database
    var rawjson = comments.toJSON();
    var packagedjson = rawjson;


    for(let comm in rawjson){
        var username = await Database.table('users').where('id', rawjson[comm].id).pluck('username');

        packagedjson[comm].username = username;

    }


    const dict = {comments: packagedjson};




    return view.render('index', dict);
  }
}

module.exports = CommentController
