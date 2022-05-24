<template>
    <section class="home">
        <section v-if="modifyComp()" id="test">
                <form enctype="multipart/form-data">
                    <div>
                        <input id="name" :value="name" type="text" />
                    </div>
                    <div>
                        <input id="text" :value="text" type="textarea" />
                    </div>
                    <div>
                        <div>
                            <img :src="image_url" alt="image_PutRequest"/>
                        </div>
                        <div>
                            <input @change="changeFile()" type="file" accept="image/*" ref="fileInput" name="image">
                        </div>
                    </div>
                    <div>
                        <button @click.prevent="ModifyRequest()">Modifier</button>
                    </div>
                    <div>
                        <button @click.prevent="DeleteRequest()">Supprimer</button>
                    </div>
                </form>                
        </section>
        <section v-else>
            <section class="homePost">
                <div class="homePost__title">
                    <p>name{{ id }}</p>
                    <p>Titre: {{ name }}</p>
                    <p id="delete__flexbox">
                        date : 12/01/2078 
                        <button v-if="ownPost()" @click.prevent="GetToPost()" class="btn delete"><i class="fa fa-pen" aria-hidden="true"></i></button>
                        <button v-if="ownPost()" @click.prevent="DeleteRequest()" class="btn delete"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    </p>
                </div>
                <div class="homePost__text">
                    <p>Text: {{ text }} je vais devoir ecrire bcp de texteuuuuuuuuu  je vais devoir ecrire bcp de texteuuuuuuuuu 
                    je vais devoir ecrire bcp de texteuuuuuuuuu je vais devoir ecrire bcp de texteuuuuuuuuu </p>
                    <p>je vais devoir ecrire bcp de texteuuuuuuuuu je vais devoir ecrire bcp de texteuuuuuuuuu</p>
                    <p>Text: {{ text }} je vais devoir ecrire bcp de texteuuuuuuuuu  je vais devoir ecrire bcp de texteuuuuuuuuu
                    je vais devoir ecrire bcp de texteuuuuuuuuu je vais devoir ecrire bcp de texteuuuuuuuuu </p>
                    <p>je vais devoir ecrire bcp de texteuuuuuuuuu je vais devoir ecrire bcp de texteuuuuuuuuu</p>
                </div>
                <div class="homePost__image">
                    <img :src="image_url" alt="imagePost"/>
                </div>
                <div class="homePost__footer">
                        <div class="homePost__footer__comment">
                            <i @click="showComments()" class="fa fa-comment" aria-hidden="true"></i>
                        </div>
                        <div class="homePost__footer__like">
                            <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                            <i class="fa fa-thumbs-down" aria-hidden="true"></i> 
                        </div>
                </div>
                <div class="homePost__comment">
                    <div class="homePost__comment__input">
                        <input v-model="textComment" id="textComment" type="text" placeholder="Votre commentaire"/>
                    </div>
                    <div>
                        <button @click.prevent="CommentRequest()" class="btn homePost__comment__button" >Commenter</button>
                    </div>
                </div>
                
                <p v-if="show"><CommentComp v-for="(comment, index) in this.comments"
                :key="index"
                :userId="comment.userId"
                :text="comment.text"
                /></p>
            </section>
        </section>
    </section>
</template>

<script>
import CommentComp from '@/components/CommentComp.vue'
import axios from 'axios'

    export default {
        name: "PostComp",
        components: {
            CommentComp
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
            userId: {
                type: Number,
                required: true,
                default: 0
            },
            name: {
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
                localName: this.name,
                localText: this.text,
                file: this.image_url,
                idPost: '',
                show: false,
                textComment: '',
                comments: [{}]
            }
        },
        beforeMount(){
            //this.$store.dispatch('GetCommentsRequest', this.id );
            
        },
        methods: {
            CommentRequest(){
                const textComment = document.getElementById('textComment').value
                console.log('Voicie le text: ' + textComment)
                console.log(this.textComment)
                this.$store.dispatch('CreateCommentRequest', {
                    PostId: this.id ,
                    text: this.textComment
                })
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
                        userId: element.UserId,
                        text: element.text
                    })
                })
            }).then(() => {
                this.show = !this.show
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
                const name = document.getElementById('name').value;
                const text = document.getElementById('text').value;
                const data = {'image': this.file, 'name':name, 'text':text , 'id':this.$route.params.id}
                this.$emit('Modifying', { data })
            },
            changeFile(){
                this.file = this.$refs.fileInput.files[0];
                console.log(this.name)
                console.log(this.localName)
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
                this.$router.push('/' + this.id)
            },
            ModifyRequest(){
                const name = document.getElementById('name').value;
                const text = document.getElementById('text').value;
                const data = {'image': this.file, 'name':name, 'text':text , 'id':this.$route.params.id}
                this.$store.dispatch('PutPostRequest', {data})
            },
        }
    }
</script>

<style lang="scss">

.home{
    width: 70%;
    margin:6% auto auto auto;
}



.homePost{
    background-color: $secondary-color;
    border-radius: 30px;
    &__title{
        font-size: 22px;
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
        height: 600px;
        img{
            width: 100%;
            height: 100%;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius:5px;
            object-fit: fill;
        }
    }
    &__footer{
        padding:2.5%;
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
        }
        i{
            font-size: 35px;
            color: $tertiary-color;
        }
        &__like{
            width: 10%;
            display: flex;
            justify-content: space-between;
        }
    }
    &__comment{
        display: flex;
        justify-content: space-between;
        padding: 2%;
        &__input{
            width: 78%;
            input{
                padding-left: 1%;
                font-size: 20px;
                color: $tertiary-color;
                border: none;
                border-radius: 20px;
                width: 100%;
                height: 90%;
                &:focus{
                    outline: 2px solid $primary-color;
                }
            }
        }
        

    }
}
.delete{
    padding:7px 7px;
    border-radius: 5px;
    background-color: $tertiary-color;
    border: none;
    i{
        color: $primary-color;
    }
}
#delete__flexbox{
    display: flex;
    gap: 10px;
}
.fa-comment{
    &:hover{
        cursor: pointer;
        color: $primary-color;
        transform: scale(1.2);
        transition: all 200ms ease-in-out;
    }
}


</style>
