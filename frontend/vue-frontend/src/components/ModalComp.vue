<template>
<div>
    <transition name="modal-transition">
        <div class="modal">
            <form enctype="multipart/form-data" class="modal__box">
                <div class="modal__box__header"> 
                    <input id="title" :value="title" type="text" />
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
                    <button class="btn btn-modal" @click="$emit('close')">OK</button>
                </div>
                <div>
                    <button @click.prevent="DeleteRequest()">Supprimer</button>
                </div>
            </form>      
        </div>
    </transition>
</div>
        
</template>

<script>
export default {
        name: "ModalComp",
        data: function(){
            return {

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
            changeFile(){
                this.file = this.$refs.fileInput.files[0];
            },
            ModifyRequest(){
                const user =  JSON.parse(localStorage.getItem('user'))
                const title = document.getElementById('title').value;
                const text = document.getElementById('text').value;
                const data = {'image': this.file, 'name':title, 'text':text , 'id':this.id}
                if(user.userId !== this.userId){
                    this.$router.push('/login')
                } else {
                this.$store.dispatch('PutPostRequest', {data})
                }
            },
            DeleteRequest(){
                const user =  JSON.parse(localStorage.getItem('user'))
                if(user.userId !== this.userId){
                    this.$router.push('/login')
                } else if(confirm('Vous-vous supprimer cet article ?')){ 
                    this.$store.dispatch('DeleteRequest', {id:this.id})
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
        width: 300px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all 0.3s ease;
        &__header{
            
        }
        &__body{

        }
        &__footer{

        }
    }
}

.btn-modal{
    float: right;
}


.modal-transition-enter,.modal-transition-leave-to {
    opacity: 0;
}

.modal-transition-enter-active,.modal-transition-leave-active {
    transition: opacity 2s ease;
}

</style>