'use strict'

class CreateComment {
  get rules () {
    return {
      // validation rules
      text: 'required'
    }
  }


  get messages () {
      return {
          'required': 'Please enter some {{field}} dawg'
      }
  }

  async fails(error) {
      this.ctx.session.withErrors(error)
        .flashAll();

      return this.ctx.response.redirect('back');
  }

}

module.exports = CreateComment
