<template>
    <div>
        <div> 
            <p>{{ userId }}</p>
            <p>{{ text }} </p>
        </div>

    </div>
</template>

<script>
export default {
    name: "CommentComp",
    props:{
        userId:{
            type: Number
        },
        text: {
            type: String,
        },
        postId:{
            type: Number,
        }
    },
}
</script>
