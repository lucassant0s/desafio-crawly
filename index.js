const request = require('request');
const cheerio = require('cheerio');

let $ = null;
let formValues = [];

request({
  method: 'GET',
  headers: {
    'Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
    'Cookie': 'PHPSESSID=fvc3unpl0bv1qhsmvarqo3sphs'
  },
  url: 'http://applicant-test.us-east-1.elasticbeanstalk.com/'
}, (err, res, body) => {

  if (err) return console.error(err);

  $ = cheerio.load(body);

  formValues = $('form').serializeArray();

  request({
    method: 'POST',
    headers: {
      'Connection': 'keep-alive',
      'Cache-Control': 'max-age=0',
      'Origin': 'http://applicant-test.us-east-1.elasticbeanstalk.com',
      'Upgrade-Insecure-Requests': '1',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      'Referer': 'http://applicant-test.us-east-1.elasticbeanstalk.com/',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      'Cookie': 'PHPSESSID=fvc3unpl0bv1qhsmvarqo3sphs'
    },
    url: 'http://applicant-test.us-east-1.elasticbeanstalk.com/',
    body: `token=${findAnswer(formValues[0].value)}`
  }, (err, response, body) => {
    if (err) return console.error(err);

    $ = cheerio.load(body);

    console.log(`--------- RESPOSTA: ${$('#answer').text()} ---------`);
  });
});

const findAnswer = (value) => {
  const replacements = {
    l:"o",
    m:"n",
    n:"m",
    o:"l",
    p:"k",
    q:"j",
    r:"i",
    s:"h",
    t:"g",
    u:"f",
    v:"e",
    w:"d",
    x:"c",
    y:"b",
    z:"a" 
  };
  let e = null;
  let t = 0;
  for(e = value.split(""); t < e.length; t++)
    e[t] = replacements.hasOwnProperty(e[t]) ? replacements[e[t]] : e[t];
  return e.join(""); 
}