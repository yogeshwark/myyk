﻿(function( window, undefined ) {
    kendo.cultures["az-Latn-AZ"] = {
        name: "az-Latn-AZ",
        numberFormat: {
            pattern: ["-n"],
            decimals: 2,
            ",": " ",
            ".": ",",
            groupSize: [3],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "%"
            },
            currency: {
                pattern: ["-n $","n $"],
                decimals: 2,
                ",": " ",
                ".": ",",
                groupSize: [3],
                symbol: "man."
            }
        },
        calendars: {
            standard: {
                days: {
                    names: ["Bazar","Bazar ertəsi","Çərşənbə axşamı","Çərşənbə","Cümə axşamı","Cümə","Şənbə"],
                    namesAbbr: ["B","Be","Ça","Ç","Ca","C","Ş"],
                    namesShort: ["B","Be","Ça","Ç","Ca","C","Ş"]
                },
                months: {
                    names: ["Yanvar","Fevral","Mart","Aprel","May","İyun","İyul","Avgust","Sentyabr","Oktyabr","Noyabr","Dekabr",""],
                    namesAbbr: ["Yan","Fev","Mar","Apr","May","İyun","İyul","Avg","Sen","Okt","Noy","Dek",""]
                },
                AM: [""],
                PM: [""],
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "d MMMM yyyy",
                    F: "d MMMM yyyy H:mm:ss",
                    g: "dd.MM.yyyy H:mm",
                    G: "dd.MM.yyyy H:mm:ss",
                    m: "d MMMM",
                    M: "d MMMM",
                    s: "yyyy'-'MM'-'dd'T'HH':'mm':'ss",
                    t: "H:mm",
                    T: "H:mm:ss",
                    u: "yyyy'-'MM'-'dd HH':'mm':'ss'Z'",
                    y: "MMMM yyyy",
                    Y: "MMMM yyyy"
                },
                "/": ".",
                ":": ":",
                firstDay: 1
            }
        }
    }
})(this);
