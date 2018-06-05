(function( $ ){
    $.fn.stepper = function() {  
        var steps = this.find('.step');
        var activeStep = 0;
        var totalStep = steps.length;
        var next_button = this.find(".step-next");
        var prev_button = this.find(".step-prev");
        var finish_button = this.find(".step-finish");
        var _this = this;
        prev_button.off('click').click(function(e){
            e.preventDefault();
            if(activeStep == 0) activeStep = totalStep-1;
            else activeStep--;
            _this.loadStep(activeStep);
        })
        next_button.off('click').click(function(e){
            e.preventDefault();
            activeStep++;
            activeStep = activeStep % totalStep;
            _this.loadStep(activeStep);
        })
        this.loadStep = function(step){
            if(step ===  0){
                prev_button.removeClass("d-flex").addClass("d-none");
                next_button.removeClass("d-none").addClass("d-flex");
                finish_button.removeClass("d-flex").addClass("d-none");
            }
            if(step > 0){
                prev_button.removeClass("d-none").addClass("d-flex");
                next_button.removeClass("d-none").addClass("d-flex");
                finish_button.removeClass("d-flex").addClass("d-none");
            }
            if(step === totalStep - 1){
                prev_button.removeClass("d-none").addClass("d-flex");
                next_button.removeClass("d-flex").addClass("d-none");
                finish_button.removeClass("d-none").addClass("d-flex");
            }
            steps.removeClass("active");
            _this.find('.step:eq('+step+')').addClass("active");           
        }
        this.loadStep(activeStep);
        return this;
    }; 
 })( jQuery );