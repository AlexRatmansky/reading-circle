import * as express from 'express';
const router = express.Router();

import * as fs from 'fs';
import * as moment from 'moment';

import { parseArticleFileData } from '../helpers/file';

import { Article } from 'Article';

/* GET users listing. */
router.get('/rss', function (req, res, next) {

  const todayDate = moment();
  const pathToFile = `./pages/${todayDate.format('MM')}/${todayDate.format('DD')}.md`;

  fs.readFile(pathToFile, 'utf8', function (err, data) {

    const fileData = parseArticleFileData(data);
    const renderParams = {
      title: fileData.attributes.title || 'Empty title',
      date: todayDate.toDate().toISOString(),
      slug: `${todayDate.format('MM')}-${todayDate.format('DD')}`,
      body: fileData.text
    };

    res.set('Content-Type', 'text/xml');
    res.render('rss', renderParams);
  });
});

export default router;