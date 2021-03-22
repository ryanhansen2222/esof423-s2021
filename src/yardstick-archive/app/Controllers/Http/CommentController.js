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
        var username = await Database.table('users').where('id', rawjson[comm].user_id).pluck('username');

        packagedjson[comm].username = username;

    }


    const dict = {comments: packagedjson};




    return view.render('index', dict);
  }


  async userIndex({view, auth}) {
    const comments = await auth.user.comments().fetch();

        var rawjson = comments.toJSON();
        var packagedjson = rawjson;


        for(let comm in rawjson){
            //var id = comm.id;
            var username = await Database.table('users').where('id', rawjson[comm].user_id).pluck('username');
            //var username = 'noobnoob';
            packagedjson[comm].username = username;

        }


        const dict = {comments: packagedjson};

    return view.render('comments', dict);

  }

  async create({ request, response, session, auth }) {
    const comment = request.all();

    const posted = await auth.user.comments().create({
      text: comment.text,
      user_id: comment.user_id,
      video_id: comment.video_id,

    })

    session.flash({ message: 'Your Comment has been posted' });
    return response.redirect('back');


  }


  async delete({ response, session, params}) {
    const comment = await Comment.find(params.id);

    await comment.delete();
    session.flash({ message: 'Comment deleted'});
    return response.redirect('back');

  }

  async edit({params, view}) {
    const comment = await Comment.find(params.id);
    return view.render('edit', {comment: comment});
  }

    async update ({ response, request, session, params }) {
    const comment = await Comment.find(params.id);

        comment.text = request.all().text;


        await comment.save();

        session.flash({ message: 'Your comment has been updated. '});
        return response.redirect('/post-a-comment');
    }


}

module.exports = CommentController