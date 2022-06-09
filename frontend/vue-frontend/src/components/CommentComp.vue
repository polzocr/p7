<template>
        <div class="comments"> 
            <div class="comments__title">
                <p id="name">{{ firstName }} {{ lastName }}</p>
                <p id="date">{{ date()}}</p>
            </div>
            <div class="comments__text">
                <p>{{ text }} </p>
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
          exist: false  
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
        },
    },    
}
</script>

<style lang="scss">



.comments{
    border-bottom: 1px solid $tertiary-color;
    width: 90%;
    margin: auto;
    color: $tertiary-color;
    &__title{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &__text{
        text-align: start;
    }
}

#date{
    font-size: 13px;
}
#name{
    font-size: 18px;
    font-weight: 700;
}

</style>
