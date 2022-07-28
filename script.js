var dark_mode_toggle = document.querySelector('#dark_mode_toggle_id');

var color_var = document.querySelector(':root');

dark_mode_toggle.addEventListener('click', function () {
    if (dark_mode_toggle.checked) {
        color_var.style.setProperty('--background_color', 'black');
        color_var.style.setProperty('--text_color', 'white');
        color_var.style.setProperty('--bg_1', 'white');
        color_var.style.setProperty('--fg_1', '#2196F3');
    }
    else {
        color_var.style.setProperty('--background_color', 'white');
        color_var.style.setProperty('--text_color', 'black');
        color_var.style.setProperty('--bg_1', '#868686');
        color_var.style.setProperty('--fg_1', 'black');
    }
});

var quiz_app_question_title = document.querySelector('#quiz_app_question_title');
var quiz_app_question_option_1 = document.querySelector("#quiz_app_question_option_1");
var quiz_app_question_option_2 = document.querySelector("#quiz_app_question_option_2");
var quiz_app_question_option_3 = document.querySelector("#quiz_app_question_option_3");
var quiz_app_question_option_4 = document.querySelector("#quiz_app_question_option_4");
var quiz_app_input = document.querySelector('#quiz_app_input');
var quiz_app_question_navigator_sub_box = document.querySelector(".quiz_app_question_navigator_sub_box");

var quiz_marks = 0;
var question_index = 0;
var question_length = 0;
var selected_anser = "";
var question_anser_array = [];
var selected_anser_array = [];
var option_1 = "";
var option_2 = "";
var option_3 = "";
var option_4 = "";
var move_id;

quiz_app_question_option_1.addEventListener('click', function () {
    selected_anser = quiz_app_question_option_1.innerHTML;
    selected_anser = selected_anser.split("A. ");
    selected_anser = selected_anser[1];
    quiz_app_question_option_1.classList.add("active");
    quiz_app_question_option_2.classList.remove("active");
    quiz_app_question_option_3.classList.remove("active");
    quiz_app_question_option_4.classList.remove("active");
    add_selected_option()
})
quiz_app_question_option_2.addEventListener('click', function () {
    selected_anser = quiz_app_question_option_2.innerHTML;
    selected_anser = selected_anser.split("B. ");
    selected_anser = selected_anser[1];
    quiz_app_question_option_1.classList.remove("active");
    quiz_app_question_option_2.classList.add("active");
    quiz_app_question_option_3.classList.remove("active");
    quiz_app_question_option_4.classList.remove("active");
    add_selected_option()
})
quiz_app_question_option_3.addEventListener('click', function () {
    selected_anser = quiz_app_question_option_3.innerHTML;
    selected_anser = selected_anser.split("C. ");
    selected_anser = selected_anser[1];
    quiz_app_question_option_1.classList.remove("active");
    quiz_app_question_option_2.classList.remove("active");
    quiz_app_question_option_3.classList.add("active");
    quiz_app_question_option_4.classList.remove("active");
    add_selected_option()
})
quiz_app_question_option_4.addEventListener('click', function () {
    selected_anser = quiz_app_question_option_4.innerHTML;
    selected_anser = selected_anser.split("D. ");
    selected_anser = selected_anser[1];
    quiz_app_question_option_1.classList.remove("active");
    quiz_app_question_option_2.classList.remove("active");
    quiz_app_question_option_3.classList.remove("active");
    quiz_app_question_option_4.classList.add("active");
    add_selected_option()
})

function add_selected_option() {
    selected_anser_array[question_index] = selected_anser;
}

fetch("quiz_question.json").then(response => response.json()).then(data => {
    question_length = data.questions.length;
})

var quiz_app_quiz_next_btn = document.querySelector(".quiz_app_quiz_next_btn");
var quiz_app_quiz_previous_btn = document.querySelector(".quiz_app_quiz_previous_btn");
var quiz_app_quiz_fines_btn = document.querySelector(".quiz_app_quiz_fines_btn");

var quiz_app_quiz_start_btn = document.querySelector(".quiz_app_quiz_start_btn");

var quiz_app_score_box = document.querySelector(".quiz_app_score_box");

var quiz_app_score_box_name_title = document.querySelector(".quiz_app_score_box_name_title");
var quiz_app_score_box_score_title = document.querySelector(".quiz_app_score_box_score_title");
var quiz_app_score_box_time_title = document.querySelector(".quiz_app_score_box_time_title");

