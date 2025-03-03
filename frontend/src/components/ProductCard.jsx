import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

export const ProductCard = ({ product }) => {
  // State to store the updated product details
  const [updatedProduct, setUpdatedProduct] = useState(product);

  // Theme-aware colors (light mode / dark mode)
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  // Zustand store functions for managing product state
  const { deleteProduct, updateProduct } = useProductStore();

  // Chakra UI toast for success/error messages
  const toast = useToast();

  // Chakra UI modal state (open/close controls)
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Function to handle deleting a product
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    // Show toast notification based on success or failure
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  // Function to handle updating a product
  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success } = await updateProduct(pid, updatedProduct);
    
    // Close the modal after update attempt
    onClose();

    // Show toast notification based on success or failure
    toast({
      title: success ? "Success" : "Error",
      description: success ? "Product updated successfully" : "Update failed",
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      {/* Product Card Container */}
      <Box
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg} // Dynamic background color based on theme
      >
        {/* Product Image */}
        <Image
          src={product.image}
          alt={product.name}
          h={48} // Fixed height for consistency
          w="full" // Full width to fit the card
          objectFit="cover" // Ensures image fits well within the box
        />

        {/* Product Details */}
        <Box p={4}>
          {/* Product Name */}
          <Heading as="h3" size="md" mb={2}>
            {product.name}
          </Heading>

          {/* Product Price */}
          <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
            ${product.price}
          </Text>

          {/* Action Buttons (Edit & Delete) */}
          <HStack spacing={2}>
            {/* Edit Button - Opens Modal */}
            <IconButton
              icon={<EditIcon />}
              onClick={onOpen}
              colorScheme="blue"
            />

            {/* Delete Button - Deletes Product */}
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => handleDeleteProduct(product._id)}
              colorScheme="red"
            />
          </HStack>
        </Box>

        {/* Update Product Modal */}
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          onKeyDown={(e) => {
            // Allow pressing Enter to save the product and close the modal
            if (e.key === "Enter") {
              e.preventDefault();
              handleUpdateProduct(product._id, updatedProduct);
              console.log("Key pressed:", updatedProduct);
            }
          }}
        >
          <ModalOverlay /> {/* Modal background overlay */}
          <ModalContent>
            <ModalHeader>Update Product</ModalHeader>
            <ModalCloseButton /> {/* Close button in the modal header */}

            <ModalBody>
              {/* Product Edit Form */}
              <VStack spacing={4}>
                {/* Product Name Input */}
                <Input
                  placeholder="Product Name"
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  }
                />

                {/* Product Price Input */}
                <Input
                  placeholder="Product Price"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                />

                {/* Product Image Input */}
                <Input
                  placeholder="Product Image URL"
                  value={updatedProduct.image}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      image: e.target.value,
                    })
                  }
                />
              </VStack>
            </ModalBody>

            {/* Modal Footer with Save & Cancel Buttons */}
            <ModalFooter>
              {/* Save Button - Updates Product & Closes Modal */}
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              >
                Save
              </Button>

              {/* Cancel Button - Just Closes the Modal */}
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};
