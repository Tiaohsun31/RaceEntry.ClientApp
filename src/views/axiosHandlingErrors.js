import Swal from 'sweetalert2';
import { router } from '../router/index';

function axiosResponseStatus(error) {
    if (error.response) {
        if (error.response.status === 400) {
            Swal.fire({ icon: 'error', title: error.response.data });
        }
        if (error.response.status === 404) {
            router.push({ name: 'NotFound' });
        }
    } 
    else if (error.request) {
        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }
   // console.log(error.config);
}

export { axiosResponseStatus };