document.addEventListener("DOMContentLoaded", function () {
    // Lấy slug từ query string ?tenbaiviet=...
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('tenbaiviet');
    
    if (!slug) {
      console.warn("Không tìm thấy slug bài viết trên URL.");
      return;
    }
    
    // Gọi API để lấy bài viết chi tiết theo slug
    fetch(`https://cntt.s4h.edu.vn/wp-json/wp/v2/posts?slug=${slug}&_embed`)
      .then(response => response.json())
      .then(posts => {
        if (!posts || posts.length === 0) {
          document.querySelector('.blog_inner_pannel').innerHTML = `<p>Bài viết không tồn tại.</p>`;
          return;
        }
        
        const post = posts[0];
        
        // Cập nhật tiêu đề bài viết
        const titleEl = document.querySelector('.section_title h2');
        titleEl.innerHTML = post.title.rendered;
        
        // Cập nhật ảnh đại diện
        let imageUrl = "default-image.jpg";
        if (
          post._embedded &&
          post._embedded["wp:featuredmedia"] &&
          post._embedded["wp:featuredmedia"][0]
        ) {
          imageUrl = post._embedded["wp:featuredmedia"][0].source_url;
        }
        document.querySelector('.main_img img').src = imageUrl;
        
        // Cập nhật nội dung bài viết (sử dụng post.content.rendered)
        const mainContentEl = document.querySelector('.main-content');
        mainContentEl.innerHTML = post.content.rendered;
        
        // Cập nhật thông tin review: ngày đăng
        const reviewSpans = document.querySelectorAll('.review span');
        if (reviewSpans.length >= 2) {
          const postDate = new Date(post.date);
          const day = String(postDate.getDate()).padStart(2, '0');
          const month = String(postDate.getMonth() + 1).padStart(2, '0');
          const year = postDate.getFullYear();
          reviewSpans[1].textContent = `${day}/${month}/${year}`;
        }
        
        // Sau khi hiển thị bài viết chi tiết, load các bài viết khác,
        // loại trừ bài viết hiện tại dựa trên post.id
        loadOtherPosts(post.id);
      })
      .catch(error => {
        console.error("Error fetching the detailed post:", error);
      });
    
    // Hàm load các bài viết khác và hiển thị theo slider
    function loadOtherPosts(excludeId) {
      // Lấy 3 bài viết mới nhất, sắp xếp theo ngày đăng giảm dần, loại trừ bài hiện tại
      const url = `https://cntt.s4h.edu.vn/wp-json/wp/v2/posts?_embed&per_page=3&orderby=date&order=desc&exclude=${excludeId}`;
      
      fetch(url)
        .then(response => response.json())
        .then(posts => {
          const container = document.getElementById("other-posts");
          if (!container) {
            console.warn("Không tìm thấy container #other-posts");
            return;
          }
          container.innerHTML = "";
          
          posts.forEach(post => {
            // Lấy ảnh đại diện của bài viết khác
            let imageUrl = "";
            if (
              post._embedded &&
              post._embedded["wp:featuredmedia"] &&
              post._embedded["wp:featuredmedia"][0]
            ) {
              imageUrl = post._embedded["wp:featuredmedia"][0].source_url;
            } else {
              imageUrl = "default-image.jpg";
            }
            
            const title = post.title.rendered;
            const slug = post.slug;
            // Tạo đường dẫn dẫn đến trang chi tiết bài viết khác
            const link = `blog-single.html?tenbaiviet=${slug}`;
            
            // Tạo HTML cho mỗi bài viết khác
            const postDiv = document.createElement("div");
            postDiv.classList.add("other-post-item");
            postDiv.innerHTML = `
              <div class="other_post_box" data-aos="fade-up" data-aos-duration="1500">
                <div class="other_post_img">
                  <img src="${imageUrl}" alt="${title}" style="width:100%; height:auto;">
                </div>
                <div class="other_post_text">
                  <h4>${title}</h4>
                  <a href="${link}" class="btn btn-secondary">Xem chi tiết</a>
                </div>
              </div>
            `;
            container.appendChild(postDiv);
          });
          
          // Sau khi thêm các bài viết khác, khởi tạo slick slider
          if ($(container).hasClass("slick-initialized")) {
            $(container).slick("unslick");
          }
          $(container).slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false,
            dots: true,
          
          });
        })
        .catch(error => {
          console.error("Error fetching other posts:", error);
        });
    }
  });
  