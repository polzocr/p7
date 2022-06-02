<template>
  <div id="app" role="main">
    <div v-if="!connected()" class="login">
      <div class="login__element">
        <div class="login__element__nav" role="navigation">
          <div class="navigation left" :class="{'active':loginPage()}">
            <router-link to="/login" id="login--signup" aria-label="Direction Se connecter" role="link"><i class="fa fa-user-circle"></i>Se connecter</router-link> 
          </div>
          <div class="navigation" :class="{'active':signupPage()}" >
            <router-link to="/signup" id="login--signup" aria-label="Direction S'inscrire" role="link"><i class="fa fa-list-alt"  ></i>S'inscrire</router-link>
          </div>
        </div>
        <router-view/>
      </div>
    </div>
      <div id="sidemenu" v-else role="navigation">
        <div class="sidemenu__nav">
          <button class="sidemenu__btn" @blur="navOpen=false" @click="navOpen=!navOpen" :class="{active:navOpen}" role="button">
              <span class="top"></span>
              <span class="mid"></span>
              <span class="bottom"></span>
          </button>
          <div class="sidemenu__logo">
            <router-link to="/" class="top__logo__img" aria-label="Direction Accueil" role="link"><img src="../public/images/icon-white.png" alt="icone-groupomania"/></router-link>
          </div>
        </div>
        
        <transition name="translateX">
          <nav v-show="navOpen">
            <div class="sidemenu__wrapper">
              <div class="sidemenu__create">
                <router-link to="/createpost" class="sidemenu__create__link" aria-label="Direction Creation d'article" role="link"><i class="fa fa-plus"></i>
                  <p>Créer un article</p>
                </router-link>
              </div>
              <div class="sidemenu__user">
                <router-link :to="{name: 'Profile', params:{id: this.$store.state.user.userId} }" class="sidemenu__user__link" aria-label="Direction page profile" role="link"><i class="fa fa-user" ></i>
                  <p>Votre profile</p>
                </router-link>
                <router-link v-if="isAdmin()" to="/users" class="sidemenu__user__link" aria-label="Direction page admin" role="link"><i class="fa fa-lock" ></i>
                  <p>Page Admin</p>
                </router-link>
                <router-link @click.native="deconnexion()" to="" class="sidemenu__user__link" aria-label="Deconnexion" role="link"><i class="fa fa-arrow-right"></i>
                  <p>Se Deconnecter</p>
                </router-link>  
              </div>
            </div>
          </nav>
        </transition>
      </div>
      <router-view/>
    
    
  </div>
</template>

<script>




export default {
  name: 'App',
  data: function(){
    return {
      navOpen: false,
    }
  },
  methods: {
    //sur quelle page est l'utilisateur pour savoir si on affiche le login ou le signup
    loginPage(){
      if(this.$route.path == '/login'){
        return true
      } else {
        return false
      }  
    },
    signupPage(){
      if(this.$route.path == '/signup'){
        return true
      } else {
        return false
      }  
    },
    //l'utilisateur est-il connecté?
    connected(){
      const user = JSON.parse(localStorage.getItem('user'));
      if(user && this.$store.state.user.userId == user.userId ){
        return true;
      } else {
        return false;
      }
    },
    //appel de la fonctions deconnexion du store
    deconnexion(){
      this.$store.dispatch('deconnexion', {
          userId: -1,
          token: ''
      });
      this.$router.push('/login')
    },
    //l'utilisateur est-il un admin
    isAdmin(){
      const user = JSON.parse(localStorage.getItem('user'));
      if(user.userId == 1){
          return true
      } else {
          return false
      }
    },
  },
}
</script>


<style lang="scss">

//=================================
//    style app entiere
//=================================
html {
  scroll-behavior: smooth;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  box-sizing: border-box; 
}

body{
  background: url('../public/images/bc1.png') no-repeat;
  background-size: 100% 100%;
  object-fit: cover;
  margin: 0;
  @include mobiles{
      background-color: $tertiary-color;
  }
}

.btn{
  background-color: $primary-color;
  border: 2px solid $primary-color;
  border-radius: 30px;
  box-shadow: 0 0 40px 40px $primary-color inset, 0 0 0 0 primary-color;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  color: black;

  cursor: pointer;
  text-decoration: none;

  display: flex;
  align-self: center;
  text-align: center;
  text-transform: uppercase;

  
  
  padding: 19px 45px;
  
  transition: all 150ms ease-in-out;
  &:hover {
    box-shadow: 0 0 10px 0 $primary-color inset, 0 0 10px 4px $primary-color;
    background-color: transparent;
  }
}

.toast-container{
   left: 10px !important;
   @include mobiles-toaster{
     flex-direction: row !important;
     top: 10% !important;
     min-width: 100%;
   }
}

.toast{
    background-color: rgb(63, 216, 63) !important;
    font-size: 17px !important;
    font-weight: 500 !important;
    color: $tertiary-color !important;
    @include mobiles-toaster{
      border-radius: 30px !important;
      margin: 2% auto 0 auto;
    }
    &.error{
      background-color: rgb(255, 9, 9) !important;  
      color: white !important;
    }
}

