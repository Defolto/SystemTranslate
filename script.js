$('#number2').focusout(function(){ // проверка системы на число
    var number = $('#number1').val();
    var system = $('#number2').val();
    var a = 0; 
    var max = 0;
    var temp = '';
    var check = NaN;
    while(number[a] != undefined){
        if(!(number[a] > -1 && number[a] < 10)){
            temp = number[a].charCodeAt(0) - 55;
            number[a] = temp;
        }
        else{
            temp = number[a];
        }
        if(temp > max){
            max = temp;
        }
        a++;
    }
    if(+max >= +system || system == 1){
        $('#error').html('Ошибка: проверьте правильность ввода');
        return 0;
    }
    else{
        $('#error').html('');
    }
    if(+system != system){
        $('#error').html('Ошибка: проверьте правильность ввода');
        return 0;
    }
    if(number == ''){
        $('#error').html('');// Если ещё не введено число
        return 0;
    }
});

$('#insystem').focusout(function(){ // проверка системы на число
    var system = $('#insystem').val();
    if(+system != system){
        $('#error1').html('Ошибка: проверьте правильность ввода');
        return 0;
    }
    else{
        $('#error1').html('');
    }
});

$('#number1').focusout(function(){ // проверка числа на систему
    var number = $('#number1').val();
    var system = $('#number2').val();
    var a = 0; var max = 0;
    if(system == ''){// Если ещё не введена система
        return 0;
    }
    while(number[a] != undefined){
        if(parseInt(number[a]) > max){
            max = parseInt(number[a]);
        }
        a++;
    }
    if(max >= system || system == 1 || ((+system) != system)){
        $('#error').html('Ошибка: проверьте правильность ввода');
    }
    else{
        $('#error').html('');
    }
});

    //перевод в десятичную
function in10(system, length, length1, number) {
    var summ = 0;
    var part = '';
    if(system > 9){
        for (let i = 0; i < length; i++) {
            part = number.toString()[i];
            if(!(part > -1 && part < 10)){
                part = part.charCodeAt(0) - 55;
            }
            summ += part * Math.pow(system, length1);
            length1--;
        }
    }
    else{
        for (let i = 0; i < length; i++) {
            summ += number.toString()[i] * Math.pow(system, length1);
            length1--;
        }
    }
    return summ;
  }

      //перевод в любую другую
function inAny(summ, inh){
    var lol ='';
        while(summ!=0){
            var part = summ%inh;
            if(part > 9){
                var part = summ%inh;
                var check = 65 + part - 10;
                part = String.fromCharCode(check);
            }
            lol = part.toString() + lol;
            summ = Math.floor(summ/inh);
        }

    return lol;
}
$('button').click(function(){
    if($('#error').html()){
        $('#error').html('Серьёзно? Исправляй давай!');
        setTimeout(function(){$('#error').html('Ошибка: проверьте правильность системы');}, 3000);
        return;
    }
    if($('#error1').html()){
        $('#error1').html('Серьёзно? Исправляй давай!');
        setTimeout(function(){$('#error1').html('Ошибка: заполните все поля');}, 2000);
        return;
    }
    var summ = 0;
    var inh= $('#insystem').val();
    var number = $('#number1').val();
    var system = $('#number2').val();
    var length = number.length;
    // alert(typeof (10));
    if(!(system || inh || number)){
        $('#error1').html('Ошибка: заполните все поля');
        return 0;
    }
    if(inh == 1){
        $('#error1').html('Ошибка: система не может быть 1');
        return 0;
    }
    else{
        $('#error1').html('');
    }
    summ = in10(system, length, length-1, number);
    lol = inAny(summ, inh);
    $('#number3').val(lol);
});
