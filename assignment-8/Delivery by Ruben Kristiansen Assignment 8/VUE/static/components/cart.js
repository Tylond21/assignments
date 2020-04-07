let cart = {
  template: `
  <main class="content main">
    <div v-if="!flag_submit_success" style="width: 100%">
      <h1>Cart</h1>
      <div class="cart-element framed">
        <div> 
          <table class="cart-table">
              <thead>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Count</th>
                  <th>Item price</th>
                  <th>Discount</th>
                  <th>Price</th>
                  <th class="table-end">Cancel</th>
              </thead>
              <tbody>
                <tr v-for="item in cart">
                  <td>{{ item.title }}</td>
                  <td>{{ item.size }}</td>
                  <td >{{ item.count }}</td>
                  <td>{{ item.item_price }}</td>
                  <td>{{ item.discount }}</td>
                  <td>{{ item.price }}</td>
                  <td class="table-end">
                      <button v-on:click="deleteData(item.pid,  item.size)">X</button>
                  </td>
                </tr>
                <tr>
                  <td colspan="5">Totals</td>
                    <td>{{ totals }}</td>
                    <td class="table-end">
                    </td>
                </tr>
              </tbody>
          </table>
        </div>
      </div>
      <h1>Checkout</h1>
      <div class="cart-element framed">
          <form v-on:submit.prevent>
              <fieldset class="framed">
                  <legend>Billing details</legend>
                  <label>First Name
                    <input type="text" required v-model="firstName" ></label>
                  <label>Last Name<input type="text" required v-model="lastName" ></label>
                  <label>Email <input type="email" required v-model="email" ></label>
              </fieldset>
              <fieldset class="framed">
                  <legend>Delivery address</legend>
                  <label>Street <input type="text" required v-model="street" ></label>
                  <label>City <input type="text" required v-model="city" ></label>
                  <label>Postal Code <input type="text" required v-model="postCode" ></label>
              </fieldset>
              <fieldset v-if="flag_submit"  class="framed flexbox space_between">
                <legend>AGB</legend>
                <label class="checkboxlabel"> <input type="checkbox" disabled="disabled" checked="checked">I agree to the general terms of service.</label>
              </fieldset>
              <fieldset class="framed flexbox space_between">
                <legend>Submit order</legend>
                <label v-if="!flag_submit" class="checkboxlabel">
                  <input type="checkbox" required v-model="check">I agree to the general terms of service.</label>
                <label v-else class="checkboxlabel">Check card and address above and submit.</label>
                <button @click="submit()">Submit</button>
              </fieldset>
          </form>
      </div>  
    </div>
    <div v-else style="width: 100%">
      <h1>Your Order</h1>
      <div class="cart-element framed" style="padding: 20px">
        <div class="alert-success"> 
          Your order was successfully submitted! Thanks!
        </div>
      </div>
    </div>
  </main>
  `,
  data: function() {
    return {
      totals: 0,
      carts: [],
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      city: '',
      postCode: '',
      check: false,
      flag_submit: false,
      flag_submit_success: false
    }
  },

  created () {
    console.log('create');
  },

  mounted () {
    console.log('mounted');
  },

  computed: {
    cart: function() {
      let totals = 0;
      this.carts = store.cart.map(
        function(item) {
          if (store.products && store.products[item.pid]) {
            let product = store.products[item.pid];
            item.product_id = product.product_id;
            item.title = product.title;
            item.item_price = (product.price).toFixed(2);
            item.discount = product.discount > 0 ? product.discount : "";
            item.price = (item.count * product.price * (100 - product.discount) / 100).toFixed(2);
            totals += Number(item.price);
          }
          return item;
        }
      );
      this.totals = totals.toFixed(2);
      return this.carts;
    }
  },
  methods: {
    deleteData: function(pid, size) {
      store.remove(pid, size);
    },
    isValidate: function() {
      if (this.firstName == '' || this.lastName == '' || this.email == '') return false;
      if (this.street == '' || this.city == '' || this.postCode == '') return false;
      return this.check;
    },
    submit: async function() {
      if (this.isValidate()) {
        console.log(this.flag_submit)
        if (this.flag_submit) {
          let response = await fetch("/order", {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              carts: this.carts,
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              street: this.street,
              city: this.city,
              postCode: this.postCode
            })
          });
          if (response.status == 200) {
            // let result = await response.json();
            this.flag_submit_success = true;
          }
        } else
          this.flag_submit = true;
      }
    }
  }
}