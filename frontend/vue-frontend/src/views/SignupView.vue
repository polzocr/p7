<template>
   <div class="composant">
       <form action="" @submit.prevent="SignupRequest" class="composant__form">
            <div class="form signup">
                <div class="form__input">
                    <input @input="testLastName()" v-model.trim="lastName" type="text" name="lastName" placeholder="Nom">
                    <p class="error" v-if="errorLastName">{{ errorLastName }}</p>
                </div>
                <div class="form__input">
                    <input v-model.trim="firstName" type="text" name="firstName" placeholder="Prénom">
                </div>
                <div class="form__input">
                    <input @input="testEmail()" v-model.trim="email" type="email" name="email" placeholder="E-mail"> 
                    <p class="error" v-if="errorEmail">{{ errorEmail }}</p>
                </div>
                <div class="form__input">
                    <input @input="testPassword()" v-model.trim="password" type="password" name="password" placeholder="Mot de passe">
                    <p class="error" v-if="errorPassword">{{ errorPassword }}</p>
                </div>
                <div class="">
                    <button type="submit" :disabled="isDisabled()" class="btn form__button btn-signup" :class="{'disabled':isDisabled()}">
                        <span v-if="$store.state.status == 'loading'">Création en cours...</span>
                        <span v-else>S'enregistrer</span>
                    </button>
                    <p class="error" v-if="errorValidation"> {{ errorValidation }}</p>
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


export default {
    name: 'SignupView',
    data: function(){ 
            return {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                errorLastName: '',
                errorEmail: '',
                errorPassword: '',
                errorValidation: '',
            }
            },
    computed: {
        
    },
    mounted() {
        const user = JSON.parse(localStorage.getItem('user'));
        if(user && this.$store.state.user.userId == user.userId){
            this.$router.push('/');
            return ;
        }
    },
    methods:{
        testPassword(){
            const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
            if(regexPassword.test(this.password)){
                this.errorPassword = "";
                this.errorValidation= "";
                return true;
            } else {
                this.errorPassword = "Le mot de passe est trop simple";
                return false;
            }
        },
        testEmail(){
            const regexEmail = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(regexEmail.test(this.email)){
                this.errorEmail = "";
                this.errorValidation= "";
                return true;
            } else {
                this.errorEmail = "Ce n'est pas une email valide";
                return false;
            }
        },
        testLastName(){
            const regexLastName =  /^[a-zA-Zàáâäãåąčćęèéêëėįìíîïłńòóôöõùúûüųūÿýżźñç ,.'-]+$/u;
            if(regexLastName.test(this.lastName)){
                this.errorLastName = "";
                this.errorValidation= "";
                return true;
            } else {
                this.errorLastName = "Le nom doit être correct";
                return false;
            }
        },
        isDisabled(){
            if(this.lastName == "" || this.email == "" || this.password == ""){
                return true;
            }else {
                return false;
            }
        },
        SignupRequest(){
            if(this.testPassword() && this.testEmail() && this.testLastName() && !this.isDisabled()){
                this.errorValidation = '';
                console.log("La validation est correcte");

                this.$store.dispatch('SignupRequest', {
                lastName: this.lastName,
                firstName: this.firstName,
                email: this.email,
                password: this.password
                })
            } else {
                this.errorValidation = 'Veuillez remplir correctement vos informations personnelles';
            }
        
        }
    }
}
</script>
