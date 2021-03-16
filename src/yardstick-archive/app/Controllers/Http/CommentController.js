'use strict'

const Comment = use('App/Models/Comment')

class CommentController {
  async home({view}) {
    //create a comments
    const comment = new Comment;
    comment.text = 'Trollolol';
    comment.video_id = '1';
    comment.user_id = '2';

    await comment.save();

    // Fetch all comment
    const comments = await Comment.all();


    return view.render('index', {comments: comments.toJSON() });
  }
}

module.exports = CommentController
