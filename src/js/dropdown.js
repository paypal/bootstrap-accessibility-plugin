  // DROPDOWN Extension
  // ===============================

  var toggle   = '[data-toggle=dropdown]:not(.no-boot-a11y)'
      , $par
      , firstItem
      , focusDelay = 200
      , menus = $(toggle).parent().find('ul:not(.no-boot-a11y)').attr('role','menu')
      , lis = menus.find('li:not(.no-boot-a11y)').attr('role','presentation')

    lis.find('a:not(.no-boot-a11y)').attr({'role':'menuitem', 'tabIndex':'-1'})
    $(toggle).attr({ 'aria-haspopup':'true', 'aria-expanded': 'false'})

    $(toggle).parent().on('shown.bs.dropdown',function(e){
      $par = $(this)
      var $toggle = $par.find(toggle)
      $toggle.attr('aria-expanded','true')
      $toggle.on('keydown.bs.modal', $.proxy(function (ev) {
        setTimeout(function(){
              firstItem = $('.dropdown-menu:not(.no-boot-a11y) [role=menuitem]:visible', $par)[0]
              try{ firstItem.focus()} catch(ex) {}
        }, focusDelay)
      }, this))

    })

    $(toggle).parent().on('hidden.bs.dropdown',function(e){
      $par = $(this)
      var $toggle = $par.find(toggle)
      $toggle.attr('aria-expanded','false')
    })

    $(document)
      .on('focusout.dropdown.data-api', '.dropdown-menu', function(e){
        var $this = $(this)
          , that = this
        setTimeout(function() {
         if(!$.contains(that, document.activeElement)){
          $this.parent().removeClass('open')
          $this.parent().find('[data-toggle=dropdown]:not(.no-boot-a11y)').attr('aria-expanded','false')
         }
        }, 150)
       })
      .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , $.fn.dropdown.Constructor.prototype.keydown)
