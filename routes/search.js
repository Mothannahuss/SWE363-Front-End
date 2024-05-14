const express = require('express');
const router = express.Router();
const { MeiliSearch } = require('meilisearch');
const Event = require('../models/Event');
const Club = require('../models/Club');



const client = new MeiliSearch({
    host: process.env.MEILISEARCH_PROJECT_URL,
    apiKey: process.env.MEILISEARCH_KEY
  });

async function indexEventsToMeiliSearch() {
    const items = await Event.find(); // Fetch all items from MongoDB
    const documents = items.map(item => ({
      id: item._id.toString(),
      club_name: item.club_name.toLowerCase(),
      title: item.title.toLowerCase(),
      description: item.description.toLowerCase(),
      date: item.date,
       // MeiliSearch needs an id field
      // Include other fields you want to index
    }));

    const index = client.index('events'); // 'items' is the index name in MeiliSearch
    await index.addDocuments(documents);
};


async function indexClubsToMeiliSearch()
{
    const items = await Club.find(); // Fetch all items from MongoDB
    const documents = items.map(item => ({
      id: item._id.toString(),
      name: item.name.toLowerCase(),
      bio: item.bio.toLowerCase(),
      categories: item.categories,
       // MeiliSearch needs an id field
      // Include other fields you want to index
    }));

    const index = client.index('clubs'); // 'items' is the index name in MeiliSearch
    await index.addDocuments(documents);
}


async function setUp()
{
    try{
        let indexes = await client.getIndexes();
        console.log(indexes);

    const indexExists = indexes.results.find(index => index.uid === "events");
    if (indexExists)
        return;
    else
        await indexEventsToMeiliSearch();
    }catch(e)
    {
        console.log(e);
    }

}



router.get("/:query", async function(req,res)
{
    await indexEventsToMeiliSearch();
    await indexClubsToMeiliSearch();
    let indexes = await client.getIndexes();

    let option = req.query.option;
    console.log(option,indexes);
    if (req?.params?.query) {
        try{
            let hits = 0;
            if (option == "0")
            {
                let index = client.index("events");
                let results = await index.search(req.params.query);
                hits = results.hits;

            }
            else
            {
                let index = client.index("clubs");
                let results = await index.search(req.params.query);
                hits = results.hits;
            }


            res.send(hits);
        }catch(err)
        {
            console.log(err);
        }
    }
})




module.exports = router;