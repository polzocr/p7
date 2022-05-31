<template>
    <section class="createPost">
        <form action="" @submit.prevent="PostRequest" class="createPost__form">
            <div class="createPost__form__title">
                <input v-model="title" type="text" placeholder="Titre">
            </div>
            <div class="createPost__form__text">
                <!-- <input v-model="text" type="text" placeholder="Text"> -->
                <textarea v-model="text" rows="5" cols="60"  placeholder="Votre texte"></textarea>
            </div>
            <div class="createPost__form__file">
                <label class="btn upload" for="upload">Choisir un fichier</label>
                <input @change="changeFile()" id="upload" type="file" accept="image/*" ref="fileInput" name="image">
            </div>  
            <div class="createPost__form__button" >
                <button class="btn" :class="{'disabled': isDisabled()}" type="submit">Créer votre article</button>
            </div>            
        </form>
    </section>
</template>

<script>

export default {
    name: 'CreateView',
    data: function(){
        return {
            title: '',
            text: '',
            file: '',
            error: false,
        }
    },
    methods:{
        changeFile(){
            const file = this.$refs.fileInput.files[0];
            const MIME_TYPES = {'image/jpg' : 'jpg','image/jpeg': 'jpg','image/png': 'png','image/gif':'gif'};
            if(Object.keys(MIME_TYPES).includes(file.type)){
                this.error = false;
                this.file = file;
            } else {
                this.error = true;
                alert('Uniquement les images et les gifs sont acceptés')
            }
        },
        PostRequest(){
            const data = {'image': this.file, 'name':this.title, 'text':this.text, 'userId': this.$store.state.user.userId}
            if(!this.isDisabled() && this.error == false){
                this.$store.dispatch('PostPostRequest', {data})
                .then(() => {
                    this.$toasted.show(
                        'Article créé avec succès !', {
                            icon : {
                                //name : 'exclamation-triangle',
                                name : 'check',
                            },
                            position : 'top-left',
                            duration: 2500,
                            keepOnHover: true,
                            containerClass: 'toast-container',
                            className: 'toast',
                            theme:'bubble'
                            

                    });
                })
                .catch(error => error)
            }
        },
        isDisabled(){
            if(this.title == '' || this.error == true){
                return true;
            }else {
                return false;
            }
        },
    },
    beforeCreate(){
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user || this.$store.state.user.userId !== user.userId){
            console.log(user)
            this.$router.push('/login');
            return ;
        } 
    },

}
</script>

<style lang="scss">
.createPost{
    height: 1073px;
    @include tablets{
        margin-top: 15%;
    }
    @include mobiles{
        margin-top: 25%;
    }
    
    margin-top: 10%;
    &__form{
       background-color: $secondary-color;
        border-radius: 20px;
        padding: 2%;
        width: 50%;
        height: 50%;
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 7%;
        @include mobiles{
            width: 90%;
            gap: 2%;
        }
        &__title{
            height: 10%;
            input{
                padding-left: 2%;
                font-size: 20px;
                color: $tertiary-color;
                border: none;
                border-radius: 20px;
                width: 60%;
                height: 90%;
                @include mobiles{
                    margin-top: 2%;
                    width: 70%;
                    height: 80%;
                    padding-left: 4%;
                }
                //word-break: break-word;
                &:focus{
                    outline: 2px solid $primary-color;
                }
            }
        }
        &__text{
            display: flex;
            align-items: center;
            height: 45%;
            textarea{
                font-family: Avenir, Helvetica, Arial, sans-serif;
                padding: 2%;
                font-size: 20px;
                color: $tertiary-color;
                border: none;
                border-radius: 20px;
                width: 100%;
                height: 80%;
                @include mobiles{
                    padding-left: 4%;
                    padding-top: 4%;
                }
                &:focus{
                    outline: 2px solid $primary-color;
                }
            }
        }
        &__file{
            display: flex;
            justify-content: start;
            position: relative;
            z-index: 1;
            @include mobiles{
                 overflow: scroll;
            }
            input[type="file" i]{
                font-size: 20px;
                position: absolute;
                z-index: -1;
                left: 21px;
                top: 5px;
                
                
            }
        }
        &__button{
            height: 30%;
            display: flex;
            justify-content: center;
            align-items: center;
            .btn{
                &.disabled{
                    background-color:darken($primary-color, 5);
                    color:lighten($primary-color, 20);
                    &:hover{
                        box-shadow:none;
                        cursor: wait ;
                        
                    }
                }
            }
        }

    }    
}



.upload {
    background-color: $tertiary-color;
    color: $primary-color;
    border: none;
    padding: 12px 12px;
    border-radius: 5px;
    &:hover{
        box-shadow: 0 0 10px 0 $primary-color inset, 0 0 10px 4px $primary-color;
        background-color: $tertiary-color;
    }
}

.toast-container{
   left: 10px !important;
}

.toast{
    background-color: rgb(63, 216, 63) !important;
    font-size: 17px !important;
    font-weight: 500 !important;
    color: $tertiary-color !important;
}
.fa-check{
}

</style>