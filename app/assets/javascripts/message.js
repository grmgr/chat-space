$(document).on('turbolinks:load', function() {
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : ``;
    var img = (message.image) ? `<img src= "${ message.image }">` : ``;
    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <p class="upper-message__username">
                      ${message.user_name}
                    </p>
                    <p class="upper-message__date">
                      ${message.date}
                    </p>
                  </div>
                  <div class="sub-message">
                    <p class="sub-message__content">
                      ${content}
                    </p>
                      ${img}
                  </div>ß
                </div>`
  return html;
  }

  // メッセージ送信非同期
  $('#new_message').on('submit', function(e){
    e.preventDefault();

    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
        var target = $('.message').last();
        var position = target.offset().top + $('.messages').scrollTop();
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('メッセージを入力してください')
      $('.form__submit').prop('disabled', false);
    })
  })

  // 自動更新
  $(function(){
    var reloadMessages = function () {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.message:last').data("message-id");
        // var group_id = $(".group").data("group-id");
        console.log(last_message_id); 

        $.ajax({ 
          url: "api/messages", 
          type: 'get', 
          dataType: 'json', 
          data: {last_id: last_message_id} 
        })
        .done(function (messages) { 
          // console.log(messages);
          var insertHTML = '';
          if(messages.length != 0){
            messages.forEach(function (message) {
            insertHTML = buildHTML(message); 
            $('.messages').append(insertHTML);
          })
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
        }
        })
        .fail(function () {
          // console.log('error');
          alert('自動更新に失敗しました');
        });
      };
    };
    setInterval(reloadMessages, 5000);
  });
})