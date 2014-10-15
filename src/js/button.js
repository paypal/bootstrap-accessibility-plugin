  // Button Extension
  // ===============================

    var buttons = $('.btn-group[data-toggle=buttons] .btn, [data-toggle=button]')
    buttons.each(function() {
      var $this = $(this)
      var pressed = $this.hasClass('active') ? 'true' : 'false'
      $this.attr('aria-pressed', pressed)
    })

    buttons.click(function() {
      var $this = $(this)
      var $input = $this.find('input')

      if ($input.prop('type') == 'radio') {
        var $parent = $this.closest('.btn-group')
        $parent.find('.btn').each(function() {
          $(this).attr('aria-pressed', 'false')
        })
        $this.attr('aria-pressed', 'true')
      } else {
        var pressed = $this.attr('aria-pressed') == 'false' ? 'true' : 'false'
        $this.attr('aria-pressed', pressed)
      }
    })

    var groupButtons = $('.btn-group[data-toggle=buttons] .btn')
    groupButtons.attr({'role': 'button', 'tabindex': '0'})
    groupButtons.keydown(function(e) {
      var k = e.which || e.keyCode
      if (k == 13 || k == 32) {
        $(this).click()
      }
    })
