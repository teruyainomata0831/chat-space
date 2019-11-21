$(function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image.url ? `<img src= ${ message.image.url }>` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                <div class="main_center_thread">
                  <div class="main_center_thread_name">
                    ${message.user_name}
                    </div>
                  <div class="main_center_thread_date">
                    ${message.created_at}
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                      </p>
                      </div>
                    </div>
                    ${content}
                    </div>
                    ${img}
                  </p>
                </div>`
  return html;
}
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");
      console.log(last_message_id);
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function (messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          // if (Object.keys(message).length !== 0){}
          insertHTML = buildHTML(message);
          $('.main_center').append(insertHTML);
        })
        $('.main_center').animate({scrollTop: $('.main_center')[0].scrollHeight}, 'fast');
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  }
  setInterval(reloadMessages, 7000);
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = (window.location.href);
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main_center').append(html);
      $('.main_center').animate({scrollTop: $('.main_center')[0].scrollHeight}, 'swing');
      $('#new_message')[0].reset();
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.form__submit').prop('disabled', false);
  })
});
});

