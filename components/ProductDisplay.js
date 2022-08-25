app.component('product-display', {
    props:{
        premium :{
            type: Boolean,
            requred :true,
        },
        cart :{
            type: Number,
            requred :true,
        },
        
    },
    template:
    /*html*/`
    <div class="product-display">
            <div class="product-container">
                <div class="product-image">
                    <a :href="imageUrl">
                        <img :src="image">
                    </a>
                </div>
                <div class="product-info">
                    <p><h1>{{title}} </h1></p>
                    
                    <p v-if="inventory > 10">In Stock</p>
                    <p v-else-if="inventory <= 10 && inventory > 0" >Almost sold out! </p>
                    <p v-else>Out of Stock</p>
                    <p v-show="onSale">On Sale </p>

                    <p> Shopping : {{shopping}}</p>
                    <ul>
                        <li v-for="detail in details">
                            {{detail}}
                        </li>
                    </ul>
                    <div
                        class="color-circle"
                        v-for="(variant,index) in variants"
                        :key="variant.id"
                        @mouseover="updatevariant(index)"
                        :style="{backgroundColor:variant.color}"
                        >
                        
                        
                    </div>
                    <button 
                        class="button"
                        :class="{disabledButton:!inStock}"
                        :disabled="!inStock"
                        @click="addToCart"
                        
                        >
                        Add to Cart 
                    </button>
                    <button 
                        class="button" 
                        :class="{disabledButton:!cart}"
                        :disabled="!cart"
                       
                        @click="removeFromCart"
                        >
                        Remove from Cart 
                    </button>
                </div>
            </div>
            <review-list v-show="reviews.length" :reviews="reviews"></review-list>
            <review-form @review-submitted="addReview"></review-form>
        </div>`,
    data(){
        return {

            brand: 'Vue Mastery',
            product : 'Socks',
            selectedvariant:0,
            imageUrl: 'https://www.google.com/',
            inventory:100,
            // inStock:true,
            onSale:false,
            details : ['50% cotton' , '30% wool' , '20% polyester'], 
            variants:[
                { id: 2234, color:'green',image:'./assets/images/socks_green.jpg',quantity:5},
                { id: 2235, color:'blue',image:'./assets/images/socks_blue.jpg',quantity:0},

            ],
            reviews: []
        }
    },
    methods:{
        addToCart(){
            this.$emit('add-to-cart');
            this.variants[this.selectedvariant].quantity-=1;
        },
        removeFromCart(){
            this.$emit('remove-from-cart');
            this.variants[this.selectedvariant].quantity+=1;
        },
        updatevariant(index){
            this.selectedvariant=index;
            

        },
        addReview(review){
            this.reviews.push(review);
        }
    },
    computed:{
        title(){
        return this.brand + ' ' + this.product; 
        },
        image(){
        return this.variants[this.selectedvariant].image;
        },
        inStock(){
        return this.variants[this.selectedvariant].quantity;
        }, 
        shopping(){
            if(this.premium){
                return "Free";
            }
           return 2.99;
        },
        
 
    }

})