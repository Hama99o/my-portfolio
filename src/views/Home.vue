<template>
  <div class="portfolio-container container">
    <b-container fluid>
      <b-row>
        <b-col offset-md="2">
          <moon-or-sun-menu :theme="theme" :hasNightMood="hasNightMood" />
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col cols="6" md="2" class="my-4">
          <my-photo/>
        </b-col>
        <b-col cols="12" md="10">
          <div class="mb-4">
            <ul class="nav nav-pills">
              <li class="nav-item m-1" v-for="(text, routeName, index) in  $t('message.heading')" >
                <router-link class="nav-link" :class="linkClassForTabs(index)" :to="{ name: routeName }">
                  <code @click="clickOnMenu(index)">{{text}}</code>
                </router-link>
              </li>
            </ul>
          </div>
          <router-view> </router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import MyPhoto from '@/components/MyPhoto'
import MoonOrSunMenu from '@/components/MoonOrSunMenu'

export default {
  name: 'Home',
  components: { MyPhoto, MoonOrSunMenu },
  data () {
    return {
      menuList: {
        'PersonalProfile':  0,
        'ExperienceAndEducation': 1,
        "Skill": 2,
        'Contact': 3
      }
    }
  },
  computed: {
    hasNightMood () {
      return this.$store.state.hasNightMood
    },
    tabIndex: {
      get () {
        return this.tabIndex = this.menuList[`${this.$route.name}`]
      },
      set (val) {}
    }
  },
  methods: {
    clickOnMenu (id) {
      this.tabIndex = id
    },
    theme () {
      const body = document.querySelector('body')
      body.classList.toggle('nightmode')
      this.$store.state.hasNightMood = !this.$store.state.hasNightMood
      localStorage.hasNightMood = this.$store.state.hasNightMood
    },
    linkClassForTabs (idx) {
      const linkClass = []
      if (!this.hasNightMood) {
        this.tabIndex === idx ? linkClass.push('bg-dark', 'text-white') : linkClass.push('text-dark')
      } else {
        this.tabIndex === idx ? linkClass.push('text-dark', 'bg-white') : linkClass.push('bg-dark', 'text-white')
      }
      return linkClass
    }
  },
  mounted () {
    this.$nextTick(() => {
      const body = document.querySelector('body')
      if (localStorage.hasNightMood  && JSON.parse(localStorage.hasNightMood)) {
        body.classList.add('nightmode')
        this.$store.state.hasNightMood = true
      }
    })
  }
}
</script>

<style scoped>

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

@media (max-width: 768px) {
  .nav-link {
    font-size: 12px;
  }
  .nav-item {
    float: left;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
