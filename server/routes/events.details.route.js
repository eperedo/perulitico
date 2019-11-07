const polls = require('./../data/polls.data');
const EVENTS_PER_PAGE = 19;

const route = {
  handler: async (req) => {
    const { politicianSlug, typeEvent } = req.params;
    const from = req.query.from || 0;
    const to = req.query.to || EVENTS_PER_PAGE;
    
    const events = [];
    
    for (let index = from; index <= to; index++) {
      const element = polls[index];
      const politicianVote = element.votes.find(v => v.politicianId === politicianSlug);
      const newEvent = {
        description: `He marcado ${politicianVote.voteLabel} en la votación ${element.title}`,
        eventDate: element.rawDate,
        webSlug: element.slug,
        politicianId: politicianVote.politicianId,
      };
      events.push(newEvent);
    }
    
    return events.filter(e => e.politicianId === politicianSlug);
  },
  method: 'GET',
  path: '/politicians/{politicianSlug}/{typeEvent}/events',
};

module.exports = route;
