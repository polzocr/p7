<template>
   <div class="signup">
        <div class="form">
            <form method="post" action="/signup">
                <div class="">
                    <label for="lastName">Nom</label>
                    <input type="text" name="lastName">
                </div>
                <div class="">
                    <label for="firstName">Prénom</label>
                    <input type="text" name="firstName">
                </div>
                <div class="">
                    <label for="email">Email</label>
                    <input type="email" name="email">
                </div>
                <div class="">
                    <label for="password">Mot de passe</label>
                    <input type="password" name="password">   
                </div>
                <div class="">
                    <button type="submit">S'enregistrer</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SignupComp",
        props:{

        }
    }
</script>


<style scoped lang="scss">

</style>
