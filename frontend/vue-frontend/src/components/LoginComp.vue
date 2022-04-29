<template>
    <div class="login">
        <form method="post" action="/login" class="">
            <div class="">
                <label for="email">Email</label>
                <input type="email">
            </div>
            <div class="">
                <label for="password">Password</label>
                <input type="password">
            </div>
            <div class="">
                <button type="submit" >Se connecter</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'LoginComp',
    props:{

        }
    }
</script>


<style scoped lang="scss">

</style>
