# Google-Scraper

This nodejs module will scrape Google results. 

## Example
This will print out the results of the first 3 pages with the query as 'nodejs'

```javascript
var google = requre('Google-Scraper');

var options = {
   keyword: 'nodejs',
   pages: 3
   };
   
google(options, function(err, links) {
  if(err) console.log(err);
  console.log(links);
  });
