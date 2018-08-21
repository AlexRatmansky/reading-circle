import * as express from 'express';
const router = express.Router();

import { promisify } from 'util';
import * as fs from 'fs';
import * as moment from 'moment';

import { parseArticleFileData } from '../helpers/file';
import { RssItem } from 'Article';
import { thisExpression } from 'babel-types';

const readFileAsync = promisify(fs.readFile);

/* GET users listing. */
router.get('/rss', function (req, res) {

  const todayDate = moment();
  todayDate.set({
    'hour': 3,
    'minute': 0,
    'second': 0,
    'millisecond': 0
  });

  const completeParams: { articles: RssItem[] } = { articles: [] };

  let chain = Promise.resolve();

  for (let i = 5; i > 0; i--) {
    chain = chain
      .then(() => readFileAsync(`./pages/${todayDate.format('MM')}/${todayDate.format('DD')}.yml`))
      .then((data) => {
        completeParams.articles.push(formArticleData(data));
        todayDate.subtract(1, 'day');
      });
  }

  chain
    .then(() => {
      res.set('Content-Type', 'text/xml');
      res.render('feed/rss', completeParams);
    });

  function formArticleData(data: any) {
    const fileData = parseArticleFileData(data);
    return {
      title: fileData.title || 'Empty title',
      date: todayDate.toDate().toISOString(),
      slug: `${todayDate.format('MM')}-${todayDate.format('DD')}`,
      intro: fileData.intro,
      body: fileData.body,
      conclusion: fileData.conclusion,
    };
  }
});

export default router;