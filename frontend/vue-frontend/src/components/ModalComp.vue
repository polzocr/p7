<template>
    <transition name="modal-transition">
        <div class="modal">
            <form enctype="multipart/form-data" class="modal__box">
                <div class="modal__box__title">
                    <input id="title" :value="title" type="text">
                    <button class="btn btn-close" @click="$emit('close')"><i class="fa fa-times" aria-hidden="true"></i></button>
                </div>
                <div class="modal__box__text">
                    <textarea id="text" :value="text" rows="5" cols="60"></textarea>
                </div>
                <div class="modal__box__image"  v-if="this.image_url !== null">
                    <img :src="image_url" alt="image_PutRequest"/>
                </div>
                <div class="modal__box__file">
                    <label class="btn upload" for="upload">Choisir un fichier</label>
                    <input @change="changeFile()" id="upload" type="file" accept="image/*" ref="fileInput" name="image">
                </div>
                <div class="modal__box__btn">
                    <button class="btn btn-modal" @click.prevent="ModifyRequest()">Modifier</button>
                    
                    <button class="btn btn-modal" @click.prevent="DeleteRequest()">Supprimer</button>
                </div>
            </form>    
              
        </div>
    </transition>
        
</template>

<script>
export default {
        name: "ModalComp",
        data: function(){
            return {
                getDisabled: false,
                error: false,
            }
        },
        props: {
            id:{
                type: Number,
                required: true,
                default: 0
            },
            userId: {
                type: Number,
                required: true,
                default: 0
            },
            title: {
                type: String,
            },
            text: {
                type: String
            },
            image_url: {
                type: String,
            }
        },
        methods: {
            isDisabled(){
                const title = document.getElementById('title').value
                if(title == ''){
                    return this.getDisabled = true;
                }else {
                    return this.getDisabled = false;
                }
            },
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
            ModifyRequest(){
                const user =  JSON.parse(localStorage.getItem('user'))
                const title = document.getElementById('title').value;
                const text = document.getElementById('text').value;
                const data = {'image': this.file, 'name':title, 'text':text , 'id':this.id}
                if(title !== '' && this.error == false){
                    if(user.userId !== this.userId){
                        this.$router.push('/login')
                    } else {
                        this.$store.dispatch('PutPostRequest', {data})
                        .then(() => {
                            this.$toasted.show('Modification Réussie !', {
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
                } else {
                    document.getElementById('title').placeholder = "Le titre est indispensable";
                    alert('Uniquement les images et les gifs sont acceptés')
                }
                
            },
            DeleteRequest(){
                const user =  JSON.parse(localStorage.getItem('user'))
                if(user.userId !== this.userId){
                    this.$router.push('/login')
                } else if(confirm('Vous-vous supprimer cet article ?')){ 
                    this.$store.dispatch('DeleteRequest', {id:this.id})
                    .then(() => {
                        this.$toasted.show('Article supprimé !', {
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
        },
}
</script>

<style lang="scss">
.modal {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;
    &__box{
        background-color: $secondary-color;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
        
        width: 60%;
        border-radius: 20px;
        margin: auto;
        padding: 2%;

        display: flex;
        flex-direction: column;
        gap: 20px;
        position: relative;
        @include mobiles{
                width: 90%;
                padding-top: 4%;
        }
        
        &__title{
            display: flex;
            justify-content: center;
            input{
                padding-left: 2%;
                font-size: 20px;
                color: $tertiary-color;
                border: none;
                border-radius: 20px;
                width: 50%;
                height: 40px;
                @include mobiles{
                    margin-top:5%;
                    width: 70%;
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
            textarea{
                font-family: Avenir, Helvetica, Arial, sans-serif;
                padding: 2%;
                font-size: 20px;
                color: $tertiary-color;
                border: none;
                border-radius: 20px;
                width: 90%;
                height: 60%;
                margin: auto;
                &:focus{
                    outline: 2px solid $primary-color;
                }
            }
        }
        &__image{
            width: 93%;
            height: 400px;
            margin: 0 auto 0 auto;
            @include mobiles{
                height: 220px;
            }
            @include tablets{
                height: 300px;
            }
            img{
                width: 100%;
                height: 100%;
                border-radius: 20px;
            }
        }
        &__file{
            display: flex;
            justify-content: start;
            position: relative;
            z-index: 1;
            margin: 2% 0 0 4%;
            overflow: scroll;
            input[type="file" i]{
                font-size: 20px;
                position: absolute;
                z-index: -1;
                left: 21px;
                top: 5px;
                
                
            }
        }
        &__btn{
            display: flex;
            justify-content: space-between;
            padding: 2%;
            padding-bottom: 0;
            @include mobiles{
                flex-direction: column;
                gap: 10px;
                padding: 0;
            }
        }
    }
}
.btn-close{
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 10px;
    border-top-right-radius: 20px;
    padding:7px 15px;
    background-color:$secondary-color;
    border: none;
    i{
        font-size: 30px;
        color: $tertiary-color;
    }
}

.btn-modal{
    @include mobiles{
        width: 60%;
        display: flex;
        justify-content: center;
        padding: 10px 49px
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




.modal-transition-enter,.modal-transition-leave-to {
    opacity: 0;
}

.modal-transition-enter-active,.modal-transition-leave-active {
    transition: opacity 2s ease;
}

</style>