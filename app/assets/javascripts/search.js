$(document).on('turbolinks:load',function(){
  $(function(){
    var memberlist = [];
    function buildHTML(users){
      var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${users.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${users.id}" data-user-name="${users.name}">追加</a>
                </div>`
      return html;
    }
    function appendNot(users){
      var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${users.name}</p>
                  </div>`
      return html;
    }
    function addUser(id,name){
      var memberlist = $('#chat-group-form__memberlist');
      var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                  </div>` 
      memberlist.append(html)
    }
    $(".chat-group-form__input").on("keyup", function(){
      var input = $("#user-search-field").val();
      $.ajax({
        url: '/users',
        type: 'GET',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
      $("#user-search-result").empty()
      if (users.length !== 0) {
        users.forEach(function(user){
        var html = buildHTML(user)
          $(`#user-search-result`).append(html)
        })
      }
      else {
        var html = appendNot("一致するワードがありません");
        $(`#user-search-result`).append(html);
      }
      })
      .fail(function() {
        alert('検索に失敗しました');
    })
    });

    $(document).on("click",".user-search-add", function(users){
        var id = $(this).data('user-id');
        var name = $(this).data("user-name");
        addUser(id,name);
        $(this).parent().remove();
    })

    $(document).on("click",".user-search-remove",function(users){
      $(this).parent().remove();
  })
})
})
