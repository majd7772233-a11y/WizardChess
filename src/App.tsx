import { useEffect, useRef, useState } from 'react';
import { initWizardChess } from './wizardChessEngine.js';
import { getLocale, setLocale, t, type Locale } from './i18n';

export default function App() {
  const initializedRef = useRef(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [locale, setCurrentLocale] = useState<Locale>(() => getLocale());

  useEffect(() => {
    setLocale(locale);
    if (initializedRef.current) return;
    initializedRef.current = true;
    initWizardChess();
  }, [locale]);

  const changeLocale = (nextLocale: Locale) => {
    setCurrentLocale(nextLocale);
    setLocale(nextLocale);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileSheetOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileSheetOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleRestoreUI = () => {
    const win = window as unknown as { wizardChess?: { toggleUI?: (force?: boolean) => void } };
    if (win.wizardChess?.toggleUI) {
      win.wizardChess.toggleUI(false);
    } else {
      document.body.classList.remove('cinematic-ui-hidden');
      const btnHide = document.getElementById('btn-hide-ui');
      if (btnHide) btnHide.textContent = t('action.hideUi');
    }
  };

  return (
    <>
      <div id="loading-overlay">
        <div className="loader-title">{t('game.title')}</div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" id="loader-bar"></div>
        </div>
        <div id="loader-text">{t('loading.summoning')}</div>
      </div>

      <div id="canvas-container"></div>

      <button
        type="button"
        className="hud-btn mobile-only-restore-ui"
        id="btn-mobile-show-ui"
        onClick={handleRestoreUI}
        title={t('action.showHud')}
      >
        {t('action.restoreUi')}
      </button>

      <div id="hud-top">
        <div className="hud-group" id="hud-left">
          <div className="brand-pill">
            <span className="brand-title">{t('game.title')}</span>
          </div>
          <div className="status-pill" id="status-pill">
            <span className="turn-dot" id="turn-dot"></span>
            <span id="turn-text">{t('turn.white')}</span>
            <span className="mode-badge" id="mode-badge">{t('mode.playingAs', { side: t('side.white') })}</span>
          </div>
        </div>

        <div className="language-control" role="group" aria-label={t('language.label')}>
          <button
            type="button"
            className={`language-option ${locale === 'ar' ? 'active' : ''}`}
            aria-pressed={locale === 'ar'}
            onClick={() => changeLocale('ar')}
          >
            {t('language.ar')}
          </button>
          <span className="language-divider" aria-hidden="true"></span>
          <button
            type="button"
            className={`language-option ${locale === 'en' ? 'active' : ''}`}
            aria-pressed={locale === 'en'}
            onClick={() => changeLocale('en')}
          >
            {t('language.en')}
          </button>
        </div>

        <button
          type="button"
          className={`hud-btn mobile-controls-trigger ${mobileSheetOpen ? 'active' : ''}`}
          id="btn-mobile-controls"
          aria-expanded={mobileSheetOpen}
          aria-controls="hud-right"
          onClick={() => setMobileSheetOpen((prev) => !prev)}
        >
          {mobileSheetOpen ? t('action.close') : t('action.controls')}
        </button>

        <div
          className={`mobile-sheet-backdrop ${mobileSheetOpen ? 'open' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setMobileSheetOpen(false);
          }}
          aria-hidden="true"
        ></div>

        <div
          className={`hud-group ${mobileSheetOpen ? 'mobile-sheet-open' : ''}`}
          id="hud-right"
        >
          <div
            className="mobile-sheet-handle-wrap"
            onClick={(e) => {
              e.stopPropagation();
              setMobileSheetOpen(false);
            }}
            aria-hidden="true"
          >
            <div className="mobile-sheet-handle"></div>
          </div>

          <div className="mobile-sheet-header">
            <span className="mobile-sheet-title">{t('action.controls')}</span>
            <button
              type="button"
              className="mobile-sheet-close"
              id="btn-mobile-sheet-close"
              onClick={(e) => {
                e.stopPropagation();
                setMobileSheetOpen(false);
              }}
              aria-label={t('action.close')}
            >
              <span className="localized-hint">{t('action.close')} ×</span>
            </button>
          </div>

          <div className="mobile-sheet-section-label">{t('section.gameActions')}</div>

          <button
            className="hud-btn"
            id="btn-side-toggle"
            title={t('tooltip.side')}
            onClick={() => setMobileSheetOpen(false)}
          >
            {t('action.playAs', { side: t('side.black') })}
          </button>
          <button
            className="hud-btn"
            id="btn-ai-move"
            title={t('tooltip.ai')}
            onClick={() => setMobileSheetOpen(false)}
          >
            {t('action.aiMove')}
          </button>
          <button
            className="hud-btn"
            id="btn-reset"
            title={t('tooltip.newGame')}
            onClick={() => setMobileSheetOpen(false)}
          >
            {t('action.newGame')}
          </button>

          <div className="hud-divider" aria-hidden="true"></div>
          <div className="mobile-sheet-section-label">
            <span>{t('camera.section')}</span>
            <span className="mobile-sheet-section-sub">{t('camera.flipHint')}</span>
          </div>

          <button
            className="hud-btn active"
            id="btn-cam-player"
            title={t('tooltip.cameraPlayer')}
          >
            {t('camera.player')}
          </button>
          <button
            className="hud-btn"
            id="btn-cam-top"
            title={t('tooltip.cameraOverhead')}
          >
            {t('camera.overhead')}
          </button>
          <button
            className="hud-btn"
            id="btn-cam-side"
            title={t('tooltip.cameraSide')}
          >
            {t('camera.side')}
          </button>
          <button
            className="hud-btn"
            id="btn-cam-wide"
            title={t('tooltip.cameraCathedral')}
          >
            {t('camera.cathedral')}
          </button>

          <div className="hud-divider" aria-hidden="true"></div>
          <div className="mobile-sheet-section-label">{t('display.section')}</div>

          <button
            className="hud-btn"
            id="btn-hide-ui"
            title={t('tooltip.hideUi')}
            onClick={() => setMobileSheetOpen(false)}
          >
            {t('action.hideUi')}
          </button>

          <div className="mobile-sheet-hint">
            <span className="localized-hint">{t('hint.touch')}</span>
          </div>
        </div>
      </div>

      <div id="hud-bottom">
        <div className="hint-pill" id="controls-hint">
          <span className="localized-hint">{t('hint.controls')}</span>
        </div>
        <div className="captured-pill" id="captured-tray"></div>
      </div>

      <div id="checkmate-overlay" role="status" aria-live="polite">
        <div className="checkmate-banner">
          <span className="localized-ornament">✦ &nbsp; {t('checkmate.ornament')} &nbsp; ✦</span>
          <div className="checkmate-crown" id="checkmate-crown">♔</div>
          <div className="checkmate-title" id="checkmate-title">{t('checkmate.title')}</div>
          <div className="checkmate-rule"></div>
          <div className="checkmate-subtitle" id="checkmate-subtitle">
            {t('checkmate.winner', { winner: t('side.white'), defeated: t('side.black') })}
          </div>
          <div className="checkmate-actions">
            <button className="checkmate-btn" id="btn-checkmate-replay">
              {t('checkmate.replay')}
            </button>
            <button className="checkmate-btn" id="btn-checkmate-newgame">
              {t('action.newGame')}
            </button>
            <button className="checkmate-btn secondary" id="btn-checkmate-dismiss">
              {t('checkmate.dismiss')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
