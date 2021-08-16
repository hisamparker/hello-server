import { list } from '@keystone-next/keystone/schema';
import { relationship } from '@keystone-next/fields';

export const PurchasedItem = list({
  fields: {
    // TODO create a label
    // one way relationship
    product: relationship({ ref: 'Product' }),
    // the cart item is related to the user, so we reference the User schema, we add .cart which creates a two-way relationship
    user: relationship({ ref: 'User.tutorials' }),
  },
  ui: {
    listView: {
      initialColumns: ['product', 'user'],
    },
  },
});
