/* eslint-disable */
import { KeystoneContext, SessionStore } from '@keystone-next/types';
import { CartItem } from '../schemas/CartItem';
import { Session } from '../types';

import { CartItemCreateInput } from '../.keystone/schema-types';

const addToCart = async(
    // type is any
  root: any,
  // productId, we know is type string
  { productId }: { productId: string },
  // this is from KeystoneContext
  context: KeystoneContext
//   type is a promis, the promise resolves a type of CartItemCreateInput which is typed by keystone
): Promise<CartItemCreateInput> => {
  // 1. Query the current user see if they are signed in
  // we need to pass the context to get the session, we need the user to be logged in, we check that by looking at the session
  // we type it as Session
  const session = context.session as Session;
  if (!session.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  console.log('session', session)
  console.log(productId)
  // 2. Query the current users cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: session.itemId }, product: { id: productId } },
    // we need to explicitly say what we want back
    resolveFields: 'id,quantity'
  });
  console.log('345345345', allCartItems)
  // grab existingCartItem by destructuring it from allCartitems
  const [existingCartItem] = allCartItems;
  //check to see if the item already exists in the user's cart
  if (existingCartItem) {
    console.log(existingCartItem)
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1!`
    );
    // if the item is already in the cart, instead of adding it again, increment it (just like with mongoose)
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
      resolveFields: false,
    });
  }
  console.log('hihihhihhi')
  // if there isn't this item in the cart, add it / create it we grab the data from the front end to create
  const newItem = await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId }},
      user: { connect: { id: session.itemId }},
    },
    resolveFields: false,
  })
  console.log(newItem)
  return newItem;
}

export default addToCart;
