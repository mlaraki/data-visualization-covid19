<template>
  <div
    id="news"
    style="position:absolute; top : 0; overflow:hidden; width: -webkit-fill-available;"
  >
    <el-button @click="$emit('closeNews')" icon="el-icon-close"  class="closenews" circle></el-button>
    <div class="wrapper">
      <div class="background"></div>
      <div class="item-bg"></div>

      <div class="news-slider" v-if="articles.length">
        <div class="news-slider__wrp swiper-wrapper">
          <!-- articles -->
          <div
            class="news-slider__item swiper-slide"
            v-for="(article, index) in articles"
            :key="index"
          >
            <a :href="article.url" class="news__item" target="_blank">
              <div class="news-date">
                <span class="news-date__title">{{article.day}}</span>
                <span class="news-date__txt">{{article.month}}</span>
              </div>
              <div class="news__title">{{article.title}}</div>
              <p class="news__txt">{{article.content}}</p>

              <div class="news__img">
                <img :src="article.urlToImage" alt="news" />
              </div>
            </a>
          </div>
        </div>

        <div class="news-slider__ctr">
          <div class="news-slider__arrows">
            <button class="news-slider__arrow news-slider-prev">
              <span class="icon-font">
                <svg class="icon icon-arrow-left">
                  <use xlink:href="#icon-arrow-left" />
                </svg>
              </span>
            </button>
            <button class="news-slider__arrow news-slider-next">
              <span class="icon-font">
                <svg class="icon icon-arrow-right">
                  <use xlink:href="#icon-arrow-right" />
                </svg>
              </span>
            </button>
          </div>

          <div class="news-slider__pagination"></div>
        </div>
      </div>
    </div>
    <svg hidden="hidden">
      <defs>
        <symbol id="icon-arrow-left" viewBox="0 0 32 32">
          <title>arrow-left</title>
          <path
            d="M0.704 17.696l9.856 9.856c0.896 0.896 2.432 0.896 3.328 0s0.896-2.432 0-3.328l-5.792-5.856h21.568c1.312 0 2.368-1.056 2.368-2.368s-1.056-2.368-2.368-2.368h-21.568l5.824-5.824c0.896-0.896 0.896-2.432 0-3.328-0.48-0.48-1.088-0.704-1.696-0.704s-1.216 0.224-1.696 0.704l-9.824 9.824c-0.448 0.448-0.704 1.056-0.704 1.696s0.224 1.248 0.704 1.696z"
          />
        </symbol>
        <symbol id="icon-arrow-right" viewBox="0 0 32 32">
          <title>arrow-right</title>
          <path
            d="M31.296 14.336l-9.888-9.888c-0.896-0.896-2.432-0.896-3.328 0s-0.896 2.432 0 3.328l5.824 5.856h-21.536c-1.312 0-2.368 1.056-2.368 2.368s1.056 2.368 2.368 2.368h21.568l-5.856 5.824c-0.896 0.896-0.896 2.432 0 3.328 0.48 0.48 1.088 0.704 1.696 0.704s1.216-0.224 1.696-0.704l9.824-9.824c0.448-0.448 0.704-1.056 0.704-1.696s-0.224-1.248-0.704-1.664z"
          />
        </symbol>
      </defs>
    </svg>
  </div>
</template>

