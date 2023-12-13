<template>
  <div class="slideshow-container" style="height: 90vh;">

    <div class="mySlides card1 fade">
      <div class="numbertext">1 / 3</div>
      <div class="text">
        <h1>Daiv DV</h1>
        <hr />
        <p>Full Stack Web Developer</p>
      </div>
    </div>

    <div class="mySlides card2 fade">
      <div class="numbertext">2 / 3</div>
      <!-- <img src="../assets/ues-wall.jpg"> -->
      <div class="text">
        <h1>UES Drive</h1>
        <hr />
        <p>Repositorio de archivos. Ing de Sistemas Informáticos</p>
      </div>
    </div>

    <div class="mySlides card3 fade">
      <div class="numbertext">3 / 3</div>
      <!-- <img src="../assets/project-wall.jpg"> -->
      <div class="text">
        <h1>Proyectos y Utilidades</h1>
        <hr />
        <p>WebApps y otras herramientas</p>
      </div>
    </div>

    <a class="prev" @click="plusSlides(-1)"></a>
    <a class="next" @click="plusSlides(1)"></a>

  </div>
  <br>

  <div class="nav-dot" style="text-align:center">
    <span class="dot" @click="currentSlide(1)"></span>
    <span class="dot" @click="currentSlide(2)"></span>
    <span class="dot" @click="currentSlide(3)"></span>
  </div>
</template>
<script>
export default {
  name: 'LandingWindow',
  data: () => ({
    slideIndex: 1,
    timer: null,
  }),
  mounted() {
    this.showSlides(this.slideIndex);
  },
  methods: {
    plusSlides(n) {
      this.showSlides(this.slideIndex += n);
    },
    currentSlide(n) {
      this.showSlides(this.slideIndex = n);
    },
    card_timer() {
      this.timer ? clearTimeout(this.timer) : null;
      this.timer = setTimeout(() => {
        this.plusSlides(1);
      }, 5000);
    },
    showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");
      if (n > slides.length) {
        this.slideIndex = 1
      }
      if (n < 1) {
        this.slideIndex = slides.length
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[this.slideIndex - 1].style.display = "block";
      dots[this.slideIndex - 1].className += " active";

      this.card_timer();
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box
}

.mySlides {
  display: none;
}

.card1 {
  background-image: url("/img/slides/punpun_wallpaper.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}

.card2 {
  background-image: url("/img/slides/ues-wall.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}

.card3 {
  background-image: url("/img/slides/project-wall.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}

/* Slideshow container */
.slideshow-container {
  position: relative;
  margin: auto;
  background-color: #ffffff;
}

.nav-dot {
  background-color: #ffffff;
}

/* Next & previous buttons */
.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: rgba(0,0,0,0.5);
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover,
.next:hover {
  background-color: rgba(116, 106, 106, 0.8);
}

/* Caption text */
.text {
  color: #f2f2f2;
  text-shadow: 2px 2px 4px #000000;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active,
.dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {
    opacity: .4
  }

  to {
    opacity: 1
  }
}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {

  .prev,
  .next,
  .text {
    font-size: 11px
  }
}
</style>