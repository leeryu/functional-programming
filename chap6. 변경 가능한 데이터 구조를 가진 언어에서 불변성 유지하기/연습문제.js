'use strict';

// 아래는 메일링 리스트에 연락처를 추가하는 코드입니다.
// 이메일 주소를 전역변수인 리스트에 추가합니다.
// 입력 폼을 처리하는 핸들러에서 이 동작을 부릅니다.

var mailing_list = [];
// 연습문제 1
{
  function add_contact(email) {
    mailing_list.push(email);
  }

  function submit_form_handler(event) {
    var form = event.target;
    var email = form.elements['email'].value;
    add_contact(email);
  }
}
// refactoring code
// copy-on-write
{
  function add_contact(mailList, email) {
    const list_copy = mailList.slice();
    list_copy.push(email);

    return list_copy;
  }

  function submit_form_handler(event) {
    var form = event.target;
    var email = form.elements['email'].value;
    mailing_list = add_contact(mailing_list, email);
  }
}
