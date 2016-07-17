(function(){
    //chart settings
    var circle1 = new ProgressBar.Circle('#projects', {
        color: '#f34739',
        strokeWidth: 1,
        trailWidth: 1,
        duration: 1500,
        text: {
            value: '0'
        },
        step: function (state, bar) {
            bar.setText((bar.value() * 100).toFixed(0));
        }
    });

    var circle2 = new ProgressBar.Circle('#clients', {
        color: '#009989',
        strokeWidth: 1,
        trailWidth: 1,
        duration: 1500,
        text: {
            value: '0'
        },
        step: function (state, bar) {
            bar.setText((bar.value() * 100).toFixed(0));
        }
    });

    var circle3 = new ProgressBar.Circle('#months', {
        color: '#152b3c',
        strokeWidth: 1,
        trailWidth: 1,
        duration: 1500,
        text: {
            value: '0'
        },
        step: function (state, bar) {
            bar.setText((bar.value() * 100).toFixed(0));
        }
    });

    function init() {
        // smooth scrolling
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
              if (target.length) {
                $('html, body').animate({
                  scrollTop: target.offset().top - 100
                }, 1000);
                // close menu if open
                if ($('#menuToggle').attr('checked',true)) {
                    $('#menuToggle').attr('checked',false);
                }
                return false;
              }
            }
        });
        // chart animation & sticky menu
        $(document).scroll(function() {
            var y = $(this).scrollTop() + 650;
            var x = $('#charts').position();
            if (y > x.top) {
                circle1.animate(0.5);
                circle2.animate(0.34);
                circle3.animate(0.8);   
            }
            if (y > 900) {
                $('.nav-panel').addClass('fixed');
            } else {
                $('.nav-panel').removeClass('fixed');
            }
        });

        getPortfolio();
        getBrands();
    } 

    function getPortfolio() {
        var processedProjects = 0;
        $.each(projects, function(index, project){
            $.get("templates/portfolio-item.html", function(data){
                $('#portfolio-thumbs').append(tplawesome(data, [{'src': project.src, 'alt': project.alt, 'span': project.span, 'href': project.href }]));
                processedProjects++;
                if(processedProjects === projects.length) {
                    addHover();
                    getProject();
                }
            });
        });   
    }

    function addHover() {
        $('#portfolio-thumbs > li').hoverdir();
    }

    function getProject(){
        $('.portfolio-item').click(function(e){
            e.preventDefault();
            var currentIndex = $(this).index(),
                currentItem = projects[currentIndex];
            
            $.get("templates/project-lightbox.html", function(data){
                var templateData = $(tplawesome(data, [{'src': currentItem.src, 'alt': currentItem.alt, 'span': currentItem.span, 'href': currentItem.href, 'name': currentItem.name, 'desc': currentItem.desc }]));
                $('body').append(templateData);                        
            }).done(function(){
                setTimeout(function(){
                    $('.project-lightbox').addClass('active');
                }, 100);
                
                $('.btn-close').click(function(){
                    $('.project-lightbox').removeClass('active');
                   setTimeout(function(){
                    $('.project-lightbox').remove();
                   }, 1000);
                });
            });
        });
    }

    function getBrands() {
        var brands = $(document.createDocumentFragment());
        for (var i = 0; i < 28; i++){
            var newBrand = $('<li></li>');
            newBrand.addClass('brands-item');
            brands.append(newBrand);
        }
        $('.brands-thumbs').append(brands);
    }

    init();
})();







