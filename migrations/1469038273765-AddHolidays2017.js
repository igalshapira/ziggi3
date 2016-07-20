'use strict'
var db = require('../app/db');

exports.up = function(next) { 
    db.Calendar.create([
    {
      type: 'heb',
      title: 'חנוכה: יום ח׳',
      date: new Date('2017-01-01'),
    },
    {
      type: 'heb',
      title: 'ראש חודש שבט',
      date: new Date('2017-01-28'),
    },
    {
      type: 'heb',
      title: 'טו בשבט',
      date: new Date('2017-02-11'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אדר',
      date: new Date('2017-02-26'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אדר',
      date: new Date('2017-02-27'),
    },
    {
      type: 'heb',
      title: 'ערב פורים',
      date: new Date('2017-03-11'),
    },
    {
      type: 'heb',
      title: 'פורים',
      date: new Date('2017-03-12'),
    },
    {
      type: 'heb',
      title: 'שושן פורים',
      date: new Date('2017-03-13'),
    },
    {
      type: 'heb',
      title: 'ראש חודש ניסן',
      date: new Date('2017-03-28'),
    },
    {
      type: 'heb',
      title: 'ערב פסח',
      date: new Date('2017-04-10'),
    },
    {
      type: 'heb',
      title: 'פסח יום א׳',
      date: new Date('2017-04-11'),
    },
    {
      type: 'heb',
      title: 'פסח יום ב׳ (חול המועד)',
      date: new Date('2017-04-12'),
    },
    {
      type: 'heb',
      title: 'פסח יום ג׳ (חול המועד)',
      date: new Date('2017-04-13'),
    },
    {
      type: 'heb',
      title: 'פסח יום ד׳ (חול המועד)',
      date: new Date('2017-04-14'),
    },
    {
      type: 'heb',
      title: 'פסח יום ה׳ (חול המועד)',
      date: new Date('2017-04-15'),
    },
    {
      type: 'heb',
      title: 'פסח יום ו׳ (חול המועד)',
      date: new Date('2017-04-16'),
    },
    {
      type: 'heb',
      title: 'פסח יום ז׳',
      date: new Date('2017-04-17'),
    },
    {
      type: 'heb',
      title: 'יום השואה',
      date: new Date('2017-04-24'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אייר',
      date: new Date('2017-04-26'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אייר',
      date: new Date('2017-04-27'),
    },
    {
      type: 'heb',
      title: 'יום הזכרון',
      date: new Date('2017-05-01'),
    },
    {
      type: 'heb',
      title: 'יום העצמאות',
      date: new Date('2017-05-02'),
    },
    {
      type: 'heb',
      title: 'פסח שני',
      date: new Date('2017-05-10'),
    },
    {
      type: 'heb',
      title: 'ל״ג בעומר',
      date: new Date('2017-05-14'),
    },
    {
      type: 'heb',
      title: 'יום ירושלים',
      date: new Date('2017-05-24'),
    },
    {
      type: 'heb',
      title: 'ראש חודש סיון',
      date: new Date('2017-05-26'),
    },
    {
      type: 'heb',
      title: 'ערב שבועות',
      date: new Date('2017-05-30'),
    },
    {
      type: 'heb',
      title: 'שבועות יום א׳',
      date: new Date('2017-05-31'),
    },
    {
      type: 'heb',
      title: 'ראש חודש תמוז',
      date: new Date('2017-06-24'),
    },
    {
      type: 'heb',
      title: 'ראש חודש תמוז',
      date: new Date('2017-06-25'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אב',
      date: new Date('2017-07-24'),
    },
    {
      type: 'heb',
      title: 'ערב תשעה באב',
      date: new Date('2017-07-31'),
    },
    {
      type: 'heb',
      title: 'תשעה באב',
      date: new Date('2017-08-01'),
    },
    {
      type: 'heb',
      title: 'טו באב',
      date: new Date('2017-08-07'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אלול',
      date: new Date('2017-08-22'),
    },
    {
      type: 'heb',
      title: 'ראש חודש אלול',
      date: new Date('2017-08-23'),
    },
    {
      type: 'heb',
      title: 'סליחות',
      date: new Date('2017-09-16'),
    },
    {
      type: 'heb',
      title: 'ערב ראש השנה',
      date: new Date('2017-09-20'),
    },
    {
      type: 'heb',
      title: 'ראש השנה 5778',
      date: new Date('2017-09-21'),
    },
    {
      type: 'heb',
      title: 'ראש השנה יום ב׳',
      date: new Date('2017-09-22'),
    },
    {
      type: 'heb',
      title: 'ערב יום כפור',
      date: new Date('2017-09-29'),
    },
    {
      type: 'heb',
      title: 'יום כפור',
      date: new Date('2017-09-30'),
    },
    {
      type: 'heb',
      title: 'ערב סוכות',
      date: new Date('2017-10-04'),
    },
    {
      type: 'heb',
      title: 'סוכות יום א׳',
      date: new Date('2017-10-05'),
    },
    {
      type: 'heb',
      title: 'סוכות יום ב׳ (חול המועד)',
      date: new Date('2017-10-06'),
    },
    {
      type: 'heb',
      title: 'סוכות יום ג׳ (חול המועד)',
      date: new Date('2017-10-07'),
    },
    {
      type: 'heb',
      title: 'סוכות יום ד׳ (חול המועד)',
      date: new Date('2017-10-08'),
    },
    {
      type: 'heb',
      title: 'סוכות יום ה׳ (חול המועד)',
      date: new Date('2017-10-09'),
    },
    {
      type: 'heb',
      title: 'סוכות יום ו׳ (חול המועד)',
      date: new Date('2017-10-10'),
    },
    {
      type: 'heb',
      title: 'סוכות יום ז׳ (הושנא רבה)',
      date: new Date('2017-10-11'),
    },
    {
      type: 'heb',
      title: 'שמיני עצרת',
      date: new Date('2017-10-12'),
    },
    {
      type: 'heb',
      title: 'ראש חודש חשון',
      date: new Date('2017-10-20'),
    },
    {
      type: 'heb',
      title: 'ראש חודש חשון',
      date: new Date('2017-10-21'),
    },
    {
      type: 'heb',
      title: 'סיגד',
      date: new Date('2017-11-18'),
    },
    {
      type: 'heb',
      title: 'ראש חודש כסלו',
      date: new Date('2017-11-19'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ��׳ נר',
      date: new Date('2017-12-12'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ב׳ נרות',
      date: new Date('2017-12-13'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ג׳ נרות',
      date: new Date('2017-12-14'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ד׳ נרות',
      date: new Date('2017-12-15'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ה׳ נרות',
      date: new Date('2017-12-16'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ו׳ נרות',
      date: new Date('2017-12-17'),
    },
    {
      type: 'heb',
      title: 'ראש חודש טבת',
      date: new Date('2017-12-18'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ז׳ נרות',
      date: new Date('2017-12-18'),
    },
    {
      type: 'heb',
      title: 'ראש חודש טבת',
      date: new Date('2017-12-19'),
    },
    {
      type: 'heb',
      title: 'חנוכה: ח׳ נרות',
      date: new Date('2017-12-19'),
    },
    {
      type: 'heb',
      title: 'חנוכה: יום ח׳',
      date: new Date('2017-12-20'),
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
