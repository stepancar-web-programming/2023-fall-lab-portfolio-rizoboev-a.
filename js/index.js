let triggeredCounters = false;

(function($) {
    $.fn.countTo = function(options) {
        options = $.extend({}, $.fn.countTo.defaults, options || {});
        
        const loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;
        
        return $(this).each(function() {
            let _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);
            
            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));
                
                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }
                
                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;
                    
                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };
        
    $.fn.countTo.defaults = {
        from: 0,
        to: 100,
        speed: 1000,
        refreshInterval: 100,
        decimals: 0,
        onUpdate: null,
        onComplete: null
    };
})(jQuery);


(function() {
    $.fn.isInViewport = function() {
        const distance = this[0].getBoundingClientRect();

        return (
            distance.top >= 0 &&
            distance.left >= 0 &&
            distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            distance.right <= (window.innerWidth || document.documentElement.clientWidth)
        );  
    }
})(jQuery);

window.addEventListener('scroll', (event) => {
    if (!triggeredCounters) {
        jQuery(function($) {
            document.querySelectorAll('.counter').forEach((element) => {
                if ($(element).isInViewport()) {
                    $('.years-counter').countTo({
                        from: 0,
                        to: 5,
                        speed: 2000,
                        refreshInterval: 20
                    });
                    $('.members-counter').countTo({
                        from: 0,
                        to: 7915,
                        speed: 3000,
                        refreshInterval: 20
                    });
                    $('.players-average-counter').countTo({
                        from: 0,
                        to: 3215,
                        speed: 3000,
                        refreshInterval: 20
                    });
                    
                    triggeredCounters = true;
                }
            });
        });
    }
});