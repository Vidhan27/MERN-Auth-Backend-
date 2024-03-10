
//npm install axios

//SIGN UP

import axios from 'axios';
import { response } from 'express';

const [name, setState] = useState(initialState)
const [password, setState] = useState(initialState)
const [confirmPassword, setState] = useState(initialState)
const [email, setState] = useState(initialState)

const handleSubmit = (e) =>{//NOT ASYNC
    e.preventDefault();

    if(confirmPassword === password){
        const data={
            name,
            email,
            password
        };

        axios.post(`/api/auth/register`,data).then(response=>{
            console.log(response.data);
        }).catch(error=>{
            console.log(error)
            if(error.response.status === false){
                window.alert(error.response.data.msg)

            }
        })
} 
}

//LOGIN

import axios from 'axios';
import { use } from '../server/apis/authAPI';

const [password, setState] = useState(initialState)
const [email, setState] = useState(initialState)

const handleSubmit = (e) =>{
    e.preventDefault();

        const data={
            email,
            password
        };


        axios.post(`/api/auth/login`,data).then(response=>{
            window.alert(response.data.msg);
        }).catch(error=>{
            console.log(error)
            if(error.response.status === false){
                window.alert(error.response.data.msg)

            }
        })

}

// VERIFY EMAIL PAGE

import axios from 'axios';

const token = useLocation().search.slice(0,userLocation().search.length).split('=').pop();

const [verified,setVerified] = useState(false);
const[error,setError] = useState();

useEffect(()=>{
    if(token){
        axios.get(`/api/email/verify?token=${token}`).then(res=>{
            console.log(res);
            setVerified(true);
        }).catch(error=>{
            console.log(err.response);
        })
    }
})