var quiz_app_question_option = document.querySelectorAll(".quiz_app_question_option");
var quiz_app_quiz_try_again_btn = document.querySelector(".quiz_app_quiz_try_again_btn");
var quiz_app_question_navigator_box = document.querySelector(".quiz_app_question_navigator_box");
var quiz_app_quiz_timer = document.querySelector(".quiz_app_quiz_timer");


var time_left = 300;
var minutes;
var seconds;
var timer_id;

function padtodigit(num) {
    return num.toString().padStart(2, '0');
}

function set_timer() {
    time_left = 300;
    minutes;
    seconds;
    timer_id = setInterval(function () {
        if (time_left == -1) {
            clearInterval(timer_id);
            fines();
        }
        else {
            minutes = Math.floor(time_left / 60);
            seconds = time_left % 60;
            quiz_app_quiz_timer.innerHTML = padtodigit(minutes) + ":" + padtodigit(seconds);
            time_left--;
        }
    }, 1000)
}


quiz_app_quiz_next_btn.addEventListener('click', function () {
    question_index = question_index + 1;
    check_index()
    if ((question_index) == (question_length)) { }
    else {
        quiz_app_quiz_previous_btn.style.display = 'block';
        load_question()
        setTimeout(function () {
            option_1 = quiz_app_question_option_1.innerHTML;
            option_1 = option_1.split("A. ");
            option_1 = option_1[1];

            option_2 = quiz_app_question_option_2.innerHTML;
            option_2 = option_2.split("B. ");
            option_2 = option_2[1];

            option_3 = quiz_app_question_option_3.innerHTML;
            option_3 = option_3.split("C. ");
            option_3 = option_3[1];

            option_4 = quiz_app_question_option_4.innerHTML;
            option_4 = option_4.split("D. ");
            option_4 = option_4[1];

            if (option_1 == selected_anser_array[question_index]) {
                quiz_app_question_option_1.classList.add("active");
                quiz_app_question_option_2.classList.remove("active");
                quiz_app_question_option_3.classList.remove("active");
                quiz_app_question_option_4.classList.remove("active");
            }
            else if (option_2 == selected_anser_array[question_index]) {
                quiz_app_question_option_1.classList.remove("active");
                quiz_app_question_option_2.classList.add("active");
                quiz_app_question_option_3.classList.remove("active");
                quiz_app_question_option_4.classList.remove("active");
            }
            else if (option_3 == selected_anser_array[question_index]) {
                quiz_app_question_option_1.classList.remove("active");
                quiz_app_question_option_2.classList.remove("active");
                quiz_app_question_option_3.classList.add("active");
                quiz_app_question_option_4.classList.remove("active");
            }
            else if (option_4 == selected_anser_array[question_index]) {
                quiz_app_question_option_1.classList.remove("active");
                quiz_app_question_option_2.classList.remove("active");
                quiz_app_question_option_3.classList.remove("active");
                quiz_app_question_option_4.classList.add("active");
            }
        }, 20)

    }
    quiz_app_question_option_1.classList.remove("active");
    quiz_app_question_option_2.classList.remove("active");
    quiz_app_question_option_3.classList.remove("active");
    quiz_app_question_option_4.classList.remove("active");

})

quiz_app_quiz_previous_btn.addEventListener('click', function () {
    if (question_index <= 0) {
        quiz_app_quiz_previous_btn.style.display = 'none';
    }
    else {
        question_index = question_index - 1;
        quiz_app_quiz_next_btn.style.display = 'block';
        quiz_app_quiz_fines_btn.style.display = 'none';
        load_question()

        setTimeout(function () {
            option_1 = quiz_app_question_option_1.innerHTML;
            option_1 = option_1.split("A. ");
            option_1 = option_1[1];

            option_2 = quiz_app_question_option_2.innerHTML;
            option_2 = option_2.split("B. ");
            option_2 = option_2[1];

            option_3 = quiz_app_question_option_3.innerHTML;
            option_3 = option_3.split("C. ");
            option_3 = option_3[1];

            option_4 = quiz_app_question_option_4.innerHTML;
            option_4 = option_4.split("D. ");
            option_4 = option_4[1];

            if (option_1 == selected_anser_array[question_index]) {
                quiz_app_question_option_1.classList.add("active");
                quiz_app_question_option_2.classList.remove("active");
                quiz_app_question_option_3.classList.remove("active");
                quiz_app_question_option_4.classList.remove("active");
            }
            else if (option_2 == selected_anser_array[question_index]) {
                quiz_app_question_option_1.classList.remove("active");
                quiz_app_question_option_2.classList.add("active");
                quiz_app_question_option_3.classList.remove("active");
                quiz_app_question_option_4.classList.remove("active");
            }
            else if (option_3 == selected_anser_array[question_index]) {
                quiz_app_question_option_1.classList.remove("active");
                quiz_app_question_option_2.classList.remove("active");
                quiz_app_question_option_3.classList.add("active");
                quiz_app_question_option_4.classList.remove("active");
            }
            else if (option_4 == selected_anser_array[question_index]) {
                quiz_app_question_option_1.classList.remove("active");
                quiz_app_question_option_2.classList.remove("active");
                quiz_app_question_option_3.classList.remove("active");
                quiz_app_question_option_4.classList.add("active");
            }
        }, 20)


    }
    quiz_app_question_option_1.classList.remove("active");
    quiz_app_question_option_2.classList.remove("active");
    quiz_app_question_option_3.classList.remove("active");
    quiz_app_question_option_4.classList.remove("active");

})

