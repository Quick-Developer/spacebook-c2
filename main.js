var SpacebookApp = function () {
  var posts = [
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]},
    // {text: "Hello world", id: 0, comments:[
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"},
    //   { text: "Man, this is a comment!"}
    // ]}
  ];

  // the current id to assign to a post
  var currentId = 0;
  var currentPostId = 0;
  var $posts = $('.posts');

  var _findPostById = function (id) {
    for (var i = 0; i < posts.length; i += 1) {
      if (posts[i].id === id) {
        return posts[i];
      }
    }
  }

  var createPost = function (text) {
    var post = {
      text: text,
      id: currentId,
      CommentsArr: []
    }
    currentId += 1;
    posts.push(post);
  }

  var renderPost = function () {
         if (posts.length > 0){

      var post = posts[posts.length -1];

      var commentsContainer = '<div class="comments-container" data-id=' + post.id + '>'
        + '<input type="text" class="comment-name">'
        + '<button class="btn btn-primary add-comment">Post Comment</button> </div>';

      $posts.append('<div class="post" data-id=' + post.id + '>'
        + '<a href="#" class="remove">remove</a> ' + '<a href="#" class="show-comments">comments</a> '
        + post.text + commentsContainer + '</div>');
    }
  }

  var removePost = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var id = $clickedPost.data().id;

    var post = _findPostById(id);

    posts.splice(posts.indexOf(post), 1);
    $clickedPost.remove();
  }

  var createComment = function (currentPost, text) {

    var $clickedPost = $(currentPost).closest('.post');
    var postId = $clickedPost.data().id;
    var currentId = 0;
    var len = posts[postId].CommentsArr.length;
    if (len > 0) {
      currentId = (posts[postId].CommentsArr[len - 1].id + 1);
    }

    var Comments = {
      text: text,
      ParentPostId: postId,
      id: currentId
    }

    posts[postId].CommentsArr[currentId] = (Comments);
  }

  var renderComment = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    var postId = $clickedPost.data().id;
    var comments = "";

      var comment = posts[postId].CommentsArr[posts[postId].CommentsArr.length -1];

      comments = comments.concat('<div class="comment" data-id=' + comment.id + '>'
        + '<a href="#" class="remove-comment">remove</a> '
        + comment.text + '</div>');
        $clickedPost.after(comments);
  }

  var removeComment = function (currentComment) {
    var $clickedComment = $(currentComment).parent();//('.post');
    
    $clickedComment.remove();
  }

  var toggleComments = function (currentPost) {
    var $clickedPost = $(currentPost).closest('.post');
    $clickedPost.find('.comments-container').toggleClass('show');
  }

  return {
    createPost: createPost,
    renderPost: renderPost,
    removePost: removePost,

    // TODO: Implement
    createComment: createComment,

    // TODO: Implement
    renderComment: renderComment,

    // TODO: Implement
    removeComment: removeComment,

    toggleComments: toggleComments
  }
}

var app = SpacebookApp();

// immediately invoke the render method
//app.renderPost();

// Events
$('.add-post').on('click', function () {
  var text = $('#post-name').val();

  app.createPost(text);
  app.renderPost();

  $('#post-name').val("");
});

$('.posts').on('click', '.remove', function () {
  app.removePost(this);
});

$('.posts').on('click', '.show-comments', function () {
  app.toggleComments(this);
});

$('body').delegate('.add-comment', 'click', function () {
  var text = jQuery(this).prev().val();

  app.createComment(this, text);
  app.renderComment(this);

  jQuery(this).prev().val("");
  
  app.toggleComments(this);
});

$('body').delegate('.remove-comment', 'click', function () {
  app.removeComment(this);
});