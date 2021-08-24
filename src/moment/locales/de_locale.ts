import moment from "moment";

moment.defineLocale("de", {
  parentLocale: "en",
  months:
    "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split(
      "_"
    ),
  monthsShort: "Jan_Feb_Mär_Apr_Mai_Jun_Jul_Aug_Sep_Okt_Nov_Dez".split("_"),
  monthsParseExact: true,
  weekdays: "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split(
    "_"
  ),
  weekdaysShort: "Son._Mon._Din._Mit._Don._Fre._Sam.".split("_"),
  weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
  weekdaysParseExact: true,
});

moment().locale("de");
