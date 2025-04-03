$(document).ready(function(){
    let docH = $(document).height();
    let winH = $(window).height();
    

    $('body').prepend('<div class="header_top"></div>');
    $('.header_top').load('include/header.html', function(){
        let pcGnbHtml = $('.pc_nav .gnb').html()
        $('.mobile_nav').html('<div class="gnb_mo">'+pcGnbHtml+'</div>');
        // $('.mobile_nav').html(`<div class="gnb_mo">${pcGnbHtml}</div>`);



        $('.login_box a.btn_play').click(function(){
            $('html, body').animate({scrollTop:docH - winH}, 20000);
        });

        let maxLnbH = 0;

        let gnbH = $('header .gnb').height();

        $('header .lnb').each(function(){
            let lnbH = $(this).outerHeight(true);

            if(maxLnbH < lnbH){
                maxLnbH = lnbH
            }
            $('header .lnb_bg').height(maxLnbH + gnbH);
        });
        $('header .lnb').height(maxLnbH);

        $('header .gnb').mouseenter(function(){
            $('header .lnb,header .lnb_bg').fadeIn(150)
        })
        $('header .gnb').mouseleave(function(){
            $('header .lnb,header .lnb_bg').fadeOut(150)
        })

        
        $(".gnb li").hover(
            function() {
                // 0~50px 범위의 랜덤 border-radius 값 생성
                let radius1 = Math.floor(Math.random() * 51) + "px";
                let radius2 = Math.floor(Math.random() * 51) + "px";
                let radius3 = Math.floor(Math.random() * 51) + "px";
                let radius4 = Math.floor(Math.random() * 51) + "px";
                
                $(this).find('a').css("border-radius", `${radius1} ${radius2} ${radius3} ${radius4}`);
            },
            function() {
                // 마우스를 떼면 border-radius를 초기화 (선택 사항)
                $(this).css("border-radius", "0");
            }
        );




        
        let lnbIndex
        // subpage
        let pageUrl = window.location.href;
        $('.gnb .lnb a').each(function(){
            let aHref = $(this).attr('href');

            if(pageUrl.indexOf(aHref) > 0){
                let menuText = $(this).text();
                lnbIndex = $(this).closest('.lnb').parent('li').index();

                $(this).parent('li').addClass('on');
                $('.subtit').text(menuText)
            }
        });

        $('#visual_sub .text').load('include/visual_text.html .textbox .text:eq(' + lnbIndex + ')')



        //mobile

        $('.gnb_mo > li > a').click(function(e){
            $('.lnb').stop().slideUp();
            $(this).siblings('.lnb').stop().slideToggle();
            e.preventDefault();
        });
        $('header .hamburger').click(function(){
            $('.mobile_header').show();
            $('body').css({overflow:'hidden'});
        });
        $('.mobile_header .hamburger').click(function(){
            $('.mobile_header').hide();
            $('body').css({overflow:'visible'});
        });
    });


    $('footer').load('include/footer.html')


    
    $('body').append('<footer></footer>');
    $('footer').load('include/footer.html')




    


    $('#section4 .review').each(function(){
        let maxLength = 70;
        let reviewText = $(this).text().trim();  //공백제외

        if(reviewText.length > maxLength){
            $(this).text(reviewText.substring(0,maxLength)+'...')
        };
    })





    // 메인js
    let visualLength = $('#visual').length;

    if(visualLength > 0){
        let winScr = $(window).scrollTop();
        let winHeight = $(window).height();
        let winCenter = winScr + winHeight / 2;

        let part1Top = $('#section1').offset().top;
        let part4Top = $('#section4').offset().top;
        let tree1Top = $('.tree1').offset().top;

        // 화면 중앙(winCenter)이 section1부터 section4 사이에 있을 때의 진행 정도 (0 ~ 1)
        let progress = (winCenter - part1Top) / (part4Top - part1Top);
        progress = Math.max(0, Math.min(1, progress)); // progress를 0~1로 클램프

        // 총 dash 길이 (필요에 따라 이 값을 조정하세요)
        let dashTotal = 5200;
        // progress에 따라 dash offset 값 변경 (progress가 0이면 dashTotal, 1이면 0)
        let newDashOffset = dashTotal * (1 - progress);

        let progH = $('.page_progress').height();
        let viyul = progH / (docH - winH)

        // 새로고침시 실행
        carMove()
        part4Action()
        tree()
        progressbar()


        $(window).scroll(function(){
            carMove()     
            part4Action()
            tree()
            progressbar()
        });
        

        function carMove(){
            winScr = $(window).scrollTop();
            winHeight = $(window).height();
            winCenter = winScr + winHeight / 2;
        
            part1Top = $('#section1').offset().top;
            part4Top = $('#section4').offset().top;
            tree1Top = $('.tree1').offset().top;
            // let tree2Top = $('.tree2').offset().top;
        
            // 화면 중앙(winCenter)이 section1부터 section4 사이에 있을 때의 진행 정도 (0 ~ 1)
            progress = (winCenter - part1Top) / (part4Top - part1Top);
            progress = Math.max(0, Math.min(1, progress)); // progress를 0~1로 클램프
        
            // 총 dash 길이 (필요에 따라 이 값을 조정하세요)
            dashTotal = 5200;
            // progress에 따라 dash offset 값 변경 (progress가 0이면 dashTotal, 1이면 0)
            newDashOffset = dashTotal * (1 - progress);
        
            $('.road .doro').css({ strokeDashoffset: newDashOffset });
            $('.road .line2').css({ strokeDashoffset: newDashOffset });
            $('.road .line3').css({ strokeDashoffset: newDashOffset });
            $('.road .line4').css({ strokeDashoffset: newDashOffset });
            $('.road .tire1').css({ strokeDashoffset: newDashOffset });
            $('.road .tire2').css({ strokeDashoffset: newDashOffset });

            // $('.road').height($('.doro').height())
        }

        function part4Action(){
            // 화면 중앙이 section4에 도달하면 배경 클래스 on 추가
            if(winCenter >= part4Top){
                $('#section4 .bg').addClass('on');
            } else {
                $('#section4 .bg').removeClass('on');
            }
        }

        function tree(){
            if(winScr >= tree1Top - winHeight/2){
                $('.tree1 img').addClass('on')
                $('.tree2 img').addClass('on')
            };
        }

        function progressbar(){
            if(winScr >= winH/2){
                $('.page_progress').fadeIn();
            } else {
                $('.page_progress').fadeOut();
            }
            progH = $('.page_progress').height();
            viyul = progH / (docH - winH)

            $('.bar').height(winScr * viyul)
        }
    }



    // 로그인 
    $('.close_eye').click(function(){
        $(this).parents('.cont').find('input').attr('type', 'text');
        $(this).hide().siblings().show();
    })
    $('.open_eye').click(function(){
        $(this).parents('.cont').find('input').attr('type', 'password');
        $(this).hide().siblings().show();
    });


    let spanNum = 8;
    let spanDeg = 360/spanNum;
    let s = 0.1;

    for(let i=0; i<spanNum; i++){
        $('.loading_ani').append('<span></span>');
        $('.loading_ani span').eq(i).css({transform:'rotate('+(spanDeg*i)+'deg)', animationDelay:(s*i)+'s'});
    }
    
    $('.login .submit').click(function(){
        $('.loading_wrap').fadeIn(100);
        setTimeout(goMain,1000)
    });
    function goMain(){
        window.location.href = "index.html"
    };


    
    $('#allcheck').click(function(){
        let allcheck = $(this).prop('checked')  //true, false
        $('.check_item').prop('checked', allcheck)
    });

    $('.check_item').click(function(){
        let checkLength = $('.check_item').length;
        let checkedLength = $('.check_item:checked').length;
        let checkcheck = checkLength == checkedLength;  //true, false

        $('#allcheck').prop('checked', checkcheck)
    });





    //회원가입 유효성 검사

    $(document).ready(function () {
        function checkValidation(inputId, validateFunc, errorId) {
            $(inputId).on("input", function () {
                if (validateFunc($(this).val())) {
                    $(errorId).hide();
                } else {
                    $(errorId).show();
                }
            });
        }
    
        function validateId(id) {
            return /^[a-zA-Z0-9_-]{5,20}$/.test(id);
        }
    
        function validatePassword(password) {
            return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/.test(password);
        }
    
        function validateName(name) {
            return /^[가-힣a-zA-Z]{2,20}$/.test(name);
        }
    
        function validateEmail(email) {
            return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(email);
        }
    
        function validateMobile(mobile) {
            return /^01[0-9]-\d{3,4}-\d{4}$/.test(mobile);
        }
    
        checkValidation("#id", validateId, "#idError");
        checkValidation("#password", validatePassword, "#pwError");
        checkValidation("#name", validateName, "#nameError");
        checkValidation("#email", validateEmail, "#emailError");
        checkValidation("#mobile", validateMobile, "#mobileError");
    
        $("#confirm").on("input", function () {
            $("#confirmError").toggle($("#password").val() !== $("#confirm").val());
        });
    
        // 약관 펼치기/접기
        $('.pilsu_box').click(function(){
            $(this).parents('.agree_text').find('.text').toggle();
        });
    
        // 회원가입 버튼 클릭 시 검증 및 스크롤 이동
        $('.btn_join').click(function(event){
            event.preventDefault(); // 기본 제출 방지
    
            let isValid = true;
            let firstErrorField = null; // 첫 번째 오류 필드 저장 변수
    
            function checkField(inputId, validateFunc, errorId) {
                if (!validateFunc($(inputId).val())) {
                    $(errorId).show();
                    if (!firstErrorField) {
                        firstErrorField = $(inputId); // 첫 번째 오류 필드 저장
                    }
                    isValid = false;
                }
            }
    
            checkField("#id", validateId, "#idError");
            checkField("#password", validatePassword, "#pwError");
            checkField("#name", validateName, "#nameError");
            checkField("#email", validateEmail, "#emailError");
            checkField("#mobile", validateMobile, "#mobileError");
    
            if ($("#password").val() !== $("#confirm").val()) {
                $("#confirmError").show();
                if (!firstErrorField) {
                    firstErrorField = $("#confirm");
                }
                isValid = false;
            }
    
            // 필수 입력값 중 하나라도 실패하면 경고창 띄우고 첫 번째 오류 위치로 이동
            if (!isValid) {
                alert('입력 정보를 다시 확인해주세요.');
                $('html, body').animate({ scrollTop: firstErrorField.offset().top - 100 }, 500); // 부드러운 스크롤
                firstErrorField.focus(); // 오류 필드에 포커스
                return false;
            }
    
            // 필수 약관 체크 확인
            let checkLength = $('.pil').length;
            let checkedLength = $('.pil:checked').length;
            let allChecked = checkLength === checkedLength;
    
            if (!allChecked) {
                alert('약관에 모두 동의하셔야 합니다.');
                return false;
            }
    
            // 모든 조건이 충족되었을 때 로딩 표시 후 제출
            $('body').css({ overflow: 'hidden' });
            $('.loading_wrap').fadeIn(100);
    
            setTimeout(function(){
                $('body').css({ overflow: '' });
                $('.loading_wrap').fadeOut(100);
                $('form').submit();
            }, 1000);
        });
    });
        // 회원가입 사진첨부
        $('#photo').on('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    $('#previewImage').attr('src', e.target.result).show();
                };
                reader.readAsDataURL(file);
            } else {
                $('#previewImage').hide();
            }
        });
    //게시판 
    $('#file1').change(function(){
        let fileName = $(this).val().split('\\').pop()

        $('.file_name').text(fileName || '파일을 선택해주세요')
        console.log(flieName);
    })
    /* $('.btn_list').click(function(){
        history.back()
    }) */
});
