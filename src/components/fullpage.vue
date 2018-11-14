<template>
    <div class="a">
        <transition-group tag="div" :name="name"
        @enter="enter"
        @leave="leave"
        >
      <div class="block" v-for="(list,index) in page" 
      :key="index"
      :style="{'background':background&&background[index] ? background[index] : bg}"
      v-show="index === currentIndex"
      @wheel="wheelEvent($event)"
       @transitionend="end"
      >
        <slot v-if="index+1===slotIndex" :state="state" 
        v-for="slotIndex in page" 
        :name="`slot${slotIndex}`"
        ></slot>
      </div>
    </transition-group>
    </div>
</template>

<script>
import pageOne from './pageone.vue'
    export default {
        name: 'fullPage',
        props: {
            background: {
                type: Array
            },
            page: {
                type: Number,
                required: true
            },
            bg: {
                default: 'red'
            }
        },
        data(){
            return {
                currentIndex: 0,
                name: '',
                isScroll: true,
                endCount: 0,
                state: ''
            }
        },
        components: {
            pageOne
        },
        methods: {
            wheelEvent(e){
              //往下滚动
                if(!this.isScroll){
                  return
                }
                this.isScroll = false
                if(e.deltaY>0){
                  if(this.currentIndex === this.page.length-1){
                    //这里当你滚到第一个或最后一个的时候你就直接返回了，不会再去过渡了，
                    //所以这时候的isScorll还是false，需要设置成true才能正常往反向滚
                    this.isScroll = true 
                    this.endCount = 0
                    return
                  }
                  this.name = 'down'
                  this.currentIndex+=1
                }
                //往上滚动
                if(e.deltaY<0){
                  if(this.currentIndex === 0){
                    this.isScroll = true
                    this.endCount = 0
                    return
                  }
                  this.name = 'up'
                  this.currentIndex-=1;
                }
              },
              //当前过渡结束后再去滚动
              end(){
                this.endCount+=1;
                //因为每次过渡结束都是执行了两次，离开的和进入的，所以等到第二次的时候才让他继续滚动
                if(this.endCount === 2){
                  this.isScroll = true
                  //使每个都有一个endCount的值是2，所以要初始化
                  this.endCount = 0
                }
                this.state = 'transitionend'
             },
             enter(el,done){
                 this.state = 'enter'
                 //done()
             },
             leave(el,done){
                 this.state = 'leave'
                 //done()
             }
        }
    }
</script>
<style scoped>
.block{
width: 100%;
height: 100%;
background: black;
position: absolute;
left: 0;
top: 0;
margin: 0;
padding: 0;
}
.down-enter-active,.up-enter-active{
transition: all 1s ease;
}
.down-enter-to{
transform: translateY(0)
}
.down-leave-active,.up-leave-active{
transition: all 1s ease;
}
.down-enter{
transform: translateY(100%)
}
.down-leave{
transform: translateY(0)
}
.down-leave-to{
transform: translateY(-100%)
}
/* .down-leave-to{
transform: translateY(-100%)
} */
.up-enter{
transform: translateY(-100%)
}
.up-enter-to{
transform: translateY(0)
}
.up-leave{
transform: translateY(0)
}
.up-leave-to{
transform: translateY(100%)
}
</style>
