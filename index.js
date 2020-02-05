const ical = require('node-ical');
const request = require('request-promise-native');

/**
 * Takes in event object given by node-ical returns a cleaned up version without any of the junk like uid and dtime.
 * @param {Object} icalEvent An event object given by node-ical
 * @prop {Date} date 
 * @prop {Boolean} allDay
 * @prop {Date} end
 * @prop {String} summary
 * @prop {String} description
 * @prop {String} category
 * @prop {Number} priority
 * @prop {String} location
 */
exports.Event = class {
    constructor(icalEvent) {
        this.date = icalEvent.start;

        if (this.date.dateOnly === undefined) { this.allDay = false } else { this.allDay = this.date.dateOnly }

        if (this.allDay) { this.end = null; }
        else { this.end = icalEvent.end; }

        this.summary = icalEvent.summary;

        if (icalEvent.description === undefined || icalEvent.description === '') {
            this.description = null;
        } else { this.description = icalEvent.description; }

        if (icalEvent.categories === undefined) { this.category = null; }
        else { this.category = icalEvent.categories[0]; }

        this.priority = Number(icalEvent.priority);

        this.location = icalEvent.location;
    }
}

/**
 * Gets all events from the current school year.
 * @returns {Promise<exports.Event[]>} All events from the current school year.
 */
exports.getAllEvents = async function () {
    return Object.values(
        await ical.async.parseICS(
            await request(
                {
                    uri: 'https://www.d125.org/cf_calendar/feed.cfm?type=ical&feedID=AF5167036E214C99B84D252995DB9199.ics',
                    headers: {
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
                    }
                }
            )
        )
    ).map(event => new exports.Event(event));
}

exports.calendarURL = 'https://www.d125.org/cf_calendar/feed.cfm?type=ical&feedID=AF5167036E214C99B84D252995DB9199.ics';

/**
 * Gets all events from the current day.
 * @returns {Promise<exports.Event[]>} All events from the current day.
 */
exports.getTodaysEvents = async function () {
    now = new Date();
    const events = (await exports.getAllEvents()).filter(
        event => 
            event.date.getDate() === now.getDate() &&
            event.date.getMonth() === now.getMonth() &&
            event.date.getFullYear() === now.getFullYear()
    );
    return events;
}

/**
 * Gets all events from the current month.
 * @returns {Promise<exports.Event[]>} All events from the current month.
 */
exports.getMonthsEvents = async function () {
    now = new Date();
    return (await exports.getAllEvents()).filter(
        event =>
            event.date.getMonth() === now.getMonth() &&
            event.date.getFullYear() === now.getFullYear()
    );
}
