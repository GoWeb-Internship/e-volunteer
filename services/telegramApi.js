import axios from 'axios';
axios.defaults.baseURL = '';
axios.defaults.params = {};

const sendMessageToTg = async text => {
  const NEXT_TOKEN = '5704499246:AAFqnkYEH-OkFg5Oyd_7fprDIBLIn44Z0RE';
  const NEXT_CHAT_ID = '-1001895871019';

  const TG_URL = `https://api.telegram.org/bot${NEXT_TOKEN}/sendMessage?chat_id=${NEXT_CHAT_ID}`;

  return await axios.post(TG_URL, {
    text,
    parse_mode: 'HTML',
  });
};

export default sendMessageToTg;
