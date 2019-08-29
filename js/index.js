function populateLoggedInBox() {
  const user = window.localStorage.getItem('loggedIn');
  if(user !== null && user !== undefined && user !== 'null') { // logged in
    const string = window.localStorage.getItem(user);
    const data = JSON.parse(string);
    let boxStringHTML = "";

    data.badWords.reverse().forEach((site)=>{
      const title = site.title;
      const url = site.url;
      const counter = site.counter;
      const time = site.time;
      let counterClass = "";
      if(counter > 5) {
        counterClass = 'danger';
      } else if(counter > 3) {
        counterClass = 'warning';
      }
      const html = `<div class="list ${counterClass}"><div class='title'><a href="${url}">${title}</a></div><div class="counter"><p>${counter}</p></div><div>${time}</div></div>\n`;
      boxStringHTML += html;
    });

    const loggedInString = `<div id=\"loggedIn\"><div id=\"linkBox\">${boxStringHTML}</div><div class=\"toRight\"><input placeholder="password required to logout..." type="password" id="logoutPassword" required/><button id=\"logout\">Logout</button></div></div>`;
    $('body').append(loggedInString);
  } else {
    const formString = "<form id=\"signUpForm\">\n    <input class=\"input\" type=\"email\" name=\"email\" placeholder=\"Email\" required>\n    <input class=\"input\" type=\"text\" name=\"username\" placeholder=\"Username\" required />\n    <input class=\"input\" type=\"password\" name=\"password\" placeholder=\"Password\" required />\n    <input class=\"submit\" type=\"submit\" placeholder=\"Sign up\" />\n</form>";
    $('body').append(formString);
  }
}
$(function() {
  populateLoggedInBox();
  $("#signUpForm").submit(function(event) {
    event.preventDefault();
    const username = $('[name=username]').val();
    const email = $('[name=email]').val();
    const password = $('[name=password]').val();
    $('[name=username]').val("");
    $('[name=email]').val("");
    $('[name=password]').val("");

    const user = window.localStorage.getItem(username);
    if(!user) {
      const saveThis = {
        username,
        password,
        email,
        badWords: []
      };
      window.localStorage.setItem(username, JSON.stringify(saveThis))
    }
    window.localStorage.setItem('loggedIn', username);

    $('#signUpForm').remove();
    populateLoggedInBox();
  });

  $("#logout").on("click", function() {
    const pass = $('#logoutPassword').val();
    if(pass.length <= 0) {
      alert('need password to logout');
    }
    const user = window.localStorage.getItem('loggedIn');
    if(!user) {
      alert('logged out!');
      return;
    }
    const string = window.localStorage.getItem(user);
    const data = JSON.parse(string);
    if(data.password !== pass) {
      alert('invalid password!');
      return;
    }
    window.localStorage.removeItem('loggedIn');
    $('#loggedIn').remove();
    populateLoggedInBox();
  });
});