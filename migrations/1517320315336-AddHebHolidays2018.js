'use strict'
var db = require('../app/db');

exports.up = function(next) { 
    db.Calendar.create([
    {
      type: 'heb',
      title: 'ראש חודש שבט',
      date: new Date('2018-01-17'),
    },
    {
      type: 'heb',
      title: 'טו בשבט',
      date: new Date('2018-01-31'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אדר',
      date: new Date('2018-02-15'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אדר',
      date: new Date('2018-02-16'),
    },
    {
      type: 'heb',
      title: 'ערב פורים',
      date: new Date('2018-02-28'),
    },
    {
      type: 'heb',
      title: 'פורים',
      date: new Date('2018-03-01'),
    },
    {
      type: 'heb',
      title: 'שושן פורים',
      date: new Date('2018-03-02'),
    },
    {
      type: 'heb',
      title: 'ראש חודש ניסן',
      date: new Date('2018-03-17'),
    },
    {
      type: 'heb',
      title: 'ערב פסח',
      date: new Date('2018-03-30'),
    },
    {
      type: 'heb',
      title: 'פסח יום א׳',
      date: new Date('2018-03-31'),
    },
    {
      type: 'heb',
      title: 'פסח יום ב׳ (חול המועד)',
      date: new Date('2018-04-01'),
    },
    {
      type: 'heb',
      title: 'פסח יום ג׳ (חול המועד)',
      date: new Date('2018-04-02'),
    },
    {
      type: 'heb',
      title: 'פסח יום ד׳ (חול המועד)',
      date: new Date('2018-04-03'),
    },
    {
      type: 'heb',
      title: 'פסח יום ה׳ (חול המועד)',
      date: new Date('2018-04-04'),
    },
    {
      type: 'heb',
      title: 'פסח יום ו׳ (חול המועד)',
      date: new Date('2018-04-05'),
    },
    {
      type: 'heb',
      title: 'פסח יום ז׳',
      date: new Date('2018-04-06'),
    },
    {
      type: 'heb',
      title: 'יום השואה',
      date: new Date('2018-04-12'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אייר',
      date: new Date('2018-04-15'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אייר',
      date: new Date('2018-04-16'),
    },
    {
      type: 'heb',
      title: 'יום הזכרון',
      date: new Date('2018-04-18'),
    },
    {
      type: 'heb',
      title: 'יום העצמאות',
      date: new Date('2018-04-19'),
    },
    {
      type: 'heb',
      title: 'פסח שני',
      date: new Date('2018-04-29'),
    },
    {
      type: 'heb',
      title: 'ל״ג בעומר',
      date: new Date('2018-05-03'),
    },
    {
      type: 'heb',
      title: 'יום ירושלים',
      date: new Date('2018-05-13'),
    },
    {
      type: 'heb',
      title: 'ראש חודש סיון',
      date: new Date('2018-05-15'),
    },
    {
      type: 'heb',
      title: 'ערב שבועות',
      date: new Date('2018-05-19'),
    },
    {
      type: 'heb',
      title: 'שבועות יום א׳',
      date: new Date('2018-05-20'),
    },
    {
      type: 'heb',
      title: 'ראש חודש תמוז',
      date: new Date('2018-06-13'),
    },
    {
      type: 'heb',
      title: 'ראש חודש תמוז',
      date: new Date('2018-06-14'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אב',
      date: new Date('2018-07-13'),
    },
    {
      type: 'heb',
      title: 'ערב תשעה באב',
      date: new Date('2018-07-21'),
    },
    {
      type: 'heb',
      title: 'תשעה באב',
      date: new Date('2018-07-22'),
    },
    {
      type: 'heb',
      title: 'טו באב',
      date: new Date('2018-07-27'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אלול',
      date: new Date('2018-08-11'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אלול',
      date: new Date('2018-08-12'),
    },
    {
      type: 'heb',
      title: 'סליחות',
      date: new Date('2018-09-01'),
    },
    {
      type: 'heb',
      title: 'ערב ראש השנה',
      date: new Date('2018-09-09'),
    },
    {
      type: 'heb',
      title: 'ראש השנה 5779',
      date: new Date('2018-09-10'),
    },
    {
      type: 'heb',
      title: 'ראש השנה יום ב׳',
      date: new Date('2018-09-11'),
    },
    {
      type: 'heb',
      title: 'ערב יום כפור',
      date: new Date('2018-09-18'),
    },
    {
      type: 'heb',
      title: 'יום כפור',
      date: new Date('2018-09-19'),
    },
    {
      type: 'heb',
      title: 'ערב סוכות',
      date: new Date('2018-09-23'),
    },
    {
      type: 'heb',
      title: 'סוכות יום א׳',
      date: new Date('2018-09-24'),
    },
    {
      type: 'heb',
      title: 'סוכות יום ב׳ (חול המועד)',
      date: new Date('2018-09-25'),
    },
    {
      type: 'heb',
      title: 'סוכות יום ג׳ (חול המועד)',
      date: new Date('2018-09-26'),
    },
    {
      type: 'heb',
      title: 'סוכות יום ד׳ (חול המועד)',
      date: new Date('2018-09-27'),
    },
    {
      type: 'heb',
      title: 'סוכות יום ה׳ (חול המועד)',
      date: new Date('2018-09-28'),
    },
    {
      type: 'heb',
      title: 'סוכות יום ו׳ (חול המועד)',
      date: new Date('2018-09-29'),
    },
    {
      type: 'heb',
      title: 'סוכות יום ז׳ (הושענא רבה)',
      date: new Date('2018-09-30'),
    },
    {
      type: 'heb',
      title: 'שמיני עצרת',
      date: new Date('2018-10-01'),
    },
    {
      type: 'heb',
      title: 'ראש חודש חשון',
      date: new Date('2018-10-09'),
    },
    {
      type: 'heb',
      title: 'ראש חודש חשון',
      date: new Date('2018-10-10'),
    },
    {
      type: 'heb',
      title: 'יום העלייה',
      date: new Date('2018-10-16'),
    },
    {
      type: 'heb',
      title: 'סיגד',
      date: new Date('2018-11-07'),
    },
    {
      type: 'heb',
      title: 'ראש חודש כסלו',
      date: new Date('2018-11-08'),
    },
    {
      type: 'heb',
      title: 'ראש חודש כסלו',
      date: new Date('2018-11-09'),
    },
    {
      type: 'heb',
      title: 'חנוכה: א׳ נר',
      date: new Date('2018-12-02'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ב׳ נרות',
      date: new Date('2018-12-03'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ג׳ נרות',
      date: new Date('2018-12-04'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ד׳ נרות',
      date: new Date('2018-12-05'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ה׳ נרות',
      date: new Date('2018-12-06'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ו׳ נרות',
      date: new Date('2018-12-07'),
    },
    {
      type: 'heb',
      title: 'ראש חודש טבת',
      date: new Date('2018-12-08'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ז׳ נרות',
      date: new Date('2018-12-08'),
    },
    {
      type: 'heb',
      title: 'ראש חודש טבת',
      date: new Date('2018-12-09'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ח׳ נרות',
      date: new Date('2018-12-09'),
    },
    {
      type: 'heb',
      title: 'חנוכה: יום ח׳',
      date: new Date('2018-12-10'),
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