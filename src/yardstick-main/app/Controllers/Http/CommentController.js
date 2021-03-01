'use strict'

class CommentController {
    async index({ view }){
        const comments = [
            {title: 'Post One', Body: 'This is post one.'},
            {title: 'Post Two', Body: 'This is post two.'},
            {title: 'Post Three', Body: 'This is post three.'}
        ]


        return view.render('comments.index', {
            title: 'Latest Comment',
            comments: comments
        })
    }
}

module.exports = CommentController