function load_question() {
    fetch("quiz_question.json").then(response => response.json()).then(data => {
        quiz_app_question_title.innerHTML = "Q " + (question_index + 1) + ". " + data.questions[question_index].question;
        quiz_app_question_option_1.innerHTML = "A. " + data.questions[question_index].option_1;
        quiz_app_question_option_2.innerHTML = "B. " + data.questions[question_index].option_2;
        quiz_app_question_option_3.innerHTML = "C. " + data.questions[question_index].option_3;
        quiz_app_question_option_4.innerHTML = "D. " + data.questions[question_index].option_4;
        question_anser_array[question_index] = data.questions[question_index].answer;
        if (question_index <= 0) {
            quiz_app_quiz_previous_btn.style.display = 'none';
        }
    })
}
load_question();

function fines () {
    quiz_marks = 0;
    for (let i = 0; i < question_length; i++) {

        if (question_anser_array[i] == selected_anser_array[i] && question_anser_array[i] != undefined && selected_anser_array[i] != undefined) {
            quiz_marks = quiz_marks + 1;
        }
    }
    quiz_app_quiz_try_again_btn.style.display = "block";
    quiz_app_quiz_previous_btn.style.display = 'none';
    quiz_app_quiz_fines_btn.style.display = 'none';
    quiz_app_question_navigator_box.style.display = 'none';

    quiz_app_score_box.style.display = "block";

    quiz_app_question_title.style.display = "none";
    quiz_app_question_option[0].style.display = "none";
    quiz_app_question_option[1].style.display = "none";
    quiz_app_question_option[2].style.display = "none";
    quiz_app_question_option[3].style.display = "none";

    quiz_app_quiz_timer.style.display = "none";
    clearInterval(timer_id);

    quiz_app_score_box_name_title.innerHTML = "Name  : " + quiz_app_input.value;
    quiz_app_score_box_score_title.innerHTML = "Score : " + quiz_marks;
    quiz_app_score_box_time_title.innerHTML = "Time  : " + padtodigit(minutes) + ":" + padtodigit(seconds);

}

quiz_app_quiz_fines_btn.addEventListener('click',fines);

quiz_app_quiz_try_again_btn.addEventListener('click', function () {
    set_timer();
    quiz_app_score_box.style.display = "none";
    quiz_app_question_title.style.display = "block";
    quiz_app_question_option[0].style.display = "block";
    quiz_app_question_option[1].style.display = "block";
    quiz_app_question_option[2].style.display = "block";
    quiz_app_question_option[3].style.display = "block";

    quiz_app_quiz_try_again_btn.style.display = "none";
    quiz_app_quiz_previous_btn.style.display = 'none';
    quiz_app_quiz_fines_btn.style.display = 'none';
    quiz_app_question_navigator_box.style.display = 'block';
    quiz_app_quiz_previous_btn.style.display = 'block';
    quiz_app_quiz_timer.style.display = "block";
    move_id = 0;
    question_index = 0;
    selected_anser = "";
    question_anser_array = [];
    selected_anser_array = [];
    quiz_app_question_option_1.classList.remove("active");
    quiz_app_question_option_2.classList.remove("active");
    quiz_app_question_option_3.classList.remove("active");
    quiz_app_question_option_4.classList.remove("active");
    load_question();
})


function check_index() {
    if (question_index == question_length - 1) {
        quiz_app_quiz_next_btn.style.display = 'none';
        quiz_app_quiz_fines_btn.style.display = 'block';
    }
}
function navbar_loader() {
    fetch("quiz_question.json").then(response => response.json()).then(data => {
        for (let i = 0; i < data.questions.length; i++) {
            var first_div = document.createElement("div");
            var second_div = document.createElement("div");
            first_div.className = "quiz_app_question_navigator_btn_box";
            first_div.id = (i + 1)
            second_div.className = "quiz_app_question_navigator_btn";
            second_div.innerHTML = (i + 1);
            first_div.appendChild(second_div);
            quiz_app_question_navigator_sub_box.append(first_div);
        }
    })
    check_navbar_loader()

}
navbar_loader()

