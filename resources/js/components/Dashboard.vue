<template>
    <div class="container">
        <div class="row justify-content-center">
           <not-found>  </not-found>
        </div>
    </div>
</template>
<script>
import NotFound from './NotFound.vue'
export default {
  components: { NotFound },
    mounted(){
        console.log('Component mounted.')
    }
}
</script>