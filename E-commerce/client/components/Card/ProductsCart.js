import { SimpleGrid, Grid, Box, Heading, Text, Button, Flex, Stack, GridItem, Divider, Center, cookieStorageManager } from '@chakra-ui/react'
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getItemsCart } from '../../redux/actions/cart';
import { AiOutlineShopping } from "react-icons/ai";
import Link from 'next/link'
import Logo from '../Logo/Logo';
import Checkout from '../Checkout/Checkout';

export default function ProductCart() {
  const productsCart = useSelector((state)=> state.shoppingCartReducer.itemsCart);
  const dispatch = useDispatch()
  const [cart, setCart] = useState(productsCart)

  useEffect(()=>{
    dispatch(getItemsCart())
  }, [cart,dispatch])

  return (
    <Box>  
      {cart.length < 1  ? 
      <Flex flexDir='column' justifyContent='center' alignItems='center' textAlign='center'>
        <AiOutlineShopping size='150'/>
        <Text fontSize='2em'>Your shopping bag is empty</Text>
        <Link href="/"><Button pos='relative' color='blackAlpha.800' borderRadius='15px' p='1em' mt='1em'>Continue Shopping</Button></Link>
      </Flex> :
      <Grid 
        templateColumns={{ base: '1fr', sm: '1fr', md:'1fr 1em 20rem', lg:'1fr 1em 20rem' }}
        margin={{base: '.5em', md:'1em', lg:'2em'}} height='auto'>
        <Grid templateColumns={{ base: '1fr', sm: '1fr', md:'repeat(3, 1fr)', lg:'repeat(3, 1fr)' }}
        gap={5} >
        {
          productsCart?.map(ps=>{ return (
            <Card key={ps._id} producto={ps.product} quantity={ps.quantity} cart={cart} setCart={setCart}></Card>
            )})
          }
        </Grid>
        <Flex justifyContent='flex-end'>
          <Divider orientation='vertical'/>
        </Flex>
        <GridItem mt={{base:'5rem', md:'8rem', lg:'8rem'}}>
          <Checkout/>
        </GridItem>
      </Grid>
      }
    </Box>
    )
  }

// export async function getServerSideProps()