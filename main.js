/*
        A.AJAX & Json
            Make your own interface to create tabs to display usernames by requesting users
            from this API: https://jsonplaceholder.typicode.com/users
            When the user click on one of the username tab display his posts’ titles by
            requesting the clicked user’s post from this link :
            https://jsonplaceholder.typicode.com/posts?userId=userId
            Note: do not request the posts on page load the user must click on a user tab to
            request his posts.
        */

function createUserNameTabs(apiDataArray) {
  var htmlContent = "";
  for (var i = 0; i < apiDataArray.length; i++)
    htmlContent += `<a class='btn btn-danger px-4 py-2' href=https://jsonplaceholder.typicode.com/posts?userId=${apiDataArray[i].id}>${apiDataArray[i].name}</a>`;
  document.getElementsByClassName("tabsArea")[0].innerHTML = htmlContent;
}

function getPosts(
  href = "https://jsonplaceholder.typicode.com/posts?userId=1"
) {
  $.ajax({
    url: href,
    method: "GET",
    success: function (apiDataArray) {
      var htmlContent = "";
      for (var i = 0; i < apiDataArray.length; i++)
        htmlContent += `<p class="text-center p-2 fs-4 border-1 border-bottom border-secondary col-10 mx-auto">${apiDataArray[i].title}</p>`;
      document.getElementsByClassName("postsArea")[0].innerHTML = htmlContent;
    },
  });
}

$.ajax({
  url: "https://jsonplaceholder.typicode.com/users",
  method: "GET",
  success: function (apiData) {
    createUserNameTabs(apiData);

    $($("a")[0]).addClass("active");
    getPosts();
  },
});

$(".tabsArea").on("click", "a", function (event) {
  event.preventDefault();
  $("a").removeClass("active");
  $(this).addClass("active");
  getPosts(this.href);
});
