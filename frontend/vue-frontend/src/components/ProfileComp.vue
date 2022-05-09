<template>
    <div>
        <div v-if="modify">
            <div>
                <p> {{ lastName }}, {{ lastName }}</p>
                <p> {{ firstName }}u,{{ firstName }}u</p>
                <p> {{ lastName }},{{ lastName }}</p>
                <p> {{ firstName }} {{ email }}</p>
            </div>
            <div>
                <button @click="ModifyUser()">Modifier le profil</button>
            </div> 
        </div>
        <div v-else>
            <input type="text" :value="lastName">
        </div>
        
    </div>
</template>

<script>
export default {
    name:'ProfileComp',
    props: {
        lastName: {
            type: String,
        },
        firstName: {
            type: String,
        },
        email: {
            type: String,
        },
    },
    data: function(){
        return {
            modify: true,
        }
    },
    methods: {
        ModifyUser(){
            this.modify = false
        },
        emitModify(){
            this.$emit('Modify')
        }
    }
}
</script>
