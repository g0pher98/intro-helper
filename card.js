/*
 * card.js
 * ----
 * 카드를 다루는 코드.
 * storage.js가 먼저 로드되어야 함.
 * 
 */

let CARD_FORM_BEFORE = `
<div class="card">
    <div class="card-header">
        <input class="form-control" type="text" placeholder="자기소개서 질문을 기입하세요" />
    </div>
    <div class="card-body">
        <textarea class="form-control" placeholder="내용을 입력하세요"></textarea>
    </div>
    <div class="card-footer text-muted">
        <span class="cur-len">0</span>/<input type="number" class="form-control" value="500" /> 자
    </div>
</div>`;

let CARD_FORM_AFTER = `
<div class="card">
    <div class="card-header">
        <span data-toggle="tooltip" data-placement="top" title="더블클릭하여 수정"></span>
    </div>
    <div class="card-body">
        <textarea class="form-control" placeholder="내용을 입력하세요"></textarea>
    </div>
    <div class="card-footer text-muted">
        <span class="cur-len">0</span>/<span class="max-len" data-toggle="tooltip" data-placement="bottom" title="더블클릭하여 수정"></span> 자
    </div>
</div>`;

function add_card() {
    /* 새 카드 추가하기 */
    var $card = $(CARD_FORM_BEFORE);
    $('.card:last').after($card);
    $('.card:last input:first').focus();
}

function get_all_card_data() {
    /* 현재 모든 데이터 가져오기 */
    var data = $('.card').map(function(i, card) {
        var $card = $(card);
        return {
            Q: $card.find('.card-header span').text(),
            A: $card.find('.card-body textarea').val(),
            L: $card.find('.card-footer .max-len').text()
        };
    });

    return data;
}

function set_all_card_data(data, container_element) {
    /* 데이터를 기반으로 화면 구성 */
    console.log(data);
    
    if (data) {
        var last_status_data = data.slice(-1)[0];
        console.log(last_status_data);
        container_element.innerHTML = '';
        for (var i = 0; i < last_status_data.length; i++) {
            var card_data = last_status_data[i]
            var $card = $(CARD_FORM_AFTER);
            $card.find('.card-header span').text(card_data.Q),
            $card.find('.card-body textarea').val(card_data.A),
            $card.find('.card-footer .max-len').text(card_data.L)
            content_length_counter($card);
            $(container_element).append($card);
        }
    }
}

function view_card_history(data) {
    /* 과거 저장했던 데이터를 볼 수 있는 화면 구성 */
    console.log(data);

    /*
    var data = $('.card').map(function(i, card) {
        var $card = $(card);
        return {
            Q: $card.find('.card-header span').text(),
            A: $card.find('.card-body textarea').val(),
            L: $card.find('.card-footer .max-len').text()
        };
    });*/

    return data;
}

function span2input(span, options) {
    var $span = $(span);
    var $input = $(`<input class="form-control" ${options? options:''}/>`);
    $input.val($span.text());
    $span.after($input);
    $span.remove();
    $input.focus();
}

function input2span(input, options) {
    var $input = $(input);
    if ($input.val().length == 0)
        return;
    var $span = $(`<span ${options? options:''}></span>`);
    $span.text($input.val());
    $input.after($span);
    $input.remove();
}

function content_length_counter(card_element){
    /* 글자수 세는 함수 */
    var $card = $(card_element);
    var cur_length = $card.find('textarea').val().length;
    var max_length = Number($card.find('span.max-len').text());

    var $cur_len_tag = $card.find('span.cur-len');
    $cur_len_tag.text(cur_length);
    if (cur_length > max_length) {
        $cur_len_tag.addClass('length-over');
    } else {
        $cur_len_tag.removeClass('length-over');
    }
}

$(function() {
    // 인풋 창에서 엔터 누르면 다른 input 또는 textarea로 focus
    $(document).on('keydown', '.card input', event => {
        // 입력 완료 시 고정 (엔터)
        if (event.keyCode == 13) {
            event.preventDefault();
            var $card = $(event.target.offsetParent);
            var $input_list = $card.find('input');
            if ($input_list.length > 1) {
                $input_list.focus();
            } else {
                $card.find('textarea').focus();
            }
        }
    });

    // =================================
    // 글자수 세기 & 최대 글자수 검사
    // =================================
    $(document).on('keyup', '.card textarea', event => {
        content_length_counter(event.target.offsetParent);
    });

    // =================================
    // 자소서 질문 설정
    // =================================
    $(document).on('focusout', '.card-header input', event => {
        // 입력 완료 시 고정 (다른 곳 클릭)
        var options = `data-toggle="tooltip" data-placement="top" title="더블클릭하여 수정" `;
        input2span(event.target, options);
    });
    $(document).on('dblclick', '.card-header span', event => {
        // 더블클릭 시 수정
        var options = `type="text" placeholder="자기소개서 질문을 기입하세요" `;
        span2input(event.target, options);
    });

    // =================================
    // 자소서 최대 글자수 설정
    // =================================
    $(document).on('focusout', '.card-footer input', event => {
        // 입력 완료 시 고정 (다른 곳 클릭)
        var options = `class="max-len" `;
        options += `data-toggle="tooltip" data-placement="bottom" title="더블클릭하여 수정" `;
        input2span(event.target, options);
    });
    $(document).on('dblclick', '.card-footer span.max-len', event => {
        // 더블클릭 시 수정
        var options = `type="number" `;
        span2input(event.target, options);
    });

})