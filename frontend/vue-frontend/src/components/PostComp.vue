<template>
    <section class="home">
            <section class="homePost">
                <div class="homePost__title">
                    <p id="names" v-if="user" >{{ user.firstName }} {{ user.lastName }}</p>
                    <p id="post-title">{{ title }}</p>
                    <div id="delete__flexbox">
                        <p>{{ date() }} </p>
                        <div v-if="ownPost()" class="dropdown">
                            <button class="btn btn-delete dropdown__icon"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></button>
                            <div class="dropdown__content">
                                <button @click.prevent="showModal = true" class="btn btn-delete"><i class="fa fa-pen" aria-hidden="true"></i></button>
                                <button @click.prevent="DeleteRequest()" class="btn btn-delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>
                        
                    <Modal v-if="showModal" @close="showModal = false"
                    :id="this.id"
                    :userId="this.userId"
                    :title="this.title"
                    :text="this.text"
                    :image_url="this.image_url"
                    />
                </div>
                <div class="homePost__text">
                    <p> {{ text }} </p>
                    
                </div>
                <div class="homePost__image" v-if="this.image_url !== null">
                    <img :src="image_url" alt="imagePost"/>
                </div>
                <div class="homePost__footer">
                        <div class="homePost__footer__comment">
                            <i @click="showComments()" class="fa fa-comment" aria-hidden="true"></i>
                            <p id="nbComments" v-if="nbComments">{{ nbComments.length }}</p>
                        </div>
                        <div class="homePost__footer__like" v-if="likes && like()">
                                <p> {{nbLikes()}}</p>
                                <i  class="fa fa-thumbs-up" :class="{'btn-like': this.liked}" aria-hidden="true"></i>
                                <p> {{nbDislikes()}}</p>
                                <i  class="fa fa-thumbs-down" :class="{'btn-like': !this.liked}" aria-hidden="true"></i> 
                        </div>
                        <div class="homePost__footer__like" v-else>
                            <p>{{ nbLikes() }}</p>
                            <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                            <p>{{ nbDislikes() }}</p>
                            <i class="fa fa-thumbs-down" aria-hidden="true"></i>
                        </div>
                </div>
                <div class="homePost__comment">
                    <div class="homePost__comment__input">
                        <input v-model="textComment" id="textComment" type="text" placeholder="Votre commentaire"/>
                    </div>
                    <div class="homePost__comment__button">
                        <button @click.prevent="CommentRequest()" class="btn btn-comment" :class="{'disabled':isDisabled()}" >Commenter</button>
                    </div>
                </div>
                

                <section class="commentsPage" v-if="showComment && nbComments.length !== 0">
                <CommentComp v-for="(comment, index) in this.comments"
                :key="index"
                :firstName="comment.UserFirstName"
                :lastName="comment.UserLastName"
                :text="comment.text"
                :created_at="comment.created_at"
                /></section>
            </section>
        </section>
</template>

