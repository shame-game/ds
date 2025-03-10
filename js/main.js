// Open Sub Menu
$('.drp_btn').click(function () {
  $(this).siblings('.sub_menu').slideToggle();
})

$(document).ready(function () {
  var navLinks = $(".navbar-nav a");
  var sections = [];

  // Xây dựng mảng chứa thông tin section từ các link
  navLinks.each(function () {
    var href = $(this).attr("href");
    if (href === "#") {
      // Nếu là trang chủ, ta xử lý riêng (đặt offset = 0 hoặc gán element cho section "home" nếu có)
      sections.push({
        id: "home",
        element: null,  // Nếu có phần tử với id="home" thì thay null bằng $("#home")
        offset: 0,
        link: $(this)
      });
    } else {
      var sectionEl = $(href);
      if (sectionEl.length) {
        sections.push({
          id: href.substring(1), // loại bỏ dấu '#' để lấy id
          element: sectionEl,
          offset: sectionEl.offset().top,
          link: $(this)
        });
      }
    }
  });

  // Hàm cập nhật lại vị trí của các section (dùng khi cửa sổ resize)
  function updateOffsets() {
    sections.forEach(function (sec) {
      if (sec.element) {
        sec.offset = sec.element.offset().top;
      }
    });
  }
  updateOffsets();
  $(window).on("resize", updateOffsets);

  // Sự kiện scroll
  $(window).on("scroll", function () {
    var scrollTop = $(this).scrollTop();
    var activeId = "home"; // mặc định nếu đang ở đầu trang

    // Duyệt qua các section để tìm section hiện tại (sử dụng ngưỡng offset là 150px, có thể điều chỉnh)
    for (var i = 0; i < sections.length; i++) {
      if (scrollTop >= sections[i].offset - 150) {
        activeId = sections[i].id;
      }
    }

    // Loại bỏ class "ac" khỏi tất cả các menu và cập nhật lại cho phần tử tương ứng
    $(".navbar-nav li").removeClass("ac");
    if (activeId === "home") {
      $(".navbar-nav a[href='#']").parent().addClass("ac");
    } else {
      $(".navbar-nav a[href='#" + activeId + "']").parent().addClass("ac");
    }
  });
});

// Preloader JS

function preloader_fade() {
  $("#preloader").fadeOut('slow');
}

$(document).ready(function () {
  window.setTimeout("preloader_fade();", 500); //call fade in .5 seconds
}
)

function loadPosts() {
  fetch("https://cntt.s4h.edu.vn/wp-json/wp/v2/posts?_embed")
    .then(response => response.json())
    .then(posts => {
      const container = document.getElementById("new");
      // Xóa nội dung cũ nếu có
      container.innerHTML = "";

      posts.forEach(post => {
        // Lấy hình đại diện từ _embedded (nếu có)
        let imageUrl = "";
        if (
          post._embedded &&
          post._embedded["wp:featuredmedia"] &&
          post._embedded["wp:featuredmedia"][0]
        ) {
          imageUrl = post._embedded["wp:featuredmedia"][0].source_url;
        } else {
          imageUrl = "default-image.jpg"; // Ảnh mặc định
        }

        // Lấy tiêu đề, trích dẫn và link của bài viết
        const title = post.title.rendered;
        const excerpt = post.excerpt.rendered;
        const link = post.link;

        // Tạo phần tử slide (không sử dụng lớp "col-md-4" để tránh xung đột với Slick)
        const slideDiv = document.createElement("div");
        slideDiv.classList.add("slide_item");
        slideDiv.innerHTML = `
          <div class="story_box" data-aos="fade-up" data-aos-duration="1500">
            <div class="story_img">
              <img src="${imageUrl}" alt="image">
            </div>
            <div class="story_text">
              <h3 style="margin-bottom:3px">${title}</h3>
              <p>${excerpt}</p>
            <a href="blog-single.html?tenbaiviet=${post.slug}">Đọc thêm</a>
            </div>
          </div>
        `;
        container.appendChild(slideDiv);
      });

      // Nếu slick đã được khởi tạo trước đó, hủy nó đi
      if ($(container).hasClass("slick-initialized")) {
        $(container).slick("unslick");
      }

      // Khởi tạo slick slider cho container
      $(container).slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    })
    .catch(error => {
      console.error("Error fetching posts:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  loadPosts();
});

// All Slider Js

$('#frmae_slider').owlCarousel({
  loop: true,
  margin: 10,
  autoplay: true,
  smartSpeed: 1500,
  nav: false,
  dots: true,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 1
    },
    1000: {
      items: 1
    }
  }
})

$('#company_slider').owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  autoplay: true,
  smartSpeed: 1500,
  dots: true,
  responsive: {
    0: {
      items: 2
    },
    600: {
      items: 3
    },
    1000: {
      items: 5
    }
  }
})


$('#testimonial_slider').owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  autoplay: true,
  smartSpeed: 2500,
  dots: true,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 1
    },
    1000: {
      items: 1
    }
  }
})


$('#screen_slider').owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  dots: true,
  autoplay: true,
  smartSpeed: 2500,
  center: true,
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 2
    },
    1000: {
      items: 3
    }
  }
})


