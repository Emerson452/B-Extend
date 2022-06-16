import '../styles/Createpost.css';
import React from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik"; // permet de créer des formulaires sans utiliser les balises html traditionnelles
import * as Yup from "yup"; // validation de formulaire (ex: une maj dans le mdp etc..)
import axios from "axios"; //req  get request in createpost
import { useNavigate } from 'react-router-dom'; // hook d'history


function CreatePost() {
    const navigate = useNavigate(); // define history pour redirection
    const initialValues = {
        title: "",
        description: "",
        stock: "",
        price: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        description: Yup.string().required(),
        stock: Yup.number().required().positive().integer(),
        price: Yup.number().required().positive().integer(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data).then((response) => {
          //ce que nous faisons après avoir reçu les données
          navigate("/"); // revenir à la page d'accueil 
        });
    };

  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}> 
            <Form className='formContainer'>
                <label>Title: </label>
                <ErrorMessage name="title" component="span"/>
                <Field 
                    autocomplete="off"
                    id="inputCreatePost" 
                    name="title" 
                    placeholder="(Ex. ballon...)"
                /> 
                <label>Image: </label>
                <ErrorMessage name="description" component="span"/>
                <Field 
                    autocomplete="off"
                    id="inputCreatePost" 
                    name="description" 
                    placeholder="(Ex. url.png...)"
                /> 
                {/* <input type="file" name='image'></input>
                <input type="submit" name='valider' value="changer"/> */}
                <label>Stock: </label>
                <ErrorMessage name="stock" component="span"/>
                <Field 
                    autocomplete="off"
                    id="inputCreatePost" 
                    name="stock" 
                    placeholder="(Ex. 3...)"
                /> 
                <label>Price: </label>
                <ErrorMessage name="price" component="span"/>
                <Field 
                    autocomplete="off"
                    id="inputCreatePost" 
                    name="price" 
                    placeholder="(Ex. 25...)"
                /> 
                <button type="submit">Valider</button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost;