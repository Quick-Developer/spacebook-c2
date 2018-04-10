
$('.add-post').click(function () {
    createPost($('#post-name').val());
    $('#post-name').val('');
    addedAllposts();
});

$('body').delegate('.remove_post', 'click', function () {
  /*  jQuery.grep(posts, function (value) {
        return value != this;
    }); */
    $(this).closest( 'p').remove();
});
$('body').delegate('.remove_comment', 'click', function () {
    
      $(this).closest( 'form').remove();
  });
$('body').delegate('.comment', 'click', function () {
    $(this).after(addComment());
});


function createPost(postName) {
    var post = {
        text: postName,
        id: guid()
    }
    posts.push(post);
}
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function addedAllposts() {
    $('.posts').append(addElements());
}

function addElements() {
    return "<p class=\"post\" data-id=\"1\">" + posts[posts.length - 1].text 
        + " <button type=\"button\" class=\"btn btn-danger remove_post\">Remove</button> "
        + " <button type=\"button\" class=\"btn btn-secondary comment\">Leave a Comment</button> "
        + "</p>" ;
}
function addComment() {
    return " <form > "
        + " <div class= \"form-group row\"> "
        + "<label class=\"col-sm-2 col-form-label\" for=\"comment_author\" >Your name</label> "
        + " <div class= \"col-sm-10\"> "
        + "<input class=\"form-control\" type=\"text\" name=\"comment_author\"  required=\"required\" placeholder=\"Yuer name\"> "
        + " </div> "
         + " </div> "
        + " <div class= \"form-group row\"> "
        + " <label class=\"col-sm-2 col-form-label\" for=\"FormTextarea\" >Write Your comment </label> "
        + " <div class= \"col-sm-10\"> "
        + " <textarea class=\"form-control\" rows=\"3\" id=\"FormTextarea\" required=\"required\"> </textarea> "
        + " </div> "
        + " <button type=\"button\" class=\"btn btn-danger remove_comment\">Remove</button> "
        + " </div> "
        + " </form> "
}



var posts = [];

