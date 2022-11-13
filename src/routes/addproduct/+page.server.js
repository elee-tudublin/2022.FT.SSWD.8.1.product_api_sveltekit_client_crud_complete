// Import sveltekit dependencies
import { invalid, redirect } from "@sveltejs/kit"

// Import the addNewProduct() function from the product store.
import { addNewProduct } from '../../stores/productStore.js';

// The form action handler(s)
export const actions = {

    // action function for adding a product - called when form is submitted
    // This is where the form sends its data
    addproduct: async ({request }) => {
      let success = false;

      // get data from the POST request
      const form_data = await request.formData();

      // read each value - to do: add validation
      const product = {
        category_id: Number(form_data.get('category_id')),
        product_name: form_data.get('product_name'),
        product_description: form_data.get('product_description'),
        product_stock: Number(form_data.get('product_stock')),
        product_price: Number(form_data.get('product_price'))
      }

      // Basic validation
      if (product.category_id > 0 &&
          product.product_name != '' &&
          product.product_description != '' &&
          product.product_stock > 0 &&
          product.product_price > 0
      ) {
          // Add the new product via the API (using the product store function)
          const result = await addNewProduct(JSON.stringify(product));
          console.log('add product result: ', result)

        // return the result
        // This will display the success section of the page to show the newly added product
        return { 
          success: true,
          message: `New product added with id: ${result.product.id}`,
          product: result.product
        };

        // This will cause the form to redisplay for corrections, along with an error message
      } else {
        return invalid(400, {
          error: true,
          message: 'validation failed',
          product: product
        })
      }
    }

  };
