(function() {

  /*
      plot.js - a simple scatterplot
      Copyright (C) 2011  Gregor Aisch
  
      This program is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.
  
      This program is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.
  
      You should have received a copy of the GNU General Public License
      along with this program.  If not, see <http://www.gnu.org/licenses/>.
  */

  var Dot, ScatterPlot, root, _ref;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if ((_ref = root.plotjs) == null) root.plotjs = {};

  ScatterPlot = (function() {

    function ScatterPlot(container, opts) {
      var me;
      me = this;
      me.container = $(container);
      me.container.addClass('scatterplot');
      me.width = me.container.width();
      me.height = me.container.height();
    }

    ScatterPlot.prototype.setData = function(table) {
      var col, dot, id, me, row, val, _base, _base2, _ref2, _ref3, _results;
      me = this;
      me.table = table;
      me.dots = {};
      me.mins = {};
      me.maxs = {};
      _results = [];
      for (id in table) {
        row = table[id];
        for (col in row) {
          val = row[col];
          if ((_ref2 = (_base = me.mins)[col]) == null) {
            _base[col] = Number.MAX_VALUE;
          }
          if ((_ref3 = (_base2 = me.maxs)[col]) == null) {
            _base2[col] = Number.MAX_VALUE * -1;
          }
          me.mins[col] = Math.min(me.mins[col], val);
          me.maxs[col] = Math.max(me.maxs[col], val);
        }
        dot = new Dot(id, row, me.container);
        _results.push(me.dots[id] = dot);
      }
      return _results;
    };

    ScatterPlot.prototype.xAxis = function(col) {
      var me;
      me = this;
      me.xaxis = col;
      return me.layout();
    };

    ScatterPlot.prototype.yAxis = function(col) {
      var me;
      me = this;
      me.yaxis = col;
      return me.layout();
    };

    ScatterPlot.prototype.layout = function() {
      var dot, id, me, x, xaxis, xf, y, yaxis, yf, _ref2;
      me = this;
      xaxis = me.xaxis;
      yaxis = me.yaxis;
      if ((xaxis != null) && (yaxis != null)) {
        _ref2 = me.dots;
        for (id in _ref2) {
          dot = _ref2[id];
          xf = (dot.data[xaxis] - me.mins[xaxis]) / (me.maxs[xaxis] - me.mins[xaxis]);
          x = xf * me.width;
          yf = (dot.data[yaxis] - me.mins[yaxis]) / (me.maxs[yaxis] - me.mins[yaxis]);
          y = (1 - yf) * me.height;
          dot.moveTo(x, y);
        }
      }
    };

    ScatterPlot.prototype.setScale = function(scale, key) {
      var col, dot, id, me, _ref2, _results;
      me = this;
      _ref2 = me.dots;
      _results = [];
      for (id in _ref2) {
        dot = _ref2[id];
        col = scale.getColor(dot.data[key]);
        _results.push(dot.setColor(col));
      }
      return _results;
    };

    return ScatterPlot;

  })();

  root.plotjs.ScatterPlot = ScatterPlot;

  Dot = (function() {

    function Dot(id, data, container) {
      var div, me;
      me = this;
      me.data = data;
      me.radius = 3;
      div = $('<div class="dot r' + me.radius + ' ' + id + '"></div>');
      container.append(div);
      me.div = div;
    }

    Dot.prototype.moveTo = function(x, y) {
      var me;
      me = this;
      return me.div.css({
        left: (x - me.radius) + 'px',
        top: (y - me.radius) + 'px'
      });
    };

    Dot.prototype.setColor = function(col) {
      var me;
      me = this;
      return me.div.css({
        background: col
      });
    };

    return Dot;

  })();

  root.plotjs.Dot = Dot;

}).call(this);
