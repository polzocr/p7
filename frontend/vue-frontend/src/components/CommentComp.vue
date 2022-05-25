<template>
    <div>
        <div> 
            <p>{{ firstName }} {{ lastName }}</p>
            <p>{{ text }} </p>
            <p>{{ date()}}</p>
        </div>

    </div>
</template>

<script>
export default {
    name: "CommentComp",
    props:{
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        text: {
            type: String,
        },
        created_at: {
            type: String,
        }
    },
    data: function(){
        return {
            
        }
    },
    methods:{
        date(){
            if(typeof this.created_at !== 'undefined'){
                const date =  this.created_at.split('T')[0]
                const day = date.split('-')[2]
                const month = date.split('-')[1]
                const year = date.split('-')[0]
                return day+ '/' + month + '/' + year
            }
        }
    },
    computed:{
        
    },
    
}
</script>
