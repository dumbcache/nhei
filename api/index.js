import express from 'express';
import cors from 'cors';

import {
  searchHandler,
  getSectionsHandler,
  getBoardsHandler,
  getDoujinHandler,
  searchCacheHandler,
  createHandler,
  createBoardHandler,
  createSectionHandler,
  deleteBoardHandler,
  deleteSectionHandler,
  createPinHandler,
  deletePinHandler,
  editSectionHandler,
  editBoardHandler,
  thumbsHandler,
} from './handlers.js';

console.log('working');

let app = express(),
  port = 8080;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ status: 'nhei running' });
});
app.post('/search', searchCacheHandler, searchHandler);
app.post('/doujin', getDoujinHandler);
app.post('/create', createHandler);
app.get('/thumbs', thumbsHandler);

app
  .route('/boards')
  .get(getBoardsHandler)
  .post(createBoardHandler)
  .patch(editBoardHandler)
  .delete(deleteBoardHandler);

app
  .route('/:board/sections')
  .get(getSectionsHandler)
  .put(createSectionHandler)
  .delete(deleteSectionHandler)
  .patch(editSectionHandler);

app
  .route('/pins')
  .post(createPinHandler)
  .patch(createPinHandler)
  .delete(deletePinHandler);

app.listen(port, () => console.log(`listening at port ${port}`));