function check_navbar_loader() {
    setTimeout(function () {
        var quiz_app_question_navigator_btn_box = document.querySelectorAll(".quiz_app_question_navigator_btn_box");

        for (let i = 0; i < quiz_app_question_navigator_btn_box.length; i++) {
            quiz_app_question_navigator_btn_box[i].addEventListener('click', function () {
                move_id = this.id;
                question_index = (move_id - 1);
                if (move_id > 1) {
                    quiz_app_quiz_previous_btn.style.display = 'block';
                    quiz_app_quiz_next_btn.style.display = 'block';
                    quiz_app_quiz_fines_btn.style.display = 'none';
                }
                if (move_id == question_length) {
                    quiz_app_quiz_next_btn.style.display = 'none';
                    quiz_app_quiz_fines_btn.style.display = 'block';
                }
                if (move_id == 1) {
                    quiz_app_quiz_previous_btn.style.display = 'none';
                    quiz_app_quiz_next_btn.style.display = 'block';
                    quiz_app_quiz_fines_btn.style.display = 'none';
                }
                quiz_app_question_option_1.classList.remove("active");
                quiz_app_question_option_2.classList.remove("active");
                quiz_app_question_option_3.classList.remove("active");
                quiz_app_question_option_4.classList.remove("active");

                load_question();
                setTimeout(function () {
                    option_1 = quiz_app_question_option_1.innerHTML;
                    option_1 = option_1.split("A. ");
                    option_1 = option_1[1];

                    option_2 = quiz_app_question_option_2.innerHTML;
                    option_2 = option_2.split("B. ");
                    option_2 = option_2[1];

                    option_3 = quiz_app_question_option_3.innerHTML;
                    option_3 = option_3.split("C. ");
                    option_3 = option_3[1];

                    option_4 = quiz_app_question_option_4.innerHTML;
                    option_4 = option_4.split("D. ");
                    option_4 = option_4[1];

                    if (option_1 == selected_anser_array[question_index]) {
                        quiz_app_question_option_1.classList.add("active");
                        quiz_app_question_option_2.classList.remove("active");
                        quiz_app_question_option_3.classList.remove("active");
                        quiz_app_question_option_4.classList.remove("active");
                    }
                    else if (option_2 == selected_anser_array[question_index]) {
                        quiz_app_question_option_1.classList.remove("active");
                        quiz_app_question_option_2.classList.add("active");
                        quiz_app_question_option_3.classList.remove("active");
                        quiz_app_question_option_4.classList.remove("active");
                    }
                    else if (option_3 == selected_anser_array[question_index]) {
                        quiz_app_question_option_1.classList.remove("active");
                        quiz_app_question_option_2.classList.remove("active");
                        quiz_app_question_option_3.classList.add("active");
                        quiz_app_question_option_4.classList.remove("active");
                    }
                    else if (option_4 == selected_anser_array[question_index]) {
                        quiz_app_question_option_1.classList.remove("active");
                        quiz_app_question_option_2.classList.remove("active");
                        quiz_app_question_option_3.classList.remove("active");
                        quiz_app_question_option_4.classList.add("active");
                    }
                }, 20)

            })
        }
    }, 100)
}

var quiz_app_side_menu = document.querySelector('.quiz_app_side_menu');
var side_menu_background = document.querySelector('.quiz_app_side_menu_background');
var burger_btn = document.querySelector('.quiz_app_menu_btn');

burger_btn.addEventListener('click',function(){
    quiz_app_side_menu.classList.add('open');
    side_menu_background.classList.add('open');
    side_menu_background.style.display='block';
})

side_menu_background.addEventListener('click',function(){
    quiz_app_side_menu.classList.remove('open');
    side_menu_background.classList.remove('open');
    side_menu_background.style.display='none';
})

quiz_app_quiz_start_btn.addEventListener('click',function(){
    quiz_app_question_title.style.display =     "block";
    quiz_app_question_option[0].style.display = "block";
    quiz_app_question_option[1].style.display = "block";
    quiz_app_question_option[2].style.display = "block";
    quiz_app_question_option[3].style.display = "block";
    quiz_app_input.style.display ="none";
    quiz_app_quiz_start_btn.style.display = "none";
    quiz_app_quiz_next_btn.style.display = "block";
    quiz_app_question_navigator_sub_box.style.display = "flex";
    quiz_app_quiz_timer.style.display="block";
    set_timer();
})