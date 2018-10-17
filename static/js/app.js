
(function(){
  const baseUrl ="http://localhost:4001";

  $(document).ready(function(){
    const email = $('form input[type=email]');
    const pwd = $('form input[type=password]');
    const submit = $('form button[type=button]');
    const msg = $('p#msg');

    submit.on('click', sendData);

    /**
    *@desc send Client data to js server via AJAX
    */
    function sendData(){
      if(checkData()){
        let data = {
          email :email.val(),
          pwd :pwd.val()
        };

        fetch(baseUrl + '/users/check',{
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          method:'post',
          body:JSON.stringify(data)

        })
        .then(res => res.text())
        .then(res => msg.text(res))
      }
      else{
        msg.text('Email et/ou mot de passe non conforme au format souhaité!');
      }

    }

    /**
    *@desc check if email && password matches with regexp implemented
    *@return boolean
    */
    function checkData(){
      //Basic french email regexp
      let emailRgxp = /[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+.([a-z_-]){2,8}/;
      let pwdRgxp = /[\w]{8}/;

      let validEmail = emailRgxp.test(email.val());
      let validPassword = pwdRgxp.test(pwd.val())

      return validEmail && validPassword;
    }
  });
})()
