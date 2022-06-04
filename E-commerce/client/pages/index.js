import Head from 'next/head'
import Image from 'next/image'
import Cards from '../components/Card/Cards.js'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer.js'
import { useEffect, useState } from 'react'
import { BASEURL, getAllProducts } from '../redux/actions/products.js'
import { useDispatch, useSelector } from 'react-redux';
import { Stack,Flex,Text,Select  } from '@chakra-ui/react'
import { addItemToCart } from '../redux/actions/cart.js'
import { getSession } from 'next-auth/react';
import { getUserData } from '../redux/actions/user.js'
import Banner from '../components/Banner/Banner.js'


export default function Home() {
  const [user, setUser] = useState({});
  
  const dispatch = useDispatch();
  const ReducerUser = useSelector((state)=> state.userReducer.user);
  
  // useEffect( () => {
  //   (async()=>{
  //       const userResponse = await axios.get(`${BASEURL}/auth/data`, { withCredentials: true });
  //       setUser(userResponse.data)
  //   })();
  // },[]);
  
  // useEffect(() => {
  //   dispatch(getUserData(user))
  // }, [dispatch, user]);

  /*----- Cart -----*/
// console.log(ReducerUser)
  return (   
    <Flex flexDir='column' alignItems='center'>
      <Navbar />
      <Banner/>
      <Cards />
      <Footer />
    </Flex>
  )
}
