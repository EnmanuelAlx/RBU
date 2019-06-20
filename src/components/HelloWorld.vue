<template>
    <div>
        <div v-for="item in tasks" :key="item.id">
            {{ item }}
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'HelloWorld',
    data () {
        return {
            tasks: [],
        }
    },
    created () {
        axios.get('http://localhost:8000/api/tasks')
        .then(response=>{
            this.tasks = response.data
        })
        .catch(err=>{
            alert(err);
        })
    },
    methods: {

    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
