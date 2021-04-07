function dashboardManager(wArray, hArray) {
    var self = this;

    self.widthArray = wArray;
    self.heightArray = hArray;

    self.xWidth = $(document).width() * 0.0833;
    self.yHeight = 100;
    self.grid = null;

    self.masonryOptions = {
        itemSelector: '.grid-item',
        columnWidth: ".grid-sizer",
        percentPosition: true
    };

    self.init = function (delay) {
        //alert('init');
        console.log('init', new Date());
        setTimeout(function () { console.log('init.delayed', new Date()); $('.grid').packery(self.masonryOptions); }, delay || 10);
    };

    self.sortable = function() {
        $('.grid').sortable({
            start: function (event, ui) {
                //console.log(ui);
                ui.item.removeClass('grid-item');
                self.grid.packery('reloadItems');
                self.grid.packery('destroy'); // destroy
                self.grid.packery(self.masonryOptions);
            },
            change: function (event, ui) {
                self.grid.packery('reloadItems');
                self.grid.packery('destroy'); // destroy
                self.grid.packery(self.masonryOptions);
            },
            stop: function (event, ui) {
                ui.item.addClass('grid-item');
                self.grid.packery('reloadItems');
                self.grid.packery('destroy'); // destroy
                var scroll = $(document).scrollTop();
                self.grid.packery(self.masonryOptions);
                $(document).scrollTop(scroll);
            }
        });
    }

    self.resizable = function() {
        $('.grid-item .grid-item-card').resizable({
            animateDuration: "fast",
            start: function () {
                $(this).css('z-index', '2222');
            },
            stop: function (event, ui) {
                self.grid.packery('destroy'); // destroy
                var el = $(this).parent();

                var classes = el.attr('class').split(' ');

                var clsWidthPatt = "grid-item--width";
                var clsHeightPatt = "grid-item--height";

                var widthClassRegex = new RegExp(clsWidthPatt);
                var heightClassRegex = new RegExp(clsHeightPatt);

                if (classes.length) {
                    var widthClass = classes.filter(function (cls) {
                        return widthClassRegex.test(cls);
                    });

                    var heightClass = classes.filter(function (cls) {
                        return heightClassRegex.test(cls);
                    });

                    // check for width
                    if (widthClass.length) {
                        //var widthNumber = parseInt(widthClass[0].substr(clsWidthPatt.length, 3));
                        var widthNumber = (ui.size.width / self.xWidth).toFixed(0);
                        el.removeClass(widthClass[0]);
                        el.addClass(clsWidthPatt + '' + widthNumber);

                    } else {
                        el.addClass(clsWidthPatt + '1');
                    }

                    // check for height
                    if (heightClass.length) {
                        var heightNumber = (ui.size.height / self.yHeight).toFixed(0) - 1;
                        el.removeClass(heightClass[0]);
                        el.addClass(clsHeightPatt + '' + heightNumber);
                    } else {
                        el.addClass(clsHeightPatt + '1');
                    }
                }

                $(this).css('z-index', '');
                $(this).css('width', '');
                $(this).css('height', '');

                var scroll = $(document).scrollTop();
                self.grid.packery(self.masonryOptions);
                $(document).scrollTop(scroll);
            }
        });
    }

    self.initAll = function () {
        var options = {
            itemSelector: '.grid-item',
            columnWidth: ".grid-sizer",
            percentPosition: true
        };

        var $grid = $('.grid').packery(options);

        $('.grid-item .grid-item-card').resizable({
            animateDuration: "fast",
            start: function (event, ui) {
                $(this).css('z-index', '2222');

            },
            stop: function (event, ui) {
                console.log("resize.stop");
                $grid.packery('destroy'); // destroy
                var el = $(this).parent();

                var classes = el.attr('class').split(' ');

                var clsWidthPatt = "grid-item--width";
                var clsHeightPatt = "grid-item--height";

                var size = {
                    width: self.widthArray[0],
                    height: self.heightArray[0]
                };

                var widthClassRegex = new RegExp(clsWidthPatt);
                var heightClassRegex = new RegExp(clsHeightPatt);

                if (classes.length) {
                    var widthClass = classes.filter(function (cls) {
                        return widthClassRegex.test(cls);
                    });

                    var heightClass = classes.filter(function (cls) {
                        return heightClassRegex.test(cls);
                    });

                    // check for width
                    if (widthClass.length) {
                        var percent = ui.size.width / $(document).width() * 100;
                        size.width = self.widthArray.reduce(function (prev, curr) { return (Math.abs(curr - percent) < Math.abs(prev - percent) ? curr : prev); });
                        el.removeClass(widthClass[0]);
                        el.addClass(clsWidthPatt + '_' + size.width);

                    } else {
                        el.addClass(clsWidthPatt + '_' + self.widthArray[0]);
                    }

                    // check for height
                    if (heightClass.length) {
                        size.height = self.heightArray.reduce(function (prev, curr) { return (Math.abs(curr - ui.size.height) < Math.abs(prev - ui.size.height) ? curr : prev); });
                        el.removeClass(heightClass[0]);
                        el.addClass(clsHeightPatt + '_' + size.height);
                    } else {
                        el.addClass(clsHeightPatt + '_' + self.heightArray[0]);
                    }
                }

                $(this).css('z-index', '');
                $(this).css('width', '');
                $(this).css('height', '');

                var scroll = $(document).scrollTop();
                $grid.packery(options);
                $(document).scrollTop(scroll);

                //console.log('resize:emit', el.attr('emmit-target'), size);
                window.emitter.emit(`${el.attr('emmit-target')}.change.size`, size);
            }
        });

        $('.grid').sortable({
            start: function (event, ui) {
                console.log(ui);
                ui.item.removeClass('grid-item');
                $grid.packery('reloadItems');
                $grid.packery('destroy'); // destroy
                $grid.packery(options);
            },
            change: function (event, ui) {
                $grid.packery('reloadItems');
                $grid.packery('destroy'); // destroy
                $grid.packery(options);
            },
            stop: function (event, ui) {
                ui.item.addClass('grid-item');
                $grid.packery('reloadItems');
                $grid.packery('destroy'); // destroy
                var scroll = $(document).scrollTop();
                $grid.packery(options);
                $(document).scrollTop(scroll);

                window.emitter.emit(`board[${window.boardSettings.id}].cards.reorder`);
            }
        });
    }

    self.removeResizable = function() {
        $('.grid-item .grid-item-card').resizable('destroy');
    }

    self.removeSortable = function () {
        $(".grid").sortable("destroy"); 
    }
}
