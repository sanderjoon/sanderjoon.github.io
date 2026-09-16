/**
 * sanderjoon.com v2 - Minimalist Video Portfolio
 */

(function () {
  'use strict';

  let currentTag = 'all';
  let orderMode = 'shuffled';
  let shuffledProjects = null;
  let masonryResizeObserver = null;
  const expandedProjects = new Set();
  let currentColumnCount = 0;

  // Elements
  const filterBar = document.getElementById('filter-bar');
  const masonryContainer = document.getElementById('masonry-container');

  // Load MP4 hover previews only when they are near the viewport.
  const previewObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const preview = entry.target;
          preview.dataset.previewLoaded = 'true';
          preview.preload = 'auto';
          preview.load();
          previewObserver.unobserve(preview);
        });
      }, { rootMargin: '300px 0px' })
    : null;

  /**
   * Check if URL is an MP4 video file
   */
  function isMp4Url(url) {
    if (!url) return false;
    return /\.mp4(\?.*)?$/i.test(url.trim());
  }

  /**
   * Convert YouTube or Vimeo URL into privacy-friendly embed URL
   */
  function getEmbedUrl(url) {
    if (!url) return '';
    // Vimeo
    const vimeoMatch = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?title=0&byline=0&portrait=0&dnt=1`;
    }
    // YouTube
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    if (ytMatch) {
      return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`;
    }
    return url;
  }

  function addAutoplay(url) {
    return `${url}${url.includes('?') ? '&' : '?'}autoplay=1`;
  }

  function isVideoFullscreen() {
    return Boolean(
      document.fullscreenElement
      || document.webkitFullscreenElement
      || document.querySelector('video[webkit-playsinline]')?.webkitDisplayingFullscreen
    );
  }

  /**
   * Parse two-column table data (credits, awards, or custom specs)
   * Supports:
   * - Multiline string: "Role: Name" or "Award: Festival"
   * - Array of objects: [ { role, name }, { award, festival }, etc. ]
   */
  function parseTableData(data) {
    if (!data) return [];
    if (Array.isArray(data)) {
      return data.map(item => {
        if (typeof item !== 'object' || item === null) {
          return { col1: '', col2: String(item) };
        }
        const keys = Object.keys(item);
        const col1 = item.role || item.award || item.category || item.year || item.title || item[keys[0]] || '';
        const col2 = item.name || item.festival || item.winner || item.institution || item[keys[1]] || '';
        return { col1: String(col1), col2: String(col2) };
      });
    }
    if (typeof data === 'string') {
      return data
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
          const sepIndex = line.indexOf(':') !== -1 ? line.indexOf(':') : line.indexOf(',');
          if (sepIndex !== -1) {
            return {
              col1: line.substring(0, sepIndex).trim(),
              col2: line.substring(sepIndex + 1).trim()
            };
          }
          return { col1: '', col2: line };
        });
    }
    return [];
  }

  /**
   * Render a two-column table with an optional section label
   */
  function renderTableHtml(data, className, label) {
    const list = parseTableData(data);
    if (list.length === 0) return '';
    const labelHtml = label ? `<div class="section-label">${escapeHtml(label)}</div>` : '';
    return `
      <div class="${className || 'credits-box'}">
        ${labelHtml}
        <table class="credits-table">
          <tbody>
            ${list.map(row => `
              <tr>
                <td class="credit-role">${escapeHtml(row.col1)}</td>
                <td class="credit-name">${escapeHtml(row.col2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  /**
   * Format description:
   * 1. Converts custom <table-box title="...">...</table-box> anywhere in description into styled tables
   * 2. Formats plain text blocks (separated by blank lines) into <p> paragraphs
   */
  function formatDescription(desc) {
    if (!desc) return '';

    // Convert <table-box title="...">...</table-box> or <table-box>...</table-box>
    let content = desc.replace(/<table-box(?:\s+title="([^"]*)")?>([\s\S]*?)<\/table-box>/gi, (match, title, body) => {
      return renderTableHtml(body, 'credits-box', title);
    });

    // If description doesn't contain explicit <p> or <div> tags, format blank-line-separated blocks into <p>
    if (!/<(p|div|table|ul|ol|h[1-6])/i.test(content)) {
      content = content
        .trim()
        .split(/\n\s*\n/)
        .map(block => {
          const trimmed = block.trim();
          if (!trimmed) return '';
          if (/^<(div|table|iframe|video|p|ul|ol|img)/i.test(trimmed)) {
            return trimmed;
          }
          return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
        })
        .join('\n');
    }

    return content;
  }

  /**
   * Determine column count based on viewport width
   */
  function getColumnCount() {
    const width = window.innerWidth;
    if (width >= 1024) return 3;
    if (width >= 640) return 2;
    return 1;
  }

  function getProjects() {
    if (typeof window !== 'undefined' && Array.isArray(window.projects)) {
      return window.projects;
    }
    if (typeof projects !== 'undefined' && Array.isArray(projects)) {
      return projects;
    }
    return [];
  }

  /**
   * Helper to check if a string is a 4-digit year
   */
  function isYear(str) {
    return /^\d{4}$/.test(String(str).trim());
  }

  function getYearRange(value) {
    const year = String(value || '').trim();
    if (/^\d{4}$/.test(year)) {
      const numericYear = Number(year);
      return { min: numericYear, max: numericYear };
    }
    if (/^\.\.\.-\d{4}$/.test(year)) {
      return { min: -Infinity, max: Number(year.slice(-4)) };
    }
    if (/^\d{4}-\.\.\.$/.test(year)) {
      return { min: Number(year.slice(0, 4)), max: Infinity };
    }
    return null;
  }

  function getOrderLabel() {
    return {
      shuffled: 'Shuffled',
      time: 'By Time',
      name: 'By Name'
    }[orderMode];
  }

  function shuffle(items) {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index--) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
    }
    return shuffled;
  }

  function orderProjects(projectList) {
    const pinnedProjects = projectList.filter(project => project.pinned === true);
    const unpinnedProjects = projectList.filter(project => project.pinned !== true);
    let ordered;
    if (orderMode === 'time') {
      ordered = [...unpinnedProjects].sort((a, b) => {
        const aRange = getYearRange(a.year);
        const bRange = getYearRange(b.year);
        const aYear = aRange ? aRange.max : -Infinity;
        const bYear = bRange ? bRange.max : -Infinity;
        return bYear - aYear;
      });
    } else if (orderMode === 'name') {
      ordered = [...unpinnedProjects].sort((a, b) => {
        const aTitle = getProjectTitle(a).toLocaleLowerCase();
        const bTitle = getProjectTitle(b).toLocaleLowerCase();
        if (!aTitle && !bTitle) return 0;
        if (!aTitle) return 1;
        if (!bTitle) return -1;
        return aTitle.localeCompare(bTitle);
      });
    } else {
      const shuffledProjectsMatch = shuffledProjects
        && shuffledProjects.length === unpinnedProjects.length
        && shuffledProjects.every(project => unpinnedProjects.includes(project));
      if (!shuffledProjectsMatch) {
        shuffledProjects = shuffle(unpinnedProjects);
      }
      ordered = shuffledProjects.filter(project => unpinnedProjects.includes(project));
    }

    return [
      ...pinnedProjects,
      ...ordered
    ];
  }

  /**
   * Render Tag Filter Buttons on Top Row
   * Order: "Sander Joon" (All) -> Category tags -> Years as last tags
   */
  function renderFilterBar() {
    const projectList = getProjects();
    if (!filterBar || !Array.isArray(projectList)) return;

    const categoryTagSet = new Set();
    const yearSet = new Set();

    projectList.forEach(p => {
      // Collect tags from project.tags
      if (Array.isArray(p.tags)) {
        p.tags.forEach(tag => {
          const trimmed = String(tag).trim();
          if (trimmed) {
            if (isYear(trimmed)) {
              yearSet.add(trimmed);
            } else {
              categoryTagSet.add(trimmed);
            }
          }
        });
      }

      // Collect years from project.year
      if (p.year) {
        const trimmedYear = String(p.year).trim();
        if (trimmedYear) {
          yearSet.add(trimmedYear);
        }
      }
    });

    // Category tags sorted alphabetically
    const categoryTags = Array.from(categoryTagSet).sort();

    // Year tags sorted descending (newest first)
    const yearTags = Array.from(yearSet).sort((a, b) => b.localeCompare(a));

    filterBar.innerHTML = '';

    // 1. "Sander Joon" button (acts as "All")
    const allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.className = `tag-btn ${currentTag === 'all' ? 'active' : ''}`;
    allBtn.textContent = 'Sander Joon';
    allBtn.setAttribute('data-tag', 'all');
    allBtn.addEventListener('click', () => setTagFilter('all'));
    filterBar.appendChild(allBtn);

    // 2. Category tag buttons
    categoryTags.forEach(tag => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `tag-btn ${currentTag === tag ? 'active' : ''}`;
      btn.textContent = tag;
      btn.setAttribute('data-tag', tag);
      btn.addEventListener('click', () => setTagFilter(tag));
      filterBar.appendChild(btn);
    });

    // 3. Year ranges as last tags
    ['2020-...', '...-2019'].forEach(yearRange => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `tag-btn ${currentTag === yearRange ? 'active' : ''}`;
      btn.textContent = yearRange;
      btn.setAttribute('data-tag', yearRange);
      btn.addEventListener('click', () => setTagFilter(yearRange));
      filterBar.appendChild(btn);
    });

    const orderBtn = document.createElement('button');
    orderBtn.type = 'button';
    orderBtn.className = 'tag-btn';
    orderBtn.textContent = getOrderLabel();
    orderBtn.setAttribute('aria-label', `Change order, currently ${getOrderLabel()}`);
    orderBtn.addEventListener('click', () => {
      const modes = ['shuffled', 'time', 'name'];
      orderMode = modes[(modes.indexOf(orderMode) + 1) % modes.length];
      if (orderMode === 'shuffled') shuffledProjects = shuffle(projectList);
      renderFilterBar();
      renderProjects();
    });
    filterBar.appendChild(orderBtn);
  }

  /**
   * Filter projects by tag or year
   */
  function setTagFilter(tag) {
    if (currentTag === tag) return;
    currentTag = tag;

    // Update active class on buttons
    const buttons = filterBar.querySelectorAll('.tag-btn');
    buttons.forEach(btn => {
      const btnTag = btn.getAttribute('data-tag');
      btn.classList.toggle('active', btnTag === currentTag);
    });

    renderProjects();
  }

  function layoutMasonry(cards, columnCount) {
    if (!cards.length) return;

    const containerStyle = getComputedStyle(masonryContainer);
    const gap = Number.parseFloat(containerStyle.gap) || 24;
    const columnWidth = (masonryContainer.clientWidth - gap * (columnCount - 1)) / columnCount;
    const columnHeights = Array(columnCount).fill(0);

    cards.forEach((card, index) => {
      const span = card.dataset.doubleWidth === 'true' && columnCount > 1 ? 2 : 1;
      const assignedColumn = Number.parseInt(card.dataset.masonryColumn, 10);
      let startColumn = assignedColumn;

      if (!Number.isInteger(startColumn) || startColumn > columnCount - span) {
        const preferredColumn = Math.min(index % columnCount, columnCount - span);
        let bestTop = Infinity;
        startColumn = preferredColumn;

        for (let candidate = 0; candidate <= columnCount - span; candidate++) {
          const candidateTop = Math.max(...columnHeights.slice(candidate, candidate + span));
          if (candidateTop < bestTop) {
            startColumn = candidate;
            bestTop = candidateTop;
          }
        }
        card.dataset.masonryColumn = String(startColumn);
      }

      const top = Math.max(...columnHeights.slice(startColumn, startColumn + span));

      card.style.width = `${columnWidth * span + gap * (span - 1)}px`;
      card.style.left = `${startColumn * (columnWidth + gap)}px`;
      card.style.top = `${top}px`;

      const bottom = top + card.offsetHeight;
      for (let column = startColumn; column < startColumn + span; column++) {
        columnHeights[column] = bottom + gap;
      }
    });

    masonryContainer.style.height = `${Math.max(...columnHeights) - gap}px`;
  }

  /**
   * Helper to escape HTML attributes & text
   */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function getProjectTitle(project) {
    if (!project || project.title === undefined || project.title === null) return '';
    return String(project.title).trim();
  }

  /**
   * Create a project card element
   */
  function createProjectCard(project, index) {
    const projectTitle = getProjectTitle(project);
    const projectKey = projectTitle || `project-${index}`;
    const imageUrl = project.imageUrl || project.image;
    const hasMedia = Boolean(project.videoUrl || imageUrl);
    const hasDescription = Boolean(project.description || project.credits || project.awards);
    const isTitlelessCard = !projectTitle && !project.year;
    const isDescriptionOnlyTitlelessCard = !projectTitle && !project.year && hasDescription;
    const hasExpandableContent = hasDescription;

    // Cards without media (or with expandable: false / expanded: true) stay open directly
    const isAlwaysExpanded = project.expandable === false || project.expanded === true || (!hasExpandableContent && project.expandable !== true) || isDescriptionOnlyTitlelessCard;
    const isExpanded = isAlwaysExpanded || expandedProjects.has(projectKey);

    const card = document.createElement('article');
    card.className = `project-card ${isExpanded ? 'expanded' : ''} ${isAlwaysExpanded ? 'always-expanded' : ''}`;
    card.id = `project-${index}`;

    // Custom height / aspect ratio support
    let customStyleAttr = '';
    if (project.aspectRatio) {
      customStyleAttr = `style="aspect-ratio: ${escapeHtml(project.aspectRatio)};"`;
    } else if (project.height) {
      customStyleAttr = `style="height: ${escapeHtml(project.height)}; aspect-ratio: unset;"`;
    }

    // Media Slot: Video (MP4/Vimeo/YouTube) OR Image OR None (pure text box)
    let mediaHtml = '';
    const autoplayThumbnail = project.autoplayThumbnail === true;
    if (project.videoUrl) {
      const hasThumbnail = Boolean(project.thumbnailUrl);
      const thumbnailIsMp4 = isMp4Url(project.thumbnailUrl);
      const hoverVideoUrl = project.hoverVideoUrl || (thumbnailIsMp4 ? project.thumbnailUrl : '') || (isMp4Url(project.videoUrl) ? project.videoUrl : '');
      const thumbnailMediaHtml = thumbnailIsMp4
        ? `<video class="video-hover-preview" src="${escapeHtml(project.thumbnailUrl)}" muted loop playsinline preload="auto" aria-hidden="true"></video>`
        : `<img src="${escapeHtml(project.thumbnailUrl)}" alt="" loading="lazy">`;
      const thumbnailHtml = hasThumbnail
        ? `<button type="button" class="video-thumbnail-trigger ${thumbnailIsMp4 ? 'mp4-thumbnail' : ''} ${autoplayThumbnail ? 'autoplay-thumbnail' : ''}" aria-label="Play ${escapeHtml(projectTitle || 'video')}" data-video-url="${escapeHtml(project.videoUrl)}">
             ${thumbnailMediaHtml}
             ${!thumbnailIsMp4 && isMp4Url(hoverVideoUrl) ? `<video class="video-hover-preview" src="${escapeHtml(hoverVideoUrl)}" muted loop playsinline preload="auto" aria-hidden="true"></video>` : ''}
             <span class="video-play-icon" aria-hidden="true">&#9654;</span>
           </button>`
        : '';

      if (isMp4Url(project.videoUrl)) {
        mediaHtml = `
          <div class="video-wrapper ${hasThumbnail ? 'has-thumbnail' : ''}" ${customStyleAttr}>
            ${hasThumbnail ? thumbnailHtml : `<video src="${escapeHtml(project.videoUrl)}" controls playsinline preload="metadata" title="${escapeHtml(projectTitle)}">Your browser does not support the video tag.</video>`}
          </div>
        `;
      } else {
        const embedUrl = getEmbedUrl(project.videoUrl);
        if (embedUrl) {
          mediaHtml = `
            <div class="video-wrapper ${hasThumbnail ? 'has-thumbnail' : ''}" ${customStyleAttr}>
              ${hasThumbnail ? thumbnailHtml : `<iframe src="${embedUrl}" title="${escapeHtml(projectTitle)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen loading="lazy"></iframe>`}
            </div>
          `;
        }
      }
    } else if (imageUrl) {
      const hasRatioClass = project.aspectRatio ? 'has-ratio' : '';
      mediaHtml = `
        <div class="image-wrapper ${hasRatioClass}" ${customStyleAttr}>
          <img 
            src="${escapeHtml(imageUrl)}" 
            alt="${escapeHtml(projectTitle)}" 
            class="card-main-image" 
            loading="lazy" 
          />
        </div>
      `;
    }

    // Formatted Description (supports text blocks, HTML, images, and embedded <table-box>)
    const descriptionHtml = project.description
      ? `<div class="card-description">${formatDescription(project.description)}</div>`
      : '';

    // Append standalone credits and awards if provided as top-level fields
    // (Only appends if not already included via <table-box> in description)
    const hasEmbeddedTables = project.description && /<table-box/i.test(project.description);
    let standaloneCreditsHtml = '';
    let standaloneAwardsHtml = '';
    if (!hasEmbeddedTables) {
      if (project.credits) {
        standaloneCreditsHtml = renderTableHtml(project.credits, 'credits-box', 'Credits');
      }
      if (project.awards) {
        standaloneAwardsHtml = renderTableHtml(project.awards, 'awards-box', 'Selections & Awards');
      }
    }

    // Card Header: Title only. Year is kept for filters but not shown next to the title.
    let headerHtml = '';
    if (projectTitle) {
      const arrowBtnHtml = !isAlwaysExpanded && hasExpandableContent
        ? `<button type="button" class="arrow-toggle-btn" aria-label="Toggle details">
             <span class="arrow-icon" aria-hidden="true">i</span>
           </button>`
        : '';

      headerHtml = `
        <div class="card-header" ${!isAlwaysExpanded && hasExpandableContent ? 'role="button" tabindex="0"' : ''} aria-expanded="${isExpanded}">
          <div class="card-title-group">
            <div class="card-title">${escapeHtml(projectTitle)}</div>
          </div>
          ${arrowBtnHtml}
        </div>
      `;
    }

    card.innerHTML = `
      ${mediaHtml}
      ${headerHtml}
      <div class="card-details">
        <div class="card-details-inner">
          ${descriptionHtml}
          ${standaloneCreditsHtml}
          ${standaloneAwardsHtml}
        </div>
      </div>
    `;

    const thumbnailTrigger = card.querySelector('.video-thumbnail-trigger');
    if (thumbnailTrigger) {
      const hoverPreview = thumbnailTrigger.querySelector('.video-hover-preview');
      if (hoverPreview) {
        let previewLoaded = false;
        const loadPreview = () => {
          if (previewLoaded || hoverPreview.dataset.previewLoaded === 'true') return;
          previewLoaded = true;
          hoverPreview.dataset.previewLoaded = 'true';
          hoverPreview.preload = 'auto';
          hoverPreview.load();
          if (previewObserver) previewObserver.unobserve(hoverPreview);
        };

        hoverPreview.addEventListener('loadedmetadata', () => {
          if (hoverPreview.duration > 0) {
            hoverPreview.currentTime = Math.min(0.05, hoverPreview.duration / 2);
          }
        }, { once: true });
        hoverPreview.addEventListener('loadeddata', () => {
          thumbnailTrigger.classList.add('preview-ready');
          if (autoplayThumbnail) {
            hoverPreview.play().catch(() => {});
          }
        }, { once: true });

        if (previewObserver) {
          previewObserver.observe(hoverPreview);
        }
        loadPreview();

        if (autoplayThumbnail) {
          hoverPreview.play().catch(() => {});
        }

        thumbnailTrigger.addEventListener('mouseenter', () => {
          loadPreview();
          thumbnailTrigger.classList.remove('preview-paused');
          hoverPreview.play().catch(() => {});
        });
        thumbnailTrigger.addEventListener('mouseleave', () => {
          if (!autoplayThumbnail) {
            hoverPreview.pause();
            thumbnailTrigger.classList.add('preview-paused');
          }
        });
      }

      thumbnailTrigger.addEventListener('click', () => {
        const videoUrl = thumbnailTrigger.dataset.videoUrl;
        const videoWrapper = thumbnailTrigger.closest('.video-wrapper');

        if (!videoWrapper) return;
        if (isMp4Url(videoUrl)) {
          videoWrapper.innerHTML = `<video class="embedded-mp4-video" src="${escapeHtml(videoUrl)}" controls autoplay playsinline preload="metadata" title="${escapeHtml(projectTitle)}">Your browser does not support the video tag.</video>`;
          videoWrapper.querySelector('video')?.focus();
          return;
        }

        const embedUrl = getEmbedUrl(videoUrl);
        videoWrapper.innerHTML = `<iframe src="${escapeHtml(addAutoplay(embedUrl))}" title="${escapeHtml(projectTitle)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe>`;
      });
    }

    // Dropdown toggle click handling (only for collapsible cards)
    if (!isAlwaysExpanded && hasExpandableContent) {
      const header = card.querySelector('.card-header');
      if (header) {
        function toggleAccordion(e) {
          if (e.target.closest('a')) return;
          const willExpand = !card.classList.contains('expanded');
          card.classList.toggle('expanded', willExpand);
          header.setAttribute('aria-expanded', willExpand);
          if (willExpand) {
            expandedProjects.add(projectKey);
          } else {
            expandedProjects.delete(projectKey);
          }
        }

        header.addEventListener('click', toggleAccordion);
        header.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleAccordion(e);
          }
        });
      }
    }

    return card;
  }

  /**
   * Render all projects into left-to-right Pinterest-style columns
   */
  function renderProjects() {
    const projectList = getProjects();
    if (!masonryContainer || !Array.isArray(projectList)) return;

    // Filter projects by tag or year
    const filtered = orderProjects(currentTag === 'all'
      ? projectList
      : projectList.filter(p => {
          const yearRange = getYearRange(p.year);
          const matchYear = currentTag === '2020-...'
            ? yearRange && yearRange.min >= 2020
            : currentTag === '...-2019'
              ? yearRange && yearRange.max <= 2019
              : String(p.year).trim() === currentTag;
          const matchTag = Array.isArray(p.tags) && p.tags.includes(currentTag);
          return matchYear || matchTag;
        }));

    if (masonryResizeObserver) masonryResizeObserver.disconnect();
    masonryContainer.innerHTML = '';

    if (filtered.length === 0) {
      masonryContainer.innerHTML = `<div class="no-projects">No projects found for "${escapeHtml(currentTag)}".</div>`;
      return;
    }

    const columnCount = getColumnCount();
    currentColumnCount = columnCount;

    const cards = [];
    filtered.forEach((project, idx) => {
      const card = createProjectCard(project, idx);
      card.dataset.doubleWidth = project.doubleWidth === true ? 'true' : 'false';
      masonryContainer.appendChild(card);
      cards.push(card);
    });

    layoutMasonry(cards, columnCount);
    if ('ResizeObserver' in window) {
      masonryResizeObserver = new ResizeObserver(() => {
        if (isVideoFullscreen()) return;
        layoutMasonry(cards, getColumnCount());
      });
      cards.forEach(card => masonryResizeObserver.observe(card));
    }
  }

  /**
   * Setup Fullscreen Image Zoom:
   * Edge-to-edge image, no loupe indicator, clicking anywhere zooms out
   */
  function setupImageZoom() {
    let overlay = document.getElementById('zoom-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'zoom-overlay';
      overlay.className = 'zoom-overlay';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.innerHTML = `<img class="zoom-img" id="zoom-img" src="" alt="Fullscreen view" />`;
      document.body.appendChild(overlay);
    }

    const zoomImg = overlay.querySelector('#zoom-img');

    function openZoom(src, alt) {
      zoomImg.src = src;
      zoomImg.alt = alt || 'Fullscreen preview';
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('zoom-locked');
    }

    function closeZoom() {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('zoom-locked');
      zoomImg.src = '';
    }

    // Delegated click on any description image or main card image
    document.addEventListener('click', (e) => {
      const img = e.target.closest('.card-description img, .card-main-image');
      if (img) {
        e.preventDefault();
        e.stopPropagation();
        openZoom(img.src, img.alt);
      }
    });

    // Clicking anywhere in the overlay (including the image or edges) zooms out
    overlay.addEventListener('click', closeZoom);

    // Escape key zooms out
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeZoom();
      }
    });
  }

  /**
   * Window resize handler with debouncing to re-layout columns left-to-right when breakpoint changes
   */
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (isVideoFullscreen()) return;
      const columnCount = getColumnCount();
      if (columnCount !== currentColumnCount) {
        renderProjects();
        return;
      }

      const cards = Array.from(masonryContainer.querySelectorAll('.project-card'));
      layoutMasonry(cards, columnCount);
    }, 150);
  });

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    renderFilterBar();
    renderProjects();
    setupImageZoom();
  });
})();
