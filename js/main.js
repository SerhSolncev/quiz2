document.addEventListener('DOMContentLoaded', (event) => {

  document.querySelectorAll('.js-quizzes-swiper').forEach((el) => {
    const swiper = new Swiper(el, {
      spaceBetween: 12,
      freeMode: true,
      scrollbar: {
        el: el.querySelector('.swiper-scrollbar'),
        draggable: true
      },
      breakpoints: {
        0: {
          slidesPerView: 1.2,
          spaceBetween: 16,
        },
        560: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 16,
        }
      }
    });
  });

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function get_next_questions(page_no = 1) {
    jQuery.ajax({
      type: 'POST',
      url: wpjs.admin_ajax,
      data: {
        action: 'get_next_questions',
        page_no: page_no
      },
      success: function (responce) {
        responce = jQuery.parseJSON(responce);
        if (responce.status == 'completed') {
          window.location.href = responce.redirect;
        } else {
          $('#quiz-main').html(responce.output);
        }
        $('.quiz-progress').val(responce.progress).trigger('input');
        $('#step-count').text(page_no);
        $('#progress-fill').attr("style", "width: " + (page_no * 10) + "% !important;");

      },
      complete: function () {
        var mh = jQuery('.progress-container-quiz').offset().top - 80;
        jQuery("html, body").animate({ scrollTop: mh }, 500);
        updateNextBtnS();
      }
    });
  }

  function get_next_questions(page_no = 1) {
    jQuery.ajax({
      type: 'POST',
      url: wpjs.admin_ajax,
      data: {
        action: 'get_next_questions',
        page_no: page_no
      },
      success: function (responce) {
        responce = jQuery.parseJSON(responce);
        if (responce.status == 'completed') {
          window.location.href = responce.redirect;
        } else {
          $('#quiz-main').html(responce.output);
        }
        $('.quiz-progress').val(responce.progress).trigger('input');
        $('#step-count').text(page_no);
        $('#progress-fill').attr("style", "width: " + (page_no * 10) + "% !important;");

      },
      complete: function () {
        var mh = jQuery('.progress-container-quiz').offset().top - 80;
        jQuery("html, body").animate({ scrollTop: mh }, 500);
        updateNextBtnS();
      }
    });
  }

  //Previous
  jQuery(document).on('click', '.js-quiz-picture', function () {
    var page_no = jQuery(this).attr('data-page_no');
    get_next_questions(page_no);
  });

  function updateNextBtnS() {
    let totalQuestions = jQuery('#quiz-main .quiz-main-inner').length;
    let totalAnsweredQuestions = jQuery('#quiz-main input[type="radio"]:checked').length;
    let multipleChoices = jQuery('.answers-multiple').find('.button-radio.selected').length > 0;
    let motivationStep = jQuery('#quiz-main .motivation-text').length > 0;
    if (totalQuestions == totalAnsweredQuestions || multipleChoices || motivationStep) {
      jQuery('.skip-btn a').removeAttr('disabled');
    }
    //change url
    //let url = new URL(window.location.href);
    //url.searchParams.set('question', jQuery('#step-count').text());
    //window.history.pushState({}, '', url);
  }

  // quizz

  $(document).on('click', '.js-button-radio', function() {
    let $this = $(this);
    let $group = $this.closest('.js-radio-group');

    if ($group.attr('data-type') === 'single') {
      $group.find('.js-button-radio').removeClass('selected');
      $this.addClass('selected');
    } else {
      $this.toggleClass('selected');
    }

    if ($('.js-button-radio.selected').length > 0) {
      $('.js-next-quizz').removeClass('disabled');
    } else {
      $('.js-next-quizz').addClass('disabled');
    }
  });

  // new js

  document.body.classList.add('loading');

  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 500)

  // isTouchDevice
  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  }

  if(!isTouchDevice()) {
    document.body.classList.add('desktop-device')
  } else {
    document.body.classList.add('touch-device')
  }

  function setBodyPadding() {
    let $footer = $('.quiz-footer');
    if ($footer.length) {
      let h = $footer.outerHeight();
      $('body').css('padding-bottom', h + 'px');
    }
  }

  $(document).ready(function() {
    setBodyPadding();

    $(window).on('resize', function() {
      setBodyPadding();
    });
  });


  // lazy-load
  if (document.querySelector('img.lazy, source[data-srcset], [data-background-image]')) {

    const observerLazy = lozad('img.lazy, source[data-srcset], [data-background-image]', {
      loaded: el => {
        if (el.dataset.src) {
          el.src = el.dataset.src
        }
        if (el.dataset.srcset) {
          el.srcset = el.dataset.srcset
        }
        if (el.dataset.backgroundImage) {
          el.style.backgroundImage = `url('${el.dataset.backgroundImage}')`
        }
        el.classList.add('is-loaded')
      }
    })

    observerLazy.observe()

    const mutationObserverLazy = new MutationObserver(() => {
      observerLazy.observe()
    })

    mutationObserverLazy.observe(document.body, {
      childList: true,
      subtree: true
    })
  }


  // header
  const header = document.querySelector('.js-header');

  if(header) {
    if (window.scrollY > 1) {
      header.classList.add('onscroll');
    } else {
      header.classList.remove('onscroll');
    }

    window.addEventListener('scroll', function () {
      if (window.scrollY > 1) {
        header.classList.add('onscroll');
      } else {
        header.classList.remove('onscroll');
      }
    });
  }

  const showElementYX = document.querySelectorAll('.js-light-show');

  if (showElementYX.length > 0) {
    gsap.registerPlugin(ScrollTrigger);

    showElementYX.forEach((element) => {
      const delay = parseFloat(element.dataset.delay) || 0.25;
      const duration = parseFloat(element.dataset.duration) || 0.5;
      const x = element.dataset.showX ? parseFloat(element.dataset.showX) || 0 : null;
      const y = element.dataset.showY ? parseFloat(element.dataset.showY) || 0 : null;
      const z = element.dataset.showZ ? parseFloat(element.dataset.showZ) || 0.9 : null;
      const rotate = element.dataset.rotate ? parseFloat(element.dataset.rotate) || 0 : null;
      const start = element.dataset.start || 'top 90%';
      const end = element.dataset.end || 'top 50%';

      const from = { opacity: 0 };
      if (x !== null) from.x = x;
      if (y !== null) from.y = y;
      if (z !== null) from.scale = z;
      if (rotate !== null) from.rotate = rotate;

      const to = { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, duration: duration, delay: delay };

      gsap.fromTo(
          element,
          from,
          {
            ...to,
            scrollTrigger: {
              trigger: element,
              start: start,
              end: end,
              toggleActions: "play none none none",
            },
          }
      );
    });
  }


  const tripleCardsFunc = (() => {
    const cards = Array.from(document.querySelectorAll(".js-l-card"));
    if (!cards.length) return;

    let current = 0;
    let intervalId;
    let hoverLock = false; // блокировка hover-событий

    function updateClasses() {
      cards.forEach((card) => {
        card.classList.remove("is-active", "is-mid", "is-prev");
      });

      const prev = (current + cards.length - 1) % cards.length;
      const mid = (current + cards.length - 2) % cards.length;

      cards[current].classList.add("is-active");
      cards[prev].classList.add("is-mid");
      cards[mid].classList.add("is-prev");
    }

    function startAuto() {
      stopAuto();
      intervalId = setInterval(() => {
        current = (current + 1) % cards.length;
        updateClasses();
      }, 3000);
    }

    function stopAuto() {
      if (intervalId) clearInterval(intervalId);
    }

    cards.forEach((card, i) => {
      card.addEventListener("mouseenter", () => {
        if (hoverLock) return;
        stopAuto();
        current = i;
        updateClasses();

        hoverLock = true;
        setTimeout(() => {
          hoverLock = false;
        }, 300);
      });

      card.addEventListener("mouseleave", () => {
        // startAuto();
      });

      // мобилки
      card.addEventListener("touchstart", () => {
        stopAuto();
        current = i;
        updateClasses();
      });

      card.addEventListener("touchend", () => {
        // startAuto();
      });
    });

    updateClasses();
    // startAuto();
  })();


  $('.js-energy-progress').each(function() {
    let $this = $(this);
    let color = $this.data('color');
    $this.css('border-color', color);
    $this.attr('style', ($this.attr('style') || '') + `--after-bg:${color};`);
    let position = $this.data('position');
    let width = $this.outerWidth();

    gsap.fromTo(
        $this,
        { left: 0 },
        {
          left: `calc(${position} - ${width}px)`,
          duration: 1.5,
          delay: 0.3,
          scrollTrigger: {
            trigger: $this,
            start: "top 90%",
            end: "top 50%",
            toggleActions: "play none none none"
          }
        }
    );
  });

  // quizz preloader

  function startLoading(selector) {
    const circle = document.querySelector(selector);

    if (circle) {
      let circles = circle.querySelectorAll('circle');
      let percentEl = circle.querySelector('.js-loading-percent');

      let total = circles.length;
      let duration = Number(circle.getAttribute('data-timer'));
      let fillColor = circle.getAttribute('data-color');
      let current = 0;

      let interval = duration / total;

      let timer = setInterval(() => {
        if (current >= total) {
          clearInterval(timer);
        } else {
          circles[current].setAttribute('fill', fillColor);
          if (percentEl) {
            percentEl.textContent = Math.round(((current + 1) / total) * 100) + '%';
          }
          current++;
        }
      }, interval);
    }
  }

  startLoading('.js-loading-block');

  // "загрузка" планов

  $('.js-load-item').each(function(){
    let $item = $(this);
    let timer = parseFloat($item.data('timer'));
    if (isNaN(timer)) timer = 1000;
    let ms = timer >= 1000 ? timer : timer * 1000;

    let $bar = $item.find('.js-load-progress');
    let $status = $item.find('.js-load-status');
    let $percent = $item.find('.js-load-percent');

    $bar.animate({ width: "100%" }, {
      duration: ms,
      easing: "linear",
      step: function(now){
        if($percent.length){
          $percent.text(Math.round(now) + '%');
        }
      },
      complete: function(){
        $status.text($status.data('text') || 'Done!');
        $item.addClass('done');
        if($percent.length){
          $percent.text('100%');
        }
      }
    });
  });


  // send form

  function sendFormScript() {
    document.addEventListener('click', function(e) {
      const sendButton = e.target.closest('.js-send-form');
      if (sendButton) {
        e.preventDefault();
        const form = sendButton.closest('.js-validate-form');
        validateAndSendForm(form, true);
      }
    });

    document.addEventListener('input', function(e) {
      if (e.target.matches('.js-validate-form input[required], .js-validate-form textarea[required]')) {
        validateField(e.target);

      }

      if(e.target.classList.contains('single-field')) {
        const form = e.target.closest('.js-validate-form');
        if (form) {
          validateAndSendForm(form, false);
        }
      }

    });

    document.addEventListener('change', function(e) {
      if (e.target.matches('.js-validate-form input[type="checkbox"][required], .js-validate-form input[type="radio"][required], .js-validate-form select[required]')) {
        validateField(e.target);
      }

      if (e.target.matches('.js-validate-form input[type="radio"]')) {
        e.target.parentElement.classList.remove('field-error');
      }
    });

    function isFieldVisible(field) {
      let el = field;
      while (el) {
        const style = getComputedStyle(el);

        if (
            style.display === 'none' ||
            style.visibility === 'hidden' ||
            style.maxHeight === '0px'
        ) {
          return false;
        }

        el = el.parentElement;
      }
      return true;
    }

    const errorFields = [];

    function validateField(field) {
      const parent = field.closest('.js-input-wrap');

      if (!isFieldVisible(field)) return true;

      let isValid = true;

      if (field.type === 'checkbox') {
        if (!field.checked) {
          isValid = false;
          field.parentElement.classList.add('field-error');
        }
      }
      else if (field.type === 'radio') {
        const radioGroup = document.querySelectorAll(`input[type="radio"][name="${field.name}"]`);
        const isRadioChecked = Array.from(radioGroup).some(radio => radio.checked);

        if (!isRadioChecked) {
          radioGroup.forEach(radio => {
            radio.parentElement.classList.add('field-error');
            showFieldError(radio);
          });


          errorFields.push(radioGroup[0]);
          return false;
        } else {
          radioGroup.forEach(radio => {
            radio.parentElement.classList.remove('field-error');
            removeFieldError(radio);
          });
        }

        return true;
      }
      else if (field.tagName === 'SELECT') {
        console.log(11111111111);
        const choicesWrapper = field.closest('.choices');
        const choicesParent = choicesWrapper?.parentElement;

        if (choicesWrapper?.classList.contains('select-no-value')) {
          isValid = false;
          choicesParent?.classList.add('field-error');
        } else {
          choicesParent?.classList.remove('field-error');
        }
      }
      else if (!field.value.trim()) {
        isValid = false;
      }

      if (isValid && field.type === 'email' && !isValidEmail(field.value)) {
        isValid = false;
      }

      if (!isValid) {
        parent.classList.add('field-error');
        showFieldError(field);
        errorFields.push(field); // Добавляем ошибочное поле
      } else {
        parent.classList.remove('field-error');
        removeFieldError(field);
      }

      return isValid;
    }

    function showFieldError(field) {
      const msg = field.getAttribute('data-error-msg');
      if (!msg) return;

      const errorContainer = field.closest('.js-error-append');
      if (!errorContainer) return;

      // Удаляем предыдущую ошибку, если есть
      removeFieldError(field);

      const errorMsg = document.createElement('div');
      errorMsg.className = 'field-msg';
      errorMsg.textContent = msg;

      errorContainer.appendChild(errorMsg);
    }

    function removeFieldError(field) {
      const errorContainer = field.closest('.js-error-append');
      if (!errorContainer) return;

      const oldMsg = errorContainer.querySelector('.field-msg');
      if (oldMsg) {
        oldMsg.remove();
      }
    }

    function validateAndSendForm(form, send) {
      errorFields.length = 0;
      let isValid = true;

      const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');

      requiredFields.forEach(field => {
        // Пропускаем скрытые поля
        if (!isFieldVisible(field)) return;

        if (!validateField(field)) {
          isValid = false;
          form.querySelector('.js-send-form').classList.add('disabled')
        }
      });

      if (!isValid && errorFields.length > 0) {
        const firstError = errorFields[0];
        const offset = firstError.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }else {
        form.querySelector('.js-send-form').classList.remove('disabled')
      }

      if (isValid && send) {
        sendForm(form);
      }
    }

    function sendForm(form) {
      const url = form.getAttribute('data-url');
      const formData = new FormData(form);

      // Удаляем скрытые поля из formData
      for (let [name, value] of formData.entries()) {
        const fields = form.querySelectorAll(`[name="${CSS.escape(name)}"]`);
        let shouldDelete = true;

        fields.forEach(field => {
          if (isFieldVisible(field)) {
            shouldDelete = false;
          }
        });

        if (shouldDelete) {
          formData.delete(name);
        }
      }

      form.querySelector('.js-send-form').classList.add('disabled');

      fetch(url, {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          form.classList.add('sended');
        }
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
    }

    function isValidEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  }

  sendFormScript();

  // choises fot select

  const selectElements = document.querySelectorAll('.js-custom-select');

  selectElements.forEach(select => {
    const minLength = parseInt(select.getAttribute('data-min-length-search'), 10) || 10;
    const optionsCount = select.options.length;
    const searchEnabled = optionsCount >= minLength;
    const title = select.getAttribute('data-title');

    const originalChoicesData = Array.from(select.options).map(option => ({
      value: option.value,
      label: option.text,
      selected: option.selected,
      disabled: option.disabled,
      customProperties: {
        icon: option.dataset.icon || ''
      }
    }));

    // Формируем массив опций для передачи в choices
    const choicesData = Array.from(select.options).map(option => ({
      value: option.value,
      label: option.text,
      selected: option.selected,
      disabled: option.disabled,
      customProperties: {
        icon: option.dataset.icon || ''
      }
    }));

    const choices = new Choices(select, {
      searchEnabled: searchEnabled,
      searchChoices: searchEnabled,
      searchResultLimit: 10,
      searchFields: ['label', 'value'],
      removeItemButton: false,
      itemSelectText: '',
      shouldSort: false,
      choices: choicesData,
      callbackOnCreateTemplates: function (template) {
        return {
          item: (classNames, data) => {
            const icon = data.customProperties?.icon;
            let titleHTML = title ? `<span class="choices__sub">${title}</span>` : '';
            let iconHTML = icon ? `<img src="${icon}" class="custom-icon" alt="icon">` : '';

            return template(`
						<div class="choices__choosed" data-item data-id="${data.id}" data-value="${data.value}">
							${iconHTML}
							${titleHTML}
							<span class="choices__choosed-item">${data.label}</span>
						</div>
					`);
          }
        };
      }
    });

    select.choicesInstance = choices;

    const selectedOption = select.options[select.selectedIndex];
    if (!selectedOption.value) {
      select.closest('.choices').classList.add('select-no-value');
    }

    select.addEventListener('change', () => {
      select.closest('.choices').classList.remove('select-no-value');

      if (select.hasAttribute('data-out-city')) {
        const selectedOption = select.options[select.selectedIndex];
        const cityOutput = document.querySelector('.js-card-city');
        if (cityOutput) {
          cityOutput.textContent = selectedOption.text;
        }
      }
    });

    select.addEventListener('showDropdown', () => {
      applyZIndex(document);
    });
  });

  function applyZIndex(container) {
    const selects = container.querySelectorAll('.js-select-wrap');
    const baseZ = 10;

    selects.forEach((el, index) => {
      el.style.position = 'relative';
      el.style.zIndex = el.querySelector('.choices.is-flipped') ? baseZ + index : baseZ - index;
    });
  }

  document.querySelectorAll('.js-select-wrap').forEach(el => {
    const parent = el.parentElement;
    applyZIndex(parent);
  });

  const observerSelectParent = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          if (node.matches('.js-select-wrap')) {
            applyZIndex(node.parentElement);
          } else {
            const selects = node.querySelectorAll?.('.js-select-wrap');
            selects?.forEach(sel => applyZIndex(sel.parentElement));
          }
        }
      });
    });
  });

  observerSelectParent.observe(document.body, {
    childList: true,
    subtree: true
  });


  // timer

  const timers = document.querySelectorAll('.js-timer');

  timers.forEach(timer => {
    const dateTimeStr = timer.dataset.expiredDate;
    const [datePart, timePart] = dateTimeStr.split(' ');
    const [day, month, year] = datePart.split('.').map(Number);
    let hours = 0, mins = 0, secs = 0;

    if (timePart) {
      [hours, mins, secs] = timePart.split(':').map(Number);
    }

    const deadline = new Date(year, month - 1, day, hours, mins, secs);

    const daysEl = timer.querySelector('.js-timer-days');
    const hoursEl = timer.querySelector('.js-timer-hours');
    const minsEl = timer.querySelector('.js-timer-min');
    const secsEl = timer.querySelector('.js-timer-sec');
    let interval;

    function updateTimer() {
      const now = new Date();
      const diff = deadline - now;

      if (diff <= 0) {
        daysEl && (daysEl.textContent = '');
        hoursEl.textContent = '00';
        minsEl.textContent = '00';
        secsEl.textContent = '00';
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hoursVal = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minsVal = Math.floor((diff / (1000 * 60)) % 60);
      const secsVal = Math.floor((diff / 1000) % 60);

      daysEl && (daysEl.textContent = days > 0 ? String(days).padStart(2, '0') + ':' : '');
      hoursEl.textContent = String(hoursVal).padStart(2, '0');
      minsEl.textContent = String(minsVal).padStart(2, '0');
      secsEl.textContent = String(secsVal).padStart(2, '0');
    }

    updateTimer();
    interval = setInterval(updateTimer, 1000);
  });


  // acc
  const accs = document.querySelectorAll('.js-acc-wrap');

  function handleAccordion(parent) {
    const buttons = parent.querySelectorAll('.js-open-acc');
    const parentItems = parent.querySelectorAll('.js-acc');

    parentItems.forEach((parentItem) => {
      const accBlock = parentItem.querySelector('.js-acc-block');
      accBlock.style.transition = 'none';
      if (parentItem.classList.contains('active')) {
        accBlock.style.maxHeight = accBlock.scrollHeight + "px";
      }
      setTimeout(() => {
        accBlock.style.transition = 'max-height 0.2s linear, margin 0.2s linear';
      }, 10);

      let previousHeight = accBlock.scrollHeight;
      setInterval(() => {
        if (parentItem.classList.contains('active')) {
          const currentHeight = accBlock.scrollHeight;
          if (currentHeight !== previousHeight) {
            accBlock.style.maxHeight = currentHeight + "px";
            previousHeight = currentHeight;
          }
        }
      }, 100);
    });

    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {

        const contents = button.closest('.js-acc-wrap').querySelectorAll('.js-acc-block');
        const contentsItem = button.closest('.js-acc').querySelector('.js-acc-block');
        const parentWrap = button.closest('.js-acc-wrap');
        const isMultiple = parentWrap.hasAttribute('data-multiple');

        if (button.closest('.js-acc').classList.contains('active')) {
          contentsItem.style.maxHeight = '0';
          button.closest('.js-acc').classList.remove('active');
        } else {
          if (!isMultiple) {
            contents.forEach((block) => {
              block.style.maxHeight = '0';
            });

            button.closest('.js-acc-wrap').querySelectorAll('.js-acc').forEach((parentItem) => {
              parentItem.classList.remove('active');
            });
          }

          contentsItem.style.maxHeight = contentsItem.scrollHeight + "px";
          button.closest('.js-acc').classList.add('active');
        }

        parentWrap.style.maxHeight = 'initial';
      });

      const nestedAccordions = button.closest('.js-acc').querySelectorAll('.js-acc-wrap');
      nestedAccordions.forEach((nestedAccordion) => {
        handleAccordion(nestedAccordion);
      });
    });
  }

  if (accs.length > 0) {
    accs.forEach((parent) => {
      handleAccordion(parent);
    });
  }

  const observerAcc = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;

        if (node.classList.contains('js-acc-wrap')) {
          handleAccordion(node);
        }

        node.querySelectorAll('.js-acc-wrap').forEach((nestedNode) => {
          handleAccordion(nestedNode);
        });
      });
    });
  });

  observerAcc.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // tabs
  class Tabs {
    constructor(container) {
      this.container = container;
      this.tabs = container.querySelectorAll("[data-tab]");
      this.contents = container.querySelectorAll("[data-content]");
      this.init();
    }

    init() {
      this.tabs.forEach(tab => {
        tab.addEventListener("click", () => this.activateTab(tab));
      });
    }

    activateTab(tab) {
      const tabName = tab.dataset.tab;

      this.tabs.forEach(t => t.classList.remove("is-active"));
      this.contents.forEach(c => c.classList.remove("is-active"));

      tab.classList.add("is-active");
      this.contents.forEach(c => {
        if (c.dataset.content === tabName) {
          c.classList.add("is-active");
        }
      });
    }
  }

  document.querySelectorAll("[data-tabs]").forEach(container => new Tabs(container));

  // проявление с буквами

  const animatedBlocks = document.querySelectorAll(".js-animated-text");

  animatedBlocks.forEach(block => {
    const text = block.textContent.trim();
    const startColor = block.dataset.startColor || "#aaa";
    const endColor = block.dataset.endColor || "#000";

    // очищаем текст
    block.textContent = "";

    // разбиваем на слова
    const words = text.split(" ");
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.classList.add("js-animated-word");
      block.appendChild(wordSpan);

      // разбиваем слово на символы
      [...word].forEach(char => {
        const charSpan = document.createElement("span");
        charSpan.classList.add("js-animate-symbol");
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
      });

      // пробел между словами
      if (wordIndex < words.length - 1) {
        block.appendChild(document.createTextNode(" "));
      }
    });

    const wordsEls = block.querySelectorAll(".js-animated-word");

    // Устанавливаем стартовые стили для символов
    gsap.set(wordsEls, { display: "inline-block" });
    gsap.set(block.querySelectorAll(".js-animate-symbol"), {
      // opacity: 0,
      // y: 0,
      color: startColor
    });

    // Таймлайн с последовательной анимацией слов
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: "top 80%",
        once: true
      }
    });

    wordsEls.forEach((word) => {
      const symbols = word.querySelectorAll(".js-animate-symbol");
      // сначала анимируем все буквы текущего слова
      tl.to(symbols, {
        // opacity: 1,
        // y: 0,
        color: endColor,
        stagger: 0.02,   // буква за буквой внутри слова
        duration: 0.05,
        // ease: "linear"
      }, ">"); // запуск сразу после завершения предыдущего слова
    });
  });
})