<script>
import CommentComp from '@/components/CommentComp.vue'
import Modal from '@/components/ModalComp.vue'
import axios from 'axios'

    export default {
        name: "PostComp",
        components: {
            CommentComp, Modal
        },
        props: {
            modify: {
                type: Boolean,
                default: () => false
            },
            clickable: {
                type: Boolean,
                default:() => true
            },
            id:{
                type: Number,
                required: true,
                default: 0
            },
            userId:{
                type: Number,
                required: true,
                default: 0
            },
            created_at:{
                type: String
            },
            nbComments:{
                type: Array,
            },
            user: {
                type: Object,
            },
            likes:{
                type: Array
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
        data: function() {
            return {
                localName: this.title,
                localText: this.text,
                file: this.image_url,
                idPost: '',
                showComment: false,
                textComment: '',
                comments: [{}],
                showModal: false,
                liked: false
            }
        },
        computed:{
            
        },
        created(){

        },     
        methods: {
            nbLikes(){
                let nb = 0;
                this.likes.forEach(like => {
                    if(like.stateLike == true){
                        nb = nb + 1;
                    }
                })
                return nb
            },
            nbDislikes(){
                let nb = 0;
                this.likes.forEach(like => {
                    if(like.stateLike == false){
                        nb = nb + 1;
                    }
                })
                return nb
            },
            like(){
                const user =  JSON.parse(localStorage.getItem('user'))
                let like_exist = false
                if(this.likes.length !== 0){
                    this.likes.forEach(like => {
                        if(like.userId == user.userId){
                            this.liked = like.stateLike
                            like_exist = true
                        } 
                    })
                    return like_exist
                } else {
                    return false
                }
                
            },
            date(){
                if(typeof this.created_at !== 'undefined'){
                    const date =  this.created_at.split('T')[0]
                    const day = date.split('-')[2]
                    const month = date.split('-')[1]
                    const year = date.split('-')[0]
                    return day+ '/' + month + '/' + year
                }
            },
            CommentRequest(){
                if(this.textComment !== ''){
                    this.$store.dispatch('CreateCommentRequest', {
                        PostId: this.id ,
                        text: this.textComment
                    })
                }
            },
            isDisabled(){
                if(this.textComment == "" ){
                    return true;
                }else {
                    return false;
                }
            },
            showComments(){
            this.comments = [{}];
            const user =  JSON.parse(localStorage.getItem('user'))
            const instance = axios.create({baseURL: 'http://localhost:3000/',});
            instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
            instance.get('/'+ this.id + '/comments')
            .then(comments => {
                comments.data.forEach(element => {
                    this.comments.push({
                        UserFirstName: element.User.firstName,
                        UserLastName: element.User.lastName,
                        text: element.text,
                        created_at: element.createdAt
                    })
                })
            }).then(() => {
                this.showComment = !this.showComment
            })
            .catch(error => console.log(error))
            .catch(error => console.log(error ,'Insuccès de lappel des commentaires'));
            
            },
            ownPost(){
                const user = JSON.parse(localStorage.getItem('user'))
                if(this.userId == user.userId){
                    return true
                } else {
                    return false
                }
            },
            modifyComp(){
                const paramsId =  this.$route.params.id;
                const id = this.id;
                console.log('--------------------')
                console.log("paramsId: " + paramsId);
                console.log("id: "+id)
                if(paramsId == id && this.ownPost()) {
                    console.log("true")
                    return true
                } else if (paramsId == undefined) {
                    console.log('false')
                    return false 
                } else {
                    console.log("REDIRIRECTION")
                }
            },
            emitModify(){
                const title = document.getElementById('title').value;
                const text = document.getElementById('text').value;
                const data = {'image': this.file, 'title':title, 'text':text , 'id':this.$route.params.id}
                this.$emit('Modifying', { data })
            },
            changeFile(){
                this.file = this.$refs.fileInput.files[0];
            },
            emitDelete(){
                this.$store.dispatch('DeleteRequest', {id:this.id})
            },
            emitComment(){
                const textComment = document.getElementById('textComment').value
                this.$emit('Commenting', {
                    PostId: this.id ,
                    text: textComment
                })
            },
            DeleteRequest(){
                // this.$emit('modify', {postId: this.id})
                if(confirm('Vous-vous supprimer cet article ?')){
                    this.$store.dispatch('DeleteRequest', {id:this.id})
                }
            },
            GetToPost(){
                this.$store.state.postUserId = this.userId
                this.$router.push('/post/' + this.id)
            },
            ModifyRequest(){
                const title = document.getElementById('title').value;
                const text = document.getElementById('text').value;
                const data = {'image': this.file, 'title':title, 'text':text , 'id':this.$route.params.id}
                this.$store.dispatch('PutPostRequest', {data})
            },
        }
    }
</script>

<style lang="scss">
.home{
    width: 70%;
    margin:7% auto auto auto;
    @include mobiles{
        width: 95%;
        margin: 25% auto 0 auto;
    }
    @include tablets{
        margin-top: 10%;
        width: 80%;
    }
    @include big-desktop{
        width: 55%;
    }

    
}



.homePost{
    background-color: $secondary-color;
    
    border-radius: 30px;
    @include mobiles{
        border-radius: 20px;
    }
    &__title{
        padding: 0 2%;
        display: flex;
        justify-content: space-between;
        position: relative;
        &:after{
            content:"";
            position: absolute;
            width: 96%;
            bottom: 0;
            left: 15px;
            border-bottom: 1px solid $tertiary-color;
            @include mobiles{
                width: 90%;
            }
        }        
    }
    &__link{
        text-decoration: none;
        color: $tertiary-color;
    }
    &__text{
        font-size: 20px;
        padding: 1.5%;
        text-align: left;
    }
    &__image{
        height: 430px;
        @include mobiles{
            height: 300px;
        }
        img{
            width: 100%;
            height: 100%;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius:5px;
            object-fit: fill;
        }
    }
    &__footer{
        padding-left:2.5%;
        padding-right:2.5%;
        display: flex;
        justify-content: space-between;
        position: relative;
        &:after{
            content:"";
            position: absolute;
            width: 96%;
            bottom: 0;
            left: 15px;
            border-bottom: 1px solid $tertiary-color;
            @include mobiles{
                width: 90%;
            }
        }
        &__comment{
            display: flex;
            align-items: center;
            gap: 10px;
            height: 18%;
            p{
                font-size: 24px;
                color: $tertiary-color;
                font-weight: 700;
            }
        }
        &__like{
            display: flex;
            justify-content: space-between;
            align-items: center;
            
        }
    }
    &__comment{
        display: flex;
        justify-content: space-between;
        padding: 2%;
        box-sizing: border-box;
        width: 100%;
        @include mobiles{
            flex-direction: column;
            align-items: center;
            gap: 10px;
        }
        &__input{
            width: 70%;
            @include mobiles{
                width: 90%;
                height: 40px;
            }
            input{
                padding-left: 3%;
                font-size: 20px;
                color: $tertiary-color;
                border: none;
                border-radius: 20px;
                width: 100%;
                height: 90%;
                box-sizing: border-box;
                &:focus{
                    outline: 2px solid $primary-color;
                }
            }
        }
        &__button{
            width: 30%;
            @include mobiles{
                width: 100%;
            }
        }
        

    }
}

.btn-comment{
    margin: auto 0 auto auto;
    width: 90%;
    display: flex;
    justify-content: center;
    
    @include mobiles{
        width: 50%;
        margin: auto;
        padding: 15px 45px;
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

#names{
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    @include mobiles{
        width: 35%;
        align-items: end;
        margin-bottom: 5px; 
        font-size: 18px;
        justify-content: start;
    }
}
#post-title{
    margin-right: 10%;
    font-size: 22px;
    word-break: break-word;
    @include tablets{
        margin-right: 5%;
    }
    @include mobiles{
        width: 60%;
        margin-right: 5%;
        margin-bottom:40px;
        margin-top: 5px;
    }
}
#delete__flexbox{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    p{
        font-size: 15px;
    }
    @include mobiles{
        flex-direction: column-reverse;
        padding-top: 3%;
        gap: 0px;
    }
}
.btn-delete{
    padding:7px 7px;
    border-radius: 5px;
    background-color: $tertiary-color;
    border: none;
    i{
        color: $primary-color;
    }
    @include mobiles{
        margin-bottom: 6px ;
    }
}

.fa-comment{
    &:hover{
        cursor: pointer;
        color: $primary-color;
        transform: scale(1.2);
        transition: all 200ms ease-in-out;
    }
}

.dropdown{
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover .dropdown__icon{
        opacity: 0;
        @include mobiles{
            opacity: 1;
        }
    }
    &__icon{
        @include mobiles{
            display: none;
        }
    }
    &__content{
        display: none;
        position: absolute;
        z-index: 1;
        top: 20px;
        right: 20px;
        @include mobiles{
            display: flex;
            gap: 10px;
            position: initial;
        }
        button{
            display: block;
        }
    }
    &:hover .dropdown__content{
        display: flex;
        flex-direction:column;
        gap: 3px;
        @include mobiles{
            flex-direction: row;
            gap: 10px;
        }
        
    }
    
}

.commentsPage{
    width: 95%;
    margin: auto;
    padding-bottom: 3%;
}

.btn-like{
    color: yellow;
}

.homePost__footer__like {
    i{
        font-size: 35px;
        color: $tertiary-color;
        @include mobiles{
            font-size: 25px;;
        }
    }   
}


</style>
