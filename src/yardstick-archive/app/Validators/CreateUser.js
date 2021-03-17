'use strict'

class CreateUser {
  get rules () {
    return {
      // validation rules
      'username': 'required|unique:users',
      'email': 'required|unique:users',
      'password': 'required'
    }
  }

  get messages(){
    return{
      'required': 'Hold on - {{ field }} is required.',
      'unique': '{{ field }} is already in use.'

    }
  }

  async fails(error){
    this.ctx.session.withErrors(error)
      .flashAll();
    return this.ctx.response.redirect('back');
  }
}

module.exports = CreateUser
