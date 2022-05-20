<template>
   <div class="composant">
      <form action="" @submit.prevent="LoginRequest" class="composant__form">
         <div class="form log">
            <div class="form__input">
                <input v-model.trim="email" type="email" name="email" placeholder="E-mail">
            </div>
            <div class="form__input">
                <input v-model.trim="password" type="password" name="password" placeholder="Mot de passe">
                <p v-if="haveError()"> {{ $store.state.error }} </p>
            </div>
            <div class="">
               <button @blur="cleanStore()" type="submit" :disabled="isDisabled()" class="btn form__button" :class="{'disabled':isDisabled()}">
                  <span v-if="$store.state.status == 'loading'">Connexion en cours...</span>
                  <span v-else>Se connecter</span>
               </button>
            </div>
        </div>
      </form>
      <div class="logo">
          <img src="../../public/images/black-logo.png" alt="logo-groupomania"/>
      </div>
   </div>
</template>

<script>
// @ is an alias to /src
//import LoginComp from '@/components/LoginComp.vue'

export default {
  name: 'LoginView',
  data: function(){
     return {
        email: '',
        password: '',
     }
  },
  mounted() {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user && this.$store.state.user.userId == user.userId){
            console.log(user)
            this.$router.push('/');
            return ;
        }
    },
  computed: {

    
  },
  methods: {
      haveError(){
         if(this.$store.state.error){
            return true
         }else {
            return false
         }
      },
      cleanStore(){
         this.$store.commit('clearError');
      },
      isDisabled(){
         if(this.email == "" || this.password == ""){
               return true;
         }else {
               return false;
         }
      },
      
      LoginRequest(){
         this.$store.dispatch('LoginRequest', {
            email: this.email,
            password: this.password
         })
      }
  },

}
</script>

<style lang="scss">




.composant{
   background-color: $secondary-color;
   height: 85%;
   @include tablets{
          height: 88%;
   }
   @include mobiles{
            height: 90%;
   }
   display: flex;
   flex-direction: column;
   justify-content: center;
   border-bottom-left-radius: 20px;
   border-bottom-right-radius: 20px;
   &__form{  
      height: 100%;
      @include tablets{
         margin-top: 3%;
      }
      @include mobiles{
         margin-top:25%;
      }
      display: flex;
      align-items: center;
      justify-content: center;
   }
}
.logo{
   height:30%;
   width: 100%;
   img{
      object-fit: cover;
      width: 80%;
      max-width: 80%;
      max-height: 100%;
   }
}
.form{
   height: 80%;
   width: 60%;
   margin: 8% auto auto auto;
   display: flex;
   flex-direction: column;
   gap: 40px;
   @include mobiles{
      height: 70%;
      width: 90%;
   }
   &.log{
      margin:12% auto auto auto;

   }
   &__input{
      input{
         width: 85%;
         height: 40px;
         font-size:20px;
         border-radius:50px;
         padding-left:15px;
         color: $primary-color;
         border:none;
         &:focus{
             outline: 2px solid $primary-color;
         }
      }
   }
   &__button{
      margin: 5% auto 0 auto;
      &:focus{
         outline:2px solid black !important;
      }
      &.disabled{
         background-color:darken($primary-color, 5);
         color:lighten($primary-color, 20);
         &:hover{
            box-shadow:none;
            cursor: wait ;
            
         }
      }
   }
   &.signup{
      gap:20px;
      @include mobiles{
         gap: 30px;
      }
   }
}

.error{
   font-size: 14px;
   margin: 2% auto 0 auto;
}




</style>
