const clubsDB = require("./../models/Club")
const eventDb = require("./../models/Event")

//A function to create a dummy club for testing and debugging purposes.
async function createClub(){
    let club = await new clubsDB({
        name: "KFUPM Computer Club",
        user: "507f191e810c19729de860ea",
        handler: "@KFUPM_CC",
        avatar: "https://pbs.twimg.com/profile_images/1705703998672568320/H__szsgw_400x400.jpg",
        background: "https://pbs.twimg.com/profile_banners/1329437400406388738/1695506521/1500x500",
        bio: "The official account for Computer Club @KFUPM",
        about:"مهمتنا هي توفير منصة داعمة لطلاب الجامعة",
    }).save()
    console.log(club)
}

// A function to add a dummy event for testing purpose.
async function createEvent(){
    let club = await clubsDB.findById("6640f84975b0082fd3d838a9")
    let event = await new eventDb({
        club_id: club._id,
        club_name: club.name,
        title: "A dummy event",
        location: "Building 58",
        description: "This is a testing event to see the functionality of my work",
        poster:"https://pbs.twimg.com/media/GLyoPYFXkAARjmd?format=jpg&name=4096x4096",
        link: "https://forms.office.com/pages/responsepage.aspx?id=iLC0KX3SKUG5-YY3tZ6ks0iMTtlv8tFAgCHPvqhlOelUMjBLQ0xWMTYxMEpaNk9aSk9YVkJBUUdYTSQlQCN0PWcu"
    }).save()
    console.log(event)
}


module.exports = {createClub, createEvent}