//=================================
//    style page login et signup
//=================================

.login{
   display: flex;
   align-items: center;
   height: 1704px;
   
   @include mobiles{
     height: 852px;
   }
   @include tablets{
     height: 852px;
   }
   @include small-desktop{
     height: 946px;
   }
   @include normal-desktop{
     height: 946px;
   }
   @include big-desktop{
     height: 1150px;
   }
   &__element{
      width: 60%;
      margin: auto;
      height: 70%;
      @include tablets{
        height: 75%;
        width: 70%;
      }
      @include mobiles{
      height: 100%;
      width: 100%;
      }
      @include big-desktop{
        margin-top:2%;
      }
      

      display:flex;
      flex-direction: column;
      justify-content: center;

      &__nav{
         height: 13%;
         display: flex;
         justify-content: space-evenly;
         align-items: center;
        @include tablets{
          height: 12%;
        }
        @include mobiles{
          height: 10%;
        }
      }
      
   }
}

#login--signup{
   font-size: 30px;
   color: black;
   text-decoration: none;
   &:hover{
      font-size: 36px;
      transition: all 450ms ease ;
      cursor: pointer;
   }
}

.navigation{
   width: 100%;
   height: 101%;
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: #CAD2E7;
   border-top-left-radius: 20px;
    border-top-right-radius: 20px;
   &.left{
   }
   i{
      margin-right:15px;
      color: $primary-color;
   };
}
.active{
  background-color: $secondary-color;
}

//=================================
//  style navbar apres connexion
//=================================


#sidemenu {
  @include all-desktop{
    width: 100%;
    height: 80px;
    background-color: $tertiary-color;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    z-index: 2;
  }
	nav {
		width: 100%;
		background: $tertiary-color;
		position: fixed;
		top: 70px;
		left: 0;
		z-index: 99;
    @include all-desktop{
      display: block !important;
      width: 70%;
      position: initial;
    }
	}

	.sidemenu {
    
    &__nav{
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99;
      display: flex;
      gap: 2%;
      padding-right: 2%;
      background-color: $tertiary-color;
      @include all-desktop{
        padding-left: 1%;
        position: initial;
        width: 30%;
      }
    }
    &__logo{
      width: 78%;
      height: 70px;
      @include all-desktop{
        width: 100%;
        height: 80px;
      }
      & img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
		&__btn {
			display: block;
      width: 16%;
			height: 70px;
			background: $tertiary-color;
			border: none;
			position: relative;
			z-index: 100;
			appearance: none;
			cursor: pointer;  
      @include all-desktop{
        display: none;
      }

			span {
				display: block;
				width: 20px;
				height: 2px;
				margin: auto;
				background: white;
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				transition: all .4s ease;

				&.top {
					transform: translateY(-8px);
				}

				&.bottom {
					transform: translateY(8px);
				}
			}
			&.active{
				.top {
					transform: rotate(-45deg);
				}
				.mid{
					transform: translateX(-20px) rotate(360deg);
					opacity: 0;
				}
				.bottom {
					transform: rotate(45deg);
				}
			}
    }
    &__wrapper {
      width: 95%;
      margin: auto;
      padding: 2%;
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 5px;
      @include all-desktop{
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0;
        width: 100%;
        height: 100%;
      }
      p{
        text-align: start;
        font-size: 25px;
        color: $primary-color;
        @include all-desktop{
          display: none;
        }
      }
      i{
        color: $primary-color;
        font-size: 30px;
        border: 2px solid $primary-color;
        border-radius: 50%;
        padding: 3%;
          &:hover{
          transform: scale(1.2);
          transition: all 400ms ease-in-out;
        }
        @include all-desktop{
          font-size: 50px;
          padding: 3%;
        }
      }
    }

    &__create{
      width: 100%;
      @include all-desktop{
        width: 25%;
        margin-left: 15%;
      }
      &__link{
        display: flex;
        align-items: center;
        justify-content: start;
        width: 100%;
        text-decoration: none;
        gap: 10px;
        @include all-desktop{
          justify-content: center;
        }
      }
    }

    &__user{
      width: 100%;
      @include all-desktop{
        display: flex;
        align-items: center;
        width: 20%;
      }
      &__link{
        display: flex;
        align-items: center;
        justify-content: start;
        width: 100%;
        text-decoration: none;
        gap: 10px;
        @include all-desktop{
          justify-content: center;
        }
        i{
          @include all-desktop{
            border: none;
          }
        }
      }
    }

		

		&__item {
			a {
        text-decoration: none;
				line-height: 1.6em;
				font-size: 1.6em;
				padding: .5em;
				display: block;
				color: white;
				transition: .4s ease;

				&:hover {
					background: lightgrey;
					color: dimgrey;
				}
			}
		}
	}
}

//=================================
//  style transitions
//=================================


.translateX-enter{
	transform:translateX(-200px);
	opacity: 0;
}

.translateX-enter-active,.translateX-leave-active{
	transform-origin: top left 0;
	transition:.2s ease;
}

.translateX-leave-to{
	transform: translateX(-200px);
	opacity: 0;
}






</style>
