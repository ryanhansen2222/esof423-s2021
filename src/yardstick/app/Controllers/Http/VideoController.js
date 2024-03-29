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

      return view.render('videos', dict);

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

    video.url = "https://www.youtube.com/embed/" + (request.all().url).slice(32,43);
    const posted = await auth.user.videos().create({
      title: video.title,
      url: video.url,
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
    await view.render('editvideo', {video: video.toJSON()});
    //return video;
    return view.render('editvideo', params.id);
  }

    async update ({ response, request, session, params }) {
    const video = await Video.find(params.id);

        video.title = request.all().title;
        video.description = request.all().description;



        await video.save();

        session.flash({ message: 'Your video has been updated. '});
        return response.redirect('/post-a-video');
    }

    async watch({request, response, view, params}) {



             const page = request.input('page',1);
             const video_id = params.id;
              const limit = 10;
              const comments = await Comment.query().where('video_id',video_id).paginate(page, limit);

              //const video = await Database.table('videos').where('id',video_id);

              const video = await Video.find(video_id);
              const videodata = video.toJSON();




              //Add .username to comments.data

        var rawjson = comments.toJSON();
        var packagedjson = rawjson;


        for(let comm in rawjson.data){
            var username = await Database.table('users').where('id', rawjson.data[comm].user_id).pluck('username');
            packagedjson.data[comm].username = username;

        }


        const commentdict = {comments: packagedjson};

        videodata.author = await Database.table('users').where('id', videodata.user_id).pluck('username');
        var videodict = {video: videodata};

        //return view.render('home');


        await view.render('watchvideo', videodict);
        await view.render('watchvideo', commentdict);
        //return commentdict;


    //var pagename = 'watchvideo/' + params.id;
    return view.render('watchvideo', video_id);
    //return view.render('watchvideo', params.id);
    //return view.render(pagename);


    }



}

module.exports = VideoController
