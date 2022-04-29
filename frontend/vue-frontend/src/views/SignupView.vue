<template>
   <div>
     <SignupComp/>
   </div>
</template>

<script>
// @ is an alias to /src
import SignupComp from '@/components/SignupComp.vue'

export default {
  name: 'SignupView',
   components: {
      SignupComp
   }
}
</script>
