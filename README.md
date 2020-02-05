## shs_events
A minimalist tool to scrape events from the Stevenson High School calendar. 
## Usage

```javascript
const events = require('shs_events');
events.getTodaysEvents().then(console.log);

/*
[ { date: { 2020-02-05T16:15:00.000Z tz: undefined },
    allDay: false,
    end: { 2020-02-05T21:25:00.000Z tz: undefined },
    summary: 'Odyssey Fine Arts Festival',
    description: 'Visit the Odyssey web page for details \n\n\n\n',
    categories: 'Fine Arts',
    priority: 0,
    location: undefined } ]
*/

```

## Documentation
### Table of Contents

-   [Event][1]
    -   [Parameters][2]
    -   [Properties][3]
-   [getAllEvents][4]
-   [getTodaysEvents][5]
-   [getMonthsEvents][6]

## Event

Takes in event object given by node-ical returns a cleaned up version without any of the junk like uid and dtime.
### Parameters

-   `icalEvent` **[Object][7]** An event object given by node-ical.

### Properties

-   `date` **[Date][8]** The date and, if the event isn't all day, time of the start of the event.
-   `allDay` **[Boolean][9]** True if the event lasts all day.
-   `end` **[Date][8]** The date-time of the end of the event.
-   `summary` **[String][10]** A short description or title of the event.
-   `description` **[String][10]** A more detailed description of the event than the summary.
-   `category` **[String][10]** The category, such as Fine Arts or Non-Attendance Days, that the event falls into-   `priority` **[Number][11]** How important the event is.
-   `location` **[String][10]** Where the event is taking place. Undefined if the event takes place all over Stevenson.

## getAllEvents

Gets all events from the current school year.

Returns **[Promise][12]&lt;[Array][13]&lt;exports.Event>>** All events from the current school year.

## getTodaysEvents

Gets all events from the current day.

Returns **[Promise][12]&lt;[Array][13]&lt;exports.Event>>** All events from the current day.

## getMonthsEvents

Gets all events from the current month.

Returns **[Promise][12]&lt;[Array][13]&lt;exports.Event>>** All events from the current month.

[1]: #event

[2]: #parameters

[3]: #properties

[4]: #getallevents

[5]: #gettodaysevents

[6]: #getmonthsevents

[7]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[8]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Date

[9]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[10]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[11]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[12]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[13]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array