document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.main-page')) {
    let items = 15;
    const blogMore = document.querySelector('.blog-more');
    const blogItemsLength = document.querySelectorAll('.blog-list__item').length;
    blogMore.addEventListener('click', (e) => {
      items += 12;
      const arr = Array.from(document.querySelector(`.blog-list`).children);
      const visItems = arr.slice(0, items);
      visItems.forEach(el => el.classList.add('is-visible'));

      if (visItems.length === blogItemsLength) {
        blogMore.style.display = 'none';
      }
    });
  }
});


document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.post')) {
    const post = document.querySelector('.post');
    const codeEl = post.querySelectorAll('pre code');
    const postPre = post.querySelectorAll('pre');

    function selectText(container) {
      if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(container);
        range.select();
      } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(container);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
      }
    }

    function copy(el) {
      let text = el.innerText;
      let textArea = document.createElement('textarea');
      textArea.width = '1px';
      textArea.height = '1px';
      textArea.background = 'transparent';
      textArea.value = text;
      document.body.append(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    // codeEl.forEach(el => {
    //   // el.setAttribute('tabindex', 0);

    //   // el.addEventListener('click', function(e){
    //   //   selectText(this);
    //   // });

    //   // el.addEventListener('focus', function(e){
    //   //   selectText(this);
    //   // });

		// 	el.parentNode.insertAdjacentHTML('afterbegin',`
		// 		<button class="btn-reset post__copy" aria-label="Скопировать код">
    //       <svg>
    //         <use xlink:href="/assets/img/sprite.svg#copy"></use>
    //       </svg>
    //     </button>
		// 	`);

    //   el.parentNode.querySelector('.post__copy').addEventListener('click', function(e){
    //     copy(el);
    //   });
    // });

    postPre.forEach(el => {
      new SimpleBar(el);
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const search_input = document.querySelector('.search__input');
  const results = document.querySelector('.search__list');
  const dropdown = document.querySelector('.search__dropdown');
  const form = document.querySelector('.search__form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('.search__close').focus();
  });

  const simpleBar = new SimpleBar(results);

	let search_term = '';
	let searchData;

	const fetchData = async () => {
		searchData = await fetch('/search-feed.json')
			.then(res => res.json());
	};


	const showData = async () => {
		results.querySelector('.simplebar-content').innerHTML = '';

		await fetchData();

		searchData.posts
			.filter(item =>
				item.title.toLowerCase().includes(search_term.toLowerCase())
			)
			.forEach(item => {

				if (item.title) {
          simpleBar.recalculate();
					dropdown.style.display = 'block';
					results.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', `
						<li class="search__item">
							<article class="search-post">
								<a href="${item.url}" class="search-post__link">
									<div class="search-post__image">
										<span class="search-post__category">${item.cat}</span>
										<img src="${item.url}${item.cover}" alt="${item.title}">
									</div>
									<div class="search-post__text">
										<h3 class="search-post__title">
											${item.title}
										</h3>
									</div>
								</a>
							</article>
						</li>

					`);
				} else {
					dropdown.style.display = 'none';
				}



			});
	};

	search_input.addEventListener('keyup', e => {
		search_term = e.target.value;
		if (search_term.length) {
			showData();
		} else {
			dropdown.style.display = 'none';
		}

	});
});

document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.querySelector('.search-btn');
  const search = document.querySelector('.search');
  const searchCloseBtn = document.querySelector('.search__close');
  const fixBlocks = document.querySelectorAll('.header');

  let keys = {
    ESC: 27,
  };

  search.inert = true;

  let previousActiveElement;

  const disableScroll = () => {
    let pagePosition = window.scrollY;
    document.body.classList.add('disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
  }

  const enableScroll = () => {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    document.body.style.top = 'auto';
    document.body.classList.remove('disable-scroll');
    window.scroll({
      top: pagePosition,
      left: 0
    });
    document.body.removeAttribute('data-position');
  }

  const lockPadding = () => {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    if (fixBlocks) {
      fixBlocks.forEach((el) => {
        el.style.paddingRight = paddingOffset;
      });
    }
    document.body.style.paddingRight = paddingOffset;
  }

  const unlockPadding = () => {
    if (fixBlocks) {
      fixBlocks.forEach((el) => {
        el.style.paddingRight = '0px';
      });
    }
    document.body.style.paddingRight = '0px';
  }

  const openSearch = () => {
    search.classList.add('search--active');
    previousActiveElement = document.activeElement;
    lockPadding();
    disableScroll();

    Array.from(document.body.children).forEach((child) => {
      if (child !== search) {
        child.inert = true;
      }
    });

    search.inert = false;

    setTimeout(() => {
      searchCloseBtn.focus();
    }, 100);

    document.addEventListener('keydown', (e) => {
      console.log(e.keyCode);

      if (e.keyCode == keys.ESC) {
        closeSearch();
      }
    });
  };

  const closeSearch = () => {
    search.classList.remove('search--active');
    unlockPadding();
    enableScroll();

    Array.from(document.body.children).forEach((child) => {
      if (child !== search) {
        child.inert = false;
      }
    });

    search.inert = true;

    const search_input = document.querySelector('.search__input');
    search_input.value = '';

    setTimeout(() => {
      previousActiveElement.focus();
    }, 300);
  };

  searchBtn.addEventListener('click', () => {
    openSearch();
  });

  searchCloseBtn.addEventListener('click', () => {
    closeSearch();
  });
});



Array.from(document.querySelectorAll('[data-social]')).forEach((link) => {
  link.addEventListener('click', () => {
    let url = location.origin + location.pathname;

    //url += `/assets/share.php?page=${encodeURIComponent(page)}`;

    switch (event.currentTarget.dataset.social) {
      case 'facebook':
        Share.facebook(url);
        break;

      case 'vk':
        Share.vk(url);
        break;

      case 'twitter':
        Share.twitter(url);
        break;
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const switchBtn = document.querySelector('.theme-switch');
  const switchBtnIcons = switchBtn.querySelectorAll('.theme-switch__icon');

  if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', 'dark');
  }

  const switchIcon = (theme) => {
    if (switchBtnIcons) {
      switchBtnIcons.forEach(el => el.classList.remove('theme-switch__icon--active'));
      if (theme === 'light') {
        switchBtn.querySelector('.dark').classList.add('theme-switch__icon--active');
      }
      if (theme === 'dark') {
        switchBtn.querySelector('.light').classList.add('theme-switch__icon--active');
      }
    }
  };

  const toggleTheme = (theme) => {
    switchIcon(theme);

    if (localStorage.getItem('theme') === 'light') {
      root.style.setProperty('--scheme', 'light');
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
    if (localStorage.getItem('theme') === 'dark') {
      root.style.setProperty('--scheme', 'dark');
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  };

  toggleTheme(localStorage.getItem('theme'));

  switchBtn.addEventListener('click', () => {
    let scheme = localStorage.getItem('theme');
    console.log(scheme)
    if (scheme === 'dark') {
      localStorage.setItem('theme', 'light');
      toggleTheme('light');
    } else if (scheme === 'light') {
      localStorage.setItem('theme', 'dark');
      toggleTheme('dark');
    }
  });
});

/**
  * название функции
  *
  * @param {number} first - первое число
  * @returns {number}
  */

//# sourceMappingURL=main.js.map
