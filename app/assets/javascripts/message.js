$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message__box">
          <div class="message__info">
            <div class="message__info__user__name">
              ${message.user_name}
            </div>
            <div class="message__info__data">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
            <p class="message__text__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="message__box">
        <div class="message__info">
          <div class="message__info__user__name">
            ${message.user_name}
          </div>
          <div class="message__info__data">
            ${message.created_at}
          </div>
        </div>
        <div class="message__text">
          <p class="message__text__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.footer__form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.message').append(html);
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
      $('.submit-btn').prop('disabled', false);
      $('form')[0].reset();
    })
    .fail(function() {
        alert("メッセージ送信に失敗しました");
    });
  });
});