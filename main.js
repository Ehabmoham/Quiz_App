function getData(){
    let myReq = new XMLHttpRequest();

    myReq.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            
            let data = Array.from(JSON.parse(myReq.responseText));
            let questionCount = data.length;
            let count = document.querySelector('.count');
            
            let start = 0;
            let choosenQuestion = data[start];

              let footer = document.createElement('div');
                  footer.className = 'footer';
                  document.querySelector('.quiz-app').appendChild(footer)

            function createBullets(num){
                let ul = document.createElement('ul');

                for(let i = 0; i < num; i++){

                    let li = document.createElement('li');
                    ul.appendChild(li);
                }

                footer.appendChild(ul);
            }

            createBullets(questionCount);

            function createQuestion(question){

                if(start < questionCount){

                    count.innerHTML = '';
                    count.appendChild(document.createTextNode(`${start +1} - ${questionCount}`));


                    let qustionBox = document.querySelector('.question-box');
                    let questionName = document.createElement('h1');
                    questionName.appendChild(document.createTextNode(question.title))
                    qustionBox.appendChild(questionName)

                    let answerBox = document.createElement('div');
                    answerBox.className = 'answer_box';
                    answerBox
                    qustionBox.appendChild(answerBox)

                    for(let i = 0; i < 4;  i++){

                        let answer = document.createElement('div');
                        answer.className = `answer`;
                        answer.style.order = Math.ceil(Math.random() * 4);
                        answerBox.appendChild(answer)

                        let answer_input = document.createElement('input');
                        answer_input.type = 'radio';
                        answer_input.id = `answer_${i + 1}`;
                        answer_input.name = 'questions';
                        answer.appendChild(answer_input);

                        let answer_label = document.createElement('label');
                        answer_label.setAttribute('for' , `answer_${i +1}`);
                        answer_label.className = 'answer_label';
                        answer.appendChild(answer_label);    
                    }

                    let answers = document.querySelectorAll('.answer_label');
                    answers[0].textContent = `${question.answer_1}`;
                    answers[1].textContent = `${question.answer_2}`;
                    answers[2].textContent = `${question.answer_3}`;
                    answers[3].textContent = `${question.answer_4}`;

                    // document.querySelectorAll('.answer label')[0].classList.add('choosen');

                    let btn = document.createElement('button');
                    btn.textContent = 'Submit answer';
                    btn.className = 'btn';
                    qustionBox.appendChild(btn)

                    let answersDiv = document.querySelectorAll('.answer label')  

                    answersDiv.forEach((answer)=>{
                        answer.addEventListener('click' , function(e){

                            answersDiv.forEach((answer)=>{
                                answer.classList.remove('choosen');
                            })
                            
                            e.currentTarget.classList.add('choosen');
                            
                        });
                    });

                }else{

                    let qustionBox = document.querySelector('.question-box');
                    let wrongAnswer = document.querySelectorAll('.wrong').length;
                    let finish = document.createElement('p');
                    finish.className = 'finish';
                    if(wrongAnswer != 0){
                        finish.appendChild(document.createTextNode(`You Are Finish The Quiz Your Score is ${questionCount - wrongAnswer} - ${questionCount}`));
                    }else{
                        finish.appendChild(document.createTextNode(`You Are Finish The Quiz Your Score is ${questionCount} - ${questionCount}`));
                    }

                    qustionBox.appendChild(finish)

                    console.log(wrongAnswer)
                    return false
                }

               
            }
            createQuestion(choosenQuestion);


            function getNextQuestion(){
                let qustionBox = document.querySelector('.question-box')  
                start = start + 1;
                choosenQuestion = data[start];
                qustionBox.innerHTML = '';
                createQuestion(choosenQuestion); 
            }


            function check(){
                       let rightAnswer = choosenQuestion.right_answer;
                       let choosenAnswer = document.querySelector('.choosen');
                      
                            if(rightAnswer === choosenAnswer.textContent){
                                let currentBullet = document.querySelectorAll('.footer ul li')[start];
                                currentBullet.classList.add('right')
                                getNextQuestion();
                                

                                if(document.querySelectorAll('.footer ul li')[start] != undefined){
                                    currentBullet.classList.add('active')
                               }else{
                                    return false;
                               }

                            }else{
                                let currentBullet = document.querySelectorAll('.footer ul li')[start];
                                currentBullet.classList.add('wrong');
                                getNextQuestion();
                               document.querySelector('.choosen').classList.remove('choosen')
                        }
                   }


            document.addEventListener('click' , function(e){
                if(e.target.classList.contains('btn')){
                    check()
                }
            })               
         };
    };

    myReq.open('GET' , 'html_quostions.json');
    myReq.send();

};

getData();
