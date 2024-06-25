import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col} from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import Loader from './Loader/Loader';

const baseUrl = process.env.REACT_BACKEND_BASE_URL

const Invoice = () => {
  const [formData, setFormData] = useState({
    sellerName: '',
    sellerAddress: '',
    sellerCity: '',
    sellerPAN: '',
    sellerGST: '',
    billingName: '',
    billingAddress: '',
    billingCity: '',
    shippingName: '',
    shippingAddress: '',
    shippingCity: '',
    orderNumber: '',
    orderDate: '',
    invoiceNumber: '',
    invoiceDate: '',
    amountInWords: '',
    items: [
      { description: '', unitPrice: '', quantity: '', total: '' }
    ]
  });

  const [isLoading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const items = [...formData.items];
    items[index][name] = value;
    setFormData({
      ...formData,
      items
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', unitPrice: '', quantity: '', total: '' }]
    });
  };

  const deleteItem = (index) => {
    const items = [...formData.items];
    items.splice(index, 1);
    setFormData({
      ...formData,
      items
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post(`${baseUrl}/generate-invoice`, formData)
      .then(response => {
        toast.success('Invoice generated successfully');
        const pdfUrl = `${baseUrl}/invoices/${response.data.filename}`;
        window.open(pdfUrl, '_blank');
        setFormData("")
      })
      .catch(error => {
        console.error('There was an error generating the invoice!', error);
        toast.error("There was an error generating the invoice!")
        setLoading(false);
      }).finally(() => {
        setLoading(false);
      });
  };

  return (
   <>
   <Toaster/>
   {isLoading ? (
        <Loader />
      ) : (
   <Container>
      <Form onSubmit={handleSubmit}>
        <h3>Seller Details</h3>
        <Row>
          <Col>
            <Form.Group controlId="sellerName">
              <Form.Label>Seller Name</Form.Label>
              <Form.Control
                type="text"
                name="sellerName"
                value={formData.sellerName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="sellerPAN">
              <Form.Label>PAN No</Form.Label>
              <Form.Control
                type="text"
                name="sellerPAN"
                value={formData.sellerPAN}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="sellerAddress">
              <Form.Label>Seller Address</Form.Label>
              <Form.Control
                type="text"
                name="sellerAddress"
                value={formData.sellerAddress}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="sellerCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="sellerCity"
                value={formData.sellerCity}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="sellerGST">
          <Form.Label>GST Registration No</Form.Label>
          <Form.Control
            type="text"
            name="sellerGST"
            value={formData.sellerGST}
            onChange={handleInputChange}
          />
        </Form.Group>

        <h3>Billing Details</h3>
        <Row>
          <Col>
            <Form.Group controlId="billingName">
              <Form.Label>Billing Name</Form.Label>
              <Form.Control
                type="text"
                name="billingName"
                value={formData.billingName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="billingCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="billingCity"
                value={formData.billingCity}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="billingAddress">
          <Form.Label>Billing Address</Form.Label>
          <Form.Control
            type="text"
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleInputChange}
          />
        </Form.Group>

        <h3>Shipping Details</h3>
        <Row>
          <Col>
            <Form.Group controlId="shippingName">
              <Form.Label>Shipping Name</Form.Label>
              <Form.Control
                type="text"
                name="shippingName"
                value={formData.shippingName}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="shippingCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="shippingCity"
                value={formData.shippingCity}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="shippingAddress">
          <Form.Label>Shipping Address</Form.Label>
          <Form.Control
            type="text"
            name="shippingAddress"
            value={formData.shippingAddress}
            onChange={handleInputChange}
          />
        </Form.Group>

        <h3>Invoice Details</h3>
        <Row>
          <Col>
            <Form.Group controlId="orderNumber">
              <Form.Label>Order Number</Form.Label>
              <Form.Control
                type="text"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="orderDate">
              <Form.Label>Order Date</Form.Label>
              <Form.Control
                type="date"
                name="orderDate"
                value={formData.orderDate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="invoiceNumber">
              <Form.Label>Invoice Number</Form.Label>
              <Form.Control
                type="text"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="invoiceDate">
              <Form.Label>Invoice Date</Form.Label>
              <Form.Control
                type="date"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <h2>Items</h2>
        {formData.items && formData.items.map((item, index) => (
          <Row key={index} style={{paddingBottom:"10px"}}>
            <Col>
              <Form.Group>
                <Form.Control name="description" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(index, e)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control name="unitPrice" placeholder="Unit Price" value={item.unitPrice} onChange={(e) => handleItemChange(index, e)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control name="quantity" placeholder="Quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control name="total" placeholder="Total" value={item.total} onChange={(e) => handleItemChange(index, e)} />
              </Form.Group>
            </Col>
            <Col>
              <Button variant="danger" onClick={() => deleteItem(index)}>Delete Item</Button>
            </Col>
          </Row>
        ))}
        <Button variant="primary" type="button" onClick={addItem}>Add Item</Button>


        <h3>Summary</h3>
        <Form.Group controlId="amountInWords">
          <Form.Label>Amount in Words</Form.Label>
          <Form.Control
            type="text"
            name="amountInWords"
            value={formData.amountInWords}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="success" type="submit">Submit</Button>
      </Form>
    </Container>
      )}
   </>
  );
};

export default Invoice;
