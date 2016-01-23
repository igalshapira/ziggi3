'use strict'
var db = require('../app/db');

exports.up = function(next) { 
    db.Calendar.create([
    {
      type: 'heb',
      title: 'ראש חודש שבט',
      date: new Date('2016-01-11'),
    },
    {
      type: 'heb',
      title: 'טו בשבט',
      date: new Date('2016-01-25'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אדר א׳',
      date: new Date('2016-02-09'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אדר א׳',
      date: new Date('2016-02-10'),
    },
    {
      type: 'heb',
      title: 'פורים קטן',
      date: new Date('2016-02-23'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אדר ב׳',
      date: new Date('2016-03-10'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אדר ב׳',
      date: new Date('2016-03-11'),
    },
    {
      type: 'heb',
      title: 'ערב פורים',
      date: new Date('2016-03-23'),
    },
    {
      type: 'heb',
      title: 'פורים',
      date: new Date('2016-03-24'),
    },
    {
      type: 'heb',
      title: 'שושן פורים',
      date: new Date('2016-03-25'),
    },
    {
      type: 'heb',
      title: 'ראש חודש ניסן',
      date: new Date('2016-04-09'),
    },
    {
      type: 'heb',
      title: 'ערב פסח',
      date: new Date('2016-04-22'),
    },
    {
      type: 'heb',
      title: 'פסח יום א׳',
      date: new Date('2016-04-23'),
    },
    {
      type: 'heb',
      title: 'פסח יום ב׳ (חול המועד)',
      date: new Date('2016-04-24'),
    },
    {
      type: 'heb',
      title: 'פסח יום ג׳ (חול המועד)',
      date: new Date('2016-04-25'),
    },
    {
      type: 'heb',
      title: 'פסח יום ד׳ (חול המועד)',
      date: new Date('2016-04-26'),
    },
    {
      type: 'heb',
      title: 'פסח יום ה׳ (חול המועד)',
      date: new Date('2016-04-27'),
    },
    {
      type: 'heb',
      title: 'פסח יום ו׳ (חול המועד)',
      date: new Date('2016-04-28'),
    },
    {
      type: 'heb',
      title: 'פסח יום ז׳',
      date: new Date('2016-04-29'),
    },
    {
      type: 'heb',
      title: 'יום השואה',
      date: new Date('2016-05-05'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אייר',
      date: new Date('2016-05-08'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אייר',
      date: new Date('2016-05-09'),
    },
    {
      type: 'heb',
      title: 'יום הזכרון',
      date: new Date('2016-05-11'),
    },
    {
      type: 'heb',
      title: 'יום העצמאות',
      date: new Date('2016-05-12'),
    },
    {
      type: 'heb',
      title: 'פסח שני',
      date: new Date('2016-05-22'),
    },
    {
      type: 'heb',
      title: 'ל״ג בעומר',
      date: new Date('2016-05-26'),
    },
    {
      type: 'heb',
      title: 'יום ירושלים',
      date: new Date('2016-06-05'),
    },
    {
      type: 'heb',
      title: 'ראש חודש סיון',
      date: new Date('2016-06-07'),
    },
    {
      type: 'heb',
      title: 'ערב שבועות',
      date: new Date('2016-06-11'),
    },
    {
      type: 'heb',
      title: 'שבועות יום א׳',
      date: new Date('2016-06-12'),
    },
    {
      type: 'heb',
      title: 'ראש חודש תמוז',
      date: new Date('2016-07-06'),
    },
    {
      type: 'heb',
      title: 'ראש חודש תמוז',
      date: new Date('2016-07-07'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אב',
      date: new Date('2016-08-05'),
    },
    {
      type: 'heb',
      title: 'ערב תשעה באב',
      date: new Date('2016-08-13'),
    },
    {
      type: 'heb',
      title: 'תשעה באב',
      date: new Date('2016-08-14'),
    },
    {
      type: 'heb',
      title: 'טו באב',
      date: new Date('2016-08-19'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אלול',
      date: new Date('2016-09-03'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אלול',
      date: new Date('2016-09-04'),
    },
    {
      type: 'heb',
      title: 'סליחות',
      date: new Date('2016-09-24'),
    },
    {
      type: 'heb',
      title: 'ערב ראש השנה',
      date: new Date('2016-10-02'),
    },
    {
      type: 'heb',
      title: 'ראש השנה 5777',
      date: new Date('2016-10-03'),
    },
    {
      type: 'heb',
      title: 'ראש השנה יום ב׳',
      date: new Date('2016-10-04'),
    },
    {
      type: 'heb',
      title: 'ערב יום כפור',
      date: new Date('2016-10-11'),
    },
    {
      type: 'heb',
      title: 'יום כפור',
      date: new Date('2016-10-12'),
    },
    {
      type: 'heb',
      title: 'ערב סוכות',
      date: new Date('2016-10-16'),
    },
    {
      type: 'heb',
      title: 'סוכות יום א׳',
      date: new Date('2016-10-17'),
    },
    {
      type: 'heb',
      title: 'סוכות יום ב׳ (חול המועד)',
      date: new Date('2016-10-18'),
    },
    {
      type: 'heb',
      title: 'סוכות יום ג׳ (חול המועד)',
      date: new Date('2016-10-19'),
    },
    {
      type: 'heb',
      title: 'סוכות יום ד׳ (חול המועד)',
      date: new Date('2016-10-20'),
    },
    {
      type: 'heb',
      title: 'סוכות יום ה׳ (חול המועד)',
      date: new Date('2016-10-21'),
    },
    {
      type: 'heb',
      title: 'סוכות יום ו׳ (חול המועד)',
      date: new Date('2016-10-22'),
    },
    {
      type: 'heb',
      title: 'סוכות יום ז׳ (הושנא רבה)',
      date: new Date('2016-10-23'),
    },
    {
      type: 'heb',
      title: 'שמיני עצרת',
      date: new Date('2016-10-24'),
    },
    {
      type: 'heb',
      title: 'ראש חודש חשון',
      date: new Date('2016-11-01'),
    },
    {
      type: 'heb',
      title: 'ראש חודש חשון',
      date: new Date('2016-11-02'),
    },
    {
      type: 'heb',
      title: 'סיגד',
      date: new Date('2016-11-30'),
    },
    {
      type: 'heb',
      title: 'ראש חודש כסלו',
      date: new Date('2016-12-01'),
    },
    {
      type: 'heb',
      title: 'חנוכה: א׳ נר',
      date: new Date('2016-12-24'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ב׳ נרות',
      date: new Date('2016-12-25'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ג׳ נרות',
      date: new Date('2016-12-26'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ד׳ נרות',
      date: new Date('2016-12-27'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ה׳ נרות',
      date: new Date('2016-12-28'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ו׳ נרות',
      date: new Date('2016-12-29'),
    },
    {
      type: 'heb',
      title: 'ראש חודש טבת',
      date: new Date('2016-12-30'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ז׳ נרות',
      date: new Date('2016-12-30'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ח׳ נרות',
      date: new Date('2016-12-31'),
    },
    ], function(err) {
      if (err)
        throw err;
      next();
    });
};

exports.down = function(next) {
  next();
};
