import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import "./Update.css";
import { useEffect } from "react";

const Update = ({ productId, setReload}) => {
  const [openModal, setOpenModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [bankName, setBankName] = useState('');
  const [amount, setAmount] = useState(0);
  
  const [reloadPage, setReloadPage] = useState(false);

  // useEffect(()=>{
  // if(reloadPage){
  //   window.location.reload();
  // }
  
  // },[reloadPage])

  useEffect(() => {
    // Fetch product data from the server when the modal is opened for update
    if (openModal) {
      // Example URL, replace with your actual API endpoint
      fetch(`http://localhost:5000/sale/${productId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const { name, quantity, bank, deposit } = data;
          setProductName(name);
          setQuantity(quantity);
          setBankName(bank);
          setAmount(deposit);
        })
        .catch((error) => console.error("Error fetching product data:", error));
    }
  }, [openModal, productId,reloadPage]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      name: productName,
      bank: bankName,
      quantity: quantity,
      deposit: amount,
    };
console.log(amount);
    fetch(`http://localhost:5000/update/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => {
        if (response.ok) {
         
          console.log("Product updated successfully");
          onCloseModal(); // Close modal after successful update
          // window.location.reload();
          setReload(true)
          
        } else {
          console.error("Failed to update product. Status:", response.status);
          // Handle specific error cases based on response status
          // For example, handle 404 for not found, 401 for unauthorized, etc.
        }
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        // Handle other types of errors such as network errors, etc.
      });
      

    setOpenModal(false);
  };

  function onCloseModal() {
    setOpenModal(false);
    setProductName("");
    setQuantity(0);
    setBankName("");
    setAmount(0);
  }

  return (
    <>
      <div className="edit-btn" onClick={() => setOpenModal(true)}>
        Edit
      </div>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          {/* <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Fill in the form to update 
            </h3>
          
          </div> */}

          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <h1>
              {productName}
              {quantity}
            </h1>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="productName" value="Product Name" />
              </div>
              <TextInput
                id="productName"
                type="text"
                placeholder="Product Name"
                onChange={(event) => setProductName(event.target.value)}
                // required
                value={productName}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="quantity" value="Add quantity" />
              </div>
              <TextInput
                id="quantity"
                type="number"
                onChange={(event) => setQuantity(event.target.value)}
                value={quantity}
                // required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="bankName" value="Bank Name" />
              </div>
              <TextInput
                id="bankName"
                type="text"
                placeholder="Bank Name"
                onChange={(event) => setBankName(event.target.value)}
                value={bankName}
                // required
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label
                  className="hover:text-red-600"
                  htmlFor="Amount"
                  value="Amount"
                />
              </div>
              <TextInput
                id="Amount"
                type="number"
                onChange={(event) => setAmount(event.target.value)}
                // required
                value={amount}
              />
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Update;
