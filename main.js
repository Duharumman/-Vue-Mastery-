const app =Vue.createApp({
    data(){
        return {
            cart:0,
            premium:true,
        }
    },
    methods:{
        increaseCart(){
            this.cart+=1;
            
        },
        deccreaseCart(){
            this.cart-=1;
        },

    },
    
})