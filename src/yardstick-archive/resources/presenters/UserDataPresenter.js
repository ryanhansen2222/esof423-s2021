const { BasePresenter } = require('edge.js');


class UserDataPresenter extends BasePresenter {


    //Useless function
     async verifyUserId(queryid) {
       //const user = await this.auth.user
       const user = await request.auth.getUser(); // this.auth.user will give you anything you want
       const id = user.id;
       return id;
       //return (id == queryid);
       //const name = user.name
       //console.log(user) // it will console the authenticated user details
    }



}
module.exports = UserDataPresenter

