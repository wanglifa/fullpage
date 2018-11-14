<template>
    <div class="project">
        <span v-for="list in arr" v-html="list"></span>
        <span v-show="show">|</span>
    </div>
</template>
<script>
    export default {
        name: 'pageOne',
        props: ['state'],
        data(){
            return {
                //就相当于['a','V','u','e','p','r','o','j','e','c','t','<br>','{','<br>','r','e','t','u','r','n']
                msg: 'aVueproject'.split('').concat(['<br>','{','<br>'],'return lifa'.split(''),['<br>','}']),
                arr: [],
                countIndex: 0,
                show: true,
                timer1: null,
                timer2: null
            }
        },
        methods: {
            addCount(){
                this.arr.push(this.msg[this.countIndex])
                this.countIndex+=1
            },
            addShrink(){
                this.show = !this.show
                if(this.countIndex === this.msg.length){
                    this.clear()
                }
            },
            clear(){
                clearInterval(this.timer1)
                
                clearInterval(this.timer2)
                
            }
        },
        mounted(){
            this.timer1 = setInterval(this.addCount,60)
            this.timer2 = setInterval(this.addShrink,60)
        },
        watch: {
            state(val,old){
                if(this.state === 'enter'){
                    this.timer1 = setInterval(this.addCount,60)
                    this.timer2 = setInterval(this.addShrink,60)
                    
                }else if(this.state === 'leave'){
                    this.clear()
                    this.arr = []
                    this.countIndex = 0
                }else{
                    this.clear()
                }
            }
        }
    }
</script>
<style>
.project{
    position: absolute;
    bottom: 30px;
    left: 30px;
    font-size: 30px;
    font-weight: bold;
}
</style>
