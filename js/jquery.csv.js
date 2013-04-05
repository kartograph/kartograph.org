
$.extend({
    parseCSV: function(csv, opt) {
        if (opt === undefined) opt = {};
        if (opt.sepChar === undefined) opt.sepChar = "auto";
        if (opt.header === undefined) opt.header = true;
        if (opt.trim === undefined) opt.trim = true;
        if (opt.map === undefined) opt.map = true;
        if (opt.numberize === undefined) opt.numberize = true;

        var i,j,res = { rows: [] };
        var rows = csv.split("\n");
        if (opt.sepChar == "auto") {
            var mc=0;
            $.each([',','\t',';'], function(i,c) {
                var k;
                k = rows[0].split(c).length;
                if (k > mc) {
                    opt.sepChar = c;
                    mc = k;
                }
            });
        }

        if (opt.header) res.header = rows[0].split(opt.sepChar);

        rows = rows.slice(1);
        $.each(rows, function(i, r) {
            res.rows.push(r.split(opt.sepChar));
        });
        // clear whitespaces
        if (opt.trim) {
            $.each(res.header, function(i) {
                res.header[i] = res.header[i].trim();
            });
            $.each(res.rows, function(i) {
                $.each(res.rows[i], function(j) {
                    res.rows[i][j] = res.rows[i][j].trim();
                });
            });
        }
        // convert to numbers
        if (opt.numberize) {
            $.each(res.header, function(i) {
                var n = Number(res.header[i]);
                if (!isNaN(n) && n == res.header[i])
                    res.header[i] = n;
            });
            $.each(res.rows, function(i) {
                $.each(res.rows[i], function(j) {
                            var n = Number(res.rows[i][j]);
                            if (res.rows[i][j] == "") return;
                    if (!isNaN(n) && n == res.rows[i][j])
                        res.rows[i][j] = n;
                });
            });
        }
        // store rows as dictionaries
        if (opt.map) {
            $.each(res.rows, function(i) {
                var altrow = {};
                $.each(res.rows[i], function(j) {
                    altrow[res.header[j]] = res.rows[i][j];
                });
                res.rows[i] = altrow;
            });
        }
        return res;
    }
});

