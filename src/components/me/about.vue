<template>
  <div class="bg-gray-100 text-black dark:bg-gray-800 dark:text-gray-100">
    <header class="masthead">
      <p class="masthead-intro">Hi, I'm</p>
      <hr class="intro_border" />
      <h1 class="masthead-heading">Zen du</h1>
      <nav>
        <ul>
          <li>
            <a href="#about">{{ $t("me.about") }}</a>
          </li>
          <li>
            <a href="#works">{{ $t("me.works") }}</a>
          </li>
          <li>
            <a href="#contact">{{ $t("me.contact") }}</a>
          </li>
        </ul>
      </nav>
    </header>
    <section id="about" class="about-section">
      <h1>
        <span>{{ $t("me.aboutme") }}</span>
      </h1>
      <div class="content">
        <img class="pic" src="@/assets/image/photo1.jpg" />
        <div class="int" v-html="introduction"></div>
      </div>
    </section>

    <section id="works" class="works-section">
      <h1>{{ $t("me.works") }}</h1>
      <div class="main-grid">
        <img id="item-1" class="grid_images" src="@/assets/image/coding1.jpg" />
        <img id="item-1" class="grid_images" src="@/assets/image/coding2.jpg" />
        <img id="item-1" class="grid_images" src="@/assets/image/coding3.jpg" />
        <img
          id="item-1"
          class="grid_images"
          src="@/assets/image/coding4.webp"
        />
      </div>
    </section>
    <section id="contact" class="contact-section">
      <h1>{{ $t("me.contact") }}</h1>
      <form action="#">
        <div class="fieldset">
          <label for="username">{{ $t("me.name") }}</label>
          <input type="text" id="username" name="username" v-model="username" />
          <label for="useremail">{{ $t("me.email") }}</label>
          <input
            type="email"
            id="useremail"
            name="useremail"
            v-model="useremail"
          />
          <label for="msg">{{ $t("me.message") }}</label>
          <textarea id="msg" name="msg" v-model="msg"></textarea>
        </div>
        <div  class="button" @click="submit">{{ $t("me.send") }}</div>
      </form>
    </section>
    <footer class="content-footer"></footer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      introduction: `<p>先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。诚宜开张圣听，以光先帝遗德，恢弘志士之气，不宜妄自菲薄，引喻失义，以塞忠谏之路也。</p>
      <p>宫中府中，俱为一体；陟罚臧否，不宜异同：若有作奸犯科，及为忠善者，宜付有司，论其刑赏，以昭陛下平明之治；不宜偏私，使内外异法也。侍中、侍郎郭攸之、费祎、董允等，此皆良实，志虑忠纯，是以先帝简拔以遗陛下。</p>`,
      username: "",
      useremail: "",
      msg: "",
    };
  },
  methods: {
    submit() {
      if (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(this.useremail) && this.msg && this.username ) {
        // 
        axios({
          method: 'get',
          url: `${process.env.VUE_APP_API_ADDRESS}/email?username=${this.username}&useremail=${this.useremail}&msg=${this.msg}`,
        })
          .then((result) => {
            let status = result.status;
            if(status === 200){
              this.useremail = '';
              this.username = '';
              this.msg = '';
              alert('消息已发送')
            }else{
              alert('发送失败');
            }
          })
          .catch((error) => {
            alert('发送失败');
          });
      }else{
        alert('请检查邮箱格式和输入是否为空！');
      }
    },
  },
};
</script>
<style lang='scss' scoped>
@import url("https://netdna.bootstrapcdn.com/font-awesome/4.0.1/css/font-awesome.css");

* {
  box-sizing: border-box;
}
h1 {
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  border-bottom: solid black;
  padding: 1em 2rem;
  margin: 0 auto;
  text-align: center;
}
a:hover,
a:visited,
a:link,
a:active {
  text-decoration: none;
  color: #ffffff;
}
p {
  /* Typography Declarations */
  font-weight: 300;
  letter-spacing: 0.05em;
  text-align: left;
}

/*--HEADING----------*/

.masthead-heading,
.masthead-intro,
.content-footer {
  text-align: center;
}

.masthead {
  padding: 17em 0;
  background-image: url("../../assets/image/aboutme1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  height: 100vh;
  min-height: 900px;

  .masthead-intro {
    margin-bottom: 0.1em;
    font-family: "Raleway", sans-serif;
    font-size: 2em;
    color: #ffffff;
    text-align: center;
    padding: 1rem 4rem;
  }

  .intro_border {
    color: #fff;
    width: 180px;
    height: 3px;
    border-style: solid;
  }

  .masthead-heading {
    margin-top: 0.2em;
    padding-top: 0.1em;
    font-family: "Raleway", sans-serif;
    font-weight: bold;
    font-size: 6em;
    color: #ffffff;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border-bottom: none;
  }

  nav {
    text-align: center;
    top-margin: 4rem;
    li {
      display: inline-block;
      margin: 1em;
      border-style: solid;
      border-width: 0.2em;
      border-color: white;
      padding: 0.5em 1.5em;
      font-family: "Raleway", sans-serif;
      font-size: 1.2em;
      color: #ffffff;
      font-weight: bold;
    }
  }
}

.about-section,
.works-section,
.contact-section {
  margin-left: auto;
  margin-right: auto;
  margin-top: 1em;
  padding-top: 1em;
  padding-bottom: 5em;
  overflow: auto;
}

/* 关于我 */
.about-section {
  max-width: 68em;
  .content {
    display: flex;
    justify-content: space-around;
    padding: 2rem 0 0;
    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }
    .pic {
      width: 40%;
      height: auto;
      @media screen and (max-width: 768px) {
        width: 85%;
      }
    }
    .int {
      width: 40%;
      height: 100%;
      margin: auto 0;
      text-indent: 2rem;
       line-height: 2.2rem;
    
    
      @media screen and (max-width: 768px) {
        margin-top: 2rem;
        width: 85%;
      }
    }
  }
}

/*----------WORKS SECTION ----------*/

.works-section {
  max-width: 68em;
  .main-grid {
    text-align: center;
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    align-content: flex-start;
    .grid_images {
      width: 48%;
      padding: 1rem;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
    img {
      height: 20rem;
    }
  }
}

/*--------contact form--------------*/

.contact-section {
  max-width: 38em;
  form {
    @media screen and (max-width: 768px) {
      margin-top: 2rem;
    }
    .fieldset {
      margin-bottom: 30px;
      border: none;
    }

    .button {
      padding: 15px;
      text-align: center;
      width: 90%;
      font-family: "Raleway", sans-serif;
      color: white;
      text-transform: uppercase;
      background-color: rgb(0, 32, 53);
      color: white;
      margin-left: 20px; /* better way to center elements buttton? */
      cursor: pointer;
      user-select: none;
    }

    max-width: 900px;
    margin: 10px auto;
    padding: 10px 20px;
    input[type="text"],
    input[type="email"],
    textarea,
    select {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      height: auto;
      padding: 15px;
      width: 100%;
      background-color: #e8eeef;
      color: #8a97a0;
      box-shadow: 0 1px 0 rgba(0, 0, 0, 0.03) inset;
      margin-bottom: 30px;
    }
  }
}

/*------footer-------*/

.content-footer {
  background-image: url("../../assets/image/aboutme1.jpg");
  height: 160px;
}

/* The animation code */
@keyframes icons {
  from {
    padding-bottom: 60px;
  }
  to {
    padding-bottom: 37px;
  }
}
</style>