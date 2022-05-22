import reviews from './ReviewMock.js'
import { useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Box, Avatar, Center, Text, Flex, Container, Stack, Button, Heading, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Textarea, ModalFooter, } from '@chakra-ui/react'

export default function Review(){
    const [index,setIndex] = useState(0);
    const {name,image,text} = reviews[index];
    const { isOpen, onOpen, onClose } = useDisclosure()
    const reviewRef = useRef()
  

  const checkNumber = (num)=>{
    if(num > reviews.length -1){
      return 0
    }
    if(num < 0){
      return reviews.length -1
    }
    return num;
  }

  const nextReview = ()=>{
    setIndex((index)=>{
      let newIndex = index+1;
      return checkNumber(newIndex);
    })
  }

  const prevReview = ()=>{
    setIndex((index)=>{
      let newIndex = index-1;
      return checkNumber(newIndex);
    })
  }

  const addReview = ()=> {
    reviews.push({
      id: 12,
      name: "Guest",
      image: 'image',
      text: reviewRef.current.value
    })
    reviewRef.current = '';
    onClose()
  }

return (
  <>
    <Flex alignItems={'center'} justifyContent={'center'}>
      <Stack>
        <Center>
          <Avatar size='lg' name={name} src={image} />
        </Center>
        <Text textAlign={'center'} fontWeight={'bold'}>{name}</Text>  
      </Stack>
      <Flex maxW='md' h={'64'} ml={'1rem'}>
          <Text  padding='2' align='justify' fontSize={'larger'}>{text}</Text>
      </Flex>
    </Flex>
    <Center>
        <Flex padding='2'>
          <Button
            me={'1em'} 
            onClick={prevReview} 
            leftIcon={<FaChevronLeft/>} 
            colorScheme='blue' 
            variant='solid'></Button>
          <Button me={'1em'} onClick={nextReview} rightIcon={<FaChevronRight />} colorScheme='blue' variant='solid'></Button>
          <Button onClick={onOpen} colorScheme='blue' variant='outline'>Leave a Review</Button>
        </Flex>
        
    </Center>
    
    
    <Modal
    isOpen={isOpen}
    onClose={onClose}
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        <Center>
            <Avatar size='lg' name={'Weolcome guest'} src={'Welcome Guest'} />
        </Center>
        <Center>
          <Text>Welcome Guest</Text>
        </Center>
        </ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel>Leave your review:</FormLabel>
          <Textarea ref={reviewRef} placeholder='This was awesome! It meet all my needs. I fully recomended' />
        </FormControl>
      </ModalBody>

      <ModalFooter>
        <Button onClick={addReview} colorScheme='blue' mr={3}>
          Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  </>
)
}