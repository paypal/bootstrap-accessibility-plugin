  // Carousel Extension
  // ===============================
  
      $('.carousel').each(function (index) {
        var $this = $(this)
          , prev        = $this.find('[data-slide="prev"]')
          , next        = $this.find('[data-slide="next"]')
          , $tablist     = $this.find('.carousel-indicators')
          , $tabs        = $this.find('.carousel-indicators li')
          , $tabpanels  = $this.find('.item')
          , i

        $tablist.attr('role', 'tablist')
        $tabs.attr('role', 'tab')
        
        $tabs.focus(function() {
          $this.carousel('pause')
        });

        $tabpanels.attr('role', 'tabpanel')
        var tpa = $tabpanels.toArray();
        for (i = 0; i < tpa.length; i++) {
          $(tpa[i]).attr('id', 'tabpanel-' + index + '-' + i)
        }

        console.log("role: " + $this.attr('role') + " aria-label: " + $this.attr('aria-label'))

        
        if (typeof $this.attr('role') !== 'string') $this.attr('role', 'complementary');
        if (typeof $this.attr('aria-labelledby') !== 'string') {
          if (typeof $this.attr('title') !== 'string') {
            if (typeof $this.attr('aria-label') !== 'string') $this.attr('aria-label', 'Carousel content with ' + tpa.length + ' slides');
          }
        }  
                
        var ta = $tabs.toArray();
        for (i = 0; i < ta.length; i++) {
          var j = i + 1;
          $(ta[i]).attr('aria-controls', 'tabpanel-' + index + '-' + i)
          
          var caption = $this.find('#tabpanel-' + index + '-' + i).find('h3').text()
          
          var tabName = document.createElement('span')
          tabName.setAttribute('class', 'sr-only')
          tabName.innerHTML='Slide ' + j + " of " + ta.length
          if (caption) tabName.innerHTML += ": " +  caption
          
          $(ta[i]).append(tabName)
        }
          


        var spanPrev = document.createElement('span')
        spanPrev.setAttribute('class', 'sr-only')
        spanPrev.innerHTML='Slide'

        var spanNext = document.createElement('span')
        spanNext.setAttribute('class', 'sr-only')
        spanNext.innerHTML='Slide'

        prev.attr('role', 'button')
        next.attr('role', 'button')

        prev.append(spanPrev)
        next.append(spanNext)

        $tabs.each(function () {
          var item = $(this)
          if(item.hasClass('active')){
            item.attr({ 'aria-selected': 'true', 'tabindex' : '0' })
          }else{
            item.attr({ 'aria-selected': 'false', 'tabindex' : '-1' })
          }
        })
      })

      var slideCarousel = $.fn.carousel.Constructor.prototype.slide
      $.fn.carousel.Constructor.prototype.slide = function (type, next) {
        var $element = this.$element
          , $active = $element.find('[role=tabpanel].active')
          , $next = next || $active[type]()
          , $tab

//        console.log("type: " + type + " active: " + $active.attr('id') + " next: " + $next.attr('id'))

        $tab = this.$element.find('li[aria-controls=' + $active.attr('id') + ']')
        if ($tab) {
          $tab.attr({'aria-selected':false, 'tabIndex': '-1'})
//          console.log("active: " + $active.attr('id') + " tab: " + $tab.attr('aria-controls'))
        }  

        $tab = this.$element.find('li[aria-controls="' + $next.attr('id') + '"]')
        if ($tab) {
          $tab.attr({'aria-selected':true, 'tabIndex': '0'})
//          console.log("next: " + $next.attr('id') + " tab: " + $tab.attr('aria-controls'))
        }  
        
        slideCarousel.apply(this, arguments)

      $active
        .one('bsTransitionEnd', function () {
          console.log("active: " + $active.attr('id') + " next: " + $next.attr('id'))
          var $tab
          
          $tab = $element.find('li[aria-controls="' + $active.attr('id') + '"]')
          if ($tab) $tab.attr({'aria-selected':false, 'tabIndex': '-1'})

          $tab = $element.find('li[aria-controls="' + $next.attr('id') + '"]')
          if ($tab) $tab.attr({'aria-selected': true, 'tabIndex': '0'})
          
            //.focus()
       })
      }

     var $this;
     $.fn.carousel.Constructor.prototype.keydown = function (e) {
     console.log("keydown: " + e.keyCode + " target: " + e.target)
     $this = $this || $(this)
     if(this instanceof Node) $this = $(this)
     var $ul = $this.closest('[role=tablist]')
      , $items = $ul.find('[role=tab]')
      , $parent = $ul.parent()
      , k = e.which || e.keyCode
      , index
      , i

      if (!/(37|38|39|40)/.test(k)) return
      index = $items.index($items.filter('.active'))
      if (k == 37 || k == 38) {                           //  Up
        
        index--
        if(index < 0) index = $items.length -1
        else  {
          $parent.carousel('prev')
          setTimeout(function () {
            $items[index].focus()
            // $this.prev().focus()
          }, 150)      
        }  

      }
      if (k == 39 || k == 40) {                          // Down
        index++
        if(index == $items.length) {
          index = 0
        }  
        else  {
          $parent.carousel('next')
          setTimeout(function () {
            $items[index].focus()
            // $this.next().focus()
          }, 150)            
        }

      }

      e.preventDefault()
      e.stopPropagation()
    }
    $(document).on('keydown.carousel.data-api', 'li[role=tab]', $.fn.carousel.Constructor.prototype.keydown)
