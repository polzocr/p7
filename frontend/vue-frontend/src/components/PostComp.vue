<template>
    <div>
        <div v-if="modify">
            <div>
                <form enctype="multipart/form-data">
                    <div>
                        <input v-model="localName" type="text" />
                    </div>
                    <div>
                        <input v-model="localText" type="textarea" />
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
                        <button @click.prevent="emitModify">Modifier</button>
                    </div>
                    <div>
                        <button @click.prevent="emitDelete">Supprimer</button>
                    </div>
                </form>
            </div>
        </div>
        <div v-else>
            <div v-if="clickable">
                <router-link :to="'/' + id">
                    <p>{{ id }}</p>
                    <p>Titre: {{ name }} : {{ userId }}</p>
                    <p>Text: {{ text }}</p>
                    <img :src="image_url" alt="imagePost"/>
                </router-link>
            </div>
            <div v-else>
                <p>{{ id }}</p>
                <p>Titre: {{ name }} : {{ userId }}</p>
                <p>Text: {{ text }}</p>
                <img :src="image_url" alt="imagePost"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PostComp",
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
                default: () => 'JolieTitre'
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
                file: this.image_url
            }
        },
        methods: {
           emitModify(){
                const data = {'image': this.file, 'name':this.localName, 'text':this.localText, 'id':this.$route.params.id}
                this.$emit('Modifying', { data })
            },
            changeFile(){
                this.file = this.$refs.fileInput.files[0];
            },
            emitDelete(){
                this.$emit('Deleting', {id:this.$route.params.id})
            },
        }
    }
</script>

<style scoped lang="scss">

</style>
