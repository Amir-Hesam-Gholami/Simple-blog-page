import MyNavbar from "../../components/navbar/MyNavbar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './AddArticle.css'
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

function AddArticle() {

  const [formData , setFormdata] = useState({});

  const formhandler = ( e )=>{
    setFormdata({...formData , [e.target.name] : e.target.value})
  }
  const resetFormdata = ()=>{
    setFormdata({
      image: "",
      title: "",
      desc: "",
      writter: "",
      category: "",
      readingTime: ""
    })
  }
  const addarticlehandler=()=>{
    axios.post('http://localhost:5000/articles' , formData)
    .then(response=>{
      if(response.status === 201){
        Swal.fire({
          title : 'ساخت مقاله جدید با موفقیت انجام شد.',
          timer : 1500,
          timerProgressBar : true , 
          showConfirmButton : false
        })
      }
    })
    .catch(error =>{
      Swal.fire({
        title : 'مقاله ساخته نشد',
        timer : 1500,
        icon: error,
        timerProgressBar : true , 
        showConfirmButton : false
      })
    })
    resetFormdata();
  }
  return (
    <>
      <MyNavbar />
      <div className="formContainer">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>عنوان مقاله</Form.Label>
            <Form.Control value={formData.title} onChange={ formhandler} name="title" type="text" placeholder="عنوان مقاله را وارد کنید" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>توضیح کوتاه</Form.Label>
            <Form.Control value={formData.desc} onChange={formhandler} name="desc" type="text" placeholder="یه توضیح کوتاه در مورد مقاله وارد کنید" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>نویسنده مقاله</Form.Label>
            <Form.Control value={formData.writter} onChange={ formhandler } name="writter" type="text" placeholder="نام نویسنده مقاله را وارد کنید" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>موضوع مقاله</Form.Label>
            <Form.Control value={formData.category} onChange={formhandler} name="category" type="text" placeholder="موضوع مقاله را وارد کنید" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>عکس مقاله</Form.Label>
            <Form.Control value={formData.image} onChange={formhandler} name="image" type="text" placeholder="عکس مقاله را وارد کنید" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>مدت زمان خواندن</Form.Label>
            <Form.Control value={formData.readingTime} onChange={formhandler} name="readingTime" type="number" placeholder="" />
          </Form.Group>
          
          <Button onClick={addarticlehandler} variant="primary" type="button">
            ساخت مقاله
          </Button>
        </Form>
      </div>
    </>
  );
}

export default AddArticle;
