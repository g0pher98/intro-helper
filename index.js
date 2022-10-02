/*
 * index.js
 * ----
 * 메인 코드.
 * card.js가 먼저 로드되어야 함.
 *
 * TODO
 * ----
 * 1. history 기능
 * 2. history diff 기능
 * 3. 문법 검사
 * 4. 다크모드
 */

const NOTICE_CODE = `
<div class="notice">
    {message}
</div>
`

function notice(message) {
    var code = NOTICE_CODE.replace('{message}', message);
    var $notice = $(code);

    $(document.body).append($notice);
    setTimeout(function() {
        $notice.remove();
    }, 3200)
}

$(function() {
    $('[data-toggle="tooltip"]').tooltip() // 툴팁 활성화
    
    // 마지막 저장 데이터 불러오기
    var init_data = load();
    set_all_card_data(init_data, $('.card-list')[0]);

    // 단축키 세팅
    $(document).on('keydown', event => {
        if (event.ctrlKey) {
            if (event.key.toLowerCase() === 's') {
                // ctrl + s
                event.preventDefault();
                if ($('input').length > 0) {
                    alert("모든 설정을 완료해주세요");
                    $('input').focus();
                    return;
                }
                var data = get_all_card_data();
                save(data);
                alert("저장되었습니다");
            } else if (event.key.toLowerCase() === 'h') {
                // ctrl + h
                event.preventDefault();
                var data = load();
                view_card_history(data);
            }
        }
    });

    // 양식 추가 버튼(+) 클릭 이벤트
    $('.btn.add').on('click', event => {
        add_card();
    })
})