// Number Count
window.addEventListener('scroll', function () {
  var element = document.querySelector('#counter');
  var position = element.getBoundingClientRect();

  // checking whether fully visible
  if (position.top >= 0 && position.bottom <= window.innerHeight) {
    $('.counter-value').each(function () {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
        countNum: countTo
      },

        {

          duration: 2000,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
            //alert('finished');
          }

        });
    });
  }

  if (position.top < window.innerHeight && position.bottom >= 0) {
    //console.log('Element is partially visible in screen');
  } else {
    //console.log('Element is not visible');
    $('.counter-value').each(function () {
      var $this = $(this),
        countTo = 0;
      $({
        countNum: $this.text()
      }).animate({
        countNum: countTo
      },

        {

          duration: 100,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
            //alert('finished');
          }

        });
    });
  }
});



// --------Magnify-popup

$(function () {
  $('.popup-youtube').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });
});


// Pricing Section Year Month Jquery
$(document).ready(function () {

  $(".tog_block").click(function () {
    $(".tog_btn").toggleClass('month_active');
    $('.month').toggleClass('active');
    $('.years').toggleClass('active');

    $('.monthly_plan').toggleClass('active');
    $('.yearly_plan').toggleClass('active');

  })

});

$(document).ready(function () {
  // Add minus icon for collapse element which is open by default
  $(".collapse.show").each(function () {
    $(this)
      .prev(".card-header")
      .find(".icon_faq")
      .addClass("icofont-minus")
      .removeClass("icofont-plus");
  });


  // Toggle plus minus icon on show hide of collapse element
  $(".collapse").on("show.bs.collapse", function () {
    $(this).prev(".card-header").find(".icon_faq").removeClass("icofont-plus").addClass("icofont-minus");
  })
    .on("hide.bs.collapse", function () {
      $(this).prev(".card-header").find(".icon_faq").removeClass("icofont-minus").addClass("icofont-plus");
    });

  $(".collapse").on("show.bs.collapse", function () {
    $(this).prev(".card-header").children('h2').children('.btn').addClass("active");
  })
    .on("hide.bs.collapse", function () {
      $(this).prev(".card-header").children('h2').children('.btn').removeClass("active");
    });
});


// Download Section Hover Jquery
window.addEventListener('scroll', function () {
  var element = document.querySelector('.free_text');
  var position = element.getBoundingClientRect();

  if (position.top < window.innerHeight && position.bottom >= 0) {
    $('.purple_backdrop').css("opacity", "1");
  } else {
    //console.log('Element is not visible');
    $('.purple_backdrop').css("opacity", "0");
  }
});

$(window).on('resize', function () {
  if ($(window).width() < 768) {

    window.addEventListener('scroll', function () {
      var element = document.querySelector('.mobile_mockup');
      var position = element.getBoundingClientRect();

      if (position.top < window.innerHeight && position.bottom >= 0) {
        $('.purple_backdrop').css("opacity", "1");
      } else {
        //console.log('Element is not visible');
        $('.purple_backdrop').css("opacity", "0");
      }
    });

  }
  else {

    window.addEventListener('scroll', function () {
      var element = document.querySelector('.free_text');
      var position = element.getBoundingClientRect();

      if (position.top < window.innerHeight && position.bottom >= 0) {
        $('.purple_backdrop').css("opacity", "1");
      } else {
        //console.log('Element is not visible');
        $('.purple_backdrop').css("opacity", "0");
      }
    });

  }
});


// Scrool-top
$(document).ready(function () {
  var toTop = $('.go_top');
  toTop.on('click', function () {
    $('html, body').animate({ scrollTop: $('html, body').offset().top, }, 400);
  });

  $(window).scroll(function () {
    // declare variable
    var topPos = $(this).scrollTop();

    // if user scrolls down - show scroll to top button
    if (topPos > 750) {
      $(toTop).css("opacity", "1");

    } else {
      $(toTop).css("opacity", "0");
    }

  });

});

// Fix Header Js
$(window).scroll(function () {
  if ($(window).scrollTop() >= 250) {
    $('header').addClass('fix_style');
  }
  else {
    $('header').removeClass('fix_style');
  }
  if ($(window).scrollTop() >= 260) {
    $('header').addClass('fixed');
  }
  else {
    $('header').removeClass('fixed');
  }
});




//YOUTUBE VIDEO
$('.play-button').click(function (e) {
  var iframeEl = $('<iframe>', { src: $(this).data('url') });
  $('#youtubevideo').attr('src', $(this).data('url'));
})

$('#close-video').click(function (e) {
  $('#youtubevideo').attr('src', '');
});

$(document).on('hidden.bs.modal', '#myModal', function () {
  $('#youtubevideo').attr('src', '');
});



// Close btn on click 

$(document).ready(function () {
  $('.navbar-toggler').click(function () {
    if ($(this).children('span').children('.ico_menu').hasClass('icofont-navigation-menu')) {
      $(this).children('span').children('.ico_menu').removeClass('icofont-navigation-menu').addClass('icofont-close');
    } else {
      $(this).children('span').children('.ico_menu').removeClass('icofont-close').addClass('icofont-navigation-menu');
    }
  });
});

(function () {
  $('.toggle-wrap').on('click', function () {
    $(this).toggleClass('active');
    $('aside').animate({ width: 'toggle' }, 200);
  });
})();


// INITIALIZE AOS

AOS.init();

