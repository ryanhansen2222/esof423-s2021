'use strict'

const Comment = use('App/Models/Comment')
const Database = use('Database')
const User = use('App/Models/User')
const Video = use('App/Models/Video')

class CommentController {
  async home({request, view}) {

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
    //const comments = await Comment.all();

    //const page = await Database.from('comments').paginate(1,10);
    const page = request.input('page',1);
    const limit = 10;
    const comments = await Comment.query().paginate(page, limit);
    return view.render('index', { comments: comments.toJSON() });

    /*
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
    */



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

  async create({ request, response, session, auth, params }) {

    const comment = request.all();

    const posted = await auth.user.comments().create({
      text: comment.text,
      user_id: comment.user_id,
      video_id: params.id,
      likes: 0,

    })

    session.flash({ message: 'Your Comment has been posted' });
    return response.redirect('back');


  }

// delete comment call
  async delete({ response, session, params}) {
    const comment = await Comment.find(params.id);

    await comment.delete();
    session.flash({ message: 'Comment deleted'});
    return response.redirect('back');

  }

  async edit({params, view}) {
    const comment = await Comment.find(params.id);
    //const video = await Video.find(params.video_id);
    var dict = {comment: comment, video: params.video_id};

    return view.render('edit', dict);
  }

    async update ({ response, request, session, params }) {
    const comment = await Comment.find(params.id);

        comment.text = request.all().text;


        await comment.save();

        session.flash({ message: 'Your comment has been updated. '});
        //return response.route('VideoController.watch', { id: params.video_id });
        return response.redirect('back');
    }

        async like ({ response, request, session, params }) {
        const comment = await Comment.find(params.id);

            comment.likes = comment.likes + 1;


            await comment.save();

            //return response.route('VideoController.watch', { id: params.video_id });
            return response.redirect('back');
        }


}

module.exports = CommentController
