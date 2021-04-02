'use strict'

const Comment = use('App/Models/Comment')
const Video = use('App/Models/Video')
const Database = use('Database')
const User = use('App/Models/User')

class VideoController {

  async base ({request, view}){
    return view.render('home')


  }

  async home({request, view}) {

      const page = request.input('page',1);
      const limit = 10;
      const videos = await Video.query().paginate(page, limit);


      //Add .username to videos.data

      var rawjson = videos.toJSON();
      var packagedjson = rawjson;


      for(let video in rawjson.data){
          var username = await Database.table('users').where('id', rawjson.data[video].user_id).pluck('username');
          packagedjson.data[video].username = username;

      }


      const dict = {videos: packagedjson};

      return view.render('index', dict);

  }


 async userIndex({view, auth}) {
    const videos = await auth.user.videos().fetch();

        var rawjson = videos.toJSON();
        var packagedjson = rawjson;


        for(let comm in rawjson){
            //var id = comm.id;
            var username = await Database.table('users').where('id', rawjson[comm].user_id).pluck('username');
            //var username = 'noobnoob';
            packagedjson[comm].username = username;

        }


        const dict = {videos: packagedjson};

    return view.render('myvideos', dict);

  }

  async create({ request, response, session, auth }) {
    const video = request.all();

    const posted = await auth.user.videos().create({
      title: video.title,
      url: 'watchvideo',
      description: video.description,
      user_id: video.user_id,

    })

    session.flash({ message: 'Your Video has been posted' });
    return response.redirect('back');


  }


  async delete({ response, session, params}) {
    const video = await Video.find(params.id);

    await video.delete();
    session.flash({ message: 'Video deleted'});
    return response.redirect('back');

  }

  async edit({params, view}) {
    const video = await Video.find(params.id);
    return view.render('edit', {video: video});
  }

    async update ({ response, request, session, params }) {
    const video = await Video.find(params.id);

        video.text = request.all().text;


        await video.save();

        session.flash({ message: 'Your video has been updated. '});
        return response.redirect('/post-a-video');
    }

    async watch({request, view, params}) {


             const page = request.input('page',1);
             const video_id = params.id;
              const limit = 10;
              const comments = await Comment.query().where('video_id',video_id).paginate(page, limit);

              //const video = await Database.table('videos').where('id',video_id);
              const video = await Video.findOrFail(video_id);
              const videodata = video.toJSON();

              //Add .username to comments.data

        var rawjson = comments.toJSON();
        var packagedjson = rawjson;


        for(let comm in rawjson.data){
            var username = await Database.table('users').where('id', rawjson.data[comm].user_id).pluck('username');
            packagedjson.data[comm].username = username;

        }


        const commentdict = {comments: packagedjson};
        //const data = yield response.view('watchvideo', dict);

        videodata.author = await Database.table('users').where('id', videodata.user_id).pluck('username');
        var videodict = {video: videodata};

        await view.render('watchvideo', commentdict);
        await view.render('watchvideo', videodict);
        //return videodict;


    //var pagename = 'watchvideo/' + params.id;
    return view.render('watchvideo', video_id);
    //return view.render('watchvideo', params.id);
    //return view.render(pagename);


    }



}

module.exports = VideoController
