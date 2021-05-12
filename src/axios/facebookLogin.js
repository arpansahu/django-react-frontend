import axios from 'axios';
import { useHistory } from 'react-router-dom';

const facebookLogin = (accesstoken) => {
	// console.log(accesstoken);
	axios
		.post('https://react-backend-social.herokuapp.com/auth/convert-token', {
			token: accesstoken,
			backend: 'facebook',
			grant_type: 'convert_token',
			client_id: 'jq24l7DFApUddjOeiQo7cSn2EGZXCjtsw0l97pdj',
			client_secret:
				'sMvif7nDWYOzuy37wirIkAzejmiLKBCSBYANoA8nnvVrKcKWc7EkzUnYXdl2GzpkUblvbcPGhEHypg2jC04ClMZmyXsjUnCVIt1ppAdYRi2dBeE8IjADyOdPvas7BrGF',
		})
		.then((res) => {
			// console.log("access_token: "+res.data.access_token)
			// console.log("refresh_token: "+res.data.refresh_token)
			localStorage.setItem('access_token', res.data.access_token);
			localStorage.setItem('refresh_token', res.data.refresh_token);
			window.location.reload();
		});
};

export default facebookLogin;
