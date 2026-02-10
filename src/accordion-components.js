const accordions = document.querySelectorAll('.accordion-components');

accordions.forEach((accordion) => {
  const head = accordion.querySelector('.accordion-head');
  const body = accordion.querySelector('.accordion-body');

  // 초기 상태
  body.style.transformOrigin = 'top';
  body.style.transition = 'transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)';
  body.style.overflow = 'hidden';
  const isExpanded = head.getAttribute('aria-expanded') === 'true';
  body.style.transform = isExpanded ? 'scaleY(1)' : 'scaleY(0)';
  body.hidden = !isExpanded;

  const openAccordion = (targetHead, targetBody) => {
    targetHead.setAttribute('aria-expanded', 'true');
    targetHead.classList.add('open');
    targetBody.hidden = false;
    requestAnimationFrame(() => {
      targetBody.style.transform = 'scaleY(1)';
    });
  };

  const closeAccordion = (targetHead, targetBody) => {
    targetHead.setAttribute('aria-expanded', 'false');
    targetHead.classList.remove('open');
    targetBody.style.transform = 'scaleY(0)';
    targetBody.addEventListener('transitionend', function handler() {
      targetBody.hidden = true; // 스크린리더 접근 차단
      targetBody.removeEventListener('transitionend', handler);
    });
  };

  head.addEventListener('click', () => {
    const currentlyOpen = head.getAttribute('aria-expanded') === 'true';

    // 다른 아코디언 닫기
    accordions.forEach((other) => {
      if (other !== accordion) {
        const otherHead = other.querySelector('.accordion-head');
        const otherBody = other.querySelector('.accordion-body');
        if (otherHead.getAttribute('aria-expanded') === 'true') {
          closeAccordion(otherHead, otherBody);
        }
      }
    });

    // 현재 아코디언 토글
    if (currentlyOpen) {
      closeAccordion(head, body);
    } else {
      openAccordion(head, body);
    }
  });
});
