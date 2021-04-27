function formatDate(d) {
    formatted = [
        d.getFullYear(),
        ('0' + (d.getMonth() + 1)).slice(-2),
        ('0' + d.getDate()).slice(-2)
    ].join('-');
    return formatted;
  }

var now = new Date();
var dayOfWeek = now.getDay();
var weekAgoMondayOffset = 7;
if (dayOfWeek === 0) {
    weekAgoMondayOffset += 6;
} else if (dayOfWeek > 1 && dayOfWeek <=6) {
    weekAgoMondayOffset += (dayOfWeek - 1);
}
var weekAgoMonday = new Date(now.getTime() - (weekAgoMondayOffset * 24*60*60*1000));
var weekAgoMondayString = formatDate(weekAgoMonday);

myapp = new Vue({
    el: '#myapp',
    data() {
        return {
            date_selected: weekAgoMondayString,
            modelConfig: {
                type: 'string',
                mask: 'YYYY-MM-DD', // Uses 'iso' if missing
            },
            availableDates: {
                start: new Date(2021, 3, 5),
                end: weekAgoMonday,
                weekdays: [2] 
            },
            locale: {
                firstDayOfWeek: 2,
                masks: {
                    input: ['YYYY-MM-DD']
                }
            }
        }
      },
    methods : {
        openWeeklyPage: function (event) {
            var filename = 'stat_pages/' + this.date_selected + '.html';
            window.open(filename, '_blank');
        }
    }
  })