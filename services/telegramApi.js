import axios from 'axios';
axios.defaults.baseURL = '';
axios.defaults.params = {};

const sendMessageToTg = async text => {
  const NEXT_TOKEN = '5704499246:AAFqnkYEH-OkFg5Oyd_7fprDIBLIn44Z0RE';
  const NEXT_CHAT_ID = '-735566657';

  const TG_URL = `https://api.telegram.org/bot${NEXT_TOKEN}/sendMessage?chat_id=${NEXT_CHAT_ID}`;

  try {
    return await axios.post(TG_URL, {
      text,
      parse_mode: 'HTML',
    });
  } catch (error) {
    alert(error);
  }
};

export default sendMessageToTg;
