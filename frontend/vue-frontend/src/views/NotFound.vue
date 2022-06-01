<template>
    <section role="region" aria-label="conteneur de l'image">
        <img src="../../public/images/not-found.jpg" alt="Image pour une page non trouvé" aria-label="Nous sommes désolés, la page que vous recherchez n'existe pas">
    </section>
</template>

<script>


export default {
    name: 'NotFoundView',

}
</script>

<style scoped lang='scss'>

section{
    height: 1000px;
    margin-top: 7%;
    @include all-desktop{
        margin-top: 0;
        height: 1200px;
    }
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}


</style>
