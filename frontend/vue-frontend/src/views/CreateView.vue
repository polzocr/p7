<template>
    <section class="createPost" role="region" aria-label="Formulaire de creation d'article">
        <form action="" @submit.prevent="PostRequest" class="createPost__form">
            <div class="createPost__form__title">
                <input v-model="title" type="text" placeholder="Titre" aria-required="true" aria-invalid="true" aria-label="titre">
            </div>
            <div class="createPost__form__text">
                <textarea v-model="text" rows="5" cols="60"  placeholder="Votre texte" aria-required="false" aria-invalid="false" aria-label="text"></textarea>
            </div>
            <div class="createPost__form__file">
                <label class="btn upload" for="upload" role="button" aria-label="bouton navigation dans les fichiers">Choisir un fichier</label>
                <input @change="changeFile()" id="upload" type="file" accept="image/*" ref="fileInput" name="image" aria-required="false" aria-invalid="false" aria-label="choix d'une image">
            </div>  
            <div class="createPost__form__button" >
                <button class="btn" :class="{'disabled': isDisabled()}" type="submit" role="bouton" aria-label="bouton validation formulaire">Créer votre article</button>
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
        //changement du fichier avec vérification du format
        //error == true si format incorrect
        changeFile(){
            const file = this.$refs.fileInput.files[0];
            const MIME_TYPES = {'image/jpg' : 'jpg','image/jpeg': 'jpg','image/png': 'png','image/gif':'gif'};
            if(Object.keys(MIME_TYPES).includes(file.type)){
                this.error = false;
                this.file = file;
            } else {
                this.error = true;
                this.$store.commit('error_toasting', 'Uniquement les images et les gifs sont acceptés')
            }
        },
        //requete de créatioin de l'article
        PostRequest(){
            const data = {'image': this.file, 'name':this.title, 'text':this.text, 'userId': this.$store.state.user.userId}
            if(!this.isDisabled() && this.error == false){
                this.$store.dispatch('PostPostRequest', {data})
            }
        },
        //impossible de créé l'article sans titre et sans bon format
        isDisabled(){
            if(this.title == '' || this.error == true){
                return true;
            }else {
                return false;
            }
        },
    },

}
</script>

<style lang="scss">

//=================================
// style du formulaire de création
//=================================

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

//=================================
//    style du choix de fichier
//=================================

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





</style>