<script>
export default {
  name: "News",
  data() {
    return {
      token: process.env.VUE_APP_NEWS,
      articles: []
    };
  },

  async mounted() {
    await this.fetchNews();
    this.applyScript();
  },
  methods: {

    async fetchNews() {
      try {
        let res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=${
            this.$store.state.countryCode ? this.$store.state.countryCode : "fr"
          }&apiKey=${this.token}`
        );
        let toJson = await res.json();
        //filter
        for (let [index, article] of toJson.articles.entries()) {
          if (article && this.isAboutCoronavirus(article)) {
            let str = article.content;
            article.content = str.substr(0, str.indexOf("[") - 1);
            let date = new Date(article.publishedAt);
            article.month = date.toLocaleString("default", { month: "long" });
            article.day = date.getDate();
            this.articles.push(article);
          }
        }
        this.applyScript();
      } catch (error) {
        console.log("error occured whil fetching news", error.message);
      }
    },
    isAboutCoronavirus(article) {
      if (!article.content || !article.title) return false;
      let keywords = ["coronavirus", "covid"];
      let title = article.title.toLowerCase();
      let content = article.content.toLowerCase();
      for (let [index, word] of keywords.entries()) {
        if (
          article.title.search(word) != -1 ||
          article.content.search(word) != -1
        )
          return true;
      }
      return false;
    },
    applyScript() {
      var bg = document.querySelector(".item-bg");
      var items = document.querySelectorAll(".news__item");
      var item = document.querySelector(".news__item");

      if ($(window).width() > 800) {
        $(document).on("mouseover", ".news__item", function(_event, _element) {
          var newsItem = document.querySelectorAll(".news__item");
          newsItem.forEach(function(element, index) {
            element.addEventListener("mouseover", function() {
              var x = this.getBoundingClientRect().left;
              var y = this.getBoundingClientRect().top;
              var width = this.getBoundingClientRect().width;
              var height = this.getBoundingClientRect().height;

              $(".item-bg").addClass("active");
              $(".news__item").removeClass("active");
              bg.style.width = width + "px";
              bg.style.height = height + "px";
              bg.style.transform =
                "translateX(" + x + "px ) translateY(" + y + "px)";
            });

            element.addEventListener("mouseleave", function() {
              $(".item-bg").removeClass("active");
              $(".news__item").removeClass("active");
            });
          });
        });
      }

      var swiper = new Swiper(".news-slider", {
        effect: "coverflow",
        grabCursor: true,
        loop: true,
        centeredSlides: true,
        keyboard: true,
        spaceBetween: 0,
        slidesPerView: "auto",
        speed: 300,
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 3,
          slideShadows: false
        },
        breakpoints: {
          480: {
            spaceBetween: 0,
            centeredSlides: true
          }
        },
        simulateTouch: true,
        navigation: {
          nextEl: ".news-slider-next",
          prevEl: ".news-slider-prev"
        },
        pagination: {
          el: ".news-slider__pagination",
          clickable: true
        },
        on: {
          init: function() {
            var activeItem = document.querySelector(".swiper-slide-active");

            var sliderItem = activeItem.querySelector(".news__item");

            $(".swiper-slide-active .news__item").addClass("active");

            var x = sliderItem.getBoundingClientRect().left;
            var y = sliderItem.getBoundingClientRect().top;
            var width = sliderItem.getBoundingClientRect().width;
            var height = sliderItem.getBoundingClientRect().height;

            $(".item-bg").addClass("active");

            bg.style.width = width + "px";
            bg.style.height = height + "px";
            bg.style.transform =
              "translateX(" + x + "px ) translateY(" + y + "px)";
          }
        }
      });

      swiper.on("touchEnd", function() {
        $(".news__item").removeClass("active");
        $(".swiper-slide-active .news__item").addClass("active");
      });

      swiper.on("slideChange", function() {
        $(".news__item").removeClass("active");
      });

      swiper.on("slideChangeTransitionEnd", function() {
        $(".news__item").removeClass("active");
        var activeItem = document.querySelector(".swiper-slide-active");

        var sliderItem = activeItem.querySelector(".news__item");

        $(".swiper-slide-active .news__item").addClass("active");

        var x = sliderItem.getBoundingClientRect().left;
        var y = sliderItem.getBoundingClientRect().top;
        var width = sliderItem.getBoundingClientRect().width;
        var height = sliderItem.getBoundingClientRect().height;

        $(".item-bg").addClass("active");

        bg.style.width = width + "px";
        bg.style.height = height + "px";
        bg.style.transform = "translateX(" + x + "px ) translateY(" + y + "px)";
      });
    }
  }
};
</script>

<style scoped>
@import "../assets/news.css";
.closenews {
  position: absolute;
  right: 10px ;
  top: 10px;
  z-index: 3;
}
#news {
  z-index: 2;
}
</style>