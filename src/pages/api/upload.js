import nc from 'next-connect';
import uploadHandler from '../../utils/uploadHandler';

const handler = nc().post(uploadHandler);

export default